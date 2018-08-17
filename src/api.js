import { createFaceliftClient } from 'awesomeflowerdispenser';

const MAX_POST_LOAD = 2;

const PROJECT_ID = 'u8nZUPjPf09StQej';
const API_KEY =
  'cGKK72x7BONITHlerncxPYC7kPWbHeJ7XzWmPp3whbnxyHEhGtcntVVeg74gGdD8';
const CONTENT_IDENTIFIER = 'dHe2jev8G0SX1A0V';

let client = null;
let contentProvider = null;

async function createClient() {
  client = await createFaceliftClient(
    {
      api_key: API_KEY,
      project_id: PROJECT_ID
    },
    fetch
  );

  contentProvider = client.createContentProvider(CONTENT_IDENTIFIER);

  return true;
}
const PostAPI = {
  list: async page => {
    if (!client) {
      await createClient();
    }
    const pagingCriteria = { limit: MAX_POST_LOAD, page: page };
    const posts = await contentProvider.list(pagingCriteria);

    // GET BANNERS
    let bannerPromises = [];
    posts.data.forEach(element => {
      bannerPromises.push(element.postbanner.get());
    });

    await Promise.all(bannerPromises).then(banners => {
      for (const i in banners) {
        posts.data[i].postbanner.url = banners[i].data.url;
      }
    });

    return posts.data;
  },
  get: async identifier => {
    if (!client) {
      await createClient();
    }
    const post = await contentProvider.get(identifier);
    const banner = await post.postbanner.get();
    post.postbanner.url = banner.data.url;

    return post;
  },
  getLocales: async () => {
    if (!client) {
      await createClient();
    }
    const localesData = {
      defaultLocale: client.defaultLocale,
      locales: client.locales
    };
    return localesData;
  }
};

export default PostAPI;
