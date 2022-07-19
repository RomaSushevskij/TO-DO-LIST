(this["webpackJsonpit-incubator-todolist-ts-01"]=this["webpackJsonpit-incubator-todolist-ts-01"]||[]).push([[0],{115:function(t,e,r){t.exports={textField:"InputWithButton_textField__3ozey"}},117:function(t,e,r){t.exports={tasksWrapper:"TaskMap_tasksWrapper__1b9PD"}},142:function(t,e,r){},167:function(t,e,r){"use strict";r.r(e);var a,n,s,c=r(0),i=r.n(c),o=r(32),u=r.n(o),l=(r(142),r(90)),d=r.n(l),p=r(231),b=r(232),f=r(230),j=r(229),x=r(228),h=r(122),O=r.n(h),g=r(233),k=r(22),m=r(15),v=r.n(m),I=r(113),y=r.n(I);!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(a||(a={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(n||(n={})),function(t){t[t.success=0]="success",t[t.error=1]="error",t[t.captchaIsRequired=10]="captchaIsRequired"}(s||(s={}));var C=y.a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"api-key":"10732160-f45a-4879-8e6f-b2819bc13c24"}}),w=function(){return C.get("todo-lists").then((function(t){return t.data}))},T=function(t){return C.post("todo-lists",{title:t}).then((function(t){return t.data}))},D=function(t){return C.delete("todo-lists/".concat(t)).then((function(t){return t.data}))},E=function(t,e){return C.put("todo-lists/".concat(t),{title:e}).then((function(t){return t.data}))},S=function(t){return C.get("todo-lists/".concat(t,"/tasks")).then((function(t){return t.data}))},_=function(t,e){return C.post("todo-lists/".concat(t,"/tasks"),{title:e}).then((function(t){return t.data}))},L=function(t,e){return C.delete("todo-lists/".concat(t,"/tasks/").concat(e)).then((function(t){return t.data}))},F=function(t,e,r){return C.put("todo-lists/".concat(t,"/tasks/").concat(e),r).then((function(t){return t.data}))},W=function(t,e,r){return Object(k.a)(v.a.mark((function a(){var n;return v.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,C.put("todo-lists/".concat(t,"/tasks/").concat(e,"/reorder"),{putAfterItemId:r});case 2:return n=a.sent,a.abrupt("return",n.data);case 4:case"end":return a.stop()}}),a)})))()},B=function(t){return C.post("auth/login",t).then((function(t){return t.data}))},N=function(){return C.get("auth/me").then((function(t){return t.data}))},A=function(){return C.delete("auth/login").then((function(t){return t.data}))},M=function(t,e){var r=e.message?e.message:"Some error";t(jt({errorMessage:r}))},P=function(t,e){var r=e.messages.length?e.messages[0]:"Some error occurred";t(jt({errorMessage:r}))},V=r(19),z=r(17),R=r(13),q=Object(V.b)("tasks/getTasks",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r.dispatch(ft({status:"loading"})),t.next=4,S(e);case 4:return a=t.sent,t.abrupt("return",{tasks:a.items,todolistId:e});case 8:return t.prev=8,t.t0=t.catch(0),n=t.t0,M(r.dispatch,n),t.abrupt("return",r.rejectWithValue(null));case 13:return t.prev=13,r.dispatch(ft({status:"succeeded"})),t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[0,8,13,16]])})));return function(e,r){return t.apply(this,arguments)}}()),H=Object(V.b)("tasks/createTask",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"loading"})),t.next=5,_(e.todolistId,e.title);case 5:if((c=t.sent).resultCode!==s.success){t.next=10;break}return t.abrupt("return",{task:c.data.item});case 10:return P(a,c),t.abrupt("return",n(null));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n(null));case 19:return t.prev=19,a(ft({status:"succeeded"})),t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[1,14,19,22]])})));return function(e,r){return t.apply(this,arguments)}}()),J=Object(V.b)("tasks/removeTask",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"loading"})),t.next=5,L(e.todolistId,e.taskId);case 5:if((c=t.sent).resultCode!==s.success){t.next=10;break}return t.abrupt("return",{todolistId:e.todolistId,taskId:e.taskId});case 10:return P(a,c),t.abrupt("return",n(null));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n(null));case 19:return t.prev=19,a(ft({status:"succeeded"})),t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[1,14,19,22]])})));return function(e,r){return t.apply(this,arguments)}}()),U=Object(V.b)("tasks/updateTask",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i,o,u,l,d;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=r.dispatch,n=r.rejectWithValue,c=r.getState,i=c(),t.prev=2,!(o=i.tasks.tasksData[e.todolistId].find((function(t){return t.id===e.taskId})))){t.next=16;break}return u=Object(z.a)({deadline:o.deadline,description:o.description,priority:o.priority,startDate:o.startDate,status:o.status,title:o.title},e.model),a(ft({status:"loading"})),t.next=9,F(e.todolistId,e.taskId,u);case 9:if((l=t.sent).resultCode!==s.success){t.next=14;break}return t.abrupt("return",{todolistId:e.todolistId,taskId:e.taskId,model:e.model});case 14:return P(a,l),t.abrupt("return",n(null));case 16:t.next=23;break;case 18:return t.prev=18,t.t0=t.catch(2),d=t.t0,M(a,d),t.abrupt("return",n(null));case 23:return t.prev=23,a(ft({status:"succeeded"})),t.finish(23);case 26:case"end":return t.stop()}}),t,null,[[2,18,23,26]])})));return function(e,r){return t.apply(this,arguments)}}()),K=Object(V.b)("tasks/reorderTask",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i,o,u,l,d;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=r.dispatch,n=r.rejectWithValue,c=r.getState,t.prev=1,i=c(),void 0===e.replaceableTaskIndex){t.next=16;break}return o=e.draggableTaskIndex>e.replaceableTaskIndex?e.replaceableTaskIndex-1:e.replaceableTaskIndex,u=e.replaceableTaskIndex>0?i.tasks.tasksData[e.todolistId][o].id:null,a(ft({status:"loading"})),t.next=9,W(e.todolistId,e.draggableTaskId,u);case 9:if((l=t.sent).resultCode!==s.success){t.next=14;break}return t.abrupt("return",{todolistId:e.todolistId,draggableTaskIndex:e.draggableTaskIndex,replaceableTaskIndex:e.replaceableTaskIndex});case 14:return P(a,l),t.abrupt("return",n(null));case 16:t.next=23;break;case 18:return t.prev=18,t.t0=t.catch(1),d=t.t0,M(a,d),t.abrupt("return",n(null));case 23:return t.prev=23,a(ft({status:"succeeded"})),t.finish(23);case 26:case"end":return t.stop()}}),t,null,[[1,18,23,26]])})));return function(e,r){return t.apply(this,arguments)}}()),G=Object(V.c)({name:"tasks",initialState:{tasksData:{},replacementTask:{}},reducers:{},extraReducers:function(t){t.addCase(X.fulfilled,(function(t,e){t.tasksData[e.payload.todolist.id]=[]})).addCase(Y.fulfilled,(function(t,e){delete t.tasksData[e.payload.todolistID]})).addCase(Q.fulfilled,(function(t,e){e.payload.todolists.forEach((function(e){return t.tasksData[e.id]=[]}))})).addCase(nt,(function(t){t.tasksData={}})).addCase(q.fulfilled,(function(t,e){t.tasksData[e.payload.todolistId]=e.payload.tasks})).addCase(H.fulfilled,(function(t,e){t.tasksData[e.payload.task.todoListId].unshift(e.payload.task)})).addCase(J.fulfilled,(function(t,e){var r=t.tasksData[e.payload.todolistId],a=r.findIndex((function(t){return t.id===e.payload.taskId}));a>-1&&r.splice(a,1)})).addCase(U.fulfilled,(function(t,e){if(e.payload){var r=t.tasksData[e.payload.todolistId],a=r.findIndex((function(t){if(e.payload)return t.id===e.payload.taskId}));a>-1&&(r[a]=Object(z.a)(Object(z.a)({},r[a]),e.payload.model))}})).addCase(K.fulfilled,(function(t,e){if(e.payload){var r=e.payload,a=r.todolistId,n=r.draggableTaskIndex,s=r.replaceableTaskIndex,c=t.tasksData[a],i=c.splice(n,1),o=Object(R.a)(i,1)[0];c.splice(s,0,o)}}))}}).reducer,Q=Object(V.b)("todolists/getToDoLists",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,s,c;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"loading"})),t.next=5,w();case 5:return(s=t.sent).forEach((function(t){a(q(t.id))})),t.abrupt("return",{todolists:s});case 10:return t.prev=10,t.t0=t.catch(1),c=t.t0,M(a,c),t.abrupt("return",n(null));case 15:return t.prev=15,a(ft({status:"succeeded"})),t.finish(15);case 18:case"end":return t.stop()}}),t,null,[[1,10,15,18]])})));return function(e,r){return t.apply(this,arguments)}}()),X=Object(V.b)("todolists/createTodolist",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"loading"})),t.next=5,T(e);case 5:if((c=t.sent).resultCode!==s.success){t.next=10;break}return t.abrupt("return",{todolist:c.data.item});case 10:return P(a,c),t.abrupt("return",n(null));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n(null));case 19:return t.prev=19,a(ft({status:"succeeded"})),t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[1,14,19,22]])})));return function(e,r){return t.apply(this,arguments)}}()),Y=Object(V.b)("todolists/removeTodolist",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"loading"})),a(at({todolistId:e,entityStatus:"loading"})),t.next=6,D(e);case 6:if((c=t.sent).resultCode!==s.success){t.next=11;break}return t.abrupt("return",{todolistID:e});case 11:return P(a,c),t.abrupt("return",n(null));case 13:t.next=20;break;case 15:return t.prev=15,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n(null));case 20:return t.prev=20,a(ft({status:"succeeded"})),a(at({todolistId:e,entityStatus:"succeeded"})),t.finish(20);case 24:case"end":return t.stop()}}),t,null,[[1,15,20,24]])})));return function(e,r){return t.apply(this,arguments)}}()),Z=Object(V.b)("todolists/updateTodolistTitle",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"loading"})),t.next=5,E(e.todolistId,e.title);case 5:if((c=t.sent).resultCode!==s.success){t.next=10;break}return t.abrupt("return",{todolistID:e.todolistId,newTitle:e.title});case 10:return P(a,c),t.abrupt("return",n(null));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n(null));case 19:return t.prev=19,a(ft({status:"succeeded"})),t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[1,14,19,22]])})));return function(e,r){return t.apply(this,arguments)}}()),$=Object(V.c)({name:"todolists",initialState:[],reducers:{changeFilter:function(t,e){var r=t.findIndex((function(t){return t.id===e.payload.todolistID}));r>-1&&(t[r].filter=e.payload.filterType)},changeToDoListsEntityStatus:function(t,e){var r=t.findIndex((function(t){return t.id===e.payload.todolistId}));r>-1&&(t[r].entityStatus=e.payload.entityStatus)},resetTodolistsData:function(){return[]}},extraReducers:function(t){t.addCase(Q.fulfilled,(function(t,e){return e.payload.todolists.map((function(t){return Object(z.a)(Object(z.a)({},t),{},{filter:"All",entityStatus:"idle"})}))})).addCase(X.fulfilled,(function(t,e){t.unshift(Object(z.a)(Object(z.a)({},e.payload.todolist),{},{filter:"All",entityStatus:"idle"}))})).addCase(Y.fulfilled,(function(t,e){var r=t.findIndex((function(t){return t.id===e.payload.todolistID}));r>-1&&t.splice(r,1)})).addCase(Z.fulfilled,(function(t,e){var r=t.findIndex((function(t){return t.id===e.payload.todolistID}));r>-1&&(t[r].title=e.payload.newTitle)}))}}),tt=$.reducer,et=$.actions,rt=et.changeFilter,at=et.changeToDoListsEntityStatus,nt=et.resetTodolistsData,st=Object(V.b)("auth/login",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"loading"})),t.next=5,B(e);case 5:if((c=t.sent).resultCode!==s.success){t.next=10;break}a(ot({isLoggedIn:!0})),t.next=12;break;case 10:return P(a,c),t.abrupt("return",n({errors:c.messages,fieldsErrors:c.fieldsErrors}));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n({errors:[i.message],fieldsErrors:void 0}));case 19:return t.prev=19,a(ft({status:"succeeded"})),t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[1,14,19,22]])})));return function(e,r){return t.apply(this,arguments)}}()),ct=Object(V.b)("auth/logout",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,a(ft({status:"idle"})),t.next=5,A();case 5:if((c=t.sent).resultCode!==s.success){t.next=10;break}a(nt()),t.next=12;break;case 10:return P(a,c),t.abrupt("return",n(null));case 12:t.next=19;break;case 14:return t.prev=14,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n(null));case 19:return t.prev=19,a(ft({status:"succeeded"})),t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[1,14,19,22]])})));return function(e,r){return t.apply(this,arguments)}}()),it=Object(V.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedIn:function(t,e){t.isLoggedIn=e.payload.isLoggedIn}},extraReducers:function(t){t.addCase(st.fulfilled,(function(t){t.isLoggedIn=!0})).addCase(ct.fulfilled,(function(t){t.isLoggedIn=!1}))}}),ot=it.actions.setIsLoggedIn,ut=it.reducer,lt=Object(V.b)("app/initializeApp",function(){var t=Object(k.a)(v.a.mark((function t(e,r){var a,n,c,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.dispatch,n=r.rejectWithValue,t.prev=1,t.next=4,N();case 4:if((c=t.sent).resultCode!==s.success){t.next=9;break}a(ot({isLoggedIn:!0})),t.next=11;break;case 9:return P(a,c),t.abrupt("return",n(null));case 11:t.next=18;break;case 13:return t.prev=13,t.t0=t.catch(1),i=t.t0,M(a,i),t.abrupt("return",n(null));case 18:return t.prev=18,t.finish(18);case 20:case"end":return t.stop()}}),t,null,[[1,13,18,20]])})));return function(e,r){return t.apply(this,arguments)}}()),dt=Object(V.c)({name:"app",initialState:{status:"idle",errorMessage:null,isInitialized:!1},reducers:{setAppStatus:function(t,e){t.status=e.payload.status},setAppErrorMessage:function(t,e){t.errorMessage=e.payload.errorMessage}},extraReducers:function(t){t.addCase(lt.fulfilled,(function(t){t.isInitialized=!0})),t.addCase(lt.rejected,(function(t){t.isInitialized=!0}))}}),pt=dt.reducer,bt=dt.actions,ft=bt.setAppStatus,jt=bt.setAppErrorMessage,xt=r(225),ht=r(223),Ot=function(t){return t.app.status},gt=function(t){return t.app.isInitialized},kt=function(t){return t.app.errorMessage},mt=r(65),vt=function(){return Object(mt.b)()},It=mt.c,yt=r(2),Ct=c.forwardRef((function(t,e){return Object(yt.jsx)(ht.a,Object(z.a)({elevation:6,ref:e,variant:"filled"},t))})),wt=function(){var t=vt(),e=It(kt),r=function(e,r){"clickaway"!==r&&t(jt({errorMessage:null}))};return Object(yt.jsx)(xt.a,{open:null!==e,autoHideDuration:3e3,onClose:r,children:Object(yt.jsx)(Ct,{onClose:r,severity:"error",sx:{width:"100%"},children:e})})},Tt=r(227),Dt=r(241),Et=r(221),St=r(116),_t=r.n(St),Lt=r(115),Ft=r.n(Lt),Wt=i.a.memo((function(t){var e=t.addItem,r=t.inputLabel,a=t.disabled,n=Object(c.useState)(""),s=Object(R.a)(n,2),i=s[0],o=s[1],u=Object(c.useState)(!1),l=Object(R.a)(u,2),d=l[0],p=l[1],b=Object(c.useCallback)((function(t){o(t.currentTarget.value),d&&p(!1)}),[d]),f=Object(c.useCallback)((function(){i.trim()?(e(i.trim()),o("")):p(!0)}),[e,i]),j=Object(c.useCallback)((function(t){"Enter"===t.key&&f()}),[f]);return Object(yt.jsxs)("div",{children:[Object(yt.jsx)(Et.a,{error:d,onChange:b,value:i,onKeyPress:j,helperText:d?"Field is required":null,size:"small",id:"outlined-basic",label:r,variant:"outlined",disabled:a,style:{borderColor:"#6D88B8"},className:Ft.a.textField}),Object(yt.jsx)(Dt.a,{style:{marginLeft:"15px",backgroundColor:"#6D88B8",color:"#ffffff"},onClick:f,"aria-label":"add",size:"small",disabled:a,children:Object(yt.jsx)(_t.a,{})})]})})),Bt=r(59),Nt=r.n(Bt),At=r(117),Mt=r.n(At),Pt=r(67),Vt=r.n(Pt),zt=r(224),Rt=i.a.memo((function(t){var e=t.title,r=t.updateTitle,a=t.labelInput,n=Object(c.useState)(!1),s=Object(R.a)(n,2),i=s[0],o=s[1],u=Object(c.useState)(e),l=Object(R.a)(u,2),d=l[0],p=l[1],b=Object(c.useState)(!1),f=Object(R.a)(b,2),j=f[0],x=f[1],h=Object(c.useCallback)((function(){d.trim()?(o(!1),r(d)):x(!0)}),[r,d]),O=Object(c.useCallback)((function(t){"Enter"===t.key&&h()}),[h]),g=Object(c.useCallback)((function(t){p(t.currentTarget.value),j&&x(!1)}),[j]);return Object(yt.jsx)(yt.Fragment,{children:i?Object(yt.jsx)("div",{children:Object(yt.jsx)(Et.a,{onKeyPress:O,autoFocus:!0,onBlur:h,value:d,onChange:g,id:"standard-basic",label:a,variant:"standard",size:"small",error:j,helperText:j?"Field is required":null})}):Object(yt.jsx)("span",{onDoubleClick:function(){o(!0)},children:e})})})),qt=r(118),Ht=r.n(qt),Jt=function(t,e){return t.tasks.tasksData[e]},Ut=r(54),Kt=i.a.memo((function(t){var e=t.todolistID,r=t.taskID,n=t.index,s=vt(),i=It((function(t){return function(t,e,r){return t.tasks.tasksData[e].filter((function(t){return t.id===r}))[0]}(t,e,r)})),o=i.status===a.Completed?"".concat(Vt.a.isDone," ").concat(Vt.a.content):Vt.a.content,u=Object(c.useCallback)((function(t){s(U({todolistId:e,taskId:r,model:{title:t}}))}),[s,e,r]),l=Object(c.useCallback)((function(t){var n=t.currentTarget.checked?a.Completed:a.New;s(U({todolistId:e,taskId:r,model:{status:n}}))}),[s,e,r]),d=Object(c.useCallback)((function(){s(J({todolistId:e,taskId:r}))}),[s,e,r]);return Object(yt.jsx)(Ut.b,{draggableId:r,index:n,children:function(t,e){var r=Object(z.a)({boxShadow:e.isDragging?"0 6px 6px hsl(0deg 0% 0% / 0.3)":""},t.draggableProps.style);return Object(yt.jsxs)("li",Object(z.a)(Object(z.a)(Object(z.a)({className:o,ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{style:r,children:[Object(yt.jsx)(zt.a,{checked:i.status===a.Completed,onChange:l,style:{color:"rgba(98,194,118,0.79)"},color:"success"}),Object(yt.jsx)(Rt,{labelInput:"Task title",updateTitle:u,title:i.title}),Object(yt.jsx)(x.a,{className:Vt.a.removeButton,onClick:d,"aria-label":"delete",size:"small",children:Object(yt.jsx)(Ht.a,{style:{color:"#D39BC3"}})})]}))}})})),Gt=function(t){return t.todolists},Qt=function(t,e){return t.todolists.filter((function(t){return t.id===e}))[0]},Xt=i.a.memo((function(t){var e=t.todolistID,r=It((function(t){return Qt(t,e)})),n=It((function(t){return Jt(t,e)})),s=n;return"Active"===r.filter&&(s=n.filter((function(t){return t.status===a.New}))),"Completed"===r.filter&&(s=n.filter((function(t){return t.status===a.Completed}))),Object(yt.jsx)(Ut.c,{droppableId:e,children:function(t){return Object(yt.jsxs)("ul",Object(z.a)(Object(z.a)({className:Mt.a.tasksWrapper,ref:t.innerRef},t.droppableProps),{},{children:[s.map((function(t,r){var a=t.id;return Object(yt.jsx)(Kt,{taskID:a,todolistID:e,index:r},a)})),t.placeholder]}))}})})),Yt=r(242),Zt=r(119),$t=r.n(Zt),te=r(235),ee=function(t){var e=t.todolistID,r=vt(),a=It((function(t){return Qt(t,e)})),n=It((function(t){return Jt(t,e)})),s="loading"===a.entityStatus,c=function(t){r(rt({todolistID:e,filterType:t}))};return Object(yt.jsx)("div",{className:Nt.a.todolistWrapper,children:Object(yt.jsxs)(te.a,{style:{backgroundColor:"#EBECF0",padding:"1px 20px 20px 20px"},children:[Object(yt.jsx)("div",{className:Nt.a.todolistHeader,children:Object(yt.jsxs)("h3",{children:[Object(yt.jsx)(Rt,{labelInput:"Todolist title",title:a.title,updateTitle:function(t){r(Z({todolistId:e,title:t}))}}),Object(yt.jsx)(x.a,{className:Nt.a.removeButton,onClick:function(){r(Y(e))},"aria-label":"delete",size:"small",disabled:s,children:Object(yt.jsx)($t.a,{style:{color:"".concat(s?"#C2C2C2":"#172B4D")}})})]})}),Object(yt.jsx)("div",{className:Nt.a.inputWithButtonBlock,children:Object(yt.jsx)(Wt,{inputLabel:"Task title",buttonName:"+",addItem:function(t){r(H({todolistId:e,title:t}))},disabled:"loading"===a.entityStatus})}),Object(yt.jsx)(Xt,{todolistID:e}),n&&n.length>0&&Object(yt.jsx)("div",{className:Nt.a.buttonsBlock,children:Object(yt.jsxs)(Yt.a,{color:"inherit",variant:"text","aria-label":"text button group",children:[Object(yt.jsx)(j.a,{onClick:function(){return c("All")},variant:"All"===a.filter?"contained":"text",style:{backgroundColor:"".concat("All"===a.filter?"#FBDC97":"")},children:"All"}),Object(yt.jsx)(j.a,{onClick:function(){return c("Active")},variant:"Active"===a.filter?"contained":"text",style:{backgroundColor:"".concat("Active"===a.filter?"rgba(98,194,118,0.65)":"")},children:"Active"}),Object(yt.jsx)(j.a,{onClick:function(){return c("Completed")},variant:"Completed"===a.filter?"contained":"text",style:{backgroundColor:"".concat("Completed"===a.filter?"rgba(39,182,186,0.59)":"")},children:"Completed"})]})})]})})},re=r(14),ae=function(t){return t.auth.isLoggedIn},ne=function(){var t=vt(),e=It(ae),r=It(Gt);return Object(c.useEffect)((function(){e&&t(Q())}),[]),e?Object(yt.jsxs)(yt.Fragment,{children:[Object(yt.jsx)(Tt.a,{container:!0,style:{justifyContent:"center",margin:"20px 0",marginBottom:"30px"},children:Object(yt.jsx)(Wt,{inputLabel:"Todolist title",buttonName:"x",addItem:function(e){t(X(e))}})}),Object(yt.jsx)(Tt.a,{container:!0,spacing:5,style:{justifyContent:"center",marginBottom:"30px"},children:r.map((function(t){var e=t.id;return Object(yt.jsx)(Tt.a,{item:!0,children:Object(yt.jsx)(ee,{todolistID:e})},e)}))})]}):Object(yt.jsx)(re.a,{to:"/login"})},se=r(234),ce=r(238),ie=r(237),oe=r(236),ue=r(218),le=r(123),de=r(68),pe=r.n(de),be=function(){var t=vt(),e=It(ae),r=Object(le.a)({initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(){var e=Object(k.a)(v.a.mark((function e(a,n){var s,c,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(st(a));case 2:s=e.sent,st.rejected.match(s)?null!==(c=s.payload)&&void 0!==c&&null!==(i=c.fieldsErrors)&&void 0!==i&&i.length&&s.payload.fieldsErrors.forEach((function(t){var e=t.field,r=t.error;n.setFieldError(e,r)})):r.resetForm();case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),validate:function(t){var e={};return t.email?t.password?t.password.length<3&&(e.password="The password field must be at least 3 characters"):e.password="Field is required":e.email="Field is required",e}});return e?Object(yt.jsx)(re.a,{to:"/"}):Object(yt.jsx)(Tt.a,{container:!0,justifyContent:"center",style:{minHeight:"calc(100vh - 75px"},children:Object(yt.jsx)(Tt.a,{item:!0,children:Object(yt.jsx)(te.a,{style:{backgroundColor:"#EBECF0",padding:" 20px"},children:Object(yt.jsx)("form",{onSubmit:r.handleSubmit,children:Object(yt.jsxs)(oe.a,{children:[Object(yt.jsxs)(ue.a,{children:[Object(yt.jsxs)("p",{children:["To log in get registered",Object(yt.jsxs)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:[" here ",Object(yt.jsx)("br",{})]}),"or use common test account credentials:"]}),"Email: ",Object(yt.jsx)("b",{children:"free@samuraijs.com"}),Object(yt.jsx)("br",{}),"Password: ",Object(yt.jsx)("b",{children:"free"}),Object(yt.jsx)("br",{})]}),Object(yt.jsxs)(ie.a,{children:[Object(yt.jsxs)("div",{className:pe.a.fieldWrapper,children:[Object(yt.jsx)(Et.a,Object(z.a)({label:"Email",margin:"normal"},r.getFieldProps("email"))),r.errors.email&&r.touched.email&&Object(yt.jsx)("div",{className:pe.a.messageError,children:r.errors.email})]}),Object(yt.jsxs)("div",{className:pe.a.fieldWrapper,children:[Object(yt.jsx)(Et.a,Object(z.a)({label:"Password",type:"password",margin:"normal"},r.getFieldProps("password"))),r.errors.password&&r.touched.password&&Object(yt.jsx)("div",{className:pe.a.messageError,children:r.errors.password})]}),Object(yt.jsx)(ce.a,{label:"Remember me",control:Object(yt.jsx)(zt.a,Object(z.a)({},r.getFieldProps("rememberMe"))),style:{marginBottom:"20px"}}),Object(yt.jsx)(j.a,{variant:"contained",type:"submit",children:"Login"})]})]})})})})})},fe=r(240),je=r(239),xe=function(){return Object(yt.jsx)(je.a,{sx:{display:"flex",justifyContent:"center",height:"100vh",alignItems:"center"},children:Object(yt.jsx)(fe.a,{})})},he={backgroundColor:"rgba(0,0,0,0.2)",boxShadow:"none",color:"rgba(255,255,255,0.7)"};var Oe=function(){var t=vt(),e=It(Ot),r=It(gt),a=It(ae);return Object(c.useEffect)((function(){t(lt())}),[]),r?Object(yt.jsx)(Ut.a,{onDragEnd:function(e){var r,a=e.source.index,n=null===(r=e.destination)||void 0===r?void 0:r.index,s=e.source.droppableId;e.draggableId;t(K({todolistId:s,draggableTaskIndex:a,replaceableTaskIndex:n,draggableTaskId:e.draggableId}))},children:Object(yt.jsxs)("div",{className:"App",children:[Object(yt.jsx)(p.a,{position:"static",style:he,children:Object(yt.jsxs)(b.a,{children:[Object(yt.jsx)(x.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(yt.jsx)(O.a,{})}),Object(yt.jsx)(f.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"News"}),a&&Object(yt.jsx)(j.a,{color:"inherit",onClick:function(){t(ct())},children:"Logout"})]})}),Object(yt.jsx)("div",{className:d.a.progressBar,children:"loading"===e&&Object(yt.jsx)(g.a,{})}),Object(yt.jsx)(se.a,{fixed:!0,children:Object(yt.jsxs)(re.d,{children:[Object(yt.jsx)(re.b,{path:"/",element:Object(yt.jsx)(ne,{})}),Object(yt.jsx)(re.b,{path:"login",element:Object(yt.jsx)(be,{})}),Object(yt.jsx)(re.b,{path:"404",element:Object(yt.jsx)("h1",{children:"404 page not found"})}),Object(yt.jsx)(re.b,{path:"*",element:Object(yt.jsx)(re.a,{to:"404"})})]})}),Object(yt.jsx)(wt,{})]})}):Object(yt.jsx)(xe,{})},ge=r(33),ke=r(64),me=Object(ge.b)({tasks:G,todolists:tt,app:pt,auth:ut}),ve=Object(V.a)({reducer:me,middleware:function(t){return t().prepend(ke.a)}}),Ie=r(60);u.a.render(Object(yt.jsx)(mt.a,{store:ve,children:Object(yt.jsx)(Ie.a,{children:Object(yt.jsx)(Oe,{})})}),document.getElementById("root"))},59:function(t,e,r){t.exports={todolistWrapper:"Todolist_todolistWrapper__2Fdg4",buttonsBlock:"Todolist_buttonsBlock__2sEFe"}},67:function(t,e,r){t.exports={content:"Task_content__3iNop",isDone:"Task_isDone__ciiS-"}},68:function(t,e,r){t.exports={fieldWrapper:"Login_fieldWrapper__2a4qF",messageError:"Login_messageError__wAyJF"}},90:function(t,e,r){t.exports={progressBar:"App_progressBar__2DEcg"}}},[[167,1,2]]]);
//# sourceMappingURL=main.dc881d9e.chunk.js.map