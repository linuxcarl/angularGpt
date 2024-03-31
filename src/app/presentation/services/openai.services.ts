import { Injectable } from '@angular/core';
import { prosConsResponse } from '@interfaces/pros-cons.response';
import {
  audioToTextUseCase,
  createThreadUseCase,
  imageGenerationUseCase,
  orthographyCase,
  postQuestionUseCase,
  prosConsCase,
  prosConsStreamCase,
  textToAudioUseCase,
  translateUseCase,
} from '@use-cases/index';
import { Observable, from, of, tap } from 'rxjs';

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

  generetedImage(prompt: string, baseImage?: string, maskImage?: string) {
    return from(imageGenerationUseCase(prompt, baseImage, maskImage));
  }

  createThread(): Observable<string> {
    if (
      localStorage.getItem('thread') &&
      localStorage.getItem('thread') !== 'undefined'
    ) {
      return of(localStorage.getItem('thread')!);
    }

    return from(createThreadUseCase()).pipe(
      tap((thread) => {
        localStorage.setItem('thread', thread);
      })
    );
  }

  postQuestion(threadId: string, question: string) {
    return from(postQuestionUseCase(threadId, question));
  }
}
