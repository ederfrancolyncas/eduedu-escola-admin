// General:
import { Link } from "@tanstack/router";

// Form:
import {
  Center,
  Box,
  Group,
  Button,
  Image,
  BackgroundImage,
} from "@mantine/core";

// Style:
import logo from "~/assets/logos/eduedu-branca.svg";
import bg from "~/assets/backgrounds/login.svg";
import { InputAuth } from "../../../components/InputAuth/InputAuth";

export const Login = () => {

  return (
    <BackgroundImage src={bg} w="100vw" h="100vh">
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
            <span style={{ color: "white " }}>Portal Administrativo</span>
          </Group>

          <form>
            <InputAuth
              label="Email"
              placeholder="Digite o email cadastrado"
            />

            <InputAuth
              label="Senha"
              placeholder="Digite sua senha"
            />

            <Group position="right" mt="md" mb={30}>
              <Link
                to="/esqueci-a-senha"
                style={{ color: "white ", textDecoration: "none" }}
              >
                Esqueci a senha
              </Link>
            </Group>

            <Group mt="md">
              <Button fullWidth type="submit">
                Entrar
              </Button>
            </Group>
          </form>
        </Box>
      </Center>
    </BackgroundImage>
  )
}
