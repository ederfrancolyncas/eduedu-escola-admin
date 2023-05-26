import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { ButtonStyles } from "../styles";

const theme: MantineThemeOverride = {
  components: {
    Button: ButtonStyles,
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={theme}>
      <Notifications position="top-center" />
      {children}
    </MantineProvider>
  );
}
