const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, Link, hashHistory } from 'react-router'

var SingleEvent = require(__dirname + '/single_event.jsx')
var port = process.env.PORT


module.exports = React.createClass({
  getInitialState: function() {
    return ({events: [],
            user: ''})
  },
  propTypes: function(){
    user: React.PropTypes.object.isRequired
  },
  componentWillReceiveProps: function(nextProps) {
    this.handleGetEvents(nextProps.user)
  },
  handleGetEvents: function(user){
    if (user._id) {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:2323/api/events/' + user._id,
        dataType: 'json',
        cache: false,
        success: function(data){
          console.log('Successfully retrieved DATA');
          this.setState({events: data.events, userID: user._id})
          this.handleEvents(this.state.events, user._id)
        }.bind(this),
        error: function(xhr, status, err){
          console.error(this.props.url, status, err)
          this.props.user._id = null;
        }.bind(this)
      })
    }
  },
  handleEvents: function(events, userID){
    console.log('Handling Events from Event List');
    console.log(userID);
    var rows = []
    if (events) {
      events.forEach(function(event, index) {
        rows.push(<SingleEvent event={event} userID={userID} key={index} />)
      })
      this.setState({rowes: rows})
    }

  },
  render: function() {
    return (
      <div className="eventList">
        <ul>
          {this.state.rowes}
        </ul>
      </div>
    )
  }
})
