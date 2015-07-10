/** @jsx React.DOM */


// import React from 'react';
// import Home from './components/Home';
// import Login from './components/Login'


// React.render(
//   <Login />,
//   document.getElementById('content')
// );


var Box = React.createClass({
  loadUserFromServer: function(){
    $.ajax({
      url: '/getUser',
      dataType: 'json',
      cache: false,
      success: function(user){
        this.setState({user: user});
          console.log(user)
      }.bind(this),
      error: function(xhr, status, err){
        console.error('/getUser', status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {user: ''};
  },
  componentWillMount: function(){
    this.loadUserFromServer();
  },
  render:function(){
    return({this.state.user.username})
  }
});





React.render(
  <Box />,
  document.getElementById('content')
)