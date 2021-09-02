import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";
import { isOptionList } from "../../utils/types";

export const FunctionSelect = ({ selectedValue, id }) => {
  const { fields, data, setData, onChange, components, strings, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (value) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);

    clonedData[parentIndex].functionType = value;
    setData(clonedData);
    onChange(clonedData);
  };

  const functionNames = Object.keys(strings.functionTypes).map((key) => ({
    value: key,
    label: strings.functionTypes[key],
  }));

  if (form && strings.form) {
    return (
      <form.Select
        values={functionNames}
        selectedValue={selectedValue}
        emptyValue={strings.form.selectYourValue}
        onChange={handleChange}
        disabled={readOnly}
      />
    );
  }

  return null;
};
