"use strict";!function(t){function r(t){this.figures=t||[[[0,1],[1,1],[1,0]],[[1],[1],[1],[1]],[[1,0],[1,0],[1,1]],[[0,1],[0,1],[1,1]],[[1,1],[1,1]]],this.random()}r.prototype.random=function(){this.figure=this.figures[Math.floor(Math.random()*this.figures.length)]},r.prototype.rotateLeft=function(){for(var t=this.figure,r=new Array(t[0].length),e=0;e<t[0].length;e++){for(var n=new Array(t.length),o=0;o<t.length;o++)n[o]=t[o][t[0].length-1-e];r[e]=n}return r},r.prototype.rotateRight=function(){for(var t=this.figure,r=new Array(t[0].length),e=0;e<t[0].length;e++){for(var n=new Array(t.length),o=0;o<t.length;o++)n[o]=t[t.length-1-o][e];r[e]=n}return r},t.app=t.app||{},t.app.Figure=r}(window);