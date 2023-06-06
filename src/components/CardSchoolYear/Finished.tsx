import { Card } from '@mantine/core'
import { BaseCard, HeaderCard, ContentCard } from './commons'

export function Finished() {
    return (
        <BaseCard>
            <Card.Section>
                <HeaderCard year="2024" status="Finalizado" />
                <ContentCard
                    classesQuantity='35'
                    studentsQuantity='175'
                    teachersQuantity='58'
                />
            </Card.Section>
        </BaseCard>
    )
}