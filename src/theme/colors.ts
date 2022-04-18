export type Color = number[];

export interface Gradient {
  angle: number;
  stops: [Color, number][];
}

export const neutral = {
  white: [255, 255, 255],
  white1: [91, 91, 91], // #5B5B5B
  white2: [239, 239, 239], // #EFEFEF
  gray1: [162, 162, 162], // #A2A2A2
  gray2: [231, 231, 231], // #E7E7E7
  gray3: [175, 175, 175], //#AFAFAF
  gray4: [20, 20, 20], //#141414
  gray5: [57, 57, 57], // #393939
  gray6: [240, 240, 240],
  gray7: [151, 151, 151],
  gray8: [40, 40, 43, 0.24],
  gray9: [127, 127, 127], // #7F7F7F
  black: [0, 0, 0],
  black1: [44, 44, 44], // #2C2C2C
  black2: [22, 22, 22], // #161616,
  black3: [101, 101, 101], // #656565
  black4: [26, 26, 26], // #1B1A1A
};

export const blue = {
  blue1: [32, 77, 217],
  blue2: [117, 106, 254],
  blue3: [86, 127, 255],
  blue4: [0, 14, 57, 0.24],
};

export const green = {
  green1: [32, 196, 110],
};

export const disabled = {
  disabled1: [209, 209, 233],
  disabled2: [140, 140, 200],
};

export const gradient = {
  gradient1: {
    angle: 180,
    stops: [
      [[32, 196, 110], 0],
      [[32, 77, 217], 1],
    ],
  } as Gradient,
  gradient2: {
    angle: 180,
    stops: [
      [[86, 127, 255], 0],
      [[0, 255, 148], 1],
    ],
  } as Gradient,
  gradient3: {
    angle: 89.49,
    stops: [
      [[116, 16, 195], 0],
      [[195, 16, 166], 0.33],
      [[223, 111, 111], 1],
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
      )},${formatHexChannel(color[2])},${Math.max(
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
