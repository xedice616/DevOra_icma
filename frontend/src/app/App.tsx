import { Deck } from '../features/presentation/Deck'

/** The site opens directly into the presentation. Routes (/join, /admin) arrive in later phases. */
export function App() {
  return <Deck />
}
