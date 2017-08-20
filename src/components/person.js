import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    render() {
    const ratio = Math.round((this.props.likes_received / this.props.messages_posted)*100) / 100;

        return (
            <p><span>{this.props.name}</span>:
            <span> {this.props.likes_received}</span> likes |
            <span> {this.props.messages_posted}</span> posts || ({ratio})</p>
        )
    }
}