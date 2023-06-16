import { Card } from '@mantine/core'
import { HeaderCard, ContentCard } from './commons'

type componentProps = {
    item?: any
}

export function Finished({ item }: componentProps) {
    return (
        <Card>
            <Card.Section>
                <HeaderCard year={item?.name} status="Finalizado" />
                <ContentCard
                    classesQuantity='35'
                    studentsQuantity='175'
                    teachersQuantity='58'
                />
            </Card.Section>
        </Card>
    )
}