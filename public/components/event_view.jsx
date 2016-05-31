const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'


function formatDate(date) {
  var d = new Date(date);
  var hh = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var dd = "AM";
  var h = hh;
  if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
  if (h == 0) {
        h = 12;
    }
  m = m<10?"0"+m:m;
  s = s<10?"0"+s:s;
  var pattern = new RegExp("0?"+hh+":"+m+":"+s);
  var replacement = h+":"+m;
  /* if you want to add seconds
  replacement += ":"+s;  */
  replacement += " "+dd;

  return replacement
}

module.exports = React.createClass({
  getInitialState: function(){
    return {event: ''}
  },
  componentDidMount: function(){
    console.log('Mounting Event View');
    console.log(this.props.params.id);
    if (this.props.params.id) {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:2323/api/event/' + this.props.params.id,
        dataType: 'json',
        cache: false,
        success: function(data){
          console.log('Successfully retrieved single EVENT');
          console.log(data);
          this.setState({event: data})
        }.bind(this),
        error: function(xhr, status, err){
          // console.error(this.props.url, status, err)
          // this.props.user._id = null;
        }.bind(this)
      })
      // this.setState({timeTill: 'NOW'})
    }

  },
  render: function() {
    if (!this.state.event.picture) {
      // this.state.event.picture = "http://lorempixel.com/640/480/transport"
    }
    var divStyle = {background: "url(" + this.state.event.picture + ") center center",
                    minHeight: "25rem",
                    margin: 0,
                    verticalAlign: "bottom"}

    var startTime = Date.parse(this.state.event.startTime)
    var now = Date.now() //- Date.parse(Date.now())
    var timeTill = Date.parse(this.state.event.startTime) - now
    var x = timeTill / 1000
    var hour = formatDate(this.state.event.startTime)
    // console.log('startTime: ' + startTime)
    // console.log('hours: ' + (x % 24))
    // console.log('days: ' + (x))
    var day = x
    var eventAttendees = [];
    eventAttendees = this.state.event._attendees;
    console.log(eventAttendees)
    // console.log(eventAttendees.length)
    // var numAttendees = eventAttendees.length;
    // console.log(numAttendees);
    // console.log(this.state.event.interestTags.length);
    // console.log(this.state.event._attendees);
    // var arr = ["yooo", "whassup"];
    // console.log(typeof arr);
    // var length = arr.length;
    // console.log(length);

    return (
      <div>
        <div className="eventPicture" style={divStyle}>
          <div className="eventTitle">
            <h3 style={{marginTop:0}}>{this.state.event.title}</h3>
          </div>
        </div>

        <div className="eventDetails">
          <h4><strong>@</strong>  {this.state.event.addressName}</h4>
          <p className="time"><strong>Starts in:</strong>  {(x % 24).toFixed(0)} hours  @ {hour}</p>
          <p className="interest"><strong>Tags:</strong>  #{this.state.event.interestTags}</p>
          <p className="hood"><strong>Neighborhood:</strong>  {this.state.event.neighborhood}</p>
          <p><strong>ID:</strong>   {this.state.event._id}</p>
        </div>

        <div className="eventAttCount">
          <h3>{this.state.event._attendees}</h3>
          <p>&nbsp;&nbsp;attendees</p>
        </div>

      </div>
    )
  }
})
