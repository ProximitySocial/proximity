const React = require('react')
const ReactDOM = require('react-dom')
import { Router, Route, Link, hashHistory } from 'react-router'
const UserForm = require(__dirname + '/user_form.jsx')

module.exports = React.createClass({
  getInitialState: function(){
    return ({user: '',
            toggle: false,
            toggleEventModal: false,
            toggleUserModal: false})
  },
  componentWillMount: function(){
    this.setState({user: this.props.user})
    this.handleInterests();
    this.handleNeighborhoods();
  },
  showUserModal: function(){
    var answer = !this.state.toggleUserModal
    this.setState({toggleUserModal: answer})
  },
  showEventModal: function(){
    var answer = !this.state.toggleEventModal
    this.setState({toggleEventModal: answer})
  },
  handleInterests: function() {
    console.log(this.props.user.interests);
    var rows = [];
    this.props.user.interests.forEach(function(interest, index) {
      rows.push(<li key={index}><a>#{interest}</a></li>);
    });
    this.setState({interests: rows});
  },
  handleNeighborhoods: function() {
    console.log(this.props.user.neighborhoods);
    var rows = [];
    this.props.user.neighborhoods.forEach(function(neighborhood, index) {
      rows.push(<li key={index}><a>#{neighborhood}</a></li>);
    });
    this.setState({neighborhoods: rows});
  },
  render: function() {
    var hiddenVar = {display: 'none'}
      var showVar = {}
      var modalObj = { position: 'absolute',
                       height: '100%',
                       width: '100%',
                       background: 'rgba(0, 0, 0, .7)',
                       zIndex: 999,
                       padding: 'auto',
                       textAlign: 'center'}
      var hide, show
      if (this.state.toggle){
        hide = hiddenVar
        show = showVar
      } else {
        hide = showVar
        show = hiddenVar
      }
      //Event modal
      var hideModal, showModal
      if (this.state.toggleEventModal){
        showModal = modalObj
        hideModal = hiddenVar
      } else {
        showModal = hiddenVar
        hideModal = showVar
      }
      //User modal
      var hideUserModal, showUserModal
      if (this.state.toggleUserModal) {
        showUserModal = modalObj
        hideUserModal = hiddenVar
      } else {
        showUserModal = hiddenVar
        hideUserModal = showVar
      }
    return (
        <li><div>
          <h3 className="userName">{this.props.user.firstName} {this.props.user.lastName}</h3>
          <img className="userPic" src={this.props.user.pic}/>
          <p><strong>Email: </strong>{this.props.user.email}</p>
          <p><strong>Member since: </strong>{this.props.user.created_at}</p>
          <p>{this.props.user.bio}</p>
          <h3>Interests:</h3>
          <ul className="interests">
            {this.state.interests}
          </ul>
          <h3>Neighborhoods:</h3>
          <ul className="neighborhoods">
            {this.state.neighborhoods}
          </ul>
          <button className='btn editRound' onClick={this.showUserModal}>Edit</button>
          <section className="fullModal" style={showUserModal}>
            <UserForm className="row form" toggleUserModal={this.showUserModal} user={this.state.user}/>
          </section>
        </div></li>
    )
  }
})
