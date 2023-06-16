import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Center,
  Group,
  Image,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  RequestPasswordResetInput,
  UserLogin,
  useAuthLogin,
  useRequestPasswordReset,
} from "~/api/auth";
import bg from "~/assets/backgrounds/login.svg";
import logo from "~/assets/logos/eduedu-branca.svg";
import { PATH } from "~/constants/path";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

export function LoginPage() {
  const navigate = useNavigate();
  const [openedForgotPass, { open, close }] = useDisclosure(false);

  const formInputValidation = z.object({
    email: z.string().email({ message: "Insira um e-mail válido" }),
    password: z.string().min(1, { message: "Insira uma senha" }),
  });
  const form = useForm<UserLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(formInputValidation),
  });
  const { mutate: login } = useAuthLogin({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      navigate(PATH.DASHBOARD);
    },
  });

  const formRecoveryValidation = z.object({
    email: z.string().email({ message: "Insira um e-mail válido" }),
  });
  const formRecovery = useForm<RequestPasswordResetInput>({
    initialValues: {
      email: "",
    },
    validate: zodResolver(formRecoveryValidation),
  });
  const { mutate: sendPasswordRecovery } = useRequestPasswordReset({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification(
        "Sucesso",
        "Sua nova senha foi enviada para o email cadastrado."
      );
    },
  });

  return (
    <BackgroundImage src={bg} h="100vh">
      <Center maw={400} h={800} mx="auto">
        <Box sx={{ minWidth: "100%" }}>
          <Image
            maw={180}
            mb={50}
            mx="auto"
            radius="md"
            src={logo}
            alt="Logo EduEdu Escola"
          />

          <Group position="center" mt="md" mb={50}>
            <Text color="white">Portal Administrativo</Text>
          </Group>

          <form
            onSubmit={form.onSubmit((values) => {
              login(values);
            })}
          >
            <TextInput
              label="Email"
              placeholder="Digite o email cadastrado"
              styles={{
                input: { marginBottom: "20px" },
                label: { color: "#fff" },
              }}
              {...form.getInputProps("email")}
            />

            <TextInput
              label="Senha"
              placeholder="Digite sua senha"
              styles={{ label: { color: "#fff" } }}
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="md" mb={30}>
              <Anchor component="button" onClick={open} c="white">
                Esqueci a senha
              </Anchor>
            </Group>

            <Group mt="md">
              <Button type="submit" fullWidth>
                Entrar
              </Button>
            </Group>
          </form>
        </Box>
      </Center>

      <Modal
        opened={openedForgotPass}
        onClose={close}
        title="Esqueci a senha"
        centered
      >
        <form
          onSubmit={formRecovery.onSubmit((values) => {
            sendPasswordRecovery(values);
          })}
        >
          <TextInput
            label="Email de cadastro"
            placeholder="Email"
            {...formRecovery.getInputProps("email")}
            mb={30}
          />
          <Button type="submit" variant="outline" fullWidth>
            Enviar
          </Button>
        </form>
      </Modal>
    </BackgroundImage>
  );
}
