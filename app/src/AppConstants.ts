//colors
export const USERNAME_COLORS = [
  "#ff7b00",
  "#00664a",
  "#280066",
  "#660042",
  "#660000",
  "#663100",
  "#fffdc4",
  "#000000",
  "#6382e0"
];
export const COLORS_MAP: Map<String, String> = new Map();
export function getMap() {
  COLORS_MAP.set("yellow", "#ff7b00");
  COLORS_MAP.set("green", "#00664a");
  COLORS_MAP.set("violet", "#280066");
  COLORS_MAP.set("maroon", "#660042");
  COLORS_MAP.set("brown", "#660000");
  COLORS_MAP.set("brownie", "#663100");
  COLORS_MAP.set("blonde", "#fffdc4");
  COLORS_MAP.set("black", "#000000");
  COLORS_MAP.set("blue", "#6382e0");
  return COLORS_MAP;
}
