/**
 * DevOra komandası — the five founding members.
 *
 * Names are kept exactly as supplied. Roles and summaries are written in
 * Azerbaijani, like the rest of the presentation.
 *
 *  - photo:    put the image in `src/assets/team/` and import it at the top of
 *              this file, e.g. `import khadijaPhoto from '../assets/team/khadija.webp'`
 *              (4:5 portrait, ~800×1000px, .webp recommended). `null` → initials.
 *  - linkedin: full profile URL, e.g. 'https://www.linkedin.com/in/username'.
 *              `null` → a muted, non-clickable LinkedIn label.
 */
import emilPhoto from '../assets/team/emil-alishov.jpg'
import cahidPhoto from '../assets/team/cahid-mahmudzade.jpg'
import adamPhoto from '../assets/team/adam-hasanov.jpg'
import mehinPhoto from '../assets/team/mehin-meshediyeva.jpg'
import khadijaPhoto from '../assets/team/khadija-ahmadova.jpg'

export interface TeamMember {
  id: string
  name: string
  role: string
  summary: string
  photo: string | null
  linkedin: string | null
}

export const teamMembers: TeamMember[] = [
  {
    id: 'khadija-ahmadova',
    name: 'Khadija Ahmadova',
    role: 'İcma rəhbəri',
    summary: 'İcmaya rəhbərlik edir, onun ümumi strategiyasına, istiqamətinə və inkişafına nəzarət edir.',
    photo: khadijaPhoto,
    linkedin: null,
  },
  {
    id: 'cahid-mahmudzade',
    name: 'Cahid Mahmudzade',
    role: 'Frontend mentoru',
    summary: 'Frontend fəaliyyətlərinə dəstək olur və üzvlərə frontend texnologiyalarında yol göstərir.',
    photo: cahidPhoto,
    linkedin: null,
  },
  {
    id: 'adam-hasanov',
    name: 'Adam Hasanov',
    role: 'Texniki rəhbər',
    summary: 'Texniki istiqaməti koordinasiya edir və icma layihələrinin texniki inkişafına dəstək olur.',
    photo: adamPhoto,
    linkedin: null,
  },
  {
    id: 'mehin-meshediyeva',
    name: 'Mehin Meshediyeva',
    role: 'İcma və əməliyyatlar koordinatoru',
    summary: 'Daxili kommunikasiyanı, üzvlərin fəallığını və icmanın əməliyyatlarını koordinasiya edir.',
    photo: mehinPhoto,
    linkedin: null,
  },
  {
    id: 'emil-alishov',
    name: 'Emil Alishov',
    role: 'Backend mentoru',
    summary: 'Backend fəaliyyətlərinə dəstək olur və üzvlərə backend texnologiyalarında yol göstərir.',
    photo: emilPhoto,
    linkedin: null,
  },
]

export const teamPlaceholders = {
  linkedinMissing: 'LinkedIn profili hələ əlavə edilməyib',
} as const
