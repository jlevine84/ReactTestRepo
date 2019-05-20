import React from 'react'
import './dashboard.css'
import Calendar from '../../components/Calendar/Calendar'
import ViewUserData from '../../components/ViewUserData/ViewUserData';
import BarChart from '../../components/Charts/BarChart.js'
import PieChart from '../../components/Charts/PieChart.js'
import LineChart from '../../components/Charts/LineChart.js'
import API from '../../utils/API';
import moment from 'moment'
import DateRangeSearch from '../../components/RangeSearch/RangeSearch'
import PersonalTabs from '../../components/PersonalTabs/PersonalTabs'


class Dashboard extends React.Component {

  state = {
    selectedDate: moment().format('YYYYMMDD'),
    Mood: "",
    Anxiety: "",
    Energy: "",
    MedicineTaken: "",
    Exercise: "",
    SleepHours: "",
    DailyLog: "",
    ExerciseAmount: "",
    Showered: "",
    Date: "",
    Logged: null,
    dbreturn:{},
    currentDate: moment().format('YYYYMMDD'),
    doctors: [],
    medications: [],
    scrape: [],
    scraperTab: "active",
    doctorsTab: "",
    medicationsTab: ""
  }

  componentDidMount() {
    this.viewByDate();
    this.pullAll()
    this.getDoctors()
    this.getMedications()
    this.scrape()
  }

  grabCalendarDate = (grabYear, grabDay, grabMonth) => {
    let date = `${grabYear}${grabMonth}${grabDay}`
    this.setState({ selectedDate: date })
    this.viewByDate()
  }

  pullAll = () => {
    API.getAll()
    .then(response =>{
        this.setState({dbreturn: response.data.allLogs})
    })
  }

  viewByDate = async () => {
    API.getByDate(this.state.selectedDate)
    .then( async response => {
      if (response.data.todaysentry[0]) {
        await this.setState({
            Mood: response.data.todaysentry[0].Mood,
            Anxiety: response.data.todaysentry[0].Anxiety,
            Energy: response.data.todaysentry[0].Energy,
            MedicineTaken: response.data.todaysentry[0].MedicineTaken,
            Exercise: response.data.todaysentry[0].Exercise,
            SleepHours: response.data.todaysentry[0].SleepHours,
            Showered: response.data.todaysentry[0].Showered,
            DailyLog: response.data.todaysentry[0].DailyLog,
            ExerciseAmount: response.data.todaysentry[0].ExerciseAmount,
            Date: moment(response.data.todaysentry[0].Date, 'YYYYMMDD').format('MMMM Do YYYY'),
            Logged: true
        })
      } else {
        await this.setState({ 
          Mood: "",
          Anxiety: "",
          Energy: "",
          MedicineTaken: "",
          Exercise: "",
          Showered: "",
          SleepHours: "",
          DailyLog: "",
          ExerciseAmount: "",
          Date: ""
        })
      }
    }).catch(err => console.log(err))

  }

  prevEntryCallBack = () => {
    this.viewByDate()
    this.pullAll()
  } 

  // Stuff for Jeffy to Dooz
  // If the exercise button is false or unselected; Don't render the Exercise.
  // Default Sleep Hours
  viewDateRange = (startDate, endDate) => {
    API.getRange(startDate, endDate)
      .then(async response => {
        await this.setState({ dbreturn: response.data.rangeData})
      }).catch(err => console.log(err))

  }

  getDoctors = () => {
    // API call to get all Dr Info and use as callback
    API.getDoctors().then(async response => {
      await this.setState({ doctors: response.data.allDoctors })
    }).catch(err => console.log(err))
  }

  getMedications = () => {
    // API call to get all meds and use as callback
    API.getMedications().then(async response => {
      await this.setState({ medications: response.data.allMedications })
    }).catch(err => console.log(err))
  }

  scrape = () => {
    API.scrape().then(async response => {
      await this.setState({
        scrape: response.data
      })
    }).catch(err => console.log(err))
  }

  toggleSwitch = event => {
    event.preventDefault()
    let name = event.target.name
    switch (name) {
      case "scraper":
        this.setState({ scraperTab: "active", doctorsTab: "", medicationsTab: "" })
        break
      case "doctors":
        this.setState({ scraperTab: "", doctorsTab: "active", medicationsTab: "" })
        break
      case "medications":
        this.setState({ scraperTab: "", doctorsTab: "", medicationsTab: "active" })
        break
      default:
        this.setState({ scraperTab: "active", doctorsTab: "", medicationsTab: "" })
    }
  }

  render() {
    return (
      <div className="container-fluid dash-body">
        <div className="container-fluid container-top">
          <div className="row row-top">
            <div className="col-6 charts">
            {/* <BarChart
                dbreturn={this.state.dbreturn}
              /> */}
              <LineChart
                dbreturn={this.state.dbreturn}
              />
               <PieChart
                dbreturn={this.state.dbreturn}
              />
            </div>
            <div className="col-6 calendar">
              <Calendar grabCalendarDate={this.grabCalendarDate}/>
              {/* Search Range Component */}
              <DateRangeSearch 
                viewDateRange={this.viewDateRange}
                currentDate={this.state.currentDate}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid container-bottom">
          <div className="row row-bottom">
            {/* <div className="col"></div> */}
            <div className="col-6">
              {(this.state.selectedDate > this.state.currentDate) ? <h5>You can not enter an Entry for a future date</h5> :
              <ViewUserData  
                
                selectedDate={this.state.selectedDate}
                mood={this.state.Mood}
                anxiety={this.state.Anxiety}
                energy={this.state.Energy}
                medicineTaken={this.state.MedicineTaken.toString()}
                exercise={this.state.Exercise.toString()}
                sleepHours={this.state.SleepHours}
                dailyLog={this.state.DailyLog}
                exerciseAmount={this.state.ExerciseAmount}
                showered={this.state.Showered.toString()}
                date={this.state.Date}
                logged={this.state.Logged}
                prevEntryCallBack={this.prevEntryCallBack}
                selectedDate={this.state.selectedDate}
                userID={this.props.userID}
              />}
            </div>
            <div className="col-5">
              <div className="jumbotron personaltabs">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button className={`nav-link ${this.state.scraperTab}`} name={"scraper"} onClick={this.toggleSwitch}>Articles</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link ${this.state.doctorsTab}`} name={"doctors"} onClick={this.toggleSwitch}>My Doctors</button>
                  </li>
                  <li className="nav-item">
                    <button className={`nav-link ${this.state.medicationsTab}`} name={"medications"} onClick={this.toggleSwitch}>My Meds</button>
                  </li>
                </ul>
                <br/>
                <PersonalTabs 
                  userID={this.props.userID}
                  scrape={this.state.scrape}
                  getDoctors={this.getDoctors}
                  getMedications={this.getMedications}
                  doctors={this.state.doctors}
                  medications={this.state.medications}
                  scraperTab={this.state.scraperTab}
                  doctorsTab={this.state.doctorsTab}
                  medicationsTab={this.state.medications}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard