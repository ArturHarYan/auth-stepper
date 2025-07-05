import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { StepperService } from '../features/registration/services/stepper-data';

export const step2Guard = () => {
  const stepper = inject(StepperService);
  const router = inject(Router);

  if (stepper.isStep1Complete()) return true;
  else return router.parseUrl('/register/step1');
};
