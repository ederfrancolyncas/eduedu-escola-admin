import { Box, Flex, Title as MantineTitle, Text } from "@mantine/core";

type ComponentProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, children, description }: ComponentProps) {
  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "sm" }}
      justify={{ sm: "space-between" }}
    >
      <Box>
        <MantineTitle weight={700} order={3}>
          {title}
        </MantineTitle>
        <Text size="sm" color="dark.4">
          {description}
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "sm" }}
        justify={{ sm: "space-between" }}
      >
        {children}
      </Flex>
    </Flex>
  );
}
