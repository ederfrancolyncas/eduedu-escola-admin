import { Card } from '@mantine/core'
import { HeaderCard, ContentCard } from './commons/index'

type componentProps = {
    item?: any
}

export function Active({ item }: componentProps) {
    return (
        <Card>
            <Card.Section>
                <HeaderCard year={item?.name} status="Ativo" />
                <ContentCard
                    classesQuantity='35'
                    studentsQuantity='175'
                    teachersQuantity='58'
                />
            </Card.Section>
        </Card>
    )
}