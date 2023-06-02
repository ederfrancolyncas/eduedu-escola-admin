import { useUserGetAll } from "~/api/user";
import { useEditingUser } from "~/stores/editing-user-store";
import { errorNotification } from "~/utils/errorNotification";
import { Link } from "@tanstack/router";
import {
  PROFILE_SELECT,
  STATUS_SELECT,
  USER_PROFILE,
} from "~/constants";

// Components:
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";
import {
  Button,
  Checkbox,
  Group,
  Select,
  Table,
  TextInput,
  useMantineTheme,
} from "@mantine/core";

// Icons:
import { IconEdit } from "@tabler/icons-react";


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

      <Group>
        <Button color="red" variant="outline">Excluir</Button>
        <Button color="blue.6" variant="outline">Inativar</Button>
      </Group>

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

      <Pagination totalPages={data ? data.pagination.totalPages : ''} />
    </>
  );
}