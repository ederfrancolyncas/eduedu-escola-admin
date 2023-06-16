import { modals } from '@mantine/modals';
import { Card, Group, Text, Button } from '@mantine/core'
import { ContentCard, HeaderCard } from './commons';

type componentProps = {
    item?: any
}

export function Draft({ item }: componentProps) {
    // Modals
    const openModalAtivarAnoLetivo = () => modals.openConfirmModal({
        title: 'Ativar Ano Letivo',
        children: (
            <Text size="sm">
                Deseja ativar o ano letivo selecionado?
                Deseja continuar?
            </Text>
        ),
        labels: { confirm: 'Sim', cancel: 'Não' },
        onCancel: () => console.log('Noooo'),
        onConfirm: () => console.log('Yasss :D'),
    })
    const openModalDeleteAnoLetivo = () => modals.openConfirmModal({
        title: 'Excluir',
        children: (
            <Text size="sm">
                Deseja excluir o ano letivo selecionado?
                Todas as informações cadastradas serão perdidas.
                Deseja continuar?
            </Text>
        ),
        labels: { confirm: 'Sim', cancel: 'Não' },
        onCancel: () => console.log('Noooo'),
        onConfirm: () => console.log('Yasss :D'),
    });

    return (
        <Card>
            <Card.Section>
                <HeaderCard year={item?.name} status="Inativo">
                    <Group position="apart">
                        <Button
                            size={'xs'}
                            variant="light"
                            color="red"
                            onClick={openModalDeleteAnoLetivo}>
                            Excluir
                        </Button>
                        <Button
                            size={'xs'}
                            variant="light"
                            onClick={openModalAtivarAnoLetivo}>
                            Ativar
                        </Button>
                    </Group>
                </HeaderCard>
                <ContentCard
                    classesQuantity='35'
                    studentsQuantity='175'
                    teachersQuantity='58'
                />
            </Card.Section>
        </Card>
    )
}