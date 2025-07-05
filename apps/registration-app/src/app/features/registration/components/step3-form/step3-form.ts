import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {
  IStep3FormData,
  UserRegistrationStepEnum,
} from '../../models/user-model';
import { StepperService } from '../../services/stepper-data';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './step3-form.html',
  styleUrl: '../../../../app.css',
})
export class Step3Component {
  private fb = inject(FormBuilder);
  private stepperService = inject(StepperService);
  private router = inject(Router);

  private data = this.stepperService.step3Data();

  protected form = this.fb.group({
    aboutUs: [this.data?.aboutUs, Validators.required],
  });

  onInput(e: Event) {
    this.stepperService.setStep3Data({
      aboutUs: (e.target as HTMLTextAreaElement).value,
    });
  }

  previousStep() {
    this.router.navigate(['register', UserRegistrationStepEnum.Step2]);
    this.stepperService.setStep(1);
  }

  submit() {
    if (this.form.valid) {
      this.stepperService.setStep3Data(this.form.value as IStep3FormData);
      this.router.navigate(['details']);
    }
  }
}
