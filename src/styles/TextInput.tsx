import { type MantineTheme } from "@mantine/core";

export const TextInputStyles: MantineTheme["components"]["TextInput"] = {
  defaultProps: {
    radius: "20px",
    styles: {
      label: {
        color: "#fff",
      },
    },
  },
};
