// Copyright 2021 the optic authors. All rights reserved. MIT license.

// ref: syslog severity levels @ [RFC 5424]<https://datatracker.ietf.org/doc/html/rfc5424> @@ <https://archive.is/3duym>

/** Default log levels */
// export enum Level {
// 	Trace = 10,
// 	Debug = 20,
// 	Info = 30,
// 	Notice = 35,
// 	Warn = 40,
// 	Error = 50,
// 	Critical = 60,
// }
export enum Level {
	Critical = 0,
	Error,
	Warning,
	Warn = Warning,
	Notice,
	Information,
	Info = Information,
	Debug,
	Trace,
}

export interface ILevel<TLevelEnum extends Level = Level> {
	UNKNOWN: number;
	names: Map<TLevelEnum, string>;
}

const LevelUnknown = -1;
const LevelUnknownName = 'UNKNOWN';

const levelMap = new Map<number, string>();

// levelMap.set(Level.Trace, 'Trace');
// levelMap.set(Level.Debug, 'Debug');
// levelMap.set(Level.Info, 'Info');
// levelMap.set(Level.Notice, 'Notice');
// levelMap.set(Level.Warn, 'Warn');
// levelMap.set(Level.Error, 'Error');
// levelMap.set(Level.Critical, 'Critical');

function enumNames<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
	return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

// console.error({ k: enumKeys(Level), l: enumKeys(Level).map((k) => Level[k]) });

// for (const v in enumKeys(Level)) {
// 	// if (typeof Level[key] !== 'string') continue;
// 	// levelMap.set(Level[key], key);
// 	// if (isNaN(Number(v))) continue;
// 	levelMap.set(Number(Level[v]), v);
// }

enumNames(Level).forEach((name) => {
	if (!levelMap.has(Level[name])) levelMap.set(Level[name], name);
});

levelMap.set(LevelUnknown, LevelUnknownName);

const levelNameMap = new Map<string, number>();

levelMap.forEach((name, level) => {
	levelNameMap.set(name, level);
});

/** Translate Level enum to string value */
export function levelToName(level: Level): string {
	return levelMap.get(level) ?? levelMap.get(LevelUnknown) ?? LevelUnknownName;
}

/** Translate string value to Level, or LevelUnknown if not found */
export function nameToLevel(name: string): number {
	const level: number | undefined = levelNameMap.get(name);
	return level === undefined ? LevelUnknown : level;
}

/** Compare log level priority ranks */
export function compare(a: Level, b: Level): number {
	// return (a > b) ? 1 : (a < b) ? -1 : 0;

	if ((a < Level.Critical) && (b < Level.Critical)) return 0; // unknown level are of equal rank

	// known ranks are ranked as a higher priority than unknown ranks
	if (a < Level.Critical) return -1;
	if (b < Level.Critical) return 1;

	return (b - a);
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
