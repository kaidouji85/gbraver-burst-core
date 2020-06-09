// @flow

import type {Battle} from "../../src";

/** 空の戦闘情報 */
export const EMPTY_BATTLE: Battle = {
  name: 'Battle',
  attacker: '',
  isDeath: false,
  result: {
    name: 'Miss'
  }
};