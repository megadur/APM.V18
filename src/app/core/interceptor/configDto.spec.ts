import { parseDTO, ConfigDTO } from './configDto';

describe('configDto', () => {
  it('should parse valid config with all fields', () => {
    const valid = {
      apiUrlGutachten: 'http://gutachten',
      apiUrlUser: 'http://user',
      xOrgId: 'org',
      xUserId: 'user',
      xGutachterId: 'gutachter'
    };
    const result = parseDTO(valid);
    expect(result.success).toBeTrue();
    if (result.success) {
      expect(result.data).toEqual(valid as ConfigDTO);
    }
  });

  it('should parse valid config with only required fields', () => {
    const valid = {
      apiUrlGutachten: 'http://gutachten',
      apiUrlUser: 'http://user'
    };
    const result = parseDTO(valid);
    expect(result.success).toBeTrue();
    if (result.success) {
      expect(result.data).toEqual(valid as ConfigDTO);
    }
  });

  it('should fail if required fields are missing', () => {
    const invalid = {
      xOrgId: 'org'
    };
    const result = parseDTO(invalid);
    expect(result.success).toBeFalse();
  });

  it('should fail if fields are of wrong type', () => {
    const invalid = {
      apiUrlGutachten: 123,
      apiUrlUser: {},
      xOrgId: [],
      xUserId: null,
      xGutachterId: false
    };
    const result = parseDTO(invalid);
    expect(result.success).toBeFalse();
  });
});
