import { Checkbox, Input, ScrollArea, Select, Stack, Tooltip } from "@mantine/core";
import { IconChevronRight, IconChevronsRight } from "@tabler/icons-react";
import { useSchoolClassGetAll, useStudentsBySchoolclass } from "~/api/school-class";

type ComponentProps = {
    schoolClassId?: string | '';
}
export function MoveStudentsBox({ schoolClassId }: ComponentProps) {

    const { data: students, isLoading: isLoadingStudentsOrigin } = useStudentsBySchoolclass(schoolClassId)

    const { data: schoolClasses, isLoading: isLoadingClasses } = useSchoolClassGetAll({ pageSize: 999 });

    return (
        <>
            <Select
                data={schoolClassId ?
                    [{ label: schoolClassId, value: schoolClassId }]
                    :
                    schoolClasses?.items.map(({ name, id }) => ({
                        label: name.toString(),
                        value: id,
                    }))
                }
                placeholder="Selecione"
                disabled={schoolClassId ? true : false}
            />
            <Stack mt={20}>
                <Input
                    placeholder="Selecione"
                    rightSection={
                        <>
                            <Tooltip label="Mova os alunos para a próxima turma" position="top-end" withArrow>
                                <div>
                                    <IconChevronRight size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                            <Tooltip label="Mova os alunos para a próxima turma" position="top-end" withArrow>
                                <div>
                                    <IconChevronsRight size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                </div>
                            </Tooltip>
                        </>
                    }
                />
                <ScrollArea h={150} type="auto">
                    {students &&
                        students.map((item) => (
                            <Checkbox
                                label={item.name}
                                mb={10}
                            />
                        ))
                    }
                </ScrollArea>
            </Stack>
        </>
    )
}