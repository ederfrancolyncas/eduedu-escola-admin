import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { Title } from "../../../components/Title/Title";

// TODO: change mocked data for real data when backend&&DB is ready
import { profilesSample } from '../../../mocked-data/general'
import { useParams } from "@tanstack/router";

export function UserPage() {

    const params = useParams()
    let newUser = params.id ? false : true
    console.log('user:', newUser)
    return (
        <>
            <Title title={newUser ? 'Novo usuário' : 'Fulano de Tal'} />

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