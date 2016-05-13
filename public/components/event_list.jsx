var SingleEvent = React.createClass({
  render: function() {
    return (
      <li>
        <h3>{this.props.event.title}</h3>
        <p>{this.props.event.description}</p>
        <p><strong>Address:</strong> {this.props.event.address}</p>
        <p><strong>Start:</strong> {this.props.event.startTime}</p>
        <p><strong>End:</strong> {this.props.event.endTime}</p>
        <p>{this.props.event._attendees.length} attendees</p>
      </li>
    )
  }
});

var EventList = React.createClass({
  getInitialState: function() {
    console.log('Getting initial state');
    return {events: []};
  },
  componentDidMount: function() {
    console.log('Mounting.....');
    console.log(this.props.url);
    $.ajax({
      type: 'GET',
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('Successfully retrieved DATA');
        console.log(typeof data);
        this.setState({events: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {

    var rows = [];
    // var lastCategory = null;
    this.state.events.forEach(function(event) {
      // if (event.category !== lastCategory) {
      //   rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      // }
      rows.push(<SingleEvent event={event} key={event.created_at}/>);
      // lastCategory = product.category;
    });
    console.log('Rendering Event List')
    console.log(this.props);
    return (
      <div className="eventList">
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(
  <EventList url="http://localhost:5447/api/events"/>,
  document.getElementById('eventList')
);
