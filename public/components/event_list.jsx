const React = require('react')
const ReactDOM = require('react-dom')
var SingleEvent = require(__dirname + '/single_event.jsx')
var port = process.env.PORT


module.exports = React.createClass({
  getInitialState: function() {
    return {events: []}
  },
  componentWillReceiveProps: function() {
    console.log('inside compoennt did mount');
    console.log(this.props.user._id);
    if (this.props.user._id) {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:2323/api/events/' + this.props.user._id,
        dataType: 'json',
        cache: false,
        success: function(data){
          console.log('Successfully retrieved DATA');
          console.log(data);
          this.setState({events: data.events})
          this.handleEvents(this.state.events)
          this.props.user._id = null;
        }.bind(this),
        error: function(xhr, status, err){
          console.error(this.props.url, status, err)
          this.props.user._id = null;
        }.bind(this)
      })
    }
  },
  handleEvents: function(events){
    var rows = []
    console.log('inside handle events');
    console.log(events);
    if (events) {
      events.forEach(function(event, index) {
        rows.push(<SingleEvent event={event} key={index} />)
      })
      console.log('Rendering Event List')
      this.setState({rowes: rows})
    }

  },
  render: function() {
    console.log('inside event list render');
    console.log(this.props.user._id);
    if (this.props.user._id) {
      this.componentWillReceiveProps();
      this.props.user._id = null;
    }
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
