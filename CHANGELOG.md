# CHANGELOG

## Release Candidate

### Features

- Add Spinner component (INDIGO Sprint 210406, [!95](https://github.com/TeskaLabs/asab-webui/pull/95))

- Implement lazy-loading (INDIGO Sprint 210416, [!93](https://github.com/TeskaLabs/asab-webui/pull/93))

- Export SplashScreen (INDIGO Sprint 210416, [!100](https://github.com/TeskaLabs/asab-webui/pull/100))

- Add configurable moment locales (INDIGO Sprint 210416, [!98](https://github.com/TeskaLabs/asab-webui/pull/98))

- Add configurable and dynamic help button (INDIGO Sprint 210430, [!90](https://github.com/TeskaLabs/asab-webui/pull/90))

- Add check if tenant module is enabled before proceeding with authorization (`_isUserAuthorized module`) (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Remove tenant parameter from URL when no tenant list is passed from userinfo (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Create app descriptor on build (INDIGO Sprint 210430, [!108](https://github.com/TeskaLabs/asab-webui/pull/108))

- Return DateTime multiplier for timestamp in seconds (by 1000) and add support of timestamp in milliseconds (INDIGO Sprint 210514, [!109](https://github.com/TeskaLabs/asab-webui/pull/109))

- Add new features to datatable (buttonWithAuthz, action buttons, localization, sorting, spinner, ReactJSON adv mode below each row, fix zero in Footer, add classnames for DataTable components) (INDIGO Sprint 210430, [!107](https://github.com/TeskaLabs/asab-webui/pull/107))

- Add new prop noItemsComponent for displaying custom message when there are no items in DataTable (INDIGO Sprint 210528, [!120](https://github.com/TeskaLabs/asab-webui/pull/120))

- Implement softcheck on resource access and thus eventually remove an item from Sidebar navigation (INDIGO Sprint 210611, [!117](https://github.com/TeskaLabs/asab-webui/pull/117))

- Implement function to remove item from Navigation (INDIGO Sprint 210611, [!117](https://github.com/TeskaLabs/asab-webui/pull/117))

- Add versioning to the `styles.css` file on application build to avoid caching when redeploying the app to the production (INDIGO Sprint 210611, [!125](https://github.com/TeskaLabs/asab-webui/pull/125))

- Logout after expired session in auth module (INDIGO Sprint 210528, [!119](https://github.com/TeskaLabs/asab-webui/pull/119))

- Notify user about expiring session in auth module (INDIGO Sprint 210528, [!119](https://github.com/TeskaLabs/asab-webui/pull/119))

- Add support of translations for code outside of react function components (INDIGO Sprint 210611, [!123](https://github.com/TeskaLabs/asab-webui/pull/123))

- Implemented About screen to the dropdown in auth header (INDIGO Sprint 210611, [!130](https://github.com/TeskaLabs/asab-webui/pull/130))

- Add MicroservicesDetailScreen (INDIGO Sprint 210709, [!132](https://github.com/TeskaLabs/asab-webui/pull/132))

### Refactoring

- Renaming configuration option FAKE_USERINFO to MOCK_USERINFO and refactoring code accordingly (INDIGO Sprint 210406, [!91](https://github.com/TeskaLabs/asab-webui/pull/91))

- Moving ASAB-Config module navigation under the `Maintenance` tab in the sidebar (INDIGO Sprint 210406, [!92](https://github.com/TeskaLabs/asab-webui/pull/92))

- Refactor userinfo API call to obtain Roles and Resources for active tenant (INDIGO Sprint 210416, [!94](https://github.com/TeskaLabs/asab-webui/pull/94))

- Refactor microservices list in order to have more human readable header titles and change column with date to proper datetime type (INDIGO Sprint 210430, [!99](https://github.com/TeskaLabs/asab-webui/pull/99))

- Refactor microservices endpoint in order to have it updated with BE changes (INDIGO Sprint 210430, [!106](https://github.com/TeskaLabs/asab-webui/pull/106))

- Make tenant an optional argument for `verify_access` method (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Delete multiplier in DateTime component in order to use proper timestamp (milliseconds) (INDIGO Sprint 210430, [a0c35f5](https://github.com/TeskaLabs/asab-webui/commit/a0c35f567ff5b111f8be031195de4e70fa6e8e22))

- Update change password link of the Auth header dropdown based on creation of the new container with different route (`/change-password`) in SeaCat Auth WebUI (INDIGO Sprint 210528, [!115](https://github.com/TeskaLabs/asab-webui/pull/115))

- Rename `oidc` service name to `openidconnect` to align it with SeaCat Auth (INDIGO Sprint 210528, [!116](https://github.com/TeskaLabs/asab-webui/pull/116))

- Return padding to DataTable because it looks better with it, refactor obtaining headers for DataTable from Configs because it should obtain them from inside applications, fix mistake in DataTable localization docs (INDIGO Sprint 210528, [!121](https://github.com/TeskaLabs/asab-webui/pull/121))

- Replace questionmark in hash URL in initialization of the application when query string is empty (e.g. in provisioning mode, when in the starting point, there is no tenant) (INDIGO Sprint 210611, [!124](https://github.com/TeskaLabs/asab-webui/pull/124))

- Set the DEV mode alert timeout to 3 seconds (INDIGO Sprint 210611, [!124](https://github.com/TeskaLabs/asab-webui/pull/124))

- Refactor obtaining formats for format items in ASAB-Config module. It seek for `$defs` key to generate appropriate input type. (INDIGO Sprint 210528, [!103](https://github.com/TeskaLabs/asab-webui/pull/103))

- Refactor capitalization of authorization configuration in the config file. (INDIGO Sprint 210611, [!128](https://github.com/TeskaLabs/asab-webui/pull/128))

- Refactor the ASAB-Config configuration with better look - the content of the config is now available to display and change in JSON form, the whole displayed config is wrapped in a Card. (INDIGO Sprint 210625, [!129](https://github.com/TeskaLabs/asab-webui/pull/129))

- Refactor Access control screen of `auth` module - Back to previous screen option has been removed, bullet points for multiple Roles and Resources has been removed, tenant name has been changed. (INDIGO Sprint 210625, [!134](https://github.com/TeskaLabs/asab-webui/pull/134))


### Bugfixes

- Update auth header dropdown and `Access control screen` to prevent app from crashing when tenant module is not enabled (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Assure, that BASE_URL is always an absolute URL. Assure, that API_PATH can be set as an absolute URL. (INDIGO Sprint 210514, [!111](https://github.com/TeskaLabs/asab-webui/pull/111))

- Fix public path issue when apps are build on subpaths (INDIGO Sprint 210528, [!118](https://github.com/TeskaLabs/asab-webui/pull/118))

- Fix paths to language locales when app is build on subpath (INDIGO Sprint 210611, [!126](https://github.com/TeskaLabs/asab-webui/pull/126))

- Fix URL of Access control screen and SeaCat Auth WebUI when app is build on subpath (INDIGO Sprint 210611, [!126](https://github.com/TeskaLabs/asab-webui/pull/126))

- Fix AccessControlScreen behaviour if userinfo is null (INDIGO Sprint 210625, [!136](https://github.com/TeskaLabs/asab-webui/pull/136))

- Remove unused packages and update packages with vulnerabilities (INDIGO Sprint 210625, [!135] (https://github.com/TeskaLabs/asab-webui/pull/135)) 
