import { guard } from "../../../../src/effect/battle/result/guard";
import { EMPTY_CORRECT_POWER, EMPTY_DAMAGE_HALVED } from "../../../../src/empty/amrdozer-effect";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import type { PlayerState } from "../../../../src/state/player-state";
test("ガードは通常ヒット半分のダメージを受ける", () => {
  const attacker: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      power: 2000
    }
  };
  const defender: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "defender"
  };
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 1000
  });
});
test("攻撃補正が正しく適用される", () => {
  const attacker: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      effects: [{ ...EMPTY_CORRECT_POWER,
        power: 1000
      }]
    }
  };
  const defender: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "defender"
  };
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 1500
  });
});
test("ダメージ半減が正しく適用される", () => {
  const attacker: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      power: 2000
    }
  };
  const defender: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "defender",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      effects: [EMPTY_DAMAGE_HALVED]
    }
  };
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 500
  });
});
test("攻撃補正 -> ダメージ半減 -> ガードによるダメージ半減、の順番で計算される", () => {
  const attacker: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      effects: [{ ...EMPTY_CORRECT_POWER,
        power: 1000
      }]
    }
  };
  const defender: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "defender",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      effects: [EMPTY_DAMAGE_HALVED]
    }
  };
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 750
  });
});