var mapDebug;require(["esri/map","esri/geometry/Point","esri/geometry/Multipoint","esri/geometry/Polyline","esri/geometry/Polygon","esri/graphic","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/InfoTemplate","./utils.js","dojo/_base/Color","dojo/on","dojo/dom","dojo/domReady!"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){"use strict";function N(e,n){var r=n?"my-icon-shout-pin":"icon-shout-pin",i=jQuery(x.replace("$TEXT",e.text).replace("$CLASS",r)),s=e.location,o=d.toScreen(new t(s.longitude,s.latitude));i.css({zIndex:1e3+T++,left:o.x,top:o.y});jQuery(".wrap").prepend(i).find("p").slideDown();setTimeout(function(){S?S=S.add(i):S=jQuery(".shout-box-wrapper")});setTimeout(function(){S=S.not(i);i.fadeOut()},e.timeout*1e3)}function C(e){var t=e.split(" "),n=t[2].split(""),r=t[3].split("");return t[0]+"/"+t[1]+"/"+n[0]+r[0]+"/"+n[1]+r[1]+"/"+n[2]+r[2]+"/"+n[3]+r[3]+"/"}function A(e){var t="Nei.ghbor.Net"+e+"shoutout",n=new Name(t),r=new Interest(n),i={};L=function(t,n,r,o){if(!t){setTimeout(function(){A(e)},250);return}var u=DataUtils.toString(r);u=JSON.parse(u);var a=u.text+u.timestamp;if(jQuery.inArray(a,E)>-1)return;E.push(a);N(u);k.push(DataUtils.toNumbersFromString(o));var f=new Name(n),l=new Interest(f);i.exclude=new Exclude(k);l.exclude=i.exclude;t.expressInterest(f,s,i)};var s=new ContentClosure(m,n,r,L);m.expressInterest(n,s,i)}function O(e){var t=D.split("/"),n="Nei.ghbor.Net";E.push(e.text+e.timestamp);N(e,!0);for(var r=0;r<6;r++){n=n+"/"+t[r];g[r]=new NDN({host:location.host.split(":")[0]});var i=new Name(n+"/shoutout"),s=new Name(n+"/shoutout/"+e.timestamp),o=g[r],u=new SignedInfo;u.freshnessSeconds=e.timeout;if(NDN.CSTable[r]==undefined)o.registerPrefix(i,new AsyncPutClosure(o,s,JSON.stringify(e),u));else{NDN.CSTable[r].closure.content=JSON.stringify(e);NDN.CSTable[r].closure.name=s}}}function B(e){M.left=e.xmin;M.right=e.xmax;M.top=e.ymax;M.bottom=e.ymin;var t=C(v.LLtoUSNG(M.top,M.left,4)).split("/"),n=C(v.LLtoUSNG(M.top,M.right,4)).split("/"),r=C(v.LLtoUSNG(M.bottom,M.left,4)).split("/"),i=C(v.LLtoUSNG(M.bottom,M.right,4)).split("/"),s=e.getCenter();H={latitude:s.y,longitude:s.x};P=v.LLtoUSNG(s.y,s.x,4);D=C(P);_="/";var o=0;while(t[o]==n[o]&&t[o]==r[o]&&t[o]==i[o]){_+=t[o]+"/";o++}A(_)}function j(e,t){var n={Lat:e.getLatitude().toFixed(2),Lon:e.getLongitude().toFixed(2)},r=new f("My Point","Latitude: ${Lat} <br/>Longitude: ${Lon}"),i=new s(e,pointSymbol,n,r);d.graphics.add(i)}function I(e){h(e,"extent-change",function(t,n,r,i){B(e.geographicExtent)});h(e,"pan",function(e){if(!S)return;var t=e.delta;q(t.x-F.x,t.y-F.y);F=t});h(e,"pan-end",function(){F={x:0,y:0};z()});var t;h(e,"zoom-start",function(e){t=e.extent;R()});h(e,"zoom-end",function(e){U(t,e.extent,e.zoomFactor,e.anchor)})}function q(e,t){S.css({left:"+="+e+"px",top:"+="+t+"px"})}function R(){if(!S)return;S.css("visibility","hidden")}function U(e,t,n,r){if(!S)return;var i=r.x,s=r.y,o=w.width(),u=w.height(),a=jQuery(".shouts.remove");S.each(function(e,t){t=jQuery(t);var r=t.position(),f={visibility:"visible",left:r.left+(r.left-i)*(n-1),top:r.top+(r.top-s)*(n-1)};t.css(f)});if(a.length){S=S.not(a);a.remove()}}function z(){return;var e,t,n}var d,v=org.mymanatee.common.usng,m=new NDN({host:location.host.split(":")[0]}),g=[],y,b={},w,E=[],S,x='<div class="shout-box-wrapper"><div class="shout-box"><p class="shout" style="display:none;">$TEXT</p></div><i class="icon $CLASS">,</i></div>';jQuery(window).on("resize load",function(){w||(w=jQuery("#myMap"));b=w.position()});var T=0,k=[],L,M={top:0,right:0,bottom:0,left:0},_="/",D="/",P,H;if("geolocation"in navigator)navigator.geolocation.getCurrentPosition(function(t){var n=H=t.coords;d=mapDebug=new e("myMap",{basemap:"streets",center:[n.longitude,n.latitude],zoom:12});l.autoRecenter(d);I(d)});else{d=new e("myMap",{basemap:"streets",center:[-79.4,43.55],zoom:9});l.autoRecenter(d)}var F={x:0,y:0},W=function(e){var t=X.val();if(!t)return;setTimeout(function(){X.val("")});var n={text:t,timeout:60,location:H,timestamp:(new Date).getTime()};O(n)},X=jQuery("#shout").blur(W),V=jQuery(".shoutBox i").click(W)});