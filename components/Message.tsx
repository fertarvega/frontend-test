import React from "react";
import styles from "@/styles/message.module.scss";

interface MessageProps {
  type: "success" | "danger" | "warning" | "primary";
  children: React.ReactNode;
}

export default function Message({ type, children }: MessageProps) {
  const colorClass = {
    success: styles["message-success"],
    danger: styles["message-danger"],
    warning: styles["message-warning"],
    primary: styles["message-primary"],
  }[type];

  return (
    <div className={`${styles.message} ${colorClass}`}>
      {children}
    </div>
  );
}
