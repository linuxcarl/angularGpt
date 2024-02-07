import { Component } from '@angular/core';
import { GptMessagesComponent, MyMessagesComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './orthography-page.component.html'
})
export default class OrthographyPageComponent {

}
