document.querySelector('meta').setAttribute('content',`width=device-width,initial-scale=${s=1/window.devicePixelRatio},maximum-scale=${s},user-scalable=no`);T=0;ontouchstart=(e,f,s,t)=>{e=e.changedTouches.item(0);T=e.pageX;U=e.pageY};ontouchend=(e,f,s,t)=>{e=e.changedTouches.item(0);T&&(s=e.pageX-T)|(t=e.pageY-U)&&onkeydown({which:abs(s)>abs(t)?s<0?37:39:t<0?38:40})};ontouchmove=(e,f,s,t)=>e.preventDefault();V=H=[];for(i=11e3;i--;)H+=String.fromCharCode(sin(i/3501)*random()*6+128);for(i=64;i--;)B=C=P=G=R=V[i]=D=0,F=1;for(i=10;i--;)V[k=random()*64|64]?i++:V[k]=3;for(i=40;i--;)V[k=random()*6+1<<3|random()*6+1]&4?i++:V[k]++;X=(e,f,s,t)=>{beginPath(),fillStyle='#'+'694e57fbd742fffeeedddccc'.substr(s*3,3),arc(e+16,f+16,t,0,7),fill()},I=(e,f,s,t)=>{X(B*32-F*f-(e+G*R)*D,C*32+D*f-(e+G*R)*F,k*3||s,t/2+k/4)},onkeydown=(e,f,s,t)=>{K&&(k=e.which-37,k>>2?P&&(G&&(B-=D,C-=F),V[Q]+=P,V[S]-=P,P=0):(e=(D=--k%2)+(s=B+D),f=(F=--k%2)+(t=C+F),s|t)>>3||(P=0,i=Q=s<<3|t,(e|f)>>3||(P=min(4-V[S=e<<3|f],V[i]),V[i]-=P,V[S]+=P,P&&new Audio('data:audio/wav;base64,UklGRh0rAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YfkqAACA'+btoa(H)).play()),R=32,(G=!V[i])&&(B=s,C=t)))},setInterval(s=(e,f,s,t)=>{X(R=R&&R-2,K=0,0,(s=c.height=c.width=min(innerWidth,innerHeight))*2),scale(s/=256,s);for(i=64;i--;)K|=V[i]&&!V[i|64];for(i=64;i--;)X(e=i/8<<5,f=i%8*32,K&&V[i|64],i%3+14);for(k=4;k--;)for(i=64;i--;)V[i]>k&&(e=i/8<<5,f=i%8*32,R>k<<3||K?X(e-(s=k<P&&i==S)*D*R,k*2+f-s*F*R+2-V[i]*2,k+4,k*2+6):X(e,f+i%7,3-k,k*2+i%2+1));for(k=2;k--;)I(R?9:8,0,1,5),I(-7,0,2,12);for(k=2;k--;)for(i=8;i--;)I(4-i,0,2,9);for(k=2;k--;)for(i=4;i--;)I(i%2/2-12,i%2*3+3-i*3,i%2+3,1+i%2/2),I(3-i*3,2-i%2*3,1,i*2+5)},20)