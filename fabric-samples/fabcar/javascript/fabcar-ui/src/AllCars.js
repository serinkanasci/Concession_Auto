import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

export default class AllCars extends React.Component {
    constructor() {
        super();
        this.state = {
            cars: []
        }
    }
    componentDidMount() {
        this.props.setLoading(true);
        axios.get('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/cars').then(res => {
            this.props.setLoading(false);
            if(res.data.status) {
                this.setState({cars: res.data.cars})
            } else {
                alert(res.data.error.message)
            }
        }).catch(err => {
            this.props.setLoading(false);
            alert('Something went wrong')
        })
    }

    render() {
        const tbody = this.state.cars.map(car => {
            return <tr key={car.Key}>
                <td>{car.Key}</td>
                <td>{car.Record.make}</td>
                <td>{car.Record.model}</td>
                <td>{car.Record.color}</td>
                <td>{car.Record.owner}</td>
                <td>{car.Record.price}</td>
                <td>{car.Record.arrival}</td>
                <td>{car.Record.depart}</td>
                <td>{car.Record.failure}</td>
                <td>{car.Record.failureCost}</td>
                <td>
                    <Link to={'/change-owner/' + car.Key} className="btn">edit</Link>
                </td>
            </tr>
        })
        return (
            <div>
                <h4>Cars : </h4>
                <table className='striped responsive-table centered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Color</th>
                            <th>Owner</th>
                            <th>Price</th>
                            <th>Arrival</th>
                            <th>Depart</th>
                            <th>Failure</th>
                            <th>Failure Cost</th>
                            <th style={{width: 100}}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </div>
        )
    }
}