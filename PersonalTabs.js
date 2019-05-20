import React from 'react'
import './personaltabs.css'
import Scrape from '../scrape/scrape'
import Doctors from '../Doctors/Doctors'
import Medications from '../Medications/Medications'
import API from '../../utils/API'

function PersonalTabs (props) {
  if (props.scraperTab === "active") {
    return (
      <div>
        <Scrape scrape={props.scrape}/>
      </div>
    )
  }

  else if (props.doctorsTab === "active") {
    return (
      <div>
        <Doctors doctors={props.doctors}/>
      </div>
    )
  }

  else if (props.medicationsTab === "active") {
    return (
      <div>
        <Medications medications={props.medications}/>
      </div>
    )
  }
  
  else return (
    <div>

    </div>
  )
}





export default PersonalTabs