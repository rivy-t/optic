// Copyright 2021 the optic authors. All rights reserved. MIT license.
// import { JsonFormatter } from '../formatters/mod.ts';
// import { every, FileStream, of } from '../streams/fileStream/mod.ts';
import { PropertyRedaction } from '../transformers/propertyRedaction.ts';
// import { Level, Logger, LogRecord, Stream, TimeUnit } from '../mod.ts';
import { Level, Logger, LogRecord, Stream } from '../mod.ts';

const log = new Logger()
	.withMinLogLevel(Level.Notice)
	.addFilter((_stream: Stream, logRecord: LogRecord) =>
		logRecord.msg === 'spam'
	)
	.addTransformer(new PropertyRedaction('password'));

log.info("Level too low. This won't be logged");
const _logVal: string = log.critical('Hello world'); // logs and returns "Hello world"
log.warn('spam'); // "spam" records are filtered out
log.warn({ user: 'jsmith', password: 'secret_password' }); // logs { "user": "jsmith", "password": "[Redacted]" }
log.debug(() => {
	throw new Error("I'm not thrown");
}); // debug < notice, so no error as function isn't evaluated
log.error(() => {
	return '1234';
}); // logs "1234"

log.log(Level.Notice, 'test');

log.log(Level.Notice, { LevelKeys: Object.keys(Level) });

// for (let i = 0; i < 1000000; i++) {
// 	log.every(100).warn('Logs every 100th iteration');
// 	log.atMostEvery(10, TimeUnit.SECONDS).warn('Logs at most once every 10 seconds');
// }
