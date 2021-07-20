import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";
import Eurodropdown from "./eurodropdown";
import { calculatewithoutCO2 } from "./functions/calculations";

export default function Dontknows({ handleCurrentPage }) {
  const [checkboxvalue, setcheckboxvalue] = useState(null);
  const [knowseuro, setknowseuro] = useState("");
  const [euro, seteuro] = useState("");
  const [fee, setfee] = useState({taxes:0,c02size:0});
  const [manual, setmanual] = useState("");
  const [weight, setweight] = useState("");
  const [kw, setkw] = useState("");
  const [electric, setelectric] = useState(false);
  useEffect(() => {

    if(weight && euro && (checkboxvalue==='gasoline' || checkboxvalue==='diesel' || checkboxvalue==='gas') && manual!=="")
    {
        setfee(
        calculatewithoutCO2(parseInt(weight),parseInt(kw), parseInt(euro), checkboxvalue,manual==1,electric==true)
        );
    }
    else if (weight && euro && checkboxvalue,electric) {
      setfee(
    calculatewithoutCO2(parseInt(weight),parseInt(kw), parseInt(euro), checkboxvalue,manual==1,electric==true)
      );
    } else {
      setfee({taxes:0,c02size:0});
    }
  }, [weight,kw, euro, checkboxvalue,manual,electric]);

  const handletype = (data) => {
    setmanual(data)
  };

  const handleweight = (data) => {
    var regex = /^[0-9]*$/;
    if (regex.test(data)) {
      setweight(data);
    } else if (data === "") {
      setweight("");
    }
  };

  const handlekw = (data) => {
    var regex = /^[0-9]*$/;
    if (regex.test(data)) {
      setkw(data);
    } else if (data === "") {
      setkw("");
    }
  };


  const handleEuroValue = (data) => {
    seteuro(data);
  };
  const handleKnowsEuroValue = (data) => {
    if (data !== "") {
      setknowseuro(data);
    } else {
      setknowseuro(data);
      seteuro("");
    }
  };

  const eOrd = () => {

    if (electric) return false; 
    if (checkboxvalue !== "diesel") return true;
     
    
  };

   
    

  const handleCheckboxValue = (data) => {
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

    if (Elektra.checked) {
      setelectric(true);
      handlekw("")
      setmanual("")
     
    } else {
      setelectric(false);
    }

    if (Dyzelinas.checked) {
      setcheckboxvalue("diesel");
      handlekw("")
    } else if (
      ((Elektra || Benzinas.checked) && (Etanolis.checked || Dujos.checked)) ||
      Etanolis.checked ||
      Dujos.checked
    ) {
      setcheckboxvalue("gas");
    } else if (Benzinas.checked) {
      setcheckboxvalue("gasoline");
    } else {
      setcheckboxvalue(null);
    }

    if(checkboxvalue==null){
        handlekw("")
        setmanual("")
        handleweight("")
    }
  };

  return (
    <div className={Styles.mainpage}>
      <Card
        className="text-center"
        style={{ backgroundColor: `rgba(255,255,255,0.7) ` }}
      >
        <Card.Body className={Styles.cardwidth}>
          <Card.Title><h2>Nežinau CO2</h2></Card.Title>
          <p>Pasirinkite kuro tipą:</p>
          <hr />
          <div className={Styles.boxesalign}>
            <Form.Check
              inline
              label="Dyzelinas"
              name="group1"
              type="checkbox"
              onChange={() => handleCheckboxValue("")}
              id="Dyzelinas"
            />
            <Form.Check
              inline
              label="Benzinas"
              name="group1"
              type="checkbox"
              onChange={() => handleCheckboxValue("")}
              id="Benzinas"
            />
            <Form.Check
              inline
              label="Dujos"
              name="group1"
              type="checkbox"
              onChange={() => handleCheckboxValue("")}
              id="Dujos"
            />
            <Form.Check
              inline
              label="Etanolis"
              name="group1"
              type="checkbox"
              onChange={() => handleCheckboxValue("")}
              id="Etanolis"
            />
            <Form.Check
              inline
              label="Elektra"
              name="group1"
              type="checkbox"
              onChange={() => handleCheckboxValue("")}
              id="Elektra"
            />
          </div>
          
{  (checkboxvalue || electric ) &&  ( 
    <div><hr />
    <Form.Group className={Styles.uninputs}>
    
            <input
              className="form-control"
              type="text"
              placeholder="Svoris"
              value={weight}
              onChange={(e) => handleweight(e.target.value)}
            />
            {eOrd() && (
              <input
                className="form-control"
                type="text"
                placeholder="kw"
                value={kw}
                onChange={(e) => handlekw(e.target.value)}
              />

            )}
            {!electric && (
              <select
                className="form-select"
                onChange={(e) => handletype(e.target.value)}
              >
                <option value={""}>Pavarų dėžės tipas</option>
                <option value={1}>Mechaninė</option>
                <option value={0}>Automatinė</option>
              </select>
            )}
          </Form.Group>
          </div>)}
          <hr />
          <p>Žinote tikrinamos mašinos euro standartą?</p>
          <div className={Styles.boxesaligncenter}>
            <select
              className="form-select"
              value={knowseuro}
              onChange={(e) => handleKnowsEuroValue(e.target.value)}
            >
              <option value="">Pasirinkite</option>
              <option value="yes">Ne</option>
              <option value="no">Taip</option>
            </select>
            {knowseuro !== "" && (
              <Eurodropdown
                handleEuroValue={handleEuroValue}
                knowseuro={knowseuro}
              />
            )}
          </div>
          
          <hr style={{ marginTop: "10px" }} />
          <h4>CO2 kiekis: {Math.round(fee.c02size)}</h4>
          <hr style={{ marginTop: "20px" }} />
          <h4>Registravimo mokestis: {Math.round(fee.taxes)}</h4>
          <h4>Metinis mokestis: {Math.round(fee.taxes / 4)}</h4>
        </Card.Body>
        <Button onClick={() => handleCurrentPage("")} variant="success">
          Atgal
        </Button>
      </Card>
    </div>
  );
}
