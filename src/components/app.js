import React from 'react';
import '../styles/app.css';

const people = ["Quinn", "Dan", "Bill"]

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {people: []};  
    }

    componentDidMount () {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({ people: people });
            // key for people is key in state
            // value is referencing the people variable above
        }, 500);
    }
    
    render() {
        return (
        <div>
            <h1>Header</h1>
            <span>Lower span</span>
        </div>
        );
    }
}