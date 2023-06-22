import { useUserChangePassword, UserChangePassword } from "~/api/auth";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useUserStore } from "~/stores/user";
import { USER_PROFILE } from "~/constants";
import { useGetAccessKey, useUpdateAccessKey } from "~/api/user";
import { useState } from "react";
import {
  Button,
  Stack,
  Box,
  Group,
  Menu,
  Text,
  TextInput,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronDown, IconRefresh } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export function UserDropdown() {
  const theme = useMantineTheme()

  const { name: userName, profile, id } = useUserStore();

  // Access key stuff:
  const { data, isLoading: isGetAccessKey } = useGetAccessKey(id)
  const { mutate: changeAccessKey } = useUpdateAccessKey({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    }
  })

  // Password stuff:
  const { mutate: changePassword } = useUserChangePassword({
    onSuccess: () => {
      successNotification("Sucesso", "Usuário deletado com sucesso!");
    },
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    }
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
          <Group noWrap>
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
          <TextInput
            label="Código de acesso"
            value={data?.accessKey}
            readOnly
            styles={{
              input: {
                backgroundColor: theme.colors.gray[3]
              }
            }}
            rightSection={
              <ActionIcon
                variant="transparent"
                color="blue.9"
                onClick={() => changeAccessKey(id)}
              >
                <IconRefresh />
              </ActionIcon>
            }
          />
          <Group style={{ marginTop: "10px" }}>
            <Button
              size="xs"
              variant="outline"
              style={{ width: "100%" }}
              onClick={openModalChangePassword}
            >
              Alterar senha
            </Button>
          </Group>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
