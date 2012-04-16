var compileT = function (expr, t){
    if(expr.tag === 'note'){
        return { tag: 'note', pitch: expr.pitch, start: t, dur: expr.dur };
    }
    if(expr.tag === 'seq'){
        return [].concat(compileT(expr.left, t), compileT(expr.right, endTime(t,expr.left)));
    }
};

var compile = function (musexpr) {
    if(musexpr.tag === 'note'){
        return [compileT(musexpr,0)];
    }
    return compileT(musexpr, 0);
};
