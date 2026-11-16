import logoUrl from '../assets/brand/devora-logo.jpg'

/** Official DevOra brand identity. The logo file is used exactly as supplied. */
export const brand = {
  name: 'DevOra',
  descriptor: 'Texnologiya icması',
  /** Kept in English by brand decision. */
  tagline: ['Build.', 'Contribute.', 'Connect.'] as const,
  logo: {
    src: logoUrl,
    alt: 'DevOra Community loqosu — Build · Contribute · Connect',
  },
  joinLabel: 'İcmaya qoşul',
  joinPending: 'Qeydiyyat tezliklə açılacaq.',
} as const
