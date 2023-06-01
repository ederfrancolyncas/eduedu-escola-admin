import { paginationOptions, profilesSample, statusSample } from "../../../mocked-data/general";
import { useUserGetAll } from "~/api/user";
import { Link } from "@tanstack/router";

// Components:
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Pagination,
  Select,
  Space,
  Table,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { PageHeader } from "~/components/PageHeader";

export function UsersPage() {
  const { data } = useUserGetAll({
    onSuccess: (data) => console.log('users:', data),
  });
  const theme = useMantineTheme();

  return (
    <>
      <PageHeader
        title="Usuários"
        description={`${data?.pagination.totalItems} registros` ?? ""}
      >
        <Link to="/usuarios/novo-usuario">
          <Button>Novo usuário</Button>
        </Link>
      </PageHeader>

      <Table horizontalSpacing="xl" verticalSpacing="md">
        <thead>
          <tr>
            <th>
              <Checkbox />
            </th>
            <th>
              Nome
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Email
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              CPF
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Perfil
              <Select data={profilesSample} placeholder="Pesquisar" />
            </th>
            <th>
              Status
              <Select data={statusSample} placeholder="Pesquisar" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((user) => (
            <tr key={user.id}>
              <td>
                <Checkbox />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.document}</td>
              <td>{user.profile}</td>
              <td>{user.status}</td>
              <td>
                <Link to="/usuarios/$userId" params={{ userId: user.id }}>
                  <IconEdit color={theme.colors.blue[9]} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Grid mt={30}>
        <Grid.Col span={10}>
          <Flex align="center" justify="center">
            {data && (
              <Pagination total={data.pagination.totalPages} withControls={false} />
            )}
          </Flex>
        </Grid.Col>
        <Grid.Col span={2}>
          <Flex align="center" justify="space-between">
            <small>Exibir</small>
            <Space w="xs" />
            <Select data={paginationOptions} size="xs" style={{ maxWidth: '60px' }} />
            <Space w="xs" />
            <small>registros por página</small>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}
