import { getFirstTurnPlayer } from "../../../src/effect/start-game/first-turn-payer";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { PlayerState } from "../../../src/state/player-state";

test("ランダム値、引数順番に関わらず、機動力が高いプレイヤーが先行となる", () => {
  const fastPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "fast-player",
    armdozer: { ...EMPTY_ARMDOZER_STATE, speed: 3000 },
  };
  const slowPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "slow-player",
    armdozer: { ...EMPTY_ARMDOZER_STATE, speed: 1000 },
  };

  const data = [
    [fastPlayer, slowPlayer, 0],
    [fastPlayer, slowPlayer, 0.5],
    [slowPlayer, fastPlayer, 0],
    [slowPlayer, fastPlayer, 0.5],
  ] as const;
  data.forEach(([p1, p2, random]) => {
    expect(getFirstTurnPlayer(p1, p2, random)).toBe(fastPlayer.playerId);
  });
});

test("スピードが同じ場合にはランダムで先行を決定", () => {
  const player1: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player1",
    armdozer: { ...EMPTY_ARMDOZER_STATE, speed: 1000 },
  };
  const player2: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player2",
    armdozer: { ...EMPTY_ARMDOZER_STATE, speed: 1000 },
  };

  const data = [
    { random: 0, expected: player1.playerId },
    { random: 0.5, expected: player2.playerId },
  ] as const;
  data.forEach(({ random, expected }) => {
    expect(getFirstTurnPlayer(player1, player2, random)).toBe(expected);
  });
});
