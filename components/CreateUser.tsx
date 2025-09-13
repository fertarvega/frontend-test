"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import GeneralFormUser from "./GeneralFormUser";

export function CreateUser() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <GeneralFormUser type="create" />
      </Modal>
      <button onClick={() => setIsOpen(true)}>Crear usuario</button>
    </section>
  );
}
