import React from 'react'

export default function yearOfRegistrationDropdown({setRegistrationYearDiscount}) {
    return (
        <select className="form-select" style={{marginBottom:"2rem"}} onChange={(e) => setRegistrationYearDiscount(e.target.value)}>
        <option value={1}>Automobilio metai</option>
        <option value={0.5}>Automobilį įsigijau iki 2020 m. liepos 1 d</option>
        <option value={1}>Automobilį įsigijau po 2020 m. liepos 1 d.</option>
      </select>
    )
}
