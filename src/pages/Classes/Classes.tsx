// Components:
import { PageHeader } from "~/components/PageHeader";
import { Button, Checkbox, Group, Select, Table, Text, TextInput, useMantineTheme } from "@mantine/core";
import { Pagination } from "~/components/Pagination";
import { modals } from '@mantine/modals';

// Icons:
import { IconEdit, IconEye } from "@tabler/icons-react";

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

  // Modals
  const openModalDeleteClass = () => modals.openConfirmModal({
    title: 'Excluir',
    children: (
      <Text size="sm">
        Deseja excluir a(s) turmas(s) selecionada(s)?
      </Text>
    ),
    labels: { confirm: 'Sim', cancel: 'Não' },
    onCancel: () => console.log('Noooo'),
    onConfirm: () => console.log('Yasss :D'),
  })

  return (
    <>
      <PageHeader title="Turmas">
        <Button>Nova turma</Button>
      </PageHeader>

      <Group>
        <Button variant="outline" color="red" onClick={openModalDeleteClass}>Excluir</Button>
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
