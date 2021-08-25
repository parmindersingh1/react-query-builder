import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";

export const Select = ({ selectedValue, values, id }) => {
  const { data, setData, onChange, components, strings, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (value) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);

    clonedData[parentIndex].value = value;

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
        disabled={readOnly}
      />
    );
  }

  return null;
};
