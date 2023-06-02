import { AppShell, Stack } from "@mantine/core";
import { Navbar } from "~/components/Navbar/Navbar";
import { Footer } from "~/components/Footer/Footer";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell maw={1440} padding="md" header={<Navbar />} footer={<Footer />}>
      <Stack px={150} spacing={24} py={24}>
        {children}
      </Stack>
    </AppShell>
  );
}
