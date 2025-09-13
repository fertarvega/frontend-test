"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/Modal";
import GeneralFormUser from "./GeneralFormUser";
import inputStyles from "@/styles/inputs.module.scss";

export function CreateUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <GeneralFormUser type="create" />
      </Modal>
      <button
        onClick={() => setIsOpen(true)}
        className={`${inputStyles.btn} ${inputStyles["btn-success"]}`}
        style={{ display: "flex", alignItems: "center", gap: '8px' }}
      >
        Crear usuario{" "}
        <Image width={16} height={16} src="/add.svg" alt="Editar" />
      </button>
    </section>
  );
}
