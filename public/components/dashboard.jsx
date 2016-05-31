const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, Link, hashHistory } from 'react-router'


const EventList = require(__dirname + '/event_list.jsx')
const DisplayUser = require(__dirname + '/display_user.jsx')
const EventForm = require(__dirname + '/event_form.jsx')
const UserForm = require(__dirname + '/user_form.jsx')


// // for testing purposes
// var userId = "574390a51831bd0d9abfe74a"
// var userUrl = "/api/user/" + userId
// var eventUrl = "/api/events/" + userId
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
            events: [],
            toggle: toggleVar,
            addEvent: false,
            addUser: false})
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
  showUserModal: function(){
    var answer = !this.state.addUser
    this.setState({addUser: answer})
  },
  showEventModal: function(){
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
    var hiddenVar = {display: 'none'}
    var showVar = {}
    var modalObj = { position: 'absolute',
                     height: '100%',
                     width: '100%',
                     background: 'rgba(0, 0, 0, .7)',
                     zIndex: 999,
                     padding: 'auto',
                     textAlign: 'center'}
    var hide, show
    if (this.state.toggle){
      hide = hiddenVar
      show = showVar
    } else {
      hide = showVar
      show = hiddenVar
    }
    //Event modal
    var hideModal, showModal
    if (this.state.addEvent){
      showModal = modalObj
      hideModal = hiddenVar
    } else {
      showModal = hiddenVar
      hideModal = showVar
    }
    //User modal
    var hideUserModal, showUserModal
    if (this.state.addUser) {
      showUserModal = modalObj
      hideUserModal = hiddenVar
    } else {
      showUserModal = hiddenVar
      hideUserModal = showVar
    }
    return (
      <div>
        <section className="dashboard" style={hide}>
          <div className="container row">
            <div className="col-lg-4">
              <div className="dashHeader">
                <h2>Profile</h2>
                <div className='spacer'></div>
                <button className='btn editRound' onClick={this.showUserModal}>Edit</button>
              </div>
              <DisplayUser className="row profile" user={this.state.user} />
            </div>
            <section className="fullModal" style={showUserModal}>
              <UserForm className="row form" user={this.state.user}/>
            </section>
            <div className="col-lg-4" id="eventList">
              <h2>Events</h2>
              <EventList className="row events" user={this.state.user}/>
            </div>
            <div className="col-lg-4">
              <button className='btn btn-primary' onClick={this.showEventModal}>Make Event</button>
            </div>
             <section className="fullModal" style={showModal}>
              <EventForm className="row form" />
            </section>
          </div>
        </section>
      </div>
    )
  }
})
