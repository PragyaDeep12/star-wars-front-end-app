//colors
export const USERNAME_COLORS = [
  "#ff7b00",
  "#00664a",
  "#280066",
  "#660042",
  "#660000",
  "#663100",
  "#fafa82",
  "#000000",
  "#6382e0",
  "#922724",
  "#fff"
];
export const COLORS_MAP: Map<String, String> = new Map();
export function getMap() {
  COLORS_MAP.set("yellow", "#ff7b00");
  COLORS_MAP.set("green", "#00664a");
  COLORS_MAP.set("violet", "#280066");
  COLORS_MAP.set("maroon", "#660042");
  COLORS_MAP.set("brown", "#660000");
  COLORS_MAP.set("brownie", "#663100");
  COLORS_MAP.set("blond", "#fafa82");
  COLORS_MAP.set("black", "#000000");
  COLORS_MAP.set("blue", "#6382e0");
  COLORS_MAP.set("auburn", "#922724");

  COLORS_MAP.set("white", "#fff");
  return COLORS_MAP;
}
