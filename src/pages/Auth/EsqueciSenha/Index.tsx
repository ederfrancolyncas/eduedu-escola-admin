import { Center } from "@mantine/core"
import { Link } from "@tanstack/router"

export const EsqueciSenha = () => {
    return (
        <Center>
            <h1>Esqueci a senha</h1>
            <Link to="/login">Retornar ao login</Link>
        </Center>
    )
}