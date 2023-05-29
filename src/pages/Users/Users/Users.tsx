import { Button, Center, Checkbox, Flex, Pagination, Select, Table, TextInput } from "@mantine/core";
import { Title } from "../../../components/Title/Title";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { Link } from "@tanstack/router";

// TODO: change mocked data for real data when backend&&DB is ready
import { usersSample, statusSample, profilesSample } from '../../../mocked-data/general'

export function UsersPage() {

  const rows = usersSample.map((user) => (
    <tr key={user.name}>
      <td><Checkbox /></td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.cpf}</td>
      <td>{user.profile}</td>
      <td>{user.status}</td>
      <td>
        <Flex gap="md">
          {/* TODO: change the hex to blue.9 */}
          <Link to={`usuario/${1}`} search="">
            <IconEye color="#1864AB" />
          </Link>
          <IconEdit color="#1864AB" />
        </Flex>
      </td>
    </tr>
  ));


  return (
    <>
      <Title title="Usuários" description="60 registros">
        <Link to="/usuarios/novo-usuario" search="">
          <Button>Novo usuário</Button>
        </Link>
      </Title>

      <Table horizontalSpacing="xl" verticalSpacing="md">
        <thead>
          <tr>
            <th></th>
            <th>
              Nome
              <TextInput placeholder="Pesquisar" />
            </th>
            <th>
              Email
              <TextInput placeholder="Pesquisar" />
            </th>
            <th>
              CPF
              <TextInput placeholder="Pesquisar" />
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
        <tbody>{rows}</tbody>
      </Table>

      <Center mt={30}>
        <Pagination
          total={10}
          withControls={false}
          styles={() => ({
            control: {
              '&[data-active]': {
                background: "#fff",
                color: "#000",
                border: "0.0625rem solid #ced4da"
              },
            }
          })}
        />
      </Center>
    </>
  );
}