import { Button, Checkbox, Select, Table, TextInput, useMantineTheme } from "@mantine/core";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";

export function ClassesPage() {
  const theme = useMantineTheme();

  // TODO: get real data here :)
  const data = {
    items: [
      {
        id: '1',
        schoolPeriod: 'Manhã',
        class: 'Infantil',
        schoolYear: '2023',
        name: '1º A',
        teachers: 'Alice, Carlos, Fernanda'
      }
    ],
    pagination: {
      totalPages: '1'
    },
  }

  return (
    <>
      <PageHeader title="Turmas">
        <Button>Nova turma</Button>
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
              Ano Letivo
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Série
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Período
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Professores
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map((item) => (
            <tr key={item.id}>
              <td>
                <Checkbox />
              </td>
              <td>{item.schoolPeriod}</td>
              <td>{item.class}</td>
              <td>{item.schoolYear}</td>
              <td>{item.name}</td>
              <td>
                <IconEdit color={theme.colors.blue[9]} />
                <IconEye color={theme.colors.blue[9]} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination totalPages={data ? data.pagination.totalPages : ''} />
    </>
  );
}
