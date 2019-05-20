import React from 'react'
import './doctors.css'
import API from '../../utils/API'

class Doctors extends React.Component {
  
  state = {
    edit: false,
    userID: this.props.userID,
    name: "",
    phoneNumber: "",
    streetInfo: "",
    cityStateZip: "",
    logged: ""
  }

  updateValue = async event => {
    let name = event.target.name
    let value = event.target.value
    await this.setState({[name]: value})
  }

  addDoctor = event => {
    event.preventDefault()

  }

  editDoctor = medInfo => {

  }

  removeDoctor = medInfo => {

  }

  switchToEdit = () => {
    this.setState({ edit: true })   
  }

  switchToView = () => {
    this.setState({ edit: false })
  }

  //Inputs for name, phoneNumber, address
  // Grab values from names
  // Send to server

  render() {
    return (
      <div>
        {this.props.doctors.length > 0 ?  
          (this.props.doctors.map((doctors,i) => {
            <div>
             Test
            <p>Name: {doctors.name}</p>
            </div>
          })) : 
        <div className="doctors">
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <p>
                  <label>Doctor's Name: </label>
                  <textarea
                    className="form-control"
                    placeholder="Doctor's Name"
                    name="name"
                    onChange={this.updateValue}
                    rows="1"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <p>
                  <label>Phone Number: </label>
                  <textarea
                    className="form-control"
                    placeholder="Phone Number (XXX-XXX-XXXX)"
                    name="phoneNumber"
                    onChange={this.updateValue}
                    rows="1"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <p>
                  <label>Address: </label>
                  <textarea
                    className="form-control"
                    placeholder="Street Information"
                    name="streetInfo"
                    onChange={this.updateValue}
                    rows="1"
                  />
                  <textarea
                    className="form-control"
                    placeholder="City, State Zip Code"
                    name="cityStateZip"
                    onChange={this.updateValue}
                    rows="1"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>  
        }
      </div>
    )
  }
}

export default Doctors