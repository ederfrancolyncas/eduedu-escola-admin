import { Accordion, Button, Grid, Group, Flex, Select, Text, Title, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { monthsAbbreviation } from "~/constants";


export function DetailsPage() {
    const theme = useMantineTheme()

    // Graphic stuff:
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    // TODO: get real data when backend is finished
    const PhonologicalAwarenessData = [
        {
            month: "Jan",
            testValue: 60,
        },
        {
            month: "Fev",
            testValue: 74,
        },
        {
            month: "Mar",
            testValue: 77,
        },
        {
            month: "Abr",
            testValue: 80,
        },
        {
            month: "Jun",
            testValue: 73,
        },
        {
            month: "Jul",
            testValue: 85,
        },
        {
            month: "Ago",
            testValue: 85,
        },
        {
            month: "Set",
            testValue: 85,
        },
        {
            month: "Out",
            testValue: 80,
        },
        {
            month: "Nov",
            testValue: 87,
        },
        {
            month: "Dez",
            testValue: 90,
        },
    ]
    const AlphabeticWritingSystem = [
        {
            month: "Jan",
            testValue: 30,
        },
        {
            month: "Fev",
            testValue: 60,
        },
        {
            month: "Mar",
            testValue: 70,
        },
        {
            month: "Abr",
            testValue: 80,
        },
        {
            month: "Jun",
            testValue: 70,
        },
        {
            month: "Jul",
            testValue: 80,
        },
        {
            month: "Ago",
            testValue: 90,
        },
        {
            month: "Set",
            testValue: 85,
        },
        {
            month: "Out",
            testValue: 95,
        },
        {
            month: "Nov",
            testValue: 100,
        },
        {
            month: "Dez",
            testValue: 100,
        },
    ]
    const TextReadingAndComprehension = [
        {
            month: "Jan",
            testValue: 70,
        },
        {
            month: "Fev",
            testValue: 70,
        },
        {
            month: "Mar",
            testValue: 75,
        },
        {
            month: "Abr",
            testValue: 80,
        },
        {
            month: "Jun",
            testValue: 75,
        },
        {
            month: "Jul",
            testValue: 85,
        },
        {
            month: "Ago",
            testValue: 90,
        },
        {
            month: "Set",
            testValue: 85,
        },
        {
            month: "Out",
            testValue: 95,
        },
        {
            month: "Nov",
            testValue: 100,
        },
        {
            month: "Dez",
            testValue: 100,
        },
    ]

    const [testsData, setTestsData] = useState({
        labels: monthsAbbreviation,
        datasets: [
            {
                label: "Consciência Fonológica",
                data: PhonologicalAwarenessData.map((data) => data.testValue),
                borderColor: theme.colors.cyan[3],
                backgroundColor: theme.colors.cyan[3],
                yAxisID: 'y',
            },
            {
                label: "Sistema de Escrita Alfabética",
                data: AlphabeticWritingSystem.map((data) => data.testValue),
                borderColor: theme.colors.violet[2],
                backgroundColor: theme.colors.violet[2],
                yAxisID: 'y',
            },
            {
                label: "Leitura e Compreensão de Texto",
                data: TextReadingAndComprehension.map((data) => data.testValue),
                borderColor: theme.colors.orange[3],
                backgroundColor: theme.colors.orange[3],
                yAxisID: 'y',
            },
        ],
    });

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
                        Histórico de Resultado de Provas
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Line options={options} data={testsData} />
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