import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class AddCar extends React.Component {
    constructor() {
        super();
        this.state = {
            key: '',
            make: '',
            model: '',
            color: '',
            owner: '',
            price: '',
            arrival: '',
            depart: '',
            failure: '',
            failureCost: '',
            redirect: false
        }
    }

    onKeyChanged(e) { this.setState({ key: e.target.value.toUpperCase() }) }
    onMakeChanged(e) { this.setState({ make: e.target.value }) }
    onModelChanged(e) { this.setState({ model: e.target.value }) }
    onColorChanged(e) { this.setState({ color: e.target.value }) }
    onOwnerChanged(e) { this.setState({ owner: e.target.value }) }
    onPriceChanged(e) { this.setState({ price: e.target.value }) }
    onArrivalChanged(e) { this.setState({ arrival: e.target.value }) }
    onDepartChanged(e) { this.setState({ depart: e.target.value }) }
    onFailureChanged(e) { this.setState({ failure: e.target.value }) }
    onFailureCostChanged(e) { this.setState({ failureCost: e.target.value }) }


    onFormSubmit(e) {
        e.preventDefault();
        this.props.setLoading(true);
        axios.post('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/cars', {
            key: this.state.key,
            make: this.state.make,
            model: this.state.model,
            color: this.state.color,
            owner: this.state.owner,
            price: this.state.price,
            arrival: this.state.arrival,
            depart: this.state.depart,
            failure: this.state.failure,
            failureCost: this.state.failureCost
        }).then(res => {
            this.props.setLoading(false);
            if (res.data.status) {
                alert(res.data.message);
                this.setState({redirect: true})
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            this.props.setLoading(false);
            alert('Something went wrong')
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <h4>Add Car</h4>
                <div className="row">
                    <form className="col s12" onSubmit={this.onFormSubmit.bind(this)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="key" type="text" className="validate" required value={this.state.key} onChange={this.onKeyChanged.bind(this)} />
                                <label htmlFor="key">Key (e.g. CAR12)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input id="make" type="text" className="validate" required value={this.state.make} onChange={this.onMakeChanged.bind(this)} />
                                <label htmlFor="make">Make (e.g. Lexus)</label>
                            </div>
                            <div className="input-field col s4">
                                <input id="model" type="text" className="validate" required value={this.state.model} onChange={this.onModelChanged.bind(this)} />
                                <label htmlFor="model">Model (e.g. NX 200t)</label>
                            </div>
                            <div className="input-field col s4">
                                <select className="browser-default" value={this.state.color} onChange={this.onColorChanged.bind(this)}>
                                    <option value="" disabled>Choose color</option>
                                    <option>Black</option>
                                    <option>White</option>
                                    <option>Blue</option>
                                    <option>Red</option>
                                    <option>Gold</option>
                                    <option>Silver</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="owner" type="text" className="validate" required value={this.state.owner} onChange={this.onOwnerChanged.bind(this)} />
                                <label htmlFor="owner">Owner</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="price" type="text" className="validate" required value={this.state.price} onChange={this.onPriceChanged.bind(this)} />
                                <label htmlFor="price">Price</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="arrival" type="text" className="validate" required value={this.state.arrival} onChange={this.onArrivalChanged.bind(this)} />
                                <label htmlFor="arrival">Arrival</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="depart" type="text" className="validate" required value={this.state.depart} onChange={this.onDepartChanged.bind(this)} />
                                <label htmlFor="depart">Depart</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="failure" type="text" className="validate" required value={this.state.failure} onChange={this.onFailureChanged.bind(this)} />
                                <label htmlFor="failure">Failure</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="failureCost" type="text" className="validate" required value={this.state.failureCost} onChange={this.onFailureCostChanged.bind(this)} />
                                <label htmlFor="failureCost">Failure Cost</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="input-field col s12">
                                <button className="btn waves-effect waves-light light-red darken-3" type="submit" name="action">Submit
                                    send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}