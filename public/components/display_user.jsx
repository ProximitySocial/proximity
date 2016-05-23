const React = require('react')
const ReactDOM = require('react-dom')
var port = process.env.PORT

module.exports = React.createClass({
   getInitialState: function() {
     return {user: {}}
   },
   loadUserFromServer: function() {
     $.ajax({
       type: 'GET',
       url: this.props.url,
       dataType: 'json',
       cache: false,
       success: function(data) {
         console.log(data.lastName)
         this.setState({user:        data,
                        lastInitial: data.lastName.charAt(0)});
         this.handleInterests(data);
         this.handleNeighborhoods(data);
       }.bind(this),
       error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
       }.bind(this)
     });
   },
   componentWillMount: function() {
      this.loadUserFromServer()
   },
   handleUpdate: function(){
     console.log('make a request to handleUpdate')
   },
   handleInterests: function(data) {
     console.log(data.interests);
     var rows = [];
     data.interests.forEach(function(interest, index) {
       rows.push(<li key={index}><a>#{interest}</a></li>);
     });
     this.setState({interests: rows});
   },
   handleNeighborhoods: function(data) {
     console.log(data.neighborhoods);
     var rows = [];
     data.neighborhoods.forEach(function(neighborhood, index) {
       rows.push(<li key={index}><a>#{neighborhood}</a></li>);
     });
     this.setState({neighborhoods: rows});
   },
   render: function() {

     return (
       <div>
         <h3 className="userName">{this.state.user.firstName} {this.state.lastInitial}.</h3>
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

 // ReactDOM.render(
 //   <DisplayUser url="http://localhost:" + port + "/api/user/573373c18026b52b5f052ea0"/>,
 //   document.getElementById('userProfile')
 // );
