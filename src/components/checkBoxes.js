import React from 'react'
import {Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";

export default function CheckBoxes({handleFuelType}) {
    return (
      <div className={Styles.container}>
        <div className={Styles.boxesalign}>
        <Form.Check
          inline
          label="Dyzelinas"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Diesel"
        />
        <Form.Check
          inline
          label="Benzinas"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Gasoline"
        />
        <Form.Check
          inline
          label="Dujos"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Gas"
        />
        <Form.Check
          inline
          label="Etanolis"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Ethanol"
        />
        <Form.Check
          inline
          label="Elektra"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Electricity"
        />
      </div>
      </div>
    )
}
