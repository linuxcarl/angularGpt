import { Component } from '@angular/core';
import { GptMessagesComponent } from '../../components/chat-bubbles/gpt-messages/gpt-messages.component';
import { MyMessagesComponent } from '../../components/chat-bubbles/my-messages/my-messages.component';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent
  ],
  templateUrl: './orthography-page.component.html'
})
export default class OrthographyPageComponent {

}
