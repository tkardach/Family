const request = require('supertest');
const {Media} = require('../../models/media');
const mongoose = require('mongoose');
const imagemod = require('../../modules/image');
const config = require('config');
const {removeFilesFromDir} = require('../../shared/utility');

let server;

describe('/api/media', () => {
  beforeEach(() => {
    server = require('../../server');
  });

  afterEach(async () => {
    await Media.deleteMany({});
    removeFilesFromDir(config.thumbnailDir);
    removeFilesFromDir(config.imageDir);
    removeFilesFromDir(config.videoDir);
    if (server) {
      await server.close();
    }
  })

  beforeAll(() => {
    // Setup test configuration environment
    if (process.env.NODE_ENV === 'test') {
      const testConfig = require('../../config/test.json');
      
      process.env.ALLOW_CONFIG_MUTATIONS = true;
      config.thumbnailDir = testConfig.thumbnailDir;
      config.imageDir = testConfig.imageDir;
      config.videoDir = testConfig.videoDir;
    }
  })

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('post/upload', () => {
    let generateThumbnailByLongSideSpy;
    beforeEach(() => {
      generateThumbnailByLongSideSpy = jest.spyOn(imagemod, 'generateThumbnailByLongSide');
      generateThumbnailByLongSideSpy.mockImplementation(() => {});
    });

    afterEach(() => {
      generateThumbnailByLongSideSpy.mockRestore();
    })

    const exec = (filetype = 'jpg') => {
      return request(server)
        .post('/api/media/upload')
        .attach('file', './tests/files/test.' + filetype);
    }

    it('should return 200 on successful upload', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    })

    it('should return 200 on successful upload of tiff file', async () => {
      const res = await exec('tiff');
      expect(res.status).toBe(200);
    })

    it('should return 200 on successful upload of png file', async () => {
      const res = await exec('png');
      expect(res.status).toBe(200);
    })

    it('should return 200 on successful upload of bmp file', async () => {
      const res = await exec('bmp');
      expect(res.status).toBe(200);
    })

    it('should upload image to database on success', async () => {
      const res = await exec();
      expect(res.status).toBe(200);

      const db = await Media.findOne({name: 'test.jpg'});
      expect(db).not.toBe(undefined);
      expect(db).not.toBe(null);
    })

    it('should upload thumbnail to database on success', async () => {
      const res = await exec();
      expect(res.status).toBe(200);

      const db = await Media.find({name: 'test.jpg'});
      expect(db.length).toBe(2);
    })

    it('should return 400 if the filetype is invalid', async () => {
      const res = await request(server)
        .post('/api/media/upload')
        .attach('file', './tests/files/test.txt');
      
      expect(res.status).toBe(400);
    })

    it('should return 500 if error thrown during upload', async () => {
      generateThumbnailByLongSideSpy.mockImplementation(() => {
        throw new Error('Test Error');
      })

      const res = await exec();
      
      expect(res.status).toBe(500);
    })
  })
})