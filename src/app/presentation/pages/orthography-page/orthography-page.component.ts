import { Component, inject, signal } from '@angular/core';
import {
  GptMessagesComponent,
  MyMessagesComponent,
  TextMessageBoxComponent,
  TextMessageBoxFileComponent,
  TextMessageBoxFileEvent,
  TextMessageBoxSelectComponent,
  TextMessageBoxEvent,
  TypingLoaderComponent,
  GptMessageOrthographyComponent,
} from '@components/index';
import type { Message } from '@interfaces/messages.interface';
import { OpenAiService } from '../../services/openai.services';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    GptMessageOrthographyComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthography-page.component.html',
})
export default class OrthographyPageComponent {
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
    this.openAiService.checkOrthography(message).subscribe((res)=>{
      this.isLoanding.set(false)
     // const {message,errors,corrections,userScore} = res
      console.log('Response:', res, message);
      this.messages.update((prev)=> [
        ...prev,
        {
          text: res.message as string,
          isGpt: true,
          info: res as unknown as  Message['info'] // Explicitly type 'info' as Message['info']
        }
      ])

    })
  }
}
