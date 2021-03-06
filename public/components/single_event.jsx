const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, Link, hashHistory } from 'react-router'


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
    return ({event: ''})
  },
  componentWillMount: function(){
    this.setState({event: this.props.event,
                   image: this.props.image})
  },
  render: function() {
    // if (this.props.image) {
    //   console.info('there is a Prop for image')
    //   this.props.event.picture = this.props.image
    // }
    var divStyle = {background: "url(" + this.props.event.picture + ") no-repeat center center",
                    minHeight: "25rem",
                    margin: 0,
                    verticalAlign: "bottom"}

    // var startTime = Date.parse(this.props.event.startTime)
    var now = Date.now() //- Date.parse(Date.now())
    var x = (Date.parse(this.props.event.startTime) - now)/ 1000

    var hour = formatDate(this.props.event.startTime)
    var day = x
    if(this.props.event._attendees) {
      var numberGoing = this.props.event._attendees.length
    } else {
      var numberGoing = 1
    }

    return (
      <li><Link to={'/event/' + this.props.event._id + '/' + this.props.userID}>
        <div className="eventPicture" style={divStyle}>
          <div className="eventTitle">
            <h3 style={{marginTop:0}}>{this.props.event.title}</h3>
          </div>
        </div>
        <div className="eventDetails">
          <h4><strong>@</strong>  {this.props.event.addressName}</h4>
          <p className="time"><strong>Starts in:</strong>  {(x % 24).toFixed(0)} hours  @ {hour}</p>
          <p className="interest"><strong>Tags:</strong>  #{this.props.event.interestTags}</p>
          <p className="hood"><strong>Neighborhood:</strong>  {this.props.event.neighborhood}</p>
          <p><strong>ID:</strong>   {this.props.event._id}</p>
          <div className="eventAttCount">
            <h3>{numberGoing}</h3><p>&nbsp;&nbsp;<i>going</i></p>
          </div>
        </div></Link>
      </li>
    )
  }
})
