import {
  Ineffective,
  IneffectiveSchema,
} from "../../../src/player/burst/ineffective";

/** Ineffective */
const ineffective: Ineffective = {
  type: "Ineffective",
  recoverBattery: 3,
};

test("Ineffectiveはパースできる", () => {
  expect(IneffectiveSchema.parse(ineffective)).toEqual(ineffective);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(ineffective);
  const data = JSON.parse(str);
  expect(IneffectiveSchema.parse(data)).toEqual(ineffective);
});

test("Ineffective 以外は例外を投げる", () => {
  const data = {
    type: "Ineffective",
    recover: 3,
  };
  expect(() => IneffectiveSchema.parse(data)).toThrow();
});
