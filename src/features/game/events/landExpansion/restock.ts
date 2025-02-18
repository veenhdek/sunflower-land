import Decimal from "decimal.js-light";
import { INITIAL_STOCK } from "features/game/lib/constants";
import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type RestockAction = {
  type: "shops.restocked";
};

type Options = {
  state: Readonly<GameState>;
  action: RestockAction;
};

const clone = (state: GameState): GameState => {
  return cloneDeep(state);
};

export function restock({ state, action }: Options): GameState {
  const game = clone(state);

  const blockBucks = game.inventory["Block Buck"] ?? new Decimal(0);
  if (blockBucks.lt(1)) {
    throw new Error("You do not have enough Block Bucks");
  }

  game.stock = INITIAL_STOCK;
  game.inventory["Block Buck"] = blockBucks.sub(1);

  return game;
}
