import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { clone } from "../../utils/clone";

export const Boolean = ({ selectedValue, id }) => {
  const { data, setData, onChange, components, readOnly } =
    useContext(BuilderContext);

  const { form } = components;

  const handleChange = (value) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);

    clonedData[parentIndex].value = value;

    setData(clonedData);
    onChange(clonedData);
  };

  if (form) {
    return (
      <form.Switch
        onChange={handleChange}
        switched={selectedValue}
        disabled={readOnly}
      />
    );
  }

  return null;
};
