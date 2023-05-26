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
          {/* TODO: change the hex to blue.9 */}
          <IconEye color="#1864AB" />
          <IconEdit color="#1864AB" />
        </Flex>
      </td>
    </tr>
  ));

  return (
    <>
      <Title title="Usuários">
        <Button>Novo usuário</Button>
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
              <Select data={profiles} placeholder="Pesquisar" />
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
            },
          })}
        />
      </Center>
    </>
  );
}