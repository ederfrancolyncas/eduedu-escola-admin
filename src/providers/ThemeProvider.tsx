import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import {
  ButtonStyles,
  TableStyles,
  TextInputStyles,
  TextStyles,
  TitleStyles,
} from "../styles";

const theme: MantineThemeOverride = {
  fontFamily: "Inter, sans-serif",

  components: {
    Button: ButtonStyles,
    Text: TextStyles,
    TextInput: TextInputStyles,
    Select: TextInputStyles,
    Title: TitleStyles,
    Table: TableStyles,
  },

  globalStyles() {
    return {
      "#root": {
        maxWidth: 1440,
        marginInline: "auto",
      },
    };
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
