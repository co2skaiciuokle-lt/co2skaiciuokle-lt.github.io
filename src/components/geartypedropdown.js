import React from "react";

export default function gearTypeDropdown({setManual}) {
  return (
    <select className="form-select" onChange={(e) => setManual(e.target.value)}>
      <option value={""}>Pavarų dėžės tipas</option>
      <option value={1}>Mechaninė</option>
      <option value={0}>Automatinė</option>
    </select>
  );
}
