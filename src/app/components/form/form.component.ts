import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() res = new EventEmitter<Result>();
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        dividendo: ['', [Validators.required]],
        divisor: [11, [Validators.required, Validators.min(11)]],
      },
      { validators: [CustomValidators.isMajorTo()] }
    );
  }

  submitForm() {
    if (this.form.valid) {
      this.res.emit(this.form.value);
    }
  }

  reset(): void {
    this.form.reset({
      dividendo: '',
      divisor: 11,
    });
  }
}
