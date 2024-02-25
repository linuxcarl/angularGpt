export interface orthographyResponse {
  userScore: number;
  error: string[];
  message: string;
  corrections: string;
  hasDude?: boolean;
}
