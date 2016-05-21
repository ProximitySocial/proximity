const React = require('react');
const ReactDOM = require('react-dom')
var port = process.env.PORT

module.exports = React.createClass({
      displayName: 'CreateUserForm',
      getInitialState: function() {
        return({
                firstName: 'Brian',
                lastName: 'RayTEST',
                email: 'bray@gmail.com',
                file: '',
                imagePreviewUrl: '',
                fileName: '',
                fileType: '',
                picUrl: '',
                fileSize: ''
              });
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
      handleImageChange: function(e){
        e.preventDefault();
        let reader = new FileReader()
        let file = e.target.files[0]
        console.log('here is the mark ^^^^^^^^^')
        console.log(file)

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
        console.log(signedRequest)
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", signedRequest)
        xhr.onload = function() {
          if (xhr.status === 200) {
            console.log("SUCCESSSSSSSSSSSS")
            done()
          }
        }
        console.log('file here')

        xhr.send(this.state.file)
        // $.ajax({
        //   type: 'PUT',
        //   url: signedRequest,
        //   processData: false,
        //   data: this.state.file,
        //   success: (data) => {
        //     console.log(data);
        //     console.log('Success from S3')
        //     this.setState({
        //       file: ''
        //     })
        //   },
        //   error: (data, status, xhr) => {
        //     console.log('Failure from S3')
        //     console.log(data)
        //     console.log(status)
        //     console.log(xhr)
        //   }

        // })

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
        if (!this.state.picUrl){
          // console.log('^^^^^^^^ here with no picUrl ... handle submit')
          var fileName = this.state.file.name
          var fileType = this.state.file.type
          var fileSize = this.state.file.size
        } else {
          var picture = this.state.picUrl.trim()
        }
        if (!firstName || !lastName || !email) return
        this.onFormSubmit({
           firstName: firstName,
           lastName: lastName,
           email: email,
           pic: picture,
           fileName: fileName,
           fileType: fileType,
           fileSize: fileSize
        }, this.loadToS3);
        this.setState({firstName: '', lastName: '', email: ''});
      },
      onFormSubmit: function(newUser, callback) {
        $.ajax({
          type: 'POST',
          url: '/api/user/new',
          data: JSON.stringify(newUser),
          contentType: 'application/json',
          success: function(data){
            console.log(data)
            console.log('SUCCESS for uploading data...now S3 upload')
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
            <h2>Create User</h2>
            <form className="createUserForm" onSubmit={this.handleSubmit} >
              <label for="firstName">First Name:</label>
              <input type="text" placeholder="First" value={this.state.firstName}  onChange={this.handleFirstChange} />
              <label for="lastName">Last Name:</label>
              <input type="text" placeholder="Last" value={this.state.lastName} onChange={this.handleLastChange} />
              <label for="email">Email:</label>
              <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
              <label for="Image">Image:</label>
              <input type="file" onChange={this.handleImageChange} />
              <button type="submit">Create User!</button>
            </form>
            {$imagePreview}
            Above should be the preview
          </div>
        );
      }
    });
