function test1(obj){
  obj.abc += 3;
}

const name = 'abc'
function test2(obj){
  obj[name] += 3;
}


function cal(fn,args,times){
  let dt = Date.now();
  for(let i = 0; i < times; i++){
      fn.call(null,args);
  }
  return (Date.now() - dt);
}

const total = 100000000;

const d1 = cal(test1,{abc:0},total);
const d2 = cal(test2,{abc:0},total);

console.log(d1 + ' vs ' + d2);