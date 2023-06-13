import { Pagination, Table, Button, Checkbox, TextInput, Select, useMantineTheme } from "@mantine/core";
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/router";
import { PageHeader } from "~/components/PageHeader";

export function StudentsPage() {
  // Theme:
  const theme = useMantineTheme();

  // Navigation:
  const navigate = useNavigate();
  const navigateSeeStudent = (user: any) => {
    navigate({ to: "/usuarios/$userId", params: { userId: user.id } });
  }

  // TODO: get real data:
  const students = {
    items: [
      {
        id: '1',
        name: 'Amanda Freitas Dias',
        status: 'ACTIVE',
        class: '1º A',
        period: 'Manhã',
        serie: 'Infantil',
        cfo: '30%',
        sea: '30%',
        lct: '30%',
      }
    ],
    pagination: {
      totalPages: 1
    }
  }

  return (
    <>
      <PageHeader title="Alunos">
        <Button variant="outline">Upload aluno</Button>
        <Button>Novo aluno</Button>
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
              Turma
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Período
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Série
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              CFO
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              SEA
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              LCT
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th>
              Status
              <Select data={[]} placeholder="Pesquisar" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students?.items.map((student) => (
            <tr key={student.id}>
              <td>
                <Checkbox />
              </td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.period}</td>
              <td>{student.serie}</td>
              <td>{student.cfo}</td>
              <td>{student.sea}</td>
              <td>{student.lct}</td>
              <td>{student.status === "ACTIVE" ? "Ativo" : "Inativo"}</td>
              <td>
                <IconEye onClick={() => navigateSeeStudent(student)} color={theme.colors.blue[9]} />
                <IconEdit onClick={() => navigateSeeStudent(student)} color={theme.colors.blue[9]} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination totalPages={students ? students.pagination.totalPages : ''} />
    </>
  );
}
