const config = require('config');
const fs = require('fs');
const {StartupStrings} = require('../shared/strings');
const {logError} = require('../debug/logging');

// Setup test configuration environment
if (process.env.NODE_ENV === 'test') {
  const testConfig = require('../config/test.json');
  
  process.env.ALLOW_CONFIG_MUTATIONS = true;
  config.thumbnailDir = testConfig.thumbnailDir;
  config.imageDir = testConfig.imageDir;
  config.videoDir = testConfig.videoDir;
}

if (!config.has('imageDir')) {
  logError(StartupStrings.Config.NotDefined.format('imageDir'));
  process.exit(1);
}

if (!config.has('thumbnailDir')) {
  logError(StartupStrings.Config.NotDefined.format('thumbnailDir'));
  process.exit(1);
}

if (!config.has('videoDir')) {
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

if (!config.has('db')) {
  logError(StartupStrings.Config.NotDefined.format('db'));
  process.exit(1);
}

if (process.env.NODE_ENV !== 'test' && !config.has('port')) {
  logError(StartupStrings.Config.NotDefined.format('port'));
  process.exit(1);
}

if (config.get('port') > 65535 || config.get('port') < 0) {
  logError(StartupStrings.Config.Invalid.format(config.get('port'), 'port'));
  process.exit(1);
}

if (!config.has('domain')) {
  logError(StartupStrings.Config.NotDefined.format('domain'));
  process.exit(1);
}