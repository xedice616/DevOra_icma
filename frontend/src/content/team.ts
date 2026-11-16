/**
 * DevOra komandası — exactly five members.
 *
 * Fill in each member below. Any field left as `null` renders as a clearly
 * marked placeholder on the "Komandamız" slide.
 *
 *  - photo:    put the image in `src/assets/team/` and import it at the top of
 *              this file, e.g. `import aliPhoto from '../assets/team/ali.webp'`
 *              (4:5 portrait, ~900×1125px, .webp recommended)
 *  - linkedin: full profile URL, e.g. 'https://www.linkedin.com/in/username'
 */
export interface TeamMember {
  id: string
  name: string | null
  role: string | null
  bio: string | null
  photo: string | null
  linkedin: string | null
}

export const teamMembers: TeamMember[] = [
  { id: 'member-1', name: null, role: null, bio: null, photo: null, linkedin: null },
  { id: 'member-2', name: null, role: null, bio: null, photo: null, linkedin: null },
  { id: 'member-3', name: null, role: null, bio: null, photo: null, linkedin: null },
  { id: 'member-4', name: null, role: null, bio: null, photo: null, linkedin: null },
  { id: 'member-5', name: null, role: null, bio: null, photo: null, linkedin: null },
]

export const teamPlaceholders = {
  name: 'Ad Soyad',
  role: 'Vəzifə',
  bio: 'Qısa təqdimat burada yer alacaq.',
  photo: 'Foto',
  linkedinMissing: 'LinkedIn profili hələ əlavə edilməyib',
} as const
