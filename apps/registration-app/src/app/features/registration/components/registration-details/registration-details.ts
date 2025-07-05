import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { StepperService } from '../../services/stepper-data';

@Component({
  selector: 'app-registration-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, JsonPipe],
  templateUrl: './registration-details.html',
})
export class RegistrationDetailsComponent {
  readonly stepperService = inject(StepperService);
  private router = inject(Router);

  get registrationData() {
    const data = this.stepperService.getRegistrationData();
    return data;
  }

  startNewRegistration() {
    this.stepperService.reset();
    this.router.navigate(['/']);
  }
}
