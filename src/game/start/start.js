// @flow

import type {GameState} from "../../state/game-state";
import {startGame} from "../../effect/start-game";
import {gameStartInputCommand} from "../../effect/input-command";
import {upcastGameState as up} from "../../state/game-state";
import type {Player} from "../../player/player";
import {chain, start as startFlow} from '../state-updator/state-updator';

/**
 * ゲームの初期状態を生成する
 *
 * @param players ゲーム参加プレイヤー
 * @return ゲーム初期状態
 */
export function start(players: [Player, Player]): GameState[] {
  const ret= startFlow(startGame(players))
    .to(chain(v => gameStartInputCommand(up(v))))
    .stateHistory;
  console.log(ret);  
  return ret;
}