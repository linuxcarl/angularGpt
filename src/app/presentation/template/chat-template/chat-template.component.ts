import { Component, inject, signal } from '@angular/core';
import { GptMessagesComponent, MyMessagesComponent, TextMessageBoxComponent, TextMessageBoxFileEvent, TextMessageBoxEvent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from '../../services/openai.services';
@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [  
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chat-template.component.html',
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([])
  public isLoanding = signal<boolean>(false)
  public openAiService= inject(OpenAiService)
  
  handleMessage(message: string){
    console.log('Handled message:', message)
  }
}
