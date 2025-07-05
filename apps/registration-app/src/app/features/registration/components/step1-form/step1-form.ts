import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {
  IStep1FormData,
  UserRegistrationStepEnum,
} from '../../models/user-model';
import { StepperService } from '../../services/stepper-data';
import { confirmPasswordValidator } from '../../../../shared/confirmPasswordValidator';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './step1-form.html',
  styleUrls: ['../../../../app.css'],
})
export class Step1Component {
  private fb = inject(FormBuilder);
  private stepperService = inject(StepperService);
  private router = inject(Router);

  private data = this.stepperService.step1Data();

  protected form = this.fb.group({
    email: [this.data?.email, [Validators.required, Validators.email]],
    password: [
      this.data?.password,
      [Validators.required, Validators.minLength(8)],
    ],
    confirmPassword: [
      this.data?.confirmPassword,
      [Validators.required, confirmPasswordValidator('password')],
    ],
  });

  onSubmit() {
    if (this.form.valid) {
      this.stepperService.setStep(1);
      this.stepperService.setStep1Data(this.form.value as IStep1FormData);
      this.router.navigate(['register', UserRegistrationStepEnum.Step2]);
    }
  }
}
