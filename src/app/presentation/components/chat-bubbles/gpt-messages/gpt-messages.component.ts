import { Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-gpt-messages',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './gpt-messages.component.html',
})
export class GptMessagesComponent {
  @Input({ required: true }) text!: string;
  @Input() audioUrl?: string;
}
