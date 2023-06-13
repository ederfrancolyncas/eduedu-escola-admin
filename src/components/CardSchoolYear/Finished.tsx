import { Card } from '@mantine/core'
import { HeaderCard, ContentCard } from './commons'

export function Finished() {
    return (
        <Card>
            <Card.Section>
                <HeaderCard year="2024" status="Finalizado" />
                <ContentCard
                    classesQuantity='35'
                    studentsQuantity='175'
                    teachersQuantity='58'
                />
            </Card.Section>
        </Card>
    )
}