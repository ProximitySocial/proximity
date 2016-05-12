var sampleEvents = [{
  // "_id" : ObjectId("573373698026b52b5f052e57"),
  "created_at" : "Thu Dec 24 2015 00:22:12 GMT-0800 (PST)",
  "title" : "Architect Cotton redundant",
  "description" : "Praesentium tenetur sequi mollitia qui omnis iste illo quia minus. Labore dolor et ut officia iure. Aliquid totam voluptatibus repellat expedita ex quod. Odio ex inventore aperiam tempora.",
  "interestTags" : "drivingRange",
  "startTime" : "Sun Jan 31 2016 14:25:51 GMT-0800 (PST)",
  "endTime" : "Wed Jun 14 2023 18:25:54 GMT-0700 (PDT)",
  "address" : "404 Mohamed Springs",
  "addressName" : "pl",
  "_attendees" : [
    "5732af6c9a014b99ce613595",
    "5732af6c9a014b99ce61359d",
    "5732af6c9a014b99ce61359f",
    "5732af6c9a014b99ce613589",
    "5732af6c9a014b99ce61358e",
    "5732af6c9a014b99ce6135a9",
    "5732af6c9a014b99ce613598",
    "573253822503f4d80bd7862b",
    "5732af6c9a014b99ce6135a5"
  ],
  "_creator" : "5732af6c9a014b99ce613594",
  "picture" : "http://lorempixel.com/640/480/transport",
  "invitees" : [
    "5732af6c9a014b99ce613590",
    "5732af6c9a014b99ce61357d",
    "5732af6c9a014b99ce613588",
    "5732af6c9a014b99ce61357f",
    "5732af6c9a014b99ce61357a",
    "5732af6c9a014b99ce61357b",
    "5732af6c9a014b99ce6135ad",
    "5732af6c9a014b99ce6135ac",
    "5732af6c9a014b99ce613598"
  ]
},
{
  // "_id" : ObjectId("573373698026b52b5f052e53"),
  "created_at" : "Fri Oct 02 2015 14:11:45 GMT-0700 (PDT)",
  "title" : "Infrastructure",
  "description" : "At perferendis qui iusto aut consectetur. Sint autem dolorem. Error maxime sed officia sit.",
  "interestTags" : "cooking",
  "startTime" : "Tue Dec 01 2015 08:18:08 GMT-0800 (PST)",
  "endTime" : "Wed Oct 29 2025 20:22:23 GMT-0700 (PDT)",
  "address" : "5915 Bethel Brook",
  "addressName" : "id_ID",
  "_attendees" : [
    "5732af6c9a014b99ce61357d",
    "5732af6c9a014b99ce61358a",
    "5732af6c9a014b99ce613598"
  ],
  "_creator" : "5732af6c9a014b99ce613575",
  "picture" : "http://lorempixel.com/640/480/business",
  "invitees" : [
    "5732af6c9a014b99ce6135a5",
    "5732af6c9a014b99ce613593",
    "5732af6c9a014b99ce61358c",
    "5732af6c9a014b99ce6135a7",
    "5732af6c9a014b99ce61359b",
    "5732af6c9a014b99ce613589",
    "5732af6c9a014b99ce613586"
  ]
}];

const React = require('react')
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

// ReactDOM.render(
//   <EventList events={sampleEvents}/>,
//   document.getElementById('eventList')
// );
