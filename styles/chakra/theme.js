import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    cssVarPrefix: 'emsync',
    initialColorMode: 'dark',
    useSystemColorMode: false
  },

  colors: {
    primary: {
      50: '#fef4f3',
      100: '#fdeae7',
      200: '#fcd4d0',
      300: '#fabfb8',
      400: '#f9a9a1',
      500: '#f79489',
      600: '#c6766e',
      700: '#945952',
      800: '#633b37',
      900: '#311e1b'
    },
    secondary: {
      50: '#f4f3fe',
      100: '#eae7fd',
      200: '#d4d0fc',
      300: '#bfb8fa',
      400: '#a9a1f9',
      500: '#9489f7',
      600: '#766ec6',
      700: '#595294',
      800: '#3b3763',
      900: '#1e1b31'
    }
  }
})
