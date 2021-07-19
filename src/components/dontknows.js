import React from 'react'
import { Button, Card } from 'react-bootstrap';
import Styles from './cssmodules/all.module.css'


export default function Dontknows({handleCurrentPage}) {
    return (
        <div class={Styles.mainpage}>
        

        <Card className="text-center" style={{backgroundColor: `rgba(255,255,255,0.7) `}}>
<Card.Body style={{width:"40vw"}}>
<Card.Title>Nežinau CO2</Card.Title>
<div class={Styles.buttonsflex}>


</div>
</Card.Body>
<Button onClick={()=>handleCurrentPage("")} variant="success">Atgal</Button>
</Card>

    </div>
    )
}
