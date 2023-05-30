import { RouterProvider } from "@tanstack/router";
import { router } from "./routes";

// Style:
import { ThemeProvider } from "./providers/ThemeProvider";
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
