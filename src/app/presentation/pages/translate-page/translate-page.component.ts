import { Component, inject, signal } from '@angular/core';
import {
  GptMessagesComponent,
  GptMessageOrthographyComponent,
  MyMessagesComponent,
  TypingLoaderComponent,
  TextMessageBoxSelectComponent,
  TextMessageBoxEvent,
} from '@components/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    GptMessageOrthographyComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './translate-page.component.html',
})
export default class TranslatePageComponent {
  public messages = signal<Message[]>([]);
  public isLoanding = signal<boolean>(false);
  public openAiService = inject(OpenAiService);
  public languages = signal([
    { id: 'inglés', name: 'Inglés' },
    { id: 'español', name: 'Español' },
    { id: 'portugués', name: 'Portugués' },
    { id: 'alemán', name: 'Alemán' },
    { id: 'árabe', name: 'Árabe' },
    { id: 'bengalí', name: 'Bengalí' },
    { id: 'francés', name: 'Francés' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'japonés', name: 'Japonés' },
    { id: 'mandarín', name: 'Mandarín' },
    { id: 'ruso', name: 'Ruso' },
  ]);
  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    this.isLoanding.set(true);
    const message = `Traduce a ${selectedOption}: ${prompt}`;
    this.messages.update((prev) => [
      ...prev,
      {
        text: message,
        isGpt: false,
      },
    ]);
    this.openAiService
      .translate(prompt || '', selectedOption)
      .subscribe(({ message }) => {
        this.isLoanding.set(false);

        this.messages.update((prev) => [
          ...prev,
          {
            text: message as string,
            isGpt: true,
          },
        ]);
      });
  }
}
