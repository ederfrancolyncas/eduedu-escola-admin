import {
  ActionIcon,
  Button,
  Checkbox,
  FileInput,
  Group,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconEye, IconPaperclip } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { PageHeader } from "~/components/PageHeader";
import { PATH } from "~/constants/path";

export function StudentsPage() {
  const openModalUploadStudent = () =>
    modals.openConfirmModal({
      title: "Upload de Aluno",
      children: (
        <>
          <Group>
            <Text size="sm">
              Para fazer upload de aluno em lote é necessário seguir o template
              de cadastro de aluno.
            </Text>
            <Text c="blue.6">Fazer download do template</Text>
          </Group>

          <Group>
            <Text size="sm">
              Selecione o arquivo do template de Cadastro de Aluno.
            </Text>
            <FileInput
              placeholder="Selecione o arquivo"
              icon={<IconPaperclip size={rem(14)} />}
            />
          </Group>

          <Group>
            <Text size="sm">
              Selecione a turma que deseja adicionar os alunos do template.
            </Text>
            <Select
              placeholder="Selecione a turma"
              data={[]}
              style={{ width: "100%" }}
            />
          </Group>
        </>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
      onCancel: () => console.log("Noooo"),
      onConfirm: () => console.log("Yasss :D"),
    });

  // TODO: get real data:
  const students = {
    items: [
      {
        id: "1",
        name: "Amanda Freitas Dias",
        status: "ACTIVE",
        class: "1º A",
        period: "Manhã",
        serie: "Infantil",
        cfo: "30%",
        sea: "30%",
        lct: "30%",
      },
    ],
    pagination: {
      totalPages: 1,
    },
  };

  return (
    <>
      <PageHeader title="Alunos">
        <Button onClick={openModalUploadStudent} variant="outline">
          Upload aluno
        </Button>
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
                <Group noWrap spacing="xs">
                  <ActionIcon
                    component={Link}
                    to={`${PATH.STUDENTS}/${student.id}`}
                    color="blue.9"
                  >
                    <IconEye />
                  </ActionIcon>
                  <ActionIcon
                    component={Link}
                    to={`${PATH.STUDENTS}/${student.id}`}
                    state={{ student }}
                    color="blue.9"
                  >
                    <IconEdit />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination total={students.pagination.totalPages ?? 0} />
    </>
  );
}
