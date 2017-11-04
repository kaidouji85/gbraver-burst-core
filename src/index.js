// @flow
import {armDozers as _armDozers} from './master/armdozers';
import {createInitialState as _createInitialState} from './battle/create-initial-state';

export const armDozers = _armDozers;
export const createInitialState = _createInitialState(_armDozers);
export {ArmDozerIdList} from './master/armdozers';
