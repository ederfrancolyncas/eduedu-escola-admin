// os brabo:
import { errorNotification } from "~/utils/errorNotification";
import { useSchoolYearGetAll } from "~/api/school-year";
// Components:
import { PageHeader } from "~/components/PageHeader";
import { Grid, Button } from "@mantine/core";
import { CardActive, CardFinished, CardInactive, CardNewSchoolYear } from "~/components/CardSchoolYear";

export function SchoolYearPage() {

    const { data: schoolYears } = useSchoolYearGetAll({
        onError: (error) => errorNotification("Erro", error),
    });
    console.log('schoolYears', schoolYears)

    return (
        <>
            <PageHeader
                title="Ano Letivo"
                description="A criação de um ano letivo é importante, para a associação das turmas que estão vínculadas com aquele ano.
                    Só é possível existir o ano letivo atual e um ano letivo futuro, porém apenas um ano letivo pode estar ativo por vez.
                    Durante o final do ano letivo (31 de dezembro) o ano que estava vigente automáticamente se torna finalizado."
            >
                <Button size="sm">Promover Alunos</Button>
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
