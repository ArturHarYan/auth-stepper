import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { StepperService } from '../../services/stepper-data';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  UserRegistrationStepEnum,
  IndustryEnum,
  RoleEnum,
  IStep2FormData,
} from '../../models/user-model';
import { strictRangeValidator } from '../../../../shared/strictRangeValidator';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './step2-form.html',
  styleUrl: '../../../../app.css',
})
export class Step2Component {
  private fb = inject(FormBuilder);
  private stepperService = inject(StepperService);
  private router = inject(Router);

  protected industries = Object.values(IndustryEnum);
  protected roles = Object.values(RoleEnum);
  private data = this.stepperService.step2Data();

  protected form = this.fb.group({
    industry: [this.data?.industry, Validators.required],
    experienceInYears: [
      this.data?.experienceInYears,
      [Validators.required, strictRangeValidator(0, 50)],
    ],
    yourRole: [this.data?.yourRole, Validators.required],
  });

  previousStep() {
    this.router.navigate(['/register', UserRegistrationStepEnum.Step1]);
    this.stepperService.setStep(0);
  }

  onSubmit() {
    if (this.form.valid) {
      this.stepperService.setStep2Data(this.form.value as IStep2FormData);
      this.stepperService.setStep(2);
      this.router.navigate(['register', UserRegistrationStepEnum.Step3]);
    }
  }
}
