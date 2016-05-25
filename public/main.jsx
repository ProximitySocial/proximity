const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')

// const { Router, Route, browserHistory, IndexRoute } = require('react-router');

const EventList = require(__dirname + '/components/event_list.jsx')
const DisplayUser = require(__dirname + '/components/display_user.jsx')
const CreateEventForm = require(__dirname + '/components/event_form.jsx')
const CreateUserForm = require(__dirname + '/components/user_form.jsx')
const UpdateEventForm = require(__dirname + '/components/event_update.jsx')
const UpdateUserForm = require(__dirname + '/components/user_update.jsx')


// for testing purposes
var userId = "574390a51831bd0d9abfe749"
var userUrl = "/api/user/" + userId
var eventUrl = "/api/events/" + userId
// var eventUrl = "http://localhost:6060/api/event/" + eventId



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

ReactDOM.render( <DisplayUser url={userUrl}/>, document.getElementById('userProfile'))
ReactDOM.render( <CreateUserForm />, document.getElementById('userForm'))
ReactDOM.render( <UpdateUserForm url={userUrl}/>, document.getElementById('userUpdate'))

ReactDOM.render( <EventList url={userId}/>, document.getElementById('eventList'))

ReactDOM.render( <CreateEventForm />, document.getElementById('eventForm'))
ReactDOM.render( <UpdateEventForm url={eventUrl}/>, document.getElementById('eventUpdate'))
