import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'

const Dashboard = require(__dirname + '/dashboard.jsx')
const EventForm = require(__dirname + '/event_form.jsx')
const EventList = require(__dirname + '/event_list.jsx')
const EventView = require(__dirname + '/event_view.jsx')
const Profile = require(__dirname + '/display_user.jsx')
const port = process.env.PORT || 8080
const SingleEvent = require(__dirname + '/single_event.jsx')
const UserForm = require(__dirname + '/user_form.jsx')

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function resizeImage(maxW, maxH){
  var MAX_WIDTH = maxW || 800;
  var MAX_HEIGHT = maxH || 600;
  var width = img.width;
  var height = img.height;

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width;
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height;
      height = MAX_HEIGHT;
    }
  }
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
}

module.exports = React.createClass({
  getInitialState: function(){
    if (sessionStorage.token){
      // console.log('Yes there is a sessionStorage token')
      var userObj = sessionStorage.token
      var toggleVar = false
    } else {
      var userObj = ''
      var toggleVar = true
    }
    return ({user: userObj,
            events: '',
            toggle: toggleVar,
            hideForm: true})
  },
  logout: function(){
    sessionStorage.removeItem('token')
    this.setState({user: '',
                   events: '',
                   toggle: true})
  },
  render: function(){
    var hiddenBtn, showBtn
    if (this.state.toggle){
      hiddenBtn = {display: "none"}
      showBtn = {}
    } else {
      hiddenBtn = {}
      showBtn = {display: "none"}
    }
    return (
      <div>
        <section>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container nav-contain">
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="logo"><Link to='/'><span className="one">V</span><span className="two">I</span><span className="three">V</span><span className="four">A</span><span className="city">city</span></Link></li>
                  <li><Link to='/test'>Test</Link></li>
                  <li><Link to='/profile'>Profile</Link></li>
                </ul>
                <div class='spacer'></div>
                <div style={showBtn}>
                    <a className="btn fb-login"  id="fbLogin" href="/api/auth/facebook" role="button">Facebook Login &raquo;</a>
                </div>
                <div style={hiddenBtn}>
                    <button className="btn fb-login" id="fbLogin" onClick={this.logout} role="button">Logout &raquo;</button>
                </div>
              </div>
            </div>
          </nav>
        </section>
        {this.props.children}
      </div>
    )
  }
})
