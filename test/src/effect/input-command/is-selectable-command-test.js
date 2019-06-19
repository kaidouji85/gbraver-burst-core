// @flow

import test from 'ava';
import {isSelectableCommand} from "../../../../src/effect/input-command/is-selectable-command";

test('バーストフェイズ時にバーストコマンドを選択した場合、次のターンでコマンド選択可能', t => {
  const result = isSelectableCommand({type: 'BURST_COMMAND'});
  t.true(result);
});

test('バーストフェイズ時にバーストコマンド以外を選択した場合、次のターンでコマンド選択不可能', t => {
  const result = isSelectableCommand({type: 'BATTERY_COMMAND'});
  t.false(result);
});
