import styled, { css } from "styled-components";

import React from "react";
import { colors } from "../../constants/colors";

const StyledOption = styled.div`
  padding: 0.5rem 0.6rem;
  color: #fff;
  font-weight: bold;
  font-size: 0.7rem;
  text-transform: uppercase;
  background: ${({ isSelected }) =>
    !!isSelected ? colors.primary : colors.darker};
  border: 1px solid ${colors.dark};
  cursor: pointer;
  ${({ disabled, isSelected }) =>
    disabled &&
    css`
      background: ${!!isSelected ? colors.dark : colors.darker};
      cursor: initial;
    `}
`;

export const Option = ({
  children,
  onClick,
  disabled,
  value,
  isSelected,
  className,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(value);
    }
  };

  return (
    <StyledOption
      className={className}
      isSelected={isSelected}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </StyledOption>
  );
};
