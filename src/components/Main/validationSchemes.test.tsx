import { describe, expect, it } from 'vitest';
import { RegisterSchema, LoginSchema } from './validationSchemes';

const validData = {
  email: 'test@example.com',
  password: 'ValidPass123!',
  firstName: 'Sloth',
  lastName: 'Lazy',
  dateOfBirth: new Date(2000, 0, 1),
  shipping: {
    street: 'Street',
    city: 'City',
    postalCode: '123456'
  },
  billing: {
    street: 'Street',
    city: 'City',
    postalCode: '123456'
  }
};

describe('Validation Schemas', () => {
  describe('RegisterSchema', () => {
    it('should validate correct data', () => {
      expect(RegisterSchema.isValidSync(validData)).toBe(true);
    });

    it('should invalidate incorrect email', () => {
      const invalidEmails = ['invalid', 'example.com', 'test@com'];
      invalidEmails.forEach((email) => {
        const invalidData = { ...validData, email };
        expect(RegisterSchema.isValidSync(invalidData)).toBe(false);
      });
    });

    it('should invalidate incorrect password', () => {
      const invalidPasswords = [
        'short',
        'nouppercase123!',
        'NoNumber!',
        'NoSpecialChar123',
        ' NoSpaces123!',
        'NoSpaces123! '
      ];
      invalidPasswords.forEach((password) => {
        const invalidData = { ...validData, password };
        expect(RegisterSchema.isValidSync(invalidData)).toBe(false);
      });
    });

    it('should invalidate incorrect firstName and lastName', () => {
      const invalidNames = ['Sl0th', 'Lazy!', ' '];
      invalidNames.forEach((name) => {
        const invalidData = { ...validData, firstName: name, lastName: name };
        expect(RegisterSchema.isValidSync(invalidData)).toBe(false);
      });
    });

    it('should invalidate incorrect dateOfBirth', () => {
      const invalidDates = [new Date(), new Date(2015, 0, 1)];
      invalidDates.forEach((dateOfBirth) => {
        const invalidData = { ...validData, dateOfBirth };
        expect(RegisterSchema.isValidSync(invalidData)).toBe(false);
      });
    });

    it('should invalidate incorrect address', () => {
      const invalidAddresses = [
        { street: '', city: 'City', postalCode: '123456' },
        { street: 'Street', city: '', postalCode: '123456' },
        { street: 'Street', city: 'Cit@/y', postalCode: '123456' },
        { street: 'Street', city: 'City', postalCode: '12345' },
        { street: 'Street', city: 'City', postalCode: '12a456' }
      ];
      invalidAddresses.forEach((address) => {
        const invalidData = { ...validData, shipping: address, billing: address };
        expect(RegisterSchema.isValidSync(invalidData)).toBe(false);
      });
    });

    it('should validate billing address only when shipping.isSameAddress is true', () => {
      const validDataWithSameAddress = {
        ...validData,
        shipping: {
          ...validData.shipping,
          isSameAddress: true
        },
        billing: {
          street: 'Different Street',
          city: 'Different City',
          postalCode: '654321'
        }
      };
      expect(RegisterSchema.isValidSync(validDataWithSameAddress)).toBe(true);
    });
  });

  describe('LoginSchema', () => {
    it('should validate correct data', () => {
      const validLoginData = {
        email: 'test@example.com',
        password: 'ValidPass123!'
      };
      expect(LoginSchema.isValidSync(validLoginData)).toBe(true);
    });

    it('should invalidate incorrect email', () => {
      const invalidEmails = ['invalid', 'example.com', 'test@com'];
      invalidEmails.forEach((email) => {
        const invalidData = { email, password: 'ValidPass123!' };
        expect(LoginSchema.isValidSync(invalidData)).toBe(false);
      });
    });

    it('should invalidate incorrect password', () => {
      const invalidPasswords = ['short', 'nouppercase123!', 'NoNumber!', 'NoSpecialChar123'];
      invalidPasswords.forEach((password) => {
        const invalidData = { email: 'test@example.com', password };
        expect(LoginSchema.isValidSync(invalidData)).toBe(false);
      });
    });
  });
});
