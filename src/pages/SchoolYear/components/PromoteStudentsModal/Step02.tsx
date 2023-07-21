import { useState } from "react";
import { useSchoolClassGetAll, useStudentsBySchoolclass, useStudentsDestiny } from "~/api/school-class";
import { Group, Modal, Text, Divider, Button, Grid } from "@mantine/core";
import { MoveStudentsBox } from "./MoveStudentsBox";
import { successNotification } from "~/utils/successNotification";
import { errorNotification } from "~/utils/errorNotification";

type Props = {
    opened: boolean;
    onClose: () => void;
    originSchoolClass: object;
}

export function MoveStudentsModal({ opened, onClose, originSchoolClass }: Props) {
    const { data: studentsAll, isLoading: isLoadingStudentsAll } = useStudentsBySchoolclass(originSchoolClass?.id)
    const { data: schoolClasses, isLoading: isLoadingClasses } = useSchoolClassGetAll({ pageSize: 999 });
    let schoolClassesOptions = schoolClasses?.items.filter((item) => item.id != originSchoolClass.id).map(({ name, id }) => ({
        label: name.toString(),
        value: id
    }))

    // getting data from child:
    const [destinationId, setDestinationId] = useState('')
    const [studentsOrigin, setStudentsOrigin] = useState([])
    const [studentsDestiny, setStudentsDestiny] = useState([])

    const { mutate: moveStudents, isLoading: isMoveStudentsLoading } = useStudentsDestiny({
        onSuccess: () => {
            successNotification(
                "Operação realizada com sucesso",
                "Alunos movidos!"
            );
        },
        onError: (error) => {
            errorNotification(
                "Erro durante a operação",
                `${error.message} (cod: ${error.code})`
            );
        },
    });
    function handleCallbackOrigin(students: object) {
        let tempListOrigin: any = []
        let tempListDestiny: any = []

        let filterStudents = students.map((studentId) => {
            studentsAll.filter((item) => {
                item.id != studentId ? tempListOrigin.push(item) : tempListDestiny.push(item)
            })
        })
        setStudentsOrigin(tempListOrigin)
    }
    function handleCallbackDestiny(students: object) {

        console.log('destiny: ', students)
    }

    function sendToBackend() {
        console.log('fim :)')
        // let form: object = {
        //     originId: originSchoolClass.id,
        //     studentIds: childData
        // }
        // moveStudents({ destinationId, form })
    }

    return (
        <>
            <Modal
                title="Promover alunos"
                opened={opened}
                onClose={onClose}
                size="xl"
            >
                <form onSubmit={sendToBackend}>
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
                                schoolClassOrigin={originSchoolClass}
                                schoolClasses={schoolClassesOptions}
                                studentsAll={studentsAll}
                                students={studentsOrigin}
                                parentCallback={handleCallbackOrigin}
                            />
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <MoveStudentsBox
                                newSchoolClass={(value: any) => setDestinationId(value)}
                                schoolClasses={schoolClassesOptions}
                                students={studentsDestiny}
                                parentCallback={handleCallbackDestiny}
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