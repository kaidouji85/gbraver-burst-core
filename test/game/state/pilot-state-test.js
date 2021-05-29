// @flow

import test from 'ava';
import type {PilotState} from "../../../src/state/pilot-state";
import {createPilotState} from "../../../src/state/pilot-state";
import type {Pilot} from "../../../src/player/pilot";
import {EMPTY_PILOT} from "../../../src/empty/pilot";

test('パイロットステート生成処理を正しく処理できる', t => {
  const data: Pilot = EMPTY_PILOT;
  const result = createPilotState(data);
  const expected: PilotState = {
    ...data,
    enableSkill: true
  };
  t.deepEqual(result, expected);
});
