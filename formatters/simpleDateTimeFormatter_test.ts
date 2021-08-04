// Copyright 2021 the optic authors. All rights reserved. MIT license.
import { assertEquals, test } from '../test_deps.ts';
import { SimpleDateTimeFormatter } from './simpleDateTimeFormatter.ts';

function assertDtf(format: string, date: Date, expectedOutput: string) {
	const dtf = new SimpleDateTimeFormatter(format);
	assertEquals(dtf.format(date), expectedOutput);
}

test({
	name: 'Test date/time hour formats',
	fn() {
		assertDtf('hh', new Date('1995-12-17T00:24:00Z'), '00');
		assertDtf('hh', new Date('1995-12-17T03:24:00Z'), '03');
		assertDtf('hh', new Date('1995-12-17T23:59:00Z'), '23');
		assertDtf('h', new Date('1995-12-17T00:24:00Z'), '0');
		assertDtf('h', new Date('1995-12-17T03:24:00Z'), '3');
		assertDtf('h', new Date('1995-12-17T13:24:00Z'), '13');
		assertDtf('HH', new Date('1995-12-17T00:24:00Z'), '12');
		assertDtf('HH', new Date('1995-12-17T03:24:00Z'), '03');
		assertDtf('HH', new Date('1995-12-17T13:24:00Z'), '01');
		assertDtf('HH', new Date('1995-12-17T23:59:00Z'), '11');
		assertDtf('H', new Date('1995-12-17T00:24:00Z'), '12');
		assertDtf('H', new Date('1995-12-17T03:24:00Z'), '3');
		assertDtf('H', new Date('1995-12-17T13:24:00Z'), '1');
		assertDtf('H', new Date('1995-12-17T23:59:00Z'), '11');
	},
});

test({
	name: 'Test date/time minute formats',
	fn() {
		assertDtf('mm', new Date('1995-12-17T23:00:00Z'), '00');
		assertDtf('mm', new Date('1995-12-17T23:07:00Z'), '07');
		assertDtf('mm', new Date('1995-12-17T23:59:00Z'), '59');
	},
});

test({
	name: 'Test date/time minute formats',
	fn() {
		assertDtf('ss', new Date('1995-12-17T23:00:00Z'), '00');
		assertDtf('ss', new Date('1995-12-17T23:07:04Z'), '04');
		assertDtf('ss', new Date('1995-12-17T23:59:59Z'), '59');
	},
});

test({
	name: 'Test date/time milliseconds formats',
	fn() {
		assertDtf('SSS', new Date('1995-12-17T23:00:00.000Z'), '000');
		assertDtf('SSS', new Date('1995-12-17T23:07:04.001Z'), '001');
		assertDtf('SSS', new Date('1995-12-17T23:59:59.011Z'), '011');
		assertDtf('SSS', new Date('1995-12-17T23:59:59.111Z'), '111');
		assertDtf('SS', new Date('1995-12-17T23:00:00.000Z'), '00');
		assertDtf('SS', new Date('1995-12-17T23:07:04.004Z'), '00');
		assertDtf('SS', new Date('1995-12-17T23:07:04.005Z'), '00');
		assertDtf('SS', new Date('1995-12-17T23:59:59.010Z'), '01');
		assertDtf('SS', new Date('1995-12-17T23:59:59.049Z'), '04');
		assertDtf('SS', new Date('1995-12-17T23:59:59.089Z'), '08');
		assertDtf('SS', new Date('1995-12-17T23:59:59.099Z'), '09');
		assertDtf('SS', new Date('1995-12-17T23:59:59.118Z'), '11');
		assertDtf('SS', new Date('1995-12-17T23:59:59.518Z'), '51');
		assertDtf('S', new Date('1995-12-17T23:59:59.000Z'), '0');
		assertDtf('S', new Date('1995-12-17T23:59:59.005Z'), '0');
		assertDtf('S', new Date('1995-12-17T23:59:59.010Z'), '0');
		assertDtf('S', new Date('1995-12-17T23:59:59.090Z'), '0');
		assertDtf('S', new Date('1995-12-17T23:59:59.222Z'), '2');
		assertDtf('S', new Date('1995-12-17T23:59:59.999Z'), '9');
	},
});

test({
	name: 'Test date/time am/pm formatting',
	fn() {
		assertDtf('a', new Date('1995-12-17T23:59:59.999Z'), 'pm');
		assertDtf('a', new Date('1995-12-17T12:00:00.000Z'), 'pm');
		assertDtf('a', new Date('1995-12-17T11:59:59.999Z'), 'am');
		assertDtf('a', new Date('1995-12-17T00:00:00.000Z'), 'am');
	},
});

test({
	name: 'Test date/time year formatting',
	fn() {
		assertDtf('YYYY', new Date('1995-12-17T23:59:59.999Z'), '1995');
		assertDtf('YYYY', new Date('2020-12-17T23:59:59.999Z'), '2020');
		assertDtf('YY', new Date('1995-12-17T23:59:59.999Z'), '95');
		assertDtf('YY', new Date('2020-12-17T23:59:59.999Z'), '20');
	},
});

test({
	name: 'Test date/time month formatting',
	fn() {
		assertDtf('MMMM', new Date('1995-01-17T23:59:59.999Z'), 'January');
		assertDtf('MMMM', new Date('1995-06-17T23:59:59.999Z'), 'June');
		assertDtf('MMMM', new Date('1995-12-17T23:59:59.999Z'), 'December');
		assertDtf('MMM', new Date('1995-01-17T23:59:59.999Z'), 'Jan');
		assertDtf('MMM', new Date('1995-06-17T23:59:59.999Z'), 'Jun');
		assertDtf('MMM', new Date('1995-12-17T23:59:59.999Z'), 'Dec');
		assertDtf('MM', new Date('1995-01-17T23:59:59.999Z'), '01');
		assertDtf('MM', new Date('1995-06-17T23:59:59.999Z'), '06');
		assertDtf('MM', new Date('1995-12-17T23:59:59.999Z'), '12');
		assertDtf('M', new Date('1995-01-17T23:59:59.999Z'), '1');
		assertDtf('M', new Date('1995-06-17T23:59:59.999Z'), '6');
		assertDtf('M', new Date('1995-12-17T23:59:59.999Z'), '12');
	},
});

test({
	name: 'Test date/time day formatting',
	fn() {
		assertDtf('DD', new Date('1995-01-17T23:59:59.999Z'), '17');
		assertDtf('DD', new Date('1995-06-01T23:59:59.999Z'), '01');
		assertDtf('D', new Date('1995-01-17T23:59:59.999Z'), '17');
		assertDtf('D', new Date('1995-06-01T23:59:59.999Z'), '1');
	},
});

test({
	name: 'Test date/time day of week formatting',
	fn() {
		assertDtf('ddd', new Date('2020-06-07T23:59:59.999Z'), 'Sun');
		assertDtf('ddd', new Date('2020-06-09T23:59:59.999Z'), 'Tue');
		assertDtf('dddd', new Date('2020-06-09T23:59:59.999Z'), 'Tuesday');
		assertDtf('dddd', new Date('2020-06-13T23:59:59.999Z'), 'Saturday');
	},
});

test({
	name: 'Test complex date/time formatting',
	fn() {
		assertDtf(
			'HH:mm:ss:SSSa YYYY-MMMM-DD',
			new Date('2020-06-09T23:59:59.999Z'),
			'11:59:59:999pm 2020-June-09',
		);
		assertDtf(
			'hh:mm:ss:SSa YYYY-MMM-DD dddd',
			new Date('2020-06-09T23:59:59.999Z'),
			'23:59:59:99pm 2020-Jun-09 Tuesday',
		);
		assertDtf(
			'hh:mm:ss:SSa ddd YYYY-MMMM-DD',
			new Date('2020-12-09T23:59:59.999Z'),
			'23:59:59:99pm Wed 2020-December-09',
		);
		assertDtf(
			'hh:mm:ss:S dddd YY-MMM-D',
			new Date('2020-12-09T23:59:59.999Z'),
			'23:59:59:9 Wednesday 20-Dec-9',
		);
		assertDtf(
			'Time: hh:mm:ss:S Other: dddd YY-MMM-D',
			new Date('2020-12-09T23:59:59.999Z'),
			'Time: 23:59:59:9 Other: Wednesday 20-Dec-9',
		);
	},
});
