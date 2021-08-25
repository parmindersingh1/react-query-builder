import { Component } from "./Component/index";
import { Group } from "./Group/index";
import React from "react";

export const Iterator = ({ originalData, filteredData, isRoot = true }) => (
  <>
    {filteredData.map((item) => {
      if (typeof item.children !== "undefined") {
        const items = [];

        item.children.forEach((id) => {
          items.push(originalData.filter((fitem) => id === fitem.id)[0]);
        });

        if (item.type === "GROUP") {
          const { id, value, isNegated } = item;

          return (
            <Group
              key={id}
              value={value}
              isNegated={isNegated}
              id={id}
              isRoot={isRoot}
            >
              <Iterator
                originalData={originalData}
                filteredData={items}
                isRoot={false}
              />
            </Group>
          );
        }

        return null;
      } else {
        const { field, value, id, operator } = item;

        return (
          <Component
            key={id}
            field={field}
            value={value}
            operator={operator}
            id={id}
            data-test="IteratorComponent"
          />
        );
      }
    })}
  </>
);
