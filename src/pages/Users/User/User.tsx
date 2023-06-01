// Utils & Aux stuff:
import { useState } from 'react';
// TODO: change mocked data for real data when backend&&DB is ready!
import { profilesSample } from '../../../mocked-data/general'
import { Link, useParams } from "@tanstack/router";
// import { createUser } from "~/api/user";

// Components:
import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Title } from "../../../components/Title/Title";

export function UserPage() {

    // Verify if user is to create a new user or edit:
    const params = useParams()
    let newUser = params.id ? false : true

    // Then abled/disabled the save btn:
    const [saveBtn, setSaveBtn] = useState(false)
    const handleChange = (wtf: any) => {
        console.log(wtf.target.name)
        // const { value } = event.target
        // setSaveBtn(value !== '')
    }

    // To validate form:
    const form = useForm({
        initialValues: {
            name: '',
            document: '',
            email: '',
            profile: '',
        },
        validate: {
            name: (value) => (value ? null : "Insira um nome"),
            document: (value) => (value ? null : "Insira um CPF"),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Insira um e-mail válido"),
            profile: (value) => (value ? null : "Selecione um perfil"),
        }
    })

    // To save an user:
    function saveUser(values: Object) {
        console.log('saveUser', values)

        // const result = createUser(values)
        // console.log(result)
    }

    return (
        <>
            <Title title={newUser ? 'Novo usuário' : 'Fulano de Tal'} />

            <form onChange={handleChange} onSubmit={form.onSubmit((values) => saveUser(values))}>
                <Grid>
                    <Grid.Col span={3}>
                        <TextInput
                            name="name"
                            label="Nome"
                            placeholder="Nome"
                            {...form.getInputProps("name")}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <TextInput
                            label="CPF"
                            placeholder="CPF"
                            {...form.getInputProps("document")}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <TextInput
                            label="Email"
                            placeholder="Email"
                            {...form.getInputProps("email")}
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Select
                            data={profilesSample}
                            label="Perfil"
                            placeholder="Selecione"
                            {...form.getInputProps("profile")}
                        />
                    </Grid.Col>
                </Grid>
                <Group position="right" mt={30}>
                    <Link to="/usuarios">
                        <Button variant="outline">Cancelar</Button>
                    </Link>
                    {/* TODO: disabled while form is empty */}
                    <Button
                        type="submit"
                        disabled={!saveBtn}>
                        Salvar
                    </Button>
                </Group>
            </form>
        </>
    )
}