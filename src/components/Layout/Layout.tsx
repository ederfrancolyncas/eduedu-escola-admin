import { AppShell, Stack } from "@mantine/core";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell
      padding="md"
      header={<Navbar />}
      footer={<Footer />}
      styles={() => ({
        root: {
          maxWidth: 1440,
          marginInline: "auto !important",
        },
      })}
    >
      <Stack px={150} spacing={24} py={24}>
        {children}
      </Stack>
    </AppShell>
  );
}
