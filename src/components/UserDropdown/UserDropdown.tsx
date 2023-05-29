import { Button, Group, Menu, Stack, Text, TextInput } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function UserDropdown() {
  const USER_NAME = "Usuário";
  const USER_ROLE = "Professor";

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
          <Group spacing={8}>
            <Button variant="outline">Editar</Button>
            <Button>Fechar</Button>
          </Group>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
