import React from 'react'
import {Table } from "react-bootstrap";

export default function feeTable({fee,perks,registrationYearDiscount}) {
     const checkdiscount = ()=> parseFloat(registrationYearDiscount)===0.5?registrationYearDiscount:perks
       
    return (
        <Table striped bordered hover style={{borderColor:'black'}}>
        <thead>
          <tr>
            <th> </th>
            <th>2023 m.</th>
            <th>2025 m.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Registracijos mokestis, Eur</td>
            <td>{fee.taxes===0? 0: (Math.round(fee.taxes.registrationCost * 100)/100).toFixed(2)}</td>
            <td>{fee.taxes===0? 0: (Math.round(fee.taxes.y2026registrationCost * 100)/100).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Naudotojo mokestis, Eur</td>
            <td>{fee.taxes===0? 0: (checkdiscount()*Math.round(fee.taxes.yearsCost * 100)/100).toFixed(2)}</td>
            <td>{fee.taxes===0? 0: (perks*Math.round(fee.taxes.y2026yearsCost * 100)/100).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    )
}
