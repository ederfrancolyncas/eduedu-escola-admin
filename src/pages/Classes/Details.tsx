import { Accordion, Button, Grid, Group, Flex, Select, Text, Title, useMantineTheme, Table, Divider } from "@mantine/core";
import { IconPlus, } from "@tabler/icons-react";
import { StudentsPerformance } from "~/components/Classes/StudentsPerformance";

import { TestPerformance } from "~/components/Classes/TestPerformance";
import { TestResultsHistory } from "~/components/Classes/TestResultsHistory";


export function DetailsPage() {
    const theme = useMantineTheme()

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
                        <Flex justify="space-between">
                            <TestPerformance examType="Consciência Fonológica" />
                            <Divider orientation="vertical" />
                            <TestPerformance examType="Sistema de Escrita Alfabética" />
                            <Divider orientation="vertical" />
                            <TestPerformance examType="Leitura e Compreensão de Texto" />
                        </Flex>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="customization">
                    <Accordion.Control>
                        Desempenho em Planetas
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Table horizontalSpacing="sm" verticalSpacing="md">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Planetas Oferecidos</th>
                                    <th>Planetas Realizados</th>
                                    <th>Média Estrelas</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ color: theme.colors.blue[6] }}>Consciência Fonológica</td>
                                    <td>30</td>
                                    <td>30</td>
                                    <td>
                                        {/* TODO: estrelinhas aqui */}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: theme.colors.blue[6] }}>Sistema de Escrita Alfabética</td>
                                    <td>25</td>
                                    <td>20</td>
                                    <td>
                                        {/* TODO: estrelinhas aqui */}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: theme.colors.blue[6] }}>Leitura e Compreensão de Texto</td>
                                    <td>18</td>
                                    <td>17</td>
                                    <td>
                                        {/* TODO: estrelinhas aqui */}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="customization">
                    <Accordion.Control>
                        Histórico de Resultado de Provas
                    </Accordion.Control>
                    <Accordion.Panel>
                        <TestResultsHistory />
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
                        <StudentsPerformance />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </>
    )
}