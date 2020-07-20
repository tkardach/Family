const request = require('supertest');

describe('utilities', () => {
  describe('generateUrl', () => {
    it('should generate a url with 2 arguments', () => {
      let url = generateUrl('www.test.com', 'test-file.jpg');
      expect(url).toBe('www.test.com/test-file.jpg');
    })

    it('should not add an extra / if provided after first string', () => {
      let url = generateUrl('www.test.com/', 'test-file.jpg');
      expect(url).toBe('www.test.com/test-file.jpg');
    });
  })
})