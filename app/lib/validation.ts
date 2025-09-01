import { ValidationError } from './errors'

export interface ValidationSchema {
  [key: string]: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'min' | 'max' | 'custom'
  message: string
  value?: any
  validator?: (value: any) => boolean
}

export class Validator {
  static validate<T extends Record<string, any>>(
    data: T, 
    schema: ValidationSchema
  ): T {
    const errors: Array<{field: string, message: string}> = []

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field]

      for (const rule of rules) {
        const isValid = this.validateRule(value, rule)
        if (!isValid) {
          errors.push({ field, message: rule.message })
          break // Stop at first error for this field
        }
      }
    }

    if (errors.length > 0) {
      throw new ValidationError(errors)
    }

    return data
  }

  private static validateRule(value: any, rule: ValidationRule): boolean {
    switch (rule.type) {
      case 'required':
        return value !== undefined && value !== null && value !== ''
      
      case 'email':
        if (value === undefined || value === null || value === '') return true
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      
      case 'minLength':
        if (value === undefined || value === null) return true
        return String(value).length >= (rule.value || 0)
      
      case 'maxLength':
        if (value === undefined || value === null) return true
        return String(value).length <= (rule.value || 0)
      
      case 'min':
        if (value === undefined || value === null) return true
        return Number(value) >= (rule.value || 0)
      
      case 'max':
        if (value === undefined || value === null) return true
        return Number(value) <= (rule.value || 0)
      
      case 'custom':
        if (!rule.validator) return true
        return rule.validator(value)
      
      default:
        return true
    }
  }
}

// Common validation schemas
export const userValidationSchema: ValidationSchema = {
  name: [
    { type: 'required', message: 'Name is required' },
    { type: 'minLength', value: 2, message: 'Name must be at least 2 characters long' },
    { type: 'maxLength', value: 50, message: 'Name must not exceed 50 characters' }
  ],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please provide a valid email address' }
  ],
  age: [
    { type: 'required', message: 'Age is required' },
    { type: 'min', value: 1, message: 'Age must be at least 1' },
    { type: 'max', value: 150, message: 'Age must not exceed 150' },
    { 
      type: 'custom', 
      message: 'Age must be a valid number',
      validator: (value) => !isNaN(Number(value)) && Number.isInteger(Number(value))
    }
  ]
}

export const userUpdateValidationSchema: ValidationSchema = {
  name: [
    { type: 'minLength', value: 2, message: 'Name must be at least 2 characters long' },
    { type: 'maxLength', value: 50, message: 'Name must not exceed 50 characters' }
  ],
  email: [
    { type: 'email', message: 'Please provide a valid email address' }
  ],
  age: [
    { type: 'min', value: 1, message: 'Age must be at least 1' },
    { type: 'max', value: 150, message: 'Age must not exceed 150' },
    { 
      type: 'custom', 
      message: 'Age must be a valid number',
      validator: (value) => value === undefined || (!isNaN(Number(value)) && Number.isInteger(Number(value)))
    }
  ]
}