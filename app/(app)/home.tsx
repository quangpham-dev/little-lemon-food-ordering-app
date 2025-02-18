import { lazy } from 'react'

const LazyHomeScreen = lazy(() => import('@/screens/Home'))

export default function HomeRoute() {
  return <LazyHomeScreen />
}
