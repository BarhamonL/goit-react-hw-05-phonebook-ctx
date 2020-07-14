import React from "react";
import ContactFormManager from "../ContactFormManager";
import styles from "./App.module.css";

export default (App) => {
  return (
    <div className={styles.container}>
      <h1>goit-react-hw-05-phonebook-ctx</h1>
      <ContactFormManager />
    </div>
  );
};
