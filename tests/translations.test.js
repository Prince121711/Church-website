import { test, describe } from 'node:test';
import assert from 'node:assert';
import { translations } from '../src/translations/translations.js';

describe('Translations Suite', () => {
  test('should have both English and Tamil translations defined', () => {
    assert.ok(translations.en, 'English translations should exist');
    assert.ok(translations.ta, 'Tamil translations should exist');
  });

  test('should have matching top-level keys in both languages', () => {
    const enKeys = Object.keys(translations.en).sort();
    const taKeys = Object.keys(translations.ta).sort();
    assert.deepStrictEqual(enKeys, taKeys, 'Both languages should have matching top-level sections');
  });

  test('should have matching navigation links in both languages', () => {
    const enNav = Object.keys(translations.en.nav).sort();
    const taNav = Object.keys(translations.ta.nav).sort();
    assert.deepStrictEqual(enNav, taNav, 'Nav keys must match in en and ta');
  });

  test('should have all hero stats defined in both languages', () => {
    assert.ok(translations.en.hero.statsYears, 'en.hero.statsYears should exist');
    assert.ok(translations.ta.hero.statsYears, 'ta.hero.statsYears should exist');
    assert.ok(translations.en.hero.statsBelievers, 'en.hero.statsBelievers should exist');
    assert.ok(translations.ta.hero.statsBelievers, 'ta.hero.statsBelievers should exist');
  });

  test('should have non-empty contact keys in both languages', () => {
    assert.ok(translations.en.contact.fullName.length > 0);
    assert.ok(translations.ta.contact.fullName.length > 0);
    assert.ok(translations.en.contact.thankYou.length > 0);
    assert.ok(translations.ta.contact.thankYou.length > 0);
  });
});
