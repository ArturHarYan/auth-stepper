import { Component, effect, inject, ViewChild } from '@angular/core';
import { debounceTime, filter } from 'rxjs';

import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { StepperService } from '../../services/stepper-data';

@Component({
  selector: 'app-stepper',
  templateUrl: './registration-stepper.html',
  styleUrls: ['../../../../app.css'],
  imports: [MatStepperModule, MatButtonModule, RouterOutlet],
})
export class StepperComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  private router = inject(Router);
  private stepperService = inject(StepperService);

  protected isStep1Complete = this.stepperService.isStep1Complete;
  protected isStep2Complete = this.stepperService.isStep2Complete;
  protected isStep3Complete = this.stepperService.isStep3Complete;
  protected stepIndex = this.stepperService.stepIndex;

  constructor() {
    effect((onCleanup) => {
      const sub = this.router.events
        .pipe(
          filter(
            (event): event is NavigationEnd => event instanceof NavigationEnd
          ),
          debounceTime(0)
        )
        .subscribe(() => {
          // Tried queueMicrotask, but it didn't work
          this.stepper.selectedIndex = this.stepIndex();
        });

      onCleanup(() => sub.unsubscribe());
    });
  }

  onStepChange(event: StepperSelectionEvent) {
    const idx = event.selectedIndex;
    this.stepperService.setStep(idx);
    this.router.navigate(['register', `step${this.stepIndex() + 1}`]);
  }
}
