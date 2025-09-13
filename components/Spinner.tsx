import Image from "next/image";
import styles from "@/styles/spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles["spinner-center"]} aria-label="Cargando">
      <Image
        width={64}
        height={64}
        src="/spinner.svg"
        alt="Cargando..."
        className={styles["spinner-img"]}
      />
    </div>
  );
}
