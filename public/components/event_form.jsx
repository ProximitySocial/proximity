const React = require('react');
const ReactDOM = require('react-dom')

module.exports = React.createClass({
      displayName: 'CreateEventForm',
      getInitialState: function() {
        return({title: '', description: '', addressName: ''});
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
      handleSubmit: function(e) {
        e.preventDefault();
        var title = this.state.title.trim()
        var description = this.state.description.trim();
        var addressName = this.state.addressName.trim();
        if (!title || !description || !addressName) return;
        this.onFormSubmit({title: title, description: description, addressName: addressName});
        this.setState({title: '', description: '', addressName: ''});
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
        return (
          <form className="createEventForm" onSubmit={this.handleSubmit} >
            <input type="text" placeholder="event title" value={this.state.title}  onChange={this.handleTitleChange} />
            <input type="text" placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange} />
            <input type="text" placeholder="address Name" value={this.state.addressName} onChange={this.handleAddressNameChange} />
            <input type="text" placeholder="address Name" value={this.state.addressName} onChange={this.handleAddressNameChange} />
            <input type="submit" value="Create Event" />
          </form>
        );
      }
    });


