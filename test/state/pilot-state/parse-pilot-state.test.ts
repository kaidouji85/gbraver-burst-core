import { EMPTY_PILOT_STATE, parsePilotState } from "../../../src";

test("PilotStateはパースできる", () => {
  const data = EMPTY_PILOT_STATE;
  expect(parsePilotState(data)).toEqual(data);
});

test("PilotState以外はパースできない", () => {
  const data = {
    id: "invalid-pilot",
    canPilotSkill: true,
  };
  expect(parsePilotState(data)).toBeNull();
});
