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
    return {user: '', profile: false, partners: false, home: true};
  },
  componentWillMount: function(){
    this.loadUserFromServer();
  },

  render:function(){
    var home = this.state.home ? <Home data={this.state}/> : '';
    var profile = this.state.profile ? <Profile data={this.state}/> : '';
    var partner = this.state.partner ? <Partner data={this.state}/> : '';
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
  componentWillMount: function(){

    // this.loadCohortMates();
  },
  render:function(){
    return( 
      <div>  
        <p>Let''s Get You Partnered Up, {this.state.user.name}!</p><br/>
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
})
var Profile = React.createClass({
  render:function(){
    return(<p>I am the profile</p>)
  }
})

var Home = React.createClass({
  render:function(){
    return(
      <div>
        <h3>Welcome, {this.props.data.user.name}!</h3><br/>
        <p>
          <a className="btn btn-danger btn-lg about" role="button" data-toggle="modal" data-target="#myModal">
            Learn more
          </a>
        </p>
      </div>
    )
  }
})