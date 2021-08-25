import { clone } from "./clone";

export const normalizeTree = (data) => {
  const clonedData = { children: clone(data) };
  const normalizedData = [];

  const run = (d, parentId = 0) => {
    if (typeof d.children !== "undefined") {
      const children = [];

      d.children.map((item) => {
        if (parentId !== 0) {
          item.parent = parentId;
        }

        const tmpItem = clone(item);
        delete tmpItem.children;

        normalizedData.push(tmpItem);
        children.push(tmpItem.id);

        run(item, item.id);
      });

      if (parentId !== 0) {
        for (const item of normalizedData) {
          if (item.id === parentId) {
            item.children = children;
          }
        }
      }
    }
  };

  run(clonedData);
  return normalizedData;
};
