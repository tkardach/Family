require('./extensions');

const Constants = {
  Media: {
    Types: ["Video", "Image"]
  }
}

const StartupStrings = {
  Config: {
    NotDefined: 'config: {0} is not defined',
    Invalid: 'config: invalid value "{0}" for config property {1}'
  }
}

module.exports.StartupStrings = StartupStrings;