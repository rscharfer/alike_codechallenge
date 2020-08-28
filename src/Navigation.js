import React from "react";

import styles from "./navigation.module.css";

export default function NavigationBar({ onNavChange }) {
  return (
    <nav className={styles.navClass}>
      <div>Applike FrontEnd Test</div>
      <ul className={styles.navigationList}>
        <li onClick={() => onNavChange("overview")}>Overview</li>
        <li onClick={() => onNavChange("campaigns")}>Campaigns</li>
        <li onClick={() => onNavChange("create")}>Create</li>
      </ul>
    </nav>
  );
}
