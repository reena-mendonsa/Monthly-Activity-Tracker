import React from "react";
import Tracker from "./Tracker";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: " ",
      activities: [],
    };
  }
  componentDidMount() {
    if (localStorage.activities) {
      this.setState({ activities: JSON.parse(localStorage.activities) || [] });
    }
  }

  updateLocalStorage = (activities) => {
    localStorage.setItem("activities", JSON.stringify(activities));
  };

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  handleSubmit = (event) => {
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    event.preventDefault();

    if (this.state.inputText !== "") {
      let activity = {
        activityName: this.state.inputText,
        activityDays: [],
        daysInMonth,
        id: Math.floor(Math.random() * 99999),
        month: months[month],
      };
      this.setState({ activities: [...this.state.activities, activity] });
      this.updateLocalStorage([...this.state.activities, activity]);
    }
    this.setState({ inputText: "" });
  };

  handleDelete = (id) => {
    let activities = this.state.activities;
    // console.log(id);
    // console.log(activities);
    let filterData = activities.filter((activity) => activity.id !== id);
    // console.log(filterData);
    this.setState({ activities: filterData });
    this.updateLocalStorage(filterData);
  };

  setActivityDay = (id, day) => {
    const activities = this.state.activities;
    activities.forEach((activity) => {
      if (activity.id === id) {
        const presentIndex = activity.activityDays.findIndex((d) => d === day);
        if (presentIndex === -1) activity.activityDays.push(day);
        else activity.activityDays.splice(presentIndex, 1);
      }
    });
    this.setState({ activities });
    this.updateLocalStorage(activities);
  };

  render() {
    return (
      <React.Fragment>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="input"
            className="text-input"
            placeholder="Add Your Activity"
            onChange={this.handleChange}
            value={this.state.inputText}
          />
          <input type="submit" className="submit-btn" value="activity" />
        </form>
        <Tracker
          activities={this.state.activities}
          setActivityDay={this.setActivityDay}
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}
