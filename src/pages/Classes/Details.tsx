import { Button, Grid, Group, Select, Text, Title } from "@mantine/core";

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
        </>
    )
}