const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')

// const { Router, Route, browserHistory, IndexRoute } = require('react-router');

const EventList = require(__dirname + '/components/event_list.jsx')
const DisplayUser = require(__dirname + '/components/display_user.jsx')
const CreateEventForm = require(__dirname + '/components/event_form.jsx')
const CreateUserForm = require(__dirname + '/components/user_form.jsx')
const UpdateUserForm = require(__dirname + '/components/user_update.jsx')


// for testing purposes
var userId = "574390a51831bd0d9abfe74a"
var userUrl = "/api/user/" + userId
var eventUrl = "/api/events/" + userId
// var eventUrl = "http://localhost:2323/api/event/" + eventId
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    location.href = 'localStorage:6060/'
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var RootApp = React.createClass({
  getInitialState: function(){
    if (localStorage.token){
      console.log('Yes there is a localStorage token')
      var userObj = localStorage.token
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
  componentWillMount: function() {
    var token = getParameterByName('access_token')
    localStorage.setItem('token', token)
    console.log('here is the user before making a call to get it')
    console.log(this.state.user)
    if (!this.state.user){
      $.ajax({
        type: 'GET',
        url: 'http://localhost:6060/api/user/' + token,
        headers: {'Access-Control-Allow-Origin': 'http://localhost:6060'},
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
          console.log('this is toggle: ' + toggle);
        },
        error: (xhr, status, error) => {
          console.log(xhr)
          console.log(status)
          console.log(error)
        }
      })
    }
  },
  logout: function(){
    localStorage.removeItem('token')
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
        <section>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">Common Radar</a>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">

                  <li className="active"><a href="">Interests</a></li>
                  <li><a href="">Search Me</a></li>
                  <li style={classShow}>
                      <a className="btn btn-primary fb-login"  id="fbLogin" href="/api/auth/facebook" role="button">Facebook Login &raquo;</a>
                  </li>
                  <li style={classHide}>
                      <a className="btn btn-primary" id="fbLogin" onClick={this.logout} role="button">Logout &raquo;</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
        <section style={classHide}>
          <div className="container row">
            <h2>Profile</h2>
            <div className="col-lg-4">
              <DisplayUser className="row profile" user={this.state.user} />
              <CreateUserForm className="row form" user={this.state.user}/>
            </div>
            <h2>Events</h2>
            <div className="col-lg-4" id="eventList">
              <EventList className="row events" user={this.state.user}/>
            </div>
            <h2>CreateEvent</h2>
            <div className="col-lg-4">
              <CreateEventForm className="row form" />
              <div className="row form" id="eventUpdate"></div>
            </div>
          </div>
      </section>
    )
  }
})

// require('font-awesome/css/font-awesome.css')
// require('normalize-css')

// require(__dirname + "/sass/main.scss")


//render((
//  <Router history={browserHistory}>
//    <Route path="/" component={ App }>

      // <Route path="/program-highlights" component={ ProgramHighlights }/>
      // <Route path="/contact"  component={ Contact }/>

//    </Route>
//  </Router>
//), document.getElementById('root'))
// ReactDOM.render( <CreateUserForm />, document.getElementById('userForm'))
// ReactDOM.render( <UpdateUserForm url={userUrl}/>, document.getElementById('userUpdate'))

// ReactDOM.render( <EventList url={userId}/>, document.getElementById('eventList'))

// ReactDOM.render( <CreateEventForm />, document.getElementById('eventForm'))
// ReactDOM.render( <UpdateEventForm url={eventUrl}/>, document.getElementById('eventUpdate'))
ReactDOM.render( <RootApp />, document.getElementById('root'))
