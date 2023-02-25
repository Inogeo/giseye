# Changelog

## [2.1.0](https://github.com/Inogeo/giseye/compare/v2.0.0...v2.1.0) (2023-02-25)


### Features

* **CICD:** added image push to docker ([bcddd91](https://github.com/Inogeo/giseye/commit/bcddd9185934db43dbaee0517feea416fa00515b))

## [2.0.0](https://github.com/Inogeo/giseye/compare/v1.7.2...v2.0.0) (2023-01-23)


### ⚠ BREAKING CHANGES

* added REDUX support for all features except for catalog

### Features

* added REDUX support for all features except for catalog ([16245f6](https://github.com/Inogeo/giseye/commit/16245f64dc0ecb26f646398fe5f8899d2cc6272d))
* **App:** added the capacity of removing layers ([78f589a](https://github.com/Inogeo/giseye/commit/78f589a281c6650c466e5c1a822f08f7ac5400c7))


### Bug Fixes

* **Adapter:** improved compatibility of WMS capabilities parser by using OpenLayer library to parse capabitlies. ([9ad69c5](https://github.com/Inogeo/giseye/commit/9ad69c56832160caebb1e5e2923ea6ce92d0e0aa))
* **Adapter:** WMTS capabilities parser changed to use OpenLayers library ([bab9487](https://github.com/Inogeo/giseye/commit/bab94872ab1e4e8485bd0c039f26ad0e85b4992a))

## [1.7.2](https://github.com/Inogeo/giseye/compare/v1.7.1...v1.7.2) (2023-01-05)


### Bug Fixes

* **Legend:** Bug fix on layer object duplicates when the same layer is added twice to the project ([5e99eaf](https://github.com/Inogeo/giseye/commit/5e99eaf4324b4cca858bf57e3224795878752848))
* **Legend:** simplification of map method calls ([62ab11f](https://github.com/Inogeo/giseye/commit/62ab11f214a30bdf252e2af1fec76c8ffa0971fb))

## [1.7.1](https://github.com/Inogeo/giseye/compare/v1.7.0...v1.7.1) (2022-12-29)


### Bug Fixes

* **LegendLayer:** fixed color change on visibility toggling button ([60b30f7](https://github.com/Inogeo/giseye/commit/60b30f74c5c65fa63307e3ba686c64d4d25a171d))
* **UX:** fixed minor bugs in height of display ([4756884](https://github.com/Inogeo/giseye/commit/47568847cfcbf4f50986bd823bf6714f08e5c489))

## [1.7.0](https://github.com/Inogeo/giseye/compare/v1.6.1...v1.7.0) (2022-12-23)


### Features

* **legend:** legend controls are now operationnal ([67984b3](https://github.com/Inogeo/giseye/commit/67984b3d7ba5c36b9bc4d84b6ab0e8ca27214f15))


### Bug Fixes

* **legend:** removed unused console.log ([ed03259](https://github.com/Inogeo/giseye/commit/ed03259feec53e55c91a862f34029c9b64e07982))
* **legend:** temporary disabled layer ordering ([d2bd5a6](https://github.com/Inogeo/giseye/commit/d2bd5a611772c68fb4ac3806def8add2c00789cb))

## [1.6.1](https://github.com/Inogeo/giseye/compare/v1.6.0...v1.6.1) (2022-12-23)


### Bug Fixes

* **map:** temporary fix of WMS support ([cec5a22](https://github.com/Inogeo/giseye/commit/cec5a22ec5aa7343a61c4be4ea4df654ee866a28))

## [1.6.0](https://github.com/Inogeo/giseye/compare/v1.5.4...v1.6.0) (2022-12-23)


### Features

* **map:** map is now synced with URL ([c225b68](https://github.com/Inogeo/giseye/commit/c225b68230f35127d8984b614832590542f91d9a))


### Bug Fixes

* **deps:** completely removed leaflet from dependencies ([34c3eb8](https://github.com/Inogeo/giseye/commit/34c3eb836d6dcaaee631c67b690eb466febd8965))
* **map:** added debounce on container resize to improve stability ([bdc6ab5](https://github.com/Inogeo/giseye/commit/bdc6ab53d9124044718d878ef4f0969b7e720949))
* **npm:** removed leaflet from dependencies ([5b04e03](https://github.com/Inogeo/giseye/commit/5b04e03ba58447eef504e6248a4b00aa8a316698))
* **utils:** remove debounce from utils, as we are using now use-debounce library for react ([67a95f5](https://github.com/Inogeo/giseye/commit/67a95f5f098e08230a28d35a01527a2444c46aae))

## [1.5.4](https://github.com/Inogeo/giseye/compare/v1.5.3...v1.5.4) (2022-12-21)


### Bug Fixes

* **map:** changed maplibre loading method to avoid error in production build ([b8ef400](https://github.com/Inogeo/giseye/commit/b8ef400c3fb67be888ecda0c6ffcb1588035e61c))

## [1.5.3](https://github.com/Inogeo/giseye/compare/v1.5.2...v1.5.3) (2022-12-21)


### Bug Fixes

* **docker:** the whole env file is used to avoid gaps in docker env vars declarations ([3a5192b](https://github.com/Inogeo/giseye/commit/3a5192b585c4b813c525394007f562df61162d25))

## [1.5.2](https://github.com/Inogeo/giseye/compare/v1.5.1...v1.5.2) (2022-12-20)


### Bug Fixes

* **.env:** removed env from being tracked ([c05ccdb](https://github.com/Inogeo/giseye/commit/c05ccdb6e4b55f72a3a2b887b7955c2a30a929af))
* **docker:** added api key in docker_compose ([ac8be53](https://github.com/Inogeo/giseye/commit/ac8be53190a2a0b691db430a9ccd6696de4e5f78))
* **env:** env file taken out from repo to avoid sensitive information being shared ([55fe13d](https://github.com/Inogeo/giseye/commit/55fe13ddd6c88f0ea4308b03250f91f8689d8f6a))
* **env:** temporary commit of API key ([d0dcf44](https://github.com/Inogeo/giseye/commit/d0dcf44d67ae9fc74c1b0247db2e034ef39f621c))
* **map:** changed default background ([df5c77f](https://github.com/Inogeo/giseye/commit/df5c77fe034a16cb3ed08b4b5b235e4d869da035))
* **Map:** fix warning on useEffect dependency array warning ([64fd3b8](https://github.com/Inogeo/giseye/commit/64fd3b87b3ab9bd4b576e53d09e733d307c3472b))
* **map:** fixed minor bug in map DOM rendering ([30b4625](https://github.com/Inogeo/giseye/commit/30b46259649b0b89d84a4f3cb5f3eed6f4e6c173))
* **UX:** removed possibility to sort panels of the interface ([62658c0](https://github.com/Inogeo/giseye/commit/62658c00f1f2b607e9faddd9cd0142f499fbd1a1))
* **UX:** removed scroll in large view for catalog ([a81c044](https://github.com/Inogeo/giseye/commit/a81c044eebe0524ba6f2915dbece7f3607b1d5ee))

## [1.5.1](https://github.com/Inogeo/giseye/compare/v1.5.0...v1.5.1) (2022-12-14)


### Bug Fixes

* **UX:** improvement on user interface ([4e38ba7](https://github.com/Inogeo/giseye/commit/4e38ba7ebb397abebe983eaa391589a86f38c0e9))
* **UX:** improvement on UX by fixing components heights ([24f1a29](https://github.com/Inogeo/giseye/commit/24f1a2925ec18da04501e01e863bd9259cd94313))

## [1.5.0](https://github.com/Inogeo/giseye/compare/v1.4.0...v1.5.0) (2022-12-14)


### Features

* **toolbar:** improvement of toolbar responsivity ([7200bdd](https://github.com/Inogeo/giseye/commit/7200bdd7ee9700b52744d0c21f45e1dd0640b049))

## [1.4.0](https://github.com/Inogeo/giseye/compare/v1.3.1...v1.4.0) (2022-12-10)


### Features

* **CICD:** automatically check for outdated dependencies ([f5fe457](https://github.com/Inogeo/giseye/commit/f5fe457256fe46493e8312affdd439c002bf79f6))

## [1.3.1](https://github.com/Inogeo/giseye/compare/v1.3.0...v1.3.1) (2022-12-10)


### Bug Fixes

* **app:** Fixed remaining errors in app name ([76dfa65](https://github.com/Inogeo/giseye/commit/76dfa651a1b80ff295ae1bc4b1037624c1a0f202))

## [1.3.0](https://github.com/Inogeo/giseye/compare/v1.2.0...v1.3.0) (2022-12-10)


### Features

* **CICD:** added the capacity to make a build from docker-compose ([6167b2a](https://github.com/Inogeo/giseye/commit/6167b2aa90ac8e1fdcedc501ba20eeed945cdf43))
* **CICD:** cached node dependencies in workflow ([a9a1cc3](https://github.com/Inogeo/giseye/commit/a9a1cc315e2ee5454410cb4797a6cff91bb54c34))


### Bug Fixes

* **env:** added env to repo and removed useless URLs ([99332e9](https://github.com/Inogeo/giseye/commit/99332e9cc35080dfcf5af2d3290be501bcdeede3))

## [1.2.0](https://github.com/Inogeo/giseye/compare/v1.1.0...v1.2.0) (2022-12-10)


### Features

* **workflow:** improvement of the release workflow by adding a build step ([085d3b3](https://github.com/Inogeo/giseye/commit/085d3b3a4713a42084d683c42913e11319767f8c))

## [1.1.0](https://github.com/Inogeo/giseye/compare/v1.0.0...v1.1.0) (2022-12-10)


### Features

* **CI/CD:** added continuous build ([663a215](https://github.com/Inogeo/giseye/commit/663a215349e4e39eaad3ce39d77eba819f8e4e4b))

## 1.0.0 (2022-12-10)


### Features

* initial commit ([6d2dbd6](https://github.com/Inogeo/giseye/commit/6d2dbd64a27a77ddfde7e1664d8bbc3dee51c9f8))

## [1.2.0](https://github.com/Inogeo/giseye/compare/v1.1.0...v1.2.0) (2022-12-10)


### Features

* **adapter:** addition of WMS in front-end buttons ([b0b7adb](https://github.com/Inogeo/giseye/commit/b0b7adb36b1782936809c6038a43834fb5beb269))
* **adapters:** added WMS support and improvement of stability for all adapters ([d622894](https://github.com/Inogeo/giseye/commit/d622894ca38f4735af7980cd9451d3110c82312c))
* **AdapterWMTS:** improvement of stabilitiy ([f16f538](https://github.com/Inogeo/giseye/commit/f16f538aad6dfaf77d014180241c58a0a4a31672))
* **app:** added dynamic layer addition ([e6fc073](https://github.com/Inogeo/giseye/commit/e6fc073e0441d1e9d49c4f6c3f5c809d041a1868))
* **app:** set catalog to the left and legend to the right by default and fixed overflows for catalog results ([065692a](https://github.com/Inogeo/giseye/commit/065692ad5f089ca657059fb15695f8c9de42505f))
* **Catalog:** Leveraged layer loading to app level in order to sync all elements of the app ([15b6e59](https://github.com/Inogeo/giseye/commit/15b6e59326a7df4d4336ccc72f6f209eac0a48c3))


### Bug Fixes

* **Catlog:** improvement of the general performance on components rendering ([e57d7fc](https://github.com/Inogeo/giseye/commit/e57d7fcd54b5dd2c34750ad050271e24cdde6c64))
* **FetchWithTimeOut:** removed console.log from script ([8d22b45](https://github.com/Inogeo/giseye/commit/8d22b459a184055f85a1dba607d78a5eed67847f))
* **html:** improvement of responsive capacity ([b6c8362](https://github.com/Inogeo/giseye/commit/b6c8362104cac21134c4f86523a3238285371041))
* **nidex.html:** removed a copy of file ([ccca30d](https://github.com/Inogeo/giseye/commit/ccca30db0aedf1dd340f57d398f7251f1239d28d))

## [1.1.0](https://github.com/Inogeo/giseye/compare/v1.0.0...v1.1.0) (2022-11-13)


### Features

* **Adapters:** beta release for WMST adapter ([6026898](https://github.com/Inogeo/giseye/commit/6026898f42ebd246c60fb1e6b879ac155382ec85))
* **CatalogServiceConnect:** first release of service publication ([0634f10](https://github.com/Inogeo/giseye/commit/0634f10225ad3a7cf76dcf4f04429afeae95e0da))
* **utils:** added fetchWithTimeout function ([35250ef](https://github.com/Inogeo/giseye/commit/35250efa9d04bb02d245c5b02e2289138c2efc4a))


### Bug Fixes

* **catalog:** removed services not supported in new service protocol choice ([8c1849e](https://github.com/Inogeo/giseye/commit/8c1849ebf3f5a903e410641c55b70faf8b746ca8))
* **docker:** added timeout env for fetchWithTimeout function ([14202cc](https://github.com/Inogeo/giseye/commit/14202cc8fe0017ccbf38d31e0f032dd77a14574d))
* **git:** ignored .vscode folder for dev purposes ([27bb3f9](https://github.com/Inogeo/giseye/commit/27bb3f9529c5c2d98f60bb59b07df8768edd1024))

## 1.0.0 (2022-11-07)


### Features

* **catalog-services:** added service feature to catalog ([c3bfac8](https://github.com/Inogeo/giseye/commit/c3bfac8b38672973a17e2c94c291d4c702296551))
* **catalog:** added catalog to main app ([a9880c5](https://github.com/Inogeo/giseye/commit/a9880c58d2466fe47cba8b6f17d2e4c9619cef85))
* **catalog:** added uuid generator to catalog ([4640148](https://github.com/Inogeo/giseye/commit/4640148524df37850f68b0bfb407ac1eb928b356))
* **docker:** added possibility to change docker port from .env file ([72eea72](https://github.com/Inogeo/giseye/commit/72eea7206071aa1070bbf7bbbebb075297f76006))
* **jsx:** created catalog component ([43cd30d](https://github.com/Inogeo/giseye/commit/43cd30d00b67a4c599be13dceb11254405538345))
