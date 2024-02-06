import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-messages',
  standalone: true,
  imports: [],
  templateUrl: './gpt-messages.component.html',
})
export class GptMessagesComponent {
  @Input({ required: true }) text!: string;
}
