var mapDebug;require(["esri/map","esri/geometry/Point","esri/geometry/Multipoint","esri/geometry/Polyline","esri/geometry/Polygon","esri/graphic","esri/symbols/SimpleMarkerSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/InfoTemplate","./utils.js","dojo/_base/Color","dojo/on","dojo/dom","dojo/domReady!"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){"use strict";function x(e,n){var r=jQuery(S.replace("$TEXT",e.text)),i=e.location,s=d.toScreen(new t(i.longitude,i.latitude));r.css({left:s.x,top:s.y});jQuery(".wrap").prepend(r).find("p").slideDown();setTimeout(function(){E?E=E.add(r):mapDebug=E=jQuery(".shout-box-wrapper")});setTimeout(function(){E=E.not(r);r.fadeOut()},e.timeout*1e3)}function T(e){var t=e.split(" "),n=t[2].split(""),r=t[3].split("");return t[0]+"/"+t[1]+"/"+n[0]+r[0]+"/"+n[1]+r[1]+"/"+n[2]+r[2]+"/"+n[3]+r[3]+"/"}function k(e){var t="Nei.ghbor.Net"+e+"shoutout",n=new Name(t),r=new Interest(n),i={};C=function(t,n,r,o){if(!t){setTimeout(function(){k(e)},250);return}var u=DataUtils.toString(r);u=JSON.parse(u);var a=u.text+u.timestamp;if(jQuery.inArray(a,w)>-1)return;w.push(a);x(u);N.push(DataUtils.toNumbersFromString(o));var f=new Name(n),l=new Interest(f);i.exclude=new Exclude(N);l.exclude=i.exclude;t.expressInterest(f,s,i)};var s=new ContentClosure(m,n,r,C);m.expressInterest(n,s,i)}function L(e){var t=M.split("/"),n="Nei.ghbor.Net";w.push(e.text+e.timestamp);x(e,!0);for(var r=0;r<6;r++){n=n+"/"+t[r];m[r]=new NDN({host:"localhost"});var i=new Name(n+"/shoutout"),s=new Name(n+"/shoutout/"+e.timestamp),o=m[r],u=new SignedInfo;u.freshnessSeconds=e.timeout;if(NDN.CSTable[r]==undefined)o.registerPrefix(i,new AsyncPutClosure(o,s,JSON.stringify(e),u));else{NDN.CSTable[r].closure.content=JSON.stringify(e);NDN.CSTable[r].closure.name=s}}}function P(e){A.left=e.xmin;A.right=e.xmax;A.top=e.ymax;A.bottom=e.ymin;var t=T(v.LLtoUSNG(A.top,A.left,4)).split("/"),n=T(v.LLtoUSNG(A.top,A.right,4)).split("/"),r=T(v.LLtoUSNG(A.bottom,A.left,4)).split("/"),i=T(v.LLtoUSNG(A.bottom,A.right,4)).split("/"),s=e.getCenter();D={latitude:s.y,longitude:s.x};_=v.LLtoUSNG(s.y,s.x,4);M=T(_);O="/";var o=0;while(t[o]==n[o]&&t[o]==r[o]&&t[o]==i[o]){O+=t[o]+"/";o++}k(O)}function H(e,t){var n={Lat:e.getLatitude().toFixed(2),Lon:e.getLongitude().toFixed(2)},r=new f("My Point","Latitude: ${Lat} <br/>Longitude: ${Lon}"),i=new s(e,pointSymbol,n,r);d.graphics.add(i)}function j(e){h(e,"extent-change",function(t,n,r,i){P(e.geographicExtent)});h(e,"click",function(t){e.centerAt(t.mapPoint)});h(e,"pan",function(e){var t=e.delta;F(t.x-B.x,t.y-B.y);B=t});h(e,"pan-end",function(){B={x:0,y:0};R()});var t;h(e,"zoom-start",function(e){t=e.extent;I()});h(e,"zoom-end",function(e){q(t,e.extent,e.zoomFactor,e.anchor)})}function F(e,t){E.css({left:"+="+e+"px",top:"+="+t+"px"})}function I(){if(!E)return;E.css("visibility","hidden")}function q(e,t,n,r){if(!E)return;var i=r.x,s=r.y,o=b.width(),u=b.height(),a=jQuery(".shouts.remove");E.each(function(e,t){t=jQuery(t);var r=t.position(),f={visibility:"visible",left:r.left+(r.left-i)*(n-1),top:r.top+(r.top-s)*(n-1)};t.css(f)});if(a.length){E=E.not(a);a.remove()}}function R(){return;var e,t,n}var d,v=org.mymanatee.common.usng,m=new NDN({host:"localhost"}),g,y={},b,w=[],E,S='<div class="shout-box-wrapper"><div class="shout-box"><p class="shout" style="display:none;">$TEXT</p></div><i class="icon icon-shout-pin">,</i></div>';jQuery(window).on("resize load",function(){b||(b=jQuery("#myMap"));y=b.position()});var N=[],C,A={top:0,right:0,bottom:0,left:0},O="/",M="/",_,D;if("geolocation"in navigator)navigator.geolocation.getCurrentPosition(function(t){var n=D=t.coords;d=mapDebug=new e("myMap",{basemap:"streets",center:[n.longitude,n.latitude],zoom:12});l.autoRecenter(d);j(d)});else{d=new e("myMap",{basemap:"streets",center:[-79.4,43.55],zoom:9});l.autoRecenter(d)}var B={x:0,y:0},U=jQuery("#shout").on("blur",function(e){var t=U.val();if(!t)return;var n={text:t,timeout:60,location:D,timestamp:(new Date).getTime()};L(n)})});