import { MantineProvider } from "@mantine/core"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider withNormalizeCSS withGlobalStyles theme={{}}>
            {children}
        </MantineProvider>
    )
}