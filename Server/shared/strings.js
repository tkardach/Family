require('./extensions');

const Constants = {
  Paths: {
    Images: '/images',
    Videos: '/videos',
    Thumbnails: '/thumbnails'
  },
  Mimetypes: {
    Jpeg: 'image/jpeg'
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

const Errors = {
  HTTP400: {
    FileValidationError: 'Only image and video types are supported for upload.'
  },
  HTTP500: {
    AddToDatabaseFailed: 'Failed to add {0} to database.'
  }
}

const Messages = {
  HTTP200: {
    SuccessfulPost: 'Successfully posted {0}'
  }
}

module.exports.StartupStrings = StartupStrings;
module.exports.RegexStrings = RegexStrings;
module.exports.Constants = Constants;
module.exports.Errors = Errors;
module.exports.Messages = Messages;