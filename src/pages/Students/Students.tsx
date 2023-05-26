import { Button } from "@mantine/core";
import { Title } from "../../components/Title/Title";

export function StudentsPage() {

  return (
    <>
      <Title title="Alunos">
        <Button>Upload aluno</Button>
        <Button>Novo aluno</Button>
      </Title>

      {/* TODO: add table and pagination  */}
    </>
  );
}
