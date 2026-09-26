# La Bear Frenchies editor setup

The editor foundation is installed, but two owner-controlled service values must be supplied before `/admin/` can log in or upload images.

1. Create the breeder-owned Decap Turbo organization and connect `lockjohn/la-bear-frenchies`.
2. Create a Turbo site for branch `codex/cms-foundation`, config path `admin/config.yml`, and the branch-preview admin URL.
3. Replace `REPLACE_WITH_DECAP_TURBO_SITE_ID` in `admin/config.yml` with the site UUID.
4. Create the breeder-owned Cloudinary account.
5. Replace the Cloudinary cloud name and API key placeholders in `admin/config.yml`.
6. Test editing on the development branch.
7. Before production merge, change the backend branch from `codex/cms-foundation` to `main` and add `https://www.labearfrenchies.com/admin/` as an allowed Turbo admin URL.

Never commit the Cloudinary API secret. The cloud name and API key used by the media-library widget are public identifiers; account login still protects uploads.
