const packageJson = require("../package.json")

const browserEnv = process.env.BROWSER_ENV

const generateManifest = () => {
  if (!packageJson.version) {
    throw new Error("Version not found in package.json")
  }

  return JSON.stringify(
    {
      manifest_version: 2,
      name: "manaba Enhanced for Tsukuba",
      version: packageJson.version,
      description: "Make your manaba a little bit more comfortable",
      icons: {
        16: "icons/icon_16.png",
        32: "icons/icon_32.png",
        48: "icons/icon_48.png",
        128: "icons/icon_128.png",
      },
      permissions: [
        "storage",
        "contextMenus",
        "webRequest",
        "webRequestBlocking",
        "downloads",
        "*://manaba.tsukuba.ac.jp/*",
      ],
      options_ui: {
        page: "options.html",
        browser_style: true,
        open_in_tab: true,
      },
      background: {
        scripts: ["background.js"],
        persistent: true,
      },
      content_scripts: [
        {
          matches: ["https://manaba.tsukuba.ac.jp/*"],
          run_at: "document_start",
          js: ["contentScript/main.js"],
        },
        {
          matches: ["https://manaba.tsukuba.ac.jp/*"],
          include_globs: ["https://manaba.tsukuba.ac.jp/ct/course_*_report_*"],
          js: ["contentScript/reportTemplate.js"],
        },
        {
          matches: ["https://manaba.tsukuba.ac.jp/*"],
          include_globs: ["https://manaba.tsukuba.ac.jp/ct/course_*_grade"],
          js: ["contentScript/showRelativeGradesPosition.js"],
        },
      ],
      commands: {
        "manaba-enhanced:open-in-respon": {
          suggested_key: {
            default: "Alt+R",
          },
          description: "Open selected Respon code in Respon",
        },
        "manaba-enhanced:open-assignments-page": {
          description: "Open unsubmitted assignments page",
        },
      },
      default_locale: "ja",
      ...(browserEnv === "firefox"
        ? {
            browser_specific_settings: {
              gecko: {
                id: "{9FD229B7-1BD6-4095-965E-BE30EBFAD42E}",
                update_url:
                  "https://raw.githubusercontent.com/manaba-enhanced-for-tsukuba/dist-firefox/main/updates.json",
              },
            },
          }
        : {}),
    },
    null,
    2
  )
}

module.exports = generateManifest()
