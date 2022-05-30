import { generateSmoothGradient } from "./gradient/easing";

export type Color = [number, number, number] | [number, number, number, number];

export type ColorStop = [Color, number];

export interface Gradient {
  angle: number;
  stops: ColorStop[];
}

export const fixAlpha = (c: Color): Color => {
  if (c.length == 3) {
    return [...c, 1];
  }
  return c;
};

export const neutral: { [key: string]: [number, number, number] } = {
  white: [255, 255, 255],
  gray1: [55, 66, 82], // #374252 grey-300
  gray2: [117, 126, 140], // #757E8C grey-200
  gray3: [163, 169, 186], //#AFAFAF grey-400
  gray4: [32, 32, 32], //#202020
  gray5: [243, 243, 243], // #F3F3F3
  gray6: [237, 237, 237], // #EDEDED
  gray7: [32, 38, 47], // #20262F
  gray8: [47, 56, 72], // #2F3848
  gray9: [127, 127, 127], // #7F7F7F
  gray10: [107, 118, 135], // #6B7687
  black: [0, 0, 0],
  black1: [47, 45, 45], // #2F2D2D
  black2: [22, 22, 22], // #161616,
  black3: [101, 101, 101], // #656565
  black4: [26, 26, 26], // #1B1A1A
  black5: [10, 11, 12], // #0A0B0C
  black6: [29, 35, 46], // #1D232E
};

export const blue: { [key: string]: [number, number, number] } = {
  blue1: [116, 143, 241], // #748FF1
  blue2: [5, 45, 255], // #052DFF
  blue3: [205, 225, 255], // #CDE1FF
  blue4: [146, 189, 255], // #92BDFF
  blue5: [173, 176, 255], // #ADB0FF
  blue6: [46, 54, 249], // #2E36F9
  blue7: [94, 100, 244], // #5E64F4
  blue8: [193, 195, 254], // #C1C3FE
  blue9: [226, 238, 252], // blue1 0.17
  blue10: [188, 197, 233], // #BCC5E9
  blue11: [217, 227, 255], // #D9E3FF
  blue12: [73, 111, 246], // #496FF7
  blue13: [59, 66, 95], // #3B425F
  blue14: [84, 102, 165], // #5466A5
  blue15: [53, 149, 255], // #3595FF
  blue16: [26, 49, 85], // #1A3155
};

export const green: { [key: string]: [number, number, number] } = {
  green1: [80, 214, 109], // #50D66D
  green2: [13, 215, 57], // #0DD739
  green3: [0, 187, 41], // #00BB29
  green4: [42, 61, 45], // #2A3D2D
  green5: [219, 249, 225], // #DBF9E1
  green6: [51, 65, 62], // #33413E
};

export const disabled: { [key: string]: [number, number, number] } = {
  disabled1: [176, 180, 194], // #B0B4C2
  disabled2: [140, 140, 200],
};

export const pink: { [key: string]: Color } = {
  pink1: [231, 66, 161], // E742A1
  pink2: [251, 223, 239], // #FBDFEF
  pink3: [73, 65, 74], // #49414A
};

export const gradient: { [key: string]: Gradient } = {
  gradient1: {
    angle: 180,
    stops: [
      [[255, 255, 255], 0],
      [[229, 229, 229, 0.31], 1],
    ],
  },
  gradient2: {
    angle: 180,
    stops: [
      [[9, 9, 9], 0],
      [[8, 11, 15, 0.31], 1],
    ],
  },
  bgDefaultLight: {
    angle: 180,
    stops: [
      [[255, 255, 255], 0],
      [[238, 236, 242], 1],
    ],
  },
  bgDefaultDark: {
    angle: 180,
    stops: [
      [[48, 55, 68], 0],
      [[20, 24, 28], 0.33],
      [[28, 32, 38], 0.66],
      [[20, 24, 32], 1],
    ],
  },
  cardDefaultLight: {
    angle: 180,
    stops: [
      [[255, 255, 255], 0],
      [[229, 229, 229, 0], 1],
    ],
  },
  cardDefaultDark: {
    angle: 180,
    stops: [
      [[9, 9, 9], 0],
      [[8, 11, 15, 0], 1],
    ],
  },
  statDefaultLight: {
    angle: 180,
    stops: [
      [[255, 255, 255], 0],
      [[255, 255, 255], 0.33],
      [[229, 229, 229, 0], 1],
    ],
  },
  statDefaultDark: {
    angle: 180,
    stops: [
      [[9, 9, 9], 0],
      [[8, 11, 15, 0], 1],
    ],
  },
};

const formatHexChannel = (channel: number) => {
  return Math.max(0, Math.min(255, channel | 0))
    .toString(16)
    .padStart(2, "0");
};

const formatRgbChannel = (channel: number) => {
  return Math.max(0, Math.min(255, channel | 0)).toString();
};

export const formatColor = (color: Color) => {
  switch (color.length) {
    case 3:
      return `#${formatHexChannel(color[0])}${formatHexChannel(
        color[1]
      )}${formatHexChannel(color[2])}`.toUpperCase();
    case 4:
      return `rgba(${formatRgbChannel(color[0])},${formatRgbChannel(
        color[1]
      )},${formatRgbChannel(color[2])},${Math.max(
        0,
        Math.min(1, color[3])
      ).toPrecision(3)})`;
  }
};

export const formatGradient = (gr: Gradient) => {
  const { angle, stops } = generateSmoothGradient(gr);
  const cr = `${angle}deg, ${stops
    .map(([color, position]) => `${formatColor(color)} ${position * 100}%`)
    .join(", ")}`;
  return cr;
};
