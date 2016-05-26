const React = require('react')
const ReactDOM = require('react-dom')

module.exports = React.createClass({
  getInitialState: function(){
    return {event: this.props.event}
  },
  componentDidMount: function(){
    this.setState({timeTill: 'NOW'})
  },
  render: function() {
    if (!this.props.event.picture) {
      this.props.event.picture = "http://lorempixel.com/640/480/transport"
    }
    var divStyle = {background: "url(" + this.props.event.picture + ") center center",
                    minHeight: "25rem",
                    margin: 0,
                    verticalAlign: "bottom"}

    var startTime = Date(this.props.event.startTime).toString().split(' ')
    console.log(startTime)
    var day = startTime


    return (
      <li>
        <div className="eventPicture" style={divStyle}>
          <div className="eventTitle">
            <h3 style={{marginTop:0}}>{this.props.event.title}</h3>
          </div>
        </div>
        <div className="eventDetails">
          <h4><strong>@</strong>  {this.props.event.addressName}</h4>
          <p><strong>Starts in:</strong>  {Date(startTime)}  ({day})</p>
          <p><strong>Tags:</strong>  #{this.props.event.interestTags}</p>
          <p><strong>Neighborhood:</strong>  {this.props.event.neighborhood}</p>
          <p><strong>ID:</strong>   {this.props.event._id}</p>
          <div className="eventAttCount">
            <h3>{this.props.event._attendees.length}</h3>
            <p>&nbsp;&nbsp;attendees</p>
          </div>
        </div>
      </li>
    )
  }
})
