import { createTheme } from "@mui/material/styles";
import "./font.css"; // Assuming this contains the font import

export const theme = createTheme({
  breakpoints: {
    values: {
      // xs: 0,
      // sm: 600,
      // md: 960,
      // lg: 1280,
      // xl: 1920,
      xxl: 2500,
    },
  },
  direction: "rtl",
  typography: {
    h1: { fontSize: `50px` },
    allVariants: { color: "white" },
    fontFamily: [
      "farsi",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiAppBar: { styleOverrides: { root: { backgroundColor: `#011e36` } } },
    MuiContainer: {
      styleOverrides: {
        root: { background: `#f4f8ff`, height: `100vh`, paddingTop: 95 },
      },
    },
    MuiButton: {
      styleOverrides: { root: { color: "white", fontSize: `20px` } },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "farsi, sans-serif",
        },
      },
    },
  },
  palette: {},
});
