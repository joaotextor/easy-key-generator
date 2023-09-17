export const charType = {
  Letters: "Letters",
  Numbers: "Numbers",
  LettersAndNumbers: "LettersAndNumbers",
  HexChar: "HexChar",
} as const;

export type characterType = keyof typeof charType;
