import type { Battle } from "../../../src";
import { canRightItself } from "../../../src/effect/right-itself";
import { EMPTY_BATTLE } from "../../../src/empty/battle";
test("戦闘で死亡していなければ、体勢整えを実施する", () => {
  const data: Battle = { ...EMPTY_BATTLE,
    isDeath: false
  };
  const result = canRightItself(data);
  expect(result).toBe(true);
});
test("戦闘で死亡していれば、体勢整えは行わない", () => {
  const data: Battle = { ...EMPTY_BATTLE,
    isDeath: true
  };
  const result = canRightItself(data);
  expect(result).toBe(false);
});