import { createTheme } from "@mui/material/styles";
import "./font.css"; // Assuming this contains the font import

export const theme = createTheme({
  breakpoints: {
    values: {
      xxl: 2500,
    },
  },
  direction: "rtl",
  typography: {
    h1: { fontSize: `50px` },
    allVariants: { color: `#011e36` },
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
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          display: "flex",
          width: 200,
          "&.Mui-selected": {
            background: `#6193ac`,
            color: "white",
          },
        },
        label: {
          fontSize: "15px",
          "&.Mui-selected": {
            fontSize: "18px",
          },
        },
      },
    },
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
  palette: {
    primary: { main: `#011e36`, x: `#6193ac` },

    secondary: { main: `#f4f8ff` },
    success: { main: `#1dd9a7` },
  },
});
