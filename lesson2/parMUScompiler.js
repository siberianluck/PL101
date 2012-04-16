var endTime = function (time, expr) {
    if(expr.tag === 'note'){
        return time + expr.dur;
    }
    if(expr.tag === 'seq'){
        return time + endTime(0, expr.left) + endTime(0, expr.right);
    }
    if(expr.tag === 'par'){
        return time + Math.max(endTime(0, expr.left), endTime(0, expr.right));
    }    
};

var compileT = function (expr, t){
    if(expr.tag === 'note'){
        return { tag: 'note', pitch: expr.pitch, start: t, dur: expr.dur };
    }
    if(expr.tag === 'seq'){
        return [].concat(compileT(expr.left, t), compileT(expr.right, endTime(t,expr.left)));
    }
    if(expr.tag === 'par'){
        return [].concat(compileT(expr.left, t), compileT(expr.right, t));
    }
};

var compile = function (musexpr) {
    if(musexpr.tag === 'note'){
        return [compileT(musexpr,0)];
    }
    console.log(compileT(musexpr, 0));
    return compileT(musexpr, 0);
};

