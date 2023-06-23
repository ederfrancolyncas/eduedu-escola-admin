// Os brabo:
import { useState } from "react";
import { Link } from "react-router-dom";
import { PATH } from "~/constants/path";
import { successNotification } from "~/utils/successNotification";
import { usePagination } from "~/hooks/usePagination";

// Components:
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Select,
  Space,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";

// Icons:
import { IconEdit, IconEye } from "@tabler/icons-react";
import { useSchoolClassGetAll } from "~/api/school-class";
import { errorNotification } from "~/utils/errorNotification";

export function ClassesPage() {
  // checkbox stuff:
  const [selected, setSelected] = useState<string[]>([]);
  function toggleSelected(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  const pagination = usePagination()
  const { data: schoolClasses } = useSchoolClassGetAll({
    search: { "page-number": pagination.page, "page-size": pagination.pageSize },
    onError: (error) => errorNotification("Erro", error.message),
  });

  // Modals
  const openModalDeleteClass = () =>
    modals.openConfirmModal({
      title: "Excluir",
      children: (
        <Text size="sm">Deseja excluir a(s) turmas(s) selecionada(s)?</Text>
      ),
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => {
        successNotification(
          "Operação realizada com sucesso",
          "Turma(s) excluída(s) com sucesso!"
        );
      },
    });

  return (
    <>
      <PageHeader title="Turmas">
        <Button component={Link} to={PATH.NEW_CLASS}>
          Nova turma
        </Button>
      </PageHeader>

      {selected.length > 0 ? (
        <Group>
          <Button size="xs" variant="outline" color="red" onClick={openModalDeleteClass}>
            Excluir
          </Button>
        </Group>
      ) : (
        <Space h="xs" />
      )}

      <Table horizontalSpacing="sm" verticalSpacing="md">
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={() =>
                  setSelected(schoolClasses?.items.map((u) => u.id) ?? [])
                }
              />
            </th>
            <th>
              Nome
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Ano Letivo
              <Select data={[]} placeholder="Pesquisar" searchable />
            </th>
            <th>
              Série
              <TextInput size="sm" placeholder="Pesquisar" />
            </th>
            <th>
              Período
              <Select data={[]} placeholder="Pesquisar" searchable />
            </th>
            <th>
              Professores
              <Select data={[]} placeholder="Pesquisar" searchable />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {schoolClasses?.items.map((item) => (
            <tr key={item.id}>
              <td>
                <Checkbox
                  checked={selected.includes(item.id)}
                  onChange={() => toggleSelected(item.id)}
                />
              </td>
              <td>{item.schoolPeriod}</td>
              <td>{item.schoolGrade}</td>
              <td>{item.schoolYear}</td>
              <td>{item.name}</td>
              <td>
                <Group noWrap spacing="xs">
                  <ActionIcon
                    color="blue.9"
                    component={Link}
                    to={`${PATH.EDIT_CLASS}/${item.id}`}
                  >
                    <IconEdit />
                  </ActionIcon>

                  <ActionIcon color="blue.9" component={Link} to={item.id}>
                    <IconEye />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {schoolClasses && <Pagination paginationApi={schoolClasses.pagination} paginationHook={pagination} />}
    </>
  );
}
