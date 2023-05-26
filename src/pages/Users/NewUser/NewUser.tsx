import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { Title } from "../../../components/Title/Title";

// TODO: change mocked data for real data when backend&&DB is ready
import { profilesSample } from '../../../mocked-data/general'

export function NewUserPage() {

    return (
        <>
            <Title title="Novo usuário" />

            <Grid>
                <Grid.Col span={3}>
                    <TextInput
                        label="Nome"
                        placeholder="Nome"
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <TextInput
                        label="CPF"
                        placeholder="CPF"
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <TextInput
                        label="Email"
                        placeholder="Email"
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Select data={profilesSample} label="Perfil" placeholder="Selecione" />
                </Grid.Col>
            </Grid>
            <Group position="right" mt={30}>
                <Button variant="outline">Cancelar</Button>
                <Button disabled>Salvar</Button>
            </Group>
        </>
    )
}