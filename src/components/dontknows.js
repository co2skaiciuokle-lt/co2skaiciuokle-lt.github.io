import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";
import Eurodropdown from "./eurodropdown";
import { calculatewithoutCO2 } from "./functions/calculations";
import CheckBoxes from "./checkBoxes";
import GearTypeDropdown from "./geartypedropdown";

export default function DontKnows({ handleCurrentPage }) {
  const FUEL_Types = {
    DIESEL: "diesel",
    GAS: "gas",
    GASOLINE: "gasoline",
  };

  const [fuelType, setFuelType] = useState({ fuel: null, isElectric: false });
  const [knowsEuro, setKnowsEuro] = useState("");
  const [euro, setEuro] = useState("");
  const [fee, setFee] = useState({ taxes: 0, c02size: 0 });
  const [manual, setManual] = useState("");
  const [weight, setWeight] = useState("");
  const [kw, setKw] = useState("");
  const regex = /^[0-9]*$/;
  
  useEffect(() => {
    if (weight && euro && manual !== "") {
      setFee(
        calculatewithoutCO2(
          parseInt(weight),
          parseInt(kw),
          parseInt(euro),
          fuelType,
          Boolean(parseInt(manual))
        )
      );
    } else if (weight && euro && fuelType.isElectric) {
      setFee(
        calculatewithoutCO2(
          parseInt(weight),
          parseInt(kw),
          parseInt(euro),
          fuelType,
          Boolean(parseInt(manual))
        )
      );
    } else {
      setFee({ taxes: 0, c02size: 0 });
    }
  }, [weight, kw, euro, fuelType, manual]);

  const handleWeight = (data) => {
    if (regex.test(data)) {
      setWeight(data);
    } else if (data === "") {
      setWeight("");
    }
  };

  const handleKw = (data) => {
    if (regex.test(data)) {
      setKw(data);
    } else if (data === "") {
      setKw("");
    }
  };

  const handleKnowsEuroValue = (data) => {
    if (data !== "") {
      console.log(data);
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
    let Etanolis = document.getElementById("Etanolis");
    let Elektra = document.getElementById("Elektra");
    let Dyzelinas = document.getElementById("Dyzelinas");
    let Benzinas = document.getElementById("Benzinas");
    let Dujos = document.getElementById("Dujos");

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
      if (Elektra.checked) {
        setFuelType({ fuel: FUEL_Types.DIESEL, isElectric: true });
        handleKw("");
        setManual("");
      } else {
        setFuelType({ fuel: FUEL_Types.DIESEL, isElectric: false });
        handleKw("");
      }
    } else if (
      ((Elektra.checked || Benzinas.checked) &&
        (Etanolis.checked || Dujos.checked)) ||
      Etanolis.checked ||
      Dujos.checked
    ) {
      if (Elektra.checked) {
        setFuelType({ fuel: FUEL_Types.GAS, isElectric: true });
        handleKw("");
        setManual("");
      } else {
        setFuelType({ fuel: FUEL_Types.GAS, isElectric: false });
      }
    } else if (Benzinas.checked) {
      if (Elektra.checked) {
        setFuelType({ fuel: FUEL_Types.GASOLINE, isElectric: true });
        handleKw("");
        setManual("");
      } else {
        setFuelType({ fuel: FUEL_Types.GASOLINE, isElectric: false });
      }
    } else {
      setFuelType({ fuel: null, isElectric: false });
    }

    if (fuelType === { fuel: null, isElectric: false }) {
      handleKw("");
      setManual("");
      handleWeight("");
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
            <h2>Taršos mokesčio skaičiuoklė nežinant CO<sub>2</sub></h2>
          </Card.Title>
          <hr />
          <p>Pasirinkite kuro rūšis:</p>
          <CheckBoxes handleFuelType={handleFuelType} />
          {fuelType.fuel !== null && (
            <div>
              <hr />
              <Form.Group className={Styles.carSpecalign}>
              <Form.Group className={Styles.alignco2}>
              <div class="input-group input-group-sm mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nurodykite automobilio svorį"
                  value={weight}
                  onChange={(e) => handleWeight(e.target.value)}
                />
                <span class="input-group-text">kg</span>
                </div>
                </Form.Group>
                
                {!fuelType.isElectric &&
                  fuelType.fuel !== FUEL_Types.DIESEL && (
                    <Form.Group className={Styles.alignco2}>
                       <div class="input-group input-group-sm mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Automobilio variklio galia"
                      value={kw}
                      onChange={(e) => handleKw(e.target.value)}
                    />
                    <span class="input-group-text">kW</span>
                    </div>
                    </Form.Group>
                  )}
                {!fuelType.isElectric && (
                  <GearTypeDropdown setManual={setManual} />
                )}
              </Form.Group>
            </div>
          )}
          <hr />
          <p>Pasirinkite automobilio Euro standartą</p>
          <div className={Styles.inputsaligncenter}>
            <Eurodropdown calculateEuro={calculateEuro} knowsEuro={"yes"} />

            {knowsEuro === "no" && (
              <>
                <p className={Styles.askingYears}>
                  Pasirinkite automobilio pagaminimo metus
                </p>
                <Eurodropdown
                  calculateEuro={calculateEuro1}
                  knowsEuro={knowsEuro}
                />
              </>
            )}
          </div>

          <hr style={{ marginTop: "10px" }} />
          <h4>CO<sub>2</sub> kiekis: {(Math.round(fee.c02size * 100)/100).toFixed(2)}</h4>
          <hr style={{ marginTop: "20px" }} />
          
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
