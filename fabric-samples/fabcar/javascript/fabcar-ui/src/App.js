import React from 'react';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import AllCars from './AllCars';
import AddCar from './AddCar';
import ChangeInfo from './ChangeInfo';
import NotFound from './NotFound';
// import Login from './Login';
// import axios from 'axios';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			sold: 10,
			benefit: 10
		}
	}

    // componentDidMount() {
    //     this.props.setLoading(true);
    //     axios.get('http://'+  process.env.REACT_APP_API_HOST  +':'+ process.env.REACT_APP_API_PORT+'/companyInfo').then(res => {
    //         this.props.setLoading(false);
    //         if(res.data.status) {
    //             this.setState({sold: res.data.sold})
    //             this.setState({benefit: res.data.benefit})
    //         } else {
    //             alert(res.data.error.message)
    //         }
    //     }).catch(err => {
    //         this.props.setLoading(false);
    //         alert('Something went wrong')
    //     })
    // }
	render() {
		return (
			<BrowserRouter>
				<nav className='light-red darken-3'>
					<div className="nav-wrapper">
						<div className='container'>
							{/* <Link to='/' className="left brand-logo">My Cars</Link> */}
							<div className="brand-logo right hide-on-med-and-down">
								Sales : {this.state.sold}€ Benefits : {this.state.benefit}€
							</div>
							<ul id="nav-mobile" className="hide-on-med-and-down">
								<li><Link to='/'>All Cars</Link></li>
								<li><Link to='/add'>Add Car</Link></li>
							</ul>
						</div>
						{ this.state.isLoading ? <div className="progress light-red lighten-3"><div className="indeterminate light-red darken-4"></div></div> : null }
					</div>
				</nav>
				<div className='container'>
					<Switch>
						<Route exact path="/" render={
							(props) => <AllCars {...props} setLoading={(status) => {this.setState({isLoading: status})}} />
						} />

						<Route exact path="/add" render={
							(props) => <AddCar {...props} setLoading={(status) => {this.setState({isLoading: status})}} />
						} />

						<Route exact path="/change-owner/:key" render={
							(props) => <ChangeInfo {...props} setLoading={(status) => {this.setState({isLoading: status})}} />
						} />

						<Route path='/*' component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
