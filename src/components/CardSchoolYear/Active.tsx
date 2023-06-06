import { Card } from '@mantine/core'
import { BaseCard, HeaderCard, ContentCard } from './commons/index'

export function Active() {
    return (
        <BaseCard>
            <Card.Section>
                <HeaderCard year="2024" status="Ativo" />
                <ContentCard
                    classesQuantity='35'
                    studentsQuantity='175'
                    teachersQuantity='58'
                />
            </Card.Section>
        </BaseCard>
    )
}