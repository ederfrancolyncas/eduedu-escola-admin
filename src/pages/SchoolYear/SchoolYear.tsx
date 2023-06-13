// Components:
import { PageHeader } from "~/components/PageHeader";
import { Grid, Text, Button } from "@mantine/core";
import { CardActive, CardFinished, CardInactive, CardNewSchoolYear } from "~/components/CardSchoolYear";
import { modals } from '@mantine/modals';

export function SchoolYearPage() {
    // Modals
    const openModalPromoverAlunos = () => modals.openConfirmModal({
        title: 'Novo Ano Letivo',
        children: (
            <Text size="sm">
                Ao adicionar um novo ano letivo, o ano letivo atual terá todas as turmas clonadas.
                Caso seu novo ano letivo tenha mais ou menos turmas, edite-as no menu turmas.
            </Text>
        ),
        labels: { confirm: 'Sim', cancel: 'Não' },
        onCancel: () => console.log('Noooo'),
        onConfirm: () => console.log('Yasss :D'),
    });

    return (
        <>
            <PageHeader
                title="Ano Letivo"
                description="A criação de um ano letivo é importante, para a associação das turmas que estão vínculadas com aquele ano.
                    Só é possível existir o ano letivo atual e um ano letivo futuro, porém apenas um ano letivo pode estar ativo por vez.
                    Durante o final do ano letivo (31 de dezembro) o ano que estava vigente automáticamente se torna finalizado."
            >
                <Button size="sm" onClick={openModalPromoverAlunos}>Promover Alunos</Button>
            </PageHeader>

            <Grid columns={4}>
                {/* Card New School Year */}
                <Grid.Col span={1}>
                    <CardNewSchoolYear />
                </Grid.Col>

                {/* Example Card: Inactive */}
                <Grid.Col span={1}>
                    <CardInactive />
                </Grid.Col>

                {/* Example Card: Active */}
                <Grid.Col span={1}>
                    <CardActive />
                </Grid.Col>

                {/* Example Card: Finished */}
                <Grid.Col span={1}>
                    <CardFinished />
                </Grid.Col>
            </Grid>
        </>
    );
}
