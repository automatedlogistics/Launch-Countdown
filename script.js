function launch(){launchFrom(Math.random()*SCREEN_WIDTH*2/3+SCREEN_WIDTH/6)}function launchFrom(a){if(rockets.length<10){var b=new Rocket(a);b.explosionColor=10*Math.floor(360*Math.random()/10),b.vel.y=-3*Math.random()-4,b.vel.x=6*Math.random()-3,b.size=8,b.shrink=.999,b.gravity=.01,rockets.push(b)}}function loop(){SCREEN_WIDTH!=window.innerWidth&&(canvas.width=SCREEN_WIDTH=window.innerWidth),SCREEN_HEIGHT!=window.innerHeight&&(canvas.height=SCREEN_HEIGHT=window.innerHeight),context.globalCompositeOperation="destination-out",context.fillStyle="rgba(0, 0, 0, 0.1)",context.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);for(var a=[],b=0;b<rockets.length;b++){rockets[b].update(),rockets[b].render(context);var c=Math.sqrt(Math.pow(mousePos.x-rockets[b].pos.x,2)+Math.pow(mousePos.y-rockets[b].pos.y,2)),d=rockets[b].pos.y<2*SCREEN_HEIGHT/3?100*Math.random()<=1:!1;rockets[b].pos.y<SCREEN_HEIGHT/5||rockets[b].vel.y>=0||50>c||d?rockets[b].explode():a.push(rockets[b])}rockets=a;for(var e=[],b=0;b<particles.length;b++)particles[b].update(),particles[b].exists()&&(particles[b].render(context),e.push(particles[b]));for(particles=e;particles.length>MAX_PARTICLES;)particles.shift()}function Particle(a){this.pos={x:a?a.x:0,y:a?a.y:0},this.vel={x:0,y:0},this.shrink=.97,this.size=2,this.resistance=1,this.gravity=0,this.flick=!1,this.alpha=1,this.fade=0,this.color=0}function Rocket(a){Particle.apply(this,[{x:a,y:SCREEN_HEIGHT}]),this.explosionColor=0}var module,countdown=function(a){function b(a,b){var c=a.getTime();return a.setMonth(a.getMonth()+b),Math.round((a.getTime()-c)/864e5)}function c(a){var b=a.getTime(),c=new Date(b);return c.setMonth(a.getMonth()+1),Math.round((c.getTime()-b)/864e5)}function d(a,b){if(b=b instanceof Date||null!==b&&isFinite(b)?new Date(+b):new Date,!a)return b;var c=+a.value||0;return c?(b.setTime(b.getTime()+c),b):((c=+a.milliseconds||0)&&b.setMilliseconds(b.getMilliseconds()+c),(c=+a.seconds||0)&&b.setSeconds(b.getSeconds()+c),(c=+a.minutes||0)&&b.setMinutes(b.getMinutes()+c),(c=+a.hours||0)&&b.setHours(b.getHours()+c),(c=+a.weeks||0)&&(c*=7),(c+=+a.days||0)&&b.setDate(b.getDate()+c),(c=+a.months||0)&&b.setMonth(b.getMonth()+c),(c=+a.millennia||0)&&(c*=10),(c+=+a.centuries||0)&&(c*=10),(c+=+a.decades||0)&&(c*=10),(c+=+a.years||0)&&b.setFullYear(b.getFullYear()+c),b)}function e(a,b){return p(a)+(1===a?j[b]:k[b])}function f(){}function g(a,b,d,e,f,g){if(0<=a[d]&&(b+=a[d],delete a[d]),b/=f,1>=b+1)return 0;if(0<=a[e]){switch(a[e]=+(a[e]+b).toFixed(g),e){case"seconds":if(60!==a.seconds||isNaN(a.minutes))break;a.minutes++,a.seconds=0;case"minutes":if(60!==a.minutes||isNaN(a.hours))break;a.hours++,a.minutes=0;case"hours":if(24!==a.hours||isNaN(a.days))break;a.days++,a.hours=0;case"days":if(7!==a.days||isNaN(a.weeks))break;a.weeks++,a.days=0;case"weeks":if(a.weeks!==c(a.refMonth)/7||isNaN(a.months))break;a.months++,a.weeks=0;case"months":if(12!==a.months||isNaN(a.years))break;a.years++,a.months=0;case"years":if(10!==a.years||isNaN(a.decades))break;a.decades++,a.years=0;case"decades":if(10!==a.decades||isNaN(a.centuries))break;a.centuries++,a.decades=0;case"centuries":if(10!==a.centuries||isNaN(a.millennia))break;a.millennia++,a.centuries=0}return 0}return b}function h(a,d,e,f,h,i){var j=new Date;a.start=d=d||j,a.end=e=e||j,a.units=f,a.value=e.getTime()-d.getTime(),0>a.value&&(j=e,e=d,d=j),a.refMonth=new Date(d.getFullYear(),d.getMonth(),15,12,0,0);try{a.millennia=0,a.centuries=0,a.decades=0,a.years=e.getFullYear()-d.getFullYear(),a.months=e.getMonth()-d.getMonth(),a.weeks=0,a.days=e.getDate()-d.getDate(),a.hours=e.getHours()-d.getHours(),a.minutes=e.getMinutes()-d.getMinutes(),a.seconds=e.getSeconds()-d.getSeconds(),a.milliseconds=e.getMilliseconds()-d.getMilliseconds();var k;for(0>a.milliseconds?(k=r(-a.milliseconds/1e3),a.seconds-=k,a.milliseconds+=1e3*k):1e3<=a.milliseconds&&(a.seconds+=s(a.milliseconds/1e3),a.milliseconds%=1e3),0>a.seconds?(k=r(-a.seconds/60),a.minutes-=k,a.seconds+=60*k):60<=a.seconds&&(a.minutes+=s(a.seconds/60),a.seconds%=60),0>a.minutes?(k=r(-a.minutes/60),a.hours-=k,a.minutes+=60*k):60<=a.minutes&&(a.hours+=s(a.minutes/60),a.minutes%=60),0>a.hours?(k=r(-a.hours/24),a.days-=k,a.hours+=24*k):24<=a.hours&&(a.days+=s(a.hours/24),a.hours%=24);0>a.days;)a.months--,a.days+=b(a.refMonth,1);if(7<=a.days&&(a.weeks+=s(a.days/7),a.days%=7),0>a.months?(k=r(-a.months/12),a.years-=k,a.months+=12*k):12<=a.months&&(a.years+=s(a.months/12),a.months%=12),10<=a.years&&(a.decades+=s(a.years/10),a.years%=10,10<=a.decades&&(a.centuries+=s(a.decades/10),a.decades%=10,10<=a.centuries&&(a.millennia+=s(a.centuries/10),a.centuries%=10))),d=0,!(1024&f)||d>=h?(a.centuries+=10*a.millennia,delete a.millennia):a.millennia&&d++,!(512&f)||d>=h?(a.decades+=10*a.centuries,delete a.centuries):a.centuries&&d++,!(256&f)||d>=h?(a.years+=10*a.decades,delete a.decades):a.decades&&d++,!(128&f)||d>=h?(a.months+=12*a.years,delete a.years):a.years&&d++,!(64&f)||d>=h?(a.months&&(a.days+=b(a.refMonth,a.months)),delete a.months,7<=a.days&&(a.weeks+=s(a.days/7),a.days%=7)):a.months&&d++,!(32&f)||d>=h?(a.days+=7*a.weeks,delete a.weeks):a.weeks&&d++,!(16&f)||d>=h?(a.hours+=24*a.days,delete a.days):a.days&&d++,!(8&f)||d>=h?(a.minutes+=60*a.hours,delete a.hours):a.hours&&d++,!(4&f)||d>=h?(a.seconds+=60*a.minutes,delete a.minutes):a.minutes&&d++,!(2&f)||d>=h?(a.milliseconds+=1e3*a.seconds,delete a.seconds):a.seconds&&d++,!(1&f)||d>=h){var l=g(a,0,"milliseconds","seconds",1e3,i);if(l&&(l=g(a,l,"seconds","minutes",60,i))&&(l=g(a,l,"minutes","hours",60,i))&&(l=g(a,l,"hours","days",24,i))&&(l=g(a,l,"days","weeks",7,i))&&(l=g(a,l,"weeks","months",c(a.refMonth)/7,i))){f=l;var m,n=a.refMonth,o=n.getTime(),p=new Date(o);if(p.setFullYear(n.getFullYear()+1),m=Math.round((p.getTime()-o)/864e5),(l=g(a,f,"months","years",m/c(a.refMonth),i))&&(l=g(a,l,"years","decades",10,i))&&(l=g(a,l,"decades","centuries",10,i))&&(l=g(a,l,"centuries","millennia",10,i)))throw Error("Fractional unit overflow")}}}finally{delete a.refMonth}return a}function i(a,b,c,e,g){var i;c=+c||222,e=e>0?e:NaN,g=g>0?20>g?Math.round(g):20:0;var j=null;"function"==typeof a?(i=a,a=null):a instanceof Date||(null!==a&&isFinite(a)?a=new Date(+a):("object"==typeof j&&(j=a),a=null));var k=null;if("function"==typeof b?(i=b,b=null):b instanceof Date||(null!==b&&isFinite(b)?b=new Date(+b):("object"==typeof b&&(k=b),b=null)),j&&(a=d(j,b)),k&&(b=d(k,a)),!a&&!b)return new f;if(!i)return h(new f,a,b,c,e,g);var l,j=1&c?1e3/30:2&c?1e3:4&c?6e4:8&c?36e5:16&c?864e5:6048e5,k=function(){i(h(new f,a,b,c,e,g),l)};return k(),l=setInterval(k,j)}var j,k,l,m,n,o,p,q,r=Math.ceil,s=Math.floor;f.prototype.toString=function(a){var b=q(this),c=b.length;return c?1===c?b[0]:(a=l+b.pop(),b.join(m)+a):a?""+a:n},f.prototype.toHTML=function(a,b){a=a||"span";var c=q(this),d=c.length;if(!d)return(b=b||n)?"<"+a+">"+b+"</"+a+">":b;for(var e=0;d>e;e++)c[e]="<"+a+">"+c[e]+"</"+a+">";return 1===d?c[0]:(d=l+c.pop(),c.join(m)+d)},f.prototype.addTo=function(a){return d(this,a)},q=function(a){var b=[],c=a.millennia;return c&&b.push(o(c,10)),(c=a.centuries)&&b.push(o(c,9)),(c=a.decades)&&b.push(o(c,8)),(c=a.years)&&b.push(o(c,7)),(c=a.months)&&b.push(o(c,6)),(c=a.weeks)&&b.push(o(c,5)),(c=a.days)&&b.push(o(c,4)),(c=a.hours)&&b.push(o(c,3)),(c=a.minutes)&&b.push(o(c,2)),(c=a.seconds)&&b.push(o(c,1)),(c=a.milliseconds)&&b.push(o(c,0)),b},i.MILLISECONDS=1,i.SECONDS=2,i.MINUTES=4,i.HOURS=8,i.DAYS=16,i.WEEKS=32,i.MONTHS=64,i.YEARS=128,i.DECADES=256,i.CENTURIES=512,i.MILLENNIA=1024,i.DEFAULTS=222,i.ALL=2047;var t=i.setFormat=function(a){if(a){if("singular"in a||"plural"in a){var b=a.singular||[];b.split&&(b=b.split("|"));var c=a.plural||[];c.split&&(c=c.split("|"));for(var d=0;10>=d;d++)j[d]=b[d]||j[d],k[d]=c[d]||k[d]}"string"==typeof a.last&&(l=a.last),"string"==typeof a.delim&&(m=a.delim),"string"==typeof a.empty&&(n=a.empty),"function"==typeof a.formatNumber&&(p=a.formatNumber),"function"==typeof a.formatter&&(o=a.formatter)}},u=i.resetFormat=function(){j=" millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(";"),k=" milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(";"),l=" and ",m=", ",n="",p=function(a){return a},o=e};return i.setLabels=function(a,b,c,d,e,f,g){t({singular:a,plural:b,last:c,delim:d,empty:e,formatNumber:f,formatter:g})},i.resetLabels=u,u(),a&&a.exports?a.exports=i:"function"==typeof window.define&&"undefined"!=typeof window.define.amd&&window.define("countdown",[],function(){return i}),i}(module),Konami=function(a){var b={addEvent:function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&(a["e"+b+c]=c,a[b+c]=function(){a["e"+b+c](window.event,d)},a.attachEvent("on"+b,a[b+c]))},input:"",pattern:"38384040373937396665",load:function(a){this.addEvent(document,"keydown",function(c,d){return d&&(b=d),b.input+=c?c.keyCode:event.keyCode,b.input.length>b.pattern.length&&(b.input=b.input.substr(b.input.length-b.pattern.length)),b.input==b.pattern?(b.code(a),b.input="",c.preventDefault(),!1):void 0},this),this.iphone.load(a)},code:function(a){window.location=a},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:!1,capture:!1,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP"],code:function(a){b.code(a)},load:function(a){this.orig_keys=this.keys,b.addEvent(document,"touchmove",function(a){if(1==a.touches.length&&1==b.iphone.capture){var c=a.touches[0];b.iphone.stop_x=c.pageX,b.iphone.stop_y=c.pageY,b.iphone.tap=!1,b.iphone.capture=!1,b.iphone.check_direction()}}),b.addEvent(document,"touchend",function(c){1==b.iphone.tap&&b.iphone.check_direction(a)},!1),b.addEvent(document,"touchstart",function(a){b.iphone.start_x=a.changedTouches[0].pageX,b.iphone.start_y=a.changedTouches[0].pageY,b.iphone.tap=!0,b.iphone.capture=!0})},check_direction:function(a){x_magnitude=Math.abs(this.start_x-this.stop_x),y_magnitude=Math.abs(this.start_y-this.stop_y),x=this.start_x-this.stop_x<0?"RIGHT":"LEFT",y=this.start_y-this.stop_y<0?"DOWN":"UP",result=x_magnitude>y_magnitude?x:y,result=1==this.tap?"TAP":result,result==this.keys[0]&&(this.keys=this.keys.slice(1,this.keys.length)),0==this.keys.length&&(this.keys=this.orig_keys,this.code(a))}}};return"string"==typeof a&&b.load(a),"function"==typeof a&&(b.code=a,b.load()),b};Particle.prototype.update=function(){this.vel.x*=this.resistance,this.vel.y*=this.resistance,this.vel.y+=this.gravity,this.pos.x+=this.vel.x,this.pos.y+=this.vel.y,this.size*=this.shrink,this.alpha-=this.fade},Particle.prototype.render=function(a){if(this.exists()){a.save(),a.globalCompositeOperation="lighter";var b=this.pos.x,c=this.pos.y,d=this.size/2,e=a.createRadialGradient(b,c,.1,b,c,d);e.addColorStop(.1,"rgba(255,255,255,"+this.alpha+")"),e.addColorStop(.8,"hsla("+this.color+", 100%, 50%, "+this.alpha+")"),e.addColorStop(1,"hsla("+this.color+", 100%, 50%, 0.1)"),a.fillStyle=e,a.beginPath(),a.arc(this.pos.x,this.pos.y,this.flick?Math.random()*this.size:this.size,0,2*Math.PI,!0),a.closePath(),a.fill(),a.restore()}},Particle.prototype.exists=function(){return this.alpha>=.1&&this.size>=1},Rocket.prototype=new Particle,Rocket.prototype.constructor=Rocket,Rocket.prototype.explode=function(){for(var a=10*Math.random()+80,b=0;a>b;b++){var c=new Particle(this.pos),d=Math.random()*Math.PI*2,e=15*Math.cos(Math.random()*Math.PI/2);c.vel.x=Math.cos(d)*e,c.vel.y=Math.sin(d)*e,c.size=10,c.gravity=.2,c.resistance=.92,c.shrink=.05*Math.random()+.93,c.flick=!0,c.color=this.explosionColor,particles.push(c)}},Rocket.prototype.render=function(a){if(this.exists()){a.save(),a.globalCompositeOperation="lighter";var b=this.pos.x,c=this.pos.y,d=this.size/2,e=a.createRadialGradient(b,c,.1,b,c,d);e.addColorStop(.1,"rgba(255, 255, 255 ,"+this.alpha+")"),e.addColorStop(1,"hsla("+this.explosionColor+", 100%, 50%, 0.1)"),a.fillStyle=e,a.beginPath(),a.arc(this.pos.x,this.pos.y,this.flick?Math.random()*this.size/2+this.size/2:this.size,0,2*Math.PI,!0),a.closePath(),a.fill(),a.restore()}};var launchFireworks=!1,SCREEN_WIDTH=window.innerWidth,SCREEN_HEIGHT=window.innerHeight,mousePos={x:400,y:300},canvas=document.createElement("canvas"),context=canvas.getContext("2d"),particles=[],rockets=[],MAX_PARTICLES=400,colorCode=0;canvas.setAttribute("id","fireworks-display"),document.body.appendChild(canvas);var fireworksLoad=function(){launchFireworks=!0,canvas.width=SCREEN_WIDTH,canvas.height=SCREEN_HEIGHT,setInterval(launch,800),setInterval(loop,20)},fireworksEasterEgg=new Konami;fireworksEasterEgg.code=fireworksLoad,fireworksEasterEgg.load(),jQuery(function(a){a(document).ready(function(){setInterval(function(){a(".countdown-overlay .countdown").text(countdown(new Date(Date.UTC(2016,5,14,21,0,0))))},1e3)}),a(document).mousemove(function(a){launchFireworks&&(a.preventDefault(),mousePos={x:a.clientX,y:a.clientY})}),a(document).mousedown(function(a){if(launchFireworks)for(var b=0;5>b;b++)launchFrom(Math.random()*SCREEN_WIDTH*2/3+SCREEN_WIDTH/6)})});
//# sourceMappingURL=script.js.map