import { Card, Button } from '@mantine/core'

type componentProps = {
    disabled?: boolean
}

export function NewSchoolYear({ disabled }: componentProps) {
    return (
        <Card>
            <Card.Section>
                <Button
                    size={'sm'}
                    variant="outline"
                    disabled={disabled}
                >
                    Adicionar Novo Ano Letivo +
                </Button>
            </Card.Section>
        </Card>
    )
}