import { Component, inject, signal } from '@angular/core';
import {
  GptMessagesComponent,
  MyMessagesComponent,
  TypingLoaderComponent,
  TextMessageBoxSelectComponent,
  TextMessageBoxEvent,
} from '@components/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './text-to-audio-page.component.html',
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoanding = signal<boolean>(false);
  public openAiService = inject(OpenAiService);
  public voices = signal([
    { id: 'nova', name: 'Nova' },
    { id: 'alloy', name: 'Alloy' },
    { id: 'echo', name: 'Echo' },
    { id: 'fable', name: 'Fable' },
    { id: 'onyx', name: 'Onyx' },
    { id: 'shimmer', name: 'Shimmer' },
  ]);
  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    const message = `${selectedOption} - ${prompt}`;
    this.messages.update((prev) => [
      ...prev,
      {
        text: message,
        isGpt: false,
      },
    ]);
    this.isLoanding.set(true);
    this.openAiService
      .textToAudio(`${prompt}`, selectedOption)
      .subscribe(({ message, audioUrl }) => {
        console.log(message, audioUrl);
        this.isLoanding.set(false);
        this.messages.update((prev) => [
          ...prev,
          {
            text: message as string,
            isGpt: true,
            audioUrl: audioUrl as string,
          },
        ]);
      });
  }
}
