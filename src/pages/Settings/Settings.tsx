import { Flex, Switch, TextInput } from "@mantine/core";
import { Title } from "../../components/Title/Title";

export function SettingsPage() {
  return (
    <>
      <Title title="Configurações" />

      <TextInput
        mb={20}
        label="Nome da escola"
        placeholder="Escola XYZ"
      />

      <Flex>
        Sincronização de planetas
        <Switch />
      </Flex>

    </>
  );
}
