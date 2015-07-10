var NavBar = React.createClass({
  render: function(){
    return(
      <nav className="navbar navbar-default navbar-fixed-top" id="nav">

        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#/home">YOPO</a>
          </div>
          <ul className="nav navbar-nav">
            <Button name="Get Partner"/>
            <Button name="Edit Profile"/>
          </ul>
            <ul className="nav navbar-nav navbar-right">
            <li><a data-toggle="modal" data-target="#myModal">About</a></li>
            <li><a href="/logout">Logout</a></li>
            </ul>
        </div>
      </nav>
    )
  }
});

var Button = React.createClass({
  render: function(){
    return(
      <li><a href="#">{this.props.name}</a></li>
    )
  }
})
