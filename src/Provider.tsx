import { MantineProvider, MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  components: {},
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      {children}
    </MantineProvider>
  );
}
