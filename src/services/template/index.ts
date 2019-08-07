import { PageProperties, LayoutProperties } from '../file/types';
import { PageAndLayoutProperties, HTMLObject, Options } from './types';
import { transformHeadToHTML } from '../head';

export const mergeLayoutsWithPages = (pages: PageProperties[], layouts: LayoutProperties[]): PageAndLayoutProperties[] => pages
  .map(({ layout, ...otherValues }): PageAndLayoutProperties => ({
    layout: layouts.filter(({ name }): boolean => name === layout)[0].default,
    ...otherValues,
  }));

export const generateHTML = (pages: PageAndLayoutProperties[], { dev }: Options): Promise<HTMLObject[]> => Promise.all(pages.map(async (page): Promise<HTMLObject> => {
  const pageData = page.data ? await page.data({ dev }) : {};

  const pageHead = transformHeadToHTML({
    head: page.head,
    data: pageData,
    dev,
  });

  const pageTemplate = page.page({
    dev,
    data: pageData,
  });

  const layoutTemplate = await page.layout({
    title: page.title,
    content: await pageTemplate,
    head: await pageHead,
    dev,
  });

  return {
    html: layoutTemplate,
    name: page.name.replace('js', 'html'),
    path: page.path,
  };
}));
