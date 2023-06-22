import { Anchor, Center, Loader, Stack, Title } from "@mantine/core";
import { Link } from "react-router-dom";

type TableLoaderProps = {
  loading: boolean;
  title?: string;
  empty: boolean;
  link?: string;
};

export function TableLoader({
  loading,
  empty,
  title = "Sem dados para exibir",
  link,
}: TableLoaderProps) {
  return (
    <Center h={350}>
      {loading && <Loader />}
      {!loading && empty && (
        <Stack align="center" spacing="xs">
          <Title order={2} color="gray.7">
            {title}
          </Title>
          {link && (
            <Anchor component={Link} to={link}>
              Cadastrar usuário
            </Anchor>
          )}
        </Stack>
      )}
    </Center>
  );
}
