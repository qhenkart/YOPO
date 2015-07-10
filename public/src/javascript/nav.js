var NavBar = React.createClass({
  clickHandler: function(stateName){
    this.props.handleClickEvent(stateName);
  },
  render: function(){
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#" stateName="home" onClick={this.clickHandler}>YOPO</a>
          </div>
          <ul className="nav navbar-nav">
            <Button name="Get Partner" stateName="partner" handleClick={this.clickHandler} />
            <Button name="Edit Profile" stateName="profile" handleClick={this.clickHandler} />
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
  clicked: function(){
    this.props.handleClick(this.props.stateName);
  },
  render: function(){
    return(
      <li><a onClick={this.clicked} stateName={this.props.stateName} href="#">{this.props.name}</a></li>
    )
  }
})
