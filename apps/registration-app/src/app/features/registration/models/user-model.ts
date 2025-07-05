export enum UserRegistrationStepEnum {
  Step1 = 'step1',
  Step2 = 'step2',
  Step3 = 'step3',
  Details = 'details',
}

export enum IndustryEnum {
  Marketing = 'marketing',
  IT = 'it',
  FinancialServices = 'financial_services',
}

export enum RoleEnum {
  Developer = 'developer',
  Manager = 'manager',
  Designer = 'designer',
}

export interface IStep1FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IStep2FormData {
  industry?: IndustryEnum;
  experienceInYears: number;
  yourRole: RoleEnum;
}

export interface IStep3FormData {
  aboutUs: string;
}

export interface IRegistrationData {
  step1: IStep1FormData;
  step2: IStep2FormData;
  step3: IStep3FormData;
}
