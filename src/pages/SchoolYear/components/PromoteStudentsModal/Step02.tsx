import { Group, Modal, Text, Divider, Button, Grid } from "@mantine/core";
import { MoveStudentsBox } from "./MoveStudentsBox";
import { useSchoolClassGetAll, useStudentsBySchoolclass } from "~/api/school-class";
import { useState } from "react";

type Props = {
    opened: boolean;
    onClose: () => void;
    originSchoolClassId: string;
}

export function MoveStudentsModal({ opened, onClose, originSchoolClassId }: Props) {

    const { data: studentsOrigin, isLoading: isLoadingStudentsOrigin } = useStudentsBySchoolclass(originSchoolClassId)
    const { data: schoolClasses, isLoading: isLoadingClasses } = useSchoolClassGetAll({ pageSize: 999 });

    // getting data from child:
    const [selectedStudentsOrigin, setSelectedSetStudentsOrigin] = useState([])
    const [selectedStudentsDestiny, setSelectedSetStudentsDestiny] = useState([])
    const [newSchoolClass, setNewSchoolClass] = useState([])

    return (
        <>
            <Modal
                title="Promover alunos"
                opened={opened}
                onClose={onClose}
                size="xl"
            >
                <form>
                    <>
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
                    </>

                    <Grid columns={2}>
                        <Grid.Col span={1}>
                            <MoveStudentsBox
                                schoolClassOrigin={true}
                                schoolClasses={schoolClasses}
                                students={studentsOrigin}
                                moveStudents={values => setSelectedSetStudentsOrigin(values)}
                            />
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <MoveStudentsBox
                                schoolClasses={schoolClasses}
                                newSchoolClass={value => setNewSchoolClass(value)}
                                moveStudents={values => setSelectedSetStudentsDestiny(values)}
                            />
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