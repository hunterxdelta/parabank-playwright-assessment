export const generateUsername = (): string => `yuguser${Date.now()}`;

export const testPassword = 'Test@1234';

export const registrationData = {
  firstName: 'Yug',
  lastName: 'D',
  address: '123 Test Street',
  city: 'Pune',
  state: 'Maharashtra',
  zipCode: '440561',
  phone: '9999999999',
  ssn: '123456789',
} as const;