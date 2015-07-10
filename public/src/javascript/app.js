var Router = window.ReactRouter
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  loadUserFromServer: function(){
    $.ajax({
      url: '/getUser',
      dataType: 'json',
      cache: false,
      success: function(user){
        this.setState({user: user});
      }.bind(this),
      error: function(xhr, status, err){
        console.error('/getUser', status, err.toString());
      }.bind(this)
    });
  },
  handleNavigationSelection: function(stateName){
    var state = this.state;
    state.partner = false;
    state.profile = false;
    state.home = false;
    state[stateName] = true;
    this.setState(state);
  },
  getInitialState: function(){
    return {user: '', partners: '', partner: false, profile: false, home: true}
  },
  componentWillMount: function(){
    this.loadUserFromServer();
  },
  render:function(){
    return(
      <div>
        <NavBar handleClickEvent={this.handleNavigationSelection}/>
        <Box data={this.state}/>
        <Modal />
      </div>
    )
  }
})

// user={this.state.user} partners={this.state.partners}partner={this.state.partner} profile={this.state.profile} home={this.state.home}


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