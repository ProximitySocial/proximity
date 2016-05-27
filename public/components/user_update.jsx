const React = require('react');
const ReactDOM = require('react-dom')

module.exports = React.createClass({
      displayName: 'UpdateUserForm',
      getInitialState: function() {
        return({
                firstName: '',
                lastName: '',
                email: ''});
      },
      handleFirstChange: function(e) {
        console.log('First Name ' + e.target.value);
        this.setState({firstName: e.target.value});
      },
      handleLastChange: function(e) {
        console.log('Last Name ' + e.target.value);
        this.setState({lastName: e.target.value});
      },
      handleEmailChange: function(e) {
        console.log('Email ' + e.target.value);
        this.setState({email: e.target.value});
      },
      handleSubmit: function(e) {
        e.preventDefault()

        var firstName = this.state.firstName.trim()
        var lastName = this.state.lastName.trim()
        var email = this.state.email.trim()

        // var picture = this.state.file
        // if (!firstName || !lastName || !email) return
        this.onFormSubmit({
          firstName: firstName,
          lastName: lastName,
          email: email
        });
        this.setState({firstName: '', lastName: '', email: ''});
      },
      // onFormSubmit: function(newUser) {
      //   console.log('Submittiing update user form');
      //   console.log(this.props.url);
      //   $.ajax({
      //     type: 'PUT',
      //     url: this.props.url,
      //     data: JSON.stringify(newUser),
      //     contentType: 'application/json',
      //     success: function(data){
      //       console.log(data)
      //       console.log('SUCCESS')
      //     },
      //     error: function(data, status, jqXHR){
      //       console.log(data)
      //       console.log(status)
      //       console.log(jqXHR)
      //     }
      //   })
      // },
      onFormSubmit: function(newEvent, callback) {
        if(this.state.userId){
          var crudType = 'PUT'
          var route = '/api/user/' + this.state.userId
        } else {
          var crudType = 'POST'
          var route = '/api/user/new'
        }
        console.log(crudType, route)
        $.ajax({
          type: crudType,
          url: route,
          data: JSON.stringify(newEvent),
          contentType: 'application/json',
          success: function(data){
            console.log(data)
            callback(data.signedRequest)
          },
          error: function(data, status, jqXHR){
            console.log(data)
            console.log(status)
            console.log(jqXHR)
          }
        })
      },
      render: function() {
        let {imagePreviewUrl} = this.state
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />)
        }

        return (
          <div>
            <h2>Update Your Profile</h2>
            <form className="updateUserForm" onSubmit={this.handleSubmit} >
              <label for="firstName">First Name:</label>
              <input type="text" placeholder="First" value={this.state.firstName}  onChange={this.handleFirstChange} />
              <label for="lastName">Last Name:</label>
              <input type="text" placeholder="Last" value={this.state.lastName} onChange={this.handleLastChange} />
              <label for="email">Email:</label>
              <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />


              <label for="Image">Image:</label>
              <input type="file" onChange={this.handleImageChange} />
              <button type="submit" onClick={this.handleSubmit}>Update User</button>
              <div>{$imagePreview }</div>


              <button type="submit">Update Profile</button>
            </form>
          </div>
        );
      }
    });
