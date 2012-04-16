var endTime = function (time, expr) {
    if(expr.tag === 'note'){
        return time + expr.dur;
    }
    if(expr.tag === 'seq'){
        return time + endTime(0, expr.left) + endTime(0, expr.right);
    }
};
