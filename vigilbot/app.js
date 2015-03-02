(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			selectedAction: 'ban',
			actions: []
		}
	},
	addAction: function(e) {
		var action = {action: this.state.selectedAction}
		action.name = action.action
		this.state.actions.push(action)
		this.setState(this.state);
	},
	moveActionUp: function(i, amount) {
		var actions = this.state.actions;
		actions.splice(i-amount, 0, actions.splice(i, 1)[0]);
		this.setState(this.state);
	},
	moveActionDown: function(i, amount) {
		var actions = this.state.actions;
		actions.splice(i+amount, 0, actions.splice(i, 1)[0]);
		this.setState(this.state);
	},
	render: function() {
		var ButtonGroup = require('./ButtonGroup');

		var actionsListItem = function(action, i, list) {
			return (
				React.createElement("div", {className: "collapse-group"}, 
					React.createElement("input", {type: "text", placeholder: "", value: action.name, disabled: true}), 
					React.createElement("button", {className: "postfix", onClick: this.moveActionDown.bind(this, i, 1), disabled: list.length === i+1}, "Move down"), 
					React.createElement("button", {className: "postfix", onClick: this.moveActionUp.bind(this, i, 1), disabled: i === 0}, "Move up"), 
					React.createElement("button", {className: "postfix alert"}, "Remove")
				)
			);
		}.bind(this);

		return (
			React.createElement("div", null, 
				"under construction", 
				React.createElement(ButtonGroup, {selected: this.state.selectedAction, onChange: function(val){this.state.selectedAction=val;this.setState(this.state)}.bind(this)}, 
					React.createElement("button", {value: "ban"}, "Ban"), 
					React.createElement("button", {value: "timeout"}, "Timeout"), 
					React.createElement("button", {value: "clear"}, "Clear chat"), 
					React.createElement("button", {value: "message"}, "Message")
				), 

				React.createElement("div", {className: "nested-section"}, 
					React.createElement("h3", null, this.state.selectedAction), 
					React.createElement("button", {onClick: this.addAction}, "Add")
				), 

				this.state.actions.length > 0 ? (
					React.createElement("div", null, 
					React.createElement("h3", null, "Actions"), 
					this.state.actions.map(actionsListItem)
					)
				) : (
					React.createElement("p", null, "Add some actions")
				)
			)
		);
	}
});


},{"./ButtonGroup":3,"react/addons":"oWaOtE"}],2:[function(require,module,exports){
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			availability: 'all',
			users: []
		}
	},
	addNewUser: function(e) {
		e.preventDefault();
		var input = this.refs.usernameInput.getDOMNode();
		var username = input.value;
		if (!username || username.length == 0) {
			return;
		}
		var users = this.state.users;
		users.push(username);
		input.value = '';
		this.setState({users: users});
	},
	removeUser: function(user) {
		var users = this.state.users;
		var idx = users.indexOf(user);
		if (idx != -1) {
			users.splice(idx, 1);
		}
		this.setState({users:users});
	},
	availabilityChanged: function(value) {
		this.setState({availability: value});
	},
	render: function() {
		var ButtonGroup = require('./buttonGroup');

		var usersListItem = function(user) {
			return (
				React.createElement("div", {className: "collapse-group"}, 
					React.createElement("input", {type: "text", placeholder: "", value: user, disabled: true}), 
					React.createElement("button", {className: "postfix", onClick: this.removeUser.bind(this, user)}, 
						"Remove"
					)
				)
			)
		}.bind(this);

		var customUsersList = function() {
			if (this.state.users.length > 0) {
				return [
					React.createElement("p", null, "This Reaction will apply to the following users:"),
					this.state.users.map(usersListItem)
				]

			}
			else {

				return (
					React.createElement("div", null, "Add some users")
				)
			}
		}.bind(this);

		var customUsers = this.state.availability == 'custom' ? (React.createElement("div", {className: "mini-section"}, 
			React.createElement("form", {onSubmit: this.addNewUser, className: "collapse-group"}, 
				React.createElement("input", {type: "text", placeholder: "Username", ref: "usernameInput"}), 
				React.createElement("button", {className: "postfix alert"}, 
					"Add new"
				)
			), 

			customUsersList()

			
		)) : React.createElement("div", null, "This reaction will apply to all users");

		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "mini-section"}, 
					React.createElement(ButtonGroup, {selected: this.state.availability, onChange: this.availabilityChanged}, 
						React.createElement("button", {value: "all"}, "All users"), 
						React.createElement("button", {value: "custom"}, "Only these users")
					)
				), 
				customUsers
			)
		);
	}
});


},{"./buttonGroup":8,"react/addons":"oWaOtE"}],3:[function(require,module,exports){
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
	componentWillMount: function() {
		if (this.props.selected) {
			this.setState({selected: this.props.selected})
		}
	},
	componentWillReceiveProps: function(props) {
		if (this.props.selected) {
			this.setState({selected: props.selected});
		}
	},
	getInitialState: function() {
		return {
			selected: null
		}
	},
	buttonClicked: function(button, idx, e) {
		this.setState({selected: button});
		if (this.props.onChange) {
			this.props.onChange(button, idx, e);
		}
	},
	render: function() {
		return (
			React.createElement("div", {className: "button-group"}, 
				this.props.children.map(function(button, i) {
					var text = button.props.children;
					var value = button.props.value ? button.props.value : button.props.children;
					var classes = React.addons.classSet({
						active: this.state.selected == value
					});
					return React.createElement("button", {className: classes, onClick: this.buttonClicked.bind(this,value)}, text)
				}.bind(this))
			)
		);
	}
});


},{"react/addons":"oWaOtE"}],4:[function(require,module,exports){
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		var sensitivity = 'Exact';
		return {sensitivity:sensitivity,match:sensitivity,n:3}
	},
	nChanged: function(e) {
		var n = e.target.value;
		if (n >= 1)
			this.state.n = n;
		this.calculateRegex(this.state);
	},
	calculateRegex: function(state) {
		var regex;

		var escape= function(s) {
			    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		};

		if (state.sensitivity == 'Exact') {
			regex = escape(state.term)
		}
		else {
			var term = state.term ? state.term : '';
			switch(state.match) {
				case 'Two':
					state.n = 2;
				case 'N':
					var str = '.{0,' + state.n + '}';
					regex = term.split('').map(function(c){return escape(c)}).join(str)
					break;
				case '*':
					var str = '.*';
					regex = term.split('').map(function(c){return escape(c)}).join(str)
					break;
				case 'Custom':
					regex = state.regex
					break;	
			}
		}
		state.regex = regex;
		this.setState(state);
	},
	regexChanged: function(e) {
		this.state.regex = e.target.value;
		this.setState(this.state);
	},
	termChanged: function(e) {
		var state = this.state;
		state.term = e.target.value;
		this.calculateRegex(state);
	},
	setSensitivity: function(sensitivity) {
		var state = this.state;
		var oldValue = state.sensitivity;
		state.sensitivity = sensitivity;

		if (sensitivity == 'Exact') {
			state.match = 'Exact';
		}
		else if (oldValue == 'Exact') {
			state.match = 'Two';
		}
		this.calculateRegex(state);
	},
	matchChanged: function(e) {
		var match = e.target.value;
		var state = this.state;
		state.match = match;
		if (match == 'Exact') {
			state.sensitivity = 'Exact';
		}
		this.calculateRegex(state);
	},
	render: function() {
		var ButtonGroup = require('./ButtonGroup');


		return (
React.createElement("div", null, 
	React.createElement("div", {className: "mini-section"}, 
		React.createElement("h3", null, "Enter the text to detect"), 
		React.createElement("div", {className: "collapse-group"}, 
			React.createElement("span", {className: "prefix"}, 
				"Term"
			), 
			React.createElement("input", {ref: "term", onChange: this.termChanged, type: "text", placeholder: ""})
		)

	), React.createElement("div", {className: "mini-section"}, 
		React.createElement("h3", null, "Choose Sensitivity"), 
		React.createElement(ButtonGroup, {selected: this.state.sensitivity, onChange: this.setSensitivity}, 
			React.createElement("button", null, "Exact"), 
			React.createElement("button", null, "Fuzzy")
		), 
		React.createElement("div", {className: "collapse-group"}, 
			React.createElement("span", {className: "prefix"}, 
				"Regex"
			), 
			React.createElement("input", {type: "text", placeholder: "regular expression", disabled: this.state.match !== "Custom", onChange: this.regexChanged, value: this.state.regex}), 
			this.state.match=='N' ? (
				React.createElement("input", {type: "number", className: "", onChange: this.nChanged, value: this.state.n})
			   
			)	: null, 
			React.createElement("select", {onChange: this.matchChanged, className: "postfix", disabled: this.state.sensitivity=='Exact', value: this.state.match}, 
				React.createElement("option", {value: "Exact"}, "Exact match"), 
				React.createElement("option", {value: "Two"}, "Match 2 Chars"), 
				React.createElement("option", {value: "N"}, "Match n Chars"), 
				React.createElement("option", {value: "*"}, "Match * Chars"), 
				React.createElement("option", {value: "Custom"}, "Custom Regex")
			)
		)
	), React.createElement("div", {className: "mini-section"}, 
		React.createElement("h3", null, "Preview"), 
		React.createElement("div", {className: "match-preview"}, 
			React.createElement("div", {className: "preview-main"}, 
				React.createElement("span", null, "See what VigilBot can detect:"), 
				React.createElement("textarea", null)
			), 
			React.createElement("div", {className: "preview-custom"}, 
				React.createElement("span", null, "Enter your own test text:"), 
				React.createElement("textarea", null)
			)
		)
	)
)
		);
	}
});


},{"./ButtonGroup":3,"react/addons":"oWaOtE"}],5:[function(require,module,exports){
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
	render: function() {
		return (
			React.createElement("footer", null, 
			React.createElement("div", {className: "row"}, 
			React.createElement("ul", {className: "footer-section"}, 
			React.createElement("li", null, "Github"), 
			React.createElement("li", null, "Github"), 
			React.createElement("li", null, "Github"), 
			React.createElement("li", null, "Github")
			), 	

			React.createElement("ul", {className: "footer-section"}, 
			React.createElement("li", null, React.createElement("a", {href: "#"}, "Privacy")), 
			React.createElement("li", null, React.createElement("a", {href: "#"}, "ToS")), 
			React.createElement("li", null, "c 2015 Desmond Lee")
			)
			)
			)
		);
	}
});


},{"react/addons":"oWaOtE"}],6:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');

module.exports = React.createClass({displayName: "exports",
	mixins: [Router.Navigation],
	goHome: function(e) {
		this.transitionTo('Home')
	},
	render: function() {
		var Link = Router.Link;
		
		return (
			React.createElement("header", null, 
				React.createElement("div", {className: "row"}, 
					React.createElement("h1", {onClick: this.goHome}, "VigilBot")
				)
			)
		);
	}
});


},{"react-router":"TIQRyI","react/addons":"oWaOtE"}],7:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');

module.exports = React.createClass({displayName: "exports",
	render: function() {
		var Link = Router.Link;
		
		return (
React.createElement("nav", {className: "site-nav", role: "navigation"}, 
	React.createElement("div", {className: "row"}, 
		React.createElement("div", {className: "navigation"}, 
			React.createElement(Link, {to: "Reactions", className: "item"}, "Reactions"), 
			React.createElement(Link, {to: "Logs", className: "item"}, "Logs")
		)
	)
)
		);
	}
});


},{"react-router":"TIQRyI","react/addons":"oWaOtE"}],8:[function(require,module,exports){
var React = require('react/addons');

module.exports = React.createClass({displayName: "exports",
	componentWillMount: function() {
		if (this.props.selected) {
			this.setState({selected: this.props.selected})
		}
	},
	componentWillReceiveProps: function(props) {
		if (this.props.selected) {
			this.setState({selected: props.selected});
		}
	},
	getInitialState: function() {
		return {
			selected: null
		}
	},
	buttonClicked: function(button, idx, e) {
		this.setState({selected: button});
		if (this.props.onChange) {
			this.props.onChange(button, idx, e);
		}
	},
	render: function() {
		return (
			React.createElement("div", {className: "button-group"}, 
				this.props.children.map(function(button, i) {
					var text = button.props.children;
					var value = button.props.value ? button.props.value : button.props.children;
					var classes = React.addons.classSet({
						active: this.state.selected == value
					});
					return React.createElement("button", {className: classes, onClick: this.buttonClicked.bind(this,value)}, text)
				}.bind(this))
			)
		);
	}
});


},{"react/addons":"oWaOtE"}],9:[function(require,module,exports){
console.log("main js file");
var React = require('react/addons');
var Router = require('react-router');

var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var RootRouteHandler = require('./routes/RootRouteHandler')
var HomeRoute = require('./routes/HomeRouteHandler');
var NotFoundRouteHandler = require('./routes/NotFoundRouteHandler');

var serverConfig = require('../../server/config');

var loginRouteHandler = require('./routes/loginRouteHandler');
var LogsRouteHandler = require('./routes/LogsRouteHandler');
var ReactionsRouteHandler = require('./routes/ReactionsRouteHandler');
var EditReactionRouteHandler = require('./routes/EditReactionRouteHandler');
var NestedRouteHandler = require('./routes/NestedRouteHandler');
/* deslight require hook - do not modify this line */

var routes = (
	React.createElement(Route, {handler: RootRouteHandler, path: "/"}, 
		React.createElement(DefaultRoute, {name: "Home", handler: HomeRoute}), 
		React.createElement(NotFoundRoute, {handler: NotFoundRouteHandler}), 
React.createElement(Route, {handler: loginRouteHandler, name: "Login", path: "login"}), 
React.createElement(Route, {handler: LogsRouteHandler, name: "Logs", path: "logs"}), 
React.createElement(Route, {handler: NestedRouteHandler, name: "Reactions", path: "reactions"}, 
	React.createElement(DefaultRoute, {handler: ReactionsRouteHandler}), 
	React.createElement(Route, {handler: EditReactionRouteHandler, name: "CreateReaction", path: "create"}), 
	React.createElement(Route, {handler: EditReactionRouteHandler, name: "EditReaction", path: "edit/:name"})
), 
"/* deslight route hook - do not modify this line */"
	)
);

Router.run(routes, /*Router.HistoryLocation,*/ function(Handler) {
	var injectPoint = document.getElementById('root_pixiebot2')
	var port = injectPoint.getAttribute('data-api-port')
	React.render(React.createElement(Handler, {port: port}), injectPoint);
});




},{"../../server/config":23,"./routes/EditReactionRouteHandler":10,"./routes/HomeRouteHandler":11,"./routes/LogsRouteHandler":12,"./routes/NestedRouteHandler":13,"./routes/NotFoundRouteHandler":14,"./routes/ReactionsRouteHandler":15,"./routes/RootRouteHandler":16,"./routes/loginRouteHandler":17,"react-router":"TIQRyI","react/addons":"oWaOtE"}],10:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State, Router.Navigation ],
	saveButton: function() {

		if (!this.state.name || this.state.name.length == 0) {
			return;
		}

		if (this.state.createOrEdit == 'create' && this.props.onCreateReaction) {
			this.props.onCreateReaction(this.state);
		}
		else if(this.state.createOrEdit == 'edit' && this.props.onEditReaction) {
			this.props.onEditReaction(this.state);
		}

		this.transitionTo("Reactions");

	},
	nameChanged: function(e) {
		this.state.name = e.target.value;
		this.setState(this.state);
	},
	getInitialState: function() {
		return {
			tab: 'Detection',
			createOrEdit: this.getParams().name ? 'edit' : 'create'
		}
	},
	reactionStep: function(step, idx) {
		this.setState({
		 tab: step
		});
	},
	render: function() {
		var route = this.getRoutes();
		var ButtonGroup = require('../components/ButtonGroup');

		var Tab = {
			'Detection': require('../components/DetectionReactionTab'),
			'Availability': require('../components/AvailabilityReactionTab'),
			'Action': require('../components/ActionReactionTab')
		}[this.state.tab];

		return (
React.createElement("div", {className: ""}, 
	React.createElement("div", {className: "sect-block feature primary"}, 
		React.createElement("div", {className: "row"}, 
			React.createElement("h1", null, this.state.createOrEdit[0].toUpperCase() + this.state.createOrEdit.substr(1), " Reaction"), 
			React.createElement("span", {className: "description"}, 
				"VigilBot can apply this Reaction to all users, or only specific users in your channel"
			)
		)

	), 

	React.createElement("section", {className: "sect-block feature secondary"}, 
		React.createElement("div", {className: "row"}, 
			React.createElement("h2", null, "What is the name of this Reaction?"), 
			React.createElement("input", {type: "text", placeholder: "Enter a name", value: this.state.name, onChange: this.nameChanged})
		)
	), 


	React.createElement("section", {className: "sect-block main-block stretch"}, 
		React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "nested-nav"}, 
				React.createElement("h3", null, "Configure this Reaction:"), 
				React.createElement(ButtonGroup, {selected: this.state.tab, onChange: this.reactionStep}, 
					React.createElement("button", null, "Detection"), 
					React.createElement("button", null, "Availability"), 
					React.createElement("button", null, "Action")
				), 
				{
					'Detection': "Specify the text that VigilBot will detect, and specify VigilBot's sensitivity to it.",
					'Availability': "Specify the users to whom VigilBot will apply this Reaction.",
					'Action': "Specify the action VigilBot will perform."
				}[this.state.tab]
			), 

			React.createElement("div", {className: "nested-section"}, 
				React.createElement(Tab, null)
			)
		)
	), 
	React.createElement("div", {className: "row"}, 
		React.createElement("button", {className: "button primary small-4"}, 
			"Cancel"
		), 
		React.createElement("button", {className: "button alert small-4 right", onClick: this.saveButton}, 
			"Save"
		)
	)
)

		);
	}
});


},{"../components/ActionReactionTab":1,"../components/AvailabilityReactionTab":2,"../components/ButtonGroup":3,"../components/DetectionReactionTab":4,"react-router":"TIQRyI","react/addons":"oWaOtE"}],11:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State ],
	render: function() {
		var route = this.getRoutes();
		
		return (
			React.createElement("div", null, 
	React.createElement("div", {className: "sect-block feature primary"}, 
		React.createElement("div", {className: "row"}, 
			React.createElement("h1", null, "Welcome to VigilBot"), 
			React.createElement("span", {className: "description"}, 
				"VigilBot helps keep your channel safe and fun by vigilantly watching the chat and reacting to a wide variety of configurable events."
			)
		)
	), 


	React.createElement("section", {className: "sect-block main-block stretch"}, 
		React.createElement("div", {className: "row"}, 
			React.createElement("h2", null, "Getting started"), 
			"blah blah blah here's how you authenticate and blah blah more instructions and stuff."
		)
	)

			)
		);
	}
});


},{"react-router":"TIQRyI","react/addons":"oWaOtE"}],12:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var request = require('superagent');

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State ],
	componentDidMount: function() {
		var login = this.props.session
			
		request.get('/api/ChatLogs?filter[order]=date DESC')
			.set('Authorization', login.id)
			.end(function(res) {
				if (res.status==200) 
					this.setState({logs: JSON.parse(res.text)});
			}.bind(this))
	},
	getInitialState: function() {
		return {
			logs: []
		}
	},
	render: function() {
		var route = this.getRoutes();

		console.log(this.state.logs);
		var logs = this.state.logs.map(function(log){
			var moment = require('moment');
			return (
				React.createElement("tr", null, 
					React.createElement("td", null, 
						moment(log.date).fromNow()
					), 

					React.createElement("td", null, 
						log.nick
					), 

					React.createElement("td", null, 
						log.content
					), 

					React.createElement("td", null, 
						log.triggers
					)

				)

			);	
		})

		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "sect-block feature primary"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("h1", null, "Logs"), 
						React.createElement("span", {className: "description"}, 
							"VigilBot keeps a record of all the activity on your channel."
						)
					)
				), 

				React.createElement("section", {className: "sect-block main-block stretch"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("h2", null, "Activity"), 
					React.createElement("table", {role: "grid"}, 
						React.createElement("thead", null, 
							React.createElement("tr", null, 
								React.createElement("th", null, "Date"), 
								React.createElement("th", null, "Name"), 
								React.createElement("th", null, "Content"), 
								React.createElement("th", null, "Triggers")
							)

						), 
						React.createElement("tbody", null, 
							logs
						)
					)
				)

				)
				
			)
		);
	}
});


},{"moment":19,"react-router":"TIQRyI","react/addons":"oWaOtE","superagent":20}],13:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State ],
	getInitialState: function() {
		return {
			reactions: {}
		}
	},
	onCreateReaction: function(reaction) {
		console.log(reaction);
		this.state.reactions[reaction.name] = reaction;
		this.setState(this.state);
	},
	render: function() {
		var route = this.getRoutes();
		
		return (
			React.createElement(RouteHandler, {reactions: this.state.reactions, onCreateReaction: this.onCreateReaction})
		);
	}
});


},{"react-router":"TIQRyI","react/addons":"oWaOtE"}],14:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State ],
	render: function() {
		var route = this.getRoutes();
		
		return (
			React.createElement("div", null, 
				React.createElement("h2", null, "Not found")
			)
		);
	}
});


},{"react-router":"TIQRyI","react/addons":"oWaOtE"}],15:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State ],
	render: function() {
		var route = this.getRoutes();

		var reactionNames = Object.keys(this.props.reactions)

		var reactionTable = function() {
			return reactionNames.map(function(name){
				return React.createElement("li", null, name)
			});

		}
		
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "sect-block feature primary"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("h1", null, "Reactions"), 
						React.createElement("span", {className: "description"}, 
							"VigilBot can react to user-defined events in the channel in a number of ways. Using Reactions, you can implement a blacklist, commands, or other types of actions."
						)
					), 
					React.createElement("div", {className: "mini-section row"}, 
						React.createElement(Link, {to: "CreateReaction", className: "button"}, "Create a Reaction")
					)
				), 
				React.createElement("div", {className: "sect-block"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("h2", null, "Reactions"), 
						reactionNames.length > 0 ? reactionTable()
						: React.createElement("p", null, "You have no reactions")
					)
				)
			)
		);
	}
});


},{"react-router":"TIQRyI","react/addons":"oWaOtE"}],16:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var request = require('browser-request');

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State ],
	getInitialState: function() {
		return {
			login: true,
			checking: false
		}
	},
	componentWillMount: function() {
		if (localStorage.login) {
			this.setState({checking: true})
			try {
				var login = JSON.parse(localStorage.login);
				
				request.get({
					url: '/api/Users/'+login.userId,
					headers: {
						Authorization: login.id
					}
				}, function(err, resp, body) {
					if (resp.status == 200) {
						this.setState({login: login});
					}
					else {
						delete localStorage.login
					}

					this.setState({checking: false})
				}.bind(this))
			}
			catch(e)  {
				console.log(e)
				delete localStorage.login
				this.setState({checking: false})
			}
		}
	},
	onLogin: function(login) {
		localStorage.login = JSON.stringify(login);
		this.setState({login: login})
	},
	render: function() {
		var Login = require('./loginRouteHandler')

		var handler = this.state.login ? React.createElement(RouteHandler, {port: this.props.port, session: this.state.login}) : React.createElement(Login, {onLogin: this.onLogin}) 
		
		var Header = require('../components/Header');
		var Nav = require('../components/Nav');
		var Footer = require('../components/Footer');

		return (
			React.createElement("div", {className: "layout flex"}, 
				React.createElement(Header, null), 
				React.createElement(Nav, null), 
				React.createElement("main", {className: "w"}, 
					this.state.checking ? null : handler
				), 
				React.createElement(Footer, null)
			)
		);
	}
});


},{"../components/Footer":5,"../components/Header":6,"../components/Nav":7,"./loginRouteHandler":17,"browser-request":18,"react-router":"TIQRyI","react/addons":"oWaOtE"}],17:[function(require,module,exports){
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var request = require('browser-request');

module.exports = React.createClass({displayName: "exports",
	mixins: [ Router.State ],
	login: function(e) {
		e.preventDefault();
		var password = this.refs.password.getDOMNode();

		request.post({
			url: '/api/Users/login',
			json: {
				email: 'artelusify@gmail.com',
				password: password.value
			}
		}, function(err, response, body) {
			if (response.status != 200) {
				var msg = body && body.error && body.error.message ? body.error.message : "Invalid login"
				console.log(msg);
				this.setState({fail:msg, success: false});
			}
			else {
				this.setState({fail: false, success: "Logged in successfully"})
				//request.get({
					//url: '/api/Users/'+body.userId,
					//headers: {
						//Authorization: token
					//}
				//}, function(err, resp, body) {
					//console.log(body);
				//})
				
				if (this.props.onLogin)	 {
					this.props.onLogin(body);
				}

				password.value = ''
			}
		}.bind(this));
		
	},
	getInitialState: function() {
		return {
			fail: false,
			success: false 
		}
	},
	render: function() {
		var route = this.getRoutes();
		var successmsg = this.state.success ? (
			React.createElement("div", {className: "alert-box success"}, this.state.success)
		
		) : null
		
		var failmsg = this.state.fail ? (
			React.createElement("div", {className: "alert-box secondary"}, this.state.fail)
		
		) : null
		
		return (
			React.createElement("div", {className: "sect-block feature primary"}, 
				React.createElement("form", {onSubmit: this.login}, 
					React.createElement("div", {className: "row collapse"}, 
						React.createElement("h2", null, "Log in"), 

						successmsg, 
						failmsg, 

						React.createElement("div", {className: "small-9 columns"}, 
							React.createElement("input", {ref: "password", placeholder: "password", type: "password"})
						), 

						React.createElement("div", {className: "small-3 columns"}, 
							React.createElement("button", {className: "button postfix", type: "submit"}, "Submit")
						)

					)
				)
			)
		);
	}
});


},{"browser-request":18,"react-router":"TIQRyI","react/addons":"oWaOtE"}],18:[function(require,module,exports){
// Browser Request
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// UMD HEADER START 
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {
// UMD HEADER END

var XHR = XMLHttpRequest
if (!XHR) throw new Error('missing XMLHttpRequest')
request.log = {
  'trace': noop, 'debug': noop, 'info': noop, 'warn': noop, 'error': noop
}

var DEFAULT_TIMEOUT = 3 * 60 * 1000 // 3 minutes

//
// request
//

function request(options, callback) {
  // The entry-point to the API: prep the options object and pass the real work to run_xhr.
  if(typeof callback !== 'function')
    throw new Error('Bad callback given: ' + callback)

  if(!options)
    throw new Error('No options given')

  var options_onResponse = options.onResponse; // Save this for later.

  if(typeof options === 'string')
    options = {'uri':options};
  else
    options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.

  options.onResponse = options_onResponse // And put it back.

  if (options.verbose) request.log = getLogger();

  if(options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if(!options.uri && options.uri !== "")
    throw new Error("options.uri is a required argument");

  if(typeof options.uri != "string")
    throw new Error("options.uri must be a string");

  var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
  for (var i = 0; i < unsupported_options.length; i++)
    if(options[ unsupported_options[i] ])
      throw new Error("options." + unsupported_options[i] + " is not supported")

  options.callback = callback
  options.method = options.method || 'GET';
  options.headers = options.headers || {};
  options.body    = options.body || null
  options.timeout = options.timeout || request.DEFAULT_TIMEOUT

  if(options.headers.host)
    throw new Error("Options.headers.host is not supported");

  if(options.json) {
    options.headers.accept = options.headers.accept || 'application/json'
    if(options.method !== 'GET')
      options.headers['content-type'] = 'application/json'

    if(typeof options.json !== 'boolean')
      options.body = JSON.stringify(options.json)
    else if(typeof options.body !== 'string')
      options.body = JSON.stringify(options.body)
  }
  
  //BEGIN QS Hack
  var serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  
  if(options.qs){
    var qs = (typeof options.qs == 'string')? options.qs : serialize(options.qs);
    if(options.uri.indexOf('?') !== -1){ //no get params
        options.uri = options.uri+'&'+qs;
    }else{ //existing get params
        options.uri = options.uri+'?'+qs;
    }
  }
  //END QS Hack
  
  //BEGIN FORM Hack
  var multipart = function(obj) {
    //todo: support file type (useful?)
    var result = {};
    result.boundry = '-------------------------------'+Math.floor(Math.random()*1000000000);
    var lines = [];
    for(var p in obj){
        if (obj.hasOwnProperty(p)) {
            lines.push(
                '--'+result.boundry+"\n"+
                'Content-Disposition: form-data; name="'+p+'"'+"\n"+
                "\n"+
                obj[p]+"\n"
            );
        }
    }
    lines.push( '--'+result.boundry+'--' );
    result.body = lines.join('');
    result.length = result.body.length;
    result.type = 'multipart/form-data; boundary='+result.boundry;
    return result;
  }
  
  if(options.form){
    if(typeof options.form == 'string') throw('form name unsupported');
    if(options.method === 'POST'){
        var encoding = (options.encoding || 'application/x-www-form-urlencoded').toLowerCase();
        options.headers['content-type'] = encoding;
        switch(encoding){
            case 'application/x-www-form-urlencoded':
                options.body = serialize(options.form).replace(/%20/g, "+");
                break;
            case 'multipart/form-data':
                var multi = multipart(options.form);
                //options.headers['content-length'] = multi.length;
                options.body = multi.body;
                options.headers['content-type'] = multi.type;
                break;
            default : throw new Error('unsupported encoding:'+encoding);
        }
    }
  }
  //END FORM Hack

  // If onResponse is boolean true, call back immediately when the response is known,
  // not when the full request is complete.
  options.onResponse = options.onResponse || noop
  if(options.onResponse === true) {
    options.onResponse = callback
    options.callback = noop
  }

  // XXX Browsers do not like this.
  //if(options.body)
  //  options.headers['content-length'] = options.body.length;

  // HTTP basic authentication
  if(!options.headers.authorization && options.auth)
    options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);

  return run_xhr(options)
}

var req_seq = 0
function run_xhr(options) {
  var xhr = new XHR
    , timed_out = false
    , is_cors = is_crossDomain(options.uri)
    , supports_cors = ('withCredentials' in xhr)

  req_seq += 1
  xhr.seq_id = req_seq
  xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
  xhr._id = xhr.id // I know I will type "_id" from habit all the time.

  if(is_cors && !supports_cors) {
    var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
    cors_err.cors = 'unsupported'
    return options.callback(cors_err, xhr)
  }

  xhr.timeoutTimer = setTimeout(too_late, options.timeout)
  function too_late() {
    timed_out = true
    var er = new Error('ETIMEDOUT')
    er.code = 'ETIMEDOUT'
    er.duration = options.timeout

    request.log.error('Timeout', { 'id':xhr._id, 'milliseconds':options.timeout })
    return options.callback(er, xhr)
  }

  // Some states can be skipped over, so remember what is still incomplete.
  var did = {'response':false, 'loading':false, 'end':false}

  xhr.onreadystatechange = on_state_change
  xhr.open(options.method, options.uri, true) // asynchronous
  if(is_cors)
    xhr.withCredentials = !! options.withCredentials
  xhr.send(options.body)
  return xhr

  function on_state_change(event) {
    if(timed_out)
      return request.log.debug('Ignoring timed out state change', {'state':xhr.readyState, 'id':xhr.id})

    request.log.debug('State change', {'state':xhr.readyState, 'id':xhr.id, 'timed_out':timed_out})

    if(xhr.readyState === XHR.OPENED) {
      request.log.debug('Request started', {'id':xhr.id})
      for (var key in options.headers)
        xhr.setRequestHeader(key, options.headers[key])
    }

    else if(xhr.readyState === XHR.HEADERS_RECEIVED)
      on_response()

    else if(xhr.readyState === XHR.LOADING) {
      on_response()
      on_loading()
    }

    else if(xhr.readyState === XHR.DONE) {
      on_response()
      on_loading()
      on_end()
    }
  }

  function on_response() {
    if(did.response)
      return

    did.response = true
    request.log.debug('Got response', {'id':xhr.id, 'status':xhr.status})
    clearTimeout(xhr.timeoutTimer)
    xhr.statusCode = xhr.status // Node request compatibility

    // Detect failed CORS requests.
    if(is_cors && xhr.statusCode == 0) {
      var cors_err = new Error('CORS request rejected: ' + options.uri)
      cors_err.cors = 'rejected'

      // Do not process this request further.
      did.loading = true
      did.end = true

      return options.callback(cors_err, xhr)
    }

    options.onResponse(null, xhr)
  }

  function on_loading() {
    if(did.loading)
      return

    did.loading = true
    request.log.debug('Response body loading', {'id':xhr.id})
    // TODO: Maybe simulate "data" events by watching xhr.responseText
  }

  function on_end() {
    if(did.end)
      return

    did.end = true
    request.log.debug('Request done', {'id':xhr.id})

    xhr.body = xhr.responseText
    if(options.json) {
      try        { xhr.body = JSON.parse(xhr.responseText) }
      catch (er) { return options.callback(er, xhr)        }
    }

    options.callback(null, xhr, xhr.body)
  }

} // request

request.withCredentials = false;
request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;

//
// defaults
//

request.defaults = function(options, requester) {
  var def = function (method) {
    var d = function (params, callback) {
      if(typeof params === 'string')
        params = {'uri': params};
      else {
        params = JSON.parse(JSON.stringify(params));
      }
      for (var i in options) {
        if (params[i] === undefined) params[i] = options[i]
      }
      return method(params, callback)
    }
    return d
  }
  var de = def(request)
  de.get = def(request.get)
  de.post = def(request.post)
  de.put = def(request.put)
  de.head = def(request.head)
  return de
}

//
// HTTP method shortcuts
//

var shortcuts = [ 'get', 'put', 'post', 'head' ];
shortcuts.forEach(function(shortcut) {
  var method = shortcut.toUpperCase();
  var func   = shortcut.toLowerCase();

  request[func] = function(opts) {
    if(typeof opts === 'string')
      opts = {'method':method, 'uri':opts};
    else {
      opts = JSON.parse(JSON.stringify(opts));
      opts.method = method;
    }

    var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
    return request.apply(this, args);
  }
})

//
// CouchDB shortcut
//

request.couch = function(options, callback) {
  if(typeof options === 'string')
    options = {'uri':options}

  // Just use the request API to do JSON.
  options.json = true
  if(options.body)
    options.json = options.body
  delete options.body

  callback = callback || noop

  var xhr = request(options, couch_handler)
  return xhr

  function couch_handler(er, resp, body) {
    if(er)
      return callback(er, resp, body)

    if((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
      // The body is a Couch JSON object indicating the error.
      er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
      for (var key in body)
        er[key] = body[key]
      return callback(er, resp, body);
    }

    return callback(er, resp, body);
  }
}

//
// Utility
//

function noop() {}

function getLogger() {
  var logger = {}
    , levels = ['trace', 'debug', 'info', 'warn', 'error']
    , level, i

  for(i = 0; i < levels.length; i++) {
    level = levels[i]

    logger[level] = noop
    if(typeof console !== 'undefined' && console && console[level])
      logger[level] = formatted(console, level)
  }

  return logger
}

function formatted(obj, method) {
  return formatted_logger

  function formatted_logger(str, context) {
    if(typeof context === 'object')
      str += ' ' + JSON.stringify(context)

    return obj[method].call(obj, str)
  }
}

// Return whether a URL is a cross-domain request.
function is_crossDomain(url) {
  var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/

  // jQuery #8138, IE may throw an exception when accessing
  // a field from window.location if document.domain has been set
  var ajaxLocation
  try { ajaxLocation = location.href }
  catch (e) {
    // Use the href attribute of an A element since IE will modify it given document.location
    ajaxLocation = document.createElement( "a" );
    ajaxLocation.href = "";
    ajaxLocation = ajaxLocation.href;
  }

  var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
    , parts = rurl.exec(url.toLowerCase() )

  var result = !!(
    parts &&
    (  parts[1] != ajaxLocParts[1]
    || parts[2] != ajaxLocParts[2]
    || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
    )
  )

  //console.debug('is_crossDomain('+url+') -> ' + result)
  return result
}

// MIT License from http://phpjs.org/functions/base64_encode:358
function b64_enc (data) {
    // Encodes string using MIME base64 algorithm
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc="", tmp_arr = [];

    if (!data) {
        return data;
    }

    // assume utf8 data
    // data = this.utf8_encode(data+'');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    switch (data.length % 3) {
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}
    return request;
//UMD FOOTER START
}));
//UMD FOOTER END


},{}],19:[function(require,module,exports){
(function (global){
//! moment.js
//! version : 2.9.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.9.0',
        // the global-scope this is NOT the global object in Node.js
        globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this,
        oldGlobalMoment,
        round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenOffsetMs = /[\+\-]?\d+/, // 1234567890123
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-', '15', '30']
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            x    : function () {
                return this.valueOf();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'],

        updateInProgress = false;

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    function monthDiff(a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // thie is not supposed to happen
            return hour;
        }
    }

    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            moment.updateOffset(this);
            updateInProgress = false;
        }
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 24 ||
                    (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 ||
                                           m._a[SECOND] !== 0 ||
                                           m._a[MILLISECOND] !== 0)) ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0 &&
                    m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/utcOffset equivalent to
    // model.
    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ?
                    +input : +moment(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        } else {
            return moment(input).local();
        }
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _ordinalParseLenient.
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName, format, strict) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = moment.utc([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                    return i;
                } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LTS : 'h:mm:ss A',
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },


        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom, now) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom, [now]) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',
        _ordinalParse : /\d{1,2}/,

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        firstDayOfWeek : function () {
            return this._week.dow;
        },

        firstDayOfYear : function () {
            return this._week.doy;
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'x':
            return parseTokenOffsetMs;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function utcOffsetFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input, token, config._strict);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(
                            input.match(/\d{1,2}/)[0], 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._meridiem = input;
            // config._isPm = config._locale.isPM(input);
            break;
        // HOUR
        case 'h' : // fall through to hh
        case 'hh' :
            config._pf.bigHour = true;
            /* falls through */
        case 'H' : // fall through to HH
        case 'HH' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX OFFSET (MILLISECONDS)
        case 'x':
            config._d = new Date(toInt(input));
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = utcOffsetFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day || normalizedInput.date,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR],
                config._meridiem);
        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be 'T' or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f,
            res;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        res = new Moment(config);
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    moment.isDate = isDate;

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d - ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ('function' === typeof Date.prototype.toISOString) {
                    // native implementation is ~50x faster, use it when we can
                    return this.toDate().toISOString();
                } else {
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.subtract(this._dateUtcOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4,
                anchor, diff, output, daysAdjust;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month' || units === 'quarter') {
                output = monthDiff(this, that);
                if (units === 'quarter') {
                    output = output / 3;
                } else if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = this - that;
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're locat/utc/offset
            // or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.utcOffset() > this.clone().month(0).utcOffset() ||
                this.utcOffset() > this.clone().month(5).utcOffset());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond') {
                return this;
            }
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },

        isBefore: function (input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },

        isBetween: function (from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units);
        },

        isSame: function (input, units) {
            var inputMs;
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                inputMs = +moment(input);
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
            }
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        zone : deprecate(
                'moment().zone is deprecated, use moment().utcOffset instead. ' +
                'https://github.com/moment/moment/issues/1779',
                function (input, keepLocalTime) {
                    if (input != null) {
                        if (typeof input !== 'string') {
                            input = -input;
                        }

                        this.utcOffset(input, keepLocalTime);

                        return this;
                    } else {
                        return -this.utcOffset();
                    }
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        utcOffset : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = utcOffsetFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateUtcOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(input - offset, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }

                return this;
            } else {
                return this._isUTC ? offset : this._dateUtcOffset();
            }
        },

        isLocal : function () {
            return !this._isUTC;
        },

        isUtcOffset : function () {
            return this._isUTC;
        },

        isUtc : function () {
            return this._isUTC && this._offset === 0;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.utcOffset(this._tzm);
            } else if (typeof this._i === 'string') {
                this.utcOffset(utcOffsetFromString(this._i));
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).utcOffset();
            }

            return (this.utcOffset() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            var unit;
            if (typeof units === 'object') {
                for (unit in units) {
                    this.set(unit, units[unit]);
                }
            }
            else {
                units = normalizeUnits(units);
                if (typeof this[units] === 'function') {
                    this[units](value);
                }
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },

        lang : deprecate(
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        ),

        localeData : function () {
            return this._locale;
        },

        _dateUtcOffset : function () {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return -Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }

    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    // alias isUtc for dev-friendliness
    moment.fn.isUTC = moment.fn.isUtc;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)',
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        },

        toJSON : function () {
            return this.toISOString();
        }
    });

    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LOCALES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define(function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],20:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? this
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

function getXHR() {
  if (root.XMLHttpRequest
    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
}

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  this.text = this.req.method !='HEAD' 
     ? this.xhr.responseText 
     : null;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && str.length
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status || 1223 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self); 
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
    }

    self.callback(err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  if (2 == fn.length) return fn(err, res);
  if (err) return this.emit('error', err);
  fn(res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;
    if (0 == xhr.status) {
      if (self.aborted) return self.timeoutError();
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  if (xhr.upload) {
    xhr.upload.onprogress = function(e){
      e.percent = e.loaded / e.total * 100;
      self.emit('progress', e);
    };
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;


},{"emitter":21,"reduce":22}],21:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


},{}],22:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};

},{}],23:[function(require,module,exports){
module.exports={
  "host": "0.0.0.0",
  "port": 3000,
  "remoting": {
    "context": {
      "enableHttpContext": false
    },
    "rest": {
      "normalizeHttpPath": false,
      "xml": false
    },
    "json": {
      "strict": false,
      "limit": "100kb"
    },
    "urlencoded": {
      "extended": true,
      "limit": "100kb"
    },
    "cors": {
      "origin": true,
      "credentials": true
    },
    "errorHandler": {
      "disableStackTrace": false
    }
  }
}

},{}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxub2RlX21vZHVsZXNcXGd1bHAtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOlxcVXNlcnNcXGRlc21vbmRcXFByb2plY3RzXFxwaXhpZWJvdDJcXGNsaWVudFxcYXBwXFxjb21wb25lbnRzXFxBY3Rpb25SZWFjdGlvblRhYi5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxhcHBcXGNvbXBvbmVudHNcXEF2YWlsYWJpbGl0eVJlYWN0aW9uVGFiLmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXGFwcFxcY29tcG9uZW50c1xcQnV0dG9uR3JvdXAuanMiLCJDOlxcVXNlcnNcXGRlc21vbmRcXFByb2plY3RzXFxwaXhpZWJvdDJcXGNsaWVudFxcYXBwXFxjb21wb25lbnRzXFxEZXRlY3Rpb25SZWFjdGlvblRhYi5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxhcHBcXGNvbXBvbmVudHNcXEZvb3Rlci5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxhcHBcXGNvbXBvbmVudHNcXEhlYWRlci5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxhcHBcXGNvbXBvbmVudHNcXE5hdi5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxhcHBcXGNvbXBvbmVudHNcXGJ1dHRvbkdyb3VwLmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXGFwcFxcbWFpbi5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxhcHBcXHJvdXRlc1xcRWRpdFJlYWN0aW9uUm91dGVIYW5kbGVyLmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXGFwcFxccm91dGVzXFxIb21lUm91dGVIYW5kbGVyLmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXGFwcFxccm91dGVzXFxMb2dzUm91dGVIYW5kbGVyLmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXGFwcFxccm91dGVzXFxOZXN0ZWRSb3V0ZUhhbmRsZXIuanMiLCJDOlxcVXNlcnNcXGRlc21vbmRcXFByb2plY3RzXFxwaXhpZWJvdDJcXGNsaWVudFxcYXBwXFxyb3V0ZXNcXE5vdEZvdW5kUm91dGVIYW5kbGVyLmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXGFwcFxccm91dGVzXFxSZWFjdGlvbnNSb3V0ZUhhbmRsZXIuanMiLCJDOlxcVXNlcnNcXGRlc21vbmRcXFByb2plY3RzXFxwaXhpZWJvdDJcXGNsaWVudFxcYXBwXFxyb3V0ZXNcXFJvb3RSb3V0ZUhhbmRsZXIuanMiLCJDOlxcVXNlcnNcXGRlc21vbmRcXFByb2plY3RzXFxwaXhpZWJvdDJcXGNsaWVudFxcYXBwXFxyb3V0ZXNcXGxvZ2luUm91dGVIYW5kbGVyLmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1yZXF1ZXN0XFxpbmRleC5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxub2RlX21vZHVsZXNcXG1vbWVudFxcbW9tZW50LmpzIiwiQzpcXFVzZXJzXFxkZXNtb25kXFxQcm9qZWN0c1xccGl4aWVib3QyXFxjbGllbnRcXG5vZGVfbW9kdWxlc1xcc3VwZXJhZ2VudFxcbGliXFxjbGllbnQuanMiLCJDOlxcVXNlcnNcXGRlc21vbmRcXFByb2plY3RzXFxwaXhpZWJvdDJcXGNsaWVudFxcbm9kZV9tb2R1bGVzXFxzdXBlcmFnZW50XFxub2RlX21vZHVsZXNcXGNvbXBvbmVudC1lbWl0dGVyXFxpbmRleC5qcyIsIkM6XFxVc2Vyc1xcZGVzbW9uZFxcUHJvamVjdHNcXHBpeGllYm90MlxcY2xpZW50XFxub2RlX21vZHVsZXNcXHN1cGVyYWdlbnRcXG5vZGVfbW9kdWxlc1xccmVkdWNlLWNvbXBvbmVudFxcaW5kZXguanMiLCJDOi9Vc2Vycy9kZXNtb25kL1Byb2plY3RzL3BpeGllYm90Mi9zZXJ2ZXIvY29uZmlnLmpzb24iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXBDLG9DQUFvQyx1QkFBQTtDQUNuQyxlQUFlLEVBQUUsV0FBVztFQUMzQixPQUFPO0dBQ04sY0FBYyxFQUFFLEtBQUs7R0FDckIsT0FBTyxFQUFFLEVBQUU7R0FDWDtFQUNEO0NBQ0QsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFO0VBQ3RCLElBQUksTUFBTSxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO0VBQ2hELE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU07RUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUMxQjtDQUNELFlBQVksRUFBRSxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUU7RUFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7RUFDakMsT0FBTyxDQUFDLE1BQU0s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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLEtBQUssQ0FBQztFQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUM7RUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztFQUN0RCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQzs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUM7RUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztFQUNoRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQzs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLElBQUksRUFBRSxJQUFJLENBQUM7RUFDM0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0VBQzFDLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsQ0FBQztFQUNyQyxJQUFJLFFBQVEsSUFBSSxPQUFPLEdBQUcsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pELElBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQy9CLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxJQUFJLEVBQUUsR0FBRyxDQUFDO0VBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztFQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDakMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVILE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUM7RUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0VBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7RUFDN0MsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUgsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxJQUFJLENBQUM7RUFDckMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNCLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1Qzs7RUFFRSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQy9CLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO01BQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdCO0dBQ0YsTUFBTSxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksRUFBRTtJQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEMsSUFBSSxtQ0FBbUMsSUFBSSxJQUFJLEVBQUU7TUFDL0MsSUFBSSxDQUFDLEtBQUssR0FB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IihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2VsZWN0ZWRBY3Rpb246ICdiYW4nLFxyXG5cdFx0XHRhY3Rpb25zOiBbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0YWRkQWN0aW9uOiBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgYWN0aW9uID0ge2FjdGlvbjogdGhpcy5zdGF0ZS5zZWxlY3RlZEFjdGlvbn1cclxuXHRcdGFjdGlvbi5uYW1lID0gYWN0aW9uLmFjdGlvblxyXG5cdFx0dGhpcy5zdGF0ZS5hY3Rpb25zLnB1c2goYWN0aW9uKVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcclxuXHR9LFxyXG5cdG1vdmVBY3Rpb25VcDogZnVuY3Rpb24oaSwgYW1vdW50KSB7XHJcblx0XHR2YXIgYWN0aW9ucyA9IHRoaXMuc3RhdGUuYWN0aW9ucztcclxuXHRcdGFjdGlvbnMuc3BsaWNlKGktYW1vdW50LCAwLCBhY3Rpb25zLnNwbGljZShpLCAxKVswXSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xyXG5cdH0sXHJcblx0bW92ZUFjdGlvbkRvd246IGZ1bmN0aW9uKGksIGFtb3VudCkge1xyXG5cdFx0dmFyIGFjdGlvbnMgPSB0aGlzLnN0YXRlLmFjdGlvbnM7XHJcblx0XHRhY3Rpb25zLnNwbGljZShpK2Ftb3VudCwgMCwgYWN0aW9ucy5zcGxpY2UoaSwgMSlbMF0pO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgQnV0dG9uR3JvdXAgPSByZXF1aXJlKCcuL0J1dHRvbkdyb3VwJyk7XHJcblxyXG5cdFx0dmFyIGFjdGlvbnNMaXN0SXRlbSA9IGZ1bmN0aW9uKGFjdGlvbiwgaSwgbGlzdCkge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UtZ3JvdXBcIj5cclxuXHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9e2FjdGlvbi5uYW1lfSBkaXNhYmxlZD17dHJ1ZX0gLz5cclxuXHRcdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwicG9zdGZpeFwiIG9uQ2xpY2s9e3RoaXMubW92ZUFjdGlvbkRvd24uYmluZCh0aGlzLCBpLCAxKX0gZGlzYWJsZWQ9e2xpc3QubGVuZ3RoID09PSBpKzF9ID5Nb3ZlIGRvd248L2J1dHRvbj5cclxuXHRcdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPVwicG9zdGZpeFwiIG9uQ2xpY2s9e3RoaXMubW92ZUFjdGlvblVwLmJpbmQodGhpcywgaSwgMSl9IGRpc2FibGVkPXtpID09PSAwfT5Nb3ZlIHVwPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cInBvc3RmaXggYWxlcnRcIj5SZW1vdmU8L2J1dHRvbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KTtcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHVuZGVyIGNvbnN0cnVjdGlvblxyXG5cdFx0XHRcdDxCdXR0b25Hcm91cCBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3RlZEFjdGlvbn0gb25DaGFuZ2U9e2Z1bmN0aW9uKHZhbCl7dGhpcy5zdGF0ZS5zZWxlY3RlZEFjdGlvbj12YWw7dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKX0uYmluZCh0aGlzKX0+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIHZhbHVlPVwiYmFuXCI+QmFuPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIHZhbHVlPVwidGltZW91dFwiPlRpbWVvdXQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDxidXR0b24gdmFsdWU9XCJjbGVhclwiPkNsZWFyIGNoYXQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDxidXR0b24gdmFsdWU9XCJtZXNzYWdlXCI+TWVzc2FnZTwvYnV0dG9uPlxyXG5cdFx0XHRcdDwvQnV0dG9uR3JvdXA+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibmVzdGVkLXNlY3Rpb25cIj5cclxuXHRcdFx0XHRcdDxoMz57dGhpcy5zdGF0ZS5zZWxlY3RlZEFjdGlvbn08L2gzPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmFkZEFjdGlvbn0+QWRkPC9idXR0b24+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdHt0aGlzLnN0YXRlLmFjdGlvbnMubGVuZ3RoID4gMCA/IChcclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8aDM+QWN0aW9uczwvaDM+XHJcblx0XHRcdFx0XHR7dGhpcy5zdGF0ZS5hY3Rpb25zLm1hcChhY3Rpb25zTGlzdEl0ZW0pfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0KSA6IChcclxuXHRcdFx0XHRcdDxwPkFkZCBzb21lIGFjdGlvbnM8L3A+XHJcblx0XHRcdFx0KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGF2YWlsYWJpbGl0eTogJ2FsbCcsXHJcblx0XHRcdHVzZXJzOiBbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0YWRkTmV3VXNlcjogZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dmFyIGlucHV0ID0gdGhpcy5yZWZzLnVzZXJuYW1lSW5wdXQuZ2V0RE9NTm9kZSgpO1xyXG5cdFx0dmFyIHVzZXJuYW1lID0gaW5wdXQudmFsdWU7XHJcblx0XHRpZiAoIXVzZXJuYW1lIHx8IHVzZXJuYW1lLmxlbmd0aCA9PSAwKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHZhciB1c2VycyA9IHRoaXMuc3RhdGUudXNlcnM7XHJcblx0XHR1c2Vycy5wdXNoKHVzZXJuYW1lKTtcclxuXHRcdGlucHV0LnZhbHVlID0gJyc7XHJcblx0XHR0aGlzLnNldFN0YXRlKHt1c2VyczogdXNlcnN9KTtcclxuXHR9LFxyXG5cdHJlbW92ZVVzZXI6IGZ1bmN0aW9uKHVzZXIpIHtcclxuXHRcdHZhciB1c2VycyA9IHRoaXMuc3RhdGUudXNlcnM7XHJcblx0XHR2YXIgaWR4ID0gdXNlcnMuaW5kZXhPZih1c2VyKTtcclxuXHRcdGlmIChpZHggIT0gLTEpIHtcclxuXHRcdFx0dXNlcnMuc3BsaWNlKGlkeCwgMSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHt1c2Vyczp1c2Vyc30pO1xyXG5cdH0sXHJcblx0YXZhaWxhYmlsaXR5Q2hhbmdlZDogZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2F2YWlsYWJpbGl0eTogdmFsdWV9KTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgQnV0dG9uR3JvdXAgPSByZXF1aXJlKCcuL2J1dHRvbkdyb3VwJyk7XHJcblxyXG5cdFx0dmFyIHVzZXJzTGlzdEl0ZW0gPSBmdW5jdGlvbih1c2VyKSB7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZS1ncm91cFwiPlxyXG5cdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT17dXNlcn0gZGlzYWJsZWQ9e3RydWV9IC8+XHJcblx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cInBvc3RmaXhcIiBvbkNsaWNrPXt0aGlzLnJlbW92ZVVzZXIuYmluZCh0aGlzLCB1c2VyKX0+XHJcblx0XHRcdFx0XHRcdFJlbW92ZVxyXG5cdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHR2YXIgY3VzdG9tVXNlcnNMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICh0aGlzLnN0YXRlLnVzZXJzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gW1xyXG5cdFx0XHRcdFx0PHA+VGhpcyBSZWFjdGlvbiB3aWxsIGFwcGx5IHRvIHRoZSBmb2xsb3dpbmcgdXNlcnM6PC9wPixcclxuXHRcdFx0XHRcdHRoaXMuc3RhdGUudXNlcnMubWFwKHVzZXJzTGlzdEl0ZW0pXHJcblx0XHRcdFx0XVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdDxkaXY+QWRkIHNvbWUgdXNlcnM8L2Rpdj5cclxuXHRcdFx0XHQpXHJcblx0XHRcdH1cclxuXHRcdH0uYmluZCh0aGlzKTtcclxuXHJcblx0XHR2YXIgY3VzdG9tVXNlcnMgPSB0aGlzLnN0YXRlLmF2YWlsYWJpbGl0eSA9PSAnY3VzdG9tJyA/ICg8ZGl2IGNsYXNzTmFtZT1cIm1pbmktc2VjdGlvblwiPlxyXG5cdFx0XHQ8Zm9ybSBvblN1Ym1pdD17dGhpcy5hZGROZXdVc2VyfSBjbGFzc05hbWU9XCJjb2xsYXBzZS1ncm91cFwiPlxyXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiByZWY9XCJ1c2VybmFtZUlucHV0XCIgLz5cclxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cInBvc3RmaXggYWxlcnRcIj5cclxuXHRcdFx0XHRcdEFkZCBuZXdcclxuXHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0PC9mb3JtPlxyXG5cclxuXHRcdFx0e2N1c3RvbVVzZXJzTGlzdCgpfVxyXG5cclxuXHRcdFx0XHJcblx0XHQ8L2Rpdj4pIDogPGRpdj5UaGlzIHJlYWN0aW9uIHdpbGwgYXBwbHkgdG8gYWxsIHVzZXJzPC9kaXY+O1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtaW5pLXNlY3Rpb25cIj5cclxuXHRcdFx0XHRcdDxCdXR0b25Hcm91cCBzZWxlY3RlZD17dGhpcy5zdGF0ZS5hdmFpbGFiaWxpdHl9IG9uQ2hhbmdlPXt0aGlzLmF2YWlsYWJpbGl0eUNoYW5nZWR9PlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIHZhbHVlPVwiYWxsXCI+QWxsIHVzZXJzPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdmFsdWU9XCJjdXN0b21cIj5Pbmx5IHRoZXNlIHVzZXJzPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8L0J1dHRvbkdyb3VwPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHtjdXN0b21Vc2Vyc31cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Y29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLnByb3BzLnNlbGVjdGVkKSB7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiB0aGlzLnByb3BzLnNlbGVjdGVkfSlcclxuXHRcdH1cclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKHByb3BzKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogcHJvcHMuc2VsZWN0ZWR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZDogbnVsbFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0YnV0dG9uQ2xpY2tlZDogZnVuY3Rpb24oYnV0dG9uLCBpZHgsIGUpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBidXR0b259KTtcclxuXHRcdGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XHJcblx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UoYnV0dG9uLCBpZHgsIGUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9uLWdyb3VwXCI+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGJ1dHRvbiwgaSkge1xyXG5cdFx0XHRcdFx0dmFyIHRleHQgPSBidXR0b24ucHJvcHMuY2hpbGRyZW47XHJcblx0XHRcdFx0XHR2YXIgdmFsdWUgPSBidXR0b24ucHJvcHMudmFsdWUgPyBidXR0b24ucHJvcHMudmFsdWUgOiBidXR0b24ucHJvcHMuY2hpbGRyZW47XHJcblx0XHRcdFx0XHR2YXIgY2xhc3NlcyA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldCh7XHJcblx0XHRcdFx0XHRcdGFjdGl2ZTogdGhpcy5zdGF0ZS5zZWxlY3RlZCA9PSB2YWx1ZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gPGJ1dHRvbiBjbGFzc05hbWU9e2NsYXNzZXN9IG9uQ2xpY2s9e3RoaXMuYnV0dG9uQ2xpY2tlZC5iaW5kKHRoaXMsdmFsdWUpfT57dGV4dH08L2J1dHRvbj5cclxuXHRcdFx0XHR9LmJpbmQodGhpcykpfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbnNpdGl2aXR5ID0gJ0V4YWN0JztcclxuXHRcdHJldHVybiB7c2Vuc2l0aXZpdHk6c2Vuc2l0aXZpdHksbWF0Y2g6c2Vuc2l0aXZpdHksbjozfVxyXG5cdH0sXHJcblx0bkNoYW5nZWQ6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBuID0gZS50YXJnZXQudmFsdWU7XHJcblx0XHRpZiAobiA+PSAxKVxyXG5cdFx0XHR0aGlzLnN0YXRlLm4gPSBuO1xyXG5cdFx0dGhpcy5jYWxjdWxhdGVSZWdleCh0aGlzLnN0YXRlKTtcclxuXHR9LFxyXG5cdGNhbGN1bGF0ZVJlZ2V4OiBmdW5jdGlvbihzdGF0ZSkge1xyXG5cdFx0dmFyIHJlZ2V4O1xyXG5cclxuXHRcdHZhciBlc2NhcGU9IGZ1bmN0aW9uKHMpIHtcclxuXHRcdFx0ICAgIHJldHVybiBzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoc3RhdGUuc2Vuc2l0aXZpdHkgPT0gJ0V4YWN0Jykge1xyXG5cdFx0XHRyZWdleCA9IGVzY2FwZShzdGF0ZS50ZXJtKVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHZhciB0ZXJtID0gc3RhdGUudGVybSA/IHN0YXRlLnRlcm0gOiAnJztcclxuXHRcdFx0c3dpdGNoKHN0YXRlLm1hdGNoKSB7XHJcblx0XHRcdFx0Y2FzZSAnVHdvJzpcclxuXHRcdFx0XHRcdHN0YXRlLm4gPSAyO1xyXG5cdFx0XHRcdGNhc2UgJ04nOlxyXG5cdFx0XHRcdFx0dmFyIHN0ciA9ICcuezAsJyArIHN0YXRlLm4gKyAnfSc7XHJcblx0XHRcdFx0XHRyZWdleCA9IHRlcm0uc3BsaXQoJycpLm1hcChmdW5jdGlvbihjKXtyZXR1cm4gZXNjYXBlKGMpfSkuam9pbihzdHIpXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcqJzpcclxuXHRcdFx0XHRcdHZhciBzdHIgPSAnLionO1xyXG5cdFx0XHRcdFx0cmVnZXggPSB0ZXJtLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24oYyl7cmV0dXJuIGVzY2FwZShjKX0pLmpvaW4oc3RyKVxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnQ3VzdG9tJzpcclxuXHRcdFx0XHRcdHJlZ2V4ID0gc3RhdGUucmVnZXhcclxuXHRcdFx0XHRcdGJyZWFrO1x0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHN0YXRlLnJlZ2V4ID0gcmVnZXg7XHJcblx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKTtcclxuXHR9LFxyXG5cdHJlZ2V4Q2hhbmdlZDogZnVuY3Rpb24oZSkge1xyXG5cdFx0dGhpcy5zdGF0ZS5yZWdleCA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcclxuXHR9LFxyXG5cdHRlcm1DaGFuZ2VkOiBmdW5jdGlvbihlKSB7XHJcblx0XHR2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xyXG5cdFx0c3RhdGUudGVybSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dGhpcy5jYWxjdWxhdGVSZWdleChzdGF0ZSk7XHJcblx0fSxcclxuXHRzZXRTZW5zaXRpdml0eTogZnVuY3Rpb24oc2Vuc2l0aXZpdHkpIHtcclxuXHRcdHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XHJcblx0XHR2YXIgb2xkVmFsdWUgPSBzdGF0ZS5zZW5zaXRpdml0eTtcclxuXHRcdHN0YXRlLnNlbnNpdGl2aXR5ID0gc2Vuc2l0aXZpdHk7XHJcblxyXG5cdFx0aWYgKHNlbnNpdGl2aXR5ID09ICdFeGFjdCcpIHtcclxuXHRcdFx0c3RhdGUubWF0Y2ggPSAnRXhhY3QnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAob2xkVmFsdWUgPT0gJ0V4YWN0Jykge1xyXG5cdFx0XHRzdGF0ZS5tYXRjaCA9ICdUd28nO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxjdWxhdGVSZWdleChzdGF0ZSk7XHJcblx0fSxcclxuXHRtYXRjaENoYW5nZWQ6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBtYXRjaCA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cdFx0dmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcclxuXHRcdHN0YXRlLm1hdGNoID0gbWF0Y2g7XHJcblx0XHRpZiAobWF0Y2ggPT0gJ0V4YWN0Jykge1xyXG5cdFx0XHRzdGF0ZS5zZW5zaXRpdml0eSA9ICdFeGFjdCc7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGN1bGF0ZVJlZ2V4KHN0YXRlKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgQnV0dG9uR3JvdXAgPSByZXF1aXJlKCcuL0J1dHRvbkdyb3VwJyk7XHJcblxyXG5cclxuXHRcdHJldHVybiAoXHJcbjxkaXY+XHJcblx0PGRpdiBjbGFzc05hbWU9XCJtaW5pLXNlY3Rpb25cIj5cclxuXHRcdDxoMz5FbnRlciB0aGUgdGV4dCB0byBkZXRlY3Q8L2gzPlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZS1ncm91cFwiPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJwcmVmaXhcIj5cclxuXHRcdFx0XHRUZXJtXHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0PGlucHV0IHJlZj1cInRlcm1cIiBvbkNoYW5nZT17dGhpcy50ZXJtQ2hhbmdlZH0gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIC8+XHJcblx0XHQ8L2Rpdj5cclxuXHJcblx0PC9kaXY+PGRpdiBjbGFzc05hbWU9XCJtaW5pLXNlY3Rpb25cIj5cclxuXHRcdDxoMz5DaG9vc2UgU2Vuc2l0aXZpdHk8L2gzPlxyXG5cdFx0PEJ1dHRvbkdyb3VwIHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbnNpdGl2aXR5fSBvbkNoYW5nZT17dGhpcy5zZXRTZW5zaXRpdml0eX0+XHJcblx0XHRcdDxidXR0b24+RXhhY3Q8L2J1dHRvbj5cclxuXHRcdFx0PGJ1dHRvbj5GdXp6eTwvYnV0dG9uPlxyXG5cdFx0PC9CdXR0b25Hcm91cD5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UtZ3JvdXBcIj5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwicHJlZml4XCI+XHJcblx0XHRcdFx0UmVnZXhcclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cInJlZ3VsYXIgZXhwcmVzc2lvblwiIGRpc2FibGVkPXt0aGlzLnN0YXRlLm1hdGNoICE9PSBcIkN1c3RvbVwifSBvbkNoYW5nZT17dGhpcy5yZWdleENoYW5nZWR9IHZhbHVlPXt0aGlzLnN0YXRlLnJlZ2V4fSAvPlxyXG5cdFx0XHR7dGhpcy5zdGF0ZS5tYXRjaD09J04nID8gKFxyXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3NOYW1lPVwiXCIgb25DaGFuZ2U9e3RoaXMubkNoYW5nZWR9IHZhbHVlPXt0aGlzLnN0YXRlLm59IC8+XHJcblx0XHRcdCAgIFxyXG5cdFx0XHQpXHQ6IG51bGx9XHJcblx0XHRcdDxzZWxlY3Qgb25DaGFuZ2U9e3RoaXMubWF0Y2hDaGFuZ2VkfSBjbGFzc05hbWU9XCJwb3N0Zml4XCIgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuc2Vuc2l0aXZpdHk9PSdFeGFjdCd9IHZhbHVlPXt0aGlzLnN0YXRlLm1hdGNofT5cclxuXHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiRXhhY3RcIj5FeGFjdCBtYXRjaDwvb3B0aW9uPlxyXG5cdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJUd29cIj5NYXRjaCAyIENoYXJzPC9vcHRpb24+XHJcblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIk5cIj5NYXRjaCBuIENoYXJzPC9vcHRpb24+XHJcblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIipcIj5NYXRjaCAqIENoYXJzPC9vcHRpb24+XHJcblx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIkN1c3RvbVwiPkN1c3RvbSBSZWdleDwvb3B0aW9uPlxyXG5cdFx0XHQ8L3NlbGVjdD5cclxuXHRcdDwvZGl2PlxyXG5cdDwvZGl2PjxkaXYgY2xhc3NOYW1lPVwibWluaS1zZWN0aW9uXCI+XHJcblx0XHQ8aDM+UHJldmlldzwvaDM+XHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLXByZXZpZXdcIj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwcmV2aWV3LW1haW5cIj5cclxuXHRcdFx0XHQ8c3Bhbj5TZWUgd2hhdCBWaWdpbEJvdCBjYW4gZGV0ZWN0Ojwvc3Bhbj5cclxuXHRcdFx0XHQ8dGV4dGFyZWE+PC90ZXh0YXJlYT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicHJldmlldy1jdXN0b21cIj5cclxuXHRcdFx0XHQ8c3Bhbj5FbnRlciB5b3VyIG93biB0ZXN0IHRleHQ6PC9zcGFuPlxyXG5cdFx0XHRcdDx0ZXh0YXJlYT48L3RleHRhcmVhPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdDwvZGl2PlxyXG48L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGZvb3Rlcj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0PHVsIGNsYXNzTmFtZT1cImZvb3Rlci1zZWN0aW9uXCI+XHJcblx0XHRcdDxsaT5HaXRodWI8L2xpPlxyXG5cdFx0XHQ8bGk+R2l0aHViPC9saT5cclxuXHRcdFx0PGxpPkdpdGh1YjwvbGk+XHJcblx0XHRcdDxsaT5HaXRodWI8L2xpPlxyXG5cdFx0XHQ8L3VsPlx0XHJcblxyXG5cdFx0XHQ8dWwgY2xhc3NOYW1lPVwiZm9vdGVyLXNlY3Rpb25cIj5cclxuXHRcdFx0PGxpPjxhIGhyZWY9XCIjXCI+UHJpdmFjeTwvYT48L2xpPlxyXG5cdFx0XHQ8bGk+PGEgaHJlZj1cIiNcIj5Ub1M8L2E+PC9saT5cclxuXHRcdFx0PGxpPmMgMjAxNSBEZXNtb25kIExlZTwvbGk+XHJcblx0XHRcdDwvdWw+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Zvb3Rlcj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdG1peGluczogW1JvdXRlci5OYXZpZ2F0aW9uXSxcclxuXHRnb0hvbWU6IGZ1bmN0aW9uKGUpIHtcclxuXHRcdHRoaXMudHJhbnNpdGlvblRvKCdIb21lJylcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgTGluayA9IFJvdXRlci5MaW5rO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8aGVhZGVyPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHQ8aDEgb25DbGljaz17dGhpcy5nb0hvbWV9PlZpZ2lsQm90PC9oMT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9oZWFkZXI+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIExpbmsgPSBSb3V0ZXIuTGluaztcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuPG5hdiBjbGFzc05hbWU9XCJzaXRlLW5hdlwiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+XHJcblx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwibmF2aWdhdGlvblwiPlxyXG5cdFx0XHQ8TGluayB0bz1cIlJlYWN0aW9uc1wiIGNsYXNzTmFtZT1cIml0ZW1cIj5SZWFjdGlvbnM8L0xpbms+XHJcblx0XHRcdDxMaW5rIHRvPVwiTG9nc1wiIGNsYXNzTmFtZT1cIml0ZW1cIj5Mb2dzPC9MaW5rPlxyXG5cdFx0PC9kaXY+XHJcblx0PC9kaXY+XHJcbjwvbmF2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5zZWxlY3RlZCkge1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogdGhpcy5wcm9wcy5zZWxlY3RlZH0pXHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihwcm9wcykge1xyXG5cdFx0aWYgKHRoaXMucHJvcHMuc2VsZWN0ZWQpIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWQ6IHByb3BzLnNlbGVjdGVkfSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2VsZWN0ZWQ6IG51bGxcclxuXHRcdH1cclxuXHR9LFxyXG5cdGJ1dHRvbkNsaWNrZWQ6IGZ1bmN0aW9uKGJ1dHRvbiwgaWR4LCBlKSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogYnV0dG9ufSk7XHJcblx0XHRpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKGJ1dHRvbiwgaWR4LCBlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbi1ncm91cFwiPlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVuLm1hcChmdW5jdGlvbihidXR0b24sIGkpIHtcclxuXHRcdFx0XHRcdHZhciB0ZXh0ID0gYnV0dG9uLnByb3BzLmNoaWxkcmVuO1xyXG5cdFx0XHRcdFx0dmFyIHZhbHVlID0gYnV0dG9uLnByb3BzLnZhbHVlID8gYnV0dG9uLnByb3BzLnZhbHVlIDogYnV0dG9uLnByb3BzLmNoaWxkcmVuO1xyXG5cdFx0XHRcdFx0dmFyIGNsYXNzZXMgPSBSZWFjdC5hZGRvbnMuY2xhc3NTZXQoe1xyXG5cdFx0XHRcdFx0XHRhY3RpdmU6IHRoaXMuc3RhdGUuc2VsZWN0ZWQgPT0gdmFsdWVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIDxidXR0b24gY2xhc3NOYW1lPXtjbGFzc2VzfSBvbkNsaWNrPXt0aGlzLmJ1dHRvbkNsaWNrZWQuYmluZCh0aGlzLHZhbHVlKX0+e3RleHR9PC9idXR0b24+XHJcblx0XHRcdFx0fS5iaW5kKHRoaXMpKX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImNvbnNvbGUubG9nKFwibWFpbiBqcyBmaWxlXCIpO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKTtcclxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xyXG5cclxudmFyIFJvdXRlID0gUm91dGVyLlJvdXRlO1xyXG52YXIgTGluayA9IFJvdXRlci5MaW5rO1xyXG52YXIgRGVmYXVsdFJvdXRlID0gUm91dGVyLkRlZmF1bHRSb3V0ZTtcclxudmFyIE5vdEZvdW5kUm91dGUgPSBSb3V0ZXIuTm90Rm91bmRSb3V0ZTtcclxuXHJcbnZhciBSb290Um91dGVIYW5kbGVyID0gcmVxdWlyZSgnLi9yb3V0ZXMvUm9vdFJvdXRlSGFuZGxlcicpXHJcbnZhciBIb21lUm91dGUgPSByZXF1aXJlKCcuL3JvdXRlcy9Ib21lUm91dGVIYW5kbGVyJyk7XHJcbnZhciBOb3RGb3VuZFJvdXRlSGFuZGxlciA9IHJlcXVpcmUoJy4vcm91dGVzL05vdEZvdW5kUm91dGVIYW5kbGVyJyk7XHJcblxyXG52YXIgc2VydmVyQ29uZmlnID0gcmVxdWlyZSgnLi4vLi4vc2VydmVyL2NvbmZpZycpO1xyXG5cclxudmFyIGxvZ2luUm91dGVIYW5kbGVyID0gcmVxdWlyZSgnLi9yb3V0ZXMvbG9naW5Sb3V0ZUhhbmRsZXInKTtcbnZhciBMb2dzUm91dGVIYW5kbGVyID0gcmVxdWlyZSgnLi9yb3V0ZXMvTG9nc1JvdXRlSGFuZGxlcicpO1xudmFyIFJlYWN0aW9uc1JvdXRlSGFuZGxlciA9IHJlcXVpcmUoJy4vcm91dGVzL1JlYWN0aW9uc1JvdXRlSGFuZGxlcicpO1xudmFyIEVkaXRSZWFjdGlvblJvdXRlSGFuZGxlciA9IHJlcXVpcmUoJy4vcm91dGVzL0VkaXRSZWFjdGlvblJvdXRlSGFuZGxlcicpO1xudmFyIE5lc3RlZFJvdXRlSGFuZGxlciA9IHJlcXVpcmUoJy4vcm91dGVzL05lc3RlZFJvdXRlSGFuZGxlcicpO1xuLyogZGVzbGlnaHQgcmVxdWlyZSBob29rIC0gZG8gbm90IG1vZGlmeSB0aGlzIGxpbmUgKi9cclxuXHJcbnZhciByb3V0ZXMgPSAoXHJcblx0PFJvdXRlIGhhbmRsZXI9e1Jvb3RSb3V0ZUhhbmRsZXJ9IHBhdGg9XCIvXCI+XHJcblx0XHQ8RGVmYXVsdFJvdXRlIG5hbWU9XCJIb21lXCIgaGFuZGxlcj17SG9tZVJvdXRlfSAvPlxyXG5cdFx0PE5vdEZvdW5kUm91dGUgaGFuZGxlcj17Tm90Rm91bmRSb3V0ZUhhbmRsZXJ9IC8+XHJcbjxSb3V0ZSBoYW5kbGVyPXtsb2dpblJvdXRlSGFuZGxlcn0gbmFtZT0nTG9naW4nIHBhdGg9J2xvZ2luJy8+XG48Um91dGUgaGFuZGxlcj17TG9nc1JvdXRlSGFuZGxlcn0gbmFtZT0nTG9ncycgcGF0aD0nbG9ncycvPlxuPFJvdXRlIGhhbmRsZXI9e05lc3RlZFJvdXRlSGFuZGxlcn0gbmFtZT0nUmVhY3Rpb25zJyBwYXRoPSdyZWFjdGlvbnMnPlxuXHQ8RGVmYXVsdFJvdXRlIGhhbmRsZXI9e1JlYWN0aW9uc1JvdXRlSGFuZGxlcn0gLz5cblx0PFJvdXRlIGhhbmRsZXI9e0VkaXRSZWFjdGlvblJvdXRlSGFuZGxlcn0gbmFtZT0nQ3JlYXRlUmVhY3Rpb24nIHBhdGg9J2NyZWF0ZScvPlxuXHQ8Um91dGUgaGFuZGxlcj17RWRpdFJlYWN0aW9uUm91dGVIYW5kbGVyfSBuYW1lPSdFZGl0UmVhY3Rpb24nIHBhdGg9J2VkaXQvOm5hbWUnLz5cbjwvUm91dGU+XG4vKiBkZXNsaWdodCByb3V0ZSBob29rIC0gZG8gbm90IG1vZGlmeSB0aGlzIGxpbmUgKi9cclxuXHQ8L1JvdXRlPlxyXG4pO1xyXG5cclxuUm91dGVyLnJ1bihyb3V0ZXMsIC8qUm91dGVyLkhpc3RvcnlMb2NhdGlvbiwqLyBmdW5jdGlvbihIYW5kbGVyKSB7XHJcblx0dmFyIGluamVjdFBvaW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3RfcGl4aWVib3QyJylcclxuXHR2YXIgcG9ydCA9IGluamVjdFBvaW50LmdldEF0dHJpYnV0ZSgnZGF0YS1hcGktcG9ydCcpXHJcblx0UmVhY3QucmVuZGVyKDxIYW5kbGVyIHBvcnQ9e3BvcnR9IC8+LCBpbmplY3RQb2ludCk7XHJcbn0pO1xyXG5cclxuXHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XHJcbnZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0bWl4aW5zOiBbIFJvdXRlci5TdGF0ZSwgUm91dGVyLk5hdmlnYXRpb24gXSxcclxuXHRzYXZlQnV0dG9uOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRpZiAoIXRoaXMuc3RhdGUubmFtZSB8fCB0aGlzLnN0YXRlLm5hbWUubGVuZ3RoID09IDApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnN0YXRlLmNyZWF0ZU9yRWRpdCA9PSAnY3JlYXRlJyAmJiB0aGlzLnByb3BzLm9uQ3JlYXRlUmVhY3Rpb24pIHtcclxuXHRcdFx0dGhpcy5wcm9wcy5vbkNyZWF0ZVJlYWN0aW9uKHRoaXMuc3RhdGUpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZih0aGlzLnN0YXRlLmNyZWF0ZU9yRWRpdCA9PSAnZWRpdCcgJiYgdGhpcy5wcm9wcy5vbkVkaXRSZWFjdGlvbikge1xyXG5cdFx0XHR0aGlzLnByb3BzLm9uRWRpdFJlYWN0aW9uKHRoaXMuc3RhdGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudHJhbnNpdGlvblRvKFwiUmVhY3Rpb25zXCIpO1xyXG5cclxuXHR9LFxyXG5cdG5hbWVDaGFuZ2VkOiBmdW5jdGlvbihlKSB7XHJcblx0XHR0aGlzLnN0YXRlLm5hbWUgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dGFiOiAnRGV0ZWN0aW9uJyxcclxuXHRcdFx0Y3JlYXRlT3JFZGl0OiB0aGlzLmdldFBhcmFtcygpLm5hbWUgPyAnZWRpdCcgOiAnY3JlYXRlJ1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVhY3Rpb25TdGVwOiBmdW5jdGlvbihzdGVwLCBpZHgpIHtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0IHRhYjogc3RlcFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHJvdXRlID0gdGhpcy5nZXRSb3V0ZXMoKTtcclxuXHRcdHZhciBCdXR0b25Hcm91cCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvQnV0dG9uR3JvdXAnKTtcclxuXHJcblx0XHR2YXIgVGFiID0ge1xyXG5cdFx0XHQnRGV0ZWN0aW9uJzogcmVxdWlyZSgnLi4vY29tcG9uZW50cy9EZXRlY3Rpb25SZWFjdGlvblRhYicpLFxyXG5cdFx0XHQnQXZhaWxhYmlsaXR5JzogcmVxdWlyZSgnLi4vY29tcG9uZW50cy9BdmFpbGFiaWxpdHlSZWFjdGlvblRhYicpLFxyXG5cdFx0XHQnQWN0aW9uJzogcmVxdWlyZSgnLi4vY29tcG9uZW50cy9BY3Rpb25SZWFjdGlvblRhYicpXHJcblx0XHR9W3RoaXMuc3RhdGUudGFiXTtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG48ZGl2IGNsYXNzTmFtZT1cIlwiPlxyXG5cdDxkaXYgY2xhc3NOYW1lPVwic2VjdC1ibG9jayBmZWF0dXJlIHByaW1hcnlcIj5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdDxoMT57dGhpcy5zdGF0ZS5jcmVhdGVPckVkaXRbMF0udG9VcHBlckNhc2UoKSArIHRoaXMuc3RhdGUuY3JlYXRlT3JFZGl0LnN1YnN0cigxKX0gUmVhY3Rpb248L2gxPlxyXG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPlxyXG5cdFx0XHRcdFZpZ2lsQm90IGNhbiBhcHBseSB0aGlzIFJlYWN0aW9uIHRvIGFsbCB1c2Vycywgb3Igb25seSBzcGVjaWZpYyB1c2VycyBpbiB5b3VyIGNoYW5uZWxcclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0PC9kaXY+XHJcblxyXG5cdDwvZGl2PlxyXG5cclxuXHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0LWJsb2NrIGZlYXR1cmUgc2Vjb25kYXJ5XCI+XHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHQ8aDI+V2hhdCBpcyB0aGUgbmFtZSBvZiB0aGlzIFJlYWN0aW9uPzwvaDI+XHJcblx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBuYW1lXCIgdmFsdWU9e3RoaXMuc3RhdGUubmFtZX0gb25DaGFuZ2U9e3RoaXMubmFtZUNoYW5nZWR9IC8+XHJcblx0XHQ8L2Rpdj5cclxuXHQ8L3NlY3Rpb24+XHJcblxyXG5cclxuXHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0LWJsb2NrIG1haW4tYmxvY2sgc3RyZXRjaFwiPlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJuZXN0ZWQtbmF2XCI+XHJcblx0XHRcdFx0PGgzPkNvbmZpZ3VyZSB0aGlzIFJlYWN0aW9uOjwvaDM+XHJcblx0XHRcdFx0PEJ1dHRvbkdyb3VwIHNlbGVjdGVkPXt0aGlzLnN0YXRlLnRhYn0gb25DaGFuZ2U9e3RoaXMucmVhY3Rpb25TdGVwfT5cclxuXHRcdFx0XHRcdDxidXR0b24+RGV0ZWN0aW9uPC9idXR0b24+XHJcblx0XHRcdFx0XHQ8YnV0dG9uPkF2YWlsYWJpbGl0eTwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PGJ1dHRvbj5BY3Rpb248L2J1dHRvbj5cclxuXHRcdFx0XHQ8L0J1dHRvbkdyb3VwPlxyXG5cdFx0XHRcdHt7XHJcblx0XHRcdFx0XHQnRGV0ZWN0aW9uJzogXCJTcGVjaWZ5IHRoZSB0ZXh0IHRoYXQgVmlnaWxCb3Qgd2lsbCBkZXRlY3QsIGFuZCBzcGVjaWZ5IFZpZ2lsQm90J3Mgc2Vuc2l0aXZpdHkgdG8gaXQuXCIsXHJcblx0XHRcdFx0XHQnQXZhaWxhYmlsaXR5JzogXCJTcGVjaWZ5IHRoZSB1c2VycyB0byB3aG9tIFZpZ2lsQm90IHdpbGwgYXBwbHkgdGhpcyBSZWFjdGlvbi5cIixcclxuXHRcdFx0XHRcdCdBY3Rpb24nOiBcIlNwZWNpZnkgdGhlIGFjdGlvbiBWaWdpbEJvdCB3aWxsIHBlcmZvcm0uXCJcclxuXHRcdFx0XHR9W3RoaXMuc3RhdGUudGFiXX1cclxuXHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm5lc3RlZC1zZWN0aW9uXCI+XHJcblx0XHRcdFx0PFRhYj48L1RhYj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQ8L3NlY3Rpb24+XHJcblx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uIHByaW1hcnkgc21hbGwtNFwiPlxyXG5cdFx0XHRDYW5jZWxcclxuXHRcdDwvYnV0dG9uPlxyXG5cdFx0PGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b24gYWxlcnQgc21hbGwtNCByaWdodFwiIG9uQ2xpY2s9e3RoaXMuc2F2ZUJ1dHRvbn0+XHJcblx0XHRcdFNhdmVcclxuXHRcdDwvYnV0dG9uPlxyXG5cdDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XHJcbnZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0bWl4aW5zOiBbIFJvdXRlci5TdGF0ZSBdLFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcm91dGUgPSB0aGlzLmdldFJvdXRlcygpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdDxkaXYgY2xhc3NOYW1lPVwic2VjdC1ibG9jayBmZWF0dXJlIHByaW1hcnlcIj5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdDxoMT5XZWxjb21lIHRvIFZpZ2lsQm90PC9oMT5cclxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cclxuXHRcdFx0XHRWaWdpbEJvdCBoZWxwcyBrZWVwIHlvdXIgY2hhbm5lbCBzYWZlIGFuZCBmdW4gYnkgdmlnaWxhbnRseSB3YXRjaGluZyB0aGUgY2hhdCBhbmQgcmVhY3RpbmcgdG8gYSB3aWRlIHZhcmlldHkgb2YgY29uZmlndXJhYmxlIGV2ZW50cy5cclxuXHRcdFx0PC9zcGFuPlxyXG5cdFx0PC9kaXY+XHJcblx0PC9kaXY+XHJcblxyXG5cclxuXHQ8c2VjdGlvbiBjbGFzc05hbWU9XCJzZWN0LWJsb2NrIG1haW4tYmxvY2sgc3RyZXRjaFwiPlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0PGgyPkdldHRpbmcgc3RhcnRlZDwvaDI+XHJcblx0XHRcdGJsYWggYmxhaCBibGFoIGhlcmUncyBob3cgeW91IGF1dGhlbnRpY2F0ZSBhbmQgYmxhaCBibGFoIG1vcmUgaW5zdHJ1Y3Rpb25zIGFuZCBzdHVmZi5cclxuXHRcdDwvZGl2PlxyXG5cdDwvc2VjdGlvbj5cclxuXHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKTtcclxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xyXG52YXIgUm91dGVIYW5kbGVyID0gUm91dGVyLlJvdXRlSGFuZGxlcjtcclxudmFyIHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcmFnZW50Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRtaXhpbnM6IFsgUm91dGVyLlN0YXRlIF0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGxvZ2luID0gdGhpcy5wcm9wcy5zZXNzaW9uXHJcblx0XHRcdFxyXG5cdFx0cmVxdWVzdC5nZXQoJy9hcGkvQ2hhdExvZ3M/ZmlsdGVyW29yZGVyXT1kYXRlIERFU0MnKVxyXG5cdFx0XHQuc2V0KCdBdXRob3JpemF0aW9uJywgbG9naW4uaWQpXHJcblx0XHRcdC5lbmQoZnVuY3Rpb24ocmVzKSB7XHJcblx0XHRcdFx0aWYgKHJlcy5zdGF0dXM9PTIwMCkgXHJcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtsb2dzOiBKU09OLnBhcnNlKHJlcy50ZXh0KX0pO1xyXG5cdFx0XHR9LmJpbmQodGhpcykpXHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bG9nczogW11cclxuXHRcdH1cclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcm91dGUgPSB0aGlzLmdldFJvdXRlcygpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc3RhdGUubG9ncyk7XHJcblx0XHR2YXIgbG9ncyA9IHRoaXMuc3RhdGUubG9ncy5tYXAoZnVuY3Rpb24obG9nKXtcclxuXHRcdFx0dmFyIG1vbWVudCA9IHJlcXVpcmUoJ21vbWVudCcpO1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDx0cj5cclxuXHRcdFx0XHRcdDx0ZD5cclxuXHRcdFx0XHRcdFx0e21vbWVudChsb2cuZGF0ZSkuZnJvbU5vdygpfVxyXG5cdFx0XHRcdFx0PC90ZD5cclxuXHJcblx0XHRcdFx0XHQ8dGQ+XHJcblx0XHRcdFx0XHRcdHtsb2cubmlja31cclxuXHRcdFx0XHRcdDwvdGQ+XHJcblxyXG5cdFx0XHRcdFx0PHRkPlxyXG5cdFx0XHRcdFx0XHR7bG9nLmNvbnRlbnR9XHJcblx0XHRcdFx0XHQ8L3RkPlxyXG5cclxuXHRcdFx0XHRcdDx0ZD5cclxuXHRcdFx0XHRcdFx0e2xvZy50cmlnZ2Vyc31cclxuXHRcdFx0XHRcdDwvdGQ+XHJcblxyXG5cdFx0XHRcdDwvdHI+XHJcblxyXG5cdFx0XHQpO1x0XHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0LWJsb2NrIGZlYXR1cmUgcHJpbWFyeVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PGgxPkxvZ3M8L2gxPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPlxyXG5cdFx0XHRcdFx0XHRcdFZpZ2lsQm90IGtlZXBzIGEgcmVjb3JkIG9mIGFsbCB0aGUgYWN0aXZpdHkgb24geW91ciBjaGFubmVsLlxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PHNlY3Rpb24gY2xhc3NOYW1lPVwic2VjdC1ibG9jayBtYWluLWJsb2NrIHN0cmV0Y2hcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0PGgyPkFjdGl2aXR5PC9oMj5cclxuXHRcdFx0XHRcdDx0YWJsZSByb2xlPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHQ8dGhlYWQ+XHJcblx0XHRcdFx0XHRcdFx0PHRyPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHRoPkRhdGU8L3RoPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHRoPk5hbWU8L3RoPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHRoPkNvbnRlbnQ8L3RoPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHRoPlRyaWdnZXJzPC90aD5cclxuXHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cclxuXHRcdFx0XHRcdFx0PC90aGVhZD5cclxuXHRcdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdHtsb2dzfVxyXG5cdFx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdFx0PC90YWJsZT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PC9zZWN0aW9uPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcclxudmFyIFJvdXRlSGFuZGxlciA9IFJvdXRlci5Sb3V0ZUhhbmRsZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRtaXhpbnM6IFsgUm91dGVyLlN0YXRlIF0sXHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlYWN0aW9uczoge31cclxuXHRcdH1cclxuXHR9LFxyXG5cdG9uQ3JlYXRlUmVhY3Rpb246IGZ1bmN0aW9uKHJlYWN0aW9uKSB7XHJcblx0XHRjb25zb2xlLmxvZyhyZWFjdGlvbik7XHJcblx0XHR0aGlzLnN0YXRlLnJlYWN0aW9uc1tyZWFjdGlvbi5uYW1lXSA9IHJlYWN0aW9uO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcm91dGUgPSB0aGlzLmdldFJvdXRlcygpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Um91dGVIYW5kbGVyIHJlYWN0aW9ucz17dGhpcy5zdGF0ZS5yZWFjdGlvbnN9IG9uQ3JlYXRlUmVhY3Rpb249e3RoaXMub25DcmVhdGVSZWFjdGlvbn0gLz5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcclxudmFyIFJvdXRlSGFuZGxlciA9IFJvdXRlci5Sb3V0ZUhhbmRsZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRtaXhpbnM6IFsgUm91dGVyLlN0YXRlIF0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciByb3V0ZSA9IHRoaXMuZ2V0Um91dGVzKCk7XHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGgyPk5vdCBmb3VuZDwvaDI+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKTtcclxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ3JlYWN0LXJvdXRlcicpO1xyXG52YXIgUm91dGVIYW5kbGVyID0gUm91dGVyLlJvdXRlSGFuZGxlcjtcclxudmFyIExpbmsgPSBSb3V0ZXIuTGluaztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdG1peGluczogWyBSb3V0ZXIuU3RhdGUgXSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHJvdXRlID0gdGhpcy5nZXRSb3V0ZXMoKTtcclxuXHJcblx0XHR2YXIgcmVhY3Rpb25OYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMucmVhY3Rpb25zKVxyXG5cclxuXHRcdHZhciByZWFjdGlvblRhYmxlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiByZWFjdGlvbk5hbWVzLm1hcChmdW5jdGlvbihuYW1lKXtcclxuXHRcdFx0XHRyZXR1cm4gPGxpPntuYW1lfTwvbGk+XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3QtYmxvY2sgZmVhdHVyZSBwcmltYXJ5XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8aDE+UmVhY3Rpb25zPC9oMT5cclxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cclxuXHRcdFx0XHRcdFx0XHRWaWdpbEJvdCBjYW4gcmVhY3QgdG8gdXNlci1kZWZpbmVkIGV2ZW50cyBpbiB0aGUgY2hhbm5lbCBpbiBhIG51bWJlciBvZiB3YXlzLiBVc2luZyBSZWFjdGlvbnMsIHlvdSBjYW4gaW1wbGVtZW50IGEgYmxhY2tsaXN0LCBjb21tYW5kcywgb3Igb3RoZXIgdHlwZXMgb2YgYWN0aW9ucy5cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1pbmktc2VjdGlvbiByb3dcIj5cclxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJDcmVhdGVSZWFjdGlvblwiIGNsYXNzTmFtZT1cImJ1dHRvblwiPkNyZWF0ZSBhIFJlYWN0aW9uPC9MaW5rPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0LWJsb2NrXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8aDI+UmVhY3Rpb25zPC9oMj5cclxuXHRcdFx0XHRcdFx0e3JlYWN0aW9uTmFtZXMubGVuZ3RoID4gMCA/IHJlYWN0aW9uVGFibGUoKVxyXG5cdFx0XHRcdFx0XHQ6IDxwPllvdSBoYXZlIG5vIHJlYWN0aW9uczwvcD59XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XHJcbnZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xyXG5cclxudmFyIHJlcXVlc3QgPSByZXF1aXJlKCdicm93c2VyLXJlcXVlc3QnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdG1peGluczogWyBSb3V0ZXIuU3RhdGUgXSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bG9naW46IHRydWUsXHJcblx0XHRcdGNoZWNraW5nOiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChsb2NhbFN0b3JhZ2UubG9naW4pIHtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y2hlY2tpbmc6IHRydWV9KVxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHZhciBsb2dpbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmxvZ2luKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXF1ZXN0LmdldCh7XHJcblx0XHRcdFx0XHR1cmw6ICcvYXBpL1VzZXJzLycrbG9naW4udXNlcklkLFxyXG5cdFx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0XHRBdXRob3JpemF0aW9uOiBsb2dpbi5pZFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVyciwgcmVzcCwgYm9keSkge1xyXG5cdFx0XHRcdFx0aWYgKHJlc3Auc3RhdHVzID09IDIwMCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtsb2dpbjogbG9naW59KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgbG9jYWxTdG9yYWdlLmxvZ2luXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Y2hlY2tpbmc6IGZhbHNlfSlcclxuXHRcdFx0XHR9LmJpbmQodGhpcykpXHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2goZSkgIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlKVxyXG5cdFx0XHRcdGRlbGV0ZSBsb2NhbFN0b3JhZ2UubG9naW5cclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtjaGVja2luZzogZmFsc2V9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRvbkxvZ2luOiBmdW5jdGlvbihsb2dpbikge1xyXG5cdFx0bG9jYWxTdG9yYWdlLmxvZ2luID0gSlNPTi5zdHJpbmdpZnkobG9naW4pO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bG9naW46IGxvZ2lufSlcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgTG9naW4gPSByZXF1aXJlKCcuL2xvZ2luUm91dGVIYW5kbGVyJylcclxuXHJcblx0XHR2YXIgaGFuZGxlciA9IHRoaXMuc3RhdGUubG9naW4gPyA8Um91dGVIYW5kbGVyIHBvcnQ9e3RoaXMucHJvcHMucG9ydH0gc2Vzc2lvbj17dGhpcy5zdGF0ZS5sb2dpbn0gLz4gOiA8TG9naW4gb25Mb2dpbj17dGhpcy5vbkxvZ2lufSAvPiBcclxuXHRcdFxyXG5cdFx0dmFyIEhlYWRlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvSGVhZGVyJyk7XHJcblx0XHR2YXIgTmF2ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9OYXYnKTtcclxuXHRcdHZhciBGb290ZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0Zvb3RlcicpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0IGZsZXhcIj5cclxuXHRcdFx0XHQ8SGVhZGVyIC8+XHJcblx0XHRcdFx0PE5hdiAvPlxyXG5cdFx0XHRcdDxtYWluIGNsYXNzTmFtZT1cIndcIj5cclxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLmNoZWNraW5nID8gbnVsbCA6IGhhbmRsZXJ9XHJcblx0XHRcdFx0PC9tYWluPlxyXG5cdFx0XHRcdDxGb290ZXIgLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XHJcbnZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xyXG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJ2Jyb3dzZXItcmVxdWVzdCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0bWl4aW5zOiBbIFJvdXRlci5TdGF0ZSBdLFxyXG5cdGxvZ2luOiBmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR2YXIgcGFzc3dvcmQgPSB0aGlzLnJlZnMucGFzc3dvcmQuZ2V0RE9NTm9kZSgpO1xyXG5cclxuXHRcdHJlcXVlc3QucG9zdCh7XHJcblx0XHRcdHVybDogJy9hcGkvVXNlcnMvbG9naW4nLFxyXG5cdFx0XHRqc29uOiB7XHJcblx0XHRcdFx0ZW1haWw6ICdhcnRlbHVzaWZ5QGdtYWlsLmNvbScsXHJcblx0XHRcdFx0cGFzc3dvcmQ6IHBhc3N3b3JkLnZhbHVlXHJcblx0XHRcdH1cclxuXHRcdH0sIGZ1bmN0aW9uKGVyciwgcmVzcG9uc2UsIGJvZHkpIHtcclxuXHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPSAyMDApIHtcclxuXHRcdFx0XHR2YXIgbXNnID0gYm9keSAmJiBib2R5LmVycm9yICYmIGJvZHkuZXJyb3IubWVzc2FnZSA/IGJvZHkuZXJyb3IubWVzc2FnZSA6IFwiSW52YWxpZCBsb2dpblwiXHJcblx0XHRcdFx0Y29uc29sZS5sb2cobXNnKTtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtmYWlsOm1zZywgc3VjY2VzczogZmFsc2V9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtmYWlsOiBmYWxzZSwgc3VjY2VzczogXCJMb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5XCJ9KVxyXG5cdFx0XHRcdC8vcmVxdWVzdC5nZXQoe1xyXG5cdFx0XHRcdFx0Ly91cmw6ICcvYXBpL1VzZXJzLycrYm9keS51c2VySWQsXHJcblx0XHRcdFx0XHQvL2hlYWRlcnM6IHtcclxuXHRcdFx0XHRcdFx0Ly9BdXRob3JpemF0aW9uOiB0b2tlblxyXG5cdFx0XHRcdFx0Ly99XHJcblx0XHRcdFx0Ly99LCBmdW5jdGlvbihlcnIsIHJlc3AsIGJvZHkpIHtcclxuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coYm9keSk7XHJcblx0XHRcdFx0Ly99KVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLm9uTG9naW4pXHQge1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5vbkxvZ2luKGJvZHkpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cGFzc3dvcmQudmFsdWUgPSAnJ1xyXG5cdFx0XHR9XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdFx0XHJcblx0fSxcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0ZmFpbDogZmFsc2UsXHJcblx0XHRcdHN1Y2Nlc3M6IGZhbHNlIFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciByb3V0ZSA9IHRoaXMuZ2V0Um91dGVzKCk7XHJcblx0XHR2YXIgc3VjY2Vzc21zZyA9IHRoaXMuc3RhdGUuc3VjY2VzcyA/IChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGVydC1ib3ggc3VjY2Vzc1wiPnt0aGlzLnN0YXRlLnN1Y2Nlc3N9PC9kaXY+XHJcblx0XHRcclxuXHRcdCkgOiBudWxsXHJcblx0XHRcclxuXHRcdHZhciBmYWlsbXNnID0gdGhpcy5zdGF0ZS5mYWlsID8gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsZXJ0LWJveCBzZWNvbmRhcnlcIj57dGhpcy5zdGF0ZS5mYWlsfTwvZGl2PlxyXG5cdFx0XHJcblx0XHQpIDogbnVsbFxyXG5cdFx0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3QtYmxvY2sgZmVhdHVyZSBwcmltYXJ5XCI+XHJcblx0XHRcdFx0PGZvcm0gb25TdWJtaXQ9e3RoaXMubG9naW59PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgY29sbGFwc2VcIj5cclxuXHRcdFx0XHRcdFx0PGgyPkxvZyBpbjwvaDI+XHJcblxyXG5cdFx0XHRcdFx0XHR7c3VjY2Vzc21zZ31cclxuXHRcdFx0XHRcdFx0e2ZhaWxtc2d9XHJcblxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNtYWxsLTkgY29sdW1uc1wiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCByZWY9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwicGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIi8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzbWFsbC0zIGNvbHVtbnNcIj5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvbiBwb3N0Zml4XCIgdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Zvcm0+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCIvLyBCcm93c2VyIFJlcXVlc3Rcbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8vIFVNRCBIRUFERVIgU1RBUlQgXG4oZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgICByb290LnJldHVybkV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuLy8gVU1EIEhFQURFUiBFTkRcblxudmFyIFhIUiA9IFhNTEh0dHBSZXF1ZXN0XG5pZiAoIVhIUikgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIFhNTEh0dHBSZXF1ZXN0JylcbnJlcXVlc3QubG9nID0ge1xuICAndHJhY2UnOiBub29wLCAnZGVidWcnOiBub29wLCAnaW5mbyc6IG5vb3AsICd3YXJuJzogbm9vcCwgJ2Vycm9yJzogbm9vcFxufVxuXG52YXIgREVGQVVMVF9USU1FT1VUID0gMyAqIDYwICogMTAwMCAvLyAzIG1pbnV0ZXNcblxuLy9cbi8vIHJlcXVlc3Rcbi8vXG5cbmZ1bmN0aW9uIHJlcXVlc3Qob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgLy8gVGhlIGVudHJ5LXBvaW50IHRvIHRoZSBBUEk6IHByZXAgdGhlIG9wdGlvbnMgb2JqZWN0IGFuZCBwYXNzIHRoZSByZWFsIHdvcmsgdG8gcnVuX3hoci5cbiAgaWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKVxuICAgIHRocm93IG5ldyBFcnJvcignQmFkIGNhbGxiYWNrIGdpdmVuOiAnICsgY2FsbGJhY2spXG5cbiAgaWYoIW9wdGlvbnMpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBvcHRpb25zIGdpdmVuJylcblxuICB2YXIgb3B0aW9uc19vblJlc3BvbnNlID0gb3B0aW9ucy5vblJlc3BvbnNlOyAvLyBTYXZlIHRoaXMgZm9yIGxhdGVyLlxuXG4gIGlmKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJylcbiAgICBvcHRpb25zID0geyd1cmknOm9wdGlvbnN9O1xuICBlbHNlXG4gICAgb3B0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpOyAvLyBVc2UgYSBkdXBsaWNhdGUgZm9yIG11dGF0aW5nLlxuXG4gIG9wdGlvbnMub25SZXNwb25zZSA9IG9wdGlvbnNfb25SZXNwb25zZSAvLyBBbmQgcHV0IGl0IGJhY2suXG5cbiAgaWYgKG9wdGlvbnMudmVyYm9zZSkgcmVxdWVzdC5sb2cgPSBnZXRMb2dnZXIoKTtcblxuICBpZihvcHRpb25zLnVybCkge1xuICAgIG9wdGlvbnMudXJpID0gb3B0aW9ucy51cmw7XG4gICAgZGVsZXRlIG9wdGlvbnMudXJsO1xuICB9XG5cbiAgaWYoIW9wdGlvbnMudXJpICYmIG9wdGlvbnMudXJpICE9PSBcIlwiKVxuICAgIHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMudXJpIGlzIGEgcmVxdWlyZWQgYXJndW1lbnRcIik7XG5cbiAgaWYodHlwZW9mIG9wdGlvbnMudXJpICE9IFwic3RyaW5nXCIpXG4gICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy51cmkgbXVzdCBiZSBhIHN0cmluZ1wiKTtcblxuICB2YXIgdW5zdXBwb3J0ZWRfb3B0aW9ucyA9IFsncHJveHknLCAnX3JlZGlyZWN0c0ZvbGxvd2VkJywgJ21heFJlZGlyZWN0cycsICdmb2xsb3dSZWRpcmVjdCddXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdW5zdXBwb3J0ZWRfb3B0aW9ucy5sZW5ndGg7IGkrKylcbiAgICBpZihvcHRpb25zWyB1bnN1cHBvcnRlZF9vcHRpb25zW2ldIF0pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLlwiICsgdW5zdXBwb3J0ZWRfb3B0aW9uc1tpXSArIFwiIGlzIG5vdCBzdXBwb3J0ZWRcIilcblxuICBvcHRpb25zLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgb3B0aW9ucy5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnR0VUJztcbiAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICBvcHRpb25zLmJvZHkgICAgPSBvcHRpb25zLmJvZHkgfHwgbnVsbFxuICBvcHRpb25zLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQgfHwgcmVxdWVzdC5ERUZBVUxUX1RJTUVPVVRcblxuICBpZihvcHRpb25zLmhlYWRlcnMuaG9zdClcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPcHRpb25zLmhlYWRlcnMuaG9zdCBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuXG4gIGlmKG9wdGlvbnMuanNvbikge1xuICAgIG9wdGlvbnMuaGVhZGVycy5hY2NlcHQgPSBvcHRpb25zLmhlYWRlcnMuYWNjZXB0IHx8ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgIGlmKG9wdGlvbnMubWV0aG9kICE9PSAnR0VUJylcbiAgICAgIG9wdGlvbnMuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24vanNvbidcblxuICAgIGlmKHR5cGVvZiBvcHRpb25zLmpzb24gIT09ICdib29sZWFuJylcbiAgICAgIG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuanNvbilcbiAgICBlbHNlIGlmKHR5cGVvZiBvcHRpb25zLmJvZHkgIT09ICdzdHJpbmcnKVxuICAgICAgb3B0aW9ucy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5ib2R5KVxuICB9XG4gIFxuICAvL0JFR0lOIFFTIEhhY2tcbiAgdmFyIHNlcmlhbGl6ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBzdHIgPSBbXTtcbiAgICBmb3IodmFyIHAgaW4gb2JqKVxuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICBzdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQocCkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbcF0pKTtcbiAgICAgIH1cbiAgICByZXR1cm4gc3RyLmpvaW4oXCImXCIpO1xuICB9XG4gIFxuICBpZihvcHRpb25zLnFzKXtcbiAgICB2YXIgcXMgPSAodHlwZW9mIG9wdGlvbnMucXMgPT0gJ3N0cmluZycpPyBvcHRpb25zLnFzIDogc2VyaWFsaXplKG9wdGlvbnMucXMpO1xuICAgIGlmKG9wdGlvbnMudXJpLmluZGV4T2YoJz8nKSAhPT0gLTEpeyAvL25vIGdldCBwYXJhbXNcbiAgICAgICAgb3B0aW9ucy51cmkgPSBvcHRpb25zLnVyaSsnJicrcXM7XG4gICAgfWVsc2V7IC8vZXhpc3RpbmcgZ2V0IHBhcmFtc1xuICAgICAgICBvcHRpb25zLnVyaSA9IG9wdGlvbnMudXJpKyc/JytxcztcbiAgICB9XG4gIH1cbiAgLy9FTkQgUVMgSGFja1xuICBcbiAgLy9CRUdJTiBGT1JNIEhhY2tcbiAgdmFyIG11bHRpcGFydCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIC8vdG9kbzogc3VwcG9ydCBmaWxlIHR5cGUgKHVzZWZ1bD8pXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC5ib3VuZHJ5ID0gJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDAwMDAwKTtcbiAgICB2YXIgbGluZXMgPSBbXTtcbiAgICBmb3IodmFyIHAgaW4gb2JqKXtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgbGluZXMucHVzaChcbiAgICAgICAgICAgICAgICAnLS0nK3Jlc3VsdC5ib3VuZHJ5K1wiXFxuXCIrXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cIicrcCsnXCInK1wiXFxuXCIrXG4gICAgICAgICAgICAgICAgXCJcXG5cIitcbiAgICAgICAgICAgICAgICBvYmpbcF0rXCJcXG5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsaW5lcy5wdXNoKCAnLS0nK3Jlc3VsdC5ib3VuZHJ5KyctLScgKTtcbiAgICByZXN1bHQuYm9keSA9IGxpbmVzLmpvaW4oJycpO1xuICAgIHJlc3VsdC5sZW5ndGggPSByZXN1bHQuYm9keS5sZW5ndGg7XG4gICAgcmVzdWx0LnR5cGUgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JytyZXN1bHQuYm91bmRyeTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIFxuICBpZihvcHRpb25zLmZvcm0pe1xuICAgIGlmKHR5cGVvZiBvcHRpb25zLmZvcm0gPT0gJ3N0cmluZycpIHRocm93KCdmb3JtIG5hbWUgdW5zdXBwb3J0ZWQnKTtcbiAgICBpZihvcHRpb25zLm1ldGhvZCA9PT0gJ1BPU1QnKXtcbiAgICAgICAgdmFyIGVuY29kaW5nID0gKG9wdGlvbnMuZW5jb2RpbmcgfHwgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIG9wdGlvbnMuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSBlbmNvZGluZztcbiAgICAgICAgc3dpdGNoKGVuY29kaW5nKXtcbiAgICAgICAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5ib2R5ID0gc2VyaWFsaXplKG9wdGlvbnMuZm9ybSkucmVwbGFjZSgvJTIwL2csIFwiK1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ211bHRpcGFydC9mb3JtLWRhdGEnOlxuICAgICAgICAgICAgICAgIHZhciBtdWx0aSA9IG11bHRpcGFydChvcHRpb25zLmZvcm0pO1xuICAgICAgICAgICAgICAgIC8vb3B0aW9ucy5oZWFkZXJzWydjb250ZW50LWxlbmd0aCddID0gbXVsdGkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuYm9keSA9IG11bHRpLmJvZHk7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9IG11bHRpLnR5cGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0IDogdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBlbmNvZGluZzonK2VuY29kaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICAvL0VORCBGT1JNIEhhY2tcblxuICAvLyBJZiBvblJlc3BvbnNlIGlzIGJvb2xlYW4gdHJ1ZSwgY2FsbCBiYWNrIGltbWVkaWF0ZWx5IHdoZW4gdGhlIHJlc3BvbnNlIGlzIGtub3duLFxuICAvLyBub3Qgd2hlbiB0aGUgZnVsbCByZXF1ZXN0IGlzIGNvbXBsZXRlLlxuICBvcHRpb25zLm9uUmVzcG9uc2UgPSBvcHRpb25zLm9uUmVzcG9uc2UgfHwgbm9vcFxuICBpZihvcHRpb25zLm9uUmVzcG9uc2UgPT09IHRydWUpIHtcbiAgICBvcHRpb25zLm9uUmVzcG9uc2UgPSBjYWxsYmFja1xuICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBub29wXG4gIH1cblxuICAvLyBYWFggQnJvd3NlcnMgZG8gbm90IGxpa2UgdGhpcy5cbiAgLy9pZihvcHRpb25zLmJvZHkpXG4gIC8vICBvcHRpb25zLmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10gPSBvcHRpb25zLmJvZHkubGVuZ3RoO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYoIW9wdGlvbnMuaGVhZGVycy5hdXRob3JpemF0aW9uICYmIG9wdGlvbnMuYXV0aClcbiAgICBvcHRpb25zLmhlYWRlcnMuYXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYjY0X2VuYyhvcHRpb25zLmF1dGgudXNlcm5hbWUgKyAnOicgKyBvcHRpb25zLmF1dGgucGFzc3dvcmQpO1xuXG4gIHJldHVybiBydW5feGhyKG9wdGlvbnMpXG59XG5cbnZhciByZXFfc2VxID0gMFxuZnVuY3Rpb24gcnVuX3hocihvcHRpb25zKSB7XG4gIHZhciB4aHIgPSBuZXcgWEhSXG4gICAgLCB0aW1lZF9vdXQgPSBmYWxzZVxuICAgICwgaXNfY29ycyA9IGlzX2Nyb3NzRG9tYWluKG9wdGlvbnMudXJpKVxuICAgICwgc3VwcG9ydHNfY29ycyA9ICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpXG5cbiAgcmVxX3NlcSArPSAxXG4gIHhoci5zZXFfaWQgPSByZXFfc2VxXG4gIHhoci5pZCA9IHJlcV9zZXEgKyAnOiAnICsgb3B0aW9ucy5tZXRob2QgKyAnICcgKyBvcHRpb25zLnVyaVxuICB4aHIuX2lkID0geGhyLmlkIC8vIEkga25vdyBJIHdpbGwgdHlwZSBcIl9pZFwiIGZyb20gaGFiaXQgYWxsIHRoZSB0aW1lLlxuXG4gIGlmKGlzX2NvcnMgJiYgIXN1cHBvcnRzX2NvcnMpIHtcbiAgICB2YXIgY29yc19lcnIgPSBuZXcgRXJyb3IoJ0Jyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBjcm9zcy1vcmlnaW4gcmVxdWVzdDogJyArIG9wdGlvbnMudXJpKVxuICAgIGNvcnNfZXJyLmNvcnMgPSAndW5zdXBwb3J0ZWQnXG4gICAgcmV0dXJuIG9wdGlvbnMuY2FsbGJhY2soY29yc19lcnIsIHhocilcbiAgfVxuXG4gIHhoci50aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KHRvb19sYXRlLCBvcHRpb25zLnRpbWVvdXQpXG4gIGZ1bmN0aW9uIHRvb19sYXRlKCkge1xuICAgIHRpbWVkX291dCA9IHRydWVcbiAgICB2YXIgZXIgPSBuZXcgRXJyb3IoJ0VUSU1FRE9VVCcpXG4gICAgZXIuY29kZSA9ICdFVElNRURPVVQnXG4gICAgZXIuZHVyYXRpb24gPSBvcHRpb25zLnRpbWVvdXRcblxuICAgIHJlcXVlc3QubG9nLmVycm9yKCdUaW1lb3V0JywgeyAnaWQnOnhoci5faWQsICdtaWxsaXNlY29uZHMnOm9wdGlvbnMudGltZW91dCB9KVxuICAgIHJldHVybiBvcHRpb25zLmNhbGxiYWNrKGVyLCB4aHIpXG4gIH1cblxuICAvLyBTb21lIHN0YXRlcyBjYW4gYmUgc2tpcHBlZCBvdmVyLCBzbyByZW1lbWJlciB3aGF0IGlzIHN0aWxsIGluY29tcGxldGUuXG4gIHZhciBkaWQgPSB7J3Jlc3BvbnNlJzpmYWxzZSwgJ2xvYWRpbmcnOmZhbHNlLCAnZW5kJzpmYWxzZX1cblxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gb25fc3RhdGVfY2hhbmdlXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kLCBvcHRpb25zLnVyaSwgdHJ1ZSkgLy8gYXN5bmNocm9ub3VzXG4gIGlmKGlzX2NvcnMpXG4gICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzXG4gIHhoci5zZW5kKG9wdGlvbnMuYm9keSlcbiAgcmV0dXJuIHhoclxuXG4gIGZ1bmN0aW9uIG9uX3N0YXRlX2NoYW5nZShldmVudCkge1xuICAgIGlmKHRpbWVkX291dClcbiAgICAgIHJldHVybiByZXF1ZXN0LmxvZy5kZWJ1ZygnSWdub3JpbmcgdGltZWQgb3V0IHN0YXRlIGNoYW5nZScsIHsnc3RhdGUnOnhoci5yZWFkeVN0YXRlLCAnaWQnOnhoci5pZH0pXG5cbiAgICByZXF1ZXN0LmxvZy5kZWJ1ZygnU3RhdGUgY2hhbmdlJywgeydzdGF0ZSc6eGhyLnJlYWR5U3RhdGUsICdpZCc6eGhyLmlkLCAndGltZWRfb3V0Jzp0aW1lZF9vdXR9KVxuXG4gICAgaWYoeGhyLnJlYWR5U3RhdGUgPT09IFhIUi5PUEVORUQpIHtcbiAgICAgIHJlcXVlc3QubG9nLmRlYnVnKCdSZXF1ZXN0IHN0YXJ0ZWQnLCB7J2lkJzp4aHIuaWR9KVxuICAgICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMuaGVhZGVycylcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBvcHRpb25zLmhlYWRlcnNba2V5XSlcbiAgICB9XG5cbiAgICBlbHNlIGlmKHhoci5yZWFkeVN0YXRlID09PSBYSFIuSEVBREVSU19SRUNFSVZFRClcbiAgICAgIG9uX3Jlc3BvbnNlKClcblxuICAgIGVsc2UgaWYoeGhyLnJlYWR5U3RhdGUgPT09IFhIUi5MT0FESU5HKSB7XG4gICAgICBvbl9yZXNwb25zZSgpXG4gICAgICBvbl9sb2FkaW5nKClcbiAgICB9XG5cbiAgICBlbHNlIGlmKHhoci5yZWFkeVN0YXRlID09PSBYSFIuRE9ORSkge1xuICAgICAgb25fcmVzcG9uc2UoKVxuICAgICAgb25fbG9hZGluZygpXG4gICAgICBvbl9lbmQoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uX3Jlc3BvbnNlKCkge1xuICAgIGlmKGRpZC5yZXNwb25zZSlcbiAgICAgIHJldHVyblxuXG4gICAgZGlkLnJlc3BvbnNlID0gdHJ1ZVxuICAgIHJlcXVlc3QubG9nLmRlYnVnKCdHb3QgcmVzcG9uc2UnLCB7J2lkJzp4aHIuaWQsICdzdGF0dXMnOnhoci5zdGF0dXN9KVxuICAgIGNsZWFyVGltZW91dCh4aHIudGltZW91dFRpbWVyKVxuICAgIHhoci5zdGF0dXNDb2RlID0geGhyLnN0YXR1cyAvLyBOb2RlIHJlcXVlc3QgY29tcGF0aWJpbGl0eVxuXG4gICAgLy8gRGV0ZWN0IGZhaWxlZCBDT1JTIHJlcXVlc3RzLlxuICAgIGlmKGlzX2NvcnMgJiYgeGhyLnN0YXR1c0NvZGUgPT0gMCkge1xuICAgICAgdmFyIGNvcnNfZXJyID0gbmV3IEVycm9yKCdDT1JTIHJlcXVlc3QgcmVqZWN0ZWQ6ICcgKyBvcHRpb25zLnVyaSlcbiAgICAgIGNvcnNfZXJyLmNvcnMgPSAncmVqZWN0ZWQnXG5cbiAgICAgIC8vIERvIG5vdCBwcm9jZXNzIHRoaXMgcmVxdWVzdCBmdXJ0aGVyLlxuICAgICAgZGlkLmxvYWRpbmcgPSB0cnVlXG4gICAgICBkaWQuZW5kID0gdHJ1ZVxuXG4gICAgICByZXR1cm4gb3B0aW9ucy5jYWxsYmFjayhjb3JzX2VyciwgeGhyKVxuICAgIH1cblxuICAgIG9wdGlvbnMub25SZXNwb25zZShudWxsLCB4aHIpXG4gIH1cblxuICBmdW5jdGlvbiBvbl9sb2FkaW5nKCkge1xuICAgIGlmKGRpZC5sb2FkaW5nKVxuICAgICAgcmV0dXJuXG5cbiAgICBkaWQubG9hZGluZyA9IHRydWVcbiAgICByZXF1ZXN0LmxvZy5kZWJ1ZygnUmVzcG9uc2UgYm9keSBsb2FkaW5nJywgeydpZCc6eGhyLmlkfSlcbiAgICAvLyBUT0RPOiBNYXliZSBzaW11bGF0ZSBcImRhdGFcIiBldmVudHMgYnkgd2F0Y2hpbmcgeGhyLnJlc3BvbnNlVGV4dFxuICB9XG5cbiAgZnVuY3Rpb24gb25fZW5kKCkge1xuICAgIGlmKGRpZC5lbmQpXG4gICAgICByZXR1cm5cblxuICAgIGRpZC5lbmQgPSB0cnVlXG4gICAgcmVxdWVzdC5sb2cuZGVidWcoJ1JlcXVlc3QgZG9uZScsIHsnaWQnOnhoci5pZH0pXG5cbiAgICB4aHIuYm9keSA9IHhoci5yZXNwb25zZVRleHRcbiAgICBpZihvcHRpb25zLmpzb24pIHtcbiAgICAgIHRyeSAgICAgICAgeyB4aHIuYm9keSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkgfVxuICAgICAgY2F0Y2ggKGVyKSB7IHJldHVybiBvcHRpb25zLmNhbGxiYWNrKGVyLCB4aHIpICAgICAgICB9XG4gICAgfVxuXG4gICAgb3B0aW9ucy5jYWxsYmFjayhudWxsLCB4aHIsIHhoci5ib2R5KVxuICB9XG5cbn0gLy8gcmVxdWVzdFxuXG5yZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xucmVxdWVzdC5ERUZBVUxUX1RJTUVPVVQgPSBERUZBVUxUX1RJTUVPVVQ7XG5cbi8vXG4vLyBkZWZhdWx0c1xuLy9cblxucmVxdWVzdC5kZWZhdWx0cyA9IGZ1bmN0aW9uKG9wdGlvbnMsIHJlcXVlc3Rlcikge1xuICB2YXIgZGVmID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgIHZhciBkID0gZnVuY3Rpb24gKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgIGlmKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKVxuICAgICAgICBwYXJhbXMgPSB7J3VyaSc6IHBhcmFtc307XG4gICAgICBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xuICAgICAgICBpZiAocGFyYW1zW2ldID09PSB1bmRlZmluZWQpIHBhcmFtc1tpXSA9IG9wdGlvbnNbaV1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtZXRob2QocGFyYW1zLCBjYWxsYmFjaylcbiAgICB9XG4gICAgcmV0dXJuIGRcbiAgfVxuICB2YXIgZGUgPSBkZWYocmVxdWVzdClcbiAgZGUuZ2V0ID0gZGVmKHJlcXVlc3QuZ2V0KVxuICBkZS5wb3N0ID0gZGVmKHJlcXVlc3QucG9zdClcbiAgZGUucHV0ID0gZGVmKHJlcXVlc3QucHV0KVxuICBkZS5oZWFkID0gZGVmKHJlcXVlc3QuaGVhZClcbiAgcmV0dXJuIGRlXG59XG5cbi8vXG4vLyBIVFRQIG1ldGhvZCBzaG9ydGN1dHNcbi8vXG5cbnZhciBzaG9ydGN1dHMgPSBbICdnZXQnLCAncHV0JywgJ3Bvc3QnLCAnaGVhZCcgXTtcbnNob3J0Y3V0cy5mb3JFYWNoKGZ1bmN0aW9uKHNob3J0Y3V0KSB7XG4gIHZhciBtZXRob2QgPSBzaG9ydGN1dC50b1VwcGVyQ2FzZSgpO1xuICB2YXIgZnVuYyAgID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKTtcblxuICByZXF1ZXN0W2Z1bmNdID0gZnVuY3Rpb24ob3B0cykge1xuICAgIGlmKHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJylcbiAgICAgIG9wdHMgPSB7J21ldGhvZCc6bWV0aG9kLCAndXJpJzpvcHRzfTtcbiAgICBlbHNlIHtcbiAgICAgIG9wdHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9wdHMpKTtcbiAgICAgIG9wdHMubWV0aG9kID0gbWV0aG9kO1xuICAgIH1cblxuICAgIHZhciBhcmdzID0gW29wdHNdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJndW1lbnRzLCBbMV0pKTtcbiAgICByZXR1cm4gcmVxdWVzdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxufSlcblxuLy9cbi8vIENvdWNoREIgc2hvcnRjdXRcbi8vXG5cbnJlcXVlc3QuY291Y2ggPSBmdW5jdGlvbihvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZih0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpXG4gICAgb3B0aW9ucyA9IHsndXJpJzpvcHRpb25zfVxuXG4gIC8vIEp1c3QgdXNlIHRoZSByZXF1ZXN0IEFQSSB0byBkbyBKU09OLlxuICBvcHRpb25zLmpzb24gPSB0cnVlXG4gIGlmKG9wdGlvbnMuYm9keSlcbiAgICBvcHRpb25zLmpzb24gPSBvcHRpb25zLmJvZHlcbiAgZGVsZXRlIG9wdGlvbnMuYm9keVxuXG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbm9vcFxuXG4gIHZhciB4aHIgPSByZXF1ZXN0KG9wdGlvbnMsIGNvdWNoX2hhbmRsZXIpXG4gIHJldHVybiB4aHJcblxuICBmdW5jdGlvbiBjb3VjaF9oYW5kbGVyKGVyLCByZXNwLCBib2R5KSB7XG4gICAgaWYoZXIpXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXIsIHJlc3AsIGJvZHkpXG5cbiAgICBpZigocmVzcC5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlc3Auc3RhdHVzQ29kZSA+IDI5OSkgJiYgYm9keS5lcnJvcikge1xuICAgICAgLy8gVGhlIGJvZHkgaXMgYSBDb3VjaCBKU09OIG9iamVjdCBpbmRpY2F0aW5nIHRoZSBlcnJvci5cbiAgICAgIGVyID0gbmV3IEVycm9yKCdDb3VjaERCIGVycm9yOiAnICsgKGJvZHkuZXJyb3IucmVhc29uIHx8IGJvZHkuZXJyb3IuZXJyb3IpKVxuICAgICAgZm9yICh2YXIga2V5IGluIGJvZHkpXG4gICAgICAgIGVyW2tleV0gPSBib2R5W2tleV1cbiAgICAgIHJldHVybiBjYWxsYmFjayhlciwgcmVzcCwgYm9keSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGxiYWNrKGVyLCByZXNwLCBib2R5KTtcbiAgfVxufVxuXG4vL1xuLy8gVXRpbGl0eVxuLy9cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGdldExvZ2dlcigpIHtcbiAgdmFyIGxvZ2dlciA9IHt9XG4gICAgLCBsZXZlbHMgPSBbJ3RyYWNlJywgJ2RlYnVnJywgJ2luZm8nLCAnd2FybicsICdlcnJvciddXG4gICAgLCBsZXZlbCwgaVxuXG4gIGZvcihpID0gMDsgaSA8IGxldmVscy5sZW5ndGg7IGkrKykge1xuICAgIGxldmVsID0gbGV2ZWxzW2ldXG5cbiAgICBsb2dnZXJbbGV2ZWxdID0gbm9vcFxuICAgIGlmKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlICYmIGNvbnNvbGVbbGV2ZWxdKVxuICAgICAgbG9nZ2VyW2xldmVsXSA9IGZvcm1hdHRlZChjb25zb2xlLCBsZXZlbClcbiAgfVxuXG4gIHJldHVybiBsb2dnZXJcbn1cblxuZnVuY3Rpb24gZm9ybWF0dGVkKG9iaiwgbWV0aG9kKSB7XG4gIHJldHVybiBmb3JtYXR0ZWRfbG9nZ2VyXG5cbiAgZnVuY3Rpb24gZm9ybWF0dGVkX2xvZ2dlcihzdHIsIGNvbnRleHQpIHtcbiAgICBpZih0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcpXG4gICAgICBzdHIgKz0gJyAnICsgSlNPTi5zdHJpbmdpZnkoY29udGV4dClcblxuICAgIHJldHVybiBvYmpbbWV0aG9kXS5jYWxsKG9iaiwgc3RyKVxuICB9XG59XG5cbi8vIFJldHVybiB3aGV0aGVyIGEgVVJMIGlzIGEgY3Jvc3MtZG9tYWluIHJlcXVlc3QuXG5mdW5jdGlvbiBpc19jcm9zc0RvbWFpbih1cmwpIHtcbiAgdmFyIHJ1cmwgPSAvXihbXFx3XFwrXFwuXFwtXSs6KSg/OlxcL1xcLyhbXlxcLz8jOl0qKSg/OjooXFxkKykpPyk/L1xuXG4gIC8vIGpRdWVyeSAjODEzOCwgSUUgbWF5IHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZ1xuICAvLyBhIGZpZWxkIGZyb20gd2luZG93LmxvY2F0aW9uIGlmIGRvY3VtZW50LmRvbWFpbiBoYXMgYmVlbiBzZXRcbiAgdmFyIGFqYXhMb2NhdGlvblxuICB0cnkgeyBhamF4TG9jYXRpb24gPSBsb2NhdGlvbi5ocmVmIH1cbiAgY2F0Y2ggKGUpIHtcbiAgICAvLyBVc2UgdGhlIGhyZWYgYXR0cmlidXRlIG9mIGFuIEEgZWxlbWVudCBzaW5jZSBJRSB3aWxsIG1vZGlmeSBpdCBnaXZlbiBkb2N1bWVudC5sb2NhdGlvblxuICAgIGFqYXhMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiYVwiICk7XG4gICAgYWpheExvY2F0aW9uLmhyZWYgPSBcIlwiO1xuICAgIGFqYXhMb2NhdGlvbiA9IGFqYXhMb2NhdGlvbi5ocmVmO1xuICB9XG5cbiAgdmFyIGFqYXhMb2NQYXJ0cyA9IHJ1cmwuZXhlYyhhamF4TG9jYXRpb24udG9Mb3dlckNhc2UoKSkgfHwgW11cbiAgICAsIHBhcnRzID0gcnVybC5leGVjKHVybC50b0xvd2VyQ2FzZSgpIClcblxuICB2YXIgcmVzdWx0ID0gISEoXG4gICAgcGFydHMgJiZcbiAgICAoICBwYXJ0c1sxXSAhPSBhamF4TG9jUGFydHNbMV1cbiAgICB8fCBwYXJ0c1syXSAhPSBhamF4TG9jUGFydHNbMl1cbiAgICB8fCAocGFydHNbM10gfHwgKHBhcnRzWzFdID09PSBcImh0dHA6XCIgPyA4MCA6IDQ0MykpICE9IChhamF4TG9jUGFydHNbM10gfHwgKGFqYXhMb2NQYXJ0c1sxXSA9PT0gXCJodHRwOlwiID8gODAgOiA0NDMpKVxuICAgIClcbiAgKVxuXG4gIC8vY29uc29sZS5kZWJ1ZygnaXNfY3Jvc3NEb21haW4oJyt1cmwrJykgLT4gJyArIHJlc3VsdClcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBNSVQgTGljZW5zZSBmcm9tIGh0dHA6Ly9waHBqcy5vcmcvZnVuY3Rpb25zL2Jhc2U2NF9lbmNvZGU6MzU4XG5mdW5jdGlvbiBiNjRfZW5jIChkYXRhKSB7XG4gICAgLy8gRW5jb2RlcyBzdHJpbmcgdXNpbmcgTUlNRSBiYXNlNjQgYWxnb3JpdGhtXG4gICAgdmFyIGI2NCA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcbiAgICB2YXIgbzEsIG8yLCBvMywgaDEsIGgyLCBoMywgaDQsIGJpdHMsIGkgPSAwLCBhYyA9IDAsIGVuYz1cIlwiLCB0bXBfYXJyID0gW107XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgLy8gYXNzdW1lIHV0ZjggZGF0YVxuICAgIC8vIGRhdGEgPSB0aGlzLnV0ZjhfZW5jb2RlKGRhdGErJycpO1xuXG4gICAgZG8geyAvLyBwYWNrIHRocmVlIG9jdGV0cyBpbnRvIGZvdXIgaGV4ZXRzXG4gICAgICAgIG8xID0gZGF0YS5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgIG8yID0gZGF0YS5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICAgIG8zID0gZGF0YS5jaGFyQ29kZUF0KGkrKyk7XG5cbiAgICAgICAgYml0cyA9IG8xPDwxNiB8IG8yPDw4IHwgbzM7XG5cbiAgICAgICAgaDEgPSBiaXRzPj4xOCAmIDB4M2Y7XG4gICAgICAgIGgyID0gYml0cz4+MTIgJiAweDNmO1xuICAgICAgICBoMyA9IGJpdHM+PjYgJiAweDNmO1xuICAgICAgICBoNCA9IGJpdHMgJiAweDNmO1xuXG4gICAgICAgIC8vIHVzZSBoZXhldHMgdG8gaW5kZXggaW50byBiNjQsIGFuZCBhcHBlbmQgcmVzdWx0IHRvIGVuY29kZWQgc3RyaW5nXG4gICAgICAgIHRtcF9hcnJbYWMrK10gPSBiNjQuY2hhckF0KGgxKSArIGI2NC5jaGFyQXQoaDIpICsgYjY0LmNoYXJBdChoMykgKyBiNjQuY2hhckF0KGg0KTtcbiAgICB9IHdoaWxlIChpIDwgZGF0YS5sZW5ndGgpO1xuXG4gICAgZW5jID0gdG1wX2Fyci5qb2luKCcnKTtcblxuICAgIHN3aXRjaCAoZGF0YS5sZW5ndGggJSAzKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGVuYyA9IGVuYy5zbGljZSgwLCAtMikgKyAnPT0nO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgZW5jID0gZW5jLnNsaWNlKDAsIC0xKSArICc9JztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuYztcbn1cbiAgICByZXR1cm4gcmVxdWVzdDtcbi8vVU1EIEZPT1RFUiBTVEFSVFxufSkpO1xuLy9VTUQgRk9PVEVSIEVORFxuIiwiLy8hIG1vbWVudC5qc1xuLy8hIHZlcnNpb24gOiAyLjkuMFxuLy8hIGF1dGhvcnMgOiBUaW0gV29vZCwgSXNrcmVuIENoZXJuZXYsIE1vbWVudC5qcyBjb250cmlidXRvcnNcbi8vISBsaWNlbnNlIDogTUlUXG4vLyEgbW9tZW50anMuY29tXG5cbihmdW5jdGlvbiAodW5kZWZpbmVkKSB7XG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBDb25zdGFudHNcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICB2YXIgbW9tZW50LFxuICAgICAgICBWRVJTSU9OID0gJzIuOS4wJyxcbiAgICAgICAgLy8gdGhlIGdsb2JhbC1zY29wZSB0aGlzIGlzIE5PVCB0aGUgZ2xvYmFsIG9iamVjdCBpbiBOb2RlLmpzXG4gICAgICAgIGdsb2JhbFNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB3aW5kb3cgPT09IGdsb2JhbC53aW5kb3cpKSA/IGdsb2JhbCA6IHRoaXMsXG4gICAgICAgIG9sZEdsb2JhbE1vbWVudCxcbiAgICAgICAgcm91bmQgPSBNYXRoLnJvdW5kLFxuICAgICAgICBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICAgIGksXG5cbiAgICAgICAgWUVBUiA9IDAsXG4gICAgICAgIE1PTlRIID0gMSxcbiAgICAgICAgREFURSA9IDIsXG4gICAgICAgIEhPVVIgPSAzLFxuICAgICAgICBNSU5VVEUgPSA0LFxuICAgICAgICBTRUNPTkQgPSA1LFxuICAgICAgICBNSUxMSVNFQ09ORCA9IDYsXG5cbiAgICAgICAgLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbG9jYWxlIGNvbmZpZyBmaWxlc1xuICAgICAgICBsb2NhbGVzID0ge30sXG5cbiAgICAgICAgLy8gZXh0cmEgbW9tZW50IGludGVybmFsIHByb3BlcnRpZXMgKHBsdWdpbnMgcmVnaXN0ZXIgcHJvcHMgaGVyZSlcbiAgICAgICAgbW9tZW50UHJvcGVydGllcyA9IFtdLFxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBub2RlSlNcbiAgICAgICAgaGFzTW9kdWxlID0gKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyksXG5cbiAgICAgICAgLy8gQVNQLk5FVCBqc29uIGRhdGUgZm9ybWF0IHJlZ2V4XG4gICAgICAgIGFzcE5ldEpzb25SZWdleCA9IC9eXFwvP0RhdGVcXCgoXFwtP1xcZCspL2ksXG4gICAgICAgIGFzcE5ldFRpbWVTcGFuSnNvblJlZ2V4ID0gLyhcXC0pPyg/OihcXGQqKVxcLik/KFxcZCspXFw6KFxcZCspKD86XFw6KFxcZCspXFwuPyhcXGR7M30pPyk/LyxcblxuICAgICAgICAvLyBmcm9tIGh0dHA6Ly9kb2NzLmNsb3N1cmUtbGlicmFyeS5nb29nbGVjb2RlLmNvbS9naXQvY2xvc3VyZV9nb29nX2RhdGVfZGF0ZS5qcy5zb3VyY2UuaHRtbFxuICAgICAgICAvLyBzb21ld2hhdCBtb3JlIGluIGxpbmUgd2l0aCA0LjQuMy4yIDIwMDQgc3BlYywgYnV0IGFsbG93cyBkZWNpbWFsIGFueXdoZXJlXG4gICAgICAgIGlzb0R1cmF0aW9uUmVnZXggPSAvXigtKT9QKD86KD86KFswLTksLl0qKVkpPyg/OihbMC05LC5dKilNKT8oPzooWzAtOSwuXSopRCk/KD86VCg/OihbMC05LC5dKilIKT8oPzooWzAtOSwuXSopTSk/KD86KFswLTksLl0qKVMpPyk/fChbMC05LC5dKilXKSQvLFxuXG4gICAgICAgIC8vIGZvcm1hdCB0b2tlbnNcbiAgICAgICAgZm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhNb3xNTT9NP00/fERvfERERG98REQ/RD9EP3xkZGQ/ZD98ZG8/fHdbb3x3XT98V1tvfFddP3xRfFlZWVlZWXxZWVlZWXxZWVlZfFlZfGdnKGdnZz8pP3xHRyhHR0c/KT98ZXxFfGF8QXxoaD98SEg/fG1tP3xzcz98U3sxLDR9fHh8WHx6ej98Wlo/fC4pL2csXG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2VucyA9IC8oXFxbW15cXFtdKlxcXSl8KFxcXFwpPyhMVFN8TFR8TEw/TD9MP3xsezEsNH0pL2csXG5cbiAgICAgICAgLy8gcGFyc2luZyB0b2tlbiByZWdleGVzXG4gICAgICAgIHBhcnNlVG9rZW5PbmVPclR3b0RpZ2l0cyA9IC9cXGRcXGQ/LywgLy8gMCAtIDk5XG4gICAgICAgIHBhcnNlVG9rZW5PbmVUb1RocmVlRGlnaXRzID0gL1xcZHsxLDN9LywgLy8gMCAtIDk5OVxuICAgICAgICBwYXJzZVRva2VuT25lVG9Gb3VyRGlnaXRzID0gL1xcZHsxLDR9LywgLy8gMCAtIDk5OTlcbiAgICAgICAgcGFyc2VUb2tlbk9uZVRvU2l4RGlnaXRzID0gL1srXFwtXT9cXGR7MSw2fS8sIC8vIC05OTksOTk5IC0gOTk5LDk5OVxuICAgICAgICBwYXJzZVRva2VuRGlnaXRzID0gL1xcZCsvLCAvLyBub256ZXJvIG51bWJlciBvZiBkaWdpdHNcbiAgICAgICAgcGFyc2VUb2tlbldvcmQgPSAvWzAtOV0qWydhLXpcXHUwMEEwLVxcdTA1RkZcXHUwNzAwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdK3xbXFx1MDYwMC1cXHUwNkZGXFwvXSsoXFxzKj9bXFx1MDYwMC1cXHUwNkZGXSspezEsMn0vaSwgLy8gYW55IHdvcmQgKG9yIHR3bykgY2hhcmFjdGVycyBvciBudW1iZXJzIGluY2x1ZGluZyB0d28vdGhyZWUgd29yZCBtb250aCBpbiBhcmFiaWMuXG4gICAgICAgIHBhcnNlVG9rZW5UaW1lem9uZSA9IC9afFtcXCtcXC1dXFxkXFxkOj9cXGRcXGQvZ2ksIC8vICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxuICAgICAgICBwYXJzZVRva2VuVCA9IC9UL2ksIC8vIFQgKElTTyBzZXBhcmF0b3IpXG4gICAgICAgIHBhcnNlVG9rZW5PZmZzZXRNcyA9IC9bXFwrXFwtXT9cXGQrLywgLy8gMTIzNDU2Nzg5MDEyM1xuICAgICAgICBwYXJzZVRva2VuVGltZXN0YW1wTXMgPSAvW1xcK1xcLV0/XFxkKyhcXC5cXGR7MSwzfSk/LywgLy8gMTIzNDU2Nzg5IDEyMzQ1Njc4OS4xMjNcblxuICAgICAgICAvL3N0cmljdCBwYXJzaW5nIHJlZ2V4ZXNcbiAgICAgICAgcGFyc2VUb2tlbk9uZURpZ2l0ID0gL1xcZC8sIC8vIDAgLSA5XG4gICAgICAgIHBhcnNlVG9rZW5Ud29EaWdpdHMgPSAvXFxkXFxkLywgLy8gMDAgLSA5OVxuICAgICAgICBwYXJzZVRva2VuVGhyZWVEaWdpdHMgPSAvXFxkezN9LywgLy8gMDAwIC0gOTk5XG4gICAgICAgIHBhcnNlVG9rZW5Gb3VyRGlnaXRzID0gL1xcZHs0fS8sIC8vIDAwMDAgLSA5OTk5XG4gICAgICAgIHBhcnNlVG9rZW5TaXhEaWdpdHMgPSAvWystXT9cXGR7Nn0vLCAvLyAtOTk5LDk5OSAtIDk5OSw5OTlcbiAgICAgICAgcGFyc2VUb2tlblNpZ25lZE51bWJlciA9IC9bKy1dP1xcZCsvLCAvLyAtaW5mIC0gaW5mXG5cbiAgICAgICAgLy8gaXNvIDg2MDEgcmVnZXhcbiAgICAgICAgLy8gMDAwMC0wMC0wMCAwMDAwLVcwMCBvciAwMDAwLVcwMC0wICsgVCArIDAwIG9yIDAwOjAwIG9yIDAwOjAwOjAwIG9yIDAwOjAwOjAwLjAwMCArICswMDowMCBvciArMDAwMCBvciArMDApXG4gICAgICAgIGlzb1JlZ2V4ID0gL15cXHMqKD86WystXVxcZHs2fXxcXGR7NH0pLSg/OihcXGRcXGQtXFxkXFxkKXwoV1xcZFxcZCQpfChXXFxkXFxkLVxcZCl8KFxcZFxcZFxcZCkpKChUfCApKFxcZFxcZCg6XFxkXFxkKDpcXGRcXGQoXFwuXFxkKyk/KT8pPyk/KFtcXCtcXC1dXFxkXFxkKD86Oj9cXGRcXGQpP3xcXHMqWik/KT8kLyxcblxuICAgICAgICBpc29Gb3JtYXQgPSAnWVlZWS1NTS1ERFRISDptbTpzc1onLFxuXG4gICAgICAgIGlzb0RhdGVzID0gW1xuICAgICAgICAgICAgWydZWVlZWVktTU0tREQnLCAvWystXVxcZHs2fS1cXGR7Mn0tXFxkezJ9L10sXG4gICAgICAgICAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZHsyfS1cXGR7Mn0vXSxcbiAgICAgICAgICAgIFsnR0dHRy1bV11XVy1FJywgL1xcZHs0fS1XXFxkezJ9LVxcZC9dLFxuICAgICAgICAgICAgWydHR0dHLVtXXVdXJywgL1xcZHs0fS1XXFxkezJ9L10sXG4gICAgICAgICAgICBbJ1lZWVktREREJywgL1xcZHs0fS1cXGR7M30vXVxuICAgICAgICBdLFxuXG4gICAgICAgIC8vIGlzbyB0aW1lIGZvcm1hdHMgYW5kIHJlZ2V4ZXNcbiAgICAgICAgaXNvVGltZXMgPSBbXG4gICAgICAgICAgICBbJ0hIOm1tOnNzLlNTU1MnLCAvKFR8IClcXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZCsvXSxcbiAgICAgICAgICAgIFsnSEg6bW06c3MnLCAvKFR8IClcXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxuICAgICAgICAgICAgWydISDptbScsIC8oVHwgKVxcZFxcZDpcXGRcXGQvXSxcbiAgICAgICAgICAgIFsnSEgnLCAvKFR8IClcXGRcXGQvXVxuICAgICAgICBdLFxuXG4gICAgICAgIC8vIHRpbWV6b25lIGNodW5rZXIgJysxMDowMCcgPiBbJzEwJywgJzAwJ10gb3IgJy0xNTMwJyA+IFsnLScsICcxNScsICczMCddXG4gICAgICAgIHBhcnNlVGltZXpvbmVDaHVua2VyID0gLyhbXFwrXFwtXXxcXGRcXGQpL2dpLFxuXG4gICAgICAgIC8vIGdldHRlciBhbmQgc2V0dGVyIG5hbWVzXG4gICAgICAgIHByb3h5R2V0dGVyc0FuZFNldHRlcnMgPSAnRGF0ZXxIb3Vyc3xNaW51dGVzfFNlY29uZHN8TWlsbGlzZWNvbmRzJy5zcGxpdCgnfCcpLFxuICAgICAgICB1bml0TWlsbGlzZWNvbmRGYWN0b3JzID0ge1xuICAgICAgICAgICAgJ01pbGxpc2Vjb25kcycgOiAxLFxuICAgICAgICAgICAgJ1NlY29uZHMnIDogMWUzLFxuICAgICAgICAgICAgJ01pbnV0ZXMnIDogNmU0LFxuICAgICAgICAgICAgJ0hvdXJzJyA6IDM2ZTUsXG4gICAgICAgICAgICAnRGF5cycgOiA4NjRlNSxcbiAgICAgICAgICAgICdNb250aHMnIDogMjU5MmU2LFxuICAgICAgICAgICAgJ1llYXJzJyA6IDMxNTM2ZTZcbiAgICAgICAgfSxcblxuICAgICAgICB1bml0QWxpYXNlcyA9IHtcbiAgICAgICAgICAgIG1zIDogJ21pbGxpc2Vjb25kJyxcbiAgICAgICAgICAgIHMgOiAnc2Vjb25kJyxcbiAgICAgICAgICAgIG0gOiAnbWludXRlJyxcbiAgICAgICAgICAgIGggOiAnaG91cicsXG4gICAgICAgICAgICBkIDogJ2RheScsXG4gICAgICAgICAgICBEIDogJ2RhdGUnLFxuICAgICAgICAgICAgdyA6ICd3ZWVrJyxcbiAgICAgICAgICAgIFcgOiAnaXNvV2VlaycsXG4gICAgICAgICAgICBNIDogJ21vbnRoJyxcbiAgICAgICAgICAgIFEgOiAncXVhcnRlcicsXG4gICAgICAgICAgICB5IDogJ3llYXInLFxuICAgICAgICAgICAgREREIDogJ2RheU9mWWVhcicsXG4gICAgICAgICAgICBlIDogJ3dlZWtkYXknLFxuICAgICAgICAgICAgRSA6ICdpc29XZWVrZGF5JyxcbiAgICAgICAgICAgIGdnOiAnd2Vla1llYXInLFxuICAgICAgICAgICAgR0c6ICdpc29XZWVrWWVhcidcbiAgICAgICAgfSxcblxuICAgICAgICBjYW1lbEZ1bmN0aW9ucyA9IHtcbiAgICAgICAgICAgIGRheW9meWVhciA6ICdkYXlPZlllYXInLFxuICAgICAgICAgICAgaXNvd2Vla2RheSA6ICdpc29XZWVrZGF5JyxcbiAgICAgICAgICAgIGlzb3dlZWsgOiAnaXNvV2VlaycsXG4gICAgICAgICAgICB3ZWVreWVhciA6ICd3ZWVrWWVhcicsXG4gICAgICAgICAgICBpc293ZWVreWVhciA6ICdpc29XZWVrWWVhcidcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBmb3JtYXQgZnVuY3Rpb24gc3RyaW5nc1xuICAgICAgICBmb3JtYXRGdW5jdGlvbnMgPSB7fSxcblxuICAgICAgICAvLyBkZWZhdWx0IHJlbGF0aXZlIHRpbWUgdGhyZXNob2xkc1xuICAgICAgICByZWxhdGl2ZVRpbWVUaHJlc2hvbGRzID0ge1xuICAgICAgICAgICAgczogNDUsICAvLyBzZWNvbmRzIHRvIG1pbnV0ZVxuICAgICAgICAgICAgbTogNDUsICAvLyBtaW51dGVzIHRvIGhvdXJcbiAgICAgICAgICAgIGg6IDIyLCAgLy8gaG91cnMgdG8gZGF5XG4gICAgICAgICAgICBkOiAyNiwgIC8vIGRheXMgdG8gbW9udGhcbiAgICAgICAgICAgIE06IDExICAgLy8gbW9udGhzIHRvIHllYXJcbiAgICAgICAgfSxcblxuICAgICAgICAvLyB0b2tlbnMgdG8gb3JkaW5hbGl6ZSBhbmQgcGFkXG4gICAgICAgIG9yZGluYWxpemVUb2tlbnMgPSAnREREIHcgVyBNIEQgZCcuc3BsaXQoJyAnKSxcbiAgICAgICAgcGFkZGVkVG9rZW5zID0gJ00gRCBIIGggbSBzIHcgVycuc3BsaXQoJyAnKSxcblxuICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9ucyA9IHtcbiAgICAgICAgICAgIE0gICAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9udGgoKSArIDE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgTU1NICA6IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBNTU1NIDogZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBEICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBEREQgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRheU9mWWVhcigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGQgICAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGQgICA6IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4odGhpcywgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZGQgIDogZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGRkZCA6IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXModGhpcywgZm9ybWF0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3ICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndlZWsoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBXICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWsoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBZWSAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0WmVyb0ZpbGwodGhpcy55ZWFyKCkgJSAxMDAsIDIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFlZWVkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRaZXJvRmlsbCh0aGlzLnllYXIoKSwgNCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWVlZWVkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRaZXJvRmlsbCh0aGlzLnllYXIoKSwgNSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgWVlZWVlZIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB5ID0gdGhpcy55ZWFyKCksIHNpZ24gPSB5ID49IDAgPyAnKycgOiAnLSc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpZ24gKyBsZWZ0WmVyb0ZpbGwoTWF0aC5hYnMoeSksIDYpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdnICAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRaZXJvRmlsbCh0aGlzLndlZWtZZWFyKCkgJSAxMDAsIDIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdnZ2cgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRaZXJvRmlsbCh0aGlzLndlZWtZZWFyKCksIDQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdnZ2dnIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0WmVyb0ZpbGwodGhpcy53ZWVrWWVhcigpLCA1KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBHRyAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0WmVyb0ZpbGwodGhpcy5pc29XZWVrWWVhcigpICUgMTAwLCAyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBHR0dHIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0WmVyb0ZpbGwodGhpcy5pc29XZWVrWWVhcigpLCA0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBHR0dHRyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFplcm9GaWxsKHRoaXMuaXNvV2Vla1llYXIoKSwgNSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53ZWVrZGF5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc29XZWVrZGF5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYSAgICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubWVyaWRpZW0odGhpcy5ob3VycygpLCB0aGlzLm1pbnV0ZXMoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgQSAgICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubWVyaWRpZW0odGhpcy5ob3VycygpLCB0aGlzLm1pbnV0ZXMoKSwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEggICAgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaG91cnMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhvdXJzKCkgJSAxMiB8fCAxMjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1pbnV0ZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlY29uZHMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b0ludCh0aGlzLm1pbGxpc2Vjb25kcygpIC8gMTAwKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBTUyAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0WmVyb0ZpbGwodG9JbnQodGhpcy5taWxsaXNlY29uZHMoKSAvIDEwKSwgMik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgU1NTICA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFplcm9GaWxsKHRoaXMubWlsbGlzZWNvbmRzKCksIDMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFNTU1MgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRaZXJvRmlsbCh0aGlzLm1pbGxpc2Vjb25kcygpLCAzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBaICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhID0gdGhpcy51dGNPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgYiA9ICcrJztcbiAgICAgICAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICAgICAgICBiID0gJy0nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGxlZnRaZXJvRmlsbCh0b0ludChhIC8gNjApLCAyKSArICc6JyArIGxlZnRaZXJvRmlsbCh0b0ludChhKSAlIDYwLCAyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBaWiAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBhID0gdGhpcy51dGNPZmZzZXQoKSxcbiAgICAgICAgICAgICAgICAgICAgYiA9ICcrJztcbiAgICAgICAgICAgICAgICBpZiAoYSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICAgICAgICBiID0gJy0nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGxlZnRaZXJvRmlsbCh0b0ludChhIC8gNjApLCAyKSArIGxlZnRaZXJvRmlsbCh0b0ludChhKSAlIDYwLCAyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB6IDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnpvbmVBYmJyKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgenogOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuem9uZU5hbWUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB4ICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBYICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVuaXgoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBRIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1YXJ0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkZXByZWNhdGlvbnMgPSB7fSxcblxuICAgICAgICBsaXN0cyA9IFsnbW9udGhzJywgJ21vbnRoc1Nob3J0JywgJ3dlZWtkYXlzJywgJ3dlZWtkYXlzU2hvcnQnLCAnd2Vla2RheXNNaW4nXSxcblxuICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICAvLyBQaWNrIHRoZSBmaXJzdCBkZWZpbmVkIG9mIHR3byBvciB0aHJlZSBhcmd1bWVudHMuIGRmbCBjb21lcyBmcm9tXG4gICAgLy8gZGVmYXVsdC5cbiAgICBmdW5jdGlvbiBkZmwoYSwgYiwgYykge1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIGEgIT0gbnVsbCA/IGEgOiBiO1xuICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gYSAhPSBudWxsID8gYSA6IGIgIT0gbnVsbCA/IGIgOiBjO1xuICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdJbXBsZW1lbnQgbWUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc093blByb3AoYSwgYikge1xuICAgICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChhLCBiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWZhdWx0UGFyc2luZ0ZsYWdzKCkge1xuICAgICAgICAvLyBXZSBuZWVkIHRvIGRlZXAgY2xvbmUgdGhpcyBvYmplY3QsIGFuZCBlczUgc3RhbmRhcmQgaXMgbm90IHZlcnlcbiAgICAgICAgLy8gaGVscGZ1bC5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVtcHR5IDogZmFsc2UsXG4gICAgICAgICAgICB1bnVzZWRUb2tlbnMgOiBbXSxcbiAgICAgICAgICAgIHVudXNlZElucHV0IDogW10sXG4gICAgICAgICAgICBvdmVyZmxvdyA6IC0yLFxuICAgICAgICAgICAgY2hhcnNMZWZ0T3ZlciA6IDAsXG4gICAgICAgICAgICBudWxsSW5wdXQgOiBmYWxzZSxcbiAgICAgICAgICAgIGludmFsaWRNb250aCA6IG51bGwsXG4gICAgICAgICAgICBpbnZhbGlkRm9ybWF0IDogZmFsc2UsXG4gICAgICAgICAgICB1c2VySW52YWxpZGF0ZWQgOiBmYWxzZSxcbiAgICAgICAgICAgIGlzbzogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmludE1zZyhtc2cpIHtcbiAgICAgICAgaWYgKG1vbWVudC5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEZXByZWNhdGlvbiB3YXJuaW5nOiAnICsgbXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZShtc2csIGZuKSB7XG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZXh0ZW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICBwcmludE1zZyhtc2cpO1xuICAgICAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sIGZuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXByZWNhdGVTaW1wbGUobmFtZSwgbXNnKSB7XG4gICAgICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XG4gICAgICAgICAgICBwcmludE1zZyhtc2cpO1xuICAgICAgICAgICAgZGVwcmVjYXRpb25zW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhZFRva2VuKGZ1bmMsIGNvdW50KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgcmV0dXJuIGxlZnRaZXJvRmlsbChmdW5jLmNhbGwodGhpcywgYSksIGNvdW50KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb3JkaW5hbGl6ZVRva2VuKGZ1bmMsIHBlcmlvZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5vcmRpbmFsKGZ1bmMuY2FsbCh0aGlzLCBhKSwgcGVyaW9kKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb250aERpZmYoYSwgYikge1xuICAgICAgICAvLyBkaWZmZXJlbmNlIGluIG1vbnRoc1xuICAgICAgICB2YXIgd2hvbGVNb250aERpZmYgPSAoKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIpICsgKGIubW9udGgoKSAtIGEubW9udGgoKSksXG4gICAgICAgICAgICAvLyBiIGlzIGluIChhbmNob3IgLSAxIG1vbnRoLCBhbmNob3IgKyAxIG1vbnRoKVxuICAgICAgICAgICAgYW5jaG9yID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiwgJ21vbnRocycpLFxuICAgICAgICAgICAgYW5jaG9yMiwgYWRqdXN0O1xuXG4gICAgICAgIGlmIChiIC0gYW5jaG9yIDwgMCkge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvciAtIGFuY2hvcjIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgKyAxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICAvLyBsaW5lYXIgYWNyb3NzIHRoZSBtb250aFxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0od2hvbGVNb250aERpZmYgKyBhZGp1c3QpO1xuICAgIH1cblxuICAgIHdoaWxlIChvcmRpbmFsaXplVG9rZW5zLmxlbmd0aCkge1xuICAgICAgICBpID0gb3JkaW5hbGl6ZVRva2Vucy5wb3AoKTtcbiAgICAgICAgZm9ybWF0VG9rZW5GdW5jdGlvbnNbaSArICdvJ10gPSBvcmRpbmFsaXplVG9rZW4oZm9ybWF0VG9rZW5GdW5jdGlvbnNbaV0sIGkpO1xuICAgIH1cbiAgICB3aGlsZSAocGFkZGVkVG9rZW5zLmxlbmd0aCkge1xuICAgICAgICBpID0gcGFkZGVkVG9rZW5zLnBvcCgpO1xuICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1tpICsgaV0gPSBwYWRUb2tlbihmb3JtYXRUb2tlbkZ1bmN0aW9uc1tpXSwgMik7XG4gICAgfVxuICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zLkREREQgPSBwYWRUb2tlbihmb3JtYXRUb2tlbkZ1bmN0aW9ucy5EREQsIDMpO1xuXG5cbiAgICBmdW5jdGlvbiBtZXJpZGllbUZpeFdyYXAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xuICAgICAgICB2YXIgaXNQbTtcblxuICAgICAgICBpZiAobWVyaWRpZW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm90aGluZyB0byBkb1xuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsZS5tZXJpZGllbUhvdXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZS5tZXJpZGllbUhvdXIoaG91ciwgbWVyaWRpZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZS5pc1BNICE9IG51bGwpIHtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrXG4gICAgICAgICAgICBpc1BtID0gbG9jYWxlLmlzUE0obWVyaWRpZW0pO1xuICAgICAgICAgICAgaWYgKGlzUG0gJiYgaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNQbSAmJiBob3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGllIGlzIG5vdCBzdXBwb3NlZCB0byBoYXBwZW5cbiAgICAgICAgICAgIHJldHVybiBob3VyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBDb25zdHJ1Y3RvcnNcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBmdW5jdGlvbiBMb2NhbGUoKSB7XG4gICAgfVxuXG4gICAgLy8gTW9tZW50IHByb3RvdHlwZSBvYmplY3RcbiAgICBmdW5jdGlvbiBNb21lbnQoY29uZmlnLCBza2lwT3ZlcmZsb3cpIHtcbiAgICAgICAgaWYgKHNraXBPdmVyZmxvdyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICBjb3B5Q29uZmlnKHRoaXMsIGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZSgrY29uZmlnLl9kKTtcbiAgICAgICAgLy8gUHJldmVudCBpbmZpbml0ZSBsb29wIGluIGNhc2UgdXBkYXRlT2Zmc2V0IGNyZWF0ZXMgbmV3IG1vbWVudFxuICAgICAgICAvLyBvYmplY3RzLlxuICAgICAgICBpZiAodXBkYXRlSW5Qcm9ncmVzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgbW9tZW50LnVwZGF0ZU9mZnNldCh0aGlzKTtcbiAgICAgICAgICAgIHVwZGF0ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIER1cmF0aW9uIENvbnN0cnVjdG9yXG4gICAgZnVuY3Rpb24gRHVyYXRpb24oZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWRJbnB1dCA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGR1cmF0aW9uKSxcbiAgICAgICAgICAgIHllYXJzID0gbm9ybWFsaXplZElucHV0LnllYXIgfHwgMCxcbiAgICAgICAgICAgIHF1YXJ0ZXJzID0gbm9ybWFsaXplZElucHV0LnF1YXJ0ZXIgfHwgMCxcbiAgICAgICAgICAgIG1vbnRocyA9IG5vcm1hbGl6ZWRJbnB1dC5tb250aCB8fCAwLFxuICAgICAgICAgICAgd2Vla3MgPSBub3JtYWxpemVkSW5wdXQud2VlayB8fCAwLFxuICAgICAgICAgICAgZGF5cyA9IG5vcm1hbGl6ZWRJbnB1dC5kYXkgfHwgMCxcbiAgICAgICAgICAgIGhvdXJzID0gbm9ybWFsaXplZElucHV0LmhvdXIgfHwgMCxcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBub3JtYWxpemVkSW5wdXQubWludXRlIHx8IDAsXG4gICAgICAgICAgICBzZWNvbmRzID0gbm9ybWFsaXplZElucHV0LnNlY29uZCB8fCAwLFxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gbm9ybWFsaXplZElucHV0Lm1pbGxpc2Vjb25kIHx8IDA7XG5cbiAgICAgICAgLy8gcmVwcmVzZW50YXRpb24gZm9yIGRhdGVBZGRSZW1vdmVcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gK21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICBzZWNvbmRzICogMWUzICsgLy8gMTAwMFxuICAgICAgICAgICAgbWludXRlcyAqIDZlNCArIC8vIDEwMDAgKiA2MFxuICAgICAgICAgICAgaG91cnMgKiAzNmU1OyAvLyAxMDAwICogNjAgKiA2MFxuICAgICAgICAvLyBCZWNhdXNlIG9mIGRhdGVBZGRSZW1vdmUgdHJlYXRzIDI0IGhvdXJzIGFzIGRpZmZlcmVudCBmcm9tIGFcbiAgICAgICAgLy8gZGF5IHdoZW4gd29ya2luZyBhcm91bmQgRFNULCB3ZSBuZWVkIHRvIHN0b3JlIHRoZW0gc2VwYXJhdGVseVxuICAgICAgICB0aGlzLl9kYXlzID0gK2RheXMgK1xuICAgICAgICAgICAgd2Vla3MgKiA3O1xuICAgICAgICAvLyBJdCBpcyBpbXBvc3NpYmxlIHRyYW5zbGF0ZSBtb250aHMgaW50byBkYXlzIHdpdGhvdXQga25vd2luZ1xuICAgICAgICAvLyB3aGljaCBtb250aHMgeW91IGFyZSBhcmUgdGFsa2luZyBhYm91dCwgc28gd2UgaGF2ZSB0byBzdG9yZVxuICAgICAgICAvLyBpdCBzZXBhcmF0ZWx5LlxuICAgICAgICB0aGlzLl9tb250aHMgPSArbW9udGhzICtcbiAgICAgICAgICAgIHF1YXJ0ZXJzICogMyArXG4gICAgICAgICAgICB5ZWFycyAqIDEyO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcblxuICAgICAgICB0aGlzLl9sb2NhbGUgPSBtb21lbnQubG9jYWxlRGF0YSgpO1xuXG4gICAgICAgIHRoaXMuX2J1YmJsZSgpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgSGVscGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChiLCBpKSkge1xuICAgICAgICAgICAgICAgIGFbaV0gPSBiW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3RvU3RyaW5nJykpIHtcbiAgICAgICAgICAgIGEudG9TdHJpbmcgPSBiLnRvU3RyaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc093blByb3AoYiwgJ3ZhbHVlT2YnKSkge1xuICAgICAgICAgICAgYS52YWx1ZU9mID0gYi52YWx1ZU9mO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29weUNvbmZpZyh0bywgZnJvbSkge1xuICAgICAgICB2YXIgaSwgcHJvcCwgdmFsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5faXNBTW9tZW50T2JqZWN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX2lzQU1vbWVudE9iamVjdCA9IGZyb20uX2lzQU1vbWVudE9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX2kgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5faSA9IGZyb20uX2k7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl9mICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX2YgPSBmcm9tLl9mO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5fbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9sID0gZnJvbS5fbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX3N0cmljdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9zdHJpY3QgPSBmcm9tLl9zdHJpY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl90em0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5fdHptID0gZnJvbS5fdHptO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5faXNVVEMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0by5faXNVVEMgPSBmcm9tLl9pc1VUQztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyb20uX29mZnNldCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9vZmZzZXQgPSBmcm9tLl9vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcm9tLl9wZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRvLl9wZiA9IGZyb20uX3BmO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZnJvbS5fbG9jYWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdG8uX2xvY2FsZSA9IGZyb20uX2xvY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb21lbnRQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBtb21lbnRQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IG1vbWVudFByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgdmFsID0gZnJvbVtwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFic1JvdW5kKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGxlZnQgemVybyBmaWxsIGEgbnVtYmVyXG4gICAgLy8gc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2xlZnQtemVyby1maWxsaW5nIGZvciBwZXJmb3JtYW5jZSBjb21wYXJpc29uXG4gICAgZnVuY3Rpb24gbGVmdFplcm9GaWxsKG51bWJlciwgdGFyZ2V0TGVuZ3RoLCBmb3JjZVNpZ24pIHtcbiAgICAgICAgdmFyIG91dHB1dCA9ICcnICsgTWF0aC5hYnMobnVtYmVyKSxcbiAgICAgICAgICAgIHNpZ24gPSBudW1iZXIgPj0gMDtcblxuICAgICAgICB3aGlsZSAob3V0cHV0Lmxlbmd0aCA8IHRhcmdldExlbmd0aCkge1xuICAgICAgICAgICAgb3V0cHV0ID0gJzAnICsgb3V0cHV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoc2lnbiA/IChmb3JjZVNpZ24gPyAnKycgOiAnJykgOiAnLScpICsgb3V0cHV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcyA9IHttaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMH07XG5cbiAgICAgICAgcmVzLm1vbnRocyA9IG90aGVyLm1vbnRoKCkgLSBiYXNlLm1vbnRoKCkgK1xuICAgICAgICAgICAgKG90aGVyLnllYXIoKSAtIGJhc2UueWVhcigpKSAqIDEyO1xuICAgICAgICBpZiAoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpLmlzQWZ0ZXIob3RoZXIpKSB7XG4gICAgICAgICAgICAtLXJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gK290aGVyIC0gKyhiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykpO1xuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgb3RoZXIgPSBtYWtlQXMob3RoZXIsIGJhc2UpO1xuICAgICAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcbiAgICAgICAgICAgIHJlcyA9IHBvc2l0aXZlTW9tZW50c0RpZmZlcmVuY2UoYmFzZSwgb3RoZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XG4gICAgICAgICAgICByZXMubWlsbGlzZWNvbmRzID0gLXJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICByZXMubW9udGhzID0gLXJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHJlbW92ZSAnbmFtZScgYXJnIGFmdGVyIGRlcHJlY2F0aW9uIGlzIHJlbW92ZWRcbiAgICBmdW5jdGlvbiBjcmVhdGVBZGRlcihkaXJlY3Rpb24sIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIHBlcmlvZCkge1xuICAgICAgICAgICAgdmFyIGR1ciwgdG1wO1xuICAgICAgICAgICAgLy9pbnZlcnQgdGhlIGFyZ3VtZW50cywgYnV0IGNvbXBsYWluIGFib3V0IGl0XG4gICAgICAgICAgICBpZiAocGVyaW9kICE9PSBudWxsICYmICFpc05hTigrcGVyaW9kKSkge1xuICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCAnbW9tZW50KCkuJyArIG5hbWUgICsgJyhwZXJpb2QsIG51bWJlcikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBtb21lbnQoKS4nICsgbmFtZSArICcobnVtYmVyLCBwZXJpb2QpLicpO1xuICAgICAgICAgICAgICAgIHRtcCA9IHZhbDsgdmFsID0gcGVyaW9kOyBwZXJpb2QgPSB0bXA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbCA9IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gK3ZhbCA6IHZhbDtcbiAgICAgICAgICAgIGR1ciA9IG1vbWVudC5kdXJhdGlvbih2YWwsIHBlcmlvZCk7XG4gICAgICAgICAgICBhZGRPclN1YnRyYWN0RHVyYXRpb25Gcm9tTW9tZW50KHRoaXMsIGR1ciwgZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE9yU3VidHJhY3REdXJhdGlvbkZyb21Nb21lbnQobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xuICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gZHVyYXRpb24uX21pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIGRheXMgPSBkdXJhdGlvbi5fZGF5cyxcbiAgICAgICAgICAgIG1vbnRocyA9IGR1cmF0aW9uLl9tb250aHM7XG4gICAgICAgIHVwZGF0ZU9mZnNldCA9IHVwZGF0ZU9mZnNldCA9PSBudWxsID8gdHJ1ZSA6IHVwZGF0ZU9mZnNldDtcblxuICAgICAgICBpZiAobWlsbGlzZWNvbmRzKSB7XG4gICAgICAgICAgICBtb20uX2Quc2V0VGltZSgrbW9tLl9kICsgbWlsbGlzZWNvbmRzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXlzKSB7XG4gICAgICAgICAgICByYXdTZXR0ZXIobW9tLCAnRGF0ZScsIHJhd0dldHRlcihtb20sICdEYXRlJykgKyBkYXlzICogaXNBZGRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb250aHMpIHtcbiAgICAgICAgICAgIHJhd01vbnRoU2V0dGVyKG1vbSwgcmF3R2V0dGVyKG1vbSwgJ01vbnRoJykgKyBtb250aHMgKiBpc0FkZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVwZGF0ZU9mZnNldCkge1xuICAgICAgICAgICAgbW9tZW50LnVwZGF0ZU9mZnNldChtb20sIGRheXMgfHwgbW9udGhzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNoZWNrIGlmIGlzIGFuIGFycmF5XG4gICAgZnVuY3Rpb24gaXNBcnJheShpbnB1dCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0RhdGUoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IERhdGVdJyB8fFxuICAgICAgICAgICAgaW5wdXQgaW5zdGFuY2VvZiBEYXRlO1xuICAgIH1cblxuICAgIC8vIGNvbXBhcmUgdHdvIGFycmF5cywgcmV0dXJuIHRoZSBudW1iZXIgb2YgZGlmZmVyZW5jZXNcbiAgICBmdW5jdGlvbiBjb21wYXJlQXJyYXlzKGFycmF5MSwgYXJyYXkyLCBkb250Q29udmVydCkge1xuICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4oYXJyYXkxLmxlbmd0aCwgYXJyYXkyLmxlbmd0aCksXG4gICAgICAgICAgICBsZW5ndGhEaWZmID0gTWF0aC5hYnMoYXJyYXkxLmxlbmd0aCAtIGFycmF5Mi5sZW5ndGgpLFxuICAgICAgICAgICAgZGlmZnMgPSAwLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGRvbnRDb252ZXJ0ICYmIGFycmF5MVtpXSAhPT0gYXJyYXkyW2ldKSB8fFxuICAgICAgICAgICAgICAgICghZG9udENvbnZlcnQgJiYgdG9JbnQoYXJyYXkxW2ldKSAhPT0gdG9JbnQoYXJyYXkyW2ldKSkpIHtcbiAgICAgICAgICAgICAgICBkaWZmcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaWZmcyArIGxlbmd0aERpZmY7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplVW5pdHModW5pdHMpIHtcbiAgICAgICAgaWYgKHVuaXRzKSB7XG4gICAgICAgICAgICB2YXIgbG93ZXJlZCA9IHVuaXRzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvKC4pcyQvLCAnJDEnKTtcbiAgICAgICAgICAgIHVuaXRzID0gdW5pdEFsaWFzZXNbdW5pdHNdIHx8IGNhbWVsRnVuY3Rpb25zW2xvd2VyZWRdIHx8IGxvd2VyZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuaXRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFVuaXRzKGlucHV0T2JqZWN0KSB7XG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wLFxuICAgICAgICAgICAgcHJvcDtcblxuICAgICAgICBmb3IgKHByb3AgaW4gaW5wdXRPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wKGlucHV0T2JqZWN0LCBwcm9wKSkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRQcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dFtub3JtYWxpemVkUHJvcF0gPSBpbnB1dE9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZElucHV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VMaXN0KGZpZWxkKSB7XG4gICAgICAgIHZhciBjb3VudCwgc2V0dGVyO1xuXG4gICAgICAgIGlmIChmaWVsZC5pbmRleE9mKCd3ZWVrJykgPT09IDApIHtcbiAgICAgICAgICAgIGNvdW50ID0gNztcbiAgICAgICAgICAgIHNldHRlciA9ICdkYXknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpZWxkLmluZGV4T2YoJ21vbnRoJykgPT09IDApIHtcbiAgICAgICAgICAgIGNvdW50ID0gMTI7XG4gICAgICAgICAgICBzZXR0ZXIgPSAnbW9udGgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9tZW50W2ZpZWxkXSA9IGZ1bmN0aW9uIChmb3JtYXQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgaSwgZ2V0dGVyLFxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IG1vbWVudC5fbG9jYWxlW2ZpZWxkXSxcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybWF0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2V0dGVyID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IG1vbWVudCgpLnV0YygpLnNldChzZXR0ZXIsIGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXRob2QuY2FsbChtb21lbnQuX2xvY2FsZSwgbSwgZm9ybWF0IHx8ICcnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldHRlcihpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZ2V0dGVyKGkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9JbnQoYXJndW1lbnRGb3JDb2VyY2lvbikge1xuICAgICAgICB2YXIgY29lcmNlZE51bWJlciA9ICthcmd1bWVudEZvckNvZXJjaW9uLFxuICAgICAgICAgICAgdmFsdWUgPSAwO1xuXG4gICAgICAgIGlmIChjb2VyY2VkTnVtYmVyICE9PSAwICYmIGlzRmluaXRlKGNvZXJjZWROdW1iZXIpKSB7XG4gICAgICAgICAgICBpZiAoY29lcmNlZE51bWJlciA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBNYXRoLmZsb29yKGNvZXJjZWROdW1iZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IE1hdGguY2VpbChjb2VyY2VkTnVtYmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgbW9udGggKyAxLCAwKSkuZ2V0VVRDRGF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdlZWtzSW5ZZWFyKHllYXIsIGRvdywgZG95KSB7XG4gICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKG1vbWVudChbeWVhciwgMTEsIDMxICsgZG93IC0gZG95XSksIGRvdywgZG95KS53ZWVrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRheXNJblllYXIoeWVhcikge1xuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0xlYXBZZWFyKHllYXIpIHtcbiAgICAgICAgcmV0dXJuICh5ZWFyICUgNCA9PT0gMCAmJiB5ZWFyICUgMTAwICE9PSAwKSB8fCB5ZWFyICUgNDAwID09PSAwO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3cobSkge1xuICAgICAgICB2YXIgb3ZlcmZsb3c7XG4gICAgICAgIGlmIChtLl9hICYmIG0uX3BmLm92ZXJmbG93ID09PSAtMikge1xuICAgICAgICAgICAgb3ZlcmZsb3cgPVxuICAgICAgICAgICAgICAgIG0uX2FbTU9OVEhdIDwgMCB8fCBtLl9hW01PTlRIXSA+IDExID8gTU9OVEggOlxuICAgICAgICAgICAgICAgIG0uX2FbREFURV0gPCAxIHx8IG0uX2FbREFURV0gPiBkYXlzSW5Nb250aChtLl9hW1lFQVJdLCBtLl9hW01PTlRIXSkgPyBEQVRFIDpcbiAgICAgICAgICAgICAgICBtLl9hW0hPVVJdIDwgMCB8fCBtLl9hW0hPVVJdID4gMjQgfHxcbiAgICAgICAgICAgICAgICAgICAgKG0uX2FbSE9VUl0gPT09IDI0ICYmIChtLl9hW01JTlVURV0gIT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtLl9hW1NFQ09ORF0gIT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtLl9hW01JTExJU0VDT05EXSAhPT0gMCkpID8gSE9VUiA6XG4gICAgICAgICAgICAgICAgbS5fYVtNSU5VVEVdIDwgMCB8fCBtLl9hW01JTlVURV0gPiA1OSA/IE1JTlVURSA6XG4gICAgICAgICAgICAgICAgbS5fYVtTRUNPTkRdIDwgMCB8fCBtLl9hW1NFQ09ORF0gPiA1OSA/IFNFQ09ORCA6XG4gICAgICAgICAgICAgICAgbS5fYVtNSUxMSVNFQ09ORF0gPCAwIHx8IG0uX2FbTUlMTElTRUNPTkRdID4gOTk5ID8gTUlMTElTRUNPTkQgOlxuICAgICAgICAgICAgICAgIC0xO1xuXG4gICAgICAgICAgICBpZiAobS5fcGYuX292ZXJmbG93RGF5T2ZZZWFyICYmIChvdmVyZmxvdyA8IFlFQVIgfHwgb3ZlcmZsb3cgPiBEQVRFKSkge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gREFURTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbS5fcGYub3ZlcmZsb3cgPSBvdmVyZmxvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVmFsaWQobSkge1xuICAgICAgICBpZiAobS5faXNWYWxpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICBtLl9pc1ZhbGlkID0gIWlzTmFOKG0uX2QuZ2V0VGltZSgpKSAmJlxuICAgICAgICAgICAgICAgIG0uX3BmLm92ZXJmbG93IDwgMCAmJlxuICAgICAgICAgICAgICAgICFtLl9wZi5lbXB0eSAmJlxuICAgICAgICAgICAgICAgICFtLl9wZi5pbnZhbGlkTW9udGggJiZcbiAgICAgICAgICAgICAgICAhbS5fcGYubnVsbElucHV0ICYmXG4gICAgICAgICAgICAgICAgIW0uX3BmLmludmFsaWRGb3JtYXQgJiZcbiAgICAgICAgICAgICAgICAhbS5fcGYudXNlckludmFsaWRhdGVkO1xuXG4gICAgICAgICAgICBpZiAobS5fc3RyaWN0KSB7XG4gICAgICAgICAgICAgICAgbS5faXNWYWxpZCA9IG0uX2lzVmFsaWQgJiZcbiAgICAgICAgICAgICAgICAgICAgbS5fcGYuY2hhcnNMZWZ0T3ZlciA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBtLl9wZi51bnVzZWRUb2tlbnMubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgIG0uX3BmLmJpZ0hvdXIgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS5faXNWYWxpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub3JtYWxpemVMb2NhbGUoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPyBrZXkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCdfJywgJy0nKSA6IGtleTtcbiAgICB9XG5cbiAgICAvLyBwaWNrIHRoZSBsb2NhbGUgZnJvbSB0aGUgYXJyYXlcbiAgICAvLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxuICAgIC8vIHN1YnN0cmluZyBmcm9tIG1vc3Qgc3BlY2lmaWMgdG8gbGVhc3QsIGJ1dCBtb3ZlIHRvIHRoZSBuZXh0IGFycmF5IGl0ZW0gaWYgaXQncyBhIG1vcmUgc3BlY2lmaWMgdmFyaWFudCB0aGFuIHRoZSBjdXJyZW50IHJvb3RcbiAgICBmdW5jdGlvbiBjaG9vc2VMb2NhbGUobmFtZXMpIHtcbiAgICAgICAgdmFyIGkgPSAwLCBqLCBuZXh0LCBsb2NhbGUsIHNwbGl0O1xuXG4gICAgICAgIHdoaWxlIChpIDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzcGxpdCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpXSkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIGogPSBzcGxpdC5sZW5ndGg7XG4gICAgICAgICAgICBuZXh0ID0gbm9ybWFsaXplTG9jYWxlKG5hbWVzW2kgKyAxXSk7XG4gICAgICAgICAgICBuZXh0ID0gbmV4dCA/IG5leHQuc3BsaXQoJy0nKSA6IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAoaiA+IDApIHtcbiAgICAgICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKHNwbGl0LnNsaWNlKDAsIGopLmpvaW4oJy0nKSk7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0Lmxlbmd0aCA+PSBqICYmIGNvbXBhcmVBcnJheXMoc3BsaXQsIG5leHQsIHRydWUpID49IGogLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhlIG5leHQgYXJyYXkgaXRlbSBpcyBiZXR0ZXIgdGhhbiBhIHNoYWxsb3dlciBzdWJzdHJpbmcgb2YgdGhpcyBvbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGotLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcbiAgICAgICAgdmFyIG9sZExvY2FsZSA9IG51bGw7XG4gICAgICAgIGlmICghbG9jYWxlc1tuYW1lXSAmJiBoYXNNb2R1bGUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2xkTG9jYWxlID0gbW9tZW50LmxvY2FsZSgpO1xuICAgICAgICAgICAgICAgIHJlcXVpcmUoJy4vbG9jYWxlLycgKyBuYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIGRlZmluZUxvY2FsZSBjdXJyZW50bHkgYWxzbyBzZXRzIHRoZSBnbG9iYWwgbG9jYWxlLCB3ZSB3YW50IHRvIHVuZG8gdGhhdCBmb3IgbGF6eSBsb2FkZWQgbG9jYWxlc1xuICAgICAgICAgICAgICAgIG1vbWVudC5sb2NhbGUob2xkTG9jYWxlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhIG1vbWVudCBmcm9tIGlucHV0LCB0aGF0IGlzIGxvY2FsL3V0Yy91dGNPZmZzZXQgZXF1aXZhbGVudCB0b1xuICAgIC8vIG1vZGVsLlxuICAgIGZ1bmN0aW9uIG1ha2VBcyhpbnB1dCwgbW9kZWwpIHtcbiAgICAgICAgdmFyIHJlcywgZGlmZjtcbiAgICAgICAgaWYgKG1vZGVsLl9pc1VUQykge1xuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcbiAgICAgICAgICAgIGRpZmYgPSAobW9tZW50LmlzTW9tZW50KGlucHV0KSB8fCBpc0RhdGUoaW5wdXQpID9cbiAgICAgICAgICAgICAgICAgICAgK2lucHV0IDogK21vbWVudChpbnB1dCkpIC0gKCtyZXMpO1xuICAgICAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxuICAgICAgICAgICAgcmVzLl9kLnNldFRpbWUoK3Jlcy5fZCArIGRpZmYpO1xuICAgICAgICAgICAgbW9tZW50LnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KGlucHV0KS5sb2NhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBMb2NhbGVcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuICAgIGV4dGVuZChMb2NhbGUucHJvdG90eXBlLCB7XG5cbiAgICAgICAgc2V0IDogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgdmFyIHByb3AsIGk7XG4gICAgICAgICAgICBmb3IgKGkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgcHJvcCA9IGNvbmZpZ1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tpXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1snXycgKyBpXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXG4gICAgICAgICAgICAvLyBudW1iZXIgKyAocG9zc2libHkpIHN0dWZmIGNvbWluZyBmcm9tIF9vcmRpbmFsUGFyc2VMZW5pZW50LlxuICAgICAgICAgICAgdGhpcy5fb3JkaW5hbFBhcnNlTGVuaWVudCA9IG5ldyBSZWdFeHAodGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSArICd8JyArIC9cXGR7MSwyfS8uc291cmNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfbW9udGhzIDogJ0phbnVhcnlfRmVicnVhcnlfTWFyY2hfQXByaWxfTWF5X0p1bmVfSnVseV9BdWd1c3RfU2VwdGVtYmVyX09jdG9iZXJfTm92ZW1iZXJfRGVjZW1iZXInLnNwbGl0KCdfJyksXG4gICAgICAgIG1vbnRocyA6IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzW20ubW9udGgoKV07XG4gICAgICAgIH0sXG5cbiAgICAgICAgX21vbnRoc1Nob3J0IDogJ0phbl9GZWJfTWFyX0Fwcl9NYXlfSnVuX0p1bF9BdWdfU2VwX09jdF9Ob3ZfRGVjJy5zcGxpdCgnXycpLFxuICAgICAgICBtb250aHNTaG9ydCA6IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRbbS5tb250aCgpXTtcbiAgICAgICAgfSxcblxuICAgICAgICBtb250aHNQYXJzZSA6IGZ1bmN0aW9uIChtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XG4gICAgICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZ2V4IGlmIHdlIGRvbid0IGhhdmUgaXQgYWxyZWFkeVxuICAgICAgICAgICAgICAgIG1vbSA9IG1vbWVudC51dGMoWzIwMDAsIGldKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRocyhtb20sICcnKS5yZXBsYWNlKCcuJywgJycpICsgJyQnLCAnaScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnJlcGxhY2UoJy4nLCAnJykgKyAnJCcsICdpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc3RyaWN0ICYmICF0aGlzLl9tb250aHNQYXJzZVtpXSkge1xuICAgICAgICAgICAgICAgICAgICByZWdleCA9ICdeJyArIHRoaXMubW9udGhzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxuICAgICAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NTScgJiYgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdNTU0nICYmIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCAmJiB0aGlzLl9tb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF93ZWVrZGF5cyA6ICdTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheScuc3BsaXQoJ18nKSxcbiAgICAgICAgd2Vla2RheXMgOiBmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzW20uZGF5KCldO1xuICAgICAgICB9LFxuXG4gICAgICAgIF93ZWVrZGF5c1Nob3J0IDogJ1N1bl9Nb25fVHVlX1dlZF9UaHVfRnJpX1NhdCcuc3BsaXQoJ18nKSxcbiAgICAgICAgd2Vla2RheXNTaG9ydCA6IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFttLmRheSgpXTtcbiAgICAgICAgfSxcblxuICAgICAgICBfd2Vla2RheXNNaW4gOiAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyksXG4gICAgICAgIHdlZWtkYXlzTWluIDogZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXTtcbiAgICAgICAgfSxcblxuICAgICAgICB3ZWVrZGF5c1BhcnNlIDogZnVuY3Rpb24gKHdlZWtkYXlOYW1lKSB7XG4gICAgICAgICAgICB2YXIgaSwgbW9tLCByZWdleDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNQYXJzZSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbSA9IG1vbWVudChbMjAwMCwgMV0pLmRheShpKTtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSAnXicgKyB0aGlzLndlZWtkYXlzKG1vbSwgJycpICsgJ3xeJyArIHRoaXMud2Vla2RheXNTaG9ydChtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0ZXN0IHRoZSByZWdleFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfbG9uZ0RhdGVGb3JtYXQgOiB7XG4gICAgICAgICAgICBMVFMgOiAnaDptbTpzcyBBJyxcbiAgICAgICAgICAgIExUIDogJ2g6bW0gQScsXG4gICAgICAgICAgICBMIDogJ01NL0REL1lZWVknLFxuICAgICAgICAgICAgTEwgOiAnTU1NTSBELCBZWVlZJyxcbiAgICAgICAgICAgIExMTCA6ICdNTU1NIEQsIFlZWVkgTFQnLFxuICAgICAgICAgICAgTExMTCA6ICdkZGRkLCBNTU1NIEQsIFlZWVkgTFQnXG4gICAgICAgIH0sXG4gICAgICAgIGxvbmdEYXRlRm9ybWF0IDogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XG4gICAgICAgICAgICBpZiAoIW91dHB1dCAmJiB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV0pIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV0ucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gb3V0cHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1BNIDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICAvLyBJRTggUXVpcmtzIE1vZGUgJiBJRTcgU3RhbmRhcmRzIE1vZGUgZG8gbm90IGFsbG93IGFjY2Vzc2luZyBzdHJpbmdzIGxpa2UgYXJyYXlzXG4gICAgICAgICAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cbiAgICAgICAgICAgIHJldHVybiAoKGlucHV0ICsgJycpLnRvTG93ZXJDYXNlKCkuY2hhckF0KDApID09PSAncCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9tZXJpZGllbVBhcnNlIDogL1thcF1cXC4/bT9cXC4/L2ksXG4gICAgICAgIG1lcmlkaWVtIDogZnVuY3Rpb24gKGhvdXJzLCBtaW51dGVzLCBpc0xvd2VyKSB7XG4gICAgICAgICAgICBpZiAoaG91cnMgPiAxMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ3BtJyA6ICdQTSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ2FtJyA6ICdBTSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cblxuICAgICAgICBfY2FsZW5kYXIgOiB7XG4gICAgICAgICAgICBzYW1lRGF5IDogJ1tUb2RheSBhdF0gTFQnLFxuICAgICAgICAgICAgbmV4dERheSA6ICdbVG9tb3Jyb3cgYXRdIExUJyxcbiAgICAgICAgICAgIG5leHRXZWVrIDogJ2RkZGQgW2F0XSBMVCcsXG4gICAgICAgICAgICBsYXN0RGF5IDogJ1tZZXN0ZXJkYXkgYXRdIExUJyxcbiAgICAgICAgICAgIGxhc3RXZWVrIDogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxuICAgICAgICAgICAgc2FtZUVsc2UgOiAnTCdcbiAgICAgICAgfSxcbiAgICAgICAgY2FsZW5kYXIgOiBmdW5jdGlvbiAoa2V5LCBtb20sIG5vdykge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV07XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIG91dHB1dCA9PT0gJ2Z1bmN0aW9uJyA/IG91dHB1dC5hcHBseShtb20sIFtub3ddKSA6IG91dHB1dDtcbiAgICAgICAgfSxcblxuICAgICAgICBfcmVsYXRpdmVUaW1lIDoge1xuICAgICAgICAgICAgZnV0dXJlIDogJ2luICVzJyxcbiAgICAgICAgICAgIHBhc3QgOiAnJXMgYWdvJyxcbiAgICAgICAgICAgIHMgOiAnYSBmZXcgc2Vjb25kcycsXG4gICAgICAgICAgICBtIDogJ2EgbWludXRlJyxcbiAgICAgICAgICAgIG1tIDogJyVkIG1pbnV0ZXMnLFxuICAgICAgICAgICAgaCA6ICdhbiBob3VyJyxcbiAgICAgICAgICAgIGhoIDogJyVkIGhvdXJzJyxcbiAgICAgICAgICAgIGQgOiAnYSBkYXknLFxuICAgICAgICAgICAgZGQgOiAnJWQgZGF5cycsXG4gICAgICAgICAgICBNIDogJ2EgbW9udGgnLFxuICAgICAgICAgICAgTU0gOiAnJWQgbW9udGhzJyxcbiAgICAgICAgICAgIHkgOiAnYSB5ZWFyJyxcbiAgICAgICAgICAgIHl5IDogJyVkIHllYXJzJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbGF0aXZlVGltZSA6IGZ1bmN0aW9uIChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbc3RyaW5nXTtcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIG91dHB1dCA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgIG91dHB1dChudW1iZXIsIHdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpIDpcbiAgICAgICAgICAgICAgICBvdXRwdXQucmVwbGFjZSgvJWQvaSwgbnVtYmVyKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwYXN0RnV0dXJlIDogZnVuY3Rpb24gKGRpZmYsIG91dHB1dCkge1xuICAgICAgICAgICAgdmFyIGZvcm1hdCA9IHRoaXMuX3JlbGF0aXZlVGltZVtkaWZmID4gMCA/ICdmdXR1cmUnIDogJ3Bhc3QnXTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZm9ybWF0ID09PSAnZnVuY3Rpb24nID8gZm9ybWF0KG91dHB1dCkgOiBmb3JtYXQucmVwbGFjZSgvJXMvaSwgb3V0cHV0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBvcmRpbmFsIDogZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xuICAgICAgICB9LFxuICAgICAgICBfb3JkaW5hbCA6ICclZCcsXG4gICAgICAgIF9vcmRpbmFsUGFyc2UgOiAvXFxkezEsMn0vLFxuXG4gICAgICAgIHByZXBhcnNlIDogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgICAgfSxcblxuICAgICAgICBwb3N0Zm9ybWF0IDogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgICAgfSxcblxuICAgICAgICB3ZWVrIDogZnVuY3Rpb24gKG1vbSkge1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtPZlllYXIobW9tLCB0aGlzLl93ZWVrLmRvdywgdGhpcy5fd2Vlay5kb3kpLndlZWs7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3dlZWsgOiB7XG4gICAgICAgICAgICBkb3cgOiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICAgICAgICAgIGRveSA6IDYgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDFzdCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cbiAgICAgICAgfSxcblxuICAgICAgICBmaXJzdERheU9mV2VlayA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRvdztcbiAgICAgICAgfSxcblxuICAgICAgICBmaXJzdERheU9mWWVhciA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcbiAgICAgICAgfSxcblxuICAgICAgICBfaW52YWxpZERhdGU6ICdJbnZhbGlkIGRhdGUnLFxuICAgICAgICBpbnZhbGlkRGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ludmFsaWREYXRlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIEZvcm1hdHRpbmdcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlxcW3xcXF0kL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXFxcXC9nLCAnJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZUZvcm1hdEZ1bmN0aW9uKGZvcm1hdCkge1xuICAgICAgICB2YXIgYXJyYXkgPSBmb3JtYXQubWF0Y2goZm9ybWF0dGluZ1Rva2VucyksIGksIGxlbmd0aDtcblxuICAgICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZvcm1hdFRva2VuRnVuY3Rpb25zW2FycmF5W2ldXSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoYXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtb20pIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSAnJztcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSBhcnJheVtpXSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gYXJyYXlbaV0uY2FsbChtb20sIGZvcm1hdCkgOiBhcnJheVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gZm9ybWF0IGRhdGUgdXNpbmcgbmF0aXZlIGRhdGUgb2JqZWN0XG4gICAgZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xuICAgICAgICBpZiAoIW0uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbS5sb2NhbGVEYXRhKCkuaW52YWxpZERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm1hdCA9IGV4cGFuZEZvcm1hdChmb3JtYXQsIG0ubG9jYWxlRGF0YSgpKTtcblxuICAgICAgICBpZiAoIWZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKSB7XG4gICAgICAgICAgICBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSA9IG1ha2VGb3JtYXRGdW5jdGlvbihmb3JtYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKG0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdChmb3JtYXQsIGxvY2FsZSkge1xuICAgICAgICB2YXIgaSA9IDU7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlLmxvbmdEYXRlRm9ybWF0KGlucHV0KSB8fCBpbnB1dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaSA+PSAwICYmIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy50ZXN0KGZvcm1hdCkpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKGxvY2FsRm9ybWF0dGluZ1Rva2VucywgcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKTtcbiAgICAgICAgICAgIGxvY2FsRm9ybWF0dGluZ1Rva2Vucy5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgaSAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgUGFyc2luZ1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4gICAgLy8gZ2V0IHRoZSByZWdleCB0byBmaW5kIHRoZSBuZXh0IHRva2VuXG4gICAgZnVuY3Rpb24gZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpIHtcbiAgICAgICAgdmFyIGEsIHN0cmljdCA9IGNvbmZpZy5fc3RyaWN0O1xuICAgICAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5PbmVEaWdpdDtcbiAgICAgICAgY2FzZSAnRERERCc6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlblRocmVlRGlnaXRzO1xuICAgICAgICBjYXNlICdZWVlZJzpcbiAgICAgICAgY2FzZSAnR0dHRyc6XG4gICAgICAgIGNhc2UgJ2dnZ2cnOlxuICAgICAgICAgICAgcmV0dXJuIHN0cmljdCA/IHBhcnNlVG9rZW5Gb3VyRGlnaXRzIDogcGFyc2VUb2tlbk9uZVRvRm91ckRpZ2l0cztcbiAgICAgICAgY2FzZSAnWSc6XG4gICAgICAgIGNhc2UgJ0cnOlxuICAgICAgICBjYXNlICdnJzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVRva2VuU2lnbmVkTnVtYmVyO1xuICAgICAgICBjYXNlICdZWVlZWVknOlxuICAgICAgICBjYXNlICdZWVlZWSc6XG4gICAgICAgIGNhc2UgJ0dHR0dHJzpcbiAgICAgICAgY2FzZSAnZ2dnZ2cnOlxuICAgICAgICAgICAgcmV0dXJuIHN0cmljdCA/IHBhcnNlVG9rZW5TaXhEaWdpdHMgOiBwYXJzZVRva2VuT25lVG9TaXhEaWdpdHM7XG4gICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgaWYgKHN0cmljdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZVRva2VuT25lRGlnaXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ1NTJzpcbiAgICAgICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlblR3b0RpZ2l0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgY2FzZSAnU1NTJzpcbiAgICAgICAgICAgIGlmIChzdHJpY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlblRocmVlRGlnaXRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdEREQnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5PbmVUb1RocmVlRGlnaXRzO1xuICAgICAgICBjYXNlICdNTU0nOlxuICAgICAgICBjYXNlICdNTU1NJzpcbiAgICAgICAgY2FzZSAnZGQnOlxuICAgICAgICBjYXNlICdkZGQnOlxuICAgICAgICBjYXNlICdkZGRkJzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVRva2VuV29yZDtcbiAgICAgICAgY2FzZSAnYSc6XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5fbG9jYWxlLl9tZXJpZGllbVBhcnNlO1xuICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVRva2VuT2Zmc2V0TXM7XG4gICAgICAgIGNhc2UgJ1gnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5UaW1lc3RhbXBNcztcbiAgICAgICAgY2FzZSAnWic6XG4gICAgICAgIGNhc2UgJ1paJzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVRva2VuVGltZXpvbmU7XG4gICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlVG9rZW5UO1xuICAgICAgICBjYXNlICdTU1NTJzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZVRva2VuRGlnaXRzO1xuICAgICAgICBjYXNlICdNTSc6XG4gICAgICAgIGNhc2UgJ0REJzpcbiAgICAgICAgY2FzZSAnWVknOlxuICAgICAgICBjYXNlICdHRyc6XG4gICAgICAgIGNhc2UgJ2dnJzpcbiAgICAgICAgY2FzZSAnSEgnOlxuICAgICAgICBjYXNlICdoaCc6XG4gICAgICAgIGNhc2UgJ21tJzpcbiAgICAgICAgY2FzZSAnc3MnOlxuICAgICAgICBjYXNlICd3dyc6XG4gICAgICAgIGNhc2UgJ1dXJzpcbiAgICAgICAgICAgIHJldHVybiBzdHJpY3QgPyBwYXJzZVRva2VuVHdvRGlnaXRzIDogcGFyc2VUb2tlbk9uZU9yVHdvRGlnaXRzO1xuICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgIGNhc2UgJ20nOlxuICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgY2FzZSAndyc6XG4gICAgICAgIGNhc2UgJ1cnOlxuICAgICAgICBjYXNlICdlJzpcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbk9uZU9yVHdvRGlnaXRzO1xuICAgICAgICBjYXNlICdEbyc6XG4gICAgICAgICAgICByZXR1cm4gc3RyaWN0ID8gY29uZmlnLl9sb2NhbGUuX29yZGluYWxQYXJzZSA6IGNvbmZpZy5fbG9jYWxlLl9vcmRpbmFsUGFyc2VMZW5pZW50O1xuICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgIGEgPSBuZXcgUmVnRXhwKHJlZ2V4cEVzY2FwZSh1bmVzY2FwZUZvcm1hdCh0b2tlbi5yZXBsYWNlKCdcXFxcJywgJycpKSwgJ2knKSk7XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHV0Y09mZnNldEZyb21TdHJpbmcoc3RyaW5nKSB7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZyB8fCAnJztcbiAgICAgICAgdmFyIHBvc3NpYmxlVHpNYXRjaGVzID0gKHN0cmluZy5tYXRjaChwYXJzZVRva2VuVGltZXpvbmUpIHx8IFtdKSxcbiAgICAgICAgICAgIHR6Q2h1bmsgPSBwb3NzaWJsZVR6TWF0Y2hlc1twb3NzaWJsZVR6TWF0Y2hlcy5sZW5ndGggLSAxXSB8fCBbXSxcbiAgICAgICAgICAgIHBhcnRzID0gKHR6Q2h1bmsgKyAnJykubWF0Y2gocGFyc2VUaW1lem9uZUNodW5rZXIpIHx8IFsnLScsIDAsIDBdLFxuICAgICAgICAgICAgbWludXRlcyA9ICsocGFydHNbMV0gKiA2MCkgKyB0b0ludChwYXJ0c1syXSk7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdID09PSAnKycgPyBtaW51dGVzIDogLW1pbnV0ZXM7XG4gICAgfVxuXG4gICAgLy8gZnVuY3Rpb24gdG8gY29udmVydCBzdHJpbmcgaW5wdXQgdG8gZGF0ZVxuICAgIGZ1bmN0aW9uIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBpbnB1dCwgY29uZmlnKSB7XG4gICAgICAgIHZhciBhLCBkYXRlUGFydEFycmF5ID0gY29uZmlnLl9hO1xuXG4gICAgICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgICAgLy8gUVVBUlRFUlxuICAgICAgICBjYXNlICdRJzpcbiAgICAgICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGF0ZVBhcnRBcnJheVtNT05USF0gPSAodG9JbnQoaW5wdXQpIC0gMSkgKiAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIE1PTlRIXG4gICAgICAgIGNhc2UgJ00nIDogLy8gZmFsbCB0aHJvdWdoIHRvIE1NXG4gICAgICAgIGNhc2UgJ01NJyA6XG4gICAgICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRhdGVQYXJ0QXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdNTU0nIDogLy8gZmFsbCB0aHJvdWdoIHRvIE1NTU1cbiAgICAgICAgY2FzZSAnTU1NTScgOlxuICAgICAgICAgICAgYSA9IGNvbmZpZy5fbG9jYWxlLm1vbnRoc1BhcnNlKGlucHV0LCB0b2tlbiwgY29uZmlnLl9zdHJpY3QpO1xuICAgICAgICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXG4gICAgICAgICAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZGF0ZVBhcnRBcnJheVtNT05USF0gPSBhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX3BmLmludmFsaWRNb250aCA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIERBWSBPRiBNT05USFxuICAgICAgICBjYXNlICdEJyA6IC8vIGZhbGwgdGhyb3VnaCB0byBERFxuICAgICAgICBjYXNlICdERCcgOlxuICAgICAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkYXRlUGFydEFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RvJyA6XG4gICAgICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRhdGVQYXJ0QXJyYXlbREFURV0gPSB0b0ludChwYXJzZUludChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5tYXRjaCgvXFxkezEsMn0vKVswXSwgMTApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBEQVkgT0YgWUVBUlxuICAgICAgICBjYXNlICdEREQnIDogLy8gZmFsbCB0aHJvdWdoIHRvIERERERcbiAgICAgICAgY2FzZSAnRERERCcgOlxuICAgICAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFlFQVJcbiAgICAgICAgY2FzZSAnWVknIDpcbiAgICAgICAgICAgIGRhdGVQYXJ0QXJyYXlbWUVBUl0gPSBtb21lbnQucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ1lZWVknIDpcbiAgICAgICAgY2FzZSAnWVlZWVknIDpcbiAgICAgICAgY2FzZSAnWVlZWVlZJyA6XG4gICAgICAgICAgICBkYXRlUGFydEFycmF5W1lFQVJdID0gdG9JbnQoaW5wdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIEFNIC8gUE1cbiAgICAgICAgY2FzZSAnYScgOiAvLyBmYWxsIHRocm91Z2ggdG8gQVxuICAgICAgICBjYXNlICdBJyA6XG4gICAgICAgICAgICBjb25maWcuX21lcmlkaWVtID0gaW5wdXQ7XG4gICAgICAgICAgICAvLyBjb25maWcuX2lzUG0gPSBjb25maWcuX2xvY2FsZS5pc1BNKGlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBIT1VSXG4gICAgICAgIGNhc2UgJ2gnIDogLy8gZmFsbCB0aHJvdWdoIHRvIGhoXG4gICAgICAgIGNhc2UgJ2hoJyA6XG4gICAgICAgICAgICBjb25maWcuX3BmLmJpZ0hvdXIgPSB0cnVlO1xuICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICdIJyA6IC8vIGZhbGwgdGhyb3VnaCB0byBISFxuICAgICAgICBjYXNlICdISCcgOlxuICAgICAgICAgICAgZGF0ZVBhcnRBcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBNSU5VVEVcbiAgICAgICAgY2FzZSAnbScgOiAvLyBmYWxsIHRocm91Z2ggdG8gbW1cbiAgICAgICAgY2FzZSAnbW0nIDpcbiAgICAgICAgICAgIGRhdGVQYXJ0QXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBTRUNPTkRcbiAgICAgICAgY2FzZSAncycgOiAvLyBmYWxsIHRocm91Z2ggdG8gc3NcbiAgICAgICAgY2FzZSAnc3MnIDpcbiAgICAgICAgICAgIGRhdGVQYXJ0QXJyYXlbU0VDT05EXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBNSUxMSVNFQ09ORFxuICAgICAgICBjYXNlICdTJyA6XG4gICAgICAgIGNhc2UgJ1NTJyA6XG4gICAgICAgIGNhc2UgJ1NTUycgOlxuICAgICAgICBjYXNlICdTU1NTJyA6XG4gICAgICAgICAgICBkYXRlUGFydEFycmF5W01JTExJU0VDT05EXSA9IHRvSW50KCgnMC4nICsgaW5wdXQpICogMTAwMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gVU5JWCBPRkZTRVQgKE1JTExJU0VDT05EUylcbiAgICAgICAgY2FzZSAneCc6XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFVOSVggVElNRVNUQU1QIFdJVEggTVNcbiAgICAgICAgY2FzZSAnWCc6XG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShwYXJzZUZsb2F0KGlucHV0KSAqIDEwMDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFRJTUVaT05FXG4gICAgICAgIGNhc2UgJ1onIDogLy8gZmFsbCB0aHJvdWdoIHRvIFpaXG4gICAgICAgIGNhc2UgJ1paJyA6XG4gICAgICAgICAgICBjb25maWcuX3VzZVVUQyA9IHRydWU7XG4gICAgICAgICAgICBjb25maWcuX3R6bSA9IHV0Y09mZnNldEZyb21TdHJpbmcoaW5wdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFdFRUtEQVkgLSBodW1hblxuICAgICAgICBjYXNlICdkZCc6XG4gICAgICAgIGNhc2UgJ2RkZCc6XG4gICAgICAgIGNhc2UgJ2RkZGQnOlxuICAgICAgICAgICAgYSA9IGNvbmZpZy5fbG9jYWxlLndlZWtkYXlzUGFyc2UoaW5wdXQpO1xuICAgICAgICAgICAgLy8gaWYgd2UgZGlkbid0IGdldCBhIHdlZWtkYXkgbmFtZSwgbWFyayB0aGUgZGF0ZSBhcyBpbnZhbGlkXG4gICAgICAgICAgICBpZiAoYSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl93ID0gY29uZmlnLl93IHx8IHt9O1xuICAgICAgICAgICAgICAgIGNvbmZpZy5fd1snZCddID0gYTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLl9wZi5pbnZhbGlkV2Vla2RheSA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIFdFRUssIFdFRUsgREFZIC0gbnVtZXJpY1xuICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgY2FzZSAnd3cnOlxuICAgICAgICBjYXNlICdXJzpcbiAgICAgICAgY2FzZSAnV1cnOlxuICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgY2FzZSAnZSc6XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbi5zdWJzdHIoMCwgMSk7XG4gICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJ2dnZ2cnOlxuICAgICAgICBjYXNlICdHR0dHJzpcbiAgICAgICAgY2FzZSAnR0dHR0cnOlxuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbi5zdWJzdHIoMCwgMik7XG4gICAgICAgICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XG4gICAgICAgICAgICAgICAgY29uZmlnLl93W3Rva2VuXSA9IHRvSW50KGlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnZyc6XG4gICAgICAgIGNhc2UgJ0dHJzpcbiAgICAgICAgICAgIGNvbmZpZy5fdyA9IGNvbmZpZy5fdyB8fCB7fTtcbiAgICAgICAgICAgIGNvbmZpZy5fd1t0b2tlbl0gPSBtb21lbnQucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtJbmZvKGNvbmZpZykge1xuICAgICAgICB2YXIgdywgd2Vla1llYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95LCB0ZW1wO1xuXG4gICAgICAgIHcgPSBjb25maWcuX3c7XG4gICAgICAgIGlmICh3LkdHICE9IG51bGwgfHwgdy5XICE9IG51bGwgfHwgdy5FICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRvdyA9IDE7XG4gICAgICAgICAgICBkb3kgPSA0O1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBXZSBuZWVkIHRvIHRha2UgdGhlIGN1cnJlbnQgaXNvV2Vla1llYXIsIGJ1dCB0aGF0IGRlcGVuZHMgb25cbiAgICAgICAgICAgIC8vIGhvdyB3ZSBpbnRlcnByZXQgbm93IChsb2NhbCwgdXRjLCBmaXhlZCBvZmZzZXQpLiBTbyBjcmVhdGVcbiAgICAgICAgICAgIC8vIGEgbm93IHZlcnNpb24gb2YgY3VycmVudCBjb25maWcgKHRha2UgbG9jYWwvdXRjL29mZnNldCBmbGFncywgYW5kXG4gICAgICAgICAgICAvLyBjcmVhdGUgbm93KS5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGZsKHcuR0csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihtb21lbnQoKSwgMSwgNCkueWVhcik7XG4gICAgICAgICAgICB3ZWVrID0gZGZsKHcuVywgMSk7XG4gICAgICAgICAgICB3ZWVrZGF5ID0gZGZsKHcuRSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb3cgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3c7XG4gICAgICAgICAgICBkb3kgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3k7XG5cbiAgICAgICAgICAgIHdlZWtZZWFyID0gZGZsKHcuZ2csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihtb21lbnQoKSwgZG93LCBkb3kpLnllYXIpO1xuICAgICAgICAgICAgd2VlayA9IGRmbCh3LncsIDEpO1xuXG4gICAgICAgICAgICBpZiAody5kICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5ID0gdy5kO1xuICAgICAgICAgICAgICAgIGlmICh3ZWVrZGF5IDwgZG93KSB7XG4gICAgICAgICAgICAgICAgICAgICsrd2VlaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gbG9jYWwgd2Vla2RheSAtLSBjb3VudGluZyBzdGFydHMgZnJvbSBiZWdpbmluZyBvZiB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IHcuZSArIGRvdztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byBiZWdpbmluZyBvZiB3ZWVrXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IGRvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0ZW1wID0gZGF5T2ZZZWFyRnJvbVdlZWtzKHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3ksIGRvdyk7XG5cbiAgICAgICAgY29uZmlnLl9hW1lFQVJdID0gdGVtcC55ZWFyO1xuICAgICAgICBjb25maWcuX2RheU9mWWVhciA9IHRlbXAuZGF5T2ZZZWFyO1xuICAgIH1cblxuICAgIC8vIGNvbnZlcnQgYW4gYXJyYXkgdG8gYSBkYXRlLlxuICAgIC8vIHRoZSBhcnJheSBzaG91bGQgbWlycm9yIHRoZSBwYXJhbWV0ZXJzIGJlbG93XG4gICAgLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXG4gICAgLy8gW3llYXIsIG1vbnRoLCBkYXkgLCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmRdXG4gICAgZnVuY3Rpb24gZGF0ZUZyb21Db25maWcoY29uZmlnKSB7XG4gICAgICAgIHZhciBpLCBkYXRlLCBpbnB1dCA9IFtdLCBjdXJyZW50RGF0ZSwgeWVhclRvVXNlO1xuXG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnREYXRlID0gY3VycmVudERhdGVBcnJheShjb25maWcpO1xuXG4gICAgICAgIC8vY29tcHV0ZSBkYXkgb2YgdGhlIHllYXIgZnJvbSB3ZWVrcyBhbmQgd2Vla2RheXNcbiAgICAgICAgaWYgKGNvbmZpZy5fdyAmJiBjb25maWcuX2FbREFURV0gPT0gbnVsbCAmJiBjb25maWcuX2FbTU9OVEhdID09IG51bGwpIHtcbiAgICAgICAgICAgIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiB0aGUgZGF5IG9mIHRoZSB5ZWFyIGlzIHNldCwgZmlndXJlIG91dCB3aGF0IGl0IGlzXG4gICAgICAgIGlmIChjb25maWcuX2RheU9mWWVhcikge1xuICAgICAgICAgICAgeWVhclRvVXNlID0gZGZsKGNvbmZpZy5fYVtZRUFSXSwgY3VycmVudERhdGVbWUVBUl0pO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuX3BmLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUgPSBtYWtlVVRDRGF0ZSh5ZWFyVG9Vc2UsIDAsIGNvbmZpZy5fZGF5T2ZZZWFyKTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtNT05USF0gPSBkYXRlLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxuICAgICAgICAvLyAqIGlmIG5vIHllYXIsIG1vbnRoLCBkYXkgb2YgbW9udGggYXJlIGdpdmVuLCBkZWZhdWx0IHRvIHRvZGF5XG4gICAgICAgIC8vICogaWYgZGF5IG9mIG1vbnRoIGlzIGdpdmVuLCBkZWZhdWx0IG1vbnRoIGFuZCB5ZWFyXG4gICAgICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXG4gICAgICAgIC8vICogaWYgeWVhciBpcyBnaXZlbiwgZG9uJ3QgZGVmYXVsdCBhbnl0aGluZ1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMyAmJiBjb25maWcuX2FbaV0gPT0gbnVsbDsgKytpKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXG4gICAgICAgIGZvciAoOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IChjb25maWcuX2FbaV0gPT0gbnVsbCkgPyAoaSA9PT0gMiA/IDEgOiAwKSA6IGNvbmZpZy5fYVtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGZvciAyNDowMDowMC4wMDBcbiAgICAgICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbTUlOVVRFXSA9PT0gMCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtTRUNPTkRdID09PSAwICYmXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMCkge1xuICAgICAgICAgICAgY29uZmlnLl9uZXh0RGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuX2QgPSAoY29uZmlnLl91c2VVVEMgPyBtYWtlVVRDRGF0ZSA6IG1ha2VEYXRlKS5hcHBseShudWxsLCBpbnB1dCk7XG4gICAgICAgIC8vIEFwcGx5IHRpbWV6b25lIG9mZnNldCBmcm9tIGlucHV0LiBUaGUgYWN0dWFsIHV0Y09mZnNldCBjYW4gYmUgY2hhbmdlZFxuICAgICAgICAvLyB3aXRoIHBhcnNlWm9uZS5cbiAgICAgICAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZC5zZXRVVENNaW51dGVzKGNvbmZpZy5fZC5nZXRVVENNaW51dGVzKCkgLSBjb25maWcuX3R6bSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLl9uZXh0RGF5KSB7XG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAyNDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRhdGVGcm9tT2JqZWN0KGNvbmZpZykge1xuICAgICAgICB2YXIgbm9ybWFsaXplZElucHV0O1xuXG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vcm1hbGl6ZWRJbnB1dCA9IG5vcm1hbGl6ZU9iamVjdFVuaXRzKGNvbmZpZy5faSk7XG4gICAgICAgIGNvbmZpZy5fYSA9IFtcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dC55ZWFyLFxuICAgICAgICAgICAgbm9ybWFsaXplZElucHV0Lm1vbnRoLFxuICAgICAgICAgICAgbm9ybWFsaXplZElucHV0LmRheSB8fCBub3JtYWxpemVkSW5wdXQuZGF0ZSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dC5ob3VyLFxuICAgICAgICAgICAgbm9ybWFsaXplZElucHV0Lm1pbnV0ZSxcbiAgICAgICAgICAgIG5vcm1hbGl6ZWRJbnB1dC5zZWNvbmQsXG4gICAgICAgICAgICBub3JtYWxpemVkSW5wdXQubWlsbGlzZWNvbmRcbiAgICAgICAgXTtcblxuICAgICAgICBkYXRlRnJvbUNvbmZpZyhjb25maWcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKSB7XG4gICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgbm93LmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgbm93LmdldFVUQ01vbnRoKCksXG4gICAgICAgICAgICAgICAgbm93LmdldFVUQ0RhdGUoKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbbm93LmdldEZ1bGxZZWFyKCksIG5vdy5nZXRNb250aCgpLCBub3cuZ2V0RGF0ZSgpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRhdGUgZnJvbSBzdHJpbmcgYW5kIGZvcm1hdCBzdHJpbmdcbiAgICBmdW5jdGlvbiBtYWtlRGF0ZUZyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IG1vbWVudC5JU09fODYwMSkge1xuICAgICAgICAgICAgcGFyc2VJU08oY29uZmlnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xuICAgICAgICBjb25maWcuX3BmLmVtcHR5ID0gdHJ1ZTtcblxuICAgICAgICAvLyBUaGlzIGFycmF5IGlzIHVzZWQgdG8gbWFrZSBhIERhdGUsIGVpdGhlciB3aXRoIGBuZXcgRGF0ZWAgb3IgYERhdGUuVVRDYFxuICAgICAgICB2YXIgc3RyaW5nID0gJycgKyBjb25maWcuX2ksXG4gICAgICAgICAgICBpLCBwYXJzZWRJbnB1dCwgdG9rZW5zLCB0b2tlbiwgc2tpcHBlZCxcbiAgICAgICAgICAgIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG4gICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoID0gMDtcblxuICAgICAgICB0b2tlbnMgPSBleHBhbmRGb3JtYXQoY29uZmlnLl9mLCBjb25maWcuX2xvY2FsZSkubWF0Y2goZm9ybWF0dGluZ1Rva2VucykgfHwgW107XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fCBbXSlbMF07XG4gICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICBza2lwcGVkID0gc3RyaW5nLnN1YnN0cigwLCBzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkpO1xuICAgICAgICAgICAgICAgIGlmIChza2lwcGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9wZi51bnVzZWRJbnB1dC5wdXNoKHNraXBwZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2Uoc3RyaW5nLmluZGV4T2YocGFyc2VkSW5wdXQpICsgcGFyc2VkSW5wdXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoICs9IHBhcnNlZElucHV0Lmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGRvbid0IHBhcnNlIGlmIGl0J3Mgbm90IGEga25vd24gdG9rZW5cbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0pIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9wZi5lbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLl9wZi51bnVzZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBwYXJzZWRJbnB1dCwgY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5fcGYudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHJlbWFpbmluZyB1bnBhcnNlZCBpbnB1dCBsZW5ndGggdG8gdGhlIHN0cmluZ1xuICAgICAgICBjb25maWcuX3BmLmNoYXJzTGVmdE92ZXIgPSBzdHJpbmdMZW5ndGggLSB0b3RhbFBhcnNlZElucHV0TGVuZ3RoO1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbmZpZy5fcGYudW51c2VkSW5wdXQucHVzaChzdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgXzEyaCBmbGFnIGlmIGhvdXIgaXMgPD0gMTJcbiAgICAgICAgaWYgKGNvbmZpZy5fcGYuYmlnSG91ciA9PT0gdHJ1ZSAmJiBjb25maWcuX2FbSE9VUl0gPD0gMTIpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fcGYuYmlnSG91ciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBoYW5kbGUgbWVyaWRpZW1cbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKGNvbmZpZy5fbG9jYWxlLCBjb25maWcuX2FbSE9VUl0sXG4gICAgICAgICAgICAgICAgY29uZmlnLl9tZXJpZGllbSk7XG4gICAgICAgIGRhdGVGcm9tQ29uZmlnKGNvbmZpZyk7XG4gICAgICAgIGNoZWNrT3ZlcmZsb3coY29uZmlnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmVzY2FwZUZvcm1hdChzKSB7XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoL1xcXFwoXFxbKXxcXFxcKFxcXSl8XFxbKFteXFxdXFxbXSopXFxdfFxcXFwoLikvZywgZnVuY3Rpb24gKG1hdGNoZWQsIHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgICAgICAgICByZXR1cm4gcDEgfHwgcDIgfHwgcDMgfHwgcDQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIENvZGUgZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1NjE0OTMvaXMtdGhlcmUtYS1yZWdleHAtZXNjYXBlLWZ1bmN0aW9uLWluLWphdmFzY3JpcHRcbiAgICBmdW5jdGlvbiByZWdleHBFc2NhcGUocykge1xuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcbiAgICB9XG5cbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBhcnJheSBvZiBmb3JtYXQgc3RyaW5nc1xuICAgIGZ1bmN0aW9uIG1ha2VEYXRlRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZykge1xuICAgICAgICB2YXIgdGVtcENvbmZpZyxcbiAgICAgICAgICAgIGJlc3RNb21lbnQsXG5cbiAgICAgICAgICAgIHNjb3JlVG9CZWF0LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZTtcblxuICAgICAgICBpZiAoY29uZmlnLl9mLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uZmlnLl9wZi5pbnZhbGlkRm9ybWF0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKE5hTik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29uZmlnLl9mLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjdXJyZW50U2NvcmUgPSAwO1xuICAgICAgICAgICAgdGVtcENvbmZpZyA9IGNvcHlDb25maWcoe30sIGNvbmZpZyk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRlbXBDb25maWcuX3VzZVVUQyA9IGNvbmZpZy5fdXNlVVRDO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGVtcENvbmZpZy5fcGYgPSBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk7XG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xuICAgICAgICAgICAgbWFrZURhdGVGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xuXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQodGVtcENvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW55IGlucHV0IHRoYXQgd2FzIG5vdCBwYXJzZWQgYWRkIGEgcGVuYWx0eSBmb3IgdGhhdCBmb3JtYXRcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSArPSB0ZW1wQ29uZmlnLl9wZi5jaGFyc0xlZnRPdmVyO1xuXG4gICAgICAgICAgICAvL29yIHRva2Vuc1xuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IHRlbXBDb25maWcuX3BmLnVudXNlZFRva2Vucy5sZW5ndGggKiAxMDtcblxuICAgICAgICAgICAgdGVtcENvbmZpZy5fcGYuc2NvcmUgPSBjdXJyZW50U2NvcmU7XG5cbiAgICAgICAgICAgIGlmIChzY29yZVRvQmVhdCA9PSBudWxsIHx8IGN1cnJlbnRTY29yZSA8IHNjb3JlVG9CZWF0KSB7XG4gICAgICAgICAgICAgICAgc2NvcmVUb0JlYXQgPSBjdXJyZW50U2NvcmU7XG4gICAgICAgICAgICAgICAgYmVzdE1vbWVudCA9IHRlbXBDb25maWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBleHRlbmQoY29uZmlnLCBiZXN0TW9tZW50IHx8IHRlbXBDb25maWcpO1xuICAgIH1cblxuICAgIC8vIGRhdGUgZnJvbSBpc28gZm9ybWF0XG4gICAgZnVuY3Rpb24gcGFyc2VJU08oY29uZmlnKSB7XG4gICAgICAgIHZhciBpLCBsLFxuICAgICAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxuICAgICAgICAgICAgbWF0Y2ggPSBpc29SZWdleC5leGVjKHN0cmluZyk7XG5cbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjb25maWcuX3BmLmlzbyA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvRGF0ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzb0RhdGVzW2ldWzFdLmV4ZWMoc3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaFs1XSBzaG91bGQgYmUgJ1QnIG9yIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2YgPSBpc29EYXRlc1tpXVswXSArIChtYXRjaFs2XSB8fCAnICcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvVGltZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzb1RpbWVzW2ldWzFdLmV4ZWMoc3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2YgKz0gaXNvVGltZXNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdHJpbmcubWF0Y2gocGFyc2VUb2tlblRpbWV6b25lKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5fZiArPSAnWic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYWtlRGF0ZUZyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGF0ZSBmcm9tIGlzbyBmb3JtYXQgb3IgZmFsbGJhY2tcbiAgICBmdW5jdGlvbiBtYWtlRGF0ZUZyb21TdHJpbmcoY29uZmlnKSB7XG4gICAgICAgIHBhcnNlSVNPKGNvbmZpZyk7XG4gICAgICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xuICAgICAgICAgICAgbW9tZW50LmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xuICAgICAgICB2YXIgcmVzID0gW10sIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZURhdGVGcm9tSW5wdXQoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSwgbWF0Y2hlZDtcbiAgICAgICAgaWYgKGlucHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoK2lucHV0KTtcbiAgICAgICAgfSBlbHNlIGlmICgobWF0Y2hlZCA9IGFzcE5ldEpzb25SZWdleC5leGVjKGlucHV0KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCttYXRjaGVkWzFdKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtYWtlRGF0ZUZyb21TdHJpbmcoY29uZmlnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xuICAgICAgICAgICAgY29uZmlnLl9hID0gbWFwKGlucHV0LnNsaWNlKDApLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG9iaiwgMTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkYXRlRnJvbUNvbmZpZyhjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBkYXRlRnJvbU9iamVjdChjb25maWcpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9tZW50LmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlRGF0ZSh5LCBtLCBkLCBoLCBNLCBzLCBtcykge1xuICAgICAgICAvL2Nhbid0IGp1c3QgYXBwbHkoKSB0byBjcmVhdGUgYSBkYXRlOlxuICAgICAgICAvL2h0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTgxMzQ4L2luc3RhbnRpYXRpbmctYS1qYXZhc2NyaXB0LW9iamVjdC1ieS1jYWxsaW5nLXByb3RvdHlwZS1jb25zdHJ1Y3Rvci1hcHBseVxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHksIG0sIGQsIGgsIE0sIHMsIG1zKTtcblxuICAgICAgICAvL3RoZSBkYXRlIGNvbnN0cnVjdG9yIGRvZXNuJ3QgYWNjZXB0IHllYXJzIDwgMTk3MFxuICAgICAgICBpZiAoeSA8IDE5NzApIHtcbiAgICAgICAgICAgIGRhdGUuc2V0RnVsbFllYXIoeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZVVUQ0RhdGUoeSkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuICAgICAgICBpZiAoeSA8IDE5NzApIHtcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGFyc2VXZWVrZGF5KGlucHV0LCBsb2NhbGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBwYXJzZUludChpbnB1dCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIFJlbGF0aXZlIFRpbWVcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuICAgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgbW9tZW50LmZuLmZyb20sIG1vbWVudC5mbi5mcm9tTm93LCBhbmQgbW9tZW50LmR1cmF0aW9uLmZuLmh1bWFuaXplXG4gICAgZnVuY3Rpb24gc3Vic3RpdHV0ZVRpbWVBZ28oc3RyaW5nLCBudW1iZXIsIHdpdGhvdXRTdWZmaXgsIGlzRnV0dXJlLCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5yZWxhdGl2ZVRpbWUobnVtYmVyIHx8IDEsICEhd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVsYXRpdmVUaW1lKHBvc05lZ0R1cmF0aW9uLCB3aXRob3V0U3VmZml4LCBsb2NhbGUpIHtcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gbW9tZW50LmR1cmF0aW9uKHBvc05lZ0R1cmF0aW9uKS5hYnMoKSxcbiAgICAgICAgICAgIHNlY29uZHMgPSByb3VuZChkdXJhdGlvbi5hcygncycpKSxcbiAgICAgICAgICAgIG1pbnV0ZXMgPSByb3VuZChkdXJhdGlvbi5hcygnbScpKSxcbiAgICAgICAgICAgIGhvdXJzID0gcm91bmQoZHVyYXRpb24uYXMoJ2gnKSksXG4gICAgICAgICAgICBkYXlzID0gcm91bmQoZHVyYXRpb24uYXMoJ2QnKSksXG4gICAgICAgICAgICBtb250aHMgPSByb3VuZChkdXJhdGlvbi5hcygnTScpKSxcbiAgICAgICAgICAgIHllYXJzID0gcm91bmQoZHVyYXRpb24uYXMoJ3knKSksXG5cbiAgICAgICAgICAgIGFyZ3MgPSBzZWNvbmRzIDwgcmVsYXRpdmVUaW1lVGhyZXNob2xkcy5zICYmIFsncycsIHNlY29uZHNdIHx8XG4gICAgICAgICAgICAgICAgbWludXRlcyA9PT0gMSAmJiBbJ20nXSB8fFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPCByZWxhdGl2ZVRpbWVUaHJlc2hvbGRzLm0gJiYgWydtbScsIG1pbnV0ZXNdIHx8XG4gICAgICAgICAgICAgICAgaG91cnMgPT09IDEgJiYgWydoJ10gfHxcbiAgICAgICAgICAgICAgICBob3VycyA8IHJlbGF0aXZlVGltZVRocmVzaG9sZHMuaCAmJiBbJ2hoJywgaG91cnNdIHx8XG4gICAgICAgICAgICAgICAgZGF5cyA9PT0gMSAmJiBbJ2QnXSB8fFxuICAgICAgICAgICAgICAgIGRheXMgPCByZWxhdGl2ZVRpbWVUaHJlc2hvbGRzLmQgJiYgWydkZCcsIGRheXNdIHx8XG4gICAgICAgICAgICAgICAgbW9udGhzID09PSAxICYmIFsnTSddIHx8XG4gICAgICAgICAgICAgICAgbW9udGhzIDwgcmVsYXRpdmVUaW1lVGhyZXNob2xkcy5NICYmIFsnTU0nLCBtb250aHNdIHx8XG4gICAgICAgICAgICAgICAgeWVhcnMgPT09IDEgJiYgWyd5J10gfHwgWyd5eScsIHllYXJzXTtcblxuICAgICAgICBhcmdzWzJdID0gd2l0aG91dFN1ZmZpeDtcbiAgICAgICAgYXJnc1szXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XG4gICAgICAgIGFyZ3NbNF0gPSBsb2NhbGU7XG4gICAgICAgIHJldHVybiBzdWJzdGl0dXRlVGltZUFnby5hcHBseSh7fSwgYXJncyk7XG4gICAgfVxuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIFdlZWsgb2YgWWVhclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4gICAgLy8gZmlyc3REYXlPZldlZWsgICAgICAgMCA9IHN1biwgNiA9IHNhdFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgIHRoZSBkYXkgb2YgdGhlIHdlZWsgdGhhdCBzdGFydHMgdGhlIHdlZWtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAodXN1YWxseSBzdW5kYXkgb3IgbW9uZGF5KVxuICAgIC8vIGZpcnN0RGF5T2ZXZWVrT2ZZZWFyIDAgPSBzdW4sIDYgPSBzYXRcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICB0aGUgZmlyc3Qgd2VlayBpcyB0aGUgd2VlayB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgIG9mIHRoaXMgZGF5IG9mIHRoZSB3ZWVrXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgKGVnLiBJU08gd2Vla3MgdXNlIHRodXJzZGF5ICg0KSlcbiAgICBmdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZmlyc3REYXlPZldlZWssIGZpcnN0RGF5T2ZXZWVrT2ZZZWFyKSB7XG4gICAgICAgIHZhciBlbmQgPSBmaXJzdERheU9mV2Vla09mWWVhciAtIGZpcnN0RGF5T2ZXZWVrLFxuICAgICAgICAgICAgZGF5c1RvRGF5T2ZXZWVrID0gZmlyc3REYXlPZldlZWtPZlllYXIgLSBtb20uZGF5KCksXG4gICAgICAgICAgICBhZGp1c3RlZE1vbWVudDtcblxuXG4gICAgICAgIGlmIChkYXlzVG9EYXlPZldlZWsgPiBlbmQpIHtcbiAgICAgICAgICAgIGRheXNUb0RheU9mV2VlayAtPSA3O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRheXNUb0RheU9mV2VlayA8IGVuZCAtIDcpIHtcbiAgICAgICAgICAgIGRheXNUb0RheU9mV2VlayArPSA3O1xuICAgICAgICB9XG5cbiAgICAgICAgYWRqdXN0ZWRNb21lbnQgPSBtb21lbnQobW9tKS5hZGQoZGF5c1RvRGF5T2ZXZWVrLCAnZCcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2VlazogTWF0aC5jZWlsKGFkanVzdGVkTW9tZW50LmRheU9mWWVhcigpIC8gNyksXG4gICAgICAgICAgICB5ZWFyOiBhZGp1c3RlZE1vbWVudC55ZWFyKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvL2h0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZSNDYWxjdWxhdGluZ19hX2RhdGVfZ2l2ZW5fdGhlX3llYXIuMkNfd2Vla19udW1iZXJfYW5kX3dlZWtkYXlcbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla3MoeWVhciwgd2Vlaywgd2Vla2RheSwgZmlyc3REYXlPZldlZWtPZlllYXIsIGZpcnN0RGF5T2ZXZWVrKSB7XG4gICAgICAgIHZhciBkID0gbWFrZVVUQ0RhdGUoeWVhciwgMCwgMSkuZ2V0VVRDRGF5KCksIGRheXNUb0FkZCwgZGF5T2ZZZWFyO1xuXG4gICAgICAgIGQgPSBkID09PSAwID8gNyA6IGQ7XG4gICAgICAgIHdlZWtkYXkgPSB3ZWVrZGF5ICE9IG51bGwgPyB3ZWVrZGF5IDogZmlyc3REYXlPZldlZWs7XG4gICAgICAgIGRheXNUb0FkZCA9IGZpcnN0RGF5T2ZXZWVrIC0gZCArIChkID4gZmlyc3REYXlPZldlZWtPZlllYXIgPyA3IDogMCkgLSAoZCA8IGZpcnN0RGF5T2ZXZWVrID8gNyA6IDApO1xuICAgICAgICBkYXlPZlllYXIgPSA3ICogKHdlZWsgLSAxKSArICh3ZWVrZGF5IC0gZmlyc3REYXlPZldlZWspICsgZGF5c1RvQWRkICsgMTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeWVhcjogZGF5T2ZZZWFyID4gMCA/IHllYXIgOiB5ZWFyIC0gMSxcbiAgICAgICAgICAgIGRheU9mWWVhcjogZGF5T2ZZZWFyID4gMCA/ICBkYXlPZlllYXIgOiBkYXlzSW5ZZWFyKHllYXIgLSAxKSArIGRheU9mWWVhclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgVG9wIExldmVsIEZ1bmN0aW9uc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGZ1bmN0aW9uIG1ha2VNb21lbnQoY29uZmlnKSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGNvbmZpZy5faSxcbiAgICAgICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZixcbiAgICAgICAgICAgIHJlcztcblxuICAgICAgICBjb25maWcuX2xvY2FsZSA9IGNvbmZpZy5fbG9jYWxlIHx8IG1vbWVudC5sb2NhbGVEYXRhKGNvbmZpZy5fbCk7XG5cbiAgICAgICAgaWYgKGlucHV0ID09PSBudWxsIHx8IChmb3JtYXQgPT09IHVuZGVmaW5lZCAmJiBpbnB1dCA9PT0gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LmludmFsaWQoe251bGxJbnB1dDogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZy5faSA9IGlucHV0ID0gY29uZmlnLl9sb2NhbGUucHJlcGFyc2UoaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vbWVudC5pc01vbWVudChpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTW9tZW50KGlucHV0LCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQpIHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICBtYWtlRGF0ZUZyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYWtlRGF0ZUZyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1ha2VEYXRlRnJvbUlucHV0KGNvbmZpZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXMgPSBuZXcgTW9tZW50KGNvbmZpZyk7XG4gICAgICAgIGlmIChyZXMuX25leHREYXkpIHtcbiAgICAgICAgICAgIC8vIEFkZGluZyBpcyBzbWFydCBlbm91Z2ggYXJvdW5kIERTVFxuICAgICAgICAgICAgcmVzLmFkZCgxLCAnZCcpO1xuICAgICAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBtb21lbnQgPSBmdW5jdGlvbiAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QpIHtcbiAgICAgICAgdmFyIGM7XG5cbiAgICAgICAgaWYgKHR5cGVvZihsb2NhbGUpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHN0cmljdCA9IGxvY2FsZTtcbiAgICAgICAgICAgIGxvY2FsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBvYmplY3QgY29uc3RydWN0aW9uIG11c3QgYmUgZG9uZSB0aGlzIHdheS5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MjNcbiAgICAgICAgYyA9IHt9O1xuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xuICAgICAgICBjLl9pID0gaW5wdXQ7XG4gICAgICAgIGMuX2YgPSBmb3JtYXQ7XG4gICAgICAgIGMuX2wgPSBsb2NhbGU7XG4gICAgICAgIGMuX3N0cmljdCA9IHN0cmljdDtcbiAgICAgICAgYy5faXNVVEMgPSBmYWxzZTtcbiAgICAgICAgYy5fcGYgPSBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk7XG5cbiAgICAgICAgcmV0dXJuIG1ha2VNb21lbnQoYyk7XG4gICAgfTtcblxuICAgIG1vbWVudC5zdXBwcmVzc0RlcHJlY2F0aW9uV2FybmluZ3MgPSBmYWxzZTtcblxuICAgIG1vbWVudC5jcmVhdGVGcm9tSW5wdXRGYWxsYmFjayA9IGRlcHJlY2F0ZShcbiAgICAgICAgJ21vbWVudCBjb25zdHJ1Y3Rpb24gZmFsbHMgYmFjayB0byBqcyBEYXRlLiBUaGlzIGlzICcgK1xuICAgICAgICAnZGlzY291cmFnZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB1cGNvbWluZyBtYWpvciAnICtcbiAgICAgICAgJ3JlbGVhc2UuIFBsZWFzZSByZWZlciB0byAnICtcbiAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNDA3IGZvciBtb3JlIGluZm8uJyxcbiAgICAgICAgZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pICsgKGNvbmZpZy5fdXNlVVRDID8gJyBVVEMnIDogJycpKTtcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBQaWNrIGEgbW9tZW50IG0gZnJvbSBtb21lbnRzIHNvIHRoYXQgbVtmbl0ob3RoZXIpIGlzIHRydWUgZm9yIGFsbFxuICAgIC8vIG90aGVyLiBUaGlzIHJlbGllcyBvbiB0aGUgZnVuY3Rpb24gZm4gdG8gYmUgdHJhbnNpdGl2ZS5cbiAgICAvL1xuICAgIC8vIG1vbWVudHMgc2hvdWxkIGVpdGhlciBiZSBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cyBvciBhbiBhcnJheSwgd2hvc2VcbiAgICAvLyBmaXJzdCBlbGVtZW50IGlzIGFuIGFycmF5IG9mIG1vbWVudCBvYmplY3RzLlxuICAgIGZ1bmN0aW9uIHBpY2tCeShmbiwgbW9tZW50cykge1xuICAgICAgICB2YXIgcmVzLCBpO1xuICAgICAgICBpZiAobW9tZW50cy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShtb21lbnRzWzBdKSkge1xuICAgICAgICAgICAgbW9tZW50cyA9IG1vbWVudHNbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtb21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcyA9IG1vbWVudHNbMF07XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBtb21lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAobW9tZW50c1tpXVtmbl0ocmVzKSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IG1vbWVudHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBtb21lbnQubWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0JlZm9yZScsIGFyZ3MpO1xuICAgIH07XG5cbiAgICBtb21lbnQubWF4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0FmdGVyJywgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIGNyZWF0aW5nIHdpdGggdXRjXG4gICAgbW9tZW50LnV0YyA9IGZ1bmN0aW9uIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xuICAgICAgICB2YXIgYztcblxuICAgICAgICBpZiAodHlwZW9mKGxvY2FsZSkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgc3RyaWN0ID0gbG9jYWxlO1xuICAgICAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9iamVjdCBjb25zdHJ1Y3Rpb24gbXVzdCBiZSBkb25lIHRoaXMgd2F5LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTQyM1xuICAgICAgICBjID0ge307XG4gICAgICAgIGMuX2lzQU1vbWVudE9iamVjdCA9IHRydWU7XG4gICAgICAgIGMuX3VzZVVUQyA9IHRydWU7XG4gICAgICAgIGMuX2lzVVRDID0gdHJ1ZTtcbiAgICAgICAgYy5fbCA9IGxvY2FsZTtcbiAgICAgICAgYy5faSA9IGlucHV0O1xuICAgICAgICBjLl9mID0gZm9ybWF0O1xuICAgICAgICBjLl9zdHJpY3QgPSBzdHJpY3Q7XG4gICAgICAgIGMuX3BmID0gZGVmYXVsdFBhcnNpbmdGbGFncygpO1xuXG4gICAgICAgIHJldHVybiBtYWtlTW9tZW50KGMpLnV0YygpO1xuICAgIH07XG5cbiAgICAvLyBjcmVhdGluZyB3aXRoIHVuaXggdGltZXN0YW1wIChpbiBzZWNvbmRzKVxuICAgIG1vbWVudC51bml4ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHJldHVybiBtb21lbnQoaW5wdXQgKiAxMDAwKTtcbiAgICB9O1xuXG4gICAgLy8gZHVyYXRpb25cbiAgICBtb21lbnQuZHVyYXRpb24gPSBmdW5jdGlvbiAoaW5wdXQsIGtleSkge1xuICAgICAgICB2YXIgZHVyYXRpb24gPSBpbnB1dCxcbiAgICAgICAgICAgIC8vIG1hdGNoaW5nIGFnYWluc3QgcmVnZXhwIGlzIGV4cGVuc2l2ZSwgZG8gaXQgb24gZGVtYW5kXG4gICAgICAgICAgICBtYXRjaCA9IG51bGwsXG4gICAgICAgICAgICBzaWduLFxuICAgICAgICAgICAgcmV0LFxuICAgICAgICAgICAgcGFyc2VJc28sXG4gICAgICAgICAgICBkaWZmUmVzO1xuXG4gICAgICAgIGlmIChtb21lbnQuaXNEdXJhdGlvbihpbnB1dCkpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xuICAgICAgICAgICAgICAgIG1zOiBpbnB1dC5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgICAgIGQ6IGlucHV0Ll9kYXlzLFxuICAgICAgICAgICAgICAgIE06IGlucHV0Ll9tb250aHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbltrZXldID0gaW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uLm1pbGxpc2Vjb25kcyA9IGlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gYXNwTmV0VGltZVNwYW5Kc29uUmVnZXguZXhlYyhpbnB1dCkpKSB7XG4gICAgICAgICAgICBzaWduID0gKG1hdGNoWzFdID09PSAnLScpID8gLTEgOiAxO1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICBkOiB0b0ludChtYXRjaFtEQVRFXSkgKiBzaWduLFxuICAgICAgICAgICAgICAgIGg6IHRvSW50KG1hdGNoW0hPVVJdKSAqIHNpZ24sXG4gICAgICAgICAgICAgICAgbTogdG9JbnQobWF0Y2hbTUlOVVRFXSkgKiBzaWduLFxuICAgICAgICAgICAgICAgIHM6IHRvSW50KG1hdGNoW1NFQ09ORF0pICogc2lnbixcbiAgICAgICAgICAgICAgICBtczogdG9JbnQobWF0Y2hbTUlMTElTRUNPTkRdKSAqIHNpZ25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBpc29EdXJhdGlvblJlZ2V4LmV4ZWMoaW5wdXQpKSkge1xuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogMTtcbiAgICAgICAgICAgIHBhcnNlSXNvID0gZnVuY3Rpb24gKGlucCkge1xuICAgICAgICAgICAgICAgIC8vIFdlJ2Qgbm9ybWFsbHkgdXNlIH5+aW5wIGZvciB0aGlzLCBidXQgdW5mb3J0dW5hdGVseSBpdCBhbHNvXG4gICAgICAgICAgICAgICAgLy8gY29udmVydHMgZmxvYXRzIHRvIGludHMuXG4gICAgICAgICAgICAgICAgLy8gaW5wIG1heSBiZSB1bmRlZmluZWQsIHNvIGNhcmVmdWwgY2FsbGluZyByZXBsYWNlIG9uIGl0LlxuICAgICAgICAgICAgICAgIHZhciByZXMgPSBpbnAgJiYgcGFyc2VGbG9hdChpbnAucmVwbGFjZSgnLCcsICcuJykpO1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5IHNpZ24gd2hpbGUgd2UncmUgYXQgaXRcbiAgICAgICAgICAgICAgICByZXR1cm4gKGlzTmFOKHJlcykgPyAwIDogcmVzKSAqIHNpZ247XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZHVyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgeTogcGFyc2VJc28obWF0Y2hbMl0pLFxuICAgICAgICAgICAgICAgIE06IHBhcnNlSXNvKG1hdGNoWzNdKSxcbiAgICAgICAgICAgICAgICBkOiBwYXJzZUlzbyhtYXRjaFs0XSksXG4gICAgICAgICAgICAgICAgaDogcGFyc2VJc28obWF0Y2hbNV0pLFxuICAgICAgICAgICAgICAgIG06IHBhcnNlSXNvKG1hdGNoWzZdKSxcbiAgICAgICAgICAgICAgICBzOiBwYXJzZUlzbyhtYXRjaFs3XSksXG4gICAgICAgICAgICAgICAgdzogcGFyc2VJc28obWF0Y2hbOF0pXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGR1cmF0aW9uID09IG51bGwpIHsvLyBjaGVja3MgZm9yIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAoJ2Zyb20nIGluIGR1cmF0aW9uIHx8ICd0bycgaW4gZHVyYXRpb24pKSB7XG4gICAgICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UobW9tZW50KGR1cmF0aW9uLmZyb20pLCBtb21lbnQoZHVyYXRpb24udG8pKTtcblxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcbiAgICAgICAgICAgIGR1cmF0aW9uLm1zID0gZGlmZlJlcy5taWxsaXNlY29uZHM7XG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgIGlmIChtb21lbnQuaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19sb2NhbGUnKSkge1xuICAgICAgICAgICAgcmV0Ll9sb2NhbGUgPSBpbnB1dC5fbG9jYWxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgLy8gdmVyc2lvbiBudW1iZXJcbiAgICBtb21lbnQudmVyc2lvbiA9IFZFUlNJT047XG5cbiAgICAvLyBkZWZhdWx0IGZvcm1hdFxuICAgIG1vbWVudC5kZWZhdWx0Rm9ybWF0ID0gaXNvRm9ybWF0O1xuXG4gICAgLy8gY29uc3RhbnQgdGhhdCByZWZlcnMgdG8gdGhlIElTTyBzdGFuZGFyZFxuICAgIG1vbWVudC5JU09fODYwMSA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gUGx1Z2lucyB0aGF0IGFkZCBwcm9wZXJ0aWVzIHNob3VsZCBhbHNvIGFkZCB0aGUga2V5IGhlcmUgKG51bGwgdmFsdWUpLFxuICAgIC8vIHNvIHdlIGNhbiBwcm9wZXJseSBjbG9uZSBvdXJzZWx2ZXMuXG4gICAgbW9tZW50Lm1vbWVudFByb3BlcnRpZXMgPSBtb21lbnRQcm9wZXJ0aWVzO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuZXZlciBhIG1vbWVudCBpcyBtdXRhdGVkLlxuICAgIC8vIEl0IGlzIGludGVuZGVkIHRvIGtlZXAgdGhlIG9mZnNldCBpbiBzeW5jIHdpdGggdGhlIHRpbWV6b25lLlxuICAgIG1vbWVudC51cGRhdGVPZmZzZXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHlvdSB0byBzZXQgYSB0aHJlc2hvbGQgZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xuICAgIG1vbWVudC5yZWxhdGl2ZVRpbWVUaHJlc2hvbGQgPSBmdW5jdGlvbiAodGhyZXNob2xkLCBsaW1pdCkge1xuICAgICAgICBpZiAocmVsYXRpdmVUaW1lVGhyZXNob2xkc1t0aHJlc2hvbGRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGltaXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlbGF0aXZlVGltZVRocmVzaG9sZHNbdGhyZXNob2xkXTtcbiAgICAgICAgfVxuICAgICAgICByZWxhdGl2ZVRpbWVUaHJlc2hvbGRzW3RocmVzaG9sZF0gPSBsaW1pdDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIG1vbWVudC5sYW5nID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50LmxhbmcgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGUgaW5zdGVhZC4nLFxuICAgICAgICBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC5sb2NhbGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgbG9jYWxlIGFuZCB0aGVuIHNldCB0aGUgZ2xvYmFsIGxvY2FsZS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbiAgICAvLyBsb2NhbGUga2V5LlxuICAgIG1vbWVudC5sb2NhbGUgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YodmFsdWVzKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gbW9tZW50LmRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gbW9tZW50LmxvY2FsZURhdGEoa2V5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBtb21lbnQuZHVyYXRpb24uX2xvY2FsZSA9IG1vbWVudC5fbG9jYWxlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb21lbnQuX2xvY2FsZS5fYWJicjtcbiAgICB9O1xuXG4gICAgbW9tZW50LmRlZmluZUxvY2FsZSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsdWVzLmFiYnIgPSBuYW1lO1xuICAgICAgICAgICAgaWYgKCFsb2NhbGVzW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IG5ldyBMb2NhbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0uc2V0KHZhbHVlcyk7XG5cbiAgICAgICAgICAgIC8vIGJhY2t3YXJkcyBjb21wYXQgZm9yIG5vdzogYWxzbyBzZXQgdGhlIGxvY2FsZVxuICAgICAgICAgICAgbW9tZW50LmxvY2FsZShuYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1c2VmdWwgZm9yIHRlc3RpbmdcbiAgICAgICAgICAgIGRlbGV0ZSBsb2NhbGVzW25hbWVdO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbW9tZW50LmxhbmdEYXRhID0gZGVwcmVjYXRlKFxuICAgICAgICAnbW9tZW50LmxhbmdEYXRhIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb21lbnQubG9jYWxlRGF0YSBpbnN0ZWFkLicsXG4gICAgICAgIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQubG9jYWxlRGF0YShrZXkpO1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIC8vIHJldHVybnMgbG9jYWxlIGRhdGFcbiAgICBtb21lbnQubG9jYWxlRGF0YSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIGxvY2FsZTtcblxuICAgICAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXkuX2xvY2FsZS5fYWJicjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50Ll9sb2NhbGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzQXJyYXkoa2V5KSkge1xuICAgICAgICAgICAgLy9zaG9ydC1jaXJjdWl0IGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShrZXkpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXkgPSBba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaG9vc2VMb2NhbGUoa2V5KTtcbiAgICB9O1xuXG4gICAgLy8gY29tcGFyZSBtb21lbnQgb2JqZWN0XG4gICAgbW9tZW50LmlzTW9tZW50ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8XG4gICAgICAgICAgICAob2JqICE9IG51bGwgJiYgaGFzT3duUHJvcChvYmosICdfaXNBTW9tZW50T2JqZWN0JykpO1xuICAgIH07XG5cbiAgICAvLyBmb3IgdHlwZWNoZWNraW5nIER1cmF0aW9uIG9iamVjdHNcbiAgICBtb21lbnQuaXNEdXJhdGlvbiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIER1cmF0aW9uO1xuICAgIH07XG5cbiAgICBmb3IgKGkgPSBsaXN0cy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICBtYWtlTGlzdChsaXN0c1tpXSk7XG4gICAgfVxuXG4gICAgbW9tZW50Lm5vcm1hbGl6ZVVuaXRzID0gZnVuY3Rpb24gKHVuaXRzKSB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgfTtcblxuICAgIG1vbWVudC5pbnZhbGlkID0gZnVuY3Rpb24gKGZsYWdzKSB7XG4gICAgICAgIHZhciBtID0gbW9tZW50LnV0YyhOYU4pO1xuICAgICAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgZXh0ZW5kKG0uX3BmLCBmbGFncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtLl9wZi51c2VySW52YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG07XG4gICAgfTtcblxuICAgIG1vbWVudC5wYXJzZVpvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5wYXJzZVpvbmUoKTtcbiAgICB9O1xuXG4gICAgbW9tZW50LnBhcnNlVHdvRGlnaXRZZWFyID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XG4gICAgfTtcblxuICAgIG1vbWVudC5pc0RhdGUgPSBpc0RhdGU7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIE1vbWVudCBQcm90b3R5cGVcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuICAgIGV4dGVuZChtb21lbnQuZm4gPSBNb21lbnQucHJvdG90eXBlLCB7XG5cbiAgICAgICAgY2xvbmUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbHVlT2YgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gK3RoaXMuX2QgLSAoKHRoaXMuX29mZnNldCB8fCAwKSAqIDYwMDAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bml4IDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoK3RoaXMgLyAxMDAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0b1N0cmluZyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkubG9jYWxlKCdlbicpLmZvcm1hdCgnZGRkIE1NTSBERCBZWVlZIEhIOm1tOnNzIFtHTVRdWlonKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0b0RhdGUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2V0ID8gbmV3IERhdGUoK3RoaXMpIDogdGhpcy5fZDtcbiAgICAgICAgfSxcblxuICAgICAgICB0b0lTT1N0cmluZyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtID0gbW9tZW50KHRoaXMpLnV0YygpO1xuICAgICAgICAgICAgaWYgKDAgPCBtLnllYXIoKSAmJiBtLnllYXIoKSA8PSA5OTk5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBuYXRpdmUgaW1wbGVtZW50YXRpb24gaXMgfjUweCBmYXN0ZXIsIHVzZSBpdCB3aGVuIHdlIGNhblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgJ1lZWVlZWS1NTS1ERFtUXUhIOm1tOnNzLlNTU1taXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHRvQXJyYXkgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbSA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIG0ueWVhcigpLFxuICAgICAgICAgICAgICAgIG0ubW9udGgoKSxcbiAgICAgICAgICAgICAgICBtLmRhdGUoKSxcbiAgICAgICAgICAgICAgICBtLmhvdXJzKCksXG4gICAgICAgICAgICAgICAgbS5taW51dGVzKCksXG4gICAgICAgICAgICAgICAgbS5zZWNvbmRzKCksXG4gICAgICAgICAgICAgICAgbS5taWxsaXNlY29uZHMoKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1ZhbGlkIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWQodGhpcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNEU1RTaGlmdGVkIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgJiYgY29tcGFyZUFycmF5cyh0aGlzLl9hLCAodGhpcy5faXNVVEMgPyBtb21lbnQudXRjKHRoaXMuX2EpIDogbW9tZW50KHRoaXMuX2EpKS50b0FycmF5KCkpID4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhcnNpbmdGbGFncyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBleHRlbmQoe30sIHRoaXMuX3BmKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbnZhbGlkQXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wZi5vdmVyZmxvdztcbiAgICAgICAgfSxcblxuICAgICAgICB1dGMgOiBmdW5jdGlvbiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxvY2FsIDogZnVuY3Rpb24gKGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1VUQykge1xuICAgICAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzVVRDID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2VlcExvY2FsVGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YnRyYWN0KHRoaXMuX2RhdGVVdGNPZmZzZXQoKSwgJ20nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBmb3JtYXQgOiBmdW5jdGlvbiAoaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRNb21lbnQodGhpcywgaW5wdXRTdHJpbmcgfHwgbW9tZW50LmRlZmF1bHRGb3JtYXQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLnBvc3Rmb3JtYXQob3V0cHV0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBhZGQgOiBjcmVhdGVBZGRlcigxLCAnYWRkJyksXG5cbiAgICAgICAgc3VidHJhY3QgOiBjcmVhdGVBZGRlcigtMSwgJ3N1YnRyYWN0JyksXG5cbiAgICAgICAgZGlmZiA6IGZ1bmN0aW9uIChpbnB1dCwgdW5pdHMsIGFzRmxvYXQpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gbWFrZUFzKGlucHV0LCB0aGlzKSxcbiAgICAgICAgICAgICAgICB6b25lRGlmZiA9ICh0aGF0LnV0Y09mZnNldCgpIC0gdGhpcy51dGNPZmZzZXQoKSkgKiA2ZTQsXG4gICAgICAgICAgICAgICAgYW5jaG9yLCBkaWZmLCBvdXRwdXQsIGRheXNBZGp1c3Q7XG5cbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuXG4gICAgICAgICAgICBpZiAodW5pdHMgPT09ICd5ZWFyJyB8fCB1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpO1xuICAgICAgICAgICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCAvIDEyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlmZiA9IHRoaXMgLSB0aGF0O1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IHVuaXRzID09PSAnc2Vjb25kJyA/IGRpZmYgLyAxZTMgOiAvLyAxMDAwXG4gICAgICAgICAgICAgICAgICAgIHVuaXRzID09PSAnbWludXRlJyA/IGRpZmYgLyA2ZTQgOiAvLyAxMDAwICogNjBcbiAgICAgICAgICAgICAgICAgICAgdW5pdHMgPT09ICdob3VyJyA/IGRpZmYgLyAzNmU1IDogLy8gMTAwMCAqIDYwICogNjBcbiAgICAgICAgICAgICAgICAgICAgdW5pdHMgPT09ICdkYXknID8gKGRpZmYgLSB6b25lRGlmZikgLyA4NjRlNSA6IC8vIDEwMDAgKiA2MCAqIDYwICogMjQsIG5lZ2F0ZSBkc3RcbiAgICAgICAgICAgICAgICAgICAgdW5pdHMgPT09ICd3ZWVrJyA/IChkaWZmIC0gem9uZURpZmYpIC8gNjA0OGU1IDogLy8gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcsIG5lZ2F0ZSBkc3RcbiAgICAgICAgICAgICAgICAgICAgZGlmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhc0Zsb2F0ID8gb3V0cHV0IDogYWJzUm91bmQob3V0cHV0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBmcm9tIDogZnVuY3Rpb24gKHRpbWUsIHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQuZHVyYXRpb24oe3RvOiB0aGlzLCBmcm9tOiB0aW1lfSkubG9jYWxlKHRoaXMubG9jYWxlKCkpLmh1bWFuaXplKCF3aXRob3V0U3VmZml4KTtcbiAgICAgICAgfSxcblxuICAgICAgICBmcm9tTm93IDogZnVuY3Rpb24gKHdpdGhvdXRTdWZmaXgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZyb20obW9tZW50KCksIHdpdGhvdXRTdWZmaXgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNhbGVuZGFyIDogZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gY29tcGFyZSB0aGUgc3RhcnQgb2YgdG9kYXksIHZzIHRoaXMuXG4gICAgICAgICAgICAvLyBHZXR0aW5nIHN0YXJ0LW9mLXRvZGF5IGRlcGVuZHMgb24gd2hldGhlciB3ZSdyZSBsb2NhdC91dGMvb2Zmc2V0XG4gICAgICAgICAgICAvLyBvciBub3QuXG4gICAgICAgICAgICB2YXIgbm93ID0gdGltZSB8fCBtb21lbnQoKSxcbiAgICAgICAgICAgICAgICBzb2QgPSBtYWtlQXMobm93LCB0aGlzKS5zdGFydE9mKCdkYXknKSxcbiAgICAgICAgICAgICAgICBkaWZmID0gdGhpcy5kaWZmKHNvZCwgJ2RheXMnLCB0cnVlKSxcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBkaWZmIDwgLTYgPyAnc2FtZUVsc2UnIDpcbiAgICAgICAgICAgICAgICAgICAgZGlmZiA8IC0xID8gJ2xhc3RXZWVrJyA6XG4gICAgICAgICAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcbiAgICAgICAgICAgICAgICAgICAgZGlmZiA8IDEgPyAnc2FtZURheScgOlxuICAgICAgICAgICAgICAgICAgICBkaWZmIDwgMiA/ICduZXh0RGF5JyA6XG4gICAgICAgICAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5sb2NhbGVEYXRhKCkuY2FsZW5kYXIoZm9ybWF0LCB0aGlzLCBtb21lbnQobm93KSkpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzTGVhcFllYXIgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih0aGlzLnllYXIoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNEU1QgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgPiB0aGlzLmNsb25lKCkubW9udGgoMCkudXRjT2Zmc2V0KCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkYXkgOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgIHZhciBkYXkgPSB0aGlzLl9pc1VUQyA/IHRoaXMuX2QuZ2V0VVRDRGF5KCkgOiB0aGlzLl9kLmdldERheSgpO1xuICAgICAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHBhcnNlV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZChpbnB1dCAtIGRheSwgJ2QnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtb250aCA6IG1ha2VBY2Nlc3NvcignTW9udGgnLCB0cnVlKSxcblxuICAgICAgICBzdGFydE9mIDogZnVuY3Rpb24gKHVuaXRzKSB7XG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgc3dpdGNoIGludGVudGlvbmFsbHkgb21pdHMgYnJlYWsga2V5d29yZHNcbiAgICAgICAgICAgIC8vIHRvIHV0aWxpemUgZmFsbGluZyB0aHJvdWdoIHRoZSBjYXNlcy5cbiAgICAgICAgICAgIHN3aXRjaCAodW5pdHMpIHtcbiAgICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgICAgIHRoaXMubW9udGgoMCk7XG4gICAgICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICAgICAgY2FzZSAncXVhcnRlcic6XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlKDEpO1xuICAgICAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgY2FzZSAnaXNvV2Vlayc6XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgIHRoaXMuaG91cnMoMCk7XG4gICAgICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICAgICAgY2FzZSAnaG91cic6XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVzKDApO1xuICAgICAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmRzKDApO1xuICAgICAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5taWxsaXNlY29uZHMoMCk7XG4gICAgICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB3ZWVrcyBhcmUgYSBzcGVjaWFsIGNhc2VcbiAgICAgICAgICAgIGlmICh1bml0cyA9PT0gJ3dlZWsnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5KDApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1bml0cyA9PT0gJ2lzb1dlZWsnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc29XZWVrZGF5KDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBxdWFydGVycyBhcmUgYWxzbyBzcGVjaWFsXG4gICAgICAgICAgICBpZiAodW5pdHMgPT09ICdxdWFydGVyJykge1xuICAgICAgICAgICAgICAgIHRoaXMubW9udGgoTWF0aC5mbG9vcih0aGlzLm1vbnRoKCkgLyAzKSAqIDMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBlbmRPZjogZnVuY3Rpb24gKHVuaXRzKSB7XG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgICAgIGlmICh1bml0cyA9PT0gdW5kZWZpbmVkIHx8IHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydE9mKHVuaXRzKS5hZGQoMSwgKHVuaXRzID09PSAnaXNvV2VlaycgPyAnd2VlaycgOiB1bml0cykpLnN1YnRyYWN0KDEsICdtcycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzQWZ0ZXI6IGZ1bmN0aW9uIChpbnB1dCwgdW5pdHMpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dE1zO1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh0eXBlb2YgdW5pdHMgIT09ICd1bmRlZmluZWQnID8gdW5pdHMgOiAnbWlsbGlzZWNvbmQnKTtcbiAgICAgICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gbW9tZW50LmlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogbW9tZW50KGlucHV0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gK3RoaXMgPiAraW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0TXMgPSBtb21lbnQuaXNNb21lbnQoaW5wdXQpID8gK2lucHV0IDogK21vbWVudChpbnB1dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0TXMgPCArdGhpcy5jbG9uZSgpLnN0YXJ0T2YodW5pdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGlzQmVmb3JlOiBmdW5jdGlvbiAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRNcztcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModHlwZW9mIHVuaXRzICE9PSAndW5kZWZpbmVkJyA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XG4gICAgICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IG1vbWVudC5pc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IG1vbWVudChpbnB1dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICt0aGlzIDwgK2lucHV0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbnB1dE1zID0gbW9tZW50LmlzTW9tZW50KGlucHV0KSA/ICtpbnB1dCA6ICttb21lbnQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiArdGhpcy5jbG9uZSgpLmVuZE9mKHVuaXRzKSA8IGlucHV0TXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNCZXR3ZWVuOiBmdW5jdGlvbiAoZnJvbSwgdG8sIHVuaXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0FmdGVyKGZyb20sIHVuaXRzKSAmJiB0aGlzLmlzQmVmb3JlKHRvLCB1bml0cyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNTYW1lOiBmdW5jdGlvbiAoaW5wdXQsIHVuaXRzKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRNcztcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMgfHwgJ21pbGxpc2Vjb25kJyk7XG4gICAgICAgICAgICBpZiAodW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IG1vbWVudC5pc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IG1vbWVudChpbnB1dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICt0aGlzID09PSAraW5wdXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0TXMgPSArbW9tZW50KGlucHV0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKyh0aGlzLmNsb25lKCkuc3RhcnRPZih1bml0cykpIDw9IGlucHV0TXMgJiYgaW5wdXRNcyA8PSArKHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIG1pbjogZGVwcmVjYXRlKFxuICAgICAgICAgICAgICAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWluIGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcbiAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICBvdGhlciA9IG1vbWVudC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgKSxcblxuICAgICAgICBtYXg6IGRlcHJlY2F0ZShcbiAgICAgICAgICAgICAgICAnbW9tZW50KCkubWF4IGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8xNTQ4JyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXIgPSBtb21lbnQuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyID4gdGhpcyA/IHRoaXMgOiBvdGhlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICksXG5cbiAgICAgICAgem9uZSA6IGRlcHJlY2F0ZShcbiAgICAgICAgICAgICAgICAnbW9tZW50KCkuem9uZSBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50KCkudXRjT2Zmc2V0IGluc3RlYWQuICcgK1xuICAgICAgICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMTc3OScsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGlucHV0LCBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gLWlucHV0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnV0Y09mZnNldChpbnB1dCwga2VlcExvY2FsVGltZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICApLFxuXG4gICAgICAgIC8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxuICAgICAgICAvLyBhZmZlY3RpbmcgdGhlIGxvY2FsIGhvdXIuIFNvIDU6MzE6MjYgKzAzMDAgLS1bdXRjT2Zmc2V0KDIsIHRydWUpXS0tPlxuICAgICAgICAvLyA1OjMxOjI2ICswMjAwIEl0IGlzIHBvc3NpYmxlIHRoYXQgNTozMToyNiBkb2Vzbid0IGV4aXN0IHdpdGggb2Zmc2V0XG4gICAgICAgIC8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gS2VlcGluZyB0aGUgdGltZSBhY3R1YWxseSBhZGRzL3N1YnRyYWN0cyAob25lIGhvdXIpXG4gICAgICAgIC8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxuICAgICAgICAvLyBhIHNlY29uZCB0aW1lLiBJbiBjYXNlIGl0IHdhbnRzIHVzIHRvIGNoYW5nZSB0aGUgb2Zmc2V0IGFnYWluXG4gICAgICAgIC8vIF9jaGFuZ2VJblByb2dyZXNzID09IHRydWUgY2FzZSwgdGhlbiB3ZSBoYXZlIHRvIGFkanVzdCwgYmVjYXVzZVxuICAgICAgICAvLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxuICAgICAgICB1dGNPZmZzZXQgOiBmdW5jdGlvbiAoaW5wdXQsIGtlZXBMb2NhbFRpbWUpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLl9vZmZzZXQgfHwgMCxcbiAgICAgICAgICAgICAgICBsb2NhbEFkanVzdDtcbiAgICAgICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSB1dGNPZmZzZXRGcm9tU3RyaW5nKGlucHV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGlucHV0KSA8IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQgKiA2MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1VUQyAmJiBrZWVwTG9jYWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsQWRqdXN0ID0gdGhpcy5fZGF0ZVV0Y09mZnNldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBpbnB1dDtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1VUQyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsQWRqdXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQobG9jYWxBZGp1c3QsICdtJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgIT09IGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2VlcExvY2FsVGltZSB8fCB0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRPclN1YnRyYWN0RHVyYXRpb25Gcm9tTW9tZW50KHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudC5kdXJhdGlvbihpbnB1dCAtIG9mZnNldCwgJ20nKSwgMSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jaGFuZ2VJblByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudC51cGRhdGVPZmZzZXQodGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyBvZmZzZXQgOiB0aGlzLl9kYXRlVXRjT2Zmc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNMb2NhbCA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5faXNVVEM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNVdGNPZmZzZXQgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNVVEM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNVdGMgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgJiYgdGhpcy5fb2Zmc2V0ID09PSAwO1xuICAgICAgICB9LFxuXG4gICAgICAgIHpvbmVBYmJyIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcbiAgICAgICAgfSxcblxuICAgICAgICB6b25lTmFtZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1VUQyA/ICdDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZScgOiAnJztcbiAgICAgICAgfSxcblxuICAgICAgICBwYXJzZVpvbmUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdHptKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodGhpcy5fdHptKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodXRjT2Zmc2V0RnJvbVN0cmluZyh0aGlzLl9pKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBoYXNBbGlnbmVkSG91ck9mZnNldCA6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gbW9tZW50KGlucHV0KS51dGNPZmZzZXQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnV0Y09mZnNldCgpIC0gaW5wdXQpICUgNjAgPT09IDA7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF5c0luTW9udGggOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZGF5c0luTW9udGgodGhpcy55ZWFyKCksIHRoaXMubW9udGgoKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF5T2ZZZWFyIDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgZGF5T2ZZZWFyID0gcm91bmQoKG1vbWVudCh0aGlzKS5zdGFydE9mKCdkYXknKSAtIG1vbWVudCh0aGlzKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gZGF5T2ZZZWFyIDogdGhpcy5hZGQoKGlucHV0IC0gZGF5T2ZZZWFyKSwgJ2QnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBxdWFydGVyIDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IE1hdGguY2VpbCgodGhpcy5tb250aCgpICsgMSkgLyAzKSA6IHRoaXMubW9udGgoKGlucHV0IC0gMSkgKiAzICsgdGhpcy5tb250aCgpICUgMyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2Vla1llYXIgOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgIHZhciB5ZWFyID0gd2Vla09mWWVhcih0aGlzLCB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3csIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRveSkueWVhcjtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8geWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIHllYXIpLCAneScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzb1dlZWtZZWFyIDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgeWVhciA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkueWVhcjtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8geWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIHllYXIpLCAneScpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHdlZWsgOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgIHZhciB3ZWVrID0gdGhpcy5sb2NhbGVEYXRhKCkud2Vlayh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc29XZWVrIDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgd2VlayA9IHdlZWtPZlllYXIodGhpcywgMSwgNCkud2VlaztcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gd2VlayA6IHRoaXMuYWRkKChpbnB1dCAtIHdlZWspICogNywgJ2QnKTtcbiAgICAgICAgfSxcblxuICAgICAgICB3ZWVrZGF5IDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9ICh0aGlzLmRheSgpICsgNyAtIHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrLmRvdykgJSA3O1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrZGF5IDogdGhpcy5hZGQoaW5wdXQgLSB3ZWVrZGF5LCAnZCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzb1dlZWtkYXkgOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgICAgIC8vIGJlaGF2ZXMgdGhlIHNhbWUgYXMgbW9tZW50I2RheSBleGNlcHRcbiAgICAgICAgICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXG4gICAgICAgICAgICAvLyBhcyBhIHNldHRlciwgc3VuZGF5IHNob3VsZCBiZWxvbmcgdG8gdGhlIHByZXZpb3VzIHdlZWsuXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHRoaXMuZGF5KCkgfHwgNyA6IHRoaXMuZGF5KHRoaXMuZGF5KCkgJSA3ID8gaW5wdXQgOiBpbnB1dCAtIDcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGlzb1dlZWtzSW5ZZWFyIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCAxLCA0KTtcbiAgICAgICAgfSxcblxuICAgICAgICB3ZWVrc0luWWVhciA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3ZWVrSW5mbyA9IHRoaXMubG9jYWxlRGF0YSgpLl93ZWVrO1xuICAgICAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCB3ZWVrSW5mby5kb3csIHdlZWtJbmZvLmRveSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0IDogZnVuY3Rpb24gKHVuaXRzKSB7XG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW3VuaXRzXSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldCA6IGZ1bmN0aW9uICh1bml0cywgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB1bml0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB1bml0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHVuaXQgaW4gdW5pdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQodW5pdCwgdW5pdHNbdW5pdF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHModW5pdHMpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpc1t1bml0c10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1t1bml0c10odmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIElmIHBhc3NlZCBhIGxvY2FsZSBrZXksIGl0IHdpbGwgc2V0IHRoZSBsb2NhbGUgZm9yIHRoaXNcbiAgICAgICAgLy8gaW5zdGFuY2UuICBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBsb2NhbGUgY29uZmlndXJhdGlvblxuICAgICAgICAvLyB2YXJpYWJsZXMgZm9yIHRoaXMgaW5zdGFuY2UuXG4gICAgICAgIGxvY2FsZSA6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciBuZXdMb2NhbGVEYXRhO1xuXG4gICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAobmV3TG9jYWxlRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZURhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGxhbmcgOiBkZXByZWNhdGUoXG4gICAgICAgICAgICAnbW9tZW50KCkubGFuZygpIGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQsIHVzZSBtb21lbnQoKS5sb2NhbGVEYXRhKCkgdG8gZ2V0IHRoZSBsYW5ndWFnZSBjb25maWd1cmF0aW9uLiBVc2UgbW9tZW50KCkubG9jYWxlKCkgdG8gY2hhbmdlIGxhbmd1YWdlcy4nLFxuICAgICAgICAgICAgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLFxuXG4gICAgICAgIGxvY2FsZURhdGEgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9kYXRlVXRjT2Zmc2V0IDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gT24gRmlyZWZveC4yNCBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgYSBmbG9hdGluZyBwb2ludC5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L3B1bGwvMTg3MVxuICAgICAgICAgICAgcmV0dXJuIC1NYXRoLnJvdW5kKHRoaXMuX2QuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDE1KSAqIDE1O1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJhd01vbnRoU2V0dGVyKG1vbSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGRheU9mTW9udGg7XG5cbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGlzIG91dCBvZiBoZXJlIVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgIC8vIFRPRE86IEFub3RoZXIgc2lsZW50IGZhaWx1cmU/XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb207XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkYXlPZk1vbnRoID0gTWF0aC5taW4obW9tLmRhdGUoKSxcbiAgICAgICAgICAgICAgICBkYXlzSW5Nb250aChtb20ueWVhcigpLCB2YWx1ZSkpO1xuICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgJ01vbnRoJ10odmFsdWUsIGRheU9mTW9udGgpO1xuICAgICAgICByZXR1cm4gbW9tO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhd0dldHRlcihtb20sIHVuaXQpIHtcbiAgICAgICAgcmV0dXJuIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhd1NldHRlcihtb20sIHVuaXQsIHZhbHVlKSB7XG4gICAgICAgIGlmICh1bml0ID09PSAnTW9udGgnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmF3TW9udGhTZXR0ZXIobW9tLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tLl9kWydzZXQnICsgKG1vbS5faXNVVEMgPyAnVVRDJyA6ICcnKSArIHVuaXRdKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VBY2Nlc3Nvcih1bml0LCBrZWVwVGltZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJhd1NldHRlcih0aGlzLCB1bml0LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgbW9tZW50LnVwZGF0ZU9mZnNldCh0aGlzLCBrZWVwVGltZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByYXdHZXR0ZXIodGhpcywgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbW9tZW50LmZuLm1pbGxpc2Vjb25kID0gbW9tZW50LmZuLm1pbGxpc2Vjb25kcyA9IG1ha2VBY2Nlc3NvcignTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xuICAgIG1vbWVudC5mbi5zZWNvbmQgPSBtb21lbnQuZm4uc2Vjb25kcyA9IG1ha2VBY2Nlc3NvcignU2Vjb25kcycsIGZhbHNlKTtcbiAgICBtb21lbnQuZm4ubWludXRlID0gbW9tZW50LmZuLm1pbnV0ZXMgPSBtYWtlQWNjZXNzb3IoJ01pbnV0ZXMnLCBmYWxzZSk7XG4gICAgLy8gU2V0dGluZyB0aGUgaG91ciBzaG91bGQga2VlcCB0aGUgdGltZSwgYmVjYXVzZSB0aGUgdXNlciBleHBsaWNpdGx5XG4gICAgLy8gc3BlY2lmaWVkIHdoaWNoIGhvdXIgaGUgd2FudHMuIFNvIHRyeWluZyB0byBtYWludGFpbiB0aGUgc2FtZSBob3VyIChpblxuICAgIC8vIGEgbmV3IHRpbWV6b25lKSBtYWtlcyBzZW5zZS4gQWRkaW5nL3N1YnRyYWN0aW5nIGhvdXJzIGRvZXMgbm90IGZvbGxvd1xuICAgIC8vIHRoaXMgcnVsZS5cbiAgICBtb21lbnQuZm4uaG91ciA9IG1vbWVudC5mbi5ob3VycyA9IG1ha2VBY2Nlc3NvcignSG91cnMnLCB0cnVlKTtcbiAgICAvLyBtb21lbnQuZm4ubW9udGggaXMgZGVmaW5lZCBzZXBhcmF0ZWx5XG4gICAgbW9tZW50LmZuLmRhdGUgPSBtYWtlQWNjZXNzb3IoJ0RhdGUnLCB0cnVlKTtcbiAgICBtb21lbnQuZm4uZGF0ZXMgPSBkZXByZWNhdGUoJ2RhdGVzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBkYXRlIGluc3RlYWQuJywgbWFrZUFjY2Vzc29yKCdEYXRlJywgdHJ1ZSkpO1xuICAgIG1vbWVudC5mbi55ZWFyID0gbWFrZUFjY2Vzc29yKCdGdWxsWWVhcicsIHRydWUpO1xuICAgIG1vbWVudC5mbi55ZWFycyA9IGRlcHJlY2F0ZSgneWVhcnMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIHllYXIgaW5zdGVhZC4nLCBtYWtlQWNjZXNzb3IoJ0Z1bGxZZWFyJywgdHJ1ZSkpO1xuXG4gICAgLy8gYWRkIHBsdXJhbCBtZXRob2RzXG4gICAgbW9tZW50LmZuLmRheXMgPSBtb21lbnQuZm4uZGF5O1xuICAgIG1vbWVudC5mbi5tb250aHMgPSBtb21lbnQuZm4ubW9udGg7XG4gICAgbW9tZW50LmZuLndlZWtzID0gbW9tZW50LmZuLndlZWs7XG4gICAgbW9tZW50LmZuLmlzb1dlZWtzID0gbW9tZW50LmZuLmlzb1dlZWs7XG4gICAgbW9tZW50LmZuLnF1YXJ0ZXJzID0gbW9tZW50LmZuLnF1YXJ0ZXI7XG5cbiAgICAvLyBhZGQgYWxpYXNlZCBmb3JtYXQgbWV0aG9kc1xuICAgIG1vbWVudC5mbi50b0pTT04gPSBtb21lbnQuZm4udG9JU09TdHJpbmc7XG5cbiAgICAvLyBhbGlhcyBpc1V0YyBmb3IgZGV2LWZyaWVuZGxpbmVzc1xuICAgIG1vbWVudC5mbi5pc1VUQyA9IG1vbWVudC5mbi5pc1V0YztcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgRHVyYXRpb24gUHJvdG90eXBlXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiAgICBmdW5jdGlvbiBkYXlzVG9ZZWFycyAoZGF5cykge1xuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxNDYwOTcgZGF5cyAodGFraW5nIGludG8gYWNjb3VudCBsZWFwIHllYXIgcnVsZXMpXG4gICAgICAgIHJldHVybiBkYXlzICogNDAwIC8gMTQ2MDk3O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHllYXJzVG9EYXlzICh5ZWFycykge1xuICAgICAgICAvLyB5ZWFycyAqIDM2NSArIGFic1JvdW5kKHllYXJzIC8gNCkgLVxuICAgICAgICAvLyAgICAgYWJzUm91bmQoeWVhcnMgLyAxMDApICsgYWJzUm91bmQoeWVhcnMgLyA0MDApO1xuICAgICAgICByZXR1cm4geWVhcnMgKiAxNDYwOTcgLyA0MDA7XG4gICAgfVxuXG4gICAgZXh0ZW5kKG1vbWVudC5kdXJhdGlvbi5mbiA9IER1cmF0aW9uLnByb3RvdHlwZSwge1xuXG4gICAgICAgIF9idWJibGUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWlsbGlzZWNvbmRzID0gdGhpcy5fbWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgICAgIGRheXMgPSB0aGlzLl9kYXlzLFxuICAgICAgICAgICAgICAgIG1vbnRocyA9IHRoaXMuX21vbnRocyxcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fZGF0YSxcbiAgICAgICAgICAgICAgICBzZWNvbmRzLCBtaW51dGVzLCBob3VycywgeWVhcnMgPSAwO1xuXG4gICAgICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgYnViYmxlcyB1cCB2YWx1ZXMsIHNlZSB0aGUgdGVzdHMgZm9yXG4gICAgICAgICAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXG4gICAgICAgICAgICBkYXRhLm1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcyAlIDEwMDA7XG5cbiAgICAgICAgICAgIHNlY29uZHMgPSBhYnNSb3VuZChtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICAgICAgICAgIGRhdGEuc2Vjb25kcyA9IHNlY29uZHMgJSA2MDtcblxuICAgICAgICAgICAgbWludXRlcyA9IGFic1JvdW5kKHNlY29uZHMgLyA2MCk7XG4gICAgICAgICAgICBkYXRhLm1pbnV0ZXMgPSBtaW51dGVzICUgNjA7XG5cbiAgICAgICAgICAgIGhvdXJzID0gYWJzUm91bmQobWludXRlcyAvIDYwKTtcbiAgICAgICAgICAgIGRhdGEuaG91cnMgPSBob3VycyAlIDI0O1xuXG4gICAgICAgICAgICBkYXlzICs9IGFic1JvdW5kKGhvdXJzIC8gMjQpO1xuXG4gICAgICAgICAgICAvLyBBY2N1cmF0ZWx5IGNvbnZlcnQgZGF5cyB0byB5ZWFycywgYXNzdW1lIHN0YXJ0IGZyb20geWVhciAwLlxuICAgICAgICAgICAgeWVhcnMgPSBhYnNSb3VuZChkYXlzVG9ZZWFycyhkYXlzKSk7XG4gICAgICAgICAgICBkYXlzIC09IGFic1JvdW5kKHllYXJzVG9EYXlzKHllYXJzKSk7XG5cbiAgICAgICAgICAgIC8vIDMwIGRheXMgdG8gYSBtb250aFxuICAgICAgICAgICAgLy8gVE9ETyAoaXNrcmVuKTogVXNlIGFuY2hvciBkYXRlIChsaWtlIDFzdCBKYW4pIHRvIGNvbXB1dGUgdGhpcy5cbiAgICAgICAgICAgIG1vbnRocyArPSBhYnNSb3VuZChkYXlzIC8gMzApO1xuICAgICAgICAgICAgZGF5cyAlPSAzMDtcblxuICAgICAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxuICAgICAgICAgICAgeWVhcnMgKz0gYWJzUm91bmQobW9udGhzIC8gMTIpO1xuICAgICAgICAgICAgbW9udGhzICU9IDEyO1xuXG4gICAgICAgICAgICBkYXRhLmRheXMgPSBkYXlzO1xuICAgICAgICAgICAgZGF0YS5tb250aHMgPSBtb250aHM7XG4gICAgICAgICAgICBkYXRhLnllYXJzID0geWVhcnM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWJzIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gTWF0aC5hYnModGhpcy5fbWlsbGlzZWNvbmRzKTtcbiAgICAgICAgICAgIHRoaXMuX2RheXMgPSBNYXRoLmFicyh0aGlzLl9kYXlzKTtcbiAgICAgICAgICAgIHRoaXMuX21vbnRocyA9IE1hdGguYWJzKHRoaXMuX21vbnRocyk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RhdGEubWlsbGlzZWNvbmRzID0gTWF0aC5hYnModGhpcy5fZGF0YS5taWxsaXNlY29uZHMpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YS5zZWNvbmRzID0gTWF0aC5hYnModGhpcy5fZGF0YS5zZWNvbmRzKTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEubWludXRlcyA9IE1hdGguYWJzKHRoaXMuX2RhdGEubWludXRlcyk7XG4gICAgICAgICAgICB0aGlzLl9kYXRhLmhvdXJzID0gTWF0aC5hYnModGhpcy5fZGF0YS5ob3Vycyk7XG4gICAgICAgICAgICB0aGlzLl9kYXRhLm1vbnRocyA9IE1hdGguYWJzKHRoaXMuX2RhdGEubW9udGhzKTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEueWVhcnMgPSBNYXRoLmFicyh0aGlzLl9kYXRhLnllYXJzKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgd2Vla3MgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gYWJzUm91bmQodGhpcy5kYXlzKCkgLyA3KTtcbiAgICAgICAgfSxcblxuICAgICAgICB2YWx1ZU9mIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pbGxpc2Vjb25kcyArXG4gICAgICAgICAgICAgIHRoaXMuX2RheXMgKiA4NjRlNSArXG4gICAgICAgICAgICAgICh0aGlzLl9tb250aHMgJSAxMikgKiAyNTkyZTYgK1xuICAgICAgICAgICAgICB0b0ludCh0aGlzLl9tb250aHMgLyAxMikgKiAzMTUzNmU2O1xuICAgICAgICB9LFxuXG4gICAgICAgIGh1bWFuaXplIDogZnVuY3Rpb24gKHdpdGhTdWZmaXgpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSByZWxhdGl2ZVRpbWUodGhpcywgIXdpdGhTdWZmaXgsIHRoaXMubG9jYWxlRGF0YSgpKTtcblxuICAgICAgICAgICAgaWYgKHdpdGhTdWZmaXgpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSB0aGlzLmxvY2FsZURhdGEoKS5wYXN0RnV0dXJlKCt0aGlzLCBvdXRwdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkucG9zdGZvcm1hdChvdXRwdXQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZCA6IGZ1bmN0aW9uIChpbnB1dCwgdmFsKSB7XG4gICAgICAgICAgICAvLyBzdXBwb3J0cyBvbmx5IDIuMC1zdHlsZSBhZGQoMSwgJ3MnKSBvciBhZGQobW9tZW50KVxuICAgICAgICAgICAgdmFyIGR1ciA9IG1vbWVudC5kdXJhdGlvbihpbnB1dCwgdmFsKTtcblxuICAgICAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzICs9IGR1ci5fbWlsbGlzZWNvbmRzO1xuICAgICAgICAgICAgdGhpcy5fZGF5cyArPSBkdXIuX2RheXM7XG4gICAgICAgICAgICB0aGlzLl9tb250aHMgKz0gZHVyLl9tb250aHM7XG5cbiAgICAgICAgICAgIHRoaXMuX2J1YmJsZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBzdWJ0cmFjdCA6IGZ1bmN0aW9uIChpbnB1dCwgdmFsKSB7XG4gICAgICAgICAgICB2YXIgZHVyID0gbW9tZW50LmR1cmF0aW9uKGlucHV0LCB2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgLT0gZHVyLl9taWxsaXNlY29uZHM7XG4gICAgICAgICAgICB0aGlzLl9kYXlzIC09IGR1ci5fZGF5cztcbiAgICAgICAgICAgIHRoaXMuX21vbnRocyAtPSBkdXIuX21vbnRocztcblxuICAgICAgICAgICAgdGhpcy5fYnViYmxlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldCA6IGZ1bmN0aW9uICh1bml0cykge1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1t1bml0cy50b0xvd2VyQ2FzZSgpICsgJ3MnXSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFzIDogZnVuY3Rpb24gKHVuaXRzKSB7XG4gICAgICAgICAgICB2YXIgZGF5cywgbW9udGhzO1xuICAgICAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XG5cbiAgICAgICAgICAgIGlmICh1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyB0aGlzLl9taWxsaXNlY29uZHMgLyA4NjRlNTtcbiAgICAgICAgICAgICAgICBtb250aHMgPSB0aGlzLl9tb250aHMgKyBkYXlzVG9ZZWFycyhkYXlzKSAqIDEyO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bml0cyA9PT0gJ21vbnRoJyA/IG1vbnRocyA6IG1vbnRocyAvIDEyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgbWlsbGlzZWNvbmRzIHNlcGFyYXRlbHkgYmVjYXVzZSBvZiBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAoaXNzdWUgIzE4NjcpXG4gICAgICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyBNYXRoLnJvdW5kKHllYXJzVG9EYXlzKHRoaXMuX21vbnRocyAvIDEyKSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJzogcmV0dXJuIGRheXMgLyA3ICsgdGhpcy5fbWlsbGlzZWNvbmRzIC8gNjA0OGU1O1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXknOiByZXR1cm4gZGF5cyArIHRoaXMuX21pbGxpc2Vjb25kcyAvIDg2NGU1O1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdob3VyJzogcmV0dXJuIGRheXMgKiAyNCArIHRoaXMuX21pbGxpc2Vjb25kcyAvIDM2ZTU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6IHJldHVybiBkYXlzICogMjQgKiA2MCArIHRoaXMuX21pbGxpc2Vjb25kcyAvIDZlNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzogcmV0dXJuIGRheXMgKiAyNCAqIDYwICogNjAgKyB0aGlzLl9taWxsaXNlY29uZHMgLyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAvLyBNYXRoLmZsb29yIHByZXZlbnRzIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOiByZXR1cm4gTWF0aC5mbG9vcihkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkgKyB0aGlzLl9taWxsaXNlY29uZHM7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGxhbmcgOiBtb21lbnQuZm4ubGFuZyxcbiAgICAgICAgbG9jYWxlIDogbW9tZW50LmZuLmxvY2FsZSxcblxuICAgICAgICB0b0lzb1N0cmluZyA6IGRlcHJlY2F0ZShcbiAgICAgICAgICAgICd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkICcgK1xuICAgICAgICAgICAgJyhub3RpY2UgdGhlIGNhcGl0YWxzKScsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKSxcblxuICAgICAgICB0b0lTT1N0cmluZyA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9kb3JkaWxsZS9tb21lbnQtaXNvZHVyYXRpb24vYmxvYi9tYXN0ZXIvbW9tZW50Lmlzb2R1cmF0aW9uLmpzXG4gICAgICAgICAgICB2YXIgeWVhcnMgPSBNYXRoLmFicyh0aGlzLnllYXJzKCkpLFxuICAgICAgICAgICAgICAgIG1vbnRocyA9IE1hdGguYWJzKHRoaXMubW9udGhzKCkpLFxuICAgICAgICAgICAgICAgIGRheXMgPSBNYXRoLmFicyh0aGlzLmRheXMoKSksXG4gICAgICAgICAgICAgICAgaG91cnMgPSBNYXRoLmFicyh0aGlzLmhvdXJzKCkpLFxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBNYXRoLmFicyh0aGlzLm1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgICAgc2Vjb25kcyA9IE1hdGguYWJzKHRoaXMuc2Vjb25kcygpICsgdGhpcy5taWxsaXNlY29uZHMoKSAvIDEwMDApO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYXNTZWNvbmRzKCkpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGFzIEMjJ3MgKE5vZGEpIGFuZCBweXRob24gKGlzb2RhdGUpLi4uXG4gICAgICAgICAgICAgICAgLy8gYnV0IG5vdCBvdGhlciBKUyAoZ29vZy5kYXRlKVxuICAgICAgICAgICAgICAgIHJldHVybiAnUDBEJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmFzU2Vjb25kcygpIDwgMCA/ICctJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgJ1AnICtcbiAgICAgICAgICAgICAgICAoeWVhcnMgPyB5ZWFycyArICdZJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgKG1vbnRocyA/IG1vbnRocyArICdNJyA6ICcnKSArXG4gICAgICAgICAgICAgICAgKGRheXMgPyBkYXlzICsgJ0QnIDogJycpICtcbiAgICAgICAgICAgICAgICAoKGhvdXJzIHx8IG1pbnV0ZXMgfHwgc2Vjb25kcykgPyAnVCcgOiAnJykgK1xuICAgICAgICAgICAgICAgIChob3VycyA/IGhvdXJzICsgJ0gnIDogJycpICtcbiAgICAgICAgICAgICAgICAobWludXRlcyA/IG1pbnV0ZXMgKyAnTScgOiAnJykgK1xuICAgICAgICAgICAgICAgIChzZWNvbmRzID8gc2Vjb25kcyArICdTJyA6ICcnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBsb2NhbGVEYXRhIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICAgICAgfSxcblxuICAgICAgICB0b0pTT04gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b0lTT1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBtb21lbnQuZHVyYXRpb24uZm4udG9TdHJpbmcgPSBtb21lbnQuZHVyYXRpb24uZm4udG9JU09TdHJpbmc7XG5cbiAgICBmdW5jdGlvbiBtYWtlRHVyYXRpb25HZXR0ZXIobmFtZSkge1xuICAgICAgICBtb21lbnQuZHVyYXRpb24uZm5bbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3IgKGkgaW4gdW5pdE1pbGxpc2Vjb25kRmFjdG9ycykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcCh1bml0TWlsbGlzZWNvbmRGYWN0b3JzLCBpKSkge1xuICAgICAgICAgICAgbWFrZUR1cmF0aW9uR2V0dGVyKGkudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb21lbnQuZHVyYXRpb24uZm4uYXNNaWxsaXNlY29uZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzKCdtcycpO1xuICAgIH07XG4gICAgbW9tZW50LmR1cmF0aW9uLmZuLmFzU2Vjb25kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXMoJ3MnKTtcbiAgICB9O1xuICAgIG1vbWVudC5kdXJhdGlvbi5mbi5hc01pbnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzKCdtJyk7XG4gICAgfTtcbiAgICBtb21lbnQuZHVyYXRpb24uZm4uYXNIb3VycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXMoJ2gnKTtcbiAgICB9O1xuICAgIG1vbWVudC5kdXJhdGlvbi5mbi5hc0RheXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzKCdkJyk7XG4gICAgfTtcbiAgICBtb21lbnQuZHVyYXRpb24uZm4uYXNXZWVrcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXMoJ3dlZWtzJyk7XG4gICAgfTtcbiAgICBtb21lbnQuZHVyYXRpb24uZm4uYXNNb250aHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzKCdNJyk7XG4gICAgfTtcbiAgICBtb21lbnQuZHVyYXRpb24uZm4uYXNZZWFycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXMoJ3knKTtcbiAgICB9O1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBEZWZhdWx0IExvY2FsZVxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4gICAgLy8gU2V0IGRlZmF1bHQgbG9jYWxlLCBvdGhlciBsb2NhbGUgd2lsbCBpbmhlcml0IGZyb20gRW5nbGlzaC5cbiAgICBtb21lbnQubG9jYWxlKCdlbicsIHtcbiAgICAgICAgb3JkaW5hbFBhcnNlOiAvXFxkezEsMn0odGh8c3R8bmR8cmQpLyxcbiAgICAgICAgb3JkaW5hbCA6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBiID0gbnVtYmVyICUgMTAsXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRvSW50KG51bWJlciAlIDEwMCAvIDEwKSA9PT0gMSkgPyAndGgnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMSkgPyAnc3QnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMikgPyAnbmQnIDpcbiAgICAgICAgICAgICAgICAoYiA9PT0gMykgPyAncmQnIDogJ3RoJztcbiAgICAgICAgICAgIHJldHVybiBudW1iZXIgKyBvdXRwdXQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qIEVNQkVEX0xPQ0FMRVMgKi9cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgRXhwb3NpbmcgTW9tZW50XG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZnVuY3Rpb24gbWFrZUdsb2JhbChzaG91bGREZXByZWNhdGUpIHtcbiAgICAgICAgLypnbG9iYWwgZW5kZXI6ZmFsc2UgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBlbmRlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvbGRHbG9iYWxNb21lbnQgPSBnbG9iYWxTY29wZS5tb21lbnQ7XG4gICAgICAgIGlmIChzaG91bGREZXByZWNhdGUpIHtcbiAgICAgICAgICAgIGdsb2JhbFNjb3BlLm1vbWVudCA9IGRlcHJlY2F0ZShcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzc2luZyBNb21lbnQgdGhyb3VnaCB0aGUgZ2xvYmFsIHNjb3BlIGlzICcgK1xuICAgICAgICAgICAgICAgICAgICAnZGVwcmVjYXRlZCwgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhbiB1cGNvbWluZyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ3JlbGVhc2UuJyxcbiAgICAgICAgICAgICAgICAgICAgbW9tZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbFNjb3BlLm1vbWVudCA9IG1vbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbW1vbkpTIG1vZHVsZSBpcyBkZWZpbmVkXG4gICAgaWYgKGhhc01vZHVsZSkge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IG1vbWVudDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSkge1xuICAgICAgICAgICAgaWYgKG1vZHVsZS5jb25maWcgJiYgbW9kdWxlLmNvbmZpZygpICYmIG1vZHVsZS5jb25maWcoKS5ub0dsb2JhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIHJlbGVhc2UgdGhlIGdsb2JhbCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIGdsb2JhbFNjb3BlLm1vbWVudCA9IG9sZEdsb2JhbE1vbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudDtcbiAgICAgICAgfSk7XG4gICAgICAgIG1ha2VHbG9iYWwodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWFrZUdsb2JhbCgpO1xuICAgIH1cbn0pLmNhbGwodGhpcyk7XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG52YXIgcmVkdWNlID0gcmVxdWlyZSgncmVkdWNlJyk7XG5cbi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxudmFyIHJvb3QgPSAndW5kZWZpbmVkJyA9PSB0eXBlb2Ygd2luZG93XG4gID8gdGhpc1xuICA6IHdpbmRvdztcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIG5vb3AoKXt9O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgaG9zdCBvYmplY3QsXG4gKiB3ZSBkb24ndCB3YW50IHRvIHNlcmlhbGl6ZSB0aGVzZSA6KVxuICpcbiAqIFRPRE86IGZ1dHVyZSBwcm9vZiwgbW92ZSB0byBjb21wb2VudCBsYW5kXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzSG9zdChvYmopIHtcbiAgdmFyIHN0ciA9IHt9LnRvU3RyaW5nLmNhbGwob2JqKTtcblxuICBzd2l0Y2ggKHN0cikge1xuICAgIGNhc2UgJ1tvYmplY3QgRmlsZV0nOlxuICAgIGNhc2UgJ1tvYmplY3QgQmxvYl0nOlxuICAgIGNhc2UgJ1tvYmplY3QgRm9ybURhdGFdJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbmZ1bmN0aW9uIGdldFhIUigpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAmJiAoJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciB0cmltID0gJycudHJpbVxuICA/IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMudHJpbSgpOyB9XG4gIDogZnVuY3Rpb24ocykgeyByZXR1cm4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTsgfTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChudWxsICE9IG9ialtrZXldKSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuIC8qKlxuICAqIFBhcnNlIHRoZSBnaXZlbiB4LXd3dy1mb3JtLXVybGVuY29kZWQgYHN0cmAuXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICogQHJldHVybiB7T2JqZWN0fVxuICAqIEBhcGkgcHJpdmF0ZVxuICAqL1xuXG5mdW5jdGlvbiBwYXJzZVN0cmluZyhzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgdmFyIHBhcnRzO1xuICB2YXIgcGFpcjtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcGFydHMgPSBwYWlyLnNwbGl0KCc9Jyk7XG4gICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzFdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRXhwb3NlIHBhcnNlci5cbiAqL1xuXG5yZXF1ZXN0LnBhcnNlU3RyaW5nID0gcGFyc2VTdHJpbmc7XG5cbi8qKlxuICogRGVmYXVsdCBNSU1FIHR5cGUgbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqL1xuXG5yZXF1ZXN0LnR5cGVzID0ge1xuICBodG1sOiAndGV4dC9odG1sJyxcbiAganNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICB4bWw6ICdhcHBsaWNhdGlvbi94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0nOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHNlcmlhbGl6ZSxcbiAgICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5zdHJpbmdpZnlcbiB9O1xuXG4gLyoqXG4gICogRGVmYXVsdCBwYXJzZXJzLlxuICAqXG4gICogICAgIHN1cGVyYWdlbnQucGFyc2VbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24oc3RyKXtcbiAgKiAgICAgICByZXR1cm4geyBvYmplY3QgcGFyc2VkIGZyb20gc3RyIH07XG4gICogICAgIH07XG4gICpcbiAgKi9cblxucmVxdWVzdC5wYXJzZSA9IHtcbiAgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6IHBhcnNlU3RyaW5nLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04ucGFyc2Vcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGhlYWRlciBgc3RyYCBpbnRvXG4gKiBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgbWFwcGVkIGZpZWxkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZUhlYWRlcihzdHIpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KC9cXHI/XFxuLyk7XG4gIHZhciBmaWVsZHMgPSB7fTtcbiAgdmFyIGluZGV4O1xuICB2YXIgbGluZTtcbiAgdmFyIGZpZWxkO1xuICB2YXIgdmFsO1xuXG4gIGxpbmVzLnBvcCgpOyAvLyB0cmFpbGluZyBDUkxGXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIG1pbWUgdHlwZSBmb3IgdGhlIGdpdmVuIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHR5cGUoc3RyKXtcbiAgcmV0dXJuIHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gaGVhZGVyIGZpZWxkIHBhcmFtZXRlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyYW1zKHN0cil7XG4gIHJldHVybiByZWR1Y2Uoc3RyLnNwbGl0KC8gKjsgKi8pLCBmdW5jdGlvbihvYmosIHN0cil7XG4gICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKj0gKi8pXG4gICAgICAsIGtleSA9IHBhcnRzLnNoaWZ0KClcbiAgICAgICwgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICAgIGlmIChrZXkgJiYgdmFsKSBvYmpba2V5XSA9IHZhbDtcbiAgICByZXR1cm4gb2JqO1xuICB9LCB7fSk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHRoaXMucmVxID0gcmVxO1xuICB0aGlzLnhociA9IHRoaXMucmVxLnhocjtcbiAgdGhpcy50ZXh0ID0gdGhpcy5yZXEubWV0aG9kICE9J0hFQUQnIFxuICAgICA/IHRoaXMueGhyLnJlc3BvbnNlVGV4dCBcbiAgICAgOiBudWxsO1xuICB0aGlzLnNldFN0YXR1c1Byb3BlcnRpZXModGhpcy54aHIuc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIC8vIGdldEFsbFJlc3BvbnNlSGVhZGVycyBzb21ldGltZXMgZmFsc2VseSByZXR1cm5zIFwiXCIgZm9yIENPUlMgcmVxdWVzdHMsIGJ1dFxuICAvLyBnZXRSZXNwb25zZUhlYWRlciBzdGlsbCB3b3Jrcy4gc28gd2UgZ2V0IGNvbnRlbnQtdHlwZSBldmVuIGlmIGdldHRpbmdcbiAgLy8gb3RoZXIgaGVhZGVycyBmYWlscy5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICB0aGlzLnNldEhlYWRlclByb3BlcnRpZXModGhpcy5oZWFkZXIpO1xuICB0aGlzLmJvZHkgPSB0aGlzLnJlcS5tZXRob2QgIT0gJ0hFQUQnXG4gICAgPyB0aGlzLnBhcnNlQm9keSh0aGlzLnRleHQpXG4gICAgOiBudWxsO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gIC8vIGNvbnRlbnQtdHlwZVxuICB2YXIgY3QgPSB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gIHRoaXMudHlwZSA9IHR5cGUoY3QpO1xuXG4gIC8vIHBhcmFtc1xuICB2YXIgb2JqID0gcGFyYW1zKGN0KTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikgdGhpc1trZXldID0gb2JqW2tleV07XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnBhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cil7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiBzdHIubGVuZ3RoXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAvLyBzdGF0dXMgLyBjbGFzc1xuICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAvLyBiYXNpY3NcbiAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgIDogZmFsc2U7XG5cbiAgLy8gc3VnYXJcbiAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cyB8fCAxMjIzID09IHN0YXR1cztcbiAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbiAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgRW1pdHRlci5jYWxsKHRoaXMpO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307XG4gIHRoaXMuX2hlYWRlciA9IHt9O1xuICB0aGlzLm9uKCdlbmQnLCBmdW5jdGlvbigpe1xuICAgIHZhciBlcnIgPSBudWxsO1xuICAgIHZhciByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTsgXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTtcbiAgICB9XG5cbiAgICBzZWxmLmNhbGxiYWNrKGVyciwgcmVzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbihmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogU2V0IHRpbWVvdXQgdG8gYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24obXMpe1xuICB0aGlzLl90aW1lb3V0ID0gbXM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLl90aW1lb3V0ID0gMDtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5hYm9ydGVkKSByZXR1cm47XG4gIHRoaXMuYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyLmFib3J0KCk7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZ2V0SGVhZGVyID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFzc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzKXtcbiAgdmFyIHN0ciA9IGJ0b2EodXNlciArICc6JyArIHBhc3MpO1xuICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgc3RyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbipcbiogRXhhbXBsZXM6XG4qXG4qICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4qICAgICAucXVlcnkoJ3NpemU9MTAnKVxuKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuKlxuKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiogQGFwaSBwdWJsaWNcbiovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcbiAqIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHRoaXMuX2Zvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIHRoaXMuX2Zvcm1EYXRhLmFwcGVuZChuYW1lLCB2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYGZpbGVuYW1lYC5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5hdHRhY2gobmV3IEJsb2IoWyc8YSBpZD1cImFcIj48YiBpZD1cImJcIj5oZXkhPC9iPjwvYT4nXSwgeyB0eXBlOiBcInRleHQvaHRtbFwifSkpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24oZmllbGQsIGZpbGUsIGZpbGVuYW1lKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkgdGhpcy5fZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgdGhpcy5fZm9ybURhdGEuYXBwZW5kKGZpZWxkLCBmaWxlLCBmaWxlbmFtZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBxdWVyeXN0cmluZ1xuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG11bHRpcGxlIGRhdGEgXCJ3cml0ZXNcIlxuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuc2VuZCh7IHNlYXJjaDogJ3F1ZXJ5JyB9KVxuICogICAgICAgICAuc2VuZCh7IHJhbmdlOiAnMS4uNScgfSlcbiAqICAgICAgICAgLnNlbmQoeyBvcmRlcjogJ2Rlc2MnIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIG9iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcblxuICAvLyBtZXJnZVxuICBpZiAob2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIW9iaikgcmV0dXJuIHRoaXM7XG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgdmFyIGZuID0gdGhpcy5fY2FsbGJhY2s7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIGlmICgyID09IGZuLmxlbmd0aCkgcmV0dXJuIGZuKGVyciwgcmVzKTtcbiAgaWYgKGVycikgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICBmbihyZXMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB4LWRvbWFpbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudGltZW91dEVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCd0aW1lb3V0IG9mICcgKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHMgPSBmdW5jdGlvbigpe1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gdGhpcy54aHIgPSBnZXRYSFIoKTtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5fcXVlcnkuam9pbignJicpO1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICAvLyBzdG9yZSBjYWxsYmFja1xuICB0aGlzLl9jYWxsYmFjayA9IGZuIHx8IG5vb3A7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIGlmICg0ICE9IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgaWYgKDAgPT0geGhyLnN0YXR1cykge1xuICAgICAgaWYgKHNlbGYuYWJvcnRlZCkgcmV0dXJuIHNlbGYudGltZW91dEVycm9yKCk7XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgaWYgKHhoci51cGxvYWQpIHtcbiAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihlKXtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gdGltZW91dFxuICBpZiAodGltZW91dCAmJiAhdGhpcy5fdGltZXIpIHtcbiAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHNlbGYuYWJvcnQoKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIGlmIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QocXVlcnkpO1xuICAgIHRoaXMudXJsICs9IH50aGlzLnVybC5pbmRleE9mKCc/JylcbiAgICAgID8gJyYnICsgcXVlcnlcbiAgICAgIDogJz8nICsgcXVlcnk7XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICgnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIWlzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVt0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyldO1xuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuICB4aHIuc2VuZChkYXRhKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdGAuXG4gKi9cblxucmVxdWVzdC5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBJc3N1ZSBhIHJlcXVlc3Q6XG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgcmVxdWVzdCgnR0VUJywgJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycsIGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB1cmwgb3IgY2FsbGJhY2tcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmRlbCA9IGZ1bmN0aW9uKHVybCwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3Q7XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICBmdW5jdGlvbiBvbigpIHtcbiAgICBzZWxmLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCJcbi8qKlxuICogUmVkdWNlIGBhcnJgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge01peGVkfSBpbml0aWFsXG4gKlxuICogVE9ETzogY29tYmF0aWJsZSBlcnJvciBoYW5kbGluZz9cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgZm4sIGluaXRpYWwpeyAgXG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGN1cnIgPSBhcmd1bWVudHMubGVuZ3RoID09IDNcbiAgICA/IGluaXRpYWxcbiAgICA6IGFycltpZHgrK107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGN1cnIgPSBmbi5jYWxsKG51bGwsIGN1cnIsIGFycltpZHhdLCArK2lkeCwgYXJyKTtcbiAgfVxuICBcbiAgcmV0dXJuIGN1cnI7XG59OyIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJob3N0XCI6IFwiMC4wLjAuMFwiLFxuICBcInBvcnRcIjogMzAwMCxcbiAgXCJyZW1vdGluZ1wiOiB7XG4gICAgXCJjb250ZXh0XCI6IHtcbiAgICAgIFwiZW5hYmxlSHR0cENvbnRleHRcIjogZmFsc2VcbiAgICB9LFxuICAgIFwicmVzdFwiOiB7XG4gICAgICBcIm5vcm1hbGl6ZUh0dHBQYXRoXCI6IGZhbHNlLFxuICAgICAgXCJ4bWxcIjogZmFsc2VcbiAgICB9LFxuICAgIFwianNvblwiOiB7XG4gICAgICBcInN0cmljdFwiOiBmYWxzZSxcbiAgICAgIFwibGltaXRcIjogXCIxMDBrYlwiXG4gICAgfSxcbiAgICBcInVybGVuY29kZWRcIjoge1xuICAgICAgXCJleHRlbmRlZFwiOiB0cnVlLFxuICAgICAgXCJsaW1pdFwiOiBcIjEwMGtiXCJcbiAgICB9LFxuICAgIFwiY29yc1wiOiB7XG4gICAgICBcIm9yaWdpblwiOiB0cnVlLFxuICAgICAgXCJjcmVkZW50aWFsc1wiOiB0cnVlXG4gICAgfSxcbiAgICBcImVycm9ySGFuZGxlclwiOiB7XG4gICAgICBcImRpc2FibGVTdGFja1RyYWNlXCI6IGZhbHNlXG4gICAgfVxuICB9XG59XG4iXX0=
