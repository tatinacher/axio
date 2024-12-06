"use client";

import styles from "./page.module.css";
import { Calendar, TaskAddForm, TaskList } from "../features";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Calendar />
        <TaskAddForm />
        <TaskList
          list={[
            { value: "book a hotel", isChecked: true },
            { value: "make a dinner", isChecked: false },
          ]}
          handleToggle={() => {}}
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
