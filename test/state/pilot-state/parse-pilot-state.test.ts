import { EMPTY_PILOT_STATE, parsePilotState, PilotState } from "../../../src";

/** 有効なPilotState */
const pilotState: PilotState = EMPTY_PILOT_STATE;

test("PilotStateはパースできる", () => {
  expect(parsePilotState(pilotState)).toEqual(pilotState);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(pilotState);
  const data = JSON.parse(str);
  expect(parsePilotState(data)).toEqual(pilotState);
});

test("PilotState以外はパースできない", () => {
  const data = {
    id: "invalid-pilot",
    canPilotSkill: true,
  };
  expect(parsePilotState(data)).toBeNull();
});
