import { Box, Flex, Title as MantineTitle } from "@mantine/core";

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
        <MantineTitle color="black" weight={700} td="none">
          {title}
        </MantineTitle>
        <small>{description}</small>
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
