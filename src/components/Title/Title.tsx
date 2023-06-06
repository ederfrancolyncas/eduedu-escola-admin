import { Box, Flex, Group, Title as MantineTitle } from "@mantine/core";

type ComponentProps = {
    title: string;
    description?: string;
    children?: any;
};

export function Title({ title, description, children }: ComponentProps) {
    return (
        <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'sm' }}
            justify={{ sm: 'center', md: 'space-between' }}
            style={{ marginBottom: '50px' }}
        >
            <Box>
                <MantineTitle
                    style={{
                        color: '#000',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}
                >
                    {title}
                </MantineTitle>
                <small>{description}</small>
            </Box>

            <Group>
                {children}
            </Group>
        </Flex>
    )
}