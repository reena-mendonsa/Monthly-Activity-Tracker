import React from "react";

export default class Tracker extends React.Component {
  getDays = (daysInMonth) => {
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };
  isActivityDay = (activity, day) => {
    return activity.activityDays.includes(day);
  };
  render() {
    let activities = this.props.activities;
    return (
      <React.Fragment>
        {activities.map((activity, i) => (
          <div className="activity-container" key={activity.id}>
            <div className="activity-box">
              <div className="act-title-box">
                <h2 className="activity-title">{activity.activityName}</h2>
                <h2 className="activity-month">{activity.month}</h2>
              </div>
              <div className="date-box">
                <div className="day-box">
                  {this.getDays(activity.daysInMonth).map((value) => (
                    <p
                      key={value}
                      className={`day-box ${
                        this.isActivityDay(activity, value) ? "active" : ""
                      }`}
                      onClick={() =>
                        this.props.setActivityDay(activity.id, value)
                      }
                    >
                      {value}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <button
                  className="delete-btn"
                  onClick={() => this.props.handleDelete(activity.id)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
