const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=process.argv[2]||'index.html';
const source=fs.readFileSync(path,'utf8');
const scripts=[...source.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.forEach(s=>new vm.Script(s));
const ctx=vm.createContext({});vm.runInContext(scripts[0]+';globalThis.E=Idle;',ctx);const E=ctx.E;
let checks=0;function equal(a,b){assert.equal(a,b);checks++}function near(a,b){assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);checks++}
let s=E.defaults(),a=E.calculate(s);equal(a.ready,false);equal(a.delta,null);equal(a.perPax,null);equal(a.periods[2].delta,null);
s.trips=10;s.rate=5;s.passengers=300;s.fare=80;s.margin=2;a=E.calculate(s);near(a.legs,20);near(a.currentKm,34);near(a.utilKm,216);near(a.deltaKm,182);near(a.current,170);near(a.util,1080);near(a.delta,910);near(a.periods[1].delta,5460);near(a.periods[2].delta,23660);near(a.periods[3].delta,283920);near(a.perPax,910/300);near(a.share,910/300/80*100);near(a.raise,3.04);near(a.newFare,83.04);near(a.marginAfter,2-910/300);
s.years=3;near(E.calculate(s).periods[3].delta,851760);s.monthDays=20;s.yearMonths=10;a=E.calculate(s);near(a.periods[2].delta,18200);near(a.periods[3].delta,546000);
s.access='trip1';near(E.calculate(s).delta,455);s.access='day2';near(E.calculate(s).delta,91);s.trips=0;near(E.calculate(s).delta,0);
s=E.defaults();s.trips=10;s.useFuel=true;s.fuelPct=20;a=E.calculate(s);near(a.rate,2.976);near(a.delta,541.632);near(a.periods[2].delta,14082.432);
s.fuelPct=-100;near(E.calculate(s).delta,0);s.useFuel=false;s.rate=0;equal(E.calculate(s).ready,true);near(E.calculate(s).delta,0);s.rate=5;s.passengers=0;equal(E.calculate(s).perPax,null);s.passengers=100;s.currentKm=10.8;s.utilKm=1.7;a=E.calculate(s);near(a.delta,-910);near(a.raise,0);
s=E.defaults();equal(E.validate(s).access,'trip2');for(const change of [{efficiency:0},{weekDays:8},{monthDays:32},{yearMonths:13},{years:0},{rate:-1},{access:'oops'},{fuelPct:-101}]){assert.throws(()=>E.validate({...s,...change}));checks++}
console.log(`${checks} verificações passaram: KM ocioso, custo unitário, períodos, diesel, tarifa, margem e ausência de dados.`);
