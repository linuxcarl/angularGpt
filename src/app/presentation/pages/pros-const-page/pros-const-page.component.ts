import { Component, inject, signal } from '@angular/core';
import {
  GptMessagesComponent,
  MyMessagesComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
} from '@components/index';
import { prosConsResponse } from '@interfaces/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-pros-const-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-const-page.component.html',
})
export default class ProsConstPageComponent {
  public messages = signal<Message[]>([]);
  public isLoanding = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  handleMessage(message: string) {
    console.log('Handled message:', message);
    this.isLoanding.set(true); // Remove the argument from the function call
    this.messages.update((prev) => [
      ...prev,
      {
        text: message,
        isGpt: false,
      },
    ]);
    this.openAiService.prosCons(message).subscribe((res) => {
      this.isLoanding.set(false);
      console.log('Response:', res, message);
      this.messages.update((prev) => [
        ...prev,
        {
          text: res.content as string,
          isGpt: true,
        },
      ]);
    });
  }
}
