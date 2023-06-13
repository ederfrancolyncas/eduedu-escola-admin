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
import { modals } from "@mantine/modals";
import { Link } from "@tanstack/router";
import { useState } from "react";
import { useUserDelete, useUserGetAll, useUserInactivate } from "~/api/user";
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";
import { PROFILE_SELECT, STATUS_SELECT, USER_PROFILE } from "~/constants";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

// Icons:
import { IconEdit } from "@tabler/icons-react";
import { useEditingUser } from "~/stores/editing-user-store";

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

  const { mutate: deleteUser, isLoading: isDeleting } = useUserDelete({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification(
        "Sucesso",
        `${selected.length} Usuário(s) inativado(s) com sucesso!`
      );
      setSelected([]);
    },
  });

  const { mutate: inactivateUser, isLoading: isInactivating } =
    useUserInactivate({
      onError: (error) => {
        errorNotification("Erro", `${error.message} (cod: ${error.code})`);
      },
      onSuccess: () => {
        successNotification(
          "Sucesso",
          `${selected.length} Usuário(s) inativado(s) com sucesso!`
        );
        setSelected([]);
      },
    });

  const openModalDeleteUser = () =>
    modals.openConfirmModal({
      title: "Excluir",
      children: <Text>Deseja excluir o(s) usuários(s) selecionado(s)?</Text>,
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => {
        deleteUser(selected);
      },
    });

  const openModalInactivateteUser = () =>
    modals.openConfirmModal({
      title: "Inativar",
      children: <Text>Deseja Inativar o(s) usuários(s) selecionado(s)?</Text>,
      labels: { confirm: "Sim", cancel: "Não" },
      onConfirm: () => inactivateUser(selected),
    });

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
          <Button
            color="red"
            variant="outline"
            onClick={openModalDeleteUser}
            loading={isDeleting}
          >
            Excluir
          </Button>
          <Button
            color="blue.6"
            variant="outline"
            onClick={openModalInactivateteUser}
            loading={isInactivating}
          >
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
                {/* TODO: limpar editingUser após navegar */}
                <ActionIcon
                  component={Link}
                  to="/usuarios/$userId"
                  params={{ userId: user.id }}
                >
                  <IconEdit
                    color={theme.colors.blue[9]}
                    onClick={() => useEditingUser.setState(user)}
                  />
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
