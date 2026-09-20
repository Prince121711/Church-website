import { test, describe } from 'node:test';
import assert from 'node:assert';
import { EVENTS_DATA } from '../src/data/eventsData.js';
import { GALLERY_PHOTOS } from '../src/data/galleryData.js';
import { SERMON_SCRIPTS } from '../src/data/sermonScripts.js';

describe('Data Consistency Suite', () => {
  test('EVENTS_DATA should have bilingual titles, descriptions, and times', () => {
    assert.ok(EVENTS_DATA.length > 0);
    EVENTS_DATA.forEach((e) => {
      assert.ok(e.id, 'Event must have an id');
      assert.ok(e.title.en && e.title.ta, 'Event title must be bilingual');
      assert.ok(e.desc.en && e.desc.ta, 'Event desc must be bilingual');
      assert.ok(e.time.en && e.time.ta, 'Event time must be bilingual');
      assert.ok(e.dateNum, 'Event must have dateNum');
    });
  });

  test('GALLERY_PHOTOS should have dimensions, src, and bilingual titles', () => {
    assert.ok(GALLERY_PHOTOS.length > 0);
    GALLERY_PHOTOS.forEach((p) => {
      assert.ok(p.src, 'Photo must have src');
      assert.ok(p.width > 0 && p.height > 0, 'Photo must have explicit width and height');
      assert.ok(p.title.en && p.title.ta, 'Photo title must be bilingual');
      assert.ok(p.category.en && p.category.ta, 'Photo category must be bilingual');
    });
  });

  test('SERMON_SCRIPTS should have valid scriptures, theme words, and dates', () => {
    assert.ok(SERMON_SCRIPTS.length > 0);
    SERMON_SCRIPTS.forEach((s) => {
      assert.ok(s.id, 'Sermon must have id');
      assert.ok(s.title, 'Sermon must have title');
      assert.ok(s.themeWord, 'Sermon must have themeWord');
      assert.ok(s.keyVerse, 'Sermon must have keyVerse');
      assert.ok(s.keyVerseText, 'Sermon must have keyVerseText');
    });
  });
});
