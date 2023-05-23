import { Link } from "@tanstack/router";

// Form:
import { useForm } from "@mantine/form";
import {
  Center,
  Box,
  Group,
  TextInput,
  Button,
  Image,
  BackgroundImage,
} from "@mantine/core";

// Style:
import logo from "../../../assets/logos/eduedu-branca.svg";
import bg from "../../../assets/backgrounds/login.svg";

export const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "E-mail inválido"),
      password: (value) => (value ? null : "Senha inválida"),
    },
  });

  return (
    <BackgroundImage src={bg} w="100vw" h="100vh">
      <Center maw={400} h={800} mx="auto">
        <Box>
          <Image
            maw={240}
            mx="auto"
            radius="md"
            src={logo}
            alt="Logo EduEdu Escola"
          />

          <Group position="center" mt="md" mb={50}>
            <span className="font-white">Portal Administrativo</span>
          </Group>

          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              label="Email"
              placeholder="Digite o email cadastrado"
              {...form.getInputProps("email")}
            />

            <TextInput
              label="Senha"
              placeholder="Digite sua senha"
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="md">
              <Link className="font-white no-decoration" to="/esqueci-a-senha">
                Esqueci a senha
              </Link>
            </Group>

            <Group mt="md" mt={50}>
              <Button fullWidth type="submit">
                Entrar
              </Button>
            </Group>
          </form>
        </Box>
      </Center>
    </BackgroundImage>
  );
};
