import { CacheProvider, ThemeProvider } from "@emotion/react";

import AppRoute from "./routes/routs";
import { cacheRtl } from "./cache";
import { theme } from "./theme";
function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <AppRoute></AppRoute>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
