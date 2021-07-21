import React from 'react'
import {Form } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";

export default function CheckBoxes({handleFuelType}) {
    return (
        <div className={Styles.boxesalign}>
        <Form.Check
          inline
          label="Dyzelinas"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Dyzelinas"
        />
        <Form.Check
          inline
          label="Benzinas"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Benzinas"
        />
        <Form.Check
          inline
          label="Dujos"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Dujos"
        />
        <Form.Check
          inline
          label="Etanolis"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Etanolis"
        />
        <Form.Check
          inline
          label="Elektra"
          type="checkbox"
          onChange={() => handleFuelType()}
          id="Elektra"
        />
      </div>
    )
}
