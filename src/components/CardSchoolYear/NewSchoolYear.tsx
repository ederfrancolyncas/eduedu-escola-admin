import { Card, Button } from '@mantine/core'
import { BaseCard } from './commons/Base'

type componentProps = {
    disabled?: boolean
}

export function NewSchoolYear({ disabled }: componentProps) {
    return (
        <BaseCard>
            <Card.Section>
                <Button
                    size={'sm'}
                    variant="outline"
                    disabled={disabled}
                >
                    Adicionar Novo Ano Letivo +
                </Button>
            </Card.Section>
        </BaseCard>
    )
}