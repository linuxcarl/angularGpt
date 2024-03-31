import { Component, inject, OnInit, signal } from '@angular/core';
import {
  GptMessagesComponent,
  MyMessagesComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
} from '@components/index';
import { Message } from '@interfaces/messages.interface';
import { OpenAiService } from 'app/presentation/services/openai.services';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistant-page.component.html',
})
export default class AssistantPageComponent implements OnInit {
  public messages = signal<Message[]>([]);
  public isLoanding = signal<boolean>(false);
  public openAiService = inject(OpenAiService);
  public threadId = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.openAiService.createThread().subscribe((id) => this.threadId.set(id));
  }

  handleMessage(message: string) {
    console.log('Handled message:', message, this.threadId());
  }
}
