var Router = window.ReactRouter
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;





var App = React.createClass({
  render: function(){
    return(
      <div>
        <h1>App</h1>
        <RouteHandler/>
      </div>
    )
  }
});
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
    return(<h1>{this.state.user.name}</h1>)
  }
});

var Partner = React.createClass({
  render:function(){
    return(<p>I am the partner</p>)
  }
})
var Profile = React.createClass({
  render:function(){
    return(<div><p>I am the partner</p>
      <RouteHandler/></div>
      )
  }
})
var routes = (
  <Route handler={App}>
    <Route path="partner" handler={Partner}/>
    <Route path="profile" handler={Profile}/>
  </Route>
);

Router.run(routes, function(Root){
debugger;
  React.render(<Root/>, document.getElementById('content'))
});


// React.render(
//   <Box />,
//   document.getElementById('content')
// )