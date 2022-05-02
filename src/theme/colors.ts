export type Color = number[];

export interface Gradient {
  angle: number;
  stops: [Color, number][];
}

export const neutral = {
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
  black: [0, 0, 0],
  black1: [44, 44, 44], // #2C2C2C
  black2: [22, 22, 22], // #161616,
  black3: [101, 101, 101], // #656565
  black4: [26, 26, 26], // #1B1A1A
};

export const blue = {
  blue1: [116, 143, 241], // #748FF1
  blue2: [117, 106, 254],
  blue3: [86, 127, 255],
  blue4: [0, 14, 57, 0.24],
};

export const green = {
  green1: [80, 214, 109], // #50D66D
};

export const disabled = {
  disabled1: [209, 209, 233],
  disabled2: [140, 140, 200],
};

export const gradient = {
  gradient1: {
    angle: 180,
    stops: [
      [[255, 255, 255], 0],
      [[229, 229, 229, 0.31], 1],
    ],
  } as Gradient,
  gradient2: {
    angle: 180,
    stops: [
      [[9, 9, 9], 0],
      [[8, 11, 15, 0.31], 1],
    ],
  } as Gradient,
  bgDefaultLight: {
    angle: 180,
    stops: [
      [[255, 255, 255], 0],
      [[238, 236, 242], 1],
    ],
  } as Gradient,
  bgDefaultDark: {
    angle: 180,
    stops: [
      [[47, 55, 68], 0],
      [[20, 25, 31], 0.33],
    ],
  } as Gradient,
  cardDefaultLight: {
    angle: 180,
    stops: [
      [[255, 255, 255], 0],
      [[229, 229, 229, 0], 1],
    ],
  } as Gradient,
  cardDefaultDark: {
    angle: 180,
    stops: [
      [[9, 9, 9], 0],
      [[8, 11, 15, 0], 1],
    ],
  } as Gradient,
};

const formatHexChannel = (channel: number) => {
  return Math.max(0, Math.min(255, channel | 0))
    .toString(16)
    .padStart(2, "0");
};

const formatRgbChannel = (channel: number) => {
  return Math.max(0, Math.min(255, channel | 0)).toString();
};

export const formatColor = (color: number[]) => {
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

  throw new TypeError("Invalid color: " + String(color));
};

export const formatGradient = ({ angle, stops }: Gradient) => {
  return `${angle}deg, ${stops
    .map(([color, position]) => `${formatColor(color)} ${position * 100}%`)
    .join(", ")}`;
};
