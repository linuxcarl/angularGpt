import { Component, inject, signal } from '@angular/core';
import {
  GptMessagesComponent,
  MyMessagesComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
  GptMessageEditableImageComponent,
} from '@components/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageEditableImageComponent,
  ],
  templateUrl: './image-tunning-page.component.html',
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([]);
  public isLoanding = signal<boolean>(false);
  public openAiService = inject(OpenAiService);
  public baseImage = signal<string | undefined>(undefined);
  public maskImage = signal<string | undefined>(undefined);
  handleMessage(message: string) {
    this.isLoanding.set(true);
    this.messages.update((prev) => [...prev, { text: message, isGpt: false }]);
    this.openAiService
      .generetedImage(message, this.baseImage(), this.maskImage())
      .subscribe((resp) => {
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
  handleImageChange(newImage: string, originalImage: string) {
    this.baseImage.set(originalImage);
    this.maskImage.set(newImage);
  }
  generateVariation() {}
  close() {
    this.baseImage.set(undefined);
  }
}
