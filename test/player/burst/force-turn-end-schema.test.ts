import {
  ForceTurnEnd,
  ForceTurnEndSchema,
} from "../../../src/player/burst/force-turn-end";

/** 有効なForceTurnEnd */
const forceTurnEnd: ForceTurnEnd = {
  type: "ForceTurnEnd",
  recoverBattery: 3,
};

test("ForceTurnEndはパースできる", () => {
  expect(ForceTurnEndSchema.parse(forceTurnEnd)).toEqual(forceTurnEnd);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(forceTurnEnd);
  const data = JSON.parse(str);
  expect(ForceTurnEndSchema.parse(data)).toEqual(forceTurnEnd);
});

test("ForceTurnEnd 以外は例外を投げる", () => {
  const data = {
    type: "ForceTurnEnd",
    recover: 3,
  };
  expect(() => ForceTurnEndSchema.parse(data)).toThrow();
});
