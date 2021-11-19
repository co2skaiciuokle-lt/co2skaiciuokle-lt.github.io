import React from 'react'
import {Table } from "react-bootstrap";

export default function feeTable({fee,perks}) {
     const checkdiscount = ()=> perks
       
    return (
        <Table striped bordered hover style={{borderColor:'black'}}>
        <thead>
          <tr>
            <th> </th>
            <th>Naudotojo mokestis, Eur</th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
            <td>2023 m.</td>
            <td>{fee.taxes===0? 0: (checkdiscount()*Math.round(fee.taxes.y2023yearsCoeff * 100)/100).toFixed(2)}</td>
            </tr>
            <tr>
            <td>2024 m.</td>
            <td>{fee.taxes===0? 0: (checkdiscount()*perks*Math.round(fee.taxes.y2024yearsCoeff * 100)/100).toFixed(2)}</td>
            </tr>
            <tr>
            <td>2025 m.</td>
            <td>{fee.taxes===0? 0: (checkdiscount()*Math.round(fee.taxes.y2025yearsCoeff * 100)/100).toFixed(2)}</td>
            </tr>
            <tr>
            <td>2026 m.</td>
            <td>{fee.taxes===0? 0: (checkdiscount()*perks*Math.round(fee.taxes.y2026yearsCost * 100)/100).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    )
}
