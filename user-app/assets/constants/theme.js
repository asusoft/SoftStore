import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#E7991D',
  secondary: '#FFFAF0',
  white: '#FFF',
  dark: '#616161',
  light: '#f5f5f5',
  grey: '#808080',
  lightGray: '#DDDDDD',
  lightGray2: '#ededed',
  background: '#FAF0E6',
  transparentBlack: "rgba(0, 0, 0, 0.6)",
  transparent: "rgba(0, 0, 0, 0.4)",
  red: '#ff4545',
  green: '#00FF00',
  brown: '#5C4033',
  blue: '#0000FF',
  black: '#000000',
  oldPrimary: '#ff9248',
  potPrimary: '#EBB668',
  darkPrimary: "#592D00",
  darkSecondary: "#EAE4DF",
  skeleton: "#D3D3D3",
  lightPrimary: '#FCD299'
};


export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 20,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

const appTheme = { COLORS, SIZES };

export default appTheme;