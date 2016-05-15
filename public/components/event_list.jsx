const React = require('react')
const ReactDOM = require('react-dom')
var SingleEvent = require(__dirname + '/single_event.jsx')
var port = process.env.PORT


module.exports = React.createClass({
  getInitialState: function() {
    return {events: []}
  },
  componentDidMount: function() {
    $.ajax({
      type: 'GET',
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('Successfully retrieved DATA');
        this.setState({events: data})
        this.handleEvents(this.state.events)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err)
      }.bind(this)
    })
  },
  handleEvents: function(events){
    var rows = []
    events.forEach(function(event, index) {
      rows.push(<SingleEvent event={event} key={index} />)
    })
    console.log('Rendering Event List')
    this.setState({rowes: rows})
  },
  render: function() {
    return (
      <div className="eventList">
        <ul>
          {this.state.rowes}
        </ul>
      </div>
    )
  }
})

// ReactDOM.render(
//   <EventList url="http://localhost:" + port + "/api/events"/>,
//   document.getElementById('eventList')
// )
