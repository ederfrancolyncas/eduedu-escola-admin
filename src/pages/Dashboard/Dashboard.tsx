import { useState } from "react";
import { Grid } from "@mantine/core";
import { CardDashboard, CardDashboardClass } from "~/components/Cards";

export function DashboardPage() {

  const [schoolReport, setSchoolReport] = useState({});
  const getReportData = (schoolReport: string) => {
    setSchoolReport(schoolReport);

    console.log('chegou no pai: ', schoolReport)
  };

  return (
    <>
      <CardDashboard getReportData={getReportData} />

      <Grid columns={4}>
        {schoolReport &&
          schoolReport.schoolGrades?.map((item) => (
            <Grid.Col span={1}>
              <CardDashboardClass schoolClassData={item} />
            </Grid.Col>
          ))
        }
      </Grid>
    </>
  );
}
