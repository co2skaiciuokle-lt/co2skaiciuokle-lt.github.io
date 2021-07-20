import React from 'react'

export default function Eurodropdown({handleEuroValue,knowseuro}) {
    return (
        <select  onChange={(e) => handleEuroValue(e.target.value)}  className="form-select" style={{marginTop:"1rem", width:200}}>
        <option value="">Pasirinkite {knowseuro==="yes"?"metus":"euro st."}</option>
        <option value="6">{knowseuro==="yes"? ">2015 m.": "Euro 6"}</option>
        <option value="5">{knowseuro==="yes"? "2014-2011": "Euro 5"}</option>
        <option value="4">{knowseuro==="yes"? "2010-2006": "Euro 4-3"}</option>
        <option value="2">{knowseuro==="yes"? "<2005 m.": "Euro 2-1"}</option>
      </select>
    )
}
