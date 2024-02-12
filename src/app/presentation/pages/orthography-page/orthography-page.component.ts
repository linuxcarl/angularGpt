import { Component } from '@angular/core';
import { GptMessagesComponent, MyMessagesComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxFileEvent, TypingLoaderComponent } from '@components/index';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    GptMessagesComponent,
    MyMessagesComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent
  ],
  templateUrl: './orthography-page.component.html'
})
export default class OrthographyPageComponent {
  handleMessage(message: string){
    console.log('Handled message:', message)
  }
  handleMessageWithFile({prompt, file}: TextMessageBoxFileEvent){
    console.log('Handled message with file:', prompt, file);
  }
  
}
