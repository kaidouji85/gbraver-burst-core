import { getFirstTurnPlayer } from "../../../src/effect/start-game/first-turn-payer";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { PlayerId } from "../../../src/player/player";
import { PlayerState } from "../../../src/state/player-state";

/**
 * テスト用のプレイヤーを生成する
 * @param playerId プレイヤーID
 * @param speed 機動力
 * @returns 生成結果
 */
const cratePlayer = (playerId: PlayerId, speed: number): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId,
  armdozer: { ...EMPTY_ARMDOZER_STATE, speed },
});

/** 機動力が高いプレイヤー */
const fastPlayer = cratePlayer("fast-player", 3000);
/** 機動力が低いプレイヤー */
const slowPlayer = cratePlayer("slow-player", 1000);

test.each([
  { p1: fastPlayer, p2: slowPlayer, random: 0 },
  { p1: fastPlayer, p2: slowPlayer, random: 0.5 },
  { p1: slowPlayer, p2: fastPlayer, random: 0 },
  { p1: slowPlayer, p2: fastPlayer, random: 0.5 },
])(
  "二人のプレイヤーで機動力が異なる場合、ランダム値に関わらず機動力が高いプレイヤーの先行となる(players=[$p1.playerId, $p2.playerId], random=$random)",
  ({ p1, p2, random }) => {
    expect(getFirstTurnPlayer(p1, p2, random)).toBe("fast-player");
  },
);

/** 機動力が同じプレイヤー1 */
const sameSpeedPlayer1 = cratePlayer("same-speed-player1", 1000);
/** 機動力が同じプレイヤー2 */
const sameSpeedPlayer2: PlayerState = cratePlayer("same-speed-player2", 1000);

test.each([
  { random: 0, expected: "same-speed-player1" },
  { random: 0.5, expected: "same-speed-player2" },
])(
  "二人のプレイヤーで機動力が等しい場合、ランダム値から先行プレイヤーを決定する(random=$random)",
  ({ random, expected }) => {
    expect(getFirstTurnPlayer(sameSpeedPlayer1, sameSpeedPlayer2, random)).toBe(
      expected,
    );
  },
);
