import React, { Component } from 'react';
import headers from '../../utils/Headers';

class Dryer extends Component {
  constructor() {
    super();
    // specifications = ['AS/NZS 2442.2:2000/Amdt 2:2007 (Legacy)', 'ASKO', 8, True, 'Timer', 'Slovenia', 890, 650, 200, 'Heat and dry', 230, 'Vented', 650]
    // order_of_training_data = ['Appliance Standard', 'Brand', 'Capacity', 'Combination', 'Control', 'Country', 'Depth','Height', 'Current Comparitive Energy Consumption', 'Program Name', 'Program Time', 'Type', 'Width']
    this.state = {
      'applianceStandard': 'AS/NZS 2442.2:2000/Amdt 2:2007 (Legacy)',
      'brand': '',
      'capacity': '',
      'combination': true,
      'control': 'Timer',
      'country': '',
      'depth': '',
      'height': '',
      'comparitiveEnergyConsumption': '',
      'programName': '',
      'programTime': '',
      'type': 'Vented',
      'width': '',
      'response':''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCombination = this.handleCombination.bind(this);
    this.submitForm = this.submitForm.bind(this);    
    this.resetResponse = this.resetResponse.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name] : event.target.value });
  }
  handleCombination(event){
    event.preventDefault();
    var value, combination = this.state.Combination;
    if(combination === 'true'){
      value = true;
    }
    else value = false;
    this.setState({'combination': value});
  }
  submitForm(e) {
    e.preventDefault();
    const data = [
      this.state.applianceStandard,
      this.state.brand,
      parseInt(this.state.capacity),
      JSON.parse(this.state.combination),
      this.state.control,
      this.state.country,
      parseInt(this.state.depth),
      parseInt(this.state.height),
      parseInt(this.state.comparitiveEnergyConsumption),
      this.state.programName,
      parseInt(this.state.programTime),
      this.state.type,
      parseInt(this.state.width)
    ];
    // console.log(data);
    fetch('http://localhost:5000/api/predict/dryer', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        "specifications": data
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({'response':{
          'category' : res.category,
          'info': res.info
        }})
      })
  }
  resetResponse(event){
    event.preventDefault();
    this.setState({
      'response': '',
      'applianceStandard': 'AS/NZS 2442.2:2000/Amdt 2:2007 (Legacy)',
      'brand': '',
      'capacity': '',
      'combination': true,
      'control': 'Timer',
      'country': '',
      'depth': '',
      'height': '',
      'comparitiveEnergyConsumption': '',
      'programName': '',
      'programTime': '',
      'type': 'Vented',
      'width': ''
    });
  }
  render() {
    var content;
    const formContent = (
      <div>
        <div className="container-fluid mb-5 display-4">
          Dryer Details
        </div>
        <form className="container w-50">

          <div className="form-group">
            <label className="form-inline">Appliance Standard</label>
            <select
              className="form-control"
              name='applianceStandard'
              value={this.state.applianceStandard}
              onChange={this.handleChange}
            >
              <option value="AS/NZS 2442.2:2000/Amdt 2:2007 (Legacy)">AS/NZS 2442.2:2000/Amdt 2:2007 (Legacy)</option>
              <option value="AS/NZS 2442.2:2000/Amdt 2:2007">AS/NZS 2442.2:2000/Amdt 2:2007</option>
              <option value="Greenhouse and Energy Minimum Standards (Rotary Clothes Dryers) Determination 2015">Greenhouse and Energy Minimum Standards (Rotary Clothes Dryers) Determination 2015</option>
              <option value="Greenhouse and Energy Minimum Standards (Rotary Clothes Dryers) Determination 2012">Greenhouse and Energy Minimum Standards (Rotary Clothes Dryers) Determination 2012</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-inline">Brand</label>
            <input
              type='text'
              className="form-control"
              placeholder='Name of the Brand'
              name='brand'
              value={this.state.brand}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-inline">Capacity</label>
            <input
              type='number'
              className="form-control"
              placeholder='Capacity'
              name='capacity'
              value={this.state.capacity}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-inline">Combination - washer+dryer?</label>
            <select
              className="form-control"
              name='combination'
              value={this.state.combination}
              onChange={this.handleChange}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <div className="form-group">
            <label className='form-inline'>Control</label>
            <select
              className="form-control"
              name='control'
              value={this.state.control}
              onChange={this.handleChange}
            >
              <option value="Timer">Timer</option>
              <option value="Autosensing">Autosensing</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="form-group">
            <label className='form-inline'>Country</label>
            <input
              type='text'
              className="form-control"
              placeholder='Country of manufacture'
              name="country"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className='form-inline'>Depth</label>
            <input
              type='number'
              className="form-control"
              placeholder='Depth in mm'
              name="depth"
              value={this.state.depth}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className='form-inline'>Height</label>
            <input
              type='number'
              className="form-control"
              placeholder='Height in mm'
              name="height"
              value={this.state.height}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className='form-inline'>Current Comparitive Energy Consumption</label>
            <input
              type='number'
              className="form-control"
              placeholder='Energy Consumption of the product expressed as kilowatt hours per years'
              name="comparitiveEnergyConsumption"
              value={this.state.comparitiveEnergyConsumption}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className='form-inline'>Program Name</label>
            <input
              type='text'
              className="form-control"
              placeholder='Program run like heat/dry'
              name="programName"
              value={this.state.programName}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className='form-inline'>Program Time</label>
            <input
              type='number'
              className="form-control"
              placeholder='Program time in minutes'
              name="programTime"
              value={this.state.programTime}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className='form-inline'>Type</label>
            <select
              className="form-control"
              name='type'
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="Vented">Vented</option>
              <option value="Condenser">Condenser</option>
            </select>
          </div>

          <div className="form-group">
            <label className='form-inline'>Width</label>
            <input
              type='number'
              className="form-control"
              placeholder='Width in mm'
              name="width"
              value={this.state.width}
              onChange={this.handleChange}
            />
          </div>
          <button
            type='submit'
            className='form-group btn btn-lg btn-success'
            onClick={this.submitForm}
          >
            Find Star Rating
          </button>
        </form>
      </div>
    )

    const responseContent = (
      <div className='container'>
        <h2>Category {this.state.response ? this.state.response.category: null}</h2><br />
        <h4>{this.state.response ? this.state.response.info: null}</h4>
        <button value="Fill Details Again" className="btn btn-lg btn-success w-25" onClick={this.resetResponse}>Fill Details Again</button>
      </div>
    )
    
    if(this.state.response){
      content = responseContent
    }
    else content = formContent;
    return  <div>{content}</div>;
    
  }
}

export default Dryer;