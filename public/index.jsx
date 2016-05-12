
const React = require('react');
const { render } = require('react-dom');
const { Router, Route, browserHistory, IndexRoute } = require('react-router');

const EventList = require(__dirname + '/components/event_list');
// const Contact = require(__dirname + '/components/contact');
// const InfiniteScroll = require(__dirname + '/components/infinite-scroll');
// const ProgramHighlights = require(__dirname + '/components/program-highlights');

// require('font-awesome/css/font-awesome.css')
require('normalize-css');
require(__dirname + "/sass/main.scss");


//render((
//  <Router history={browserHistory}>
//    <Route path="/" component={ App }>

      // <Route path="/program-highlights" component={ ProgramHighlights }/>
      // <Route path="/contact"  component={ Contact }/>

//    </Route>
//  </Router>
//), document.getElementById('root'))

render(
  <EventList />,
  document.getElementById('eventList')
)
