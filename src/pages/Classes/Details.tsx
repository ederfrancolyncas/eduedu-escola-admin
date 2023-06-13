import { Accordion, Button, Grid, Group, Flex, Select, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function DetailsPage() {
    return (
        <>
            <Grid columns={6}>
                <Grid.Col span={1}>
                    <Group>
                        <Title order={4}>Turma:</Title>
                        <Select data={[]} placeholder="Pesquisar" searchable />
                    </Group>
                </Grid.Col>

                <Grid.Col span={1}>
                    <Group>
                        <Title order={4}>Série:</Title>
                        <Text>1º Ano Fund. 1</Text>
                    </Group>
                </Grid.Col>

                <Grid.Col span={1}>
                    <Group>
                        <Title order={4}>Alunos:</Title>
                        <Text>40</Text>
                    </Group>
                </Grid.Col>

                <Grid.Col span={1}>
                    <Group>
                        <Title order={4}>Frequência:</Title>
                        <Text>85%</Text>
                    </Group>
                </Grid.Col>

                <Grid.Col span={1}>
                    <Group>
                        <Title order={4}>Professor(es):</Title>
                        <Text>Márcia, Lucas, Pedro</Text>
                    </Group>
                </Grid.Col>

                <Grid.Col span={1}>
                    <Button>Gerar relatório</Button>
                </Grid.Col>
            </Grid>

            <Accordion
                variant="separated"
                chevron={<IconPlus size="1rem" />}
                chevronPosition="left"
                styles={{
                    chevron: {
                        '&[data-rotate]': {
                            transform: 'rotate(45deg)',
                        },
                    }
                }}
            >
                <Accordion.Item value="customization">
                    <Accordion.Control>
                        Desempenho em Provas
                    </Accordion.Control>
                    <Accordion.Panel>
                        Lorem ipsum
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="customization">
                    <Accordion.Control>
                        Desempenho em Planetas
                    </Accordion.Control>
                    <Accordion.Panel>
                        Lorem ipsum
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="customization">
                    <Accordion.Control>
                        <Flex>
                            Desempenho de Alunos por
                            <Select
                                style={{ width: '50px' }}
                                data={[]} />
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        Lorem ipsum
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>
    )
}