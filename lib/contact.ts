export interface ContactValues {
  name: string
  message: string
}

export type ContactField = keyof ContactValues
export type ContactErrorKind = 'required'
export type ContactErrors = Partial<Record<ContactField, ContactErrorKind>>

export const EMPTY_CONTACT: ContactValues = { name: '', message: '' }

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.name.trim()) errors.name = 'required'
  if (!values.message.trim()) errors.message = 'required'
  return errors
}

/** The reply address comes from the visitor's own mail app, so the draft only carries name and message. */
export function buildMailto(to: string, values: ContactValues, subjectPrefix: string): string {
  const subject = encodeURIComponent(`${subjectPrefix} ${values.name.trim()}`)
  const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}`)
  return `mailto:${to}?subject=${subject}&body=${body}`
}
