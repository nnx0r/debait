import { defineConfig } from "wxt";

export default defineConfig({
  // WXT omits dotfiles from the AMO sources zip by default; keep .nvmrc so
  // reviewers get the pinned Node version (see REVIEWERS.md).
  zip: {
    includeSources: [".nvmrc"],
  },

  manifest: ({ browser }) => ({
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    default_locale: "en",

    permissions: ["declarativeNetRequestWithHostAccess"],
    host_permissions: ["*://*.youtube.com/*", "*://*.ytimg.com/*"],

    declarative_net_request: {
      rule_resources: [{ id: "debait_rules", enabled: true, path: "rules.json" }],
    },

    ...(browser === "firefox"
      ? {
          browser_specific_settings: {
            gecko: {
              // id: 'debait@devilos.dev',
              strict_min_version: "128.0",
              data_collection_permissions: { required: ["none"] },
            },
          },
        }
      : {}),
  }),
});
