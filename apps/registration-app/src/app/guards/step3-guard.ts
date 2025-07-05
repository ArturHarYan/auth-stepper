import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { StepperService } from '../features/registration/services/stepper-data';

export const step3Guard = () => {
  const stepper = inject(StepperService);
  const router = inject(Router);

  if (!stepper.isStep1Complete()) {
    return router.parseUrl('/register/step2');
  } else if (!stepper.isStep2Complete()) {
    return router.parseUrl('/register/step1');
  }
  return true;
};
