import { wave1 } from "../whitelist/wave1";
import { wave2 } from "../whitelist/wave2";

const getWhitelist = (waveNum: number) => {
  if (waveNum === 1) {
    return wave1;
  }
  return wave2;
};

export const isInWhitelist = (waveNum: number, account: string) => {
  return getWhitelist(waveNum).has(account);
};
