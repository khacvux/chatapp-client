import moment from 'moment'
const dateShort = (time: moment.Moment | string, withoutPreOrSuffix: boolean = false, now?: moment.Moment) => {
	var day: number, hour: number, minute: number, week: number;
	minute = 6e4;
	hour = 36e5;
	day = 864e5;
	week = 6048e5;
	time = moment(time)
	var t_now: moment.Moment = now || moment();
	var diff: number = Math.abs(moment(time).diff(t_now));
	var unit: string = "";
	var num: number = NaN;
	var shortFormat: string | undefined;
	if (diff < minute) {
		unit = 'seconds';
	} else if (diff < hour) {
		unit = 'minutes';
	} else if (diff < day) {
		unit = 'hours';
	} else if (diff < week) {
		unit = 'days';
	} else if (time.year() != t_now.year()) {
		shortFormat = time.format('MMM D, YYYY');
	} else {
		shortFormat = time.format('MMM D');
	}
	num = Math.max(1, moment.duration(diff).get(unit));
	var result = num + unit.charAt(0);
	if (!withoutPreOrSuffix) {
		result = moment.localeData().pastFuture(time.diff(t_now), result);
	}
	return result
}
export default dateShort