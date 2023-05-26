import { AppShell, Container } from "@mantine/core";
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
      styles={() => ({
        root: {
          maxWidth: 1440,
          marginBlock: "auto",
        },
      })}
    >
      <Container size="xl">{children}</Container>
    </AppShell>
  );
}
