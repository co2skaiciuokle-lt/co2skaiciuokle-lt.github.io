import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";
import Eurodropdown from "./eurodropdown";
import { calculatewithoutCO2 } from "./functions/calculations";
import CheckBoxes from "./checkBoxes";
import GearTypeDropdown from "./geartypedropdown";
import {FUEL_Types} from "./functions/constants"
import {SHOW_YEARS} from "./functions/constants"
import FeeTable from "./feeTable";
import CheckboxesPerks from "./checkboxesPerks";
import YearOfRegistrationDropdown from "./yearofregistrationdropdown";

export default function DontKnows({ handleCurrentPage }) {


  const [fuelType, setFuelType] = useState({ fuel: null, isElectric: false });
  const [knowsEuro, setKnowsEuro] = useState("");
  const [euro, setEuro] = useState("");
  const [fee, setFee] = useState({ taxes: 0, c02size: 0 });
  const [manual, setManual] = useState("");
  const [weight, setWeight] = useState("");
  const [kw, setKw] = useState("");
  const [perks, setPerks] = useState(1)
  const [registrationYearDiscount, setRegistrationYearDiscount] = useState("")
  const regex = /^[0-9]*$/;
  
  useEffect(() => {
    if (weight && euro && manual !== "" && registrationYearDiscount) {
      setFee(
        calculatewithoutCO2(
          parseInt(weight),
          parseInt(kw),
          parseInt(euro),
          fuelType,
          Boolean(parseInt(manual))
        )
      );
    } else if (weight && euro && fuelType.isElectric && registrationYearDiscount) {
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
  }, [weight, kw, euro, fuelType, manual,registrationYearDiscount]);

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
    const Ethanol = document.getElementById("Ethanol");
    const Electricity = document.getElementById("Electricity");
    const Diesel = document.getElementById("Diesel");
    const Gasoline = document.getElementById("Gasoline");
    const Gas = document.getElementById("Gas");
    

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
      if (Electricity.checked) {
        setFuelType({ fuel: FUEL_Types.DIESEL, isElectric: true });
        handleKw("");
        setManual("");
      } else {
        setFuelType({ fuel: FUEL_Types.DIESEL, isElectric: false });
        handleKw("");
      }
    } else if (
      ((Electricity.checked || Gasoline.checked) &&
        (Ethanol.checked || Gas.checked)) ||
      Ethanol.checked ||
      Gas.checked
    ) {
      if (Electricity.checked) {
        setFuelType({ fuel: FUEL_Types.GAS, isElectric: true });
        handleKw("");
        setManual("");
      } else {
        setFuelType({ fuel: FUEL_Types.GAS, isElectric: false });
      }
    } else if (Gasoline.checked) {
      if (Electricity.checked) {
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
          <p>Pasirinkite kuro rūšis :</p>
          <CheckBoxes handleFuelType={handleFuelType} />
          {fuelType.fuel !== null && (
            <div>
              <hr />
              <Form.Group className={Styles.carSpecalign}>
              <Form.Group className={Styles.alignkwandkg}>
              <div class="input-group input-group-sm mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nurodykite automobilio svorį"
                  value={weight}
                  onChange={(e) => handleWeight(e.target.value)}
                />
                <span class="input-group-text">KG</span>
                </div>
                </Form.Group>
                
                {!fuelType.isElectric &&
                  fuelType.fuel !== FUEL_Types.DIESEL && (
                    <Form.Group className={Styles.alignkwandkg}>
                       <div class="input-group input-group-sm mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Automobilio variklio galia"
                      value={kw}
                      onChange={(e) => handleKw(e.target.value)}
                    />
                    <span class="input-group-text">KW</span>
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
          <p>Pasirinkite automobilio Euro standartą :</p>
          <div className={Styles.inputsaligncenter}>
            <Eurodropdown calculateEuro={calculateEuro} knowsEuro={SHOW_YEARS.YES} />

            {knowsEuro === "no" && (
              <>
                <p className={Styles.askingYears}>
                  Pasirinkite automobilio pagaminimo metus :
                </p>
                <Eurodropdown
                  calculateEuro={calculateEuro1}
                  knowsEuro={knowsEuro}
                />
              </>
            )}
          </div>
          <p>Pasirinkite lengvatą :</p>
            <CheckboxesPerks setPerks={setPerks} />
            <p>Pasirinkite automobilio registravimo datą :</p>
            <div className={Styles.inputsaligncenter}>
            <YearOfRegistrationDropdown setRegistrationYearDiscount={setRegistrationYearDiscount}/>
            </div>
               
          <hr style={{ marginTop: "10px" }} />
          <h4>CO<sub>2</sub> kiekis: {(Math.round(fee.c02size * 100)/100).toFixed(2)}</h4>
          <hr style={{ marginTop: "20px" }} />
          <FeeTable fee={fee} perks={perks} registrationYearDiscount={registrationYearDiscount} />
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
