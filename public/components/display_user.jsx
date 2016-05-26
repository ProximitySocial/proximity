const React = require('react')
const ReactDOM = require('react-dom')
var port = process.env.PORT

module.exports = React.createClass({
   getInitialState: function() {
     console.log('Getting initial state of display user class');
     console.log(this.props.user);
     return ({user: this.props.user})
   },
   componentWillReceiveProps: function() {
     if (this.props.user._id) {
       this.setState({
         user: this.props.user
       })
       console.log('Display User state has been set to user');
       console.log(this.props.user);
       console.log(this.state.user);
       this.handleInterests(this.props.user);
       this.handleNeighborhoods(this.props.user);
     }

   },
   // loadUserFromServer: function() {
   //   $.ajax({
   //     type: 'GET',
   //     url: '',
   //     dataType: 'json',
   //     cache: false,
   //     success: function(data) {
   //       console.log(data.lastName)
   //       this.setState({user:        data,
   //                      lastInitial: data.lastName.charAt(0)});
   //       this.handleInterests(data);
   //       this.handleNeighborhoods(data);
   //     }.bind(this),
   //     error: function(xhr, status, err) {
   //       console.error(this.props.url, status, err.toString());
   //     }.bind(this)
   //   });
   // },
   // componentWillMount: function() {
      // this.loadUserFromServer()
   // },
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
     console.log('inside display user render');
     console.log(this.props.user);
    //  if (this.props.user._id) {
    //    this.componentWillReceiveProps();
    //    this.props.user._id = null;
    //  }
     return (
       <div>
         <h3 className="userName">{this.props.user.firstName} {this.props.user.lastName}</h3>
         <img className="userPic" src={this.props.user.pic}/>
         <p><strong>Email: </strong>{this.props.user.email}</p>
         <p><strong>Member since: </strong>{this.props.user.created_at}</p>
         <p>{this.props.user.bio}</p>
         <h3>Interests:</h3>
         <ul className="interests">
           {this.props.interests}
         </ul>
         <h3>Neighborhoods:</h3>
         <ul className="neighborhoods">
           {this.props.neighborhoods}
         </ul>
       </div>
     )
   }
 })

 // ReactDOM.render(
 //   <DisplayUser url="http://localhost:" + port + "/api/user/573373c18026b52b5f052ea0"/>,
 //   document.getElementById('userProfile')
 // );
