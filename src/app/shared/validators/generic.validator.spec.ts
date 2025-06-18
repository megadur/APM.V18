import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from './generic.validator';

describe('GenericValidator', () => {
  const validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 3 characters.'
    },
    email: {
      required: 'Email is required.',
      email: 'Email must be valid.'
    }
  };

  let validator: GenericValidator;

  beforeEach(() => {
    validator = new GenericValidator(validationMessages);
  });

  it('should return empty messages for untouched controls', () => {
    const form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    const messages = validator.processMessages(form);
    expect(messages).toEqual({ name: '', email: '' });
  });

  it('should return required message for touched control with required error', () => {
    const form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    form.controls['name'].markAsTouched();
    form.controls['name'].setErrors({ required: true });

    const messages = validator.processMessages(form);
    expect(messages['name']).toContain('Name is required.');
  });

  it('should return multiple messages for multiple errors', () => {
    const form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    form.controls['name'].markAsTouched();
    form.controls['name'].setErrors({ required: true, minlength: true });

    const messages = validator.processMessages(form);
    expect(messages['name']).toContain('Name is required.');
    expect(messages['name']).toContain('Name must be at least 3 characters.');
  });

  it('should return email validation message', () => {
    const form = new FormGroup({
      name: new FormControl('John', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('invalid', [Validators.required, Validators.email])
    });
    form.controls['email'].markAsDirty();
    form.controls['email'].setErrors({ email: true });

    const messages = validator.processMessages(form);
    expect(messages['email']).toContain('Email must be valid.');
  });

  it('should handle nested FormGroups', () => {
    const nestedForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    });
    nestedForm.controls['name'].markAsTouched();
    nestedForm.controls['name'].setErrors({ required: true });

    const form = new FormGroup({
      nested: nestedForm
    });

    const nestedValidationMessages = {
      name: { required: 'Name is required.' },
      email: { required: 'Email is required.' }
    };
    const nestedValidator = new GenericValidator(nestedValidationMessages);

    const messages = nestedValidator.processMessages(form);
    expect(messages['name']).toContain('Name is required.');
    expect(messages['email']).toBe('');
  });

  it('should return correct error count', () => {
    const form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    form.controls['name'].setErrors({ required: true, minlength: true });
    form.controls['email'].setErrors({ required: true });

    const count = validator.getErrorCount(form);
    expect(count).toBe(3);
  });

  it('should return 0 error count for valid form', () => {
    const form = new FormGroup({
      name: new FormControl('John', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('john@example.com', [Validators.required, Validators.email])
    });

    const count = validator.getErrorCount(form);
    expect(count).toBe(0);
  });
});
