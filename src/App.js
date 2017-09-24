import React, { Component } from 'react';
import './App.css';

class Person extends React.Component {
  render() {
  const ratio = Math.round((this.props.likes_received / this.props.messages_posted)*100) / 100;

      // TODO: update so all images come from the this.props.imageSource property passed down
      return (
          <div className="personRow">
              <div className="personImage">
                  <img src={`./images/${this.props.imageSource}.jpg`}/>
              </div>
              <div className="personText">
                  <span className="personName">{this.props.name}</span>
                  <div className="rowStats">
                      <span className="likesCount"> {this.props.likes_received}</span> likes
                      <span className="postsCount"> {this.props.messages_posted}</span> posts
                      <span className="ratioStat"> {ratio}</span> ratio
                  </div>
              </div>
          </div>
      )
  }
}

class DateSelector extends React.Component {
  render() {
      const dayOptions = [30, 90, 180];
      const filterDates = dayOptions.map((date, index) => {
          return <Date key={index} days={date} updateDays={this.props.updateDays}/>
      });

      return (
          <div className="datePicker">
              {filterDates}
          </div>
      )
  }
}

class Date extends React.Component {
  constructor(props) {
      super(props)
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
      this.props.updateDays(this.props.days)
      console.log(this.props.days)
  }

  render() {
      return (
          <div className="individualDate" style={{display:"inline"}}>
          <a href="#" onClick={this.handleClick}>{this.props.days} days </a>
          <span></span>
          </div>
      )
  }
}

class App extends Component {
    constructor() {
        super();
        this.cachedData = {};
        this.state = {people: [], daysFilter: 30};
        this.updateDays = this.updateDays.bind(this);
    }

    componentDidMount () {
        this.loadData(this.state.daysFilter);
    }

    // Convert Object from JSON into an array that can be iterated over
    // Use the array index as key for the Person Component
    convertObjectToArray(json) {
        var result = [];
        var keys = Object.keys(json)
        keys.forEach(key => {result.push(json[key])});
        for (var i in result) {
            result[i].name = keys[i]
            result[i]['imageSource'] = result[i].name.replace(/ /g,'').toLowerCase(); //set name for image file
        }
        return result;
    }

    updateDays(newDays) {
        newDays = parseInt(newDays);
        if (newDays === this.state.daysFilter) {
            // not sure why this works, but set this up above return statement
            // and the caching works fine
            const newState = {...this.state};
            newState["people"] = this.cachedData[newDays];
            this.setState(newState) 
            return
        } else {
            // take a copy of our state
            const newState = {...this.state};
            console.log(newState);

            // update with the new days
            newState["daysFilter"] = newDays;
            this.setState(newState)

            // check for cachedData and use it if found
            if (this.cachedData[newDays]) {
               const newState = {...this.state};
               newState["people"] = this.cachedData[newDays];
               this.setState(newState) 
            } else {
                this.loadData(newDays);
            }
        }
    }

    // Take JSON Object and then convert it to an array
    // Set this to the state
    loadData(days) {
        fetch(`https://immense-shore-97696.herokuapp.com/api/v1/totals?days=${days.toString()}`).then(response => {
            if (response.ok) {
                response.json().then(usersObject => {

                    // if GroupMe Calendar comes back, remove it
                    if(usersObject["GroupMe Calendar"]) {
                        delete usersObject["GroupMe Calendar"]
                    }

                    // sort by like count before setting state
                    const arrayUsers = this.convertObjectToArray(usersObject)
                        .sort((a,b) => (a.likes_received < b.likes_received) ? 1 : (a.likes_received > b.likes_received) ? -1 : 0)


                    this.cachedData[this.state.daysFilter] = arrayUsers;
                    const newState = {...this.state};
                    newState["people"] = arrayUsers;
                    this.setState(newState);
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
            return <Person key={index} name={person.name} likes_received={person.likes_received} messages_posted={person.messages_posted} imageSource={person.imageSource}/>
        })

        return (
        <div>
            <h1 className="title">Leaderboard</h1>
            <DateSelector updateDays={this.updateDays}/>
            <div className="peopleList">
                {peopleList}
            </div>
        </div>
        );
    }
}

export default App;
