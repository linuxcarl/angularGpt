import { audioToTextUseCase } from '../core/use-cases/audios/audio-to-text.use-case';

export interface audioToTextResponse {
  task: string;
  language: string;
  duration: number;
  text: string;
  segments: Segment[];
}

export interface Segment {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
}
