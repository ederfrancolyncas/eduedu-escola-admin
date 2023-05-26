import { AppShell, Container } from "@mantine/core";
import { Navbar } from "../Navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell
      padding="md"
      header={<Navbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container size="xl">
        {children}
      </Container>
    </AppShell>
  );
}

//
