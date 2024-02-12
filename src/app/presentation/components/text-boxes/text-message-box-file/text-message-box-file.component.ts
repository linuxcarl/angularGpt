import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
export interface TextMessageBoxFileEvent {
  prompt?: string | null;
  file: File;
}
@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-file.component.html',
})
export class TextMessageBoxFileComponent {
  @Input() public plahaceholder: string = '';
  @Input() public disabledCorrection: boolean = false;
  @Output() onMessage = new EventEmitter<TextMessageBoxFileEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required],
  });
  public file: File | undefined;

  handleSelectFile(event: any) {
    const file = event.target.files?.item(0);
    this.form.controls.file.setValue(file);
  }

  handleSubmit() {
    if (this.form.invalid) return false;

    const { prompt, file } = this.form.value;

    this.onMessage.emit({ prompt, file: file! });
    this.form.reset();

    return true;
  }
}
