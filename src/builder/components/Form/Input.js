import React from "react";
import { colors } from "../../constants/colors";
import styled from "styled-components";

const StyledInput = styled.input`
  min-width: 160px;
  padding: 0.4rem 0.6rem;
  border: 1px solid ${colors.medium};
  border-radius: 3px;
`;

export const Input = ({
  type,
  value,
  onChange,
  className,
  disabled = false,
  placeholder
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <StyledInput
      type={type}
      value={value}
      onChange={handleChange}
      className={className}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
