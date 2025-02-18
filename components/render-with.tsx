import * as React from 'react'

interface RenderWithProps extends React.PropsWithChildren {
  isTrue?: boolean
}

export default function RenderWith({
  children,
  isTrue = true,
}: RenderWithProps) {
  return isTrue ? children : null
}
