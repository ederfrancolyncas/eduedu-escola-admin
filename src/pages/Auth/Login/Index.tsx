// Utils & Aux:
import { useDisclosure } from '@mantine/hooks';
import { Link } from "@tanstack/router";

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
} from "@mantine/core";
import { RoundedInput } from "../../../components/RoundedInput/RoundedInput";
import { RoundedButton } from "../../../components/RoundedButton/RoundedButton";

// Assets:
import logo from "~/assets/logos/eduedu-branca.svg";
import bg from "~/assets/backgrounds/login.svg";

import { showNotification } from "@mantine/notifications";
export const Login = () => {

  const [openedForgotPass, { open, close }] = useDisclosure(false);

  function sendPassRecovery() {

    // TODO: question about which lib we'll use :D
    // axios.get("https://yesno.wtf/api")
    //   .then((res) => {
    //     console.log('res', res)
    //   })
    //   .catch((err) => {
    //     console.log('err', err)
    //   }).finally(() => {
    //     console.log('finish him')
    //   })

    return showNotification({
      message: "Sua nova senha foi enviada para o email cadastrado.",
    })
  }
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
              <span style={{ color: "white " }}>Portal Administrativo</span>
            </Group>

            <form>
              <RoundedInput
                label="Email"
                placeholder="Digite o email cadastrado"
              />

              <RoundedInput
                label="Senha"
                placeholder="Digite sua senha"
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
                <RoundedButton text="Entrar" fullWidth />
              </Group>
            </form>
          </Box>
        </Center>
      </BackgroundImage>

      <Modal
        opened={openedForgotPass} onClose={close} title="Esqueci a senha" centered>
        <TextInput mb={30} label="Email de cadastro" placeholder="Email" />
        <Button
          variant="outline"
          fullWidth
          onClick={sendPassRecovery}
        >
          Enviar
        </Button>
      </Modal>
    </>
  )
}
