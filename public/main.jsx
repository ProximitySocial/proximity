const port = process.env.PORT || 8080
const React = require('react')
const ReactDOM = require('react-dom')

// const { Router, Route, browserHistory, IndexRoute } = require('react-router');

const EventList = require(__dirname + '/components/event_list.jsx')
const DisplayUser = require(__dirname + '/components/display_user.jsx')
const CreateEventForm = require(__dirname + '/components/event_form.jsx')

// for testing purposes
var userId = "5732af6c9a014b99ce613583"
var userUrl = "http://localhost:6060/api/user/" + userId
console.log(userUrl)
var eventId = "57325f56bbeeba1e0d9bb353"
var eventsUrl = "/api/events"
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

ReactDOM.render(
   <DisplayUser url={userUrl}/>,
   document.getElementById('userProfile'))
ReactDOM.render( <EventList url={eventsUrl} />, document.getElementById('eventList'))

ReactDOM.render( <CreateEventForm />, document.getElementById('eventForm'))
