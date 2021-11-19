import React from "react";
import { Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";

export default function CheckBoxesPerks({ setPerks }) {
  const calculatePerks = (value) => {
    const Perks = [
      document.getElementById("64"),
      document.getElementById("familyCard"),
      document.getElementById("socialSupport"),
      document.getElementById("handicapped"),
    ];
    let count = 0;
    for (let i = 0; i < Perks.length; i++) {
      if (Perks[i].checked) {
        count++;
        Perks.map((p) => {
          if (p != Perks[i]) {
            p.disabled = true;
          }
        });
        break;
      } else {
        Perks.map((p) => {
          if (p != Perks[i]) {
            p.disabled = false;
          }
        });
      }
    }

    count === 1 ? setPerks(value) : setPerks(1);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.boxesalignperks}>
        <Form.Check
          inline
          label="Esu senjoras (64+ metai)."
          type="checkbox"
          onChange={() => calculatePerks(0.5)}
          id="64"
        />

        <Form.Check
          inline
          label="Šeimoje prižiūriu (slaugau) neįgalųjį asmenį ir turiu šeimos kortelę "
          type="checkbox"
          onChange={() => calculatePerks(0.5)}
          id="familyCard"
        />
        <Form.Check
          inline
          label="Gaunu pinginę socialinę paramą 
          Lietuvos Respublikos piniginės socialinės paramos nepasiturintiems gyventojams įstatymo nustatyta tvarka "
          type="checkbox"
          onChange={() => calculatePerks(0.5)}
          id="socialSupport"
        />
        <Form.Check
          inline
          label="Turiu neįgaliajam asmeniui pritaikytą transporto priemonę"
          type="checkbox"
          onChange={() => calculatePerks(0)}
          id="handicapped"
        />
      </div>
    </div>
  );
}
