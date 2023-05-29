import { Flex, Switch, TextInput } from "@mantine/core";
import { PageHeader } from "~/components/PageHeader";

export function SettingsPage() {
  return (
    <>
      <PageHeader title="Configurações" />

      <TextInput mb={20} label="Nome da escola" placeholder="Escola XYZ" />

      <Flex>
        Sincronização de planetas
        <Switch />
      </Flex>
    </>
  );
}
