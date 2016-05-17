const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')

// const { Router, Route, browserHistory, IndexRoute } = require('react-router');

const EventList = require(__dirname + '/components/event_list.jsx')
const DisplayUser = require(__dirname + '/components/display_user.jsx')
const CreateEventForm = require(__dirname + '/components/event_form.jsx')
const CreateUserForm = require(__dirname + '/components/user_form.jsx')


// for testing purposes
var userId = "573373c18026b52b5f052ea0"
var userUrl = "/api/user/" + userId
var eventId = "573373698026b52b5f052e57"
var eventsUrl = "/api/events/"
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
ReactDOM.render( <EventList url={eventsUrl} />, document.getElementById('eventList'))
ReactDOM.render( <CreateEventForm />, document.getElementById('eventForm'))
