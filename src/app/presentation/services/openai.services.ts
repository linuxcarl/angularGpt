import { Injectable } from '@angular/core';
import { prosConsResponse } from '@interfaces/pros-cons.response';
import {
  audioToTextUseCase,
  orthographyCase,
  prosConsCase,
  prosConsStreamCase,
  textToAudioUseCase,
  translateUseCase,
} from '@use-cases/index';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  translateUseCase(message: string, lang: String) {
    throw new Error('Method not implemented.');
  }
  checkOrthography(prompt: string) {
    return from(orthographyCase(prompt));
  }
  prosCons(prompt: string): Observable<prosConsResponse> {
    return from(prosConsCase(prompt)) as Observable<prosConsResponse>;
  }
  prosConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamCase(prompt, abortSignal);
  }
  translate(promt: string, lang: string) {
    return from(translateUseCase(promt, lang));
  }
  textToAudio(promt: string, voice: string) {
    return from(textToAudioUseCase(promt, voice));
  }
  audioToText(file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }
}
