var Partner = React.createClass({
  getInitialState: function(){
    return {menuItems: [], partner: ''}
  },
  handleClick: function(){
    var classmates = this.props.partners.map(function(partner){
      return (<ListItem username={partner.username} text={partner.name}/>)
    });
    this.setState({menuItems: classmates});
  },
  getPartner: function(){
    var partner = this.props.partners[Math.floor((Math.random() * this.state.menuItems.length) + 1)];
    this.setState({partner: partner.name})
  },
  render:function(){
    return( 
      <div>
        <div className="row">
          <p>Let's Get You Partnered Up, {this.props.user.name}!</p><br/>
        </div>
        <div className="row">
          <Dropdown text="Add Preferred Partners" menuItems={this.state.menuItems} clickHandler={this.handleClick} partners={this.props.partners} classes="btn btn-sm btn-info dropdown-toggle" id="inclusions"/>
          <Dropdown text="Add Unpreferred Partners" menuItems={this.state.menuItems} clickHandler={this.handleClick} partners={this.props.partners} classes="btn btn-sm btn-warning dropdown-toggle" id="exclusions" />
        </div>
        <div className="row">
          <button type="button" data-toggle="modal" data-target="#answerModal" className="btn btn-danger" onClick={this.getPartner}>
            Click Here To get your Partner
          </button>
        </div>
        <AnswerModal modalText={this.state.partner}/>
      </div>
    )
  }
});

var Dropdown = React.createClass({
  render: function(){
    var items = this.props.menuItems || '';
    return(
      <div className="btn-group">
        <button className={this.props.classes} type="button" data-toggle="dropdown" onClick={this.props.clickHandler} aria-expanded="false">
          {this.props.text} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" id={this.props.id} role="menu">
          {items}
        </ul>
      </div>

    )
  }
})
var ListItem = React.createClass({
  render: function(){
   return(
      <li><a href="#"username={this.props.username}>{this.props.text}</a></li>
    )
  }
})



var AnswerModal = React.createClass({
  render:function(){
    return(
      <div className="modal fade" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">YOPO: You Only Pair Once</h4>
            </div>
            <div className="modal-body">
              <h3>You are matched with {this.props.modalText}!</h3>
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

