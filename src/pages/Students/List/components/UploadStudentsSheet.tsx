import {
  Anchor,
  Button,
  Divider,
  FileInput,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { IconFileDownload, IconPaperclip } from "@tabler/icons-react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { sheetDownloadUrl, useSchoolClassGetAll, useUploadStudentsSheet } from "~/api/school-class";
import { errorNotification } from "~/utils/errorNotification";

type Props = {
  opened: boolean;
  onClose: () => void;
};

export function UploadStudentsSheet({ opened, onClose }: Props) {
  const { data: schoolClasses, isLoading: isLoadingSchoolClasses } = useSchoolClassGetAll({
    search: {
      "page-number": 1,
      "page-size": 999,
    },
  })

  const formUploadSheet = useForm({
    initialValues: {
      id: "",
      sheet: {},
    },
    validate: zodResolver(
      z.object({
        id: z
          .string()
          .min(1, { message: "Selecione uma turma" }),
        sheet: z.instanceof(File, { message: "Selecione um arquivo" })
      })
    ),
  });

  const { uploadSheet, isLoading } = useUploadStudentsSheet({
    onSuccess: onClose,
    onError: (error) => errorNotification("Erro durante a operação", error.message),
  });

  return (
    <Modal
      opened={opened}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={isLoading ? () => { } : onClose}
      title="Upload de Aluno"
    >
      <form
        onSubmit={formUploadSheet.onSubmit((values) => {
          uploadSheet(values);
        })}
      >
        <Stack spacing={5}>
          <Group>
            <Text size="sm">
              Para fazer upload de aluno em lote é necessário seguir o template
              de cadastro de aluno.
            </Text>
            <Group align="center">
              <Anchor c="blue.6" size="sm" href={sheetDownloadUrl()}>
                Fazer download do template &#32;
                <IconFileDownload size={rem(18)} />
              </Anchor>
            </Group>
          </Group>

          <Group>
            <Text size="sm">
              Selecione o arquivo do template de Cadastro de Aluno.
            </Text>

            <FileInput
              {...formUploadSheet.getInputProps("sheet")}
              style={{ width: "100%" }}
              placeholder="Selecione o arquivo"
              rightSection={<IconPaperclip size={rem(14)} />}
            />
          </Group>

          <Group>
            <Text size="sm">
              Selecione a turma que deseja adicionar os alunos do template.
            </Text>
            <Select
              {...formUploadSheet.getInputProps("id")}
              placeholder="Selecione a turma"
              disabled={isLoadingSchoolClasses}
              data={
                isLoadingSchoolClasses
                  ? []
                  : schoolClasses.items.map(({ name, id }) => ({
                    label: name.toString(),
                    value: id,
                  }))
              }
              style={{ width: "100%" }}
            />
          </Group>

          <Divider my="xl" />

          <Group position="right">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Não
            </Button>
            <Button type="submit">Sim</Button>
          </Group>

        </Stack>
      </form>
      <LoadingOverlay visible={isLoading} />
    </Modal>
  );
}
