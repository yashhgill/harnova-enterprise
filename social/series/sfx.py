import numpy as np, wave
SR=44100; D=13.5; out=np.zeros(int(SR*D))
def add(sig,t,g=1.0):
    i=int(t*SR); n=min(len(sig),len(out)-i); out[i:i+n]+=sig[:n]*g
def env(n,a=.005,r=.1):
    t=np.arange(n)/SR; e=np.minimum(1,t/a)*np.exp(-t/r); return e
def chirp(f0,f1,dur,g=.35):
    n=int(dur*SR); t=np.arange(n)/SR; f=np.linspace(f0,f1,n); ph=2*np.pi*np.cumsum(f)/SR
    s=np.sin(ph)+.3*np.sin(2*ph); return s*np.minimum(1,t/.01)*np.minimum(1,(dur-t)/.03)*g
def click(g=.5):
    n=int(.05*SR); return np.random.randn(n)*env(n,.0005,.008)*g + np.sin(2*np.pi*1800*np.arange(n)/SR)*env(n,.0005,.01)*g*.5
# pad bed: soft chords, lo-fi-ish
t=np.arange(len(out))/SR
for f in [110,164.8,220,277.2]:
    out+=.035*np.sin(2*np.pi*f*t)*(0.6+.4*np.sin(2*np.pi*.12*t+f))
# gentle beat: kick every 0.75s from 4.3 to 10.6
for bt in np.arange(4.3,10.6,.75):
    n=int(.25*SR); tt=np.arange(n)/SR; add(np.sin(2*np.pi*(55+90*np.exp(-tt*30))*tt)*np.exp(-tt*12),bt,.35)
    add(click(.12),bt+.375)
# Nova hop chirp + landing click
add(chirp(500,1400,.18),1.6); add(click(.8),2.2); add(chirp(900,1300,.08,.25),2.3); add(chirp(1300,1600,.08,.25),2.4)
# keyboard typing ambience under Boss lines
for bt in np.arange(4.5,10.5,.17)+np.random.rand(len(np.arange(4.5,10.5,.17)))*.05: add(click(.05),bt)
# record-scratch-ish stop at 10.6, then sad descending chirp at 11.2
n=int(.25*SR); add(np.random.randn(n)*env(n,.001,.08)*.25,10.6)
out[int(10.65*SR):]*=.25
add(chirp(1200,350,.7,.4),11.2)
out/=max(1,np.abs(out).max()/0.9)
w=wave.open('sfx.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
print('ok')
