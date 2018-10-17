import React from 'react';
class Clock extends React.Component {
    constructor (props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <h1>Hello, it is {this.state.date.toLocaleTimeString()}.</h1>
        );
    }

    componentDidMount () {
        this.timerID = setInterval(() => {
            this.tick();
        }, 1000);
    }

    componentWillMount () {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

}

export default Clock;