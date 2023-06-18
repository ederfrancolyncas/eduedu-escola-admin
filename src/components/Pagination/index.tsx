import { paginationOptions } from "~/constants";
import {
    Flex,
    Group,
    Text,
    Select,
    Pagination as PaginationMantine
} from "@mantine/core"

type componentProps = {
    totalPages: any
}

export function Pagination({ totalPages }: componentProps) {
    return (
        <Group position="apart">
            <div></div>
            <Flex align="center" justify="center">
                <PaginationMantine
                    total={totalPages}
                    withControls={false}
                />
            </Flex>
            <Group align="center" spacing={24} noWrap>
                <Text>Exibir</Text>
                <Select
                    data={paginationOptions}
                    size="xs"
                    style={{ maxWidth: "60px" }}
                />
                <Text>registros por página</Text>
            </Group>
        </Group>
    )
}