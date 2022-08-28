import type { Module } from "../types";

// https://astroneer.fandom.com/wiki/Modules
const MODULES: Module[] = [
  {
    name: "small printer",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/6/6c/Small_Printer.png",
    needs: [{ tool: "backpack", resources: ["compound"] }],
    tier: 1,
  },
  {
    name: "medium printer",
    type: "module",
    icon: "https://static.wikia.nocookie.net/astroneer_gamepedia/images/5/52/Medium_Printer.png",
    needs: [{ tool: "small printer", resources: ["compound"] }],
    tier: 2,
  },
];

export { MODULES };
