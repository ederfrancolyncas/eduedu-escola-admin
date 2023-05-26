import { useDisclosure } from '@mantine/hooks';
import { Link } from "@tanstack/router";
import { Header as MantineHeader, Flex, Modal, Image, Text, TextInput, Button, Avatar, Box } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';
import logo from "~/assets/logos/eduedu-preta.svg";
import { NavbarLink } from './NavbarLink';

/* 
    TODO: Validar logo, ícone
*/

export function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MantineHeader height={60} p="xs">

      <Flex direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'sm' }} justify={{ sm: 'space-between' }}>
        <Box>
          <Image
            src={logo} alt="Logo EduEdu"
            withPlaceholder
            placeholder={<Text align="center">Logo EduEdu</Text>}
            maw={50}
            mx="auto"
          />
        </Box>
        <Flex direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'sm' }}
          justify={{ sm: 'right' }}>

          <NavbarLink text="Usuários" route="/usuarios" />
          <NavbarLink text="Turmas" route="/turmas" />
          <NavbarLink text="Alunos" route="/alunos" />
          <NavbarLink text="Configurações" route="/configuracoes" />

          <Avatar color="cyan" radius="xl">SA</Avatar>

          {/* TODO: concertar desalinhamento entre texto e ícone */}
          <Box onClick={open}>
            <span
              style={{
                color: '#000',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              Super Admin
            </span>
            <IconChevronDown />
          </Box>
        </Flex>
      </Flex>

      <Modal title="Super Admin" opened={opened} onClose={close}>

        <TextInput
          placeholder="Example here"
          label="Código de acesso"
          mb={30}
        />

        <Flex direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'sm' }}
          justify={{ sm: 'left' }}>
          <Link to="/dashboard/editar-usuario/123" search="">
            <Button>Editar</Button>
          </Link>
          <Button>Fechar</Button>
        </Flex>
      </Modal>
    </MantineHeader>
  );
}
