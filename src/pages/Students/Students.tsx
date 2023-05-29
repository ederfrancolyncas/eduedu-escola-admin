import { Button } from "@mantine/core";
import { PageHeader } from "~/components/PageHeader";

export function StudentsPage() {
  return (
    <>
      <PageHeader title="Alunos">
        <Button>Upload aluno</Button>
        <Button>Novo aluno</Button>
      </PageHeader>

      {/* TODO: add table and pagination  */}
    </>
  );
}
