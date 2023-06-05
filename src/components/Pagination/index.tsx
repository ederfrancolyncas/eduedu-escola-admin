import {
    Flex,
    Group,
    Text,
    Select,
    Pagination as PaginationMantine
} from "@mantine/core"
import { paginationOptions } from "~/constants";

export function Pagination(totalPages: any) {
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