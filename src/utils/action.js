import store from "@/store/index.js";
const panelHandle = (showList = [], isShow = true) => {
  const { panel } = store.state || {};
  // const panelList = Object.keys(panel);
  // panelList.map((item) => {
  //   if (item != "header") panel[item] = false;
  // });
  showList.map((item) => {
    panel[item] = isShow;
  });
};

export { panelHandle };
