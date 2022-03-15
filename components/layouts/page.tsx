import React from 'react'

import Head from 'next/head'
import { Box } from '@chakra-ui/react'

import { Header } from './header'
import { Body } from './body'

export const PAGE_HEADER_ID = 'page-header'
export const PAGE_BODY_ID = 'page-body'

export interface PageProps {
  title: string
  headerVisible?: boolean
  width?: number | string
  centerContent?: boolean
  children: React.ReactNode
}

export function Page({
  title,
  headerVisible = true,
  width = 'container.lg',
  centerContent = false,
  children
}: PageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {headerVisible && <Header id={PAGE_HEADER_ID} />}

      <Box>
        <Body
          id={PAGE_BODY_ID}
          width={width}
          centerContent={centerContent}
        >
          {children}
        </Body>
      </Box>
    </>
  )
}
