import React, { useEffect, useState } from "react";

import { BuilderContextProvider } from "./Context";
import { Button } from "./Button";
import { Component } from "./Component/Component";
import { Group } from "./Group/Group";
import { Option as GroupHeaderOption } from "./Group/Option";
import { Input } from "./Form/Input";
import { Iterator } from "./Iterator";
import { SecondaryButton } from "./SecondaryButton";
import { Select } from "./Form/Select";
import { SelectMulti } from "./Form/SelectMulti";
import { Switch } from "./Form/Switch";
import { Text } from "./Text";
import { assignIds } from "../utils/assignIds";
import { colors } from "../constants/colors";
import { strings as defaultStrings } from "../constants/strings";
import { denormalizeTree } from "../utils/denormalizeTree";
import { normalizeTree } from "../utils/normalizeTree";
import styled from "styled-components";
import uniqid from "uniqid";

export const StyledBuilder = styled.div`
  padding: 1rem;
  background: #fff;
  border: 1px solid ${colors.light};
`;

export const defaultComponents = {
  form: {
    Input,
    Select,
    SelectMulti,
    Switch,
  },
  Remove: SecondaryButton,
  Add: Button,
  Component,
  Group,
  GroupHeaderOption,
  Text,
};

export const Builder = ({
  data: originalData,
  fields,
  components = defaultComponents,
  strings = defaultStrings,
  readOnly = false,
  onChange,
}) => {
  let normalizedData;
  originalData = assignIds(originalData);

  if (originalData.length === 0) {
    originalData = [
      {
        type: "GROUP",
        value: "AND",
        isNegated: false,
        id: uniqid(),
        children: originalData,
      },
    ];
  }

  try {
    normalizedData = normalizeTree(originalData);
  } catch (e) {
    throw new Error("Input data tree is in invalid format");
  }

  const [data, setData] = useState(normalizedData);
  const filteredData = data.filter((item) => !item.parent);

  useEffect(() => {
    handleChange(normalizedData);
  }, []);

  const handleChange = (nextData) => {
    if (onChange) {
      try {
        onChange(denormalizeTree(nextData));
      } catch (e) {
        throw new Error("Input data tree is in invalid format");
      }
    }
  };

  return (
    <BuilderContextProvider
      fields={fields}
      components={components}
      strings={strings}
      readOnly={readOnly}
      data={data}
      setData={setData}
      onChange={handleChange}
    >
      <StyledBuilder>
        <Iterator originalData={data} filteredData={filteredData} />
      </StyledBuilder>
    </BuilderContextProvider>
  );
};
