import { ActionIcon, Checkbox, Input, ScrollArea, Select, Stack, Tooltip } from "@mantine/core";
import { IconChevronRight, IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";

type ComponentProps = {
    moveStudents: any;
    schoolClasses: Array<[{}]>;
    students?: Array<[{}]>;
    schoolClassOrigin: boolean | false
}
export function MoveStudentsBox({ moveStudents, schoolClasses, students, schoolClassOrigin }: ComponentProps) {

    const [selected, setSelected] = useState<string[]>([]);
    function toggleSelected(id: string) {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    }
    return (
        <>
            <Select
                data={schoolClasses?.items.map(({ name, id }) => ({
                    label: name.toString(),
                    value: id,
                }))
                }
                placeholder="Selecione"
                disabled={schoolClassOrigin}
            />
            <Stack mt={20}>
                <Input
                    placeholder="Selecione"
                    rightSection={
                        <>
                            <Tooltip label="Mova os alunos para a próxima turma" position="top-end" withArrow>
                                <div>
                                    <ActionIcon onClick={moveStudents(selected)}>
                                        <IconChevronRight size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                    </ActionIcon>
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
                                onChange={() => toggleSelected(item.id)}
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