import { clone } from "./clone";
import { isString } from "./types";
import { strings } from "../constants/strings";

export const queryString = (data) => {
  console.log("1111111", data);
  const clonedData = clone(data);
  const queryStringData = [];

  // const runGroup = (item, queryStringData) => {
  //   if (typeof item.children !== "undefined") {
  //     queryStringData.push("(");
  //     const fields = runChildren(item.children, queryStringData);
  //     queryStringData.push(fields.join(` ${item.value} `));
  //     queryStringData.push(")");
  //     queryStringData.push();
  //     // console.log("fields ", fields, item)
  //   }
  // };

  const wrapBrackets = (stringData) => {
    return `( ${stringData} )`;
  };

  const wrapQuotes = (stringData) => {
    return `'${stringData}'`;
  };

  const runChild = (child) => {
    const field = [];
    field.push(child.field);

    if (typeof child.operator !== "undefined") {
      field.push(child.operator);
    } else {
      field.push(strings.operators.EQUAL.toUpperCase());
    }

    if (child.functionType) {
      field.push(child.functionType);
    }

    if (typeof child.value !== "undefined") {
      if (Array.isArray(child.value)) {
        field.push(
          wrapBrackets(
            child.value
              .map((val) => (isString(val) ? wrapQuotes(val) : val))
              .join(", ")
          )
        );
      } else {
        field.push(
          (child.fieldType.toUpperCase() === strings.valueTypes.value ||
            child.fieldType.toUpperCase() === strings.valueTypes.function) &&
            isString(child.value)
            ? child.functionType
              ? wrapBrackets(wrapQuotes(child.value))
              : wrapQuotes(child.value)
            : child.functionType
            ? wrapBrackets(child.value)
            : child.value
        );
      }
    }
    return field.join(" ");
  };

  const runChildren = (children) => {
    const fields = [];
    children.forEach((child) => {
      if (child.type === "GROUP") {
        fields.push(runGroup(child));
      } else if (typeof child.field !== "undefined") {
        fields.push(runChild(child));
      }
    });
    console.log("runChildren fields", fields);

    return fields;
  };

  const runGroup = (item) => {
    const groupArr = [];
    if (typeof item.children !== "undefined") {
      if (item.isNegated) {
        groupArr.push(strings.operators.NOT.toUpperCase());
      }
      // groupArr.push("(");
      const fields = runChildren(item.children);
      groupArr.push(wrapBrackets(fields.join(` ${item.value} `)));
      // groupArr.push(")");
      return groupArr.join(" ");
    }
  };

  const run = (d, queryStringData) => {
    const fields = [];
    d.forEach((child) => {
      if (child.type === "GROUP") {
        fields.push(runGroup(child));
      } else if (typeof child.field !== "undefined") {
        runChild(child, fields);
      }
    });
    console.log("run fields", queryStringData.push(fields.join(" ")));

    // return fields.join(" ");
  };

  run(clonedData, queryStringData);
  console.log("@@@@ ", queryStringData);
  return queryStringData;
};
