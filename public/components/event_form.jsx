const React = require('react');
const ReactDOM = require('react-dom')

module.exports = React.createClass({
      displayName: 'eventForm',
      getInitialState: function() {
        return({
                eventId: '5740b2dfb7c4e79bf41af122',
                title: 'A CHANGE I MADE',
                description: '',
                interestTags: '',
                addressName: '',
                address: '',
                file: '',
                imagePreviewUrl: '',
                url: '',
                fileName: '',
                fileType: '',
                fileSize: ''});
      },
      handleIdChange: function(e) {
        this.setState({eventId: e.target.value});
      },
      handleTitleChange: function(e) {
        this.setState({title: e.target.value});
      },
      handleDescriptionChange: function(e) {
        this.setState({description: e.target.value});
      },
      handleAddressNameChange: function(e) {
        this.setState({addressName: e.target.value});
      },
      handleAddressChange: function(e) {
        this.setState({address: e.target.value});
      },
      handleInterestTagsChange: function(e) {
        this.setState({interestTags: e.target.value});
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
        console.log('somehting to see')
        var title = this.state.title.trim()
        var description = this.state.description.trim()
        var interestTags = this.state.interestTags.trim()
        var address = this.state.address.trim()
        var addressName = this.state.addressName.trim()
        if (this.state.file){
          var fileName = this.state.file.name
          var fileType = this.state.file.type
          var fileSize = this.state.file.size
        } else {
          var picture = this.state.url.trim()
        }
        // if (!title || !description || !address) return
        this.onFormSubmit({
           title: title,
           description: description,
           interestTags: interestTags,
           addressName: addressName,
           address: address,
           picture: picture,
           fileName: fileName,
           fileType: fileType,
           fileSize: fileSize
        }, this.loadToS3);
        this.setState({title: '', description: '', interestTags: '', addressName: '', address: ''});
      },
      onFormSubmit: function(newEvent, callback) {
        if(this.state.eventId){
          var crudType = 'PUT'
          var route = '/api/event/' + this.state.eventId
        } else {
          var crudType = 'POST'
          var route = '/api/event/new'
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
            <h2>Create/Update Event</h2>
            <form className="eventForm" onSubmit={this.handleSubmit} >
              <label for="eventId">Event ID:</label>
              <input type="text" placeholder="eventID" value={this.state.eventId}  onChange={this.handleIdChange} />
              <label for="title">Title:</label>
              <input type="text" placeholder="Title" value={this.state.title}  onChange={this.handleTitleChange} />
              <label for="description">Description:</label>
              <input type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
              <label for="Address">InterestsTag:</label>
              <input type="text" placeholder="InterestTags" value={this.state.interestTags} onChange={this.handleInterestTagsChange} />
              <label for="Address Name">Address Name:</label>
              <input type="text" placeholder="Address Name" value={this.state.addressName} onChange={this.handleAddressNameChange} />
              <label for="Address">Address:</label>
              <input type="text" placeholder="Address" value={this.state.address} onChange={this.handleAddressChange} />
              <label for="Image">Image:</label>
              <input type="file" onChange={this.handleImageChange} />
              <button type="submit" onClick={this.handleSubmit}>Create Event!</button>
              <div>{$imagePreview }</div>
            </form>
          </div>
        )
      }
    });
