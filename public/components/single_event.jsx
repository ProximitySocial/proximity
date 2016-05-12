const React = require('react')

module.exports = React.createClass({
  render: function() {
    return (
      <li>
        <h3>{this.state.event.title}</h3>
        <p>{this.state.event.description}</p>
        <p><strong>Address:</strong> {this.state.event.address}</p>
        <p><strong>Start:</strong> {this.state.event.startTime}</p>
        <p><strong>End:</strong> {this.state.event.endTime}</p>
        <p>{this.state.event._attendees.length} attendees</p>
      </li>
    )
  }
})
