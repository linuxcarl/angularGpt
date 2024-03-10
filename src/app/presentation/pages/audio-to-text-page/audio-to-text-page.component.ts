import { Component, inject, signal } from '@angular/core';
import {
  GptMessagesComponent,
  MyMessagesComponent,
  TextMessageBoxFileComponent,
  TextMessageBoxFileEvent,
  TypingLoaderComponent,
} from '@components/index';
import { audioToTextResponse } from '@interfaces/audio-to-text.response';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audio-to-text-page.component.html',
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoanding = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  handleMessageWithFile({ file, prompt }: TextMessageBoxFileEvent) {
    const text = prompt ?? file.name ?? 'Extrar texto de audio';
    this.isLoanding.set(true);
    this.messages.update((prev) => [...prev, { text, isGpt: false }]);

    this.openAiService
      .audioToText(file, prompt || undefined)
      .subscribe((res) =>
        this.handleResponse(res as audioToTextResponse | null)
      );
  }

  private handleResponse(res: audioToTextResponse | null) {
    this.isLoanding.set(false);
    if (!res) return;
    const text = `Transcription
    __Duration: ${Math.round(res.duration)} sec__
    
    The Text is:
    
  ${res.text}`;
    this.messages.update((prev) => [...prev, { text, isGpt: true }]);

    for (const segment of res.segments) {
      const segmentMessage = `
      __From ${Math.round(segment.start)} to ${Math.round(
        segment.end
      )}__ seconds
      
      ${segment.text}`;
      this.messages.update((prev) => [
        ...prev,
        { text: segmentMessage, isGpt: true },
      ]);
    }
  }
}
