import { useState } from "react";
import { useUserGetAll } from "~/api/user";
import { useEditingUser } from "~/stores/editing-user-store";
import { Link, useNavigate } from "@tanstack/router";
import { PROFILE_SELECT, STATUS_SELECT, USER_PROFILE } from "~/constants";
import { useUserDelete, useUserDeactive } from "~/api/user";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

// Components:
import { modals } from "@mantine/modals";
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Select,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";

// Icons:
import { IconEdit } from "@tabler/icons-react";

export function UsersPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useMantineTheme();

  function toggleSelected(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  const { data: users } = useUserGetAll({
    onError: (error) => errorNotification("Erro", error.message),
  });

  const { mutate: deleteUser, isLoading: isDeleteLoading } = useUserDelete({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification("Sucesso", "Usuário(s) deletado(s) com sucesso!");
      setSelected([]);
    },
  });

  // const { mutate: deactiveUser } = useUserDeactive({
  //   onError: (error: Error) => {
  //     errorNotification("Erro", `${error.message} (cod: ${error.code})`);
  //   },
  //   onSuccess: () => {
  //     successNotification("Sucesso", "Usuário deletado com sucesso!");
  //   },
  // });

  // Modals:
  const openModalDeleteUser = () =>
    modals.openConfirmModal({
      title: "Excluir",
      children: <Text>Deseja excluir o(s) usuários(s) selecionado(s)?</Text>,
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => {
        deleteUser(selected);
      },
    });

  // const openModalDeactivateUser = () =>
  //   modals.openConfirmModal({
  //     title: "Inativar",
  //     children: <Text>Deseja Inativar o(s) usuários(s) selecionado(s)?</Text>,
  //     labels: { confirm: "Sim", cancel: "Não" },
  //     onConfirm: () => deactiveUser(usersChecked),
  //   });

  return (
    <>
      <PageHeader
        title="Usuários"
        description={`${users?.pagination.totalItems} registros` ?? ""}
        mbDescription="0"
      >
        <Button component={Link} to="/usuarios/novo-usuario">
          Novo usuário
        </Button>
      </PageHeader>

      {selected.length > 0 && (
        <Group>
          <Button color="red" variant="outline" onClick={openModalDeleteUser}>
            Excluir
          </Button>
          <Button color="blue.6" variant="outline">
            Inativar
          </Button>
        </Group>
      )}

      <Table horizontalSpacing="xl" verticalSpacing="md">
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={() =>
                  setSelected(users?.items.map((u) => u.id) ?? [])
                }
              />
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
          {users?.items.map((user) => (
            <tr key={user.id}>
              <td>
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => toggleSelected(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.document}</td>
              <td>{USER_PROFILE[user.profile]}</td>
              <td>{user.status === "ACTIVE" ? "Ativo" : "Inativo"}</td>
              <td>
                <ActionIcon
                  component={Link}
                  to="/usuarios/$userId"
                  params={{ userId: user.id }}
                >
                  <IconEdit color={theme.colors.blue[9]} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination totalPages={users ? users.pagination.totalPages : ""} />
    </>
  );
}
