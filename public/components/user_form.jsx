const React = require('react');
const ReactDOM = require('react-dom')
var port = process.env.PORT

module.exports = React.createClass({
      displayName: 'userForm',
      getInitialState: function() {
        return({
                userId: '',
                firstName: '',
                lastName: '',
                email: '',
                bio: '',
                interests: '',
                addressName: '',
                address: '',
                file: '',
                imagePreviewUrl: '',
                url: '',
                fileName: '',
                fileType: '',
                fileSize: ''
              });
      },
      handleIdChange: function(e) {
        this.setState({userId: e.target.value});
      },
      handleFirstChange: function(e) {
        this.setState({firstName: e.target.value});
      },
      handleLastChange: function(e) {
        this.setState({lastName: e.target.value});
      },
      handleEmailChange: function(e) {
        this.setState({email: e.target.value});
      },
      handleBioChange: function(e) {
        this.setState({bio: e.target.value});
      },
      handleInterestsChange: function(e) {
        this.setState({interests: e.target.value});
      },
      handleAddressNameChange: function(e) {
        this.setState({addressName: e.target.value});
      },
      handleAddressChange: function(e) {
        this.setState({address: e.target.value});
      },
      handleImageChange: function(e){
        e.preventDefault();
        let reader = new FileReader()
        let file = e.target.files[0]

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result,
          })
        }
        reader.readAsDataURL(file)
      },
      loadToS3: function(signedRequest, done){
        console.log('send off to S3')
        console.log(this.state.file);
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", signedRequest)
        xhr.onload = function() {
          if (xhr.status === 200) {
            done()
          }
        }

        xhr.send(this.state.file)

        this.setState({
          file: ''
        })
      },
      srcImage: function(e){
        console.log('trying to source image')
        let title = this.state.title.trim()
        let arr = title.split(' ')
        let length = arr.length
        let query = arr.join('+')
        console.log(query)
        $.ajax({
          type: 'GET',
          url: "https//www.google.com/search?source=lnms&tbm=isch&q=" + query,
          dataType: 'application/json',
          success: (data) => {
            console.log(data);
          },
          error: (data, status, xhr) => {
            console.log(data)
            console.log(status)
            console.log(xhr)
          }

        })
      },
      handleSubmit: function(e) {
        e.preventDefault()
        var firstName = this.state.firstName.trim()
        var lastName = this.state.lastName.trim()
        var email = this.state.email.trim()
        var bio = this.state.bio.trim()
        var interests = this.state.interests.trim()
        var address = this.state.address.trim()
        var addressName = this.state.addressName.trim()

        if (this.state.file){
          var fileName = this.state.file.name
          var fileType = this.state.file.type
          var fileSize = this.state.file.size
        } else {
          var picture = this.state.url.trim()
        }

        // if (!firstName || !lastName || !email) return
        this.onFormSubmit({
           firstName: firstName,
           lastName: lastName,
           email: email,
           bio: bio,
           interests: interests,
           addressName: addressName,
           address: address,
           picture: picture,
           fileName: fileName,
           fileType: fileType,
           fileSize: fileSize
        }, this.loadToS3);
        this.setState({firstName: '', lastName: '', email: '', bio: '', interests: '', addressName: '', address: ''});
      },
      onFormSubmit: function(newUser, callback) {
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
          data: JSON.stringify(newUser),
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
      navigateBack: function(){
        this.goBack()
      },
      updateUser: function(){
        var updated = !this.state.update
        this.setState({update: updated})
      },
      render: function() {
        let {imagePreviewUrl} = this.state
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="imgPreview" src={imagePreviewUrl} />)
        }
        var hidden = {display: 'none'}
        var show = {}
        if (this.state.update){
          hidden = {}
          show = {display: 'none'}
        }
        return (
          <section className="modalUser">
            <div className='modalNav'>
              <button className='btn back-btn' onClick={this.navigateBack} >Back</button>
              <div className='spacer'></div>
              <button className='btn btn-primary' style={show} onClick={this.updateUser}>Update User</button>
              <button className='btn btn-primary' style={hidden} onClick={this.updateUser}>Create User</button>
            </div>
            <form className="userForm" onSubmit={this.handleSubmit} >
              <div className="userIdDiv" style={hidden}>
                <label for="userID">User ID:</label>
                <input type="text" placeholder="userID" value={this.state.userId}  onChange={this.handleIdChange} />
              </div>
              <label for="firstName">First Name:</label>
              <input type="text" placeholder="First" value={this.state.firstName}  onChange={this.handleFirstChange} />
              <label for="lastName">Last Name:</label>
              <input type="text" placeholder="Last" value={this.state.lastName} onChange={this.handleLastChange} />
              <label for="email">Email:</label>
              <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
              <label for="bio">Bio:</label>
              <textarea type="text" placeholder="bio" value={this.state.bio} onChange={this.handleDescriptionChange} />
              <label for="Interests">Interests:</label>
              <input type="text" placeholder="golf, running, dancing, (comma seperated / 5 max)" value={this.state.interests} onChange={this.handleInterestTagsChange} />
              <label for="Address">Address:</label>
              <input type="text" placeholder="Address" value={this.state.address} onChange={this.handleAddressChange} />
              <label for="Image">Image:</label>
              <input type="file" onChange={this.handleImageChange} />
              <button type="submit">Submit User!</button>
            </form>
            {$imagePreview}
          </section>
        );
      }
    });
