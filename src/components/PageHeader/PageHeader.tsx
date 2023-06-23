import {
  Box,
  Flex,
  Group,
  Title as MantineTitle,
  Stack,
  Text,
} from "@mantine/core";

type ComponentProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, children }: ComponentProps) {
  return (
    <Group spacing={200} noWrap align="flex-start">
      <Stack spacing={30}>
        <MantineTitle order={2}>{title}</MantineTitle>
        <Text size="sm">{description}</Text>
      </Stack>

      <Group>{children}</Group>
    </Group>
  );
}
