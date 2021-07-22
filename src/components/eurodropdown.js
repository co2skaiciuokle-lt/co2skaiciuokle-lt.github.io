import React from "react";

export default function EuroDropdown({ calculateEuro, knowsEuro }) {
  return (
    <select
      onChange={(e) => calculateEuro(e.target.value)}
      className="form-select"
      style={{ marginTop: "1rem" }}
    >
      {knowsEuro === "no" && <option value="show">metus</option>}
      {knowsEuro === "yes" && <option value="">Pasirinkite euro st.</option>}
      <option value="6">{knowsEuro === "no" ? "2015 ar naujesni gamybos metai" : "Euro 6"}</option>
      <option value="5">{knowsEuro === "no" ? "2014-2011" : "Euro 5"}</option>
      <option value="4">{knowsEuro === "no" ? "2010-2006" : "Euro 4-3"}</option>
      <option value="2">{knowsEuro === "no" ? "2005 ar senesni gamybos metai" : "Euro 2-1"}</option>
      {knowsEuro === "yes" && <option value="show">Nežinau</option>}
    </select>
  );
}
