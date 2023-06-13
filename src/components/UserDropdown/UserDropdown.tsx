import { Button, Stack, Box, Group, Menu, Text, TextInput } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { modals } from '@mantine/modals';

export function UserDropdown() {
  const USER_NAME = "Usuário";
  const USER_ROLE = "Professor";

  const changePassword = () => modals.openConfirmModal({
    title: 'Redefinir Senha',
    children: (
      <Box>
        <TextInput
          label="Senha Atual"
          placeholder="Senha"
          style={{ marginBottom: "20px" }}
        />
        <TextInput
          label="Nova Senha"
          placeholder="Senha"
        />
      </Box>
    ),
    labels: { confirm: 'Sim', cancel: 'Cancelar' },
    onCancel: () => console.log('Noooo'),
    onConfirm: () => console.log('Yasss :D'),
  })

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button compact variant="white" color="dark">
          <Group noWrap>
            <Group spacing={2} noWrap>
              <Text size="sm" weight={600}>
                {USER_NAME}&nbsp;
              </Text>
              <Text size="xs" weight={500}>
                ({USER_ROLE})
              </Text>
            </Group>
            <IconChevronDown width={20} height={20} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown p="md">
        <Stack spacing="md">
          <Text weight={700}>{USER_NAME}</Text>
          <TextInput label="Código de acesso" value="AHDE29813" readOnly />
          <Group style={{ marginTop: '10px' }}>
            <Button
              size="xs"
              style={{ width: '100%' }} variant="outline"
              onClick={changePassword}
            >
              Alterar senha
            </Button>
          </Group>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
