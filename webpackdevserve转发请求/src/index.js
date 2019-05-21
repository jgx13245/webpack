import React, { Component } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';

class App extends Component {

	componentDidMount() {
		axios.get('/mock/5bf4d27d58cc81351fa1f082/example/payInterval').then(res => {
			console.log(res)
		})
	}	
	render() {
		return <div>Hello World</div>
	}
}

ReactDom.render(<App />, document.getElementById('root'));
