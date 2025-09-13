"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
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
