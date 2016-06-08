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
   handleUpdate: function(){
     console.log('make a request to handleUpdate')
   },
   handleInterests: function(user) {
     console.log(user.interests);
     var rows = [];
     user.interests.forEach(function(interest, index) {
       rows.push(<li key={index}>#{interest}</li>);
     });
     this.setState({interests: rows});
   },
   handleNeighborhoods: function(user) {
     console.log(user.neighborhoods);
     var rows = [];
     user.neighborhoods.forEach(function(neighborhood, index) {
       rows.push(<li key={index}>{neighborhood}</li>);
     });
     this.setState({neighborhoods: rows});
   },
   render: function() {
     console.log('inside display user render');
     console.log(this.props.user)
     var interests = this.state.interests
     var neighborhoods = this.state.neighborhoods
     var lastInitial = this.props.user.lastName ? this.props.user.lastName.charAt(0) : ''
     return (
       <div className="userContainer">
        <div className="userTop">
           <img className="userPic" src={this.props.user.pic}/>
           <div>
             <h3 className="userName">{this.props.user.firstName} {lastInitial}.</h3>
             <h3 className="userHeader">Neighborhoods:</h3>
             <ul className="userNeighborhoods">
               {neighborhoods}
             </ul>
           </div>
        </div>
         <div className="userHeader">Tagline:</div>
         <div className="userBio"><i>{this.props.user.bio}</i></div>
         <div className="userHeader">Interests:</div>
         <ul className="userInterests">
           {interests}
         </ul>
       </div>
     )
   }
 })
