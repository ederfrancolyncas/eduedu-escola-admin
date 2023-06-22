import { useUserChangePassword, UserChangePassword } from "~/api/auth";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Stack,
  Box,
  Group,
  Menu,
  Text,
  TextInput,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useUserStore } from "~/stores/user";
import { PROFILE_SELECT, USER_PROFILE } from "~/constants";

export function UserDropdown() {
  const { name: userName, profile } = useUserStore();

  const { mutate: changePassword } = useUserChangePassword({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification("Sucesso", "Usuário deletado com sucesso!");
    },
  });

  const formChangePasswordValidation = z.object({
    passwordConfirmation: z.string().min(1, { message: "Insira uma senha" }),
    password: z.string().min(1, { message: "Insira uma senha" }),
  });

  const formChangePassword = useForm<UserChangePassword>({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validate: zodResolver(formChangePasswordValidation),
  });

  const logout = useUserStore((u) => u.signOut);

  const openModalChangePassword = () =>
    modals.openConfirmModal({
      title: "Redefinir Senha",
      children: (
        <Box>
          <TextInput
            label="Senha Atual"
            placeholder="Senha"
            {...formChangePassword.getInputProps("password")}
            style={{ marginBottom: "20px" }}
          />
          <TextInput
            label="Nova Senha"
            placeholder="Senha"
            {...formChangePassword.getInputProps("passwordConfirmation")}
          />
        </Box>
      ),
      labels: { confirm: "Sim", cancel: "Cancelar" },
      onConfirm: () => changePassword(formChangePassword.values),
    });

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button compact variant="white" color="dark">
          <Group noWrap align="baseline">
            <Group spacing={2} noWrap>
              <Text size="sm" weight={600}>
                {userName}&nbsp;
              </Text>
              <Text size="xs" weight={500}>
                ({USER_PROFILE[profile]})
              </Text>
            </Group>
            <IconChevronDown width={20} height={20} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown p="md">
        <Stack spacing="md">
          <Text weight={700}>{userName}</Text>
          <TextInput label="Código de acesso" value="AHDE29813" readOnly />
          <Stack spacing={12} mt={12}>
            <Button
              size="xs"
              variant="outline"
              onClick={openModalChangePassword}
            >
              Alterar senha
            </Button>
            <Button size="xs" variant="outline" onClick={logout}>
              Sair
            </Button>
          </Stack>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
