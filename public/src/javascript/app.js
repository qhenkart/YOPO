var Router = window.ReactRouter
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render:function(){
    return(
      <div>
        <NavBar/>
        <Box/>
        <Modal />
      </div>
    )
  }
})
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
  swap: function(){
    this.setState({partners: true})
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

var Modal = React.createClass({
  render:function(){
    return(
      <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">YOPO: You Only Pair Once</h4>
            </div>
            <div className="modal-body">
              <p>Welcome to the YOPO App: A new <strong>PAIR</strong>adigm in Pair Programming</p>

              <p>YOPO is set to solve the very real problem of matching during Pair Progamming exercises. This application allows people to set preferences of people they want to pair or not to pair with, or just choose anyone randomly. </p>

              <p>The goal of this program is to make sure that no one gets left behind, that everyone has a partner, and that there is no inhibited productivity due to feelings of exclusion, being picked last, or feelings of alienation from the community.</p>

              <p>Choose your top two choices, and if any of your choices match with theirs, then you will be automatically matched. Choose your two exclusions, and as long as there are other options in the pairing pool, you will not be matched. For those who don't care, or prefer to partner with the most diverse selection of talent and personality, the app will match you with a totally random partner with the exception of those you've already paired with!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

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
// var routes = (
//   <Route handler={Box}>
//     <Route path="home" handler={Home}/>
//     <Route path="partner" handler={Partner}/>
//     <Route path="profile" handler={Profile}/>
//   </Route>
// );

// Router.run(routes, function(Root, state){
//   React.render(<Root/>, document.getElementById('content'))
// });


React.render(<App />, document.body)