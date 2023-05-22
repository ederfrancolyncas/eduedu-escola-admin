import { RouterProvider } from "@tanstack/router"
import { ThemeProvider } from "./Provider"
import { router } from "./Routes"
import './index.css'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
