const converter = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const range = (start, end) => {
    let dates = [];
    let current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
        dates.push(current.toISOString());
        current.setDate(current.getDate() + 1);
    } 
    return dates;
}

module.exports = { converter, range }