import React, { Component } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
class App extends Component {
  state = {
    time: 0,
    timer: 0,
    laps: [],
    isActive: false,
    disabled: true
  };
  onChange = e => {
    this.setState({
      time: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState(prevstate => ({
      timer: prevstate.time * 60 * 1000,
      disabled: false
    }));
  };
  onPause = e => {
    clearInterval(this.timer);
    this.setState(ps => ({
      isActive: false,
      laps: ps.timer !== 0 && [...ps.laps, ps.timer]
    }));
  };
  onReset = e => {
    if (this.timer) clearInterval(this.timer);
    this.setState(ps => ({
      time: 0,
      timer: 0,
      laps: [],
      disabled: true,
      isActive: false
    }));
  };
  onStart = e => {
    this.setState({
      isActive: true
    });
    this.timer = setInterval(() => {
      if (!this.state.timer) {
        clearInterval(this.timer);
      } else {
        this.setState(ps => {
          return {
            timer: ps.timer - 1000
          };
        });
      }
    }, 1000);
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  getSingle = n => {
    return n < 10 ? `0${n}` : n;
  };
  render() {
    const hours = moment.duration(this.state.timer).hours();
    const minutes = moment.duration(this.state.timer).minutes();
    const seconds = moment.duration(this.state.timer).seconds();

    return (
      <div
        style={{
          textAlign: "center",
          backgroundColor: "black",

          padding: 5
        }}
      >
        <div style={{ color: "white", fontSize: 50, margin: 10 }}>
          Timer React Js
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              type="number"
              name="time"
              onChange={this.onChange}
              value={this.state.time}
              style={{
                fontSize: 15,
                padding: 5,
                borderRadius: 5,
                border: "1px solid lightgrey",
                boxShadow: "1px 1px 1px lightgrey"
              }}
            />
            <button
              style={{
                padding: 8,
                borderRadius: 5,
                backgroundColor: "tomato",
                border: "none",
                color: "white"
              }}
            >
              submit
            </button>
          </form>
        </div>
        <div>
          <span style={{ color: "white", fontSize: 40 }}>
            {this.getSingle(hours)}
          </span>
          <span style={{ color: "white", fontSize: 40 }}>:</span>
          <span style={{ color: "white", fontSize: 40 }}>
            {this.getSingle(minutes)}
          </span>
          <span style={{ color: "white", fontSize: 40 }}>:</span>
          <span style={{ color: "white", fontSize: 40 }}>
            {this.getSingle(seconds)}
          </span>
        </div>
        {this.state.time != 0 && (
          <div>
            {this.state.isActive ? (
              <button
                onClick={this.onPause}
                style={{
                  padding: 8,
                  fontSize: 14,
                  width: 100,
                  margin: 10,
                  backgroundColor: "yellow",
                  color: "black",
                  borderRadius: 3
                }}
              >
                pause
              </button>
            ) : (
              <button
                onClick={this.onStart}
                disabled={this.state.disabled}
                style={{
                  padding: 8,
                  fontSize: 14,
                  width: 100,
                  margin: 10,
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: 3
                }}
              >
                start
              </button>
            )}
            <button
              onClick={this.onReset}
              style={{
                padding: 8,
                fontSize: 14,
                width: 100,
                margin: 10,
                backgroundColor: "red",
                color: "white",
                borderRadius: 3
              }}
            >
              reset
            </button>
          </div>
        )}
        <div style={{ padding: ".4em 1.2em" }}>
          {this.state.laps &&
            this.state.laps.map((lap, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    margin: "auto"
                  }}
                >
                  <div style={{ color: "white" }}>Lap{index + 1}</div>
                  <div>
                    <span style={{ color: "white", fontSize: 20 }}>
                      {this.getSingle(moment.duration(lap).hours())}
                    </span>
                    <span style={{ color: "white", fontSize: 20 }}>:</span>
                    <span style={{ color: "white", fontSize: 20 }}>
                      {this.getSingle(moment.duration(lap).minutes())}
                    </span>
                    <span style={{ color: "white", fontSize: 20 }}>:</span>
                    <span style={{ color: "white", fontSize: 20 }}>
                      {this.getSingle(moment.duration(lap).seconds())}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
