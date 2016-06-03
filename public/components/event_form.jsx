import React from 'react'
import { ReactDOM } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
const LinkedStateMixin = require('react-addons-linked-state-mixin')


module.exports = React.createClass({
      displayName: 'eventForm',
      mixins: [LinkedStateMixin],
      getInitialState: function() {
        return({
                eventID: '',
                title: '',
                description: '',
                interestTags: '',
                addressName: '',
                address: '',
                file: '',
                imagePreviewUrl: '',
                url: '',
                fileName: '',
                fileType: '',
                fileSize: '',
                update: false});
      },
      componentWillReceiveProps: function(nextProps) {
        this.setState({update: nextProps.update})
      },
      // handleIdChange: function(e) {
      //   this.setState({eventID: e.target.value});
      // },
      // handleTitleChange: function(e) {
      //   this.setState({title: e.target.value});
      // },
      // handleDescriptionChange: function(e) {
      //   this.setState({description: e.target.value});
      // },
      // handleAddressNameChange: function(e) {
      //   this.setState({addressName: e.target.value});
      // },
      // handleAddressChange: function(e) {
      //   this.setState({address: e.target.value});
      // },
      // handleInterestTagsChange: function(e) {
      //   this.setState({interestTags: e.target.value});
      // },
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
          file: '',
          imagePreviewUrl: ''
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
      navigateBack: function(){
        this.goBack()
      },
      updateUpdate: function(){
        var updated = !this.state.update
        this.setState({update: updated})
      },
      handleSubmit: function(e) {
        e.preventDefault()
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
        if(this.state.eventID){
          var crudType = 'PUT'
          var route = '/api/event/' + this.state.eventID
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
            this.props.toggleEventModal()
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
        var hidden = {display: 'none'}
        var show = {}
        if (this.state.update){
          hidden = {}
          show = {display: 'none'}
        }
        return (
          <section className='modalEvent'>
            <div className='modalNav'>
              <button className='btn back-btn' onClick={this.props.toggleEventModal} >Back</button>
              <div className='spacer'></div>
              <button className='btn btn-action' style={show} onClick={this.updateUpdate}>Update Event</button>
              <button className='btn btn-action' style={hidden} onClick={this.updateUpdate}>Create Event</button>
            </div>
            <form className="eventForm" onSubmit={this.handleSubmit} >
              <div className="eventIdDiv" style={hidden}>
                <label for="eventID">Event ID:</label>
                <input type="text" placeholder="eventID" valueLink={this.linkState('eventID')}  />
              </div>
              <label for="title">Title:</label>
              <input type="text" placeholder="Title" valueLink={this.linkState('title')}  />
              <label for="description">Description:</label>
              <textarea type="text" placeholder="Description" maxlength='5' valueLink={this.linkState('description')} />
              <label for="Address">InterestsTag:</label>
              <input type="text" placeholder="InterestTags" valueLink={this.linkState('interestTags')} />
              <label for="Address Name">Address Name:</label>
              <input type="text" placeholder="Address Name" valueLink={this.linkState('addressName')} />
              <label for="Address">Address:</label>
              <input type="text" placeholder="Address" valueLink={this.linkState('address')} />
              <label for="Image">Image:</label>
              <input type="file" onChange={this.handleImageChange} />
              <button type="submit" onClick={this.handleSubmit}>Submit Event!</button>
              <div>{$imagePreview }</div>
            </form>
          </section>
        )
      }
    });
