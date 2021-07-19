import React,{useState} from 'react'
import { Button, Card,Form } from 'react-bootstrap';
import Styles from './cssmodules/all.module.css'

export default function Knowsco2({handleCurrentPage}) {
        const [checkboxvalue, setcheckboxvalue] = useState(null)

        const handleCheckboxValue = (data)=>{
           let Dyzelinas= document.getElementById("Dyzelinas")
           let Benzinas= document.getElementById("Benzinas")
           let Dujos= document.getElementById("Dujos")
           let Etanolis= document.getElementById("Etanolis")
           let Elektra= document.getElementById("Elektra")
           
           Dyzelinas.checked ? Benzinas.disabled=true :Benzinas.disabled=false
           Etanolis.checked || Benzinas.checked ? Dyzelinas.disabled=true :Dyzelinas.disabled=false
           Dujos.checked && Elektra.checked ? Dyzelinas.disabled=true :Dyzelinas.disabled=false
           Elektra.checked || Dyzelinas.checked || Elektra.checked? Etanolis.disabled=true :Etanolis.disabled=false
           Dyzelinas.checked && Elektra.checked? Dujos.disabled=true :Dujos.disabled=false
           Etanolis.checked || (Dyzelinas.checked && Dujos.checked)? Elektra.disabled=true :Elektra.disabled=false
          
           setcheckboxvalue()
        }


    return (
        <div class={Styles.mainpage}>
        <Card className="text-center" style={{backgroundColor: `rgba(255,255,255,0.7) `}}>
<Card.Body style={{width:"40vw"}}>
<Card.Title>Žinau CO2</Card.Title>
<div >
<Form.Check
        inline
        label="Dyzelinas"
        name="group1"
        type="checkbox"
        onChange={()=>handleCheckboxValue("")}
        id="Dyzelinas"
        />
<Form.Check
        inline
        label="Benzinas"
        name="group1"
        type="checkbox"
        onChange={()=>handleCheckboxValue("")}
        id="Benzinas"
        />
<Form.Check
        inline
        label="Dujos"
        name="group1"
        type="checkbox"
        onChange={()=>handleCheckboxValue("")}
        id="Dujos"
        />
<Form.Check
        inline
        label="Etanolis"
        name="group1"
        type="checkbox"
        onChange={()=>handleCheckboxValue("")}
        id="Etanolis"
        />
<Form.Check
        inline
        label="Elektra"
        name="group1"
        type="checkbox"
        onChange={()=>handleCheckboxValue("")}
        id="Elektra"
        />
 {console.log(checkboxvalue)}
</div>
</Card.Body>
<Button onClick={()=>handleCurrentPage("")} variant="success">Atgal</Button>
</Card>

    </div>
    )
}
