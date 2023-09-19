import { charactersByType } from "./utils/charactersByType";
import { characterType, charType } from "./utils/types/characterType";
import { separatorType } from "./utils/types/separatorType";

export interface ICodeGenerator {
  numberOfCharacters?: number;
  generate: () => string[];
}

export type Props = {
  characterType?: characterType;
  groups?: number;
  groupSeparator?: separatorType;
  numberOfKeys?: number;
  groupFormat?: string;
};

export default class CodeGenerator implements ICodeGenerator {
  private _numberOfCharacters: number;
  private _characterType?: characterType;
  private _groupSeparator?: separatorType;
  private _groups?: number;
  private _groupFormat?: string;
  private _numberOfKeys?: number;
  constructor(numberOfCharacters: number, props: Props = {} as Props) {
    this._numberOfCharacters = numberOfCharacters;
    this._characterType = props?.characterType ?? charType.LettersAndNumbers;
    this._groups = props?.groups ?? 1;
    this._groupSeparator = props?.groupSeparator ?? "-";
    this._numberOfKeys = props?.numberOfKeys ?? 1;
    this._groupFormat = props?.groupFormat;
  }

  public generate(): string[] {
    let characters = charactersByType[this._characterType!];
    const numberOfCharacters = this._groupFormat?.length || this._numberOfCharacters;

    CodeGenerator.validateGroupFormat(this._groupFormat!, characters);

    const groupFormatArr = this._groupFormat ? Array.from(this._groupFormat!) : [];

    let keys: string[] = [];

    for (let count = 0; count < this._numberOfKeys!; count++) {
      let result: string = "";

      for (let groups = 1; groups <= this._groups!; groups++) {
        for (let i = 0; i < numberOfCharacters; i++) {
          if (this._groupFormat) {
            const char = groupFormatArr[i];

            characters =
              char === "L"
                ? (characters = charactersByType[charType.Letters])
                : (characters = charactersByType[charType.Numbers]);
          }

          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        if (this._groups! - groups != 0) {
          result += this._groupSeparator;
        }
      }

      keys.push(result);
    }

    return keys;
  }

  private static selectCharater(char: characterType): string {
    return charactersByType[char];
  }

  private static validateGroupFormat(groupFormat: string, characters: string): void {
    if (!groupFormat) {
      console.log("Group Format is not defined, skipping validation.");
      return;
    }

    if (characters != charactersByType.LettersAndNumbers) {
      throw new Error("The grouptFormat can only be used with 'LettersAndNumbers' charaterType!");
    }

    const regexStatement = /[N|L]/g;
    const matchLetters = groupFormat.match(regexStatement);

    if (matchLetters!.length != groupFormat.length) {
      throw new Error("The group format can only contain letters 'L' and numbers 'N'");
    }
  }
}
