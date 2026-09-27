# La Bear Frenchies

Static website for [www.labearfrenchies.com](https://www.labearfrenchies.com).

## Editable content

The home-page photos and current available-puppy information are stored in `content/home.json` and `content/puppies.json`. The browser renders those files through `js/site-content.js`; the existing HTML remains as a fallback if a content request fails.

The breeder-facing Decap CMS interface is at `/admin/`. Complete the external account values described in `admin/SETUP.md` before testing the editor.
