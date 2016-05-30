import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { IndexRoute } from 'react-router'
const port = process.env.PORT || 8080
const Dashboard = require(__dirname + '/components/dashboard.jsx')
const EventList = require(__dirname + '/components/event_list.jsx')
const Profile = require(__dirname + '/components/display_user.jsx')
const CreateEventForm = require(__dirname + '/components/event_form.jsx')
const CreateUserForm = require(__dirname + '/components/user_form.jsx')
const SingleEvent = require(__dirname + '/components/single_event.jsx')
const EventView = require(__dirname + '/components/event_view.jsx')

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var App = React.createClass({
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
        this.setState({
          user: data,
          toggle: false
        })
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
  showForm: function(){
    var state = !this.state.hideForm
    this.setState({hideForm: state})
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
    console.log('Grabbing App Children');
    console.log(this.props.children);
    var hidden
    if (this.state.hideForm){
      hidden = {display: "none"}
    } else {
      hidden = {}
    }
    return (
      <div>
        <section>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container nav-contain">
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="logo"><Link to='/'><span className="one">V</span><span className="two">I</span><span className="three">V</span><span className="four">A</span><span className="city">city</span></Link></li>
                  <li style={classShow}>
                      <a className="btn fb-login"  id="fbLogin" href="/api/auth/facebook" role="button">Facebook Login &raquo;</a>
                  </li>
                  <li style={classHide}>
                      <a className="btn fb-login" id="fbLogin" onClick={this.logout} role="button">Logout &raquo;</a>
                  </li>
                  <li><Link to='/test'>Test</Link></li>
                  <li><Link to='/profile'>Profile</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
        {this.props.children}
      </div>
    )
  }
})

const Test = React.createClass({
  render: function() {
    return (<div><h1>TESTING</h1></div>)
  }
})

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="/event/:id" component={EventView}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/test" component={Test}/>
    </Route>
  </Router>
), document.getElementById('root'))

