const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('index.html','utf8');
const scripts=[...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.forEach(s=>new vm.Script(s));
const context=vm.createContext({Date,Intl});vm.runInContext(scripts[0]+';globalThis.E=Engine;',context);const E=context.E;
let checks=0;function near(actual,expected){assert.ok(Math.abs(actual-expected)<1e-7,`${actual} != ${expected}`);checks++}function equal(a,b){assert.equal(a,b);checks++}
let s=E.defaults();s.month='2026-11';s.days=s.days.map(()=>({trips:10,pax:300,legs:3}));
let a=E.analyze(s,'day');near(a.current.km,34);near(a.util.km,216);near(a.delta,451.36);equal(a.fare.increase,1.51);
a=E.analyze(s,'week');near(a.delta,3159.52);near(a.q.trips,70);near(a.q.pax,2100);
a=E.analyze(s,'month');near(a.q.trips,300);near(a.delta,13540.8);near(a.q.pax,9000);equal(E.counts('2026-11').join(','),'5,4,4,4,4,4,5');equal(E.counts('2028-02').reduce((a,b)=>a+b,0),29);
s.dieselPct=20;a=E.analyze(s,'day');near(a.util.total,642.816);near(a.delta,558.496);equal(a.fare.increase,1.87);
s.lineKm=100;s.wear=.5;s.fixedCurrent=12000;s.fixedUtil=8000;a=E.analyze(s,'month');near(a.current.km,31020);near(a.util.km,36480);near(a.current.fixed,12000);near(a.util.fixed,8000);
s.costs=[{name:'driver',unit:'trip',current:10,util:20},{name:'credit',unit:'month',current:-500,util:-300}];a=E.analyze(s,'month');near(a.current.extra,2500);near(a.util.extra,5700);
s.legMode='day2';a=E.analyze(s,'month');near(a.q.legs,60);s.legMode='trip1';near(E.analyze(s,'month').q.legs,300);s.legMode='manual';near(E.analyze(s,'month').q.legs,90);
s=E.defaults();s.month='2026-11';s.days=s.days.map(()=>({trips:1,pax:10,legs:0}));s.investment=1200;s.amortMonths=12;s.retention=95;s.paying=50;a=E.analyze(s,'month');near(a.installment,100);near(a.fare.payers,150);near(a.fare.raw,(1354.08+100)/150/.95);equal(a.fare.increase,10.21);
s.horizon=12;let h=E.horizon(s);near(h.pax,3650);near(h.delta,365*45.136+1200);near(h.util-h.current+1200,h.delta);
s=E.defaults();s.month='2026-11';s.fixedCurrent=1000;s.fixedUtil=500;s.investment=1200;h=E.horizon(s);equal(h.payback,3);near(h.delta,-4800);equal(E.analyze(s,'month').fare.increase,null);
near(E.evaluate('(custo - atual) / passageiros',{custo:200,atual:100,passageiros:10}),10);near(E.evaluate('100 * 10%',{}),10);near(E.evaluate('1,5 + 2 * (3 - 1)',{}),5.5);near(E.evaluate('-10 + +2',{}),-8);near(E.evaluate('200 * (1 + 15%)',{}),230);
for(const expr of ['1 / 0','globalThis.process.exit()','1;2','x + 1','(1+2','1 2','1**2','1e309']){assert.throws(()=>E.evaluate(expr,{}));checks++}
equal(E.validate(E.defaults()).version,1);assert.throws(()=>E.validate({...E.defaults(),effLine:0}));checks++;assert.throws(()=>E.validate({...E.defaults(),month:'2026-99'}));checks++;assert.throws(()=>E.validate({...E.defaults(),paying:0}));checks++;
console.log(`${checks} verificações passaram: calendário, custos, diesel, tarifa, rateios, horizonte, retorno, fórmulas e importação.`);
