import {
  Button,
  Center,
  Checkbox,
  Pagination,
  Select,
  Table,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { Link } from "@tanstack/router";

import { statusSample, profilesSample } from "../../../mocked-data/general";
import { useUserGetAll } from "~/api/user";
import { PageHeader } from "~/components/PageHeader";

export function UsersPage() {
  const { data } = useUserGetAll({
    onSuccess: (data) => console.log(data),
  });
  const theme = useMantineTheme();

  return (
    <>
      <PageHeader
        title="Usuários"
        description={`${data?.pagination.totalItems} registros` ?? ""}
      >
        <Link to="/usuarios">
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

      <Center mt={30}>
        {data && (
          <Pagination total={data.pagination.totalPages} withControls={false} />
        )}
      </Center>
    </>
  );
}
