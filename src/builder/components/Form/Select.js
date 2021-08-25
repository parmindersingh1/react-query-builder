import React from "react";
import { colors } from "../../constants/colors";
import styled from "styled-components";

const StyledSelect = styled.select`
  min-width: 160px;
  padding: 0.4rem 0.6rem;
  border: 1px solid ${colors.medium};
  border-radius: 3px;
`;

export const Select = ({
  values,
  selectedValue,
  emptyValue,
  onChange,
  className,
  disabled = false,
}) => {
  const handleChange = (event) => {
    if (!disabled) {
      onChange(event.target.value);
    }
  };

  return (
    <StyledSelect
      onChange={handleChange}
      value={selectedValue}
      className={className}
      disabled={!!disabled}
    >
      <option value="" disabled>
        {emptyValue}
      </option>
      {values.map(({ value: optionValue, label: optionLabel }) => (
        <option value={optionValue} key={optionValue}>
          {optionLabel}
        </option>
      ))}
    </StyledSelect>
  );
};
