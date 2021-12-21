import React from 'react'

let renderCount = 1

export const RenderCount = () => {
  renderCount++
  return (
    <>
    レンダー回数(開発用){ renderCount }
  </>
    )
}
