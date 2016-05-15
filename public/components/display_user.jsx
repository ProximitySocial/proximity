const React = require('react')
const ReactDOM = require('react-dom')
var port = process.env.PORT

module.exports = React.createClass({
   loadUserFromServer: function() {
     $.ajax({
       type: 'GET',
       url: this.props.url,
       dataType: 'json',
       cache: false,
       success: function(data) {
         this.setState({user: data});
         this.handleInterests(data);
       }.bind(this),
       error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
     });
   },
   getInitialState: function() {
     return {user: {}}
   },
   componentDidMount: function() {
      this.loadUserFromServer();
   },
   handleInterests: function(data) {
     console.log(data.interests);
     var rows = [];
     data.interests.forEach(function(interest, index) {
       rows.push(<li key={index}>{interest}</li>);
     });
     this.setState({interests: rows});
   },
   render: function() {
     return (
       <div>
         <img src={this.state.user.pic}/>
         <h3>{this.state.user.firstName} {this.state.user.lastName}</h3>
         <p><strong>Email: </strong>{this.state.user.email}</p>
         <p><strong>Member since: </strong>{this.state.user.created_at}</p>
         <p>{this.state.user.bio}</p>
         <h3>Interests:</h3>
         <ul>
           {this.state.interests}
         </ul>
       </div>
     )
   }
 })

 // ReactDOM.render(
 //   <DisplayUser url="http://localhost:" + port + "/api/user/573373c18026b52b5f052ea0"/>,
 //   document.getElementById('userProfile')
 // );
