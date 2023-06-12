import { Card, Flex, Stack, Group, Title, Accordion, Text, useMantineTheme } from "@mantine/core";
import { IconFileDescription, IconPlus, IconUsers } from '@tabler/icons-react';

type componentProps = {
    className?: string;
    classNumber?: string;
    classesQuantity?: string;
    studentsQuantity?: string;
    teachersQuantity?: string;
    children?: any;
};

export function CardDashboardClass({ classNumber, className, classesQuantity, studentsQuantity, teachersQuantity, children }: componentProps) {
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

                <Accordion
                    chevron={<IconPlus size="1rem" />}
                    chevronPosition="left"
                    styles={{
                        chevron: {
                            '&[data-rotate]': {
                                transform: 'rotate(45deg)',
                            },
                        },
                    }}
                >
                    <Accordion.Item value="customization">
                        <Accordion.Control>
                            <Flex justify={"space-between"}>
                                <small>{classNumber}</small>

                                <Flex>
                                    {studentsQuantity}
                                    <IconUsers size="1rem" />
                                </Flex>
                            </Flex>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Group>
                                <Text>Desempenho em Provas (%)</Text>
                                <Text>Consc. Fonológica 85%</Text>
                                <Text>Sistema de Escrita Alfab. 90%</Text>
                                <Text>Leitura e Comp. de Texto 63%</Text>
                            </Group>

                            <Group>
                                <Text>Desempenho em Planetas (%)</Text>
                            </Group>

                            <Flex style={{ marginTop: '20px' }}>
                                <Text>Mais Detalhes da Turma</Text> <IconFileDescription />
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Card.Section>
        </Card>
    )
}