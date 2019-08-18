import React, { Component } from 'react'
import Response from '../Response'
import headers from '../../utils/Headers'

class Monitor extends Component {
  constructor () {
    super()
    // order_of_training_data = ['Screen Technology', 'Comparitive Energy Consumption', 'Active Standby Power']
    // specifications = ['LCD (LED)', 100, 0.35]
    this.state = {
      screenTechnology: 'LCD',
      comparitiveEnergyConsumption: '',
      activeStandbyPower: '',
      response: '',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  handleChange (event) {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }
  submitForm (e) {
    e.preventDefault()
    this.setState({ loading: true })
    const data = [
      this.state.screenTechnology,
      parseInt(this.state.comparitiveEnergyConsumption),
      parseFloat(this.state.activeStandbyPower)
    ]
    if (data.includes(NaN) || data.includes('')) {
      alert('Fill all Fields')
      this.setState({
        loading: false
      })
      return
    }
    // console.log(data);
    fetch('/api/predict/monitor', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        specifications: data
      })
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          response: {
            category: res.category,
            info: res.info,
            inference: res.inference,
            starRange: res.starRange,
            links: res.links
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {
    var content
    const formContent = (
      <div>
        <div className='container-fluid mb-5 display-4'>
          Tell us about your Monitor
        </div>
        <form className='container w-50'>
          <div className='form-group'>
            <label className='form-inline'>Screen Technology</label>
            <select
              className='form-control'
              name='screenTechnology'
              value={this.state.screenTechnology}
              onChange={this.handleChange}
            >
              <option value='LCD'>LCD</option>
              <option value='LCD (LED)'>LCD (LED)</option>
              <option value='OLED'>OLED</option>
            </select>
          </div>

          <div className='form-group'>
            <label className='form-inline'>
              Current Comparitive Energy Consumption
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Comparative Energy Consumption expressed as kilowatt hours per years'
              name='comparitiveEnergyConsumption'
              value={this.state.comparitiveEnergyConsumption}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-group'>
            <label className='form-inline'>Active Standby Power</label>
            <input
              type='number'
              className='form-control'
              placeholder='Amount of energy used by the monitor in Active Standby Mode in watts'
              name='activeStandbyPower'
              value={this.state.activeStandbyPower}
              onChange={this.handleChange}
            />
          </div>
          <button
            type='submit'
            className='form-group btn btn-success'
            onClick={this.submitForm}
            disabled={this.state.loading}
          >
            {!this.state.loading ? 'Find Star Rating' : 'Submitting...'}
          </button>
          <button
            type='reset'
            className='form-group btn btn-info ml-3'
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Back to Home
          </button>
        </form>
      </div>
    )

    if (this.state.response) {
      content = <Response response={this.state.response} appliance='monitor' />
    } else content = formContent
    return <div>{content}</div>
  }
}

export default Monitor
