const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, Link, hashHistory } from 'react-router'

const SingleUser = require(__dirname + '/single_user.jsx')
var port = process.env.PORT


module.exports = React.createClass({
  getInitialState: function() {
    return ({users: []})
  },
  // propTypes: function(){
  //   user: React.PropTypes.object.isRequired
  // },
  // componentWillReceiveProps: function(nextProps) {
  //   this.handleGetEvents(nextProps.user)
  // },
  componentWillMount: function() {
    $.ajax({
      type: 'GET',
      url: '/api/users/',
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log('Successfully retrieved USERS');
        console.log(data);
        this.setState({users: data})
        this.handleUsers(this.state.users)
      }.bind(this),
      error: function(xhr, status, err){
        console.error(xhr, status, err)
      }.bind(this)
    })
  },
  // handleGetEvents: function(user){
  //   if (user._id) {
  //     $.ajax({
  //       type: 'GET',
  //       url: '/api/events/' + user._id,
  //       dataType: 'json',
  //       cache: false,
  //       success: function(data){
  //         console.log('Successfully retrieved DATA');
  //         this.setState({events: data.events, userID: user._id})
  //         this.handleUsers(this.state.events, user._id)
  //       }.bind(this),
  //       error: function(xhr, status, err){
  //         console.error(this.props.url, status, err)
  //       }.bind(this)
  //     })
  //   }
  // },
  handleUsers: function(users){
    console.log('Handling Users from User List');
    console.log(users.length);
    var rows = []
    if (users) {
      users.forEach(function(user, index) {
        rows.push(<SingleUser user={user} key={index} />)
      })
      this.setState({rowes: rows})
    }
  },
  render: function() {
    return (
      <div className="userList">
        <ul>
          {this.state.rowes}
        </ul>
      </div>
    )
  }
})
