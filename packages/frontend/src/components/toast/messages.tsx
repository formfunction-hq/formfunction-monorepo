import { message as antdMessage } from "antd";
import { MessageInstance } from "antd/lib/message";
import styles from "css/toast/messages.module.css";

interface IMessageArgs {
  content: string;
  duration?: number;
  type?: keyof MessageInstance;
}

// eslint-disable-next-line import/prefer-default-export
export function message({
  content,
  duration = 3,
  type = "info",
}: IMessageArgs) {
  antdMessage[type]({
    className: styles.message,
    content,
    duration,
    // @ts-ignore
    type,
  });
}
