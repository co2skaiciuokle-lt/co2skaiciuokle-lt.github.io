import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";
import Eurodropdown from "./eurodropdown";
import { calculateWithCO2 } from "./functions/calculations";
import CheckBoxes from "./checkBoxes";
import { FUEL_Types } from "./functions/constants"
import { SHOW_YEARS } from "./functions/constants"
import FeeTable from "./feeTable";
import CheckboxesPerks from "./checkboxesPerks";


export default function Knows({ handleCurrentPage }) {
  const [fuelType, setFuelType] = useState({ fuel: null });
  const [knowsEuro, setKnowsEuro] = useState("");
  const [euro, setEuro] = useState("");
  const [co2Amount, setCo2Amount] = useState("");
  const [fee, setFee] = useState({ taxes: 0 });
  const [perks, setPerks] = useState(1)

  useEffect(() => {
    if (co2Amount && euro && fuelType ) {
      setFee(calculateWithCO2(parseInt(co2Amount), parseInt(euro), fuelType));
    } else {
      setFee({ taxes: 0 });
    }
  }, [co2Amount, euro, fuelType]);

  const handleAmount = (data) => {
    const regex = /^[0-9]*$/;
    if (regex.test(data)) {
       data<10000000?setCo2Amount(data):setCo2Amount(10000000)

      
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
    if (data === SHOW_YEARS.SHOW) {
      handleKnowsEuroValue(SHOW_YEARS.NO);
      setEuro("");
    } else {
      setEuro(data);
      if (knowsEuro === SHOW_YEARS.NO) {
        handleKnowsEuroValue(SHOW_YEARS.YES);
      }
    }
  };

  const calculateEuro1 = (data) => {
    if (data === SHOW_YEARS.SHOW) {
      setEuro("");
    } else {
      setEuro(data);
    }
  };

  const handleFuelType = () => {
    const Diesel = document.getElementById("Diesel");
    const Gasoline = document.getElementById("Gasoline");
    const Gas = document.getElementById("Gas");
    const Ethanol = document.getElementById("Ethanol");
    const Electricity = document.getElementById("Electricity");

    Diesel.checked
      ? (Gasoline.disabled = true)
      : (Gasoline.disabled = false);
    (Gas.checked && Electricity.checked) || Ethanol.checked || Gasoline.checked
      ? (Diesel.disabled = true)
      : (Diesel.disabled = false);
    Electricity.checked || Diesel.checked || Electricity.checked
      ? (Ethanol.disabled = true)
      : (Ethanol.disabled = false);
    Diesel.checked && Electricity.checked
      ? (Gas.disabled = true)
      : (Gas.disabled = false);
    Ethanol.checked || (Diesel.checked && Gas.checked)
      ? (Electricity.disabled = true)
      : (Electricity.disabled = false);

    if (Diesel.checked) {
      setFuelType({ fuel: FUEL_Types.DIESEL });
    } else if (
      ((Electricity || Gasoline.checked) && (Ethanol.checked || Gas.checked)) ||
      Ethanol.checked ||
      Gas.checked
    ) {
      setFuelType({ fuel: FUEL_Types.GAS });
    } else if (Gasoline.checked) {
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
              <h2>Taršos mokesčio skaičiuoklė žinant CO<sub>2</sub></h2>
            </Card.Title>
            <hr />
            <p><b>Pasirinkite kuro rūšis :</b></p>

            <CheckBoxes handleFuelType={handleFuelType} />
            <hr />
            <p><b>Pasirinkite Euro standartą ir  įveskite CO<sub>2</sub> :</b></p>
            <div className={Styles.inputsaligncenter}>
              <Eurodropdown calculateEuro={calculateEuro} knowsEuro={SHOW_YEARS.YES} />

              {knowsEuro === "no" && (
                <>
                  <p className={Styles.askingYears}>
                   <b> Pasirinkite automobilio pagaminimo metus :</b>
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
                  placeholder="CO2 išmetimo kiekis. "
                  value={co2Amount}
                  onChange={(e) => handleAmount(e.target.value)}
                />
                <span class="input-group-text">g/km</span>
              </div>
            </Form.Group>
          
            <p><b>Pasirinkite lengvatą :</b></p>
            <CheckboxesPerks setPerks={setPerks} />
          
               
            <FeeTable fee={fee} perks={perks}  />

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
