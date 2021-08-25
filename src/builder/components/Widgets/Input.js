import React, { useContext } from "react";
import { isStringArray, isUndefined } from "../../utils/types";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";

export const Input = ({ type, value, id }) => {
  const { data, setData, onChange, components, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (changedValue, index) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);

    if (!isUndefined(index)) {
      clonedData[parentIndex].value[index] = changedValue;
    } else {
      clonedData[parentIndex].value = changedValue;
    }

    setData(clonedData);
    onChange(clonedData);
  };

  if (form) {
    if (isStringArray(value)) {
      return (
        <>
          <form.Input
            type={type}
            value={value[0]}
            onChange={(changedValue) => handleChange(changedValue, 0)}
            disabled={readOnly}
          />
          <form.Input
            type={type}
            value={value[1]}
            onChange={(changedValue) => handleChange(changedValue, 1)}
            disabled={readOnly}
          />
        </>
      );
    } else {
      return (
        <form.Input
          type={type}
          value={value}
          onChange={handleChange}
          disabled={readOnly}
        />
      );
    }
  }

  return null;
};
