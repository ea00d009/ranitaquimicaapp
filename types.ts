export enum GameState {
  Start,
  Playing,
  GameOver,
  Quit,
}

export interface Question {
  question: string;
  options: [string, string, string];
  correctAnswerIndex: number;
}