import { test, describe } from 'node:test';
import assert from 'node:assert';
import { isValidEmail, sanitizeInput, createRateLimiter, obfuscateEmail } from '../src/utils/security.js';

describe('Security Utilities Suite', () => {
  describe('isValidEmail', () => {
    test('validates correct email addresses', () => {
      assert.strictEqual(isValidEmail('test@gmail.com'), true);
      assert.strictEqual(isValidEmail('pastor.suresh@elshaddaiministries.org'), true);
      assert.strictEqual(isValidEmail('church_info123@domain.co.in'), true);
    });

    test('rejects invalid email formats', () => {
      assert.strictEqual(isValidEmail(''), false);
      assert.strictEqual(isValidEmail('plainaddress'), false);
      assert.strictEqual(isValidEmail('@missinguser.com'), false);
      assert.strictEqual(isValidEmail('missingdomain@'), false);
      assert.strictEqual(isValidEmail('bad@domain'), false);
      assert.strictEqual(isValidEmail(null), false);
    });
  });

  describe('sanitizeInput', () => {
    test('strips HTML tags to prevent XSS', () => {
      assert.strictEqual(sanitizeInput('<script>alert(1)</script>'), '');
      assert.strictEqual(sanitizeInput('<b>Hello</b> World'), 'Hello World');
      assert.strictEqual(sanitizeInput('  Clean string  '), 'Clean string');
    });

    test('handles empty or non-string inputs gracefully', () => {
      assert.strictEqual(sanitizeInput(null), '');
      assert.strictEqual(sanitizeInput(undefined), '');
      assert.strictEqual(sanitizeInput(123), '');
    });
  });

  describe('createRateLimiter', () => {
    test('allows first submission and enforces cooldown', () => {
      const limiter = createRateLimiter(5000);
      assert.strictEqual(limiter.canSubmit(), true);

      limiter.recordSubmission();
      assert.strictEqual(limiter.canSubmit(), false);
      assert.ok(limiter.remainingCooldownSec() > 0);
    });
  });

  describe('obfuscateEmail', () => {
    test('obfuscates email address', () => {
      assert.strictEqual(obfuscateEmail('church@example.com'), 'church [at] example.com');
    });
  });
});
