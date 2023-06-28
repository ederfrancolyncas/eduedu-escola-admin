import { Button, Group, Menu, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { USER_PROFILE } from "~/constants";
import { useUserStore } from "~/stores/user";
import { AccessKeyInput } from "../AccessKeyInput";
import { ChangePasswordLoggedModal } from "../ChangePasswordLoggedModal";

export function UserDropdown() {
  const { name: userName, profile } = useUserStore();
  const logout = useUserStore((u) => u.signOut);
  const [changePwModalOpen, changePwModalHandlers] = useDisclosure(false);

  return (
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
            <Button
              size="xs"
              variant="outline"
              onClick={changePwModalHandlers.open}
            >
              Alterar Senha
            </Button>
            <Button size="xs" variant="outline" onClick={logout}>
              Sair
            </Button>
          </Stack>
        </Stack>
      </Menu.Dropdown>
      <ChangePasswordLoggedModal
        opened={changePwModalOpen}
        onClose={changePwModalHandlers.close}
        token=""
      />
    </Menu>
  );
}
