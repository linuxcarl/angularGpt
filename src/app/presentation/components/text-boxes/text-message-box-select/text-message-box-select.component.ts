import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
export interface Options {
  id: string;
  name: string;
}
export interface TextMessageBoxEvent {
  prompt?: string | null;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-select.component.html',
})
export class TextMessageBoxSelectComponent {
  @Input() public plahaceholder: string = '';
  @Input() public disabledCorrection: boolean = false;
  @Input({ required: true }) public options!: Options[];
  @Output() onMessage = new EventEmitter<TextMessageBoxEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) return false;

    const { prompt, selectedOption } = this.form.value;

    this.onMessage.emit({ prompt: prompt!, selectedOption: selectedOption! });
    this.form.reset();

    return true;
  }
}
