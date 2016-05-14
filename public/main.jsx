const port = process.env.PORT
const React = require('react')
const ReactDOM = require('react-dom')

// const { Router, Route, browserHistory, IndexRoute } = require('react-router');

const EventList = require(__dirname + '/components/event_list.jsx')
const DisplayUser = require(__dirname + '/components/display_user.jsx')
const CreateEventForm = require(__dirname + '/components/event_form.jsx')

// require('font-awesome/css/font-awesome.css')
require('normalize-css')
require(__dirname + "/sass/main.scss")


//render((
//  <Router history={browserHistory}>
//    <Route path="/" component={ App }>

      // <Route path="/program-highlights" component={ ProgramHighlights }/>
      // <Route path="/contact"  component={ Contact }/>

//    </Route>
//  </Router>
//), document.getElementById('root'))

ReactDOM.render( <EventList />, document.getElementById('eventList'))

ReactDOM.render(
   <DisplayUser url="http://localhost:" + port + "/api/user/573373c18026b52b5f052ea0"/>,
   document.getElementById('userProfile'))
ReactDOM.render( <CreateEventForm />, document.getElementById('form'))
