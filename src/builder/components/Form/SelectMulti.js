import React from "react";
import { Select } from "./Select";
import { colors } from "../../constants/colors";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
`;

export const OptionContainer = styled.div`
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  align-self: center;
`;

export const Option = styled.span`
  padding: 0.3rem 0.5rem;
  color: ${colors.dark};
  font-size: 0.7rem;
  line-height: 0.7rem;
  white-space: nowrap;
  border: 1px solid ${colors.dark};
  border-radius: 3rem;
`;

const Delete = styled.span`
  cursor: ${({ disabled }) => !disabled && `pointer`};
`;

export const SelectMulti = ({
  onChange,
  onDelete,
  selectedValue,
  emptyValue,
  values,
  className,
  disabled = false,
}) => {
  return (
    <Container className={className}>
      <Select
        onChange={onChange}
        selectedValue=""
        emptyValue={emptyValue}
        values={values}
        disabled={disabled}
      />
      <OptionContainer>
        {selectedValue.map((value, key) => {
          const labelIndex = values.findIndex((item) => item.value === value);

          return (
            <Option key={key}>
              {values[labelIndex].label}{" "}
              <Delete
                onClick={() => !disabled && onDelete(value)}
                disabled={!!disabled}
                data-test="Delete"
              >
                [x]
              </Delete>
            </Option>
          );
        })}
      </OptionContainer>
    </Container>
  );
};
