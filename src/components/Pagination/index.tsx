import { paginationOptions } from "~/constants";
import {
    Flex,
    Group,
    Text,
    Select,
    Pagination as PaginationMantine
} from "@mantine/core"
import { useState } from "react";

type componentProps = {
    totalPages: any
}

export function Pagination({ totalPages }: componentProps) {
    const [activePage, setPage] = useState(1);
    return (
        <Group position="apart">
            <div></div>
            <Flex align="center" justify="center">
                <PaginationMantine
                    value={activePage}
                    onChange={setPage}
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