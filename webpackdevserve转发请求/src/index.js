import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import List from './list'
import Home from './home'


class App extends Component {
	render() {
		return(
			<BrowserRouter>
				<Route path="/"  exact component={Home}></Route>
				<Route path="/list" component={List}></Route>
		</BrowserRouter>
		)
	}
}

ReactDom.render(<App />, document.getElementById('root'));
