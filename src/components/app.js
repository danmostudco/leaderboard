import React from 'react';
import '../styles/app.css';

const testData = {
    "Morgan Diakun": {
    likes_received: 211,
    messages_posted: 99
    },
    "Bill": {
    likes_received: 103,
    messages_posted: 48
    },
    "One-Chainz": {
    likes_received: 77,
    messages_posted: 35
    },
    "Garrett Lyons": {
    likes_received: 20,
    messages_posted: 6
    },
    "Andrew Koch": {
    likes_received: 41,
    messages_posted: 24
    },
    "Jungclaus": {
    likes_received: 56,
    messages_posted: 18
    },
    "Roy Hanna": {
    likes_received: 97,
    messages_posted: 56
    },
    "Dan Morrison": {
    likes_received: 171,
    messages_posted: 58
    },
    "Quinn Weber": {
    likes_received: 90,
    messages_posted: 43
    }
}

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

    loadData() {
        // TODO: need to get quinn to allow CORS sharing
        // see page 183 for fetching
        const peopleArray = this.convertObjectToArray(testData);
        setTimeout(() => {
            this.setState({ people: peopleArray });
        }, 500);
    }
    
    render() {
        const peopleList = this.state.people.map((person, index) => <Person key={index} name={person.name}/>)
        return (
        <div>
            <h1>Leaderboard</h1>
            {peopleList}
        </div>
        );
    }
}

class Person extends React.Component {
    render() {
        return (
            <p>{this.props.name}</p>
        )
    }
}