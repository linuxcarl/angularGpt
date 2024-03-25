import { Component, inject, signal } from '@angular/core';
import {
  GptMessagesComponent,
  MyMessagesComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
} from '@components/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './image-generation-page.component.html',
})
export default class ImageGenerationPageComponent {
  public messages = signal<Message[]>([]);
  public isLoanding = signal<boolean>(false);
  public openAiService = inject(OpenAiService);

  handleMessage(message: string) {
    console.log('Handled message:', message);
  }
}
