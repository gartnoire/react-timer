import React, { Component } from "react";

class Timer extends Component {
  state = {
    count: 0,
    setCounting: false,
  };

  handleStart = () => {
    this.setState({ setCounting: true });

    this.counterId = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };

  handleStop = () => {
    this.setState({ setCounting: false });

    clearInterval(this.counterId);
  };

  handleReset = () => {
    this.setState({ setCounting: false, count: 0 });

    clearInterval(this.counterId);
  };

  componentDidMount() {
    const useCount = localStorage.getItem("count");

    if (useCount) {
      this.setState({ count: +useCount });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("count", this.state.count);
  }

  componentWillUnmount() {
    clearInterval(this.counterId);
  }

  render() {
    return (
      <section className="Timer">
        <h1>React - Timer</h1>
        <h3>{this.state.count}</h3>
        {!this.state.setCounting ? (
          <button onClick={this.handleStart}>Start</button>
        ) : (
          <button onClick={this.handleStop}>Stop</button>
        )}
        <button onClick={this.handleReset}>Reset</button>
      </section>
    );
  }
}

export default Timer;
