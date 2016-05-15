const React = require('react');
const ReactDOM = require('react-dom')

module.exports = React.createClass({
      displayName: 'CreateEventForm',
      getInitialState: function() {
        return({
                title: '',
                description: '',
                addressName: '',
                file: '',
                imagePreviewUrl: ''});
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
      handleImageChange: function(e){
        e.preventDefault();
        let reader = new FileReader()
        let fileUrl = e.target.files[0]
        console.log(fileUrl)

        reader.onloadend = () => {
          this.setState({
            file: fileUrl,
            imagePreviewUrl: reader.result
          })
        }
        reader.readAsDataURL(file)
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
        var title = this.state.title.trim()
        var description = this.state.description.trim()
        var addressName = this.state.addressName.trim()
        var picture = this.state.file
        if (!title || !description || !addressName) return
        this.onFormSubmit({
           title: title,
           description: description,
           addressName: addressName,
           picture: picture
        });
        this.setState({title: '', description: '', addressName: '', file: '', imagePreviewUrl: ''});
      },
      onFormSubmit: function(newEvent) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:6060/api/event/new',
          data: JSON.stringify(newEvent),
          contentType: 'application/json',
          success: function(data){
            console.log(data)
            console.log('SUCCESS')
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
            <h2>Create Event</h2>
            <form className="createEventForm" onSubmit={this.handleSubmit} >
              <label for="title">Title:</label>
              <input type="text" placeholder="event title" value={this.state.title}  onChange={this.handleTitleChange} />
              <label for="description">Description:</label>
              <input type="text" placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange} />
              <label for="Address Name">Address Name:</label>
              <input type="text" placeholder="address Name" value={this.state.addressName} onChange={this.handleAddressNameChange} />
              <label for="Image">Image:</label>
              <button type="submit" onClick={this.srcImg}>Google Image</button>
              <input type="file" onChange={this.handleImageChange} />
              <button type="submit" onClick={this.handleSubmit}>Create Event!</button>
              <div>{$imagePreview }</div>
              <div>{this.file}</div>
              <div>{this.imagePreviewUrl}</div>
            </form>
          </div>
        );
      }
    });
