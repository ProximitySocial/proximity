const React = require('react')
const ReactDOM = require('react-dom')

module.exports = React.createClass({

  render: function() {
    var divStyle = {backgroundImage: "url(" + this.props.event.picture + ")"}
    return (
      <li style={divStyle}>
        <h3>{this.props.event.title}</h3>
        <p>{this.props.event.description}</p>
        <p><strong>Address:</strong> {this.props.event.address}</p>
        <p><strong>Start:</strong> {this.props.event.startTime}</p>
        <p><strong>End:</strong> {this.props.event.endTime}</p>
        <p>{this.props.event._attendees.length} attendees</p>
      </li>
    )
  }
})
