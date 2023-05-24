import { Header as MantineHeader } from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";

/* 
    TODO: Validar icone
*/

export function Header() {
  return (
    <MantineHeader height={60} p="xs">
      <IconActivity />
    </MantineHeader>
  );
}
