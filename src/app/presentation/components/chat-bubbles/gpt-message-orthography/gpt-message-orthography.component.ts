import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthography',
  standalone: true,
  imports: [],
  templateUrl: './gpt-message-orthography.component.html',
})
export class GptMessageOrthographyComponent {
  @Input({ required: true }) userScore!: number;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) corrections!: string;
  @Input() hasDude: boolean = false;
  @Input() errors: string[] = [];
}