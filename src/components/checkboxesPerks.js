import React from 'react'
import {Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";

export default function CheckBoxesPerks({setPerks}) {
    
  const calculatePerks= ()=>
  {
    const Perks = [document.getElementById("65"),document.getElementById("familyCard")]
    let count=0
    for(let i =0;i<Perks.length;i++)
    {
        if(Perks[i].checked)
        {
          count++
          break;
        }
      
    } 

    count===1?setPerks(0.5):setPerks(1)

  }


    return (
      <div className={Styles.container}>
        <div className={Styles.boxesalignperks}>
        <Form.Check
          inline
          label="Esu senjoras (65+ metai)."
          type="checkbox"
          onChange={() => calculatePerks()}
          id="65"
        />
        <Form.Check
          inline
          label="Turiu šeimos kortelę."
          type="checkbox"
          onChange={() => calculatePerks()}
          id="familyCard"
        />    
      </div>
      </div>
    )
}
