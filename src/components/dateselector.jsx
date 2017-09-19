import React from 'react';
import ReactDOM from 'react-dom';

export default class DateSelector extends React.Component {
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