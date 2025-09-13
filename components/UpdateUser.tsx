"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import GeneralFormUser from "./GeneralFormUser";
import { IUser } from "@/interfaces/types";

export function UpdateUser({ data }: { data: IUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <GeneralFormUser type="update" dataToEdit={data} />
      </Modal>
      <button onClick={() => setIsOpen(true)}>Editar</button>
    </section>
  );
}
