import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class ChangeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.match.params.key,
            owner: '',
            price: '',
            arrival: '',
            departure: '',
            failure: '',
            failureCost: '',
            redirect: false,
            car: {}
        }
    }

    onOwnerChanged(e) { this.setState({ owner: e.target.value }) }
    onPriceChanged(e) { this.setState({ price: e.target.value }) }
    onArrivalChanged(e) { this.setState({ arrival: e.target.value }) }
    onDepartChanged(e) { this.setState({ departure: e.target.value }) }
    onFailureChanged(e) { this.setState({ failure: e.target.value }) }
    onFailureCostChanged(e) { this.setState({ failureCost: e.target.value }) }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.setLoading(true);
        axios.put('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/cars', {
            key: this.state.key,
            owner: this.state.owner,
            price: this.state.price,
            arrival: this.state.arrival,
            departure: this.state.departure,
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

    componentDidMount() {
        this.props.setLoading(true);
        axios.get('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/cars/' + this.props.match.params.key).then(res => {
            this.props.setLoading(false);
            if (res.data.status) {
                this.setState({car: res.data.car});
            } else {
                alert(res.data.error.message);
                this.setState({redirect: true});
            }
        }).catch(err => {
            this.props.setLoading(false);
            alert('Something went wrong')
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }

        const info = typeof this.state.car.owner !== 'undefined' ? <div className="row">
            <div className="col s12">
            <table className='striped responsive-table'>
                <tbody>
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Key :</td><td>{this.state.key}</td></tr>
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Make :</td><td>{this.state.car.make}</td></tr>
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Model :</td><td>{this.state.car.model}</td></tr>
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Color :</td><td>{this.state.car.color}</td></tr>
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Old Owner :</td><td>{this.state.car.owner}</td></tr>                    
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Price :</td><td>{this.state.car.price}</td></tr>                    
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Arrival :</td><td>{this.state.car.arrival}</td></tr>                    
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Departure :</td><td>{this.state.car.departure}</td></tr>    
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Failure :</td><td>{this.state.car.failure}</td></tr>  
                    <tr><td style={{width: '50%', textAlign: 'right'}}>Failure Cost :</td><td>{this.state.car.failureCost}</td></tr>                  
                </tbody>
            </table>
            </div>
        </div> : <h6>Loading information...</h6>
        return (
            <div>
                <h4>Old Information</h4>
                {info}
                <h4>Change Information</h4>
                <div className="row">
                    <form className="col s12" onSubmit={this.onFormSubmit.bind(this)}>
                        <div className="row">
                            <input disabled id="key" type="hidden" className="validate" value={this.state.key} />
                            <div className="input-field col s12">
                                <input id="owner" type="text" className="validate" value={this.state.owner} onChange={this.onOwnerChanged.bind(this)} />
                                <label htmlFor="owner">New Owner</label>
                            </div>
                        </div>

                        <div className="row">
                            <input disabled id="key" type="hidden" className="validate" value={this.state.key} />
                            <div className="input-field col s12">
                                <input id="price" type="text" className="validate" value={this.state.price} onChange={this.onPriceChanged.bind(this)} />
                                <label htmlFor="price">New Price</label>
                            </div>
                        </div>

                        <div className="row">
                            <input disabled id="key" type="hidden" className="validate" value={this.state.key} />
                            <div className="input-field col s12">
                                <input id="arrival" type="text" className="validate" value={this.state.arrival} onChange={this.onArrivalChanged.bind(this)} />
                                <label htmlFor="arrival">New Arrival</label>
                            </div>
                        </div>

                        <div className="row">
                            <input disabled id="key" type="hidden" className="validate" value={this.state.key} />
                            <div className="input-field col s12">
                                <input id="departure" type="text" className="validate" value={this.state.departure} onChange={this.onDepartChanged.bind(this)} />
                                <label htmlFor="departure">New Departure</label>
                            </div>
                        </div>

                        <div className="row">
                            <input disabled id="key" type="hidden" className="validate" value={this.state.key} />
                            <div className="input-field col s12">
                                <input id="failure" type="text" className="validate" value={this.state.failure} onChange={this.onFailureChanged.bind(this)} />
                                <label htmlFor="failure">New Failure</label>
                            </div>
                        </div>

                        <div className="row">
                            <input disabled id="key" type="hidden" className="validate" value={this.state.key} />
                            <div className="input-field col s12">
                                <input id="failureCost" type="text" className="validate" value={this.state.failureCost} onChange={this.onFailureCostChanged.bind(this)} />
                                <label htmlFor="failureCost">New Failure Cost</label>
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