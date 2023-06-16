import { Button, Card } from '@mantine/core'
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
                    classesQuantity={item?.summary.totalSchoolClasses}
                    studentsQuantity={item?.summary.totalStudents}
                    teachersQuantity={item?.summary.totalTeachers}
                />
                <Button color="orange.0" fullWidth style={{ color: 'orange' }}>Ver Histórico</Button>
            </Card.Section>
        </Card>
    )
}