import React, { useState,useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";
import Eurodropdown from "./eurodropdown";
import {calculateWithCO2} from "./functions/calculations"

export default function Knowsco2({ handleCurrentPage }) {
  const [checkboxvalue, setcheckboxvalue] = useState(null);
  const [knowseuro, setknowseuro] = useState("");
  const [euro, seteuro] = useState("");
  const [co2amount, setco2amount] = useState('')
  const [fee, setfee] = useState(0)

  useEffect(() => {
       
     if(co2amount && euro && checkboxvalue) 
     {          
    setfee(calculateWithCO2(parseInt(co2amount),parseInt(euro),checkboxvalue))

     }
     else
     {
        setfee(0)
     }

  }, [co2amount,euro,checkboxvalue])

  const handleAmount = (data) => {
        var regex = /^[0-9]*$/;
       if(regex.test(data))
       {
        setco2amount(data) 
       }
       else if (data==="") {
        setco2amount("")  
       }

        
     };
  const handleEuroValue = (data) => {
     seteuro(data) 
  };
  const handleKnowsEuroValue = (data) => {
          if(data!=="")
          {
        setknowseuro(data)
          } 
          else
          {
                setknowseuro(data)
                seteuro("") 
          }
     };
   

  const handleCheckboxValue = (data) => {
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

    if(Dyzelinas.checked)
    {
     setcheckboxvalue("diesel");
    }
    else if(((Elektra || Benzinas.checked) && (Etanolis.checked || Dujos.checked)) ||  (Etanolis.checked || Dujos.checked) )
    {
        setcheckboxvalue("gas");
    }
    else if(Benzinas.checked)
    {
        setcheckboxvalue("gasoline");
    }
    else {
        setcheckboxvalue(null);
    }
  };

  return (
    <div className={Styles.mainpage}>
      <Card
        className="text-center"
        style={{ backgroundColor: `rgba(255,255,255,0.7) ` }}
      >
        <Card.Body  className={Styles.cardwidth}>
          <Card.Title><h2>Žinau CO2</h2></Card.Title>
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
          <Form.Group style={{margin: "30px auto"}} className="mb-3">
    <input className="form-control" type="text" placeholder="CO2 išmetimo kiekis"  value={co2amount} onChange={(e)=>handleAmount(e.target.value)}/>
  </Form.Group>
  <hr style={{marginTop: "40px"}}/>
        <h4>Registravimo mokestis: {Math.round(fee)}</h4>
        <h4>Metinis mokestis: {Math.round(fee/4)}</h4>

        </Card.Body>
        <Button onClick={() => handleCurrentPage("")} variant="success">
          Atgal
        </Button>
      </Card>
    </div>
  );
}
