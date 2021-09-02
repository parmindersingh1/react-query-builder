import "./App.css";

import * as React from "react";

import { Builder, colors } from "./builder";

import { normalizeTree } from "./builder/utils/normalizeTree";
import { queryString } from "./builder/utils/queryString";
import styled from "styled-components";

const Code = styled.pre`
  margin: 1rem 0;
  padding: 1rem;
  font-size: 0.7rem;
  background: ${colors.light};
  border: 1px solid ${colors.darker};
`;

export const queryTree = [
  {
    type: "GROUP",
    value: "AND",
    isNegated: false,
    children: [
      // {
      //   field: "IS_IN_CZ",
      //   value: false,
      // },
    ],
  },
];

export const fields = [
  {
    field: "STATE",
    label: "State",
    type: "LIST",
    fieldType: "value",
    operators: ["EQUAL", "NOT_EQUAL"],
    value: [
      { value: "CZ", label: "Czech Republic" },
      { value: "SK", label: "Slovakia" },
      { value: "PL", label: "Poland" },
    ],
  },
  {
    field: "TEST_MULTI",
    label: "Test Multi",
    type: "MULTI_LIST",
    fieldType: "value",
    operators: ["ALL_IN", "ANY_IN", "NOT_IN"],
    value: [
      { value: "LOREM", label: "Lorem" },
      { value: "IPSUM", label: "Ipsum" },
      { value: "DOLOR", label: "Dolor" },
    ],
  },
  {
    field: "IS_IN_EU",
    label: "Is in EU",
    type: "BOOLEAN",
    fieldType: "value",
  },
  {
    field: "IS_IN_CZ",
    label: "Is in CZ",
    type: "BOOLEAN",
    fieldType: "value",
  },
  {
    field: "IS_ACTIVE",
    label: "Is Active",
    type: "BOOLEAN",
    fieldType: "value",
  },
  {
    field: "TEST_TEXT",
    label: "Test text",
    type: "TEXT",
    fieldType: "value",
    operators: ["NOT_BETWEEN", "EQUAL", "NOT_EQUAL", "BETWEEN"],
  },
  {
    field: "TEST_NUMBER",
    label: "Test Number",
    type: "NUMBER",
    fieldType: "value",
    operators: [
      "EQUAL",
      "NOT_EQUAL",
      "BETWEEN",
      "NOT_BETWEEN",
      "LARGER",
      "SMALLER",
      "LARGER_EQUAL",
      "SMALLER_EQUAL",
    ],
  },
  {
    field: "TEST_DATE",
    label: "Test Date",
    type: "DATE",
    fieldType: "value",
    operators: ["NOT_EQUAL", "NOT_BETWEEN"],
  },
  {
    field: "BLAH",
    label: "Blah",
    type: "TEXT",
    fieldType: "value",
    operators: [
      "NOT_BETWEEN",
      "EQUAL",
      "NOT_EQUAL",
      "BETWEEN",
      "LIKE",
      "NOT_LIKE",
    ],
  },
  {
    field: "HAS_LOW_CREDIT",
    label: "Has low credits",
    type: "STATEMENT",
    fieldType: "value",
    value: "HAS_DEBT() AND IS_IN_INSOLVENCY_REGISTER()",
  },
];

function App() {
  const [output, setOutput] = React.useState(queryTree);
  const [readOnly, setReadOnly] = React.useState(false);
  return (
    <>
      <button onClick={() => setReadOnly(!readOnly)}>Read Only</button>
      <Builder
        data={queryTree}
        fields={fields}
        readOnly={readOnly}
        onChange={setOutput}
      />

      <h3>Output</h3>
      <Code>{JSON.stringify(output, null, 4)}</Code>
      <Code>
        {queryString(
          output
          // [
          //   {
          //     type: "GROUP",
          //     value: "AND",
          //     isNegated: true,
          //     children: [
          //       {
          //         field: "STATE",
          //         value: "CZ",
          //         operator: "EQUAL",
          //       },
          //       {
          //         type: "GROUP",
          //         value: "AND",
          //         isNegated: false,
          //         children: [
          //           {
          //             field: "IS_ACTIVE",
          //             value: true,
          //           },
          //           {
          //             field: "TEST_MULTI",
          //             value: ["LOREM", "IPSUM"],
          //             operator: "ALL_IN",
          //           },
          //         ],
          //       },
          //     ],
          //   },
          // ]
        )}
      </Code>
    </>
  );
}

export default App;
