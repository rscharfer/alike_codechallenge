import React from "react";

export default function NavigationBar({ onNavChange }) {
  return (
    <nav>
      <div>Applike FrontEnd Test</div>
      <ul className="navigationList">
        <li onClick={() => onNavChange("overview")}>Overview</li>
        <li onClick={() => onNavChange("campaigns")}>Campaigns</li>
        <li onClick={() => onNavChange("create")}>Create</li>
      </ul>
    </nav>
  );
}
