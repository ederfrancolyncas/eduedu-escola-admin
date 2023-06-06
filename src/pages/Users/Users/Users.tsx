import { useState } from 'react';
import { useUserGetAll } from "~/api/user";
import { useEditingUser } from "~/stores/editing-user-store";
import { useNavigate } from "@tanstack/router";
import {
  PROFILE_SELECT,
  STATUS_SELECT,
  USER_PROFILE,
} from "~/constants";
import { useUserDelete, useUserDeactive } from "~/api/user";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

// Components:
import { modals } from '@mantine/modals';
import { PageHeader } from "~/components/PageHeader";
import { Pagination } from "~/components/Pagination";
import {
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
  // Theme:
  const theme = useMantineTheme();

  // Navigation:
  const navigate = useNavigate();
  const navigateNewUser = () => { navigate({ to: "/usuarios/novo-usuario" }); }
  const navigateSeeUser = (user) => {
    useEditingUser.setState(user)
    navigate({ to: "/usuarios/$userId", params: { userId: user.id } });
  }

  // Show/Hide sensible btns(Delete&&Inactivate):
  const [showBtns, setShowBtns] = useState(false);
  const updateShowBtns = () => {
    usersChecked.length ? setShowBtns(true) : setShowBtns(false)
  };

  // Checkbox stuff:
  const [usersChecked, setUsersChecked] = useState([])
  const addUserChecked = (user) => {
    user.checked = true
    usersChecked.push(user.id)
  }
  const removeUserChecked = (user) => {
    user.checked = false
    // TODO: something is broking here:
    let t = usersChecked
    t = t.filter((item) => { item != user.id })
    setUsersChecked(t)
  }
  const checkUncheckUser = (checked, user) => {
    checked ? addUserChecked(user) : removeUserChecked(user)
    updateShowBtns()
  }
  const checkUncheckAll = (checked) => {
    // TODO: fix this
    if (checked) {
      data.items.forEach(element => { element.checked = true });
    } else {
      data.items.forEach(element => { element.checked = false });
    }
  }

  // CRUD:
  const { data } = useUserGetAll({
    onSuccess: (data) => {
      data.items.forEach(element => { element.checked = false });
    },
    onError: (error) => errorNotification("Erro", error.message),
  });
  const { mutate: deleteUser, isLoading: isDeleteLoading } = useUserDelete({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification("Sucesso", "Usuário deletado com sucesso!");
    }
  });
  // TODO: implement when endpoint is ready
  const { mutate: deactiveUser, isLoading: isDeactiveLoading } = useUserDeactive({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification("Sucesso", "Usuário deletado com sucesso!");
    }
  });

  // Modals:
  const openModalDeleteUser = () => modals.openConfirmModal({
    title: 'Excluir',
    children: (
      <Text>
        Deseja excluir o(s) usuários(s) selecionado(s)?
      </Text>
    ),
    labels: { confirm: 'Sim', cancel: 'Não' },
    onConfirm: () => { deleteUser(usersChecked) },
  });
  const openModalDeactivateUser = () => modals.openConfirmModal({
    title: 'Inativar',
    children: (
      <Text>
        Deseja Inativar o(s) usuários(s) selecionado(s)?
      </Text>
    ),
    labels: { confirm: 'Sim', cancel: 'Não' },
    onConfirm: () => deactiveUser(usersChecked),
  })

  return (
    <>
      <PageHeader
        title="Usuários"
        description={`${data?.pagination.totalItems} registros` ?? ""}
        mbDescription="0"
      >
        <Button onClick={navigateNewUser}>Novo usuário</Button>
      </PageHeader>

      {showBtns &&
        <Group>
          <Button onClick={openModalDeleteUser} color="red" variant="outline">Excluir</Button>
          <Button onClick={openModalDeactivateUser} color="blue.6" variant="outline">Inativar</Button>
        </Group>
      }

      <Table horizontalSpacing="xl" verticalSpacing="md">
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={(e) => checkUncheckAll(e.target.checked)}
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
          {data?.items.map((user) => (
            <tr key={user.id}>
              <td>
                <Checkbox
                  checked={user.checked}
                  onChange={(e) => checkUncheckUser(e.target.checked, user)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.document}</td>
              <td>{USER_PROFILE[user.profile]}</td>
              <td>{user.status === "ACTIVE" ? "Ativo" : "Inativo"}</td>
              <td>
                <IconEdit onClick={() => navigateSeeUser(user)} color={theme.colors.blue[9]} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination totalPages={data ? data.pagination.totalPages : ''} />
    </>
  );
}