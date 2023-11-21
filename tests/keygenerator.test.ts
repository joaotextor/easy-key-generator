import CodeGenerator, { ICodeGenerator } from "../index";
describe("Key Generator Tests", () => {
  describe("Testing 'validateGroupFormat' errors and warnings'", () => {
    let sut: ICodeGenerator;

    it("Should throw error when 'groupFormat' is being used with other 'characterType' other than 'LettersAndNumbers'", () => {
      sut = new CodeGenerator(5, {
        characterType: "Letters",
        groupFormat: "NNLNL",
      });
      expect(() => sut.generate()).toThrow(
        new Error("The grouptFormat can only be used with 'LettersAndNumbers' charaterType!"),
      );
    });

    it("Should throw error when 'groupFormat' has any characters other than 'L' or 'N'", () => {
      sut = new CodeGenerator(5, {
        characterType: "LettersAndNumbers",
        groupFormat: "LLLLB",
      });
      expect(() => sut.generate()).toThrow(
        new Error("The group format can only contain letters 'L' and numbers 'N'"),
      );
    });
  });

  describe("Testing the 'generate' method", () => {
    let sut: ICodeGenerator;

    it("Should generate a random code with the default options", () => {
      sut = new CodeGenerator(5);
      const randomSpy = jest.spyOn(Math, "random");
      const code = sut.generate();

      expect(code).toHaveLength(1);
      expect(code[0]).toHaveLength(5);
      expect(randomSpy).toHaveBeenCalledTimes(code[0]!.length);
    });

    it("Should generate a code with 2 groups and the default group separator", () => {
      sut = new CodeGenerator(5, {
        groups: 2,
      });
      const code = sut.generate();

      expect(code).toHaveLength(1);
      expect(code[0]).toHaveLength(11);
      expect(code[0]![5]).toBe("-");
    });

    it("Should generate a code with 2 groups and the '_' 'groupSeparator'", () => {
      sut = new CodeGenerator(5, {
        groups: 2,
        groupSeparator: "_",
      });
      const code = sut.generate();

      expect(code).toHaveLength(1);
      expect(code[0]).toHaveLength(11);
      expect(code[0]![5]).toBe("_");
    });

    it("Should generate 2 random keys", () => {
      sut = new CodeGenerator(5, {
        numberOfKeys: 2,
      });
      const code = sut.generate();

      expect(code).toHaveLength(2);
      expect(code[0]).toHaveLength(5);
      expect(code[1]).toHaveLength(5);
    });

    it("Should generate 1 key with only numbers", () => {
      sut = new CodeGenerator(5, {
        characterType: "Numbers",
      });
      const code = sut.generate();
      const numberCode = Number(code[0]);

      expect(code).toHaveLength(1);
      expect(numberCode).not.toBeNaN();
    });

    it("Should generate a key with 'groupFormat' length instead of the length informed.", () => {
      sut = new CodeGenerator(5, {
        characterType: "LettersAndNumbers",
        groupFormat: "NNLNLLN",
      });
      const code = sut.generate();

      expect(code[0]).toHaveLength(7);
    });

    it("Should generate a key with the format informed in 'groupFormat' property. ", () => {
      const groupFormat = "LLNLN";
      const groupFormatArray = Array.from(groupFormat);

      sut = new CodeGenerator(5, {
        groupFormat: groupFormat,
      });
      const codes = sut.generate();
      const codeArray = Array.from(codes[0]!);

      for (let char in codeArray) {
        const codeChar = Number(codeArray[char]);
        if (groupFormatArray[char] === "L") {
          expect(codeChar).toBeNaN;
          return;
        }
        expect(codeChar).not.toBeNaN();
      }
    });
  });
});
