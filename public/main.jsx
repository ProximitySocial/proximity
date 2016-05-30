const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')

// const { Router, Route, browserHistory, IndexRoute } = require('react-router');

const EventList = require(__dirname + '/components/event_list.jsx')
const DisplayUser = require(__dirname + '/components/display_user.jsx')
const EventForm = require(__dirname + '/components/event_form.jsx')
const UserForm = require(__dirname + '/components/user_form.jsx')

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var RootApp = React.createClass({
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
      url: 'http://localhost:6060/api/user/' + sessionStorage.token,
      headers: {'Access-Control-Allow-Origin': 'http://localhost:6060'},
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
                </ul>
              </div>
            </div>
          </nav>
        </section>
        <section style={classHide}>
          <div className="container row">
            <div className="col-lg-4 column">
              <h2>Profile</h2>
              <DisplayUser className="row profile" user={this.state.user} />
              <UserForm className="row form" />
            </div>
            <div className="col-lg-4 column" id="eventList">
              <h2>Events</h2>
              <EventList className="row events" user={this.state.user}/>
            </div>
            <div className="col-lg-4 column">
              <h2 className="btn btn-primary" onClick={this.showForm}>Add Event</h2>
              <div style={hidden}>
                <EventForm className="row form" />
              </div>
            </div>
          </div>
        </section>
      </div>
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
// ReactDOM.render( <UserForm />, document.getElementById('userForm'))
// ReactDOM.render( <UpdateUserForm url={userUrl}/>, document.getElementById('userUpdate'))


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


// ReactDOM.render( <EventForm />, document.getElementById('eventForm'))
// ReactDOM.render( <UpdateEventForm url={eventUrl}/>, document.getElementById('eventUpdate'))
// ReactDOM.render( <RootApp />, document.getElementById('root'))
