import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";

// TODO: validar icone, cores e mensagem

export const errorNotification = (message: string) =>
  showNotification({
    title: "Error",
    message,
    color: "red",
    icon: <IconAlertTriangle />,
  });
