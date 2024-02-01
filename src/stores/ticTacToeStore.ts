import { defineStore } from "pinia";
import { Channel, Socket } from "phoenix";
import { onBeforeMount, ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { GameState } from "../models/gameState.model";

const serverUrl = "ws://localhost:4000/socket";

export const useTicTacToeStore = defineStore(
  "useTicTacToeStore",
  () => {
    const socket = ref<Socket>();
    const battleChannel = ref<Channel>();
    const userID = ref<string>();
    const gameID = ref<string>();
    const gameState = ref<GameState>();

    onBeforeMount(() => {
      const savedBrowserID = localStorage.getItem("browser_id");

      if (savedBrowserID) {
        userID.value = savedBrowserID;
      } else {
        userID.value = uuidv4();
        localStorage.setItem("browser_id", userID.value);
      }

      socket.value = new Socket(serverUrl, {
        params: { user_id: userID.value },
      });
      socket.value.connect();

    });

    const createBattleChannel = (createGameId?: boolean) => {
      if (!socket.value) return { error: "Socket not initialized" };
      if (createGameId) {
        gameID.value = uuidv4().slice(0,6);
      }

      if (!gameID.value) return { error: "Game ID not initialized" };

      battleChannel.value = socket.value.channel(
        "games:match:" + gameID.value
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

    return {
      userID,
      gameID,
      battleChannel,
      gameState,
      leaveBattleChannel,
      createBattleChannel,
      executeGameMove,
    };
  }
);
