import { useTicTacToeStore } from "../stores/ticTacToeStore";
import { computed } from "vue";

const ticTacToeStore = useTicTacToeStore();

export function useTicTacToeHelpers(){

  const getKeyByValue = (object: any, value: string) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const isSpectator = computed(() => {
    if (!ticTacToeStore.gameState) return;
    return (
      getKeyByValue(ticTacToeStore.gameState.players, ticTacToeStore.userID!) ===
      undefined
    );
  });


  return { getKeyByValue,isSpectator };
}