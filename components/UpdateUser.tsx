"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import GeneralFormUser from "./GeneralFormUser";
import { IUser } from "@/interfaces/types";
import inputStyles from "@/styles/inputs.module.scss";

export function UpdateUser({ data }: { data: IUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <GeneralFormUser type="update" dataToEdit={data} />
      </Modal>
      <button
        onClick={() => setIsOpen(true)}
        className={`${inputStyles.btn} ${inputStyles["btn-warning"]}`}
      >
        Editar
      </button>
    </section>
  );
}
