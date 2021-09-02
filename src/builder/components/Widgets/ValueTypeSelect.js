import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";
import { isOptionList } from "../../utils/types";

export const ValueTypeSelect = ({ selectedValue, values, id, field, disabled }) => {
  const { fields, data, setData, onChange, components, strings, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (value) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);
    const nextField = fields.filter((item) => item.field === field)[0];

    clonedData[parentIndex].fieldType = value;

    // delete clonedData[parentIndex].value;
    const fieldNames = fields.map((field) => ({
      value: field.field,
      label: field.label,
    }));

    if (value.toUpperCase() === strings.valueTypes.value) {
      switch (nextField.type) {
        case "BOOLEAN":
          clonedData[parentIndex].value = false;
          break;

        case "DATE":
          clonedData[parentIndex].value =
            nextField.operators &&
            ["BETWEEN", "NOT_BETWEEN"].includes(nextField.operators[0])
              ? ["", ""]
              : "";
          break;

        case "TEXT":
          clonedData[parentIndex].value =
            nextField.operators &&
            ["BETWEEN", "NOT_BETWEEN"].includes(nextField.operators[0])
              ? ["", ""]
              : "";
          break;

        case "NUMBER":
          clonedData[parentIndex].value =
            nextField.operators &&
            ["BETWEEN", "NOT_BETWEEN"].includes(nextField.operators[0])
              ? ["0", "0"]
              : "0";
          break;

        case "LIST":
          if (isOptionList(nextField.value)) {
            clonedData[parentIndex].value = nextField.value[0].value;
          }
          break;

        case "MULTI_LIST":
          if (isOptionList(nextField.value)) {
            clonedData[parentIndex].value = [];
          }

          break;
        case "STATEMENT":
          clonedData[parentIndex].value = nextField.value;
          break;

        default:
          break;
      }
    } else if (value.toUpperCase() === strings.valueTypes.field) {
      clonedData[parentIndex].value = fieldNames[0].value;
    } else {
      clonedData[parentIndex].value = "";
    }

    setData(clonedData);
    onChange(clonedData);
  };

  if (form && strings.form && !readOnly) {
    return (
      <form.Select
        onChange={handleChange}
        selectedValue={selectedValue}
        emptyValue={strings.form.selectYourValue}
        values={values}
        disabled={readOnly || disabled}
      />
    );
  }

  return null;
};
