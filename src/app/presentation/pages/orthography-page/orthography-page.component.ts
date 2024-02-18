import { Component, inject, signal } from '@angular/core';
import { GptMessagesComponent, MyMessagesComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxFileEvent, TextMessageBoxSelectComponent, TextMessageBoxEvent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from '../../services/openai.services';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './orthography-page.component.html'
})
export default class OrthographyPageComponent {
  public messages = signal<Message[]>([{text: 'Hola como estas?', isGpt: false}, {text: 'hi soy tu sensei de gpt', isGpt: true}])
  public isLoanding = signal<boolean>(false)
  public openAiService= inject(OpenAiService)
  
  handleMessage(message: string){
    console.log('Handled message:', message)
  }
  handleMessageWithFile({prompt, file}: TextMessageBoxFileEvent){
    console.log('Handled message with file:', prompt, file);
  }

  handleMessageWithSelect(event: TextMessageBoxEvent){
    console.log('Handled message with file:', event);
  }
 }
