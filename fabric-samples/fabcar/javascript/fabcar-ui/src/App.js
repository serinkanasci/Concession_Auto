import React from 'react';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import AllCars from './AllCars';
import AddCar from './AddCar';
import ChangeOwner from './ChangeOwner';
import NotFound from './NotFound';
// import Login from './Login';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false
		}
	}

	render() {
		return (
			<BrowserRouter>
				<nav className='light-blue darken-3'>
					<div className="nav-wrapper">
						<div className='container'>
							{/* <Link to='/' className="left brand-logo">My Cars</Link> */}
							<div className="brand-logo right hide-on-med-and-down">
								Sales : {this.state.sales}€ Benefice : {this.state.benefice}€
							</div>
							<ul id="nav-mobile" className="hide-on-med-and-down">
								<li><Link to='/'><i className='material-icons left'>directions_car</i>All Cars</Link></li>
								<li><Link to='/add'><i className="material-icons left">add_circle_outline</i>Add Car</Link></li>
							</ul>
						</div>
						{ this.state.isLoading ? <div className="progress light-blue lighten-3"><div className="indeterminate light-blue darken-4"></div></div> : null }
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
							(props) => <ChangeOwner {...props} setLoading={(status) => {this.setState({isLoading: status})}} />
						} />

						<Route path='/*' component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
