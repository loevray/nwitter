(this.webpackJsonpnwitter=this.webpackJsonpnwitter||[]).push([[0],{47:function(e,t,c){},49:function(e,t,c){},55:function(e,t,c){},56:function(e,t,c){},57:function(e,t,c){},58:function(e,t,c){},59:function(e,t,c){},60:function(e,t,c){},61:function(e,t,c){},62:function(e,t,c){"use strict";c.r(t);var r=c(2),n=c.n(r),a=c(33),s=c.n(a),i=c(5),l=c(16),j=c(7),o=c(19);c(45),c(64),c(63);o.a.initializeApp({apiKey:"AIzaSyAw696Lt9grKSMr-_fQysj_us7Zof51flk",authDomain:"nwitter-5e982.firebaseapp.com",projectId:"nwitter-5e982",storageBucket:"nwitter-5e982.appspot.com",messagingSenderId:"994724876832",appId:"1:994724876832:web:41ccc35d8ca60877fb2245"});var d,u=o.a,b=o.a.auth(),O=o.a.firestore(),m=o.a.storage(),h=o.a.firestore,p=(c(47),c(6)),x=c.n(p),f=c(8),v=(c(49),c(0)),_=function(e){var t=e.userObj,c=e.refreshUser,n=e.setEdit,a=Object(r.useState)(t.displayName),s=Object(i.a)(a,2),l=s[0],j=s[1],o=Object(r.useState)(""),d=Object(i.a)(o,2),u=d[0],b=d[1],h=function(){var e=Object(f.a)(x.a.mark((function e(r){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),t.displayName===l){e.next=5;break}return e.next=4,t.updateProfile({displayName:l});case 4:c();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(f.a)(x.a.mark((function e(r){var n,a,s,i;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),n="",""===u){e.next=13;break}return a=m.ref().child("".concat(t.uid,"/profile_img/1")),e.next=6,a.putString(u,"data_url");case 6:return s=e.sent,e.next=9,s.ref.getDownloadURL();case 9:n=e.sent,i=O.collection("nweets"),i.where("createrId","==","".concat(t.uid)).get().then((function(e){e.forEach((function(e){i.doc(e.id).update({profile:n})}))})).catch((function(e){console.log("Error getting documents: ",e)}));case 13:return e.next=15,t.updateProfile({photoURL:n});case 15:b(""),c();case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("div",{className:"edit_profile_menu_wrapper",children:[Object(v.jsx)("button",{onClick:function(){n(!1)},children:" \ub2eb\uae30 "}),Object(v.jsx)("button",{onClick:function(){console.log("i'm save btn"),n(!1)},children:" \uc800\uc7a5 "})]}),Object(v.jsxs)("div",{className:"edit_profile_content",children:[Object(v.jsx)("div",{className:"edit_profile_top_wrapper",children:Object(v.jsx)("div",{className:"update_profile_img_wrapper",children:Object(v.jsxs)("form",{onSubmit:p,children:[Object(v.jsx)("input",{className:"update_profile_img",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],c=new FileReader;c.onloadend=function(e){var t=e.currentTarget.result;b(t)},t&&c.readAsDataURL(t)}}),Object(v.jsx)("input",{type:"submit",value:"update profile img"})]})})}),Object(v.jsxs)("div",{className:"edit_profile_bottom_wrapper",children:[Object(v.jsx)("div",{className:"update_nickname_wrapper",children:Object(v.jsxs)("form",{onSubmit:h,children:[Object(v.jsx)("input",{onChange:function(e){var t=e.target.value;j(t)},type:"text",value:l,placeholder:"\uc774\ub984"}),Object(v.jsx)("input",{type:"submit",value:"Update Profile"})]})}),Object(v.jsx)("img",{src:t.photoURL,alt:"profileimg"}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{}),"\u3147",Object(v.jsx)("br",{})]})]})]})},g=function(e){var t=e.userObj,c=e.refreshUser,n=Object(r.useState)(!1),a=Object(i.a)(n,2),s=a[0],l=a[1],j=Object(r.useRef)();return Object(r.useEffect)((function(){var e=function(e){s&&!j.current.contains(e.target)&&l(!1)};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[s]),Object(v.jsxs)("div",{className:"profile_top",children:[Object(v.jsxs)("div",{className:"profile_top_top",children:[s&&Object(v.jsx)("div",{className:"edit_profile_modal_wrapper",children:Object(v.jsx)("div",{className:"edit_profile_modal",ref:j,children:Object(v.jsx)(_,{userObj:t,refreshUser:c,setEdit:l})})}),Object(v.jsxs)("div",{className:"profile_img_wrapper1",children:[Object(v.jsx)("div",{className:"profile_img_wrapper",children:Object(v.jsx)("div",{className:"profile_img_circle",children:Object(v.jsx)("img",{src:t.photoURL,alt:"profile_image"})})}),Object(v.jsx)("div",{className:"profile_background_img",children:"\ud504\ub85c\ud544 \ubc30\uacbd\uc774\ubbf8\uc9c0"})]})]}),Object(v.jsxs)("div",{className:"profile_top_bottom",children:[Object(v.jsx)("div",{className:"profile_edit_wrapper",children:Object(v.jsx)("div",{className:"profile_edit",children:Object(v.jsx)("span",{onClick:function(){l(!0)},children:"\ud504\ub85c\ud544 \uc218\uc815"})})}),Object(v.jsx)("div",{className:"profile_info_name",children:Object(v.jsx)("span",{children:t.displayName})}),Object(v.jsx)("div",{className:"profile_info_state",children:Object(v.jsx)("span",{children:"\uc0c1\ud0dc\uba54\uc138\uc9c0:"})}),Object(v.jsx)("div",{className:"profile_info_creationtime",children:Object(v.jsx)("span",{children:t.creationTime})}),Object(v.jsxs)("div",{className:"profile_menu_bar",children:[Object(v.jsx)("span",{className:"profile_menu_tweet",children:"\ud2b8\uc717"}),Object(v.jsx)("span",{className:"profile_menu_like",children:"\ub9c8\uc74c\uc5d0 \ub4e4\uc5b4\uc694"})]})]})]})},w=function(e){var t=e.userObj,c=Object(r.useState)(""),n=Object(i.a)(c,2),a=n[0],s=n[1],l=function(){var e=Object(f.a)(x.a.mark((function e(){var c,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.collection("nweets").where("createrId","==",t.uid).orderBy("createdAt","desc").get();case 2:c=e.sent,r=c.docs.map((function(e){return e.data().text})),s(r);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){l()}),[]),Object(v.jsx)("span",{children:a})},N=function(e){var t=e.userObj,c=e.refreshUser,r=Object(j.g)();return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"profile",children:[Object(v.jsx)(g,{userObj:t,refreshUser:c}),Object(v.jsxs)("div",{className:"profile_bottom",children:["\ud504\ub85c\ud544_\ubc14\ud140",Object(v.jsx)(w,{userObj:t}),Object(v.jsx)("button",{onClick:function(){b.signOut(),r.push("/")},children:"Log Out"})]})]})})},y=c(40),k=(c(55),function(e){var t=e.nweetObj,c=e.isOwner,n=e.profile,a=(e.userObj,Object(r.useState)(!1)),s=Object(i.a)(a,2),l=s[0],j=s[1],o=Object(r.useState)(!1),d=Object(i.a)(o,2),u=d[0],p=d[1],_=Object(r.useState)(""),g=Object(i.a)(_,2),w=(g[0],g[1]),N=Object(r.useState)(""),y=Object(i.a)(N,2),k=y[0],U=y[1],S=Object(r.useState)(""),C=Object(i.a)(S,2),L=C[0],E=C[1],F=Object(r.useState)(t.text),R=Object(i.a)(F,2),M=R[0],I=R[1];Object(r.useEffect)((function(){console.log("render from Nweet.js");var e="\n        ".concat(t.createdAt[1],"\ub144 \n        ").concat(t.createdAt[2],"\uc6d4 \n        ").concat(t.createdAt[3],"\uc77c\n        ").concat(t.createdAt[4],"\uc2dc\n        ").concat(t.createdAt[5],"\ubd84\n        ");w(e);var c=(new Date).getTime(),r=Math.floor((c-t.createdAt[0])/1e3);r>2592e3?E("".concat(Math.floor(r/2592e3),"\ub2ec")):r>604800?E("".concat(Math.floor(r/604800),"\uc8fc")):r>86400?E("".concat(Math.floor(r/86400),"\uc77c")):r>3600?E("".concat(Math.floor(r/3600),"\uc2dc\uac04")):r>60?E("".concat(Math.floor(r/60),"\ubd84")):0===r?E("\ub530\ub048\ub530\ub048"):60>=r&&E("".concat(r,"\ucd08 \uc804"));var n=t.userEmail.split("@");U(n)}),[]);var z=function(){var e=Object(f.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you want to delete this nweet?")){e.next=7;break}return e.next=4,O.doc("nweets/".concat(t.id)).delete();case 4:if(""===t.attachmentUrl){e.next=7;break}return e.next=7,m.refFromURL(t.attachmentUrl).delete();case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){return j((function(e){return!e}))},D=function(){var e=Object(f.a)(x.a.mark((function e(c){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.preventDefault(),e.next=3,O.doc("nweets/".concat(t.id)).update({text:M});case 3:j(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(f.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.reNweet.includes(b.currentUser.uid,0)){e.next=4;break}return e.next=3,O.doc("nweets/".concat(t.id)).update({like:h.FieldValue.arrayRemove("".concat(b.currentUser.uid))});case 3:return e.abrupt("return");case 4:return e.next=6,O.doc("nweets/".concat(t.id)).update({like:h.FieldValue.arrayUnion("".concat(b.currentUser.uid))});case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(f.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.reNweet.includes(b.currentUser.uid,0)){e.next=4;break}return e.next=3,O.doc("nweets/".concat(t.id)).update({reNweet:h.FieldValue.arrayRemove("".concat(b.currentUser.uid))});case 3:return e.abrupt("return");case 4:return e.next=6,O.doc("nweets/".concat(t.id)).update({reNweet:h.FieldValue.arrayUnion("".concat(b.currentUser.uid))});case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(v.jsx)(v.Fragment,{children:l?Object(v.jsx)(v.Fragment,{children:c&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("form",{onSubmit:D,children:[Object(v.jsx)("input",{onChange:function(e){var t=e.target.value;I(t)},type:"text",placeholder:"Edit your nweet",value:M,maxLength:"80",required:!0}),Object(v.jsx)("input",{type:"submit",value:"Update Nweet"})]}),Object(v.jsx)("button",{onClick:A,children:"Cancel"})]})}):Object(v.jsx)(v.Fragment,{children:Object(v.jsx)("div",{className:"nweet_wrapper",children:Object(v.jsxs)("div",{className:"nweet",children:[Object(v.jsx)("div",{className:"nweet_left",children:Object(v.jsx)("img",{src:n,alt:"img"})}),Object(v.jsxs)("div",{className:"nweet_right",children:[Object(v.jsxs)("div",{className:"nweet_right_top",children:[Object(v.jsxs)("div",{className:"nweet_info",children:[Object(v.jsx)("span",{className:"nweet_info_displayName",children:t.displayName}),Object(v.jsx)("span",{className:"nweet_info_userId",children:k[0]}),Object(v.jsx)("span",{className:"block",children:"\xb7"}),Object(v.jsx)("span",{className:"nweet_info_timeAgo",children:L})]}),Object(v.jsxs)("div",{className:"nweet_menu_wrapper",children:[Object(v.jsx)("button",{className:"nweet_menu",onClick:function(){p((function(e){return!e}))},children:"\uba54\ub274"}),u&&c&&Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"nweet_drop_down",children:[Object(v.jsx)("div",{className:"nweet_drop_menu",onClick:z,children:Object(v.jsx)("span",{className:"nweet_delete_nweet",children:"\uc774 \ud2b8\uc717 \uc9c0\uc6b0\uae30"})}),Object(v.jsx)("div",{className:"nweet_drop_menu",onClick:A,children:Object(v.jsx)("span",{className:"nweet_edit_nweet",children:"\uc774 \ud2b8\uc717 \uc218\uc815\ud558\uae30"})})]})}),u&&!c&&Object(v.jsx)("button",{children:"\uc774 \uc720\uc800\uc5d0\uac8c \uad00\uc2ec\uc5c6\uc74c"})]})]}),Object(v.jsxs)("div",{className:"nweet_right_center",children:[Object(v.jsx)("h4",{className:"nweet_content",children:t.text}),t.attachmentUrl&&Object(v.jsx)("div",{className:"nweet_content_img_wrapper",children:Object(v.jsx)("img",{src:t.attachmentUrl,alt:"img"})})]}),Object(v.jsxs)("div",{className:"nweet_right_bottom",children:[Object(v.jsxs)("div",{className:"nweet_right_bottom_like",children:[Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",onClick:P,children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"})})}),Object(v.jsx)("span",{children:t.like.length})]}),Object(v.jsxs)("div",{className:"nweet_right_bottom_reNweet",children:[Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",onClick:B,children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"})})}),Object(v.jsx)("span",{children:t.reNweet.length})]})]})]})]})})})})}),U=c(34),S=c(66),C=(c(56),function(e){var t=e.userObj,c=(e.userProfileImg,Object(r.useState)("")),n=Object(i.a)(c,2),a=n[0],s=n[1],l=Object(r.useState)(""),j=Object(i.a)(l,2),o=j[0],d=j[1],u=Object(r.useState)(!1),b=Object(i.a)(u,2),h=b[0],p=b[1],_=Object(r.useRef)(),g=Object(r.useRef)();Object(r.useEffect)((function(){new MutationObserver((function(e,t){var c,r=Object(U.a)(e);try{for(r.s();!(c=r.n()).done;){"characterData"===c.value.type?(s(g.current.innerText),p(!0)):""===g.current.innerText&&p(!1)}}catch(n){r.e(n)}finally{r.f()}})).observe(g.current,{characterData:!0,childList:!0,subtree:!0})}),[]);var w=function(){var e=Object(f.a)(x.a.mark((function e(c){var r,n,i,l,j;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c.preventDefault(),""!==a){e.next=4;break}return alert("\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694!"),e.abrupt("return");case 4:if(r="",n=new Date,""===o){e.next=14;break}return i=m.ref().child("".concat(t.uid,"/nweet_img/").concat(Object(S.a)())),e.next=10,i.putString(o,"data_url");case 10:return l=e.sent,e.next=13,l.ref.getDownloadURL();case 13:r=e.sent;case 14:return j={text:a,createdAt:[n.getTime(),n.getFullYear(),n.getMonth(),n.getDay(),n.getHours(),n.getMinutes()],createrId:t.uid,attachmentUrl:r,reNweet:[],like:[],profile:t.photoURL,displayName:t.displayName,userEmail:t.email},e.next=17,O.collection("nweets").add(j);case 17:s(""),d(""),g.current.innerText="";case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"nweet_factory_right",children:[Object(v.jsxs)("div",{className:"nweet_factory_nweet_wrapper",children:[Object(v.jsx)("div",{className:h?"hidden placeholder":"placeholder",children:"\ubb34\uc2a8 \uc77c\uc774 \uc77c\uc5b4\ub098\uace0 \uc788\ub098\uc694?"}),Object(v.jsx)("span",{className:"nweet_factory_nweet_text",role:"textbox",contentEditable:"true",suppressContentEditableWarning:"true",maxLength:"80",htmlFor:"put_text",ref:g})]}),o&&Object(v.jsx)("div",{className:"nweet_factory_attachmentImg",children:Object(v.jsx)("img",{src:o,alt:"img"})}),Object(v.jsxs)("form",{onSubmit:w,className:"nweet_factory_form",children:[Object(v.jsx)("textarea",{className:"nweet_factory_nweet_input hidden",placeholder:"\ubb34\uc2a8\uc77c?",maxLength:"80",id:"put_text",value:a,onChange:function(){}}),Object(v.jsxs)("div",{className:"nweet_factory_form_bottom",children:[Object(v.jsx)("div",{className:"nweet_factory_choose_img",children:Object(v.jsxs)("label",{htmlFor:"inputt",children:[Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",className:"icon",children:Object(v.jsxs)("g",{children:[Object(v.jsx)("path",{d:"M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"}),Object(v.jsx)("circle",{cx:"8.868",cy:"8.309",r:"1.542"})]})}),Object(v.jsx)("input",{id:"inputt",className:"nweet_factory_choosefile hidden",type:"file",accept:"image/*",onChange:function(e){var t=e.target.files[0],c=new FileReader;c.onloadend=function(e){var t=e.currentTarget.result;d(t)},t&&c.readAsDataURL(t)},onClick:function(e){e.target.value=null},ref:_})]})}),Object(v.jsx)("input",{className:h?"nweet_factory_nweet_on":"nweet_factory_nweet_off",type:"submit",value:"\ud2b8\uc717\ud558\uae30"})]})]})]})})}),L=(c(57),function(e){var t=e.userObj,c=Object(r.useState)([]),n=Object(i.a)(c,2),a=n[0],s=n[1],l=Object(r.useRef)();Object(r.useEffect)((function(){(function(){var e=Object(f.a)(x.a.mark((function e(){var c,r;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==t.photoURL){e.next=7;break}return c="",r=m.ref().child("userDeafultSet/profile_img/userprofile.png"),e.next=5,r.getDownloadURL();case 5:c=e.sent,t.updateProfile({photoURL:c});case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()(),O.collection("nweets").orderBy("createdAt","desc").onSnapshot((function(e){var t=e.docs.map((function(e){return Object(y.a)({id:e.id},e.data())}));s(t)}))}),[]);return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)("div",{className:"home_center",children:Object(v.jsxs)("div",{className:"home_center_wrapper",children:[Object(v.jsx)("div",{className:"home_center_homebar_wrapper",onClick:function(){l.current.scrollIntoView(!1)},children:Object(v.jsxs)("div",{className:"home_center_homebar",children:[Object(v.jsx)("span",{children:"\ud648"}),Object(v.jsx)("span",{children:"\u2605"})]})}),Object(v.jsxs)("div",{className:"home_center_nweet_wrapper",ref:l,children:[Object(v.jsx)("div",{className:"home_center_nweet_profile_img",children:Object(v.jsx)("img",{src:t.photoURL,alt:"img"})}),Object(v.jsx)(C,{userObj:t})]}),Object(v.jsx)("div",{className:"home_center_bottom",children:Object(v.jsx)("div",{className:"nweets",children:a.map((function(e){return Object(v.jsx)(k,{nweetObj:e,isOwner:e.createrId===t.uid,profile:e.profile,userObj:t},e.id)}))})})]})})})}),E=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(""),s=Object(i.a)(a,2),l=s[0],o=s[1],d=Object(j.g)(),u=function(e){var t=e.target,c=t.name,r=t.value;"login_email"===c?n(r):"login_password"===c&&o(r)},O=function(){var e=Object(f.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.signInWithEmailAndPassword(c,l);case 4:d.push("/home"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsx)(v.Fragment,{children:Object(v.jsx)("div",{className:"login_form_wrapper",children:Object(v.jsxs)("form",{onSubmit:O,className:"login_form",children:[Object(v.jsx)("input",{className:"login_form_id",name:"login_email",type:"text",placeholder:"Email",value:c,onChange:u,autoComplete:"username",required:!0}),Object(v.jsx)("input",{className:"login_form_password",name:"login_password",type:"password",placeholder:"Password",value:l,onChange:u,autoComplete:"current-password",required:!0}),Object(v.jsx)("input",{className:"login_form_submit",type:"submit",value:"Log In",required:!0})]})})})},F=function(){var e=Object(j.g)(),t=function(){var t=Object(f.a)(x.a.mark((function t(c){var r,n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=c.target.name,"","google"===r?(n=new u.auth.GoogleAuthProvider).setCustomParameters({prompt:"select_account"}):"github"===r&&(n=new u.auth.GithubAuthProvider),t.next=5,b.signInWithPopup(n);case 5:b.currentUser.providerData.forEach((function(e){e.photoURL})),e.push("/home");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("button",{onClick:t,name:"google",children:"Login with Google"}),Object(v.jsx)("button",{onClick:t,name:"github",children:"Login with Github"})]})},R=function(){return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"register",children:[Object(v.jsx)(E,{}),Object(v.jsx)("div",{className:"social_links",children:Object(v.jsx)(F,{})})]})})},M=(c(58),function(e){var t=e.setSignUp,c=Object(r.useState)(""),n=Object(i.a)(c,2),a=n[0],s=n[1],l=Object(r.useState)(""),o=Object(i.a)(l,2),d=o[0],u=o[1],O=Object(j.g)(),m=function(e){var t=e.target,c=t.name,r=t.value;"register_email"===c?s(r):"register_password"===c&&u(r)},h=function(){var e=Object(f.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.createUserWithEmailAndPassword(a,d);case 4:b.languageCode="ko",alert("\uac00\uc785\uc644\ub8cc"),O.push("/home"),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0.message,"\uc5d0\ub7ec!"),window.location.replace("/");case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("span",{children:"\ud68c\uc6d0 \uac00\uc785"}),Object(v.jsxs)("form",{onSubmit:h,className:"register_form",children:[Object(v.jsx)("input",{className:"register_form_id",name:"register_email",type:"text",placeholder:"Email",autoComplete:"off",value:a,onChange:m,required:!0}),Object(v.jsx)("input",{className:"register_form_password",name:"register_password",type:"password",placeholder:"Password",autoComplete:"new-password",value:d,onChange:m,required:!0}),Object(v.jsx)("input",{className:"register_form_submit",type:"submit",value:"Register",required:!0})]}),Object(v.jsx)("button",{onClick:function(){t(!1)},children:"\ub2eb\uae30"})]})}),I=function(){return Object(v.jsxs)("footer",{className:"footer",children:["\uc18c\uac1c \uace0\uac1d\uc13c\ud130 \uc774\uc6a9\uc57d\uad00 \uac1c\uc778\uc815\ubcf4 \ucc98\ub9ac\ubc29\uce68 \ucfe0\ud0a4 \uc815\ucc45 \uad11\uace0 \uc815\ubcf4 \ube14\ub85c\uadf8 \uc0c1\ud0dc \ucc44\uc6a9 \ube0c\ub79c\ub4dc \ub9ac\uc18c\uc2a4 \uad11\uace0 \ub9c8\ucf00\ud305 \ube44\uc988\ub2c8\uc2a4\uc6a9 \ud2b8\uc704\ud130 \uac1c\ubc1c\uc790 \ub514\ub809\ud130\ub9ac \uc124\uc815 \xa9",(new Date).getFullYear(),"Nwitter"]})},z=function(e){var t=e.userObj,c=Object(r.useState)(!1),n=Object(i.a)(c,2),a=n[0],s=n[1],l=Object(r.useRef)();return Object(r.useEffect)((function(){var e=function(e){a&&!l.current.contains(e.target)&&s(!1)};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[a]),Object(v.jsxs)("div",{className:"main_wrapper_1",children:[a&&Object(v.jsx)("div",{className:"modal_wrapper",children:Object(v.jsx)("div",{className:"modal",children:Object(v.jsx)("div",{className:"register_wrapper",ref:l,children:Object(v.jsx)(M,{setSignUp:s,userObj:t})})})}),Object(v.jsxs)("div",{className:"main_top",children:[Object(v.jsx)("header",{className:"header",children:Object(v.jsx)("div",{className:"birdImg",children:Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"})})})})}),Object(v.jsxs)("main",{className:"main",children:[Object(v.jsx)("div",{className:"birdImg2_wrapper",children:Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",className:"birdImg2",children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"})})})}),Object(v.jsxs)("div",{className:"main_text_wrapper",children:[Object(v.jsx)("span",{children:"\uc9c0\uae08 \uc77c\uc5b4\ub098\uace0 \uc788\ub294 \uc77c"}),Object(v.jsx)("span",{children:"\uc624\ub298 \u3147\u3147\u3147\uc5d0 \ub85c\uadf8\uc778\ud558\uc138\uc694."})]}),Object(v.jsx)(R,{}),Object(v.jsxs)("div",{className:"main_regist_text",children:[Object(v.jsx)("span",{children:"\uacc4\uc815\uc774 \uc544\uc9c1 \uc5c6\uc73c\uc2e0\uac00\uc694?"}),Object(v.jsx)("span",{onClick:function(){s(!0)},className:"sign_up",children:"\uac00\uc785\ud558\uae30"})]})]})]}),Object(v.jsx)("div",{className:"main_bottom",children:Object(v.jsx)(I,{})})]})},A=(c(59),function(e){var t=e.userObj,c=Object(r.useRef)();if(null===t.displayName){var n=t.email.split("@");t.displayName=n[0]}return Object(v.jsx)("nav",{className:"nav",children:Object(v.jsx)("div",{className:"nav_menu_wrapper1",children:Object(v.jsx)("div",{className:"nav_menu_wrapper2",children:Object(v.jsxs)("div",{className:"nav_menu",children:[Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",className:"nav_birdImg2",children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"})})}),Object(v.jsxs)("ul",{children:[Object(v.jsx)("li",{children:Object(v.jsx)(l.b,{to:"/home",children:Object(v.jsxs)("div",{className:"nav_home_wrapper",children:[Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",className:"nav_home_icon",children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"})})}),Object(v.jsx)("span",{className:"nav_menu_text",children:"\ud648"})]})})}),Object(v.jsx)("li",{children:Object(v.jsx)(l.b,{to:"/profile",children:Object(v.jsxs)("div",{onClick:function(){c.current.style.fill="black"},className:"nav_profile_wrapper",children:[Object(v.jsx)("svg",{ref:c,viewBox:"0 0 24 24","aria-hidden":"true",className:"nav_profile_icon",children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"})})}),Object(v.jsxs)("span",{className:"nav_menu_text",children:[t.displayName,"\uc758 \ud504\ub85c\ud544"]})]})})})]})]})})})})}),D=(c(60),function(){Object(r.useEffect)((function(){var c=function(c){if(!e.current.contains(c.target)){var r=e.current.style;r.cursor="text",r.backgroundColor="#EFF3F4",r.border="1px solid #EFF3F4",r.borderRadius="10vh",t.current.style.fill="#787a88"}};return document.body.addEventListener("mousedown",c),function(){document.body.removeEventListener("mousedown",c)}}));var e=Object(r.useRef)(),t=Object(r.useRef)();return Object(v.jsx)("div",{className:"aside",children:Object(v.jsxs)("div",{className:"aside_wrapper",children:[Object(v.jsxs)("div",{className:"aside_left",children:[Object(v.jsx)("div",{onClick:function(){var c=e.current.style;c.cursor="auto",c.backgroundColor="white",c.border="1px solid #00acee",c.borderRadius="10vh",t.current.style.fill="#00acee"},className:"aside_left_search",children:Object(v.jsxs)("label",{ref:e,children:[Object(v.jsx)("div",{className:"aside_left_search_left",children:Object(v.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",className:"aside_left_search_icon",ref:t,children:Object(v.jsx)("g",{children:Object(v.jsx)("path",{d:"M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"})})})}),Object(v.jsxs)("form",{onSubmit:function(e){e.prevenDefault()},className:"aside_left_search_center",children:[Object(v.jsx)("input",{className:"aside_left_search_input",type:"text",placeholder:"\ud2b8\uc704\ud130 \uac80\uc0c9"}),Object(v.jsx)("input",{type:"submit",value:"\uc81c\ucd9c",className:"hidden"})]}),Object(v.jsx)("div",{className:"aside_left_search_right",children:Object(v.jsx)("span",{})})]})}),Object(v.jsxs)("div",{className:"aside_left_trend",children:[Object(v.jsxs)("div",{className:"aside_left_trend_1",children:[Object(v.jsx)("span",{children:"\ud2b8\ub80c\ub4dc"}),Object(v.jsx)("span",{children:"\uc544\ubb34\ud2bc \ud1b1\ub2c8\ubc14\ud034\uc784"})]}),Object(v.jsx)("div",{className:"aside_left_trend_2",children:"1.\uc73c\uc575"}),Object(v.jsx)("div",{className:"aside_left_trend_3",children:"2.\uc751\uc560"}),Object(v.jsx)("div",{className:"aside_left_trend_4",children:"3.\uc751\uc560"}),Object(v.jsx)("div",{children:"\ub354\ubcf4\uae30\uc784"})]}),Object(v.jsx)("div",{className:"aside_left_follow_recommend",children:"\ud314\ub85c\uc6b0 \ucd94\ucc9c"}),Object(v.jsx)("div",{className:"aside_left_footer",children:"\uc774\uc6a9\uc57d\uad00 \uac1c\uc778\uc815\ubcf4 \ucc98\ub9ac\ubc29\uce68 \ucfe0\ud0a4 \uc815\ucc45 \uad11\uace0 \uc815\ubcf4 \ub354 \ubcf4\uae30 \xa9 2021 Twitter, Inc."})]}),Object(v.jsx)("div",{className:"aside_right"})]})})}),P=function(e){var t=e.setNotWatching;Object(r.useEffect)((function(){t(!1)}));return Object(v.jsxs)("div",{children:[Object(v.jsx)("span",{children:"\uc778\uc99d\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4"}),Object(v.jsx)("button",{onClick:function(){window.localStorage.removeItem("sendMail"),window.close()},children:"\ud655\uc778"})]})},B=function(e){var t=e.refreshUser,c=e.isLoggedIn,n=e.userObj,a=Object(r.useState)(!1),s=Object(i.a)(a,2),o=s[0],d=s[1],u=Object(r.useState)(!0),b=Object(i.a)(u,2),O=b[0],m=b[1];return Object(r.useEffect)((function(){var e=JSON.parse(window.localStorage.getItem("sendMail"));null!==e&&void 0!==e&&!1!==e&&d(!0)}),[o]),Object(v.jsxs)(l.a,{children:[c&&O&&Object(v.jsx)(A,{userObj:n}),Object(v.jsxs)(j.d,{children:[o&&Object(v.jsx)(j.b,{exact:!0,path:"/verifying",children:Object(v.jsx)(P,{setNotWatching:m})}),c?Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(j.a,{from:"/",to:"/home"}),Object(v.jsx)(j.b,{exact:!0,path:"/home",children:Object(v.jsx)(L,{userObj:n})}),Object(v.jsx)(j.b,{exact:!0,path:"/profile",children:Object(v.jsx)(N,{userObj:n,refreshUser:t})})]}):Object(v.jsx)(v.Fragment,{children:Object(v.jsx)(j.b,{path:"*",children:Object(v.jsx)(z,{userObj:n,isLoggedIn:c})})})]}),c&&O&&Object(v.jsx)(D,{})]})},T=(c(61),c(35)),V=c(23),q=c(36),H=Object(V.a)(d||(d=Object(T.a)(["\n",";\n"])),q.a);var W=function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(null),s=Object(i.a)(a,2),l=s[0],j=s[1];return Object(r.useEffect)((function(){b.onAuthStateChanged((function(e){j(e?{displayName:e.displayName,uid:e.uid,email:e.email,photoURL:e.photoURL,creationTime:e.metadata.creationTime,updateProfile:function(t){return e.updateProfile(t)}}:null),n(!0)}))}),[]),Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(H,{}),c?Object(v.jsx)(B,{refreshUser:function(){var e=b.currentUser;j({displayName:e.displayName,uid:e.uid,email:e.email,photoURL:e.photoURL,creationTime:e.metadata.creationTime,updateProfile:function(t){return e.updateProfile(t)}})},isLoggedIn:Boolean(l),userObj:l}):"initializing..."]})};s.a.render(Object(v.jsx)(n.a.StrictMode,{children:Object(v.jsx)(W,{})}),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.c205b2d2.chunk.js.map