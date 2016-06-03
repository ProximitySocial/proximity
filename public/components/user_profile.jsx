const React = require('react')
const ReactDOM = require('react-dom')
var port = process.env.PORT

module.exports = React.createClass({
  getInitialState: function() {
    if (sessionStorage.token){
      console.log('Yes there is a sessionStorage token')
      console.log(sessionStorage.token)
      var userObj = sessionStorage.token
      var toggleVar = false
    } else {
      console.log('No token')
      var userObj = ''
      var toggleVar = true
    }
    return ({user: userObj,
            toggle: toggleVar})
  },
  componentDidMount: function() {
    // if (!this.state.user){
    //     var token = getParameterByName('access_token')
    //     sessionStorage.setItem('token', token)
    // }
    $.ajax({
      type: 'GET',
      url: '/api/user/' + sessionStorage.token,
      success: (data, status) => {
        console.log(data)
        console.log(status)
        this.setState({
          user: data,
          toggle: false
        })
        this.handleInterests(data);
        this.handleNeighborhoods(data);
        console.log('this is toggle: ' + this.state.toggle);
      },
      error: (xhr, status, error) => {
        console.log(xhr)
        console.log(status)
        console.log(error)
      }
    })
  },
  handleInterests: function(user) {
    console.log(user.interests);
    var rows = [];
    user.interests.forEach(function(interest, index) {
      rows.push(<li key={index}><a>#{interest}</a></li>);
    });
    this.setState({interests: rows});
  },
  handleNeighborhoods: function(user) {
    console.log(user.neighborhoods);
    var rows = [];
    user.neighborhoods.forEach(function(neighborhood, index) {
      rows.push(<li key={index}><a>#{neighborhood}</a></li>);
    });
    this.setState({neighborhoods: rows});
  },
  render: function() {
    return (
      <div>
        <h3 className="userName">{this.state.user.firstName} {this.state.user.lastName}</h3>
        <img className="userPic" src={this.state.user.pic}/>
        <p><strong>Email: </strong>{this.state.user.email}</p>
        <p><strong>Member since: </strong>{this.state.user.created_at}</p>
        <p>{this.state.user.bio}</p>
        <h3>Interests:</h3>
        <ul className="interests">
          {this.state.interests}
        </ul>
        <h3>Neighborhoods:</h3>
        <ul className="neighborhoods">
          {this.state.neighborhoods}
        </ul>
      </div>
    )
  }
})
