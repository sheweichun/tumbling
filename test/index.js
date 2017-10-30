function getFloatPart(val){
    const valStr = val + '';
    const dotIndex = valStr.indexOf('.');
    if(dotIndex < 0){
        return 0
    }
    return parseFloat(valStr.substring(dotIndex))
}


function getFloatPart1(val){
    return val % 1;
}



function run(fn,times,desc){
    const startTm = Date.now();
    for(let i = 0; i < times; i++){
        fn(3242.4343)
    }
    console.log(`${desc} use time :`,Date.now() - startTm);
}

const runTimes = 10000000;
run(getFloatPart,runTimes,'getFloatPart')
run(getFloatPart1,runTimes,'getFloatPart1')