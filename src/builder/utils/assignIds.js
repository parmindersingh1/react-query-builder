import { clone } from "./clone";
import uniqid from "uniqid";

export const assignIds = (data) => {
  data = { children: clone(data) };

  const run = (d) => {
    if (typeof d.children !== "undefined") {
      d.children = d.children.map((item) => {
        item.id = uniqid();
        return run(item);
      });
    }

    return d;
  };

  return run(data).children;
};
