import { defineStore } from "pinia";
import { Channel, Socket } from "phoenix";
import { onBeforeMount, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { GameState } from "../models/gameState.model";
import soundX from "../assets/audio/soundx.wav";
import soundO from "../assets/audio/soundo.wav";
import { Move } from "../models/move.model";

const serverUrl = "ws://localhost:4000/socket";

export const useTicTacToeStore = defineStore("useTicTacToeStore", () => {
  const socket = ref<Socket>();
  const matchChannel = ref<Channel>();
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

  const createMatchChannel = (createGameId?: boolean) => {
    if (!socket.value) return { error: "Socket not initialized" };
    if (createGameId) {
      gameID.value = uuidv4().slice(0, 6);
    }

    if (!gameID.value) return { error: "Game ID not initialized" };

    matchChannel.value = socket.value.channel("games:match:" + gameID.value);
    matchChannel.value.on("game_state_sent", (payload) => {
      gameState.value = payload;
    });

    matchChannel.value.on("move_made", (payload: Move) => {
      if (payload.symbol === "X") {
        new Audio(soundX).play();
      } else {
        new Audio(soundO).play();
      }
    });

    matchChannel.value.join();
  };


    const leaveMatchChannel = () => {
      if (!matchChannel.value) {
        throw new Error("Matchmaking channel not initialized");
      }
      matchChannel.value.leave();
      matchChannel.value = undefined;
    };

    const executeGameMove = (x: number, y: number) => {
      if (!matchChannel.value) {
        throw new Error("Matchmaking channel not initialized");
      }
      matchChannel.value.push("move", { x, y });
    };

    const endGame = () => {
      gameID.value = "";
      gameState.value = undefined;
    };

    return {
      userID,
      gameID,
      matchChannel,
      gameState,
      leaveMatchChannel,
      createMatchChannel,
      executeGameMove,
      endGame
    };
  }
);
