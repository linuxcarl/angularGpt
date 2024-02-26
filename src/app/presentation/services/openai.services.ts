import { Injectable } from '@angular/core';
import { prosConsResponse } from '@interfaces/pros-cons.response';
import {
  orthographyCase,
  prosConsCase,
  prosConsStreamCase,
} from '@use-cases/index';
import { Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  checkOrthography(prompt: string) {
    return from(orthographyCase(prompt));
  }
  prosCons(prompt: string): Observable<prosConsResponse> {
    return from(prosConsCase(prompt)) as Observable<prosConsResponse>;
  }
  prosConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamCase(prompt, abortSignal);
  }
}
