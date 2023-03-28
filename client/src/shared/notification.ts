import { notifications } from "@mantine/notifications";

export const showNotification = (
  type: "error" | "success",
  title: string,
  message?: string
) => {
  if (type === "error") {
    return notifications.show({
      title,
      message,
      color: "red",
    });
  }
  if (type === "success") {
    return notifications.show({
      title,
      message,
      color: "green",
    });
  }
};
