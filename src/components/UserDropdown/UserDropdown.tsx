import { useUserChangePassword, UserChangePassword } from "~/api/auth";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useUserStore } from "~/stores/user";
import { USER_PROFILE } from "~/constants";
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Stack,
  Group,
  Menu,
  Text,
  Modal,
  PasswordInput,
  Divider,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { AccessKeyInput } from "../AccessKeyInput";

export function UserDropdown() {
  const { name: userName, profile } = useUserStore();

  // Password stuff:
  const { mutate: changePassword } = useUserChangePassword({
    onSuccess: () => {
      successNotification("Sucesso", "Usuário deletado com sucesso!");
    },
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
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
  const [openModalChangePassword, { open, close }] = useDisclosure(false);
  return (
    <>
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
            <AccessKeyInput styled />
            <Stack spacing={12} mt={12}>
              <Button size="xs" variant="outline" onClick={open}>
                Alterar senha
              </Button>
              <Button size="xs" variant="outline" onClick={logout}>
                Sair
              </Button>
            </Stack>
          </Stack>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={openModalChangePassword}
        onClose={close}
        title="Redefinir Senha"
      >
        <form
          onSubmit={formChangePassword.onSubmit((values) => {
            changePassword(values);
          })}
        >
          <PasswordInput
            label="Senha Atual"
            placeholder="Senha"
            {...formChangePassword.getInputProps("password")}
            style={{ marginBottom: "20px" }}
          />
          <PasswordInput
            label="Nova Senha"
            placeholder="Senha"
            {...formChangePassword.getInputProps("passwordConfirmation")}
          />
          <Divider />
          <Group position="right" mt={30}>
            <Button variant="outline" onClick={close}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
