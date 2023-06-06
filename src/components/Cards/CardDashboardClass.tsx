import { Card, Flex, Stack, Title, Text, useMantineTheme } from "@mantine/core";

type componentProps = {
    className?: string;
    classesQuantity?: string;
    studentsQuantity?: string;
    teachersQuantity?: string;
};

export function CardDashboardClass({ className, classesQuantity, studentsQuantity, teachersQuantity }: componentProps) {
    const theme = useMantineTheme();

    return (
        <Card>
            <Card.Section>
                <Title
                    order={4}
                    weight={400}
                    mb={20}
                    color={theme.colors.blue[9]}
                >
                    {className}
                </Title>

                <Flex justify={'space-between'}>
                    <Stack>
                        <Text size="sm" color="dimmed">Turmas</Text>
                        <Text weight={600}>{classesQuantity}</Text>
                    </Stack>

                    <Stack>
                        <Text size="sm" color="dimmed">Alunos</Text>
                        <Text weight={600}>{studentsQuantity}</Text>
                    </Stack>

                    <Stack>
                        <Text size="sm" color="dimmed">Professores</Text>
                        <Text weight={600}>{teachersQuantity}</Text>
                    </Stack>
                </Flex>

            </Card.Section>
        </Card>
    )
}