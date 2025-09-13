import styles from "@/styles/index.module.scss";
import { CreateUser } from "@/components/CreateUser";
import TableUsers from "@/components/TableUsers";

export default function Page() {
  return (
    <section>
      <CreateUser />
      <h1 className={styles.testscss}>Listado de usuarios</h1>
      <TableUsers />
    </section>
  );
}
