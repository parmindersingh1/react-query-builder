import { clone } from './clone';

export const denormalizeTree = (data) => {
  const clonedData = clone(data);
  const denormalizedData = clonedData.filter((item) => !item.parent);

  const run = (d, originalData) => {
    d.map((item) => {
      if (typeof item.children !== 'undefined') {
        const tmpItem = clone(item);

        delete item.children;
        delete item.id;
        delete item.parent;
        delete item.operators;

        item.children = [];

        tmpItem.children.map((id) => {
          const clonedChildrenData = clone(
            originalData.filter((oItem) => oItem.id === id)[0]
          );

          delete clonedChildrenData.id;
          delete clonedChildrenData.parent;
          delete clonedChildrenData.operators;

          item.children.push(clonedChildrenData);
        });

        run(item.children, originalData);
      }
    });
  };

  run(denormalizedData, clonedData);
  return denormalizedData;
};