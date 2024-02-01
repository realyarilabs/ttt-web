export interface GameState {
  status: string;
  game_id: string;
  players: {
    X: string;
    O: string;
  };
  winner: string;
  board: string[][];
  current_turn: string;
  current_player: string;
}
