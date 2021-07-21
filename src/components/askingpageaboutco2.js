import React from "react";
import { Button, Card } from "react-bootstrap";
import Styles from "./cssmodules/all.module.css";

export default function AskingPageAboutCO2({ handleCurrentPage }) {
  return (
    <div className={Styles.mainpage}>
      <Card
        className="text-center"
        style={{ backgroundColor: `rgba(255,255,255,0.7)` }}
      >
        <Card.Body className={Styles.cardwidth}>
          <Card.Title>Registracijos mokesčio skaičiuoklė</Card.Title>
          <div className={Styles.buttonsflex}>
            <Button onClick={() => handleCurrentPage("no")} variant="success">
              Nežinau automobilio CO2
            </Button>
            <Button onClick={() => handleCurrentPage("yes")} variant="success">
              Žinau automobilio CO2
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
