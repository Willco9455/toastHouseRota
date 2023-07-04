// gets the current moday
export function getMonday(date) {
    let d = new Date(date)
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


export function addDays(date, days) {
    return date.addDays(days);
}

export function get24Hour(dateTime) {
    let hours = dateTime.getHours().toString()
    let mins = dateTime.getMinutes().toString()
    if (hours.length === 1) {
      hours = '0' + hours
    }
    if (mins.length === 1) {
      mins = '0' + mins
    }
    return hours + ':' + mins
  }

// returns array of dateTime objects representing a week from the given date d
export function getWeekFrom(d) {
    let week = [d];
	for (let i = 1; i < 7; i++) {
        week.push(d.addDays(i))
	}
    week.shift();
    week.pop();
	return week;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export function addMonthsToDate(date, months) {
    return new Date(new Date(date).setMonth(date.getMonth() + months))
}

// Get the mondays of the month, **Copied from stack overflow**
export function getMondaysFromDate(date) {
    var d = date,
        month = d.getMonth(),
        mondays = [];
    d.setDate(1);

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return mondays;
}

// **
//  * Returns the week number for this date.  dowOffset is the day of week the week
//  * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
//  * the week returned is the ISO 8601 week number.
//  * @param int dowOffset
//  * @return int
//  */
Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};
