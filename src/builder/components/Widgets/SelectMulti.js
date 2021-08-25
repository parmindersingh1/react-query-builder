import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";

export const SelectMulti = ({ values, selectedValue, id }) => {
  const { data, setData, onChange, components, strings, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (value) => {
    if (setData && onChange) {
      const clonedData = clone(data);
      const parentIndex = clonedData.findIndex((item) => item.id === id);

      clonedData[parentIndex].value = clonedData[parentIndex].value.filter(
        (item) => item !== value
      );
      clonedData[parentIndex].value.push(value);

      setData(clonedData);
      onChange(clonedData);
    }
  };

  const handleDelete = (value) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);

    clonedData[parentIndex].value = clonedData[parentIndex].value.filter(
      (item) => item !== value
    );

    setData(clonedData);
    onChange(clonedData);
  };

  if (form && strings.form) {
    return (
      <form.SelectMulti
        onChange={handleChange}
        onDelete={handleDelete}
        selectedValue={selectedValue}
        emptyValue={strings.form.selectYourValue}
        values={values}
        disabled={!!readOnly}
      />
    );
  }

  return null;
};
