import { Group, Modal, Text, Divider, Button, Grid } from "@mantine/core";
import { MoveStudentsBox } from "./MoveStudentsBox";

type Props = {
    opened: boolean;
    onClose: () => void;
    originSchoolClassId: string;
}

export function MoveStudentsModal({ opened, onClose, originSchoolClassId }: Props) {

    return (
        <>
            <Modal
                title="Promover alunos"
                opened={opened}
                onClose={onClose}
                size="xl"
            >
                <form>
                    <Text size="sm" mb={20}>
                        1- Selecione os alunos que deseja promover na coluna da esquerda.
                    </Text>
                    <Text size="sm" mb={20}>
                        2- Em seguida, selecione para qual turma deseja promover os alunos selecionados na coluna da direita.
                    </Text>
                    <Text size="sm" mb={20}>
                        3- Após as duas seleções serem feitas, basta pressionar a seta e mover os alunos de uma lista para a outra.
                    </Text>
                    <Text size="sm" mb={20}>
                        Para transferir alunos para diferentes turmas, basta selecionar outra turma na coluna da direita.
                    </Text>

                    <Grid columns={2}>
                        <Grid.Col span={1}>
                            <MoveStudentsBox schoolClassId={originSchoolClassId} />
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <MoveStudentsBox />
                        </Grid.Col>
                    </Grid>
                    <Divider my="xl" />
                    <Group position="right">
                        <Button
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Salvar
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    )
}