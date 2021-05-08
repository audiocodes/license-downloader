// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import path from 'path';
/* eslint-disable node/no-unpublished-import, no-unused-vars */
import chai from 'chai';
import { expect } from 'chai';
/* eslint-enable node/no-unpublished-import */

import util from '../lib/util.js';

describe('util', () => {
  describe('sourceToTargetFilename with root as sourceDirectory', () => {
    it('should generate target filename from absolute path', () => {
      const target = util.sourceToTargetFilename('/sourceToTargetFilename.json', '/absolute/path/to');
      const expectedTarget = path.join('/absolute/path/to/sourceToTargetFilename.ext.json');

      expect(target).to.equal(expectedTarget);
    });

    it('should generate target filename from relative path', () => {
      const target = util.sourceToTargetFilename('/sourceToTargetFilename.json', 'relative/path/to');
      const expectedTarget = path.join('relative/path/to/sourceToTargetFilename.ext.json');

      expect(target).to.equal(expectedTarget);
    });

    it('should throw generating target filename from empty string', () => {
      const generateFilenameFromEMptyString = () => { util.sourceToTargetFilename('', 'relative/path/to'); };

      expect(generateFilenameFromEMptyString, 'Generating target filename with empty sorce filename should throw').to.throw();
    });
  });

  describe('sourceToTargetFilename without targetDirectory', () => {
    it('should generate target filename from absolute path', () => {
      const target = util.sourceToTargetFilename('/absolute/path/to/sourceToTargetFilename.json');
      const expectedTarget = path.join('/absolute/path/to/sourceToTargetFilename.ext.json');

      expect(target).to.equal(expectedTarget);
    });

    it('should generate target filename from relative path', () => {
      const target = util.sourceToTargetFilename('relative/path/to/sourceToTargetFilename.json');
      const expectedTarget = path.join('relative/path/to/sourceToTargetFilename.ext.json');

      expect(target).to.equal(expectedTarget);
    });

    it('should throw generating target filename from empty string', () => {
      const generateFilenameFromEMptyString = () => { util.sourceToTargetFilename(''); };

      expect(generateFilenameFromEMptyString, 'Generating target filename from empty string should throw').to.throw();
    });
  });

  describe('sourceToTargetFilename with sourceDirectory and targetDirectory', () => {
    it('should generate target filename from absolute path', () => {
      const target = util.sourceToTargetFilename('/absolute/path/to/sourceToTargetFilename.json', '/target/path');
      const expectedTarget = path.join('/target/path', 'sourceToTargetFilename.ext.json');

      expect(target).to.equal(expectedTarget);
    });

    it('should generate target filename from relative path', () => {
      const target = util.sourceToTargetFilename('relative/path/to/sourceToTargetFilename.json', 'target/path');
      const expectedTarget = path.join('target/path', 'sourceToTargetFilename.ext.json');

      expect(target).to.equal(expectedTarget);
    });

    it('should throw generating target filename from empty string', () => {
      const generateFilenameFromEMptyString = () => { util.sourceToTargetFilename('', ''); };

      expect(generateFilenameFromEMptyString, 'Generating target filename from empty strings should throw').to.throw();
    });
  });

  describe('licenseFilesTargetFolder', () => {
    it('should return entered licenseDirectory', () => {
      const licenseDirectory = '/tmp/downloadDir';
      const sourceDir = undefined;
      const dir = util.licenseFilesTargetFolder(licenseDirectory, sourceDir);

      expect(dir).to.equal(licenseDirectory);
    });

    it('should return folder in sourceDirectory if licenseDirectory is undefined', () => {
      const licenseDirectory = undefined;
      const sourceDir = '/path/of/source/json';
      const dir = util.licenseFilesTargetFolder(licenseDirectory, sourceDir);

      expect(dir).to.equal(path.join(sourceDir, 'licenses'));
    });

    it('should return folder "licenses" if no parameters are given', () => {
      const licenseDirectory = undefined;
      const sourceDir = undefined;
      const dir = util.licenseFilesTargetFolder(licenseDirectory, sourceDir);

      expect(dir).to.equal('licenses');
    });
  });

  describe('licenseFileName', () => {
    it('should return filename', () => {
      const fileNameComponents = util.licenseFileName('package');

      expect(fileNameComponents.scope).to.equal('');
      expect(fileNameComponents.packageName).to.equal('package');
    });

    it('should return scope and filename', () => {
      const fileNameComponents = util.licenseFileName('@test/package-test');

      expect(fileNameComponents.scope).to.equal('@test');
      expect(fileNameComponents.packageName).to.equal('package-test');
    });
  });
});
