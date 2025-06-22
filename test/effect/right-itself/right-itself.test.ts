import { Battle } from "../../../src/effect/battle/battle";
import { rightItself } from "../../../src/effect/right-itself";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { GameState } from "../../../src/state/game-state";

/** 攻撃側プレイヤー */
const attacker = { ...EMPTY_PLAYER_STATE, playerId: "attacker" };

/** 防御側プレイヤー */
const defender = { ...EMPTY_PLAYER_STATE, playerId: "defender" };

/** バトル結果 */
const battle: Battle = {
  name: "Battle",
  attacker: attacker.playerId,
  isDeath: false,
  result: {
    name: "Miss",
  },
};

test("防御側体勢整え効果が正しく適用できる", () => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    players: [attacker, defender],
  };
  const result = rightItself(lastState, battle);
  const expected = {
    ...lastState,
    effect: {
      name: "RightItself",
      defender: defender.playerId,
      battleResult: battle.result,
    },
  };
  expect(result).toEqual(expected);
});

test("防御側プレイヤーが見つからない場合は例外を投げる", () => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    // ゲームステートには攻撃側プレイヤーのIDのみが含まれるため、
    // それ以外のIDを持つプレイヤーをrightItselfでは防御側とみなしている
    // なので両方ともアタッカーにすることで、防御側プレイヤーが見つからない状態を再現する
    players: [attacker, attacker],
  };
  expect(() => rightItself(lastState, battle)).toThrow();
});
