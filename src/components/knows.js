import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";
import Eurodropdown from "./eurodropdown";
import { calculateWithCO2 } from "./functions/calculations";
import CheckBoxes from "./checkBoxes";

export default function Knows({ handleCurrentPage }) {
  const FUEL_Types = {
    DIESEL: "diesel",
    GAS: "gas",
    GASOLINE: "gasoline",
  };

  const [fuelType, setFuelType] = useState({ fuel: null });
  const [knowsEuro, setKnowsEuro] = useState("");
  const [euro, setEuro] = useState("");
  const [co2Amount, setCo2Amount] = useState("");
  const [fee, setFee] = useState({taxes:0});

  useEffect(() => {
    if (co2Amount && euro && fuelType) {
      setFee(calculateWithCO2(parseInt(co2Amount), parseInt(euro), fuelType));
    } else {
      setFee({taxes:0});
    }
  }, [co2Amount, euro, fuelType]);

  const handleAmount = (data) => {
    const regex = /^[0-9]*$/;
    if (regex.test(data)) {
      setCo2Amount(data);
    } else if (data === "") {
      setCo2Amount("");
    }
  };

  const handleKnowsEuroValue = (data) => {
    if (data !== "") {
      setKnowsEuro(data);
    } else {
      setKnowsEuro(data);
      setEuro("");
    }
  };
  const calculateEuro = (data) => {
    if (data === "show") {
      handleKnowsEuroValue("no");
      setEuro("");
    } else {
      setEuro(data);
      if (knowsEuro === "no") {
        handleKnowsEuroValue("yes");
      }
    }
  };

  const calculateEuro1 = (data) => {
    if (data === "show") {
      setEuro("");
    } else {
      setEuro(data);
    }
  };

  const handleFuelType = () => {
    let Dyzelinas = document.getElementById("Dyzelinas");
    let Benzinas = document.getElementById("Benzinas");
    let Dujos = document.getElementById("Dujos");
    let Etanolis = document.getElementById("Etanolis");
    let Elektra = document.getElementById("Elektra");

    Dyzelinas.checked
      ? (Benzinas.disabled = true)
      : (Benzinas.disabled = false);
    (Dujos.checked && Elektra.checked) || Etanolis.checked || Benzinas.checked
      ? (Dyzelinas.disabled = true)
      : (Dyzelinas.disabled = false);
    Elektra.checked || Dyzelinas.checked || Elektra.checked
      ? (Etanolis.disabled = true)
      : (Etanolis.disabled = false);
    Dyzelinas.checked && Elektra.checked
      ? (Dujos.disabled = true)
      : (Dujos.disabled = false);
    Etanolis.checked || (Dyzelinas.checked && Dujos.checked)
      ? (Elektra.disabled = true)
      : (Elektra.disabled = false);

    if (Dyzelinas.checked) {
      setFuelType({ fuel: FUEL_Types.DIESEL });
    } else if (
      ((Elektra || Benzinas.checked) && (Etanolis.checked || Dujos.checked)) ||
      Etanolis.checked ||
      Dujos.checked
    ) {
      setFuelType({ fuel: FUEL_Types.GAS });
    } else if (Benzinas.checked) {
      setFuelType({ fuel: FUEL_Types.GASOLINE });
    } else {
      setFuelType({ fuel: null });
    }
  };

  return (
    <div>
    <div className={Styles.mainpage}>
      <Card
        className="text-center"
        style={{ backgroundColor: `rgba(255,255,255,0.7) ` }}
      >
        <Card.Body className={Styles.cardwidth}>
          <Card.Title>
            <h2>Taršos mokečio skaičiuoklė žinant CO<sub>2</sub></h2>
          </Card.Title>
          <hr />
          <p>Pasirinkite kuro rūšis :</p>
         
          <CheckBoxes handleFuelType={handleFuelType} />
          <hr />
          <p>Pasirinkite Euro standartą ir  įveskite CO<sub>2</sub></p>
          <div className={Styles.inputsaligncenter}>
            <Eurodropdown calculateEuro={calculateEuro} knowsEuro={"yes"} />

            {knowsEuro === "no" && (
              <>
                <p className={Styles.askingYears}>
                Pasirinkite mašinos pagaminimo metus
                </p>
                <Eurodropdown
                  calculateEuro={calculateEuro1}
                  knowsEuro={knowsEuro}
                />
              </>
            )}
          </div>
          <Form.Group className={Styles.alignco2}>
          <div class="input-group input-group-sm mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="CO2 išmetimo kiekis "
              value={co2Amount}
              onChange={(e) => handleAmount(e.target.value)}
            />
            <span class="input-group-text">g/km</span>
            </div>
          </Form.Group>
          <hr style={{ marginTop: "40px" }} />
          <h4>Registravimo mokestis: {fee.taxes===0? 0: (Math.round(fee.taxes.registrationCost * 100)/100).toFixed(2)}</h4>
          <h4>Metinis mokestis: {fee.taxes===0? 0: (Math.round(fee.taxes.yearsCost * 100)/100).toFixed(2)}</h4>
          
        </Card.Body>
        <Button onClick={() => handleCurrentPage("")} variant="success">
          Atgal
        </Button>
      </Card>
     
      </div>
      <div className='bottomPadding'> ‎</div>
    </div>
  );
}
