export interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
    corrections: string;
    hasDude?: boolean;
  };
  audioUrl?: string;
}
