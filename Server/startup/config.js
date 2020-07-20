const config = require('config');
const fs = require('fs');
const {StartupStrings} = require('../shared/strings');
const {logError} = require('../debug/logging');

if (!config.get('imageDir')) {
  logError(StartupStrings.Config.NotDefined.format('imageDir'));
  process.exit(1);
}

if (!config.get('thumbnailDir')) {
  logError(StartupStrings.Config.NotDefined.format('thumbnailDir'));
  process.exit(1);
}

if (!config.get('videoDir')) {
  logError(StartupStrings.Config.NotDefined.format('videoDir'));
  process.exit(1);
}

if (!fs.existsSync(config.get('imageDir'))) {
  logError(StartupStrings.Config.Invalid.format(config.get('imageDir'), 'imageDir'));
  process.exit(1);
}

if (!fs.existsSync(config.get('thumbnailDir'))) {
  logError(StartupStrings.Config.Invalid.format(config.get('thumbnailDir'), 'thumbnailDir'));
  process.exit(1);
}

if (!fs.existsSync(config.get('videoDir'))) {
  logError(StartupStrings.Config.Invalid.format(config.get('videoDir'), 'videoDir'));
  process.exit(1);
}

if (!config.get('db')) {
  logError(StartupStrings.Config.NotDefined.format('db'));
  process.exit(1);
}

if (process.env.NODE_ENV !== 'test' && !config.get('port')) {
  logError(StartupStrings.Config.NotDefined.format('port'));
  process.exit(1);
}

if (config.get('port') > 65535 || config.get('port') < 0) {
  logError(StartupStrings.Config.Invalid.format(config.get('port'), 'port'));
  process.exit(1);
}

if (!config.get('domain')) {
  logError(StartupStrings.Config.NotDefined.format('domain'));
  process.exit(1);
}