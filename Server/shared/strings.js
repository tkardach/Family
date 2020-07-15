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

const RegexStrings = {
  Files: {
    Image: /image.*/,
    Video: /video.*/,
    Extension: /\.[0-9a-z]+$/i
  }
}

module.exports.StartupStrings = StartupStrings;
module.exports.RegexStrings = RegexStrings;