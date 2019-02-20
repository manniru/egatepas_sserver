let countTransactionSum = array => (
    array.reduce(function (total, current) {
        if (current['operation'] === 'outcome') {
            return +total - +current['entry'];
        } else {
            return +total + +current['entry'];
        }
    }, 0)
);

let formatDate = dateMs => {
    let date = new Date(dateMs);
    let d = date.getDate(),
        m = date.getMonth() + 1,
        y = date.getFullYear();

    return d + '/' + m + '/' + y;
};

export {formatDate, countTransactionSum};