const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, Link, hashHistory } from 'react-router'


const EventList = require(__dirname + '/event_list.jsx')
const DisplayUser = require(__dirname + '/display_user.jsx')
const CreateEventForm = require(__dirname + '/event_form.jsx')
const CreateUserForm = require(__dirname + '/user_form.jsx')


// for testing purposes
var userId = "574390a51831bd0d9abfe74a"
var userUrl = "/api/user/" + userId
var eventUrl = "/api/events/" + userId
// var eventUrl = "http://localhost:2323/api/event/" + eventId
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

module.exports = React.createClass({
  getInitialState: function(){
    if (sessionStorage.token){
      console.log('Yes there is a sessionStorage token')
      console.log(sessionStorage.token)
      var userObj = sessionStorage.token
      var toggleVar = false
    } else {
      console.log('No token')
      var userObj = ''
      var toggleVar = true
    }
    return ({user: userObj,
            events: '',
            toggle: toggleVar})
  },
  componentDidMount: function() {
    if (!this.state.user){
        var token = getParameterByName('access_token')
        sessionStorage.setItem('token', token)
    }
    $.ajax({
      type: 'GET',
      url: 'http://localhost:2323/api/user/' + sessionStorage.token,
      headers: {'Access-Control-Allow-Origin': 'http://localhost:2323'},
      // beforeSend: function(xhr){
      //   xhr.withCredentials = true;
      //   xhr.setRequestHeader('Authorization', )
      // },
      success: (data, status) => {
        console.log(data)
        console.log(status)
        this.setState({
          user: data,
          toggle: false
        })
        console.log('this is toggle: ' + this.state.toggle);
      },
      error: (xhr, status, error) => {
        console.log(xhr)
        console.log(status)
        console.log(error)
      }
    })
  },
  logout: function(){
    sessionStorage.removeItem('token')
    this.setState({user: '',
                   events: '',
                   toggle: true})
  },
  render: function(){
    var classHide, classShow
    if (this.state.toggle){
      classHide = {display: "none"}
      classShow = {}
    } else {
      classHide = {}
      classShow = {display: "none"}
    }
    return (
      <div>
        <section style={classHide}>
          <div className="container row">
            <div className="col-lg-4">
              <h2>Profile</h2>
              <DisplayUser className="row profile" user={this.state.user} />
              <CreateUserForm className="row form" user={this.state.user}/>
            </div>
            <div className="col-lg-4" id="eventList">
              <h2>Events</h2>
              <EventList className="row events" user={this.state.user}/>
            </div>
            <div className="col-lg-4">
              <h2>CreateEvent</h2>
              <CreateEventForm className="row form" />
              <div className="row form" id="eventUpdate"></div>
            </div>
          </div>
        </section>
      </div>
    )
  }
})
