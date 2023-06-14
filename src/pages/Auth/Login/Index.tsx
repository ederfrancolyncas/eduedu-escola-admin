// Utils & Aux:
import { PATH } from "~/constants/path";
import { errorNotification } from '~/utils/errorNotification';
import { successNotification } from '~/utils/successNotification';
import { useUserAuth, useUserPasswordRecovery, UserLogin, UserRecoveryPass } from '~/api/auth'
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";

// Components:
import {
  Modal,
  Center,
  Box,
  Group,
  Button,
  Image,
  BackgroundImage,
  TextInput,
  Text,
} from "@mantine/core";

// Assets:
import logo from "~/assets/logos/eduedu-branca.svg";
import bg from "~/assets/backgrounds/login.svg";

export const Login = () => {

  // Navigation:
  const navigate = useNavigate();

  const [openedForgotPass, { open, close }] = useDisclosure(false);

  // Login password stuff:
  const formInputValidation = z.object({
    email: z.string().email({ message: "Insira um e-mail válido" }),
    password: z
      .string()
      .min(1, { message: "Insira uma senha" }),
  });
  const form = useForm<UserLogin>({
    initialValues: {
      email: "",
      password: ""
    },
    validate: zodResolver(formInputValidation),
  });
  const { mutate: login, isLoading: isCreateLoading } = useUserAuth({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      navigate(PATH.DASHBOARD);
    },
  });

  // Recovery password stuff:
  const formRecoveryValidation = z.object({
    email: z.string().email({ message: "Insira um e-mail válido" })
  });
  const formRecovery = useForm<UserRecoveryPass>({
    initialValues: {
      email: "",
      password: ""
    },
    validate: zodResolver(formRecoveryValidation),
  });
  const { mutate: sendPasswordRecovery, isLoading: isSendingPasswordLoading } = useUserPasswordRecovery({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
    onSuccess: () => {
      successNotification("Sucesso", "Sua nova senha foi enviada para o email cadastrado.");
    },
  });

  return (
    <>
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

            <form onSubmit={form.onSubmit((values) => { login(values) })}>
              <TextInput
                label="Email"
                placeholder="Digite o email cadastrado"
                styles={{ input: { marginBottom: '20px' }, label: { color: '#fff' } }}
                {...form.getInputProps("email")}
              />

              <TextInput
                label="Senha"
                placeholder="Digite sua senha"
                styles={{ label: { color: '#fff' } }}
                {...form.getInputProps("password")}
              />

              <Group position="right" mt="md" mb={30}>
                <Link
                  onClick={open}
                  style={{ color: "white ", textDecoration: "none" }}
                >
                  Esqueci a senha
                </Link>
              </Group>

              <Group mt="md">
                <Button type="submit" fullWidth>Entrar</Button>
              </Group>
            </form>
          </Box>
        </Center>
      </BackgroundImage>

      <Modal
        opened={openedForgotPass} onClose={close} title="Esqueci a senha" centered>

        <form onSubmit={formRecovery.onSubmit((values) => { sendPasswordRecovery(values) })}>
          <TextInput
            label="Email de cadastro"
            placeholder="Email"
            {...formRecovery.getInputProps("email")}
            mb={30}
          />
          <Button
            type="submit"
            variant="outline"
            fullWidth
          >
            Enviar
          </Button>
        </form>
      </Modal>
    </>
  )
}
