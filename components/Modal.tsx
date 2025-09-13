import { ReactNode } from "react";
import styles from "@/styles/modal.module.scss";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className={styles["modal-bg"]}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles["modal-close"]} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
