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
    this.isLoanding.set(true);
    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);
    this.openAiService.generetedImage(message).subscribe((resp) => {
      if (!resp) return false;
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp,
        },
      ]);
      this.isLoanding.set(false);
      return true;
    });
  }
}
