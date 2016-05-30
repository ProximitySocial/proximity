const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, Link, hashHistory } from 'react-router'


const EventList = require(__dirname + '/event_list.jsx')
const DisplayUser = require(__dirname + '/display_user.jsx')
const EventForm = require(__dirname + '/event_form.jsx')
const UserForm = require(__dirname + '/user_form.jsx')


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
            toggle: toggleVar,
            addEvent: false})
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
  showModal: function(){
    var answer = !this.state.addEvent
    this.setState({addEvent: answer})
  },
  logout: function(){
    sessionStorage.removeItem('token')
    this.setState({user: '',
                   events: '',
                   toggle: true})
  },
  render: function(){
    var hide, show
    if (this.state.toggle){
      hide = {display: 'none'}
      show = {}
    } else {
      hide = {}
      show = {display: 'none'}
    }
    var hideModal, showModal
    if (this.state.addEvent){
      showModal = {  height: '100vh',
                     backgroundColor: 'rgba(0, 0, 0, .7)',
                     zIndex: 999,
                     padding: 'auto',
                     textAlign: 'center'}
      hideModal = {display: 'none'}
    } else {
      showModal = {display: 'none'}
      hideModal = {}
    }

    if(this.state.addEvent){
      return (
        <div>
          <section className="dashboard" style={hide}>
            <div className="container row">
              <div className="col-lg-4">
                <h2>Profile</h2>
                <DisplayUser className="row profile" user={this.state.user} />
                <UserForm className="row form" user={this.state.user}/>
              </div>
              <div className="col-lg-4" id="eventList">
                <h2>Events</h2>
                <EventList className="row events" user={this.state.user}/>
              </div>
              <div className="col-lg-4">
                <button className='btn btn-primary' onClick={this.showModal}>Make Event</button>
              </div>
            </div>
          </section>
        </div>
      )
    } else {
      return(
        <section className="fullModal" style={showModal}>
          <EventForm className="row form" />
        </section>
      )
  }
})
