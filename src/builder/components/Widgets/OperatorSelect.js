import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";
import { isStringArray } from "../../utils/types";

export const OperatorSelect = ({ values, selectedValue, id }) => {
  const { fields, data, setData, onChange, components, strings, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (value) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);
    const fieldIndex = fields.findIndex(
      (item) => clonedData[parentIndex].field === item.field
    );

    if (["DATE", "TEXT", "NUMBER"].includes(fields[fieldIndex].type)) {
      if (
        !["BETWEEN", "NOT_BETWEEN"].includes(value) &&
        isStringArray(clonedData[parentIndex].value)
      ) {
        clonedData[parentIndex].value =
          fields[fieldIndex].type === "NUMBER" ? "0" : "";
      } else if (
        ["BETWEEN", "NOT_BETWEEN"].includes(value) &&
        !isStringArray(clonedData[parentIndex].value)
      ) {
        clonedData[parentIndex].value =
          fields[fieldIndex].type === "NUMBER" ? ["0", "0"] : ["", ""];
        clonedData[parentIndex].fieldType = "value";
      }
    }

    clonedData[parentIndex].operator = value;

    setData(clonedData);
    onChange(clonedData);
  };

  if (form && strings.form) {
    return (
      <form.Select
        values={values}
        selectedValue={selectedValue}
        emptyValue={strings.form.selectYourValue}
        onChange={handleChange}
        disabled={readOnly}
      />
    );
  }

  return null;
};
