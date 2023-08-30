import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/custom.validators';
import { MyErrorStateMatcher } from 'src/app/helpers/my-error-state-matcher';
import { Result } from 'src/app/models/result.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() par!: Result;
  @Output() res = new EventEmitter<Result>();
  @Output() resetEvent = new EventEmitter<void>();
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        dividendo: ['', [Validators.required]],
        divisor: ['', [Validators.required, Validators.min(10)]],
      },
      { validators: [CustomValidators.isMajorTo()] }
    );
    if (!!this.par) {
      this.form.setValue(this.par);
      this.submitForm();
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.res.emit(this.form.value);
    }
  }

  reset(): void {
    this.form.reset({
      dividendo: '',
      divisor: '',
    });
    this.resetEvent.emit();
  }
}
