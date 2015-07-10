var Box = React.createClass({
  render:function(){
    var home = this.props.data.home ? <Home name={this.props.data.user.name}/> : '';
    var profile = this.props.data.profile ? <Profile data={this.props.data.user}/> : '';
    var partner = this.props.data.partner ? <Partner user={this.props.data.user}/> : '';

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


var Partner = React.createClass({
  // loadCohortMates: function(){
  //   $.ajax({
  //     url: '/getPartner',
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data){
  //       this.setState(data);
  //       console.log(this.state)
  //     }.bind(this),
  //     error: function(xhr, status, err){
  //       console.error('/getUser', status, err.toString());
  //     }.bind(this)
  //   });
  // },
  // getInitialState: function(){
  //   return {user: {}, cohort: {}}
  // },
  render:function(){
    return( 
      <div>  
        <p>Let''s Get You Partnered Up, {this.props.user.name}!</p><br/>
        <div className="btn-group">
          <button className="btn btn-info btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Add Preferred Partners <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" id="inclusions" role="menu">
          </ul>
        </div>
        <div className="btn-group">
          <button className="btn btn-warning btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
            Add Unpreferred Partners <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" id="exclusions" role="menu">
          </ul>
        </div>
        <button type="button" className="btn btn-danger populatePartners">
          Click Here To get your Partner
        </button>
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