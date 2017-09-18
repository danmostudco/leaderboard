import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
    render() {
    const ratio = Math.round((this.props.likes_received / this.props.messages_posted)*100) / 100;

        return (
            <div className="personRow">
                <div className="personImage"></div>
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