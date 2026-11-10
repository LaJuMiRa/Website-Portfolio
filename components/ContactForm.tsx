'use client'

import { useRef, useState, type FormEvent } from 'react'
import { CheckCircle2, Mail } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import {
  EMPTY_CONTACT,
  buildMailto,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from '@/lib/contact'
import { SITE } from '@/lib/site'

const FIELD_ORDER: readonly ContactField[] = ['name', 'email', 'message']

interface FieldProps {
  name: ContactField
  label: string
  placeholder: string
  value: string
  error?: string
  onChange: (name: ContactField, value: string) => void
}

function Field({ name, label, placeholder, value, error, onChange }: FieldProps) {
  const errorId = `${name}-error`
  const shared = {
    id: name,
    name,
    value,
    placeholder,
    required: true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: 'field',
  } as const

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[0.95rem] font-medium">
        {label}
      </label>
      {name === 'message' ? (
        <textarea {...shared} rows={6} onChange={event => onChange(name, event.target.value)} className="field resize-y" />
      ) : (
        <input
          {...shared}
          type={name === 'email' ? 'email' : 'text'}
          autoComplete={name === 'email' ? 'email' : 'name'}
          onChange={event => onChange(name, event.target.value)}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<ContactValues>(EMPTY_CONTACT)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [opened, setOpened] = useState(false)

  const messages = { required: t.contact.errorRequired, email: t.contact.errorEmail }

  const handleChange = (name: ContactField, value: string) => {
    setValues(current => ({ ...current, [name]: value }))
    setErrors(current => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateContact(values)
    setErrors(found)

    const firstInvalid = FIELD_ORDER.find(field => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus()
      return
    }

    window.location.href = buildMailto(SITE.email, values, t.contact.subjectPrefix)
    setOpened(true)
  }

  if (opened) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-surface p-7 md:p-9">
        <CheckCircle2 size={30} className="text-accent" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-semibold">{t.contact.successTitle}</h3>
        <p className="mt-2 text-muted">{t.contact.successBody}</p>
        <button
          type="button"
          className="btn btn-ghost mt-7"
          onClick={() => {
            setValues(EMPTY_CONTACT)
            setOpened(false)
          }}
        >
          {t.contact.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-line bg-surface p-6 md:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label={t.contact.nameLabel}
          placeholder={t.contact.namePlaceholder}
          value={values.name}
          error={errors.name && messages[errors.name]}
          onChange={handleChange}
        />
        <Field
          name="email"
          label={t.contact.emailLabel}
          placeholder={t.contact.emailPlaceholder}
          value={values.email}
          error={errors.email && messages[errors.email]}
          onChange={handleChange}
        />
      </div>
      <Field
        name="message"
        label={t.contact.messageLabel}
        placeholder={t.contact.messagePlaceholder}
        value={values.message}
        error={errors.message && messages[errors.message]}
        onChange={handleChange}
      />
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" className="btn btn-primary shrink-0 whitespace-nowrap">
          <Mail size={17} aria-hidden />
          {t.contact.submit}
        </button>
        <p className="text-sm text-muted">{t.contact.submitHint}</p>
      </div>
    </form>
  )
}
