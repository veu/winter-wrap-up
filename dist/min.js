document.querySelector('meta').setAttribute('content',`width=device-width,initial-scale=${s=1/window.devicePixelRatio},maximum-scale=${s},user-scalable=no`);S=0;onclick=e=>{M&&(G&&(B-=D,C-=F),V[P]+=M,V[R]-=M,M=0)};ontouchstart=e=>{e=e.changedTouches.item(0);S=e.pageX;T=e.pageY};ontouchend=e=>{e=e.changedTouches.item(0);S&&((s=e.pageX-S)|(t=e.pageY-T)?onkeydown({which:abs(s)>abs(t)?s<0?37:39:t<0?38:40}):onclick(e))};ontouchmove=e=>e.preventDefault();V=H=[];for(i=11e3;i--;)H+=String.fromCharCode(sin(i/3501)*random()*6+128);for(i=64;i--;)B=C=M=G=Q=V[i]=D=0,F=1;for(i=10;i--;)V[k=random()*64|64]?i++:V[k]=3;for(i=40;i--;)V[k=random()*6+1<<3|random()*6+1]&4?i++:V[k]++;X=(e,f,s,t)=>{beginPath(),fillStyle='#'+'694e57fbd742fffeeedddccc'.substr(s*3,3),arc(e+16,f+16,t,0,7),fill()},I=(e,f,s,t)=>{X(B*32-F*f-(e+G*Q)*D,C*32+D*f-(e+G*Q)*F,k*3||s,t/2+k/4)},onkeydown=e=>{K&&((k=e.which-37)>>2||(e=(D=--k%2)+(s=B+D),f=(F=--k%2)+(t=C+F),s|t)>>3||(M=0,i=P=s<<3|t,(e|f)>>3||(M=min(4-V[R=e<<3|f],V[i]),V[i]-=M,V[R]+=M,M&&new Audio('data:audio/wav;base64,UklGRh0rAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YfkqAACA'+btoa(H)).play()),Q=32,(G=!V[i])&&(B=s,C=t)))},setInterval(s=e=>{c.height=(s=c.width=min(innerWidth,innerHeight*.85))/.85;X(Q=Q&&Q-2,K=0,0,s*2),scale(s/=256,s);fillStyle='#'+'000';fillRect(0,256,256,200);fillStyle='#'+'fff';fillText('Move all snow to brown spots. Keys or drag to move.',9,268);fillText('Tap to undo.',9,280);for(i=64;i--;)K|=V[i]&&!V[i|64];for(i=64;i--;)X(e=i/8<<5,f=i%8*32,K&&V[i|64],i%3+14);for(k=4;k--;)for(i=64;i--;)V[i]>k&&(e=i/8<<5,f=i%8*32,Q>k<<3||K?X(e-(s=k<M&&i==R)*D*Q,k*2+f-s*F*Q+2-V[i]*2,k+4,k*2+6):X(e,f+i%7,3-k,k*2+i%2+1));for(k=2;k--;)I(Q?9:8,0,1,5),I(-7,0,2,12);for(k=2;k--;)for(i=8;i--;)I(4-i,0,2,9);for(k=2;k--;)for(i=4;i--;)I(i%2/2-12,i%2*3+3-i*3,i%2+3,1+i%2/2),I(3-i*3,2-i%2*3,1,i*2+5)},20)