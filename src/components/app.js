import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person'
import '../styles/app.css';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {people: []};  
    }

    componentDidMount () {
        this.loadData();
    }

    // Convert Object from JSON into an array that can be iterated over
    // Use the array index as key for the Person Component
    convertObjectToArray(json) {
        var result = [];
        var keys = Object.keys(json)
        keys.forEach(key => {result.push(json[key])});
        for (var i in result) {
            result[i].name = keys[i]
        }
        return result;
    }

    // Take JSON Object and then convert it to an array
    // Set this to the state
    loadData() {
        fetch("https://immense-shore-97696.herokuapp.com/api/v1/totals?days=30").then(response => {
            if (response.ok) {
                response.json().then(usersObject => {

                    // if GroupMe Calendar comes back, remove it
                    if(usersObject["GroupMe Calendar"]) {
                        delete usersObject["GroupMe Calendar"]
                    }

                    const arrayUsers = this.convertObjectToArray(usersObject)
                    this.setState({people: arrayUsers})
                })
            } else {
                response.json().then(err => {
                    alert(`Error in fetching data from Quinn's API: ${err.message}`)
                })
            }
        })
    }
    
    render() {
        const peopleList = this.state.people.map((person, index) => {
            return <Person key={index} name={person.name} likes_received={person.likes_received} messages_posted={person.messages_posted}/>
        })

        return (
        <div>
            <h1>Leaderboard</h1>
            {peopleList}
        </div>
        );
    }
}