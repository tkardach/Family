const {generateUrl} = require('../../shared/utility');

describe('utilities', () => {
  describe('generateUrl', () => {
    it('should generate a url with 2 arguments', () => {
      let url = generateUrl('www.test.com', 'test-file.jpg');
      expect(url).toBe('www.test.com/test-file.jpg');
    })

    it('should not add an extra / if provided after first string', () => {
      let url = generateUrl('www.test.com/', 'test-file.jpg');
      expect(url).toBe('www.test.com/test-file.jpg');
    })

    it('should not add an extra / if provided before second string', () => {
      let url = generateUrl('www.test.com', '/test-file.jpg');
      expect(url).toBe('www.test.com/test-file.jpg');
    })

    it('should generate a url with 3 arguments', () => {
      let url = generateUrl('www.test.com', 'test-path', 'test-file.jpg');
      expect(url).toBe('www.test.com/test-path/test-file.jpg');
    })

    it('should generate a url with heading and trailing / characters', () => {
      let url = generateUrl('www.test.com///', '///test-path///', '///test-file.jpg');
      expect(url).toBe('www.test.com/test-path/test-file.jpg');
    })

    it('should return the passed in string if only 1 parameter was passed in', () => {
      let url = generateUrl('www.test.com');
      expect(url).toBe('www.test.com');
    })

    it('should remove all heading and trailing slashes from 1 parameter url', () => {
      let url = generateUrl('//////www.test.com/////');
      expect(url).toBe('www.test.com');
    })

    it('should throw error if any argument is not a string', () => {
      let errorThrown = false;
      try {
        generateUrl('www.test.com/', 12345, '/test-file.jpg');
      } catch {
        errorThrown = true;
      }

      expect(errorThrown).toBe(true);
    })
  })
});