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

  handleMessage(question: string) {
    this.isLoanding.set(true);
    this.messages.update((prev) => [...prev, { text: question, isGpt: false }]);
    this.openAiService
      .postQuestion(this.threadId()!, question)
      .subscribe((replies) => {
        this.isLoanding.set(false);
        for (const reply of replies) {
          for (const message of reply.content) {
            this.messages.update((prev) => [
              ...prev,
              {
                text: message,
                isGpt: reply.role === 'assistant',
              },
            ]);
          }
        }
      });
  }
}
