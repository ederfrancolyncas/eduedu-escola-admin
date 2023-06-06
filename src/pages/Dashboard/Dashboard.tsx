import { Grid } from "@mantine/core";
import { CardDashboard, CardDashboardClass } from "~/components/Cards";

export function DashboardPage() {
  return (
    <>
      <CardDashboard />

      <Grid columns={4}>
        <Grid.Col span={1}>
          <CardDashboardClass
            className="Infantil"
            classesQuantity="04"
            studentsQuantity="80"
            teachersQuantity="10"
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <CardDashboardClass
            className="1º Ano Fundamental 1"
            classesQuantity="06"
            studentsQuantity="100"
            teachersQuantity="15"
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <CardDashboardClass
            className="2º Ano Fundamental 1"
            classesQuantity="03"
            studentsQuantity="60"
            teachersQuantity="10"
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <CardDashboardClass
            className="3º Ano Fundamental 1"
            classesQuantity="04"
            studentsQuantity="80"
            teachersQuantity="10"
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
