import React from 'react'

export const isServerSide = (): boolean => typeof window === 'undefined'
export const isClientSide = (): boolean => typeof window !== 'undefined'

export const getDisplayName = (WrappedComponent: React.FunctionComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
