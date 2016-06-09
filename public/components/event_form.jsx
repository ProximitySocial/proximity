import React from 'react'
import { ReactDOM } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
const LinkedStateMixin = require('react-addons-linked-state-mixin')


function formatDate(date) {
  var d = new Date(date);
  var hh = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var dd = "AM";
  var h = hh;
  if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
  if (h == 0) {
        h = 12;
    }
  m = m<10?"0"+m:m;
  s = s<10?"0"+s:s;
  var pattern = new RegExp("0?"+hh+":"+m+":"+s);
  var replacement = h+":"+m;
  /* if you want to add seconds
  replacement += ":"+s;  */
  replacement += " "+dd;

  return replacement
}

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
      componentWillReceiveProps: function() {
        console.log('event form component will receive props');
        console.log(this.props.event);
        this.setState({
          eventID: this.props.event._id,
          title: this.props.event.title,
          description: this.props.event.description,
          interestTags: this.props.event.interestTags,
          addressName: this.props.event.addressName,
          address: this.props.event.address})
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
      loadToS3: function(signedRequest){
        console.log('this is the file object: ***')
        console.log(this.state.file)
        var xhr = new XMLHttpRequest()
        xhr.open("PUT", signedRequest)
        xhr.onload = function() {
          if (xhr.status === 200) {
            console.info('Success loading to S3')
          }
        }
        console.log('This state file below: ***************')
        console.log(this.state.file)
				xhr.send(this.state.file)

        this.setState({
          file: '',
          imagePreviewUrl: '',
          fileName: '',
          fileType: '',
          fileSize: ''
        })
      },
     setImagePreview: function(url) {
       this.setState({
         imagePreviewUrl: url,
       })
     },
      srcImage: function(e){
        let state = this.state
        let setImagePreview = this.setImagePreview
        let title = this.state.title.trim()
        let arr = title.split(' ')
        let length = arr.length
        let query = arr.join('+')
        console.log(query)
        let route = '/helpers/img/' + query
        $.ajax({
          type: 'GET',
          url: route,
          contentType: 'application/json',
          success: function(data){
            setImagePreview(data.url)

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
      updateUpdate: function(){
        var updated = !this.state.update
        this.setState({update: updated})
      },
      handleSubmit: function(e) {
        e.preventDefault()
        var title = this.state.title.trim()
        var description = this.state.description.trim()
        var interestTags = this.state.interestTags.toString().split(',').map(function(interest){return interest.trim().toLowerCase()})
        if (interestTags.length > 3) {
          //flash error Validation
          console.log('maximum of 3 interests Tags')
          return
        }

        var address = this.state.address.trim()
        var addressName = this.state.addressName.trim()
        if (this.state.file){
          var fileName = this.state.file.name
          var fileType = this.state.file.type
          var fileSize = this.state.file.size
        } else {
          var picture = this.state.url.trim()
        }
        if (!title || !description || !address || !interestTags) return
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
        });
      },
      onFormSubmit: function(newEvent) {
        this.props.toggleEventModal()
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
            if (data.signedRequest) { this.loadToS3(data.signedRequest) }
            this.setState({title: '', description: '', interestTags: '', addressName: '', address: ''});
          }.bind(this),
          error: function(data, status, jqXHR){
            this.props.toggleEventModal()
            console.log(data)
            console.log(status)
            console.log(jqXHR)
          }.bind(this)
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
        var divStyle = {background: "url(" + imagePreviewUrl + ") center center",
                        minHeight: "25rem",
                        margin: 0,
                        verticalAlign: "bottom"}

        var now = Date.now() //- Date.parse(Date.now())
        var x = (Date.parse(this.state.startTime) - now)/ 1000
        var hour = formatDate(this.state.startTime)
        var numberGoing = 1

        return (
          <section className='modalEvent'>
            <section className='eventTotalForm'>
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
                <label for="Start Time">Start Time:</label>
                <input type="datetime-local" placeholder="Start Time" valueLink={this.linkState('startTime')} />
                <label for="Address">Street Address:</label>
                <input type="text" placeholder="Address" valueLink={this.linkState('address')} />
                <label for="Image">Image:</label>
                <button onClick={this.srcImage}>Source an Image</button>
                <input type="file" valueLink={this.handleImageChange} />
                <button type="submit" onClick={this.handleSubmit}>Submit Event!</button>
              </form>
            </section>
            <section className="eventPreview">
                <div className="eventPicture" style={divStyle}>
                  <div className="eventTitle">
                    <h3 style={{marginTop:0}}>{this.state.title}</h3>
                  </div>
                </div>
                <div className="eventDetails">
                  <h4><strong>@</strong>  {this.state.addressName}</h4>
                  <p className="time"><strong>Starts in:</strong>  {(x % 24).toFixed(0)} hours  @ {hour}</p>
                  <p className="interest"><strong>Tags:</strong>  #{this.state.interestTags}</p>
                  <p className="hood"><strong>Neighborhood:</strong> (this will compute based on Street Address)</p>
                  <div className="eventAttCount">
                    <h3>{numberGoing}</h3><p>&nbsp;&nbsp;<i>going</i></p>
                  </div>
                </div>
            </section>
          </section>
        )
      }
    });
