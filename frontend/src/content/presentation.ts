/**
 * Təqdimatın bütün mətnləri — edit copy here, not in the slide components.
 * Titles are arrays: one entry per visual line.
 */

export const openingContent = {
  label: 'Açılış',
  kicker: 'Tələbə texnologiya icması',
  title: 'DevOra',
  statement: ['İdeyadan layihəyə.', 'Bilikdən təcrübəyə.'],
  hint: 'Keçid üçün ← → düymələrindən istifadə edin',
}

export const whyContent = {
  label: 'Niyə DevOra?',
  title: ['Bilik təkbaşına', 'kifayət deyil.'],
  /** The part of the title rendered on the lime highlight. */
  highlight: 'kifayət deyil.',
  body: 'Öyrəndiklərimizi tətbiq etməli, ideyalarımızı reallaşdırmalı və birlikdə inkişaf etməliyik.',
  ideas: [
    { title: 'Öyrən', text: 'Yeni biliklər və bacarıqlar qazan.' },
    { title: 'Yarat', text: 'Biliklərini real layihələrə çevir.' },
    { title: 'Əlaqə qur', text: 'Eyni məqsədləri paylaşan insanlarla birləş.' },
  ],
}

export const whoContent = {
  label: 'Biz kimik?',
  title: ['Eyni maraq.', 'Fərqli bacarıqlar.', 'Ortaq məqsəd.'],
  body: 'DevOra texnologiyaya maraq göstərən, öyrənmək, yaratmaq və biliklərini paylaşmaq istəyən tələbələri bir araya gətirən icmadır.',
  caption: ['Hər işarə — fərqli bacarıq.', 'Birlikdə — vahid struktur.'],
}

export type ActivityGlyph = 'software' | 'openSource' | 'workshop' | 'team' | 'exchange' | 'hackathon'

export const activitiesContent = {
  label: 'Fəaliyyətimiz',
  title: ['Sadəcə öyrənmirik.', 'Birlikdə yaradırıq.'],
  areas: [
    { title: 'Proqram təminatının hazırlanması', glyph: 'software' },
    { title: 'Açıq mənbəli layihələr', glyph: 'openSource' },
    { title: 'Texniki seminarlar', glyph: 'workshop' },
    { title: 'Komanda layihələri', glyph: 'team' },
    { title: 'Bilik və təcrübə mübadiləsi', glyph: 'exchange' },
    { title: 'Hackathonlar və innovasiya', glyph: 'hackathon' },
  ] satisfies { title: string; glyph: ActivityGlyph }[],
}

export const ecosystemContent = {
  label: 'Texnologiya ekosistemi',
  title: ['Fərqli istiqamətlər.', 'Vahid ekosistem.'],
  disciplines: ['Backend', 'Frontend', 'Kibertəhlükəsizlik', 'Süni intellekt', 'UI/UX dizayn', 'Cloud & DevOps'],
}

export interface PartnerIdentity {
  name: string
  descriptor: string
  /** Official logo URL. `null` → typographic treatment until the file is supplied. */
  logo: string | null
}

export const collaborationContent = {
  label: 'Əməkdaşlıq',
  title: ['Birlikdə daha', 'güclüyük.'],
  statement: 'Fərqli texnoloji istiqamətlərin əməkdaşlığı yeni imkanlar və daha güclü ideyalar yaradır.',
  partner: {
    name: 'BMU Kibertəhlükəsizlik İcması',
    descriptor: 'Tərəfdaş icma',
    logo: null,
  } satisfies PartnerIdentity,
}

export const teamContent = {
  label: 'Komandamız',
  title: ['DevOra-nın arxasındakı', 'insanlar.'],
}

export const joinContent = {
  label: 'Bizə qoşul',
  title: ['Sənin də bu', 'hekayədə', 'yerin var.'],
  highlight: 'yerin var.',
  body: 'Hər şeyi bilmək məcburiyyətində deyilsən. Öyrənmək, yaratmaq və töhfə vermək istəməyin kifayətdir.',
  cta: 'İcmaya qoşul',
  /** Label on the open slot in the community grid. */
  slot: 'sən',
}
