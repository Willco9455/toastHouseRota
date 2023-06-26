export function getMonday() {
    d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

export function getWeekFrom(d) {
	let week = [];
	for (let i = 0; i < 7; i++) {
		week.push(d.addDays(i))
	}
	return week;
}

