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

const WIBConverter = (dateStr) => {
    return new Date(dateStr).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}

module.exports = { converter, range, WIBConverter }