import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";
import { isOptionList } from "../../utils/types";

export const FieldTypeSelect = ({ selectedValue, id }) => {
  const { fields, data, setData, onChange, components, strings, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (value) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);
    
    clonedData[parentIndex].value = value;    
    setData(clonedData);
    onChange(clonedData);
  };

  const fieldNames = fields.map((field) => ({
    value: field.field,
    label: field.label,
  }));

  if (form && strings.form) {
    return (
      <form.Select
        values={fieldNames}
        selectedValue={selectedValue}
        emptyValue={strings.form.selectYourValue}
        onChange={handleChange}
        disabled={readOnly}
      />
    );
  }

  return null;
};
