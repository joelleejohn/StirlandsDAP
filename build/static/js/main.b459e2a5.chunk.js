(this.webpackJsonpstirlandscricket=this.webpackJsonpstirlandscricket||[]).push([[0],{372:function(e,t,a){e.exports=a(471)},377:function(e,t,a){},469:function(e,t,a){e.exports=a.p+"static/media/logo.ee7cd8ed.svg"},470:function(e,t,a){},471:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(17),i=a.n(o),c=(a(377),a(44)),s=a.n(c),l=a(81),u=a(21),d=a(18),p=a(30),h=a(25),m=a(52),g=a(31),f=a(93),b=a(4),v=a(95),y=a(249),O=a(26),j=a(145),E=a(250),w=a.n(E),k=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={data:a.props.data,columns:a.props.columns,sort:a.props.sort,user:a.props.user},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){if(void 0===this.state.data||void 0===this.state.columns)return r.a.createElement("div",{id:"noData"},r.a.createElement("p",null,"No data has been found!"));var e,t=this.state.data,a=this.state.columns.map((function(e){var t=Object.entries(j).find((function(t){var a=Object(O.a)(t,2),n=a[0];a[1];return n.toLowerCase()===e.icon}))[1];return Object(y.a)({field:e.key,headerStyle:{textAlign:"center"},title:r.a.createElement("span",{class:"columnHeader"},r.a.createElement(t,null),e.displayName)},null!==e.datatype&&"icon"!==e.datatype&&{type:e.datatype},{},"icon"===e.datatype&&{type:"boolean",render:function(a){return function(a,n){return 1===a[e.key]?r.a.createElement(t,null):null}(a,e.icon)}},{},null!==e.sort&&{defaultSort:1===e.sort?"asc":"desc"},{},e.key.endsWith("id")&&{hidden:!0},{},("numeric"===e.datatype||"icon"===e.datatype)&&{cellStyle:{textAlign:"center"}})}));return"Administrator"===(null===(e=this.state.user)||void 0===e?void 0:e.rfuserrole)&&this.props.allowEdit?r.a.createElement(w.a,{columns:a,data:t,title:this.props.title,editable:Object(y.a)({},this.props.editable),sortable:!0}):r.a.createElement(w.a,{columns:a,data:t,title:this.props.title})}}]),t}(n.Component);k.style={noData:{position:"absolute",fontSize:"20px"}};var x=function(){function e(){Object(u.a)(this,e)}return Object(d.a)(e,null,[{key:"ajaxPost",value:function(){var e=Object(l.a)(s.a.mark((function e(t,a){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={},a.append("queryMethod",t),e.next=4,fetch("https://bsch-jjohn1.chi.ac.uk/DAP522/src/api/dbInferface.php",{method:"POST",body:a,credentials:"same-origin"}).then(function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:n=e.sent;case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 4:return e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"checkAuthentication",value:function(){var t=Object(l.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.ajaxPost("isLoggedIn",new FormData);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}]),e}(),A=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={isLoggedIn:a.props.auth.isAuthenticated,data:void 0,columns:void 0,loadGrid:!1},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.ajaxPost("getAllPlayers",new FormData).then((function(e){console.log(e),t=e}));case 2:this.setState({data:t.data,columns:t.columns,loadGrid:!0});case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return console.log("props before grid load"),console.log(this.props),this.state.loadGrid?r.a.createElement(k,{user:this.props.auth.user,data:this.state.data,columns:this.state.columns,allowEdit:!0,title:"Active players"}):r.a.createElement("p",null,"No data yet")}}]),t}(n.Component),C=Object(v.g)(A),S=a(350),D=a(351),N=a(473),L=a(504),P=a(334),I=a(109),F=a(479),T=a(344),B=a(5),R=a(63),G=(a(469),function(e){function t(){return Object(u.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return console.log("Called Authenticate Render"),this.props.isAuthenticated?r.a.createElement("div",null,"Not Authenticated"):r.a.createElement("div",null,"Authenticated")}}]),t}(n.Component)),M=a(498),W=a(500),z=a(245),U=a(329),q=a(499),H=a(501),J=a(331),$=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(p.a)(this,Object(h.a)(t).call(this))).state={username:null,password:null,isLoggedIn:!1,loginFailed:null},e.handleLoginClick=e.handleLoginClick.bind(Object(m.a)(e)),e}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.checkAuthentication().then((function(e){console.log(e),t=e}));case 2:this.setState({isLoggedIn:t.result.isAuthenticated});case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleLoginClick",value:function(e){var t=this,a=new FormData;Object.keys(this.state).forEach((function(e){return a.append(e,t.state[e])})),x.ajaxPost("login",a).then((function(e){console.log(e),t.setState({isLoggedIn:e.result.isAuthenticated,loginFailed:!e.result.isAuthenticated})}))}},{key:"render",value:function(){var e=this,t=this.props,a=t.history,n=t.classes;this.state.isLoggedIn&&a.push("/");var o={step:300,className:n.formControl},i={className:n.inputLabel,required:!0,color:"primary"};this.state.loginFailed;return r.a.createElement(H.a,{className:n.grid},r.a.createElement(M.a,null,r.a.createElement(W.a,null,r.a.createElement("form",{className:n.form},r.a.createElement(z.a,null,r.a.createElement(U.a,{error:this.state.loginFailed,InputLabelProps:i,label:"Username",inputProps:o,className:n.formControl,id:"username",name:"usernmae",placeholder:"Enter Username",onChange:function(t){e.setState({username:t.target.value})}})),r.a.createElement(z.a,null,r.a.createElement(U.a,{error:this.state.loginFailed,InputLabelProps:i,label:"Password",inputProps:o,className:n.formControl,id:"password",name:"password",type:"password",placeholder:"Enter password here",onChange:function(t){return e.setState({password:t.target.value})}})),r.a.createElement(z.a,null))),r.a.createElement(q.a,null,r.a.createElement(J.a,{className:n.loginButton,onClick:function(t){return e.handleLoginClick(t)}},"Login"))))}}]),t}(n.Component);$.style=function(e){return{grid:{display:"grid",placeContent:"center",placeSelf:"center",height:"100%",width:"100%"},form:{display:"grid",gridAutoFlow:"row",gap:"1.5rem",height:"min-content"},loginButton:{padding:"5px",borderRadius:"5px"},formControl:{padding:"2rem",borderRadius:"5px"},inputLabel:{fontSize:"1.2rem"}}};var K=Object(v.g)(Object(T.a)(Object(B.a)($.style)($))),Q=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(p.a)(this,Object(h.a)(t).call(this,e))).state={isAuthenticated:a.props.isAuthenticated,user:a.props.user,drawerOpen:a.props.drawerOpen,toggle:a.props.drawerTrigger},a.toggleDrawer=function(){return a.props.drawerTrigger},a.toggleDrawer=a.toggleDrawer.bind(Object(m.a)(a)),a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"ProtectedRoute",value:function(e){var t=e.children,a=e.isAuthenticated,n=Object(b.a)(e,["children","isAuthenticated"]);return r.a.createElement(v.b,Object.assign({},n,{render:function(e){var n=e.location;return a?t:r.a.createElement(v.a,{to:{pathname:"/login",state:{from:n}}})}}))}},{key:"render",value:function(){var e=this.props,t=(e.history,e.classes);function a(e){var t=e.icon,a=e.primary,n=e.to,o=e.onClick,i=r.a.useMemo((function(){return r.a.forwardRef((function(e,t){return r.a.createElement(f.b,Object.assign({ref:t,to:n},e))}))}),[n]);return r.a.createElement("li",{onClick:o},r.a.createElement(N.a,{component:i},t?r.a.createElement(L.a,null,t):null,r.a.createElement(P.a,{primary:a})))}return r.a.createElement("div",{className:t.grid},r.a.createElement(R.a,{open:this.props.drawerOpen},r.a.createElement(I.a,{elevation:0},r.a.createElement(F.a,null,r.a.createElement(a,{primary:"Home",to:"/",icon:r.a.createElement(S.a,null),onClick:this.props.drawerTrigger}),r.a.createElement(a,{primary:"Protected",to:"/authenticate",icon:r.a.createElement(D.a,null),onClick:this.props.drawerTrigger})))),r.a.createElement(v.d,null,r.a.createElement(v.b,{exact:!0,path:"/"},r.a.createElement(C,{auth:{isAuthenticated:this.state.isAuthenticated,user:this.state.user}})),r.a.createElement(this.ProtectedRoute,{path:"/authenticate",isAuthenticated:this.state.isAuthenticated},r.a.createElement(G,null)),r.a.createElement(v.b,{exact:!0,path:"/login"},r.a.createElement(K,null))))}}]),t}(n.Component);Q.style=function(e){return{grid:{placeSelf:"center",height:"100%",width:"100%"}}};var V=Object(v.g)(Object(T.a)(Object(B.a)(Q.style)(Q))),X=a(349),Y=a(90),Z=a(244),_=a(503),ee=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={isLoggedIn:a.props.isAuthenticated,user:a.props.user},a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e,t=this.props.classes;return e=this.state.isLoggedIn?r.a.createElement(I.a,{className:t.paper,elevation:3},r.a.createElement(Y.a,{component:"span",className:t.loggedInText},"Logged in as ",this.state.user.username),r.a.createElement(Z.a,{component:_.a,to:"/",onClick:this.props.logout},r.a.createElement(X.a,null))):r.a.createElement("div",null,r.a.createElement(_.a,{component:f.b,to:"/login",className:t.lb},r.a.createElement(J.a,{className:t.loginButton},"login"))),e}}]),t}(n.Component);ee.style=function(e){return{lb:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,textDecoration:"none"},loginButton:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,textDecoration:"none"},loggedInText:{maxWidth:"100%",color:e.palette.secondary.contrastText},paper:{backgroundColor:e.palette.secondary.main,height:"2rem",width:"14rem",placeContent:"center",alignContent:"center",alignItems:"center",display:"grid",gridAutoFlow:"column"}}};var te=Object(T.a)(Object(B.a)(ee.style)(ee)),ae=a(368),ne=a(310),re=a(502),oe=a(496),ie=a(497),ce=a(314),se=(a(470),a(122)),le=a(128),ue=a(125),de=Object(se.a)({palette:{primary:{main:le.a[700]},secondary:{main:ue.a[500]}}}),pe=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(p.a)(this,Object(h.a)(t).call(this,e))).state={isAuthenticated:null,user:null,open:!0,drawerOpen:!1},a.handleDrawerState=a.handleDrawerState.bind(Object(m.a)(a)),a.logout=a.logout.bind(Object(m.a)(a)),a}return Object(g.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.checkAuthentication().then((function(e){console.log(e),t=e}));case 2:console.log(t),this.setState({isAuthenticated:t.result.isAuthenticated,user:t.result.user});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleDrawerState",value:function(){this.setState({drawerOpen:!this.state.drawerOpen})}},{key:"logout",value:function(){x.ajaxPost("logout",new FormData).then((function(e){return e})),this.forceUpdate()}},{key:"render",value:function(){var e=this,t=this.props.classes;return null===this.state.isAuthenticated?r.a.createElement(ae.a,{className:t.backdrop,open:this.state.open,onClick:function(){e.setState({open:!1})}},r.a.createElement(ne.a,{color:"inherit"})):(console.log(de.palette.primary),r.a.createElement(re.a,null,r.a.createElement(oe.a,{theme:de},r.a.createElement(f.a,{basename:"DAP522/assignment/"},r.a.createElement(ie.a,{position:"static"},r.a.createElement(ce.a,null,r.a.createElement(Z.a,{className:t.menuButton,edge:"start",color:"inherit","aria-label":"menu",onClick:this.handleDrawerState},r.a.createElement(S.a,null)),r.a.createElement(Y.a,{className:t.title,variant:"h6"}," Stirlands Cricket Club "),r.a.createElement(te,{logout:this.logout,isAuthenticated:this.state.isAuthenticated,user:this.state.user}))),r.a.createElement("div",{className:"rootGrid"},r.a.createElement(V,{drawerOpen:this.state.drawerOpen,drawerTrigger:this.handleDrawerState,className:t.root,isAuthenticated:this.state.isAuthenticated,user:this.state.user}))))))}}]),t}(n.Component),he=Object(B.a)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de;return{root:{background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"black",height:48,padding:"0 30px",display:"grid",gridAutoFlow:"column"},backdrop:{zIndex:100,color:"#999"},baseGrid:{backgroundColor:"rgb(100, 100, 100)",display:"grid",gridTemplateColumns:"1fr 3fr"},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}))(pe);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(he,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[372,1,2]]]);
//# sourceMappingURL=main.b459e2a5.chunk.js.map