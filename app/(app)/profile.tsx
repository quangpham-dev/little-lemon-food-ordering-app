import { lazy } from 'react'

const LazyProfileScreen = lazy(() => import('@/screens/Profile'))

export default function ProfileRoute() {
  return <LazyProfileScreen />
}
