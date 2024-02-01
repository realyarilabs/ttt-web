import { defineStore } from "pinia";
import { Channel, Socket } from "phoenix";
import { onBeforeMount, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { GameState } from "../models/gameState.model";
import soundX from "../assets/audio/soundx.wav";
import soundO from "../assets/audio/soundo.wav";
import { Move } from "../models/move.model";
import { useAudioStore } from "./audioStore";

const serverUrl = import.meta.env.SERVER_URL
  ? import.meta.env.SERVER_URL
  : "ws://localhost:4000/socket";

export const useTicTacToeStore = defineStore("useTicTacToeStore", () => {
  const audioStore = useAudioStore();

  const socket = ref<Socket>();
  const matchChannel = ref<Channel>();
  const userID = ref<string>();
  const userName = ref<string>();
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

    matchChannel.value = socket.value.channel("games:match:" + gameID.value, {
      name: userName.value,
    });
    matchChannel.value.on("game_state_sent", (payload) => {
      gameState.value = payload;
    });

    matchChannel.value.on("move_made", (payload: Move) => {
      if (payload.symbol === "X") audioStore.playSound(soundX);
      else audioStore.playSound(soundO);
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

  const leaveMatch = () => {
    matchChannel.value?.push("surrender", {});
    leaveMatchChannel();
    gameID.value = undefined;
    gameState.value = undefined;
  };

  const executeGameMove = (x: number, y: number) => {
    if (!matchChannel.value) {
      throw new Error("Matchmaking channel not initialized");
    }
    matchChannel.value.push("move", { x, y });
  };

  const playAgain = () => {
    if (!matchChannel.value) {
      throw new Error("Matchmaking channel not initialized");
    }
    matchChannel.value.push("play_again", {});
  };

  const endGame = () => {
    gameID.value = undefined;
    gameState.value = undefined;
  };

  return {
    userID,
    userName,
    gameID,
    matchChannel,
    gameState,
    leaveMatchChannel,
    createMatchChannel,
    leaveMatch,
    executeGameMove,
    playAgain,
    endGame,
  };
});
