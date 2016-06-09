import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
const App         = require(__dirname + '/components/app.jsx')
const Dashboard   = require(__dirname + '/components/dashboard.jsx')
// const EventForm   = require(__dirname + '/components/event_form.jsx')
// const EventList   = require(__dirname + '/components/event_list.jsx')
const EventView   = require(__dirname + '/components/event_view.jsx')
const Profile     = require(__dirname + '/components/display_user.jsx')
// const SingleEvent = require(__dirname + '/components/single_event.jsx')
// const UserForm    = require(__dirname + '/components/user_form.jsx')
const AdminDash       = require(__dirname + '/components/admin_dash.jsx')
const Admin           = require(__dirname + '/components/admin.jsx')



const Test = React.createClass({
  render: function() {
    return (<div><h1>TESTING</h1></div>)
  }
})

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="/event/:eventID/:userID" component={EventView}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/test" component={Test}/>
      <Route path="/admin" component={Admin}/>
    </Route>
  </Router>
), document.getElementById('root'))
