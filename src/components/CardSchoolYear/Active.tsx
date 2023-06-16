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
                    classesQuantity={item?.summary.totalSchoolClasses}
                    studentsQuantity={item?.summary.totalStudents}
                    teachersQuantity={item?.summary.totalTeachers}
                />
            </Card.Section>
        </Card>
    )
}