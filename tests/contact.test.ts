import { describe, expect, it } from 'vitest'
import { buildMailto, validateContact } from '../lib/contact'

describe('validateContact', () => {
  it('requires name and message', () => {
    expect(validateContact({ name: ' ', message: '' })).toEqual({ name: 'required', message: 'required' })
  })

  it('accepts filled values', () => {
    expect(validateContact({ name: 'Ada', message: 'Hi' })).toEqual({})
  })
})

describe('buildMailto', () => {
  it('puts the name in the subject and signs the body with it', () => {
    const url = buildMailto('me@example.com', { name: ' Ada ', message: 'Hi there ' }, 'Portfolio:')
    expect(url).toBe(
      `mailto:me@example.com?subject=${encodeURIComponent('Portfolio: Ada')}&body=${encodeURIComponent('Hi there\n\nAda')}`,
    )
  })
})
