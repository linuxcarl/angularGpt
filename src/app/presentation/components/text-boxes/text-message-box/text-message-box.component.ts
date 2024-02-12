import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './text-message-box.component.html',
})
export class TextMessageBoxComponent {
  @Input() public plahaceholder: string =''
  @Input() public disabledCorrection: boolean = false
  @Output() onMessage = new EventEmitter<string>()

  public fb = inject(FormBuilder)
  public form = this.fb.group({
    prompt: ['', Validators.required]
  })

  handleSubmit(){
    if(this.form.invalid) return false
    console.log(this.form.controls.prompt.value)
    const prompt = this.form.controls.prompt.value

    this.onMessage.emit(prompt ?? '')
    this.form.reset()

    return true
  }
}