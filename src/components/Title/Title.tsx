import { Flex, Title as MantineTitle } from "@mantine/core";

type ComponentProps = {
  title: string;
  children?: any;
};

export function Title({ title, children }: ComponentProps) {
  return (
    <Flex direction={{ base: 'column', sm: 'row' }}
      gap={{ base: 'sm', sm: 'sm' }}
      justify={{ sm: 'space-between' }}>
      <MantineTitle
        style={{
          color: '#000',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}
      >
        {title}
      </MantineTitle>

      <Flex direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'sm' }}
        justify={{ sm: 'space-between' }}>
        {children}
      </Flex>
    </Flex>
  )
}