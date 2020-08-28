import React from "react";
import LineGraph from "./LineGraph";

import styles from './Overview.module.css'

export default function Overview({ weeksData }) {
  return (
    <div className={styles.overviewWrapper}>
      <LineGraph yaxis="installs" data={weeksData.installData} />
      <LineGraph yaxis="revenue" data={weeksData.revenueData} />
    </div>
  );
}
