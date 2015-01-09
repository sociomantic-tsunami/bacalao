var React = require('react/addons');
var moment = require('moment');

var UpcomingEvent = React.createClass({

  render: function() {
    return (
      <div className="event__box--details__text">
        <div className="event__box--venue">
          <h3 className="event__box--venue-name">
            <a target="_blank" href={this.props.upcomingEvent.venue.url}>{this.props.upcomingEvent.venue.name}</a>
          </h3>
          <span className="event__box--venue-address">
            {this.props.upcomingEvent.venue.formatted_address}
          </span>
          <span className="event__box--venue-phone-number">
            {this.props.upcomingEvent.venue.international_phone_number}
          </span>
        </div>
        <div className="event__box--time">
          {this.getTime()}
        </div>
        <div className="event__box--details">
          {this.props.upcomingEvent.details}
        </div>
      </div>
    );
  },

  getTime: function() {
    var time = moment(this.props.upcomingEvent.time).fromNow();
    return time;
  }

});

module.exports = UpcomingEvent;
