import { RouterProvider } from "@tanstack/router"
import { ThemeProvider } from "./Provider"
import { router } from "./Routes"

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
