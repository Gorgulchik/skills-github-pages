// src/core/utils/seoUtils.ts
import { generateVideoMetaTags } from '@/core/utils/seoUtils';
import { Video } from '@/shared/types';

describe('Генерация метатегов', () => {
  const video: Video = {
    id: 'test-video',
    title: 'Тестовое видео',
    creator: 'Тестовый пользователь',
    views: 1000,
    thumbnail: 'https://example.com/thumbnail.jpg '
  };
  
  const metaTags = generateVideoMetaTags(video);
  
  it('Проверка title', () => {
    expect(metaTags.title).toBe(`${video.title} | Nova - Смотрите онлайн`);
  });
  
  it('Проверка description', () => {
    expect(metaTags.description).toContain(video.title);
    expect(metaTags.description).toContain(video.creator);
    expect(metaTags.description).toContain(video.views.toString());
  });
  
  it('Проверка OG тегов', () => {
    expect(metaTags.ogTitle).toBe(`${video.title} | Nova`);
    expect(metaTags.ogDescription).toContain(video.title);
    expect(metaTags.ogDescription).toContain(video.creator);
    expect(metaTags.ogDescription).toContain(video.views.toString());
  });
  
  it('Проверка Twitter тегов', () => {
    expect(metaTags.twitterCard).toBe('player');
    expect(metaTags.twitterPlayer).toBe(metaTags.ogUrl);
    expect(metaTags.twitterPlayerWidth).toBe('1280');
    expect(metaTags.twitterPlayerHeight).toBe('720');
  });
}