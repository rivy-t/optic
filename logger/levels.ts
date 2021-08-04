// Copyright 2021 the optic authors. All rights reserved. MIT license.
/** Default log levels */
export enum Level {
	Trace = 10,
	Debug = 20,
	Info = 30,
	Notice = 35,
	Warn = 40,
	Error = 50,
	Critical = 60,
}

const levelMap = new Map<number, string>();

levelMap.set(Level.Trace, 'Trace');
levelMap.set(Level.Debug, 'Debug');
levelMap.set(Level.Info, 'Info');
levelMap.set(Level.Notice, 'Notice');
levelMap.set(Level.Warn, 'Warn');
levelMap.set(Level.Error, 'Error');
levelMap.set(Level.Critical, 'Critical');

const levelNameMap = new Map<string, number>();

levelMap.forEach((name, level) => {
	levelNameMap.set(name, level);
});

/** Translate Level enum to string value */
export function levelToName(level: Level): string {
	const levelAsString = levelMap.get(level);
	return levelAsString ? levelAsString : 'UNKNOWN';
}

/** Translate string value to Level, or -1 if not found */
export function nameToLevel(name: string): number {
	const level: number | undefined = levelNameMap.get(name);
	return level === undefined ? -1 : level;
}

/** Compare log level ranks */
export function compare(a: Level, b: Level): number {
	// return (a > b) ? 1 : (a < b) ? -1 : 0;
	return (a - b);
}

/** Returns the length of the longest log level name. This is used when
 * formatting the level to allow all levels to be padded with spaces to
 * the same length as the longest level name.
 */
export function longestLevelName(): number {
	let longest = 0;
	for (const key of levelNameMap.keys()) {
		longest = key.length > longest ? key.length : longest;
	}
	return longest;
}
