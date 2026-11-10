export interface ContactValues {
  name: string
  email: string
  message: string
}

export type ContactField = keyof ContactValues
export type ContactErrorKind = 'required' | 'email'
export type ContactErrors = Partial<Record<ContactField, ContactErrorKind>>

export const EMPTY_CONTACT: ContactValues = { name: '', email: '', message: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.name.trim()) errors.name = 'required'
  if (!values.email.trim()) errors.email = 'required'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'email'
  if (!values.message.trim()) errors.message = 'required'
  return errors
}

export function buildMailto(to: string, values: ContactValues, subjectPrefix: string): string {
  const subject = encodeURIComponent(`${subjectPrefix} ${values.name.trim()}`)
  const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`)
  return `mailto:${to}?subject=${subject}&body=${body}`
}
