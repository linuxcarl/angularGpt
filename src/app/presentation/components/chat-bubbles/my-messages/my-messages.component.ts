import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-messages',
  standalone: true,
  imports: [],
  templateUrl: './my-messages.component.html',
})
export class MyMessagesComponent {
  @Input({ required: true }) text!: string;
}
