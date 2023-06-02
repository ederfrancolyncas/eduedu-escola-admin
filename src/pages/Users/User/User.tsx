import { UserInput, useUserCreate, useUserUpdate } from "~/api/user";
import { Link, useNavigate } from "@tanstack/router";
import { PROFILE_SELECT, STATUS_SELECT } from "~/constants";
import { useEditingUser } from "~/stores/editing-user-store";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { errorNotification } from "~/utils/errorNotification";
import { successNotification } from "~/utils/successNotification";

// Components:
import { Title } from "~/components/Title/Title";
import { Button, Grid, Group, Select, TextInput, useMantineTheme } from "@mantine/core";

// Icons:
import { IconRefresh } from "@tabler/icons-react";

const userInputValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
    .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),

  document: z
    .string()
    .length(11, { message: "CPF deve ter 11 caracteres" })
    .regex(/^\d+$/, { message: "CPF deve conter apenas números" }),

  email: z.string().email({ message: "Insira um e-mail válido" }),

  profile: z.enum(["DIRECTOR", "TEACHER"]),
});

export function UserPage() {
  const theme = useMantineTheme();

  const navigate = useNavigate();
  const editingUser = useEditingUser();

  const { mutate: createUser, isLoading: isCreateLoading } = useUserCreate({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },

    onSuccess: () => {
      successNotification("Sucesso", "Usuário criado com sucesso!");
      navigate({ to: "/usuarios" });
    },
  });

  const { mutate: updateUser, isLoading: isUpdateLoading } = useUserUpdate({
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },

    onSuccess: () => {
      successNotification("Sucesso", "Usuário atualizado com sucesso!");
      useEditingUser.setState(form.values);
    },
  });

  const form = useForm<UserInput>({
    initialValues: {
      name: editingUser?.name ?? "",
      document: editingUser?.document ?? "",
      email: editingUser?.email ?? "",
      profile: editingUser?.profile ?? ("" as "DIRECTOR" | "TEACHER"),
    },
    validate: zodResolver(userInputValidation),
  });

  return (
    <>
      <Title title={editingUser ? editingUser.name : "Fulano de Tal"} />

      <form
        onSubmit={form.onSubmit((values) => {
          if (editingUser) {
            updateUser({ userId: editingUser.id, input: values });
          } else {
            createUser(values);
          }
        })}
      >
        <Grid columns={4}>
          <Grid.Col span={1}>
            <TextInput
              label="Nome"
              placeholder="Nome"
              {...form.getInputProps("name")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="CPF"
              placeholder="CPF"
              {...form.getInputProps("document")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <TextInput
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
          </Grid.Col>

          <Grid.Col span={1}>
            <Select
              data={PROFILE_SELECT}
              label="Perfil"
              placeholder="Selecione"
              {...form.getInputProps("profile")}
            />
          </Grid.Col>

          {/* --- Editing user inputs --- */}
          {editingUser && (
            <>
              <Grid.Col span={1}>
                <Select
                  data={STATUS_SELECT}
                  label="Status"
                  placeholder="Selecione"
                  value={editingUser?.status}
                  disabled
                />
              </Grid.Col>
              {editingUser.profile === "TEACHER" && (
                <Grid.Col span={2}>
                  <TextInput
                    label="Salas Associadas"
                    value="1º A - 2023, 1º B - 2023, 1º C - 2023"
                    disabled
                  />
                </Grid.Col>
              )}
              <Grid.Col span={1}>
                <div style={{ position: 'relative' }}>
                  <TextInput label="Código de Acesso" value="AHDE2874" disabled />
                  <IconRefresh
                    style={{ position: 'absolute', top: '50%', right: '3%', width: '20px' }} color={theme.colors.blue[9]}
                    onClick={() => { console.log('novo código de acesso! :D') }}
                  />
                </div>
              </Grid.Col>
            </>
          )}
        </Grid>
        <Group position="right" mt={30}>
          <Link to="/usuarios">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button
            type="submit"
            disabled={
              Object.values(form.values).includes("") || !form.isDirty()
            }
            loading={isUpdateLoading || isCreateLoading}
          >
            Salvar
          </Button>
        </Group>
      </form>
    </>
  );
}
