import React from "react";
import { colors } from "../../constants/colors";
import styled from "styled-components";

const StyledComponent = styled.div`
  display: grid;
  grid-auto-flow: column;
  margin: 0.5rem 0;
  padding: 0.7rem;
  background-color: #fff;
  border: 1px solid ${colors.medium};
`;

const Content = styled.div`
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
`;

const Controls = styled.div`
  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  justify-self: flex-end;
`;

export const Component = ({ children, controls, className }) => (
  <StyledComponent className={className}>
    <Content>{children}</Content>
    <Controls>{controls}</Controls>
  </StyledComponent>
);
