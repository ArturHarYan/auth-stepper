import { Routes } from '@angular/router';

import { StepperComponent } from './features/registration/components/registration-stepper/registration-stepper';
import { Step1Component } from './features/registration/components/step1-form/step1-form';
import { Step2Component } from './features/registration/components/step2-form/step2-form';
import { Step3Component } from './features/registration/components/step3-form/step3-form';
import { RegistrationDetailsComponent } from './features/registration/components/registration-details/registration-details';
import { step2Guard } from './guards/step2-guard';
import { step3Guard } from './guards/step3-guard';

// We can also add routes using Lazy loading
// But in this example it has minimal impact on the app
export const routes: Routes = [
  { path: '', redirectTo: 'register/step1', pathMatch: 'full' },
  {
    path: 'register',
    component: StepperComponent,
    children: [
      {
        path: 'step1',
        component: Step1Component,
      },
      { path: 'step2', component: Step2Component, canActivate: [step2Guard] },
      { path: 'step3', component: Step3Component, canActivate: [step3Guard] },

      { path: '**', redirectTo: 'step1' },
    ],
  },
  { path: 'details', component: RegistrationDetailsComponent },
  { path: '**', redirectTo: 'register/step1' },
];
