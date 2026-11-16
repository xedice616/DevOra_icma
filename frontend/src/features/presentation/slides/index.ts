import {
  activitiesContent,
  collaborationContent,
  ecosystemContent,
  joinContent,
  openingContent,
  teamContent,
  whoContent,
  whyContent,
} from '../../../content/presentation'
import type { SlideDefinition } from '../types'
import { OpeningSlide } from './OpeningSlide'
import { WhySlide } from './WhySlide'
import { WhoSlide } from './WhoSlide'
import { ActivitiesSlide } from './ActivitiesSlide'
import { EcosystemSlide } from './EcosystemSlide'
import { CollaborationSlide } from './CollaborationSlide'
import { TeamSlide } from './TeamSlide'
import { JoinSlide } from './JoinSlide'

/**
 * Slide order and rhythm of surfaces:
 * forest → cream → ink → cream → forest → ink/forest → cream → forest
 */
export const slides: SlideDefinition[] = [
  { id: 'acilis', label: openingContent.label, theme: 'dark', Component: OpeningSlide },
  { id: 'niye-devora', label: whyContent.label, theme: 'light', Component: WhySlide },
  { id: 'biz-kimik', label: whoContent.label, theme: 'dark', Component: WhoSlide },
  { id: 'fealiyyetimiz', label: activitiesContent.label, theme: 'light', Component: ActivitiesSlide },
  { id: 'ekosistem', label: ecosystemContent.label, theme: 'dark', Component: EcosystemSlide },
  { id: 'emekdasliq', label: collaborationContent.label, theme: 'dark', Component: CollaborationSlide },
  { id: 'komandamiz', label: teamContent.label, theme: 'light', Component: TeamSlide },
  { id: 'bize-qosul', label: joinContent.label, theme: 'dark', Component: JoinSlide },
]
