import { Channel, Socket } from "phoenix";
import { onMounted, ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { GameState } from "../models/gameState.model";

const serverAddress = "ws://localhost:4000/socket";

export function useTicTacToe() {
// state encapsulated and managed by the composable
    const socket = ref<Socket>();
    const battleChannel = ref<Channel>();
    const userID = ref<string>("");
    const gameID = ref<string>("");
    const gameState = ref<GameState>();

    watch(userID, () => {
      if (!userID.value) return;
      socket.value = new Socket(serverAddress, {
        params: { user_id: userID.value },
      });
      socket.value.connect();
    });

    const createBattleChannel = (createGameId?: boolean) => {
      if (!socket.value) return { error: "Socket not initialized" };
      if (createGameId) {
        gameID.value = uuidv4();
      }

      if (!gameID.value) return { error: "Game ID not initialized" };

      battleChannel.value = socket.value.channel(
        "games:battles:" + gameID.value
      );

      battleChannel.value.on("game_state_sent", (payload) => {
        gameState.value = payload;
      });

      battleChannel.value.join();
    };

    const leaveBattleChannel = () => {
      if (!battleChannel.value) {
        throw new Error("Matchmaking channel not initialized");
      }
      battleChannel.value.leave();
      battleChannel.value = undefined;
    };

    const executeGameMove = (x: number, y: number) => {
      if (!battleChannel.value) {
        throw new Error("Matchmaking channel not initialized");
      }
      battleChannel.value.push("move", { x, y });
    };


    onMounted(() => {
      const savedBrowserID = localStorage.getItem("browser_id");
      if (savedBrowserID) {
        userID.value = savedBrowserID;
      } else {
        userID.value = uuidv4();
        if (!userID.value) return;
        localStorage.setItem("browser_id", userID.value);
      }
    });
  // expose managed state as return value
    return {
      userID,
      gameID,
      battleChannel,
      gameState,
      leaveBattleChannel,
      createBattleChannel,
      executeGameMove,
    }
}
