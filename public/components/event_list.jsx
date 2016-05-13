const React = require('react')
const ReactDOM = require('react-dom')
var SingleEvent = require(__dirname + '/single_event')

module.exports = React.createClass({
  getInitialState: function() {
    return {events: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
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

    return (
      <div className="eventList">
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
});

// ReactDOM.render( <EventList events={sampleEvents}/>,
//                   document.getElementById('eventList'));
