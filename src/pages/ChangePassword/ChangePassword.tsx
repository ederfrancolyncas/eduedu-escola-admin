import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUserChangePassword } from "~/api/auth";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

// Components:
import {
  BackgroundImage,
  Button,
  Divider,
  Group,
  Modal,
  PasswordInput,
} from "@mantine/core";
import bg from "~/assets/backgrounds/login-1920w.png";
import { PATH } from "~/constants/path";

export function ChangePasswordPage() {
  const navigate = useNavigate();

  const { mutate: changePassword } = useUserChangePassword({
    onSuccess: () => {
      successNotification(
        "Operação realizada com sucesso",
        "Sua senha foi alterada com sucesso."
      );
      navigate(PATH.DASHBOARD);
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

  return (
    <>
      <BackgroundImage src={bg} h="100vh" />
      <Modal
        title="Redefinir Senha"
        opened={true}
        onClose={false}
        withCloseButton={false}
      >
        <form
          onSubmit={formChangePassword.onSubmit((values) => {
            changePassword(values);
          })}
        >
          <PasswordInput
            label="Senha"
            placeholder="Senha"
            {...formChangePassword.getInputProps("password")}
            mb={20}
          />
          <PasswordInput
            label="Confirmar Senha"
            placeholder="Confirmar Senha"
            {...formChangePassword.getInputProps("passwordConfirmation")}
            mb={20}
          />
          <Divider />
          <Group position="right" mt={20}>
            <Button type="submit">Salvar</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
