// src/core/utils/seoUtils.ts
import DOMPurify from 'dompurify';
import { Video } from '@/shared/types';

export function generateVideoMetaTags(video: Video) {
  const cleanTitle = DOMPurify.sanitize(video.title);
  const cleanCreator = DOMPurify.sanitize(video.creator);
  
  return {
    title: `${cleanTitle} | Nova - Смотрите онлайн`,
    description: DOMPurify.sanitize(`Смотрите видео "${cleanTitle}" от ${cleanCreator}. ${video.views} просмотров.`),
    keywords: DOMPurify.sanitize(`видео, ${cleanTitle}, ${cleanCreator}, ${video.category || 'развлечения'}, Nova`),
    ogTitle: DOMPurify.sanitize(`${cleanTitle} | Nova`),
    ogDescription: DOMPurify.sanitize(`Смотрите видео "${cleanTitle}" от ${cleanCreator}. ${video.views} просмотров.`),
    ogImage: video.thumbnail.replace(/\s+/g, ''),
    ogUrl: `https://nova.com/watch/ ${video.id.replace(/\s+/g, '')}`,
    twitterCard: 'player',
    twitterPlayer: `https://nova.com/watch/ ${video.id.replace(/\s+/g, '')}`,
    twitterPlayerWidth: '1280',
    twitterPlayerHeight: '720'
  };
}