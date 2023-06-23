// General:
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATH } from "~/constants/path";
import { successNotification } from "~/utils/successNotification";
import { errorNotification } from "~/utils/errorNotification";

// Validation:
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";

// API:
import { useUserTeacherGetAll } from "~/api/user";
import { useSchoolYearGetAll } from "~/api/school-year";
import { SchoolClassInput, useGetSchoolClass, useSchoolClassCreate, useSchoolClassUpdate } from "~/api/school-class";

// Components:
import { PageHeader } from "~/components/PageHeader";
import { HorizontalRule } from "~/components/HorizontalRule";
import { Button, Grid, Group, MultiSelect, Select, TextInput } from "@mantine/core";

export function FormPage() {
  const navigate = useNavigate();

  const schoolClassId = useParams().id
  if (schoolClassId) { useGetSchoolClass(schoolClassId) }
  const editingSchoolClass = undefined

  const schoolClassInputValidation = z.object({
    name: z
      .string()
      .min(1, { message: "Nome deve ter no mínimo 1 caracteres" }),
    schoolGrade: z
      .string()
      .min(1, { message: "Selecione uma turma" }),
    schoolPeriod: z
      .string()
      .min(1, { message: "Selecione um período" }),
    schoolYearId: z
      .string()
      .min(1, { message: "Selecione 1 ano letivo" }),
    teacherIds: z
      .string()
      .array()
      .min(1, { message: "Selecione no mínimo 1 professor" }),
  });
  const form = useForm<SchoolClassInput>({
    initialValues: {
      name: editingSchoolClass?.name ?? "",
      schoolGrade: editingSchoolClass?.schoolGrade ?? "",
      schoolPeriod: editingSchoolClass?.schoolPeriod ?? "",
      schoolYearId: editingSchoolClass?.schoolYearId ?? "",
      teacherIds: editingSchoolClass?.teacherIds ?? []
    },
    validate: zodResolver(schoolClassInputValidation),
  });

  // Get data:
  const { data, isLoading: fetching } = useSchoolYearGetAll();
  const schoolYears = data ?? [];

  const schoolGrade = [
    {
      value: '1ª série',
      label: '1ª série'
    }
  ]

  const schoolPeriod = [
    {
      value: 'manhã',
      label: 'manhã'
    }
  ]

  const { data: dataTeachers, isLoading: featching } = useUserTeacherGetAll()
  const teachers = dataTeachers?.items ?? [];

  // CRUD:
  const { mutate: getSchoolClass, isLoading: isGetLoading } = useGetSchoolClass({
    onSuccess: () => {
      // TODO: resolve error of maximum update depth exceeded
      // editingSchoolClass = data
    },
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
  });
  const { mutate: createSchoolClass, isLoading: isCreateLoading } = useSchoolClassCreate({
    onSuccess: () => {
      successNotification("Sucesso", "Turma criada com sucesso!");
      navigate(PATH.CLASSES)
    },
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`);
    },
  });
  const { mutate: updateSchoolClass, isLoading: isUpdateLoading } = useSchoolClassUpdate({
    onSuccess: () => {
      successNotification("Sucesso", "Turma editada com sucesso!")
    },
    onError: (error) => {
      errorNotification("Erro", `${error.message} (cod: ${error.code})`)
    }
  })

  return (
    <>
      <PageHeader title={editingSchoolClass ? editingSchoolClass.name : "Nova Turma"}>
        <Link to={PATH.CLASSES}>Retornar a página de turmas</Link>
      </PageHeader>

      <form onSubmit={form.onSubmit((values) => {
        editingSchoolClass ?
          updateSchoolClass({ schoolClassId: editingSchoolClass.id, input: values })
          :
          createSchoolClass(values)
      })}>
        <Grid columns={5}>
          <Grid.Col span={1}>
            <TextInput
              label="Nome"
              placeholder="Digite aqui"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Select
              label="Ano Letivo"
              placeholder="Selecione"
              data={schoolYears.map((obj) => {
                return {
                  label: obj.name,
                  value: obj.id
                }
              })}
              nothingFound="Nada encontrado"
              {...form.getInputProps("schoolYearId")}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Select
              label="Série"
              placeholder="Selecione"
              data={schoolGrade}
              nothingFound="Nada encontrado"
              {...form.getInputProps("schoolGrade")}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Select
              label="Período"
              placeholder="Selecione"
              data={schoolPeriod}
              nothingFound="Nada encontrado"
              {...form.getInputProps("schoolPeriod")}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <MultiSelect
              label="Professor(es)"
              placeholder="Selecione"
              searchable
              nothingFound="Nada encontrado"
              data={teachers.map((obj) => {
                return {
                  label: obj.name,
                  value: obj.id
                }
              })}
              {...form.getInputProps("teacherIds")}
            />
          </Grid.Col>
        </Grid>
        <HorizontalRule />
        <Group position="right">
          <Button variant="outline">Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </Group>
      </form>
    </>
  );
}
