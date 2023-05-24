import { RouterProvider } from "@tanstack/router"
import { router } from "./Routes"

// Style:
import { ThemeProvider } from "./providers/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
