import React, { createContext } from "react";

import { defaultComponents } from "./Builder";
import { strings as defaultStrings } from "../constants/strings";

export const BuilderContext = createContext(
  // tslint:disable-next-line: no-object-literal-type-assertion
  {}
);

export const BuilderContextProvider = ({
  fields,
  components,
  strings,
  data,
  readOnly,
  setData,
  onChange,
  children,
}) => {
  components = {
    ...defaultComponents,
    ...components,
    form: { ...defaultComponents.form, ...components.form },
  };

  strings = {
    ...defaultStrings,
    ...strings,
    component: {
      ...defaultStrings.component,
      ...strings.component,
    },
    form: {
      ...defaultStrings.form,
      ...strings.form,
    },
    group: {
      ...defaultStrings.group,
      ...strings.group,
    },
    operators: {
      ...defaultStrings.operators,
      ...strings.operators,
    },
  };

  return (
    <BuilderContext.Provider
      value={{
        fields,
        components,
        strings,
        data,
        readOnly,
        setData,
        onChange,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
