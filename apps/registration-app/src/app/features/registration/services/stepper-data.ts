import { computed, Injectable, signal } from '@angular/core';
import {
  IStep1FormData,
  IStep2FormData,
  IStep3FormData,
} from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private currentStep = signal<number>(0);
  public step1Data = signal<IStep1FormData | null>(null);
  public step2Data = signal<IStep2FormData | null>(null);
  public step3Data = signal<IStep3FormData | null>(null);

  public isStep1Complete = computed(() => this.step1Data() !== null);
  public isStep2Complete = computed(() => this.step2Data() !== null);
  public isStep3Complete = computed(() => this.step3Data() !== null);
  public stepIndex = computed(() => this.currentStep());

  public setStep1Data(data: IStep1FormData) {
    this.step1Data.update((d) => ({ ...d, ...data }));
  }

  public setStep2Data(data: IStep2FormData) {
    this.step2Data.update((d) => ({ ...d, ...data }));
  }

  public setStep3Data(data: IStep3FormData) {
    this.step3Data.update((d) => ({ ...d, ...data }));
  }

  public setStep(step: number) {
    this.currentStep.set(step);
  }

  public getRegistrationData() {
    const safeData = {
      email: (this.step1Data() as unknown as IStep1FormData)?.email,
      ...this.step2Data(),
      ...this.step3Data(),
    };
    return safeData;
  }

  reset() {
    this.currentStep.set(0);
    this.step1Data.set(null);
    this.step2Data.set(null);
    this.step3Data.set(null);
  }
}
