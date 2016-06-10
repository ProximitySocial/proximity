import React from 'react'
import { ReactDOM } from 'react-dom'
import { Router, Route, Link, hashHistory } from 'react-router'
const DisplayUser = require(__dirname + '/display_user')

module.exports = React.createClass({
  getInitialState: function() {
    return({toggleUandE: true})
  },
  toggleUE: function() {
    var bool = !this.state.toggleUandE
    this.setState({toggleUandE: bool})
  },
  render: function() {
    var show, hide, btnOn, btnOff
    if (this.state.toggleUandE){
      show = {}
      hide = {display: 'none'}
      btnOn = {verticalAlign: 'middle',
                width: '20rem',
               marginTop: '1.4em',
               background: '#3399ff'}
      btnOff = {verticalAlign: 'middle',
                width: '20rem',
               marginTop: '1.4em',
               background: '#CCC'}
    } else {
      show = {display: 'none'}
      hide = {}
      btnOn = {verticalAlign: 'middle',
                width: '20rem',
               marginTop: '1.4em',
               background: '#CCC'}
      btnOff = {verticalAlign: 'middle',
                width: '20rem',
               marginTop: '1.4em',
               background: '#3399ff'}
    }

    return (
      <div>
        <div className="userEventTab">
          <button className="btn btn-action usersTab" style={btnOn} onClick={this.toggleUE}>Users</button>
          <button className="btn btn-action eventsTab" style={btnOff} onClick={this.toggleUE}>Events</button>
        </div>
        <div style={show}>
          <UserTable/>
        </div>
        <div style={hide}>
          <EventTable/>
        </div>
      </div>
    )
  }
});

var UserTable = React.createClass({
  getInitialState: function() {
    return ({users: []});
  },
  componentDidMount: function() {
    $.ajax({
      type: 'GET',
      url: '/api/users/',
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('Successfully retrieved USERS');
        console.log(data);
        this.setState({users: data})
        this.handleUsers(this.state.users)
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err)
      }.bind(this)
    })
  },
  handleUsers: function(users){
    console.log('Creating User Rows for User Table');
    console.log(users);
    var uRows = [];
    if (users) {
      users.forEach(function(user, index) {
        uRows.push(<UserRow user={user} key={index} />)
      });
      this.setState({userRows: uRows})
    }
  },
  render: function() {
    return (
      <table className="userTable">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Interests</th>
            <th>Neighborhoods</th>
            <th>Pic URL</th>
          </tr>
        </thead>
        <tbody>
          {this.state.userRows}
        </tbody>
      </table>
    )
  }
});

var UserRow = React.createClass({
  getInitialState: function() {
    return ({user: this.props.user});
  },
  render: function() {
    var neighborhoods = this.state.user.neighborhoods.join(', ')
    var interests = this.state.user.interests.join(', ')

    return (
      <tr className="userRow">
        <td>{this.state.user._id}</td>
        <td>{this.state.user.firstName}</td>
        <td>{this.state.user.lastName}</td>
        <td>{this.state.user.email}</td>
        <td>{interests}</td>
        <td>{neighborhoods}</td>
        <td><a href={this.state.user.pic} target="_blank">{this.state.user.pic}</a></td>
      </tr>
    )
  }
});

var EventTable = React.createClass({
  getInitialState: function() {
    return ({events: []})
  },
  componentDidMount: function() {
    $.ajax({
      type: 'GET',
      url: '/api/events/',
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('Successfully retrieved EVENTS');
        console.log(data);
        this.setState({events: data})
        this.handleEvents(this.state.events);
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err)
      }.bind(this)
    })
  },
  handleEvents: function(events){
    console.log('Creating Event Rows for Event Table');
    console.log(events);
    var eRows = [];
    if (events) {
      events.forEach(function(event, index) {
        eRows.push(<EventRow event={event} key={index} />)
      });
      this.setState({eventRows: eRows})
    }
  },
  render: function() {
    return (
      <table className="eventTable">
        <thead>
          <tr>
            <th className='eid'>Event ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Neighborhood</th>
            <th>Start Time</th>
            <th>Tags</th>
            <th># Going</th>
            <th>Attendees</th>
            <th>picture URL</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {this.state.eventRows}
        </tbody>
      </table>
    )
  }
});



var EventRow = React.createClass({
  getInitialState: function() {
    return ({event: this.props.event});
  },
  render: function() {
    return (
      <tr className="eventRow">
        <td className="eid">{this.state.event._id}</td>
        <td>{this.state.event.title}</td>
        <td>{this.state.event.description}</td>
        <td>{this.state.event.neighborhood}</td>
        <td>{this.state.event.startTime}</td>
        <td>{this.state.event.interestTags}</td>
        <td>{this.state.event._attendees.length}</td>
        <td>{this.state.event._attendees}</td>
        <td><a href={this.state.event.picture} target="_blank">{this.state.event.picture}</a></td>
        <td>{this.state.event._creator}</td>
      </tr>
    )
  }
});
