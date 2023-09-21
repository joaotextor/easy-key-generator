import CodeGenerator, { ICodeGenerator } from "../index";
describe("Key Generator Tests", () => {
  describe("Testing 'validateGroupFormat' errors and warnings'", () => {
    let sut: ICodeGenerator;

    it("Should skip validation if 'groupFormat' was not informed by the user", () => {
      sut = new CodeGenerator(5);
      const consoleSpy = jest.spyOn(console, "log");
      sut.generate();

      expect(consoleSpy).toHaveBeenCalledWith("Group Format is not defined, skipping validation.");
    });

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
});
