var Box = React.createClass({
  render:function(){
    var home = this.props.data.home ? <Home name={this.props.data.user.name}/> : '';
    var profile = this.props.data.profile ? <Profile data={this.props.data.user}/> : '';
    var partner = this.props.data.partner ? <Partner user={this.props.data.user} partners={this.props.data.partners}/> : '';

    return(
      <div className='container'>
        <div className="row">
          <div className="col-md-6 col-centered">
            <div className="jumbotron" id="container">
              <div className="jumboBox">
                  {home}
                  {profile}
                  {partner}
                {/*<RouteHandler />*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

var Profile = React.createClass({
  render:function(){
    return(<p>I am the profile</p>)
  }
});

var Home = React.createClass({
  render:function(){
    return(
      <div>
        <h3>Welcome, {this.props.name}!</h3><br/>
        <p>
          <a className="btn btn-danger btn-lg about" role="button" data-toggle="modal" data-target="#myModal">
            Learn more
          </a>
        </p>
      </div>
    )
  }
})