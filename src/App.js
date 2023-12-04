import { CacheProvider, ThemeProvider } from "@emotion/react";

import AppRoute from "./routes/routs";
import { cacheRtl } from "./cache";
import { theme } from "./style/theme";
import { Container } from "@mui/material";
function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        {" "}
        <AppRoute />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
