import { Button, Center, Checkbox, Flex, Pagination, Select, Table, TextInput } from "@mantine/core";
import { Title } from "../../components/Title/Title";
import { IconEdit, IconEye } from "@tabler/icons-react";

export function UsersPage() {

  const profiles = [
    { value: 'direcao/coordenacao', label: 'Direção/Coordenação' },
    { value: 'professor', label: 'Professor' }
  ]

  // TODO: change mocked data for real data when backend&&DB is ready
  const users = [
    {
      name: 'Antônio Carlos Ribeiro',
      email: 'antonio.c@escolaxyz.com.br',
      cpf: 12345678,
      profile: 'Direção/Coordenação'
    },
    {
      name: 'Alice Dias',
      email: 'alice.d@escolaxyz.com.br',
      cpf: 12345678,
      profile: 'Direção/Coordenação'
    },
  ];

  const rows = users.map((user) => (
    <tr key={user.name}>
      <td><Checkbox /></td>
      <td>{user.name}</td>
      <td>{user.cpf}</td>
      <td>{user.email}</td>
      <td>{user.profile}</td>
      <td>
        <Flex gap="md">
          <IconEye />
          <IconEdit />
        </Flex>
      </td>
    </tr>
  ));

  return (
    <>
      <Title title="Usuários">
        <Button>Novo usuário</Button>
      </Title>

      <Table>
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
              <Select data={profiles} placeholder="Pesquisar" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <Center mt={30}>
        <Pagination total={10} />
      </Center>
    </>
  );
}