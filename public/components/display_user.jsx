import React from 'react'
import { ReactDOM } from 'react-dom'

module.exports = React.createClass({
   getInitialState: function() {
     console.log('Getting initial state of display user class');
     console.log(this.props.user);
     return ({user: this.props.user,
              neighborhoods: []})
   },
   componentWillReceiveProps: function(nextProps) {
      this.handleNeighborhoods(nextProps.user)
      this.handleInterests(nextProps.user)
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
     console.log('inside display user render');
     console.log(this.props.user);
     var interests = this.state.interests
     var neighborhoods = this.state.neighborhoods
     // var hoods = this.handleNeighborhoods(this.props.user)
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
           {interests}
         </ul>
         <h3>Neighborhoods:</h3>
         <ul className="neighborhoods">
           {neighborhoods}
         </ul>
       </div>
     )
   }
 })
