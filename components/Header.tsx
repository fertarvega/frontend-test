import React from "react";
import Image from "next/image";
import styles from "@/styles/header.module.scss";

export default function Header() {
  return (
    <header className={styles["header-banner"]}>
      <div className={styles["header-content"]}>
        <Image
          width={90}
          height={40}
          src="/logo_ba.png"
          alt="Logo"
          className={styles["header-logo"]}
        />
        <span className={styles["header-title"]}>
          Dashboard - Prueba técnica
        </span>
      </div>
    </header>
  );
}
