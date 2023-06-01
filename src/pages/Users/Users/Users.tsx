import { useUserGetAll } from "~/api/user";
import { Link } from "@tanstack/router";

// Components:
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  Pagination,
  Select,
  Space,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { PageHeader } from "~/components/PageHeader";
import { errorNotification } from "~/utils/errorNotification";
import {
  PROFILE_SELECT,
  STATUS_SELECT,
  USER_PROFILE,
  paginationOptions,
} from "~/constants";
import { useEditingUser } from "~/stores/editing-user-store";

export function UsersPage() {
  const { data } = useUserGetAll({
    onError: (error) => errorNotification("Erro", error.message),
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
              <Select data={PROFILE_SELECT} placeholder="Pesquisar" />
            </th>
            <th>
              Status
              <Select data={STATUS_SELECT} placeholder="Pesquisar" />
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
              <td>{USER_PROFILE[user.profile]}</td>
              <td>{user.status === "ACTIVE" ? "Ativo" : "Inativo"}</td>
              <td>
                <Link
                  to="/usuarios/$userId"
                  params={{ userId: user.id }}
                  onClick={() => useEditingUser.setState(user)}
                >
                  <IconEdit color={theme.colors.blue[9]} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Group position="apart">
        <div></div>
        <Flex align="center" justify="center">
          {data && (
            <Pagination
              total={data.pagination.totalPages}
              withControls={false}
            />
          )}
        </Flex>

        <Group align="center" spacing={24} noWrap>
          <Text>Exibir</Text>
          <Select
            data={paginationOptions}
            size="xs"
            style={{ maxWidth: "60px" }}
          />
          <Text>registros por página</Text>
        </Group>
      </Group>
    </>
  );
}
