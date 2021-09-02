import React, { useContext } from "react";

import { BuilderContext } from "../Context";
import { BuilderGroupValues } from "../Builder";
import { clone } from "../../utils/clone";
import uniqid from "uniqid";

export const Group = ({ value, isNegated, children, id, isRoot }) => {
  const { components, data, setData, onChange, strings, readOnly } =
    useContext(BuilderContext);
  const {
    Add,
    Group: GroupContainer,
    GroupHeaderOption: Option,
    Remove,
  } = components;

  const findIndex = () => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item) => item.id === id);
    let insertAfter = parentIndex;

    if (data[parentIndex].children && data[parentIndex].children.length > 0) {
      const lastChildren = clonedData[parentIndex].children.slice(-1)[0];
      insertAfter = clonedData.findIndex((item) => item.id === lastChildren);
    }

    return { insertAfter, parentIndex, clonedData };
  };

  const addItem = (payload) => {
    const { insertAfter, parentIndex, clonedData } = findIndex();

    if (!clonedData[parentIndex].children) {
      clonedData[insertAfter].children = [];
    }

    clonedData[parentIndex].children.push(payload.id);
    clonedData.splice(Number(insertAfter) + 1, 0, payload);

    setData(clonedData);
    onChange(clonedData);
  };

  const handleAddGroup = () => {
    const EmptyGroup = {
      type: "GROUP",
      value: "AND",
      isNegated: false,
      id: uniqid(),
      parent: id,
      children: [],
    };

    addItem(EmptyGroup);
  };

  const handleAddRule = () => {
    const EmptyRule = {
      field: "",
      id: uniqid(),
      parent: id,
      fieldType: "value",
      functionType: ""
    };

    addItem(EmptyRule);
  };

  const handleChangeGroupType = (nextValue) => {
    const { clonedData, parentIndex } = findIndex();
    clonedData[parentIndex].value = nextValue;

    setData(clonedData);
    onChange(clonedData);
  };

  const handleToggleNegateGroup = (nextValue) => {
    const { clonedData, parentIndex } = findIndex();
    clonedData[parentIndex].isNegated = nextValue;

    setData(clonedData);
    onChange(clonedData);
  };

  const handleDeleteGroup = () => {
    let clonedData = clone(data).filter((item) => item.id !== id);

    clonedData = clonedData.map((item) => {
      if (item.children && item.children.length > 0) {
        item.children = item.children.filter((childId) => childId !== id);
      }

      return item;
    });

    setData(clonedData);
    onChange(clonedData);
  };

  if (strings.group) {
    return (
      <GroupContainer
        controlsLeft={
          <>
            <Option
              isSelected={!!isNegated}
              value={!isNegated}
              disabled={readOnly}
              onClick={handleToggleNegateGroup}
              data-test="Option[not]"
            >
              {strings.group.not}
            </Option>
            <Option
              isSelected={value === "AND"}
              value="AND"
              disabled={readOnly}
              onClick={handleChangeGroupType}
              data-test="Option[and]"
            >
              {strings.group.and}
            </Option>
            <Option
              isSelected={value === "OR"}
              value="OR"
              disabled={readOnly}
              onClick={handleChangeGroupType}
              data-test="Option[or]"
            >
              {strings.group.or}
            </Option>
          </>
        }
        controlsRight={
          !readOnly && (
            <>
              <Add
                onClick={handleAddRule}
                label={strings.group.addRule}
                data-test="AddRule"
              />
              <Add
                onClick={handleAddGroup}
                label={strings.group.addGroup}
                data-test="AddGroup"
              />
              {!isRoot && (
                <Remove
                  onClick={handleDeleteGroup}
                  label={strings.group.delete}
                  data-test="Remove"
                />
              )}
            </>
          )
        }
      >
        {children}
      </GroupContainer>
    );
  }

  return null;
};
