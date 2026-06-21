import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: ({ browser }) => ({
    name: 'DeBait',
    description:
      'Replaces clickbait YouTube thumbnails with the real first frame of the video.',

    permissions: ['declarativeNetRequestWithHostAccess'],
    host_permissions: ['*://*.youtube.com/*', '*://*.ytimg.com/*'],

    declarative_net_request: {
      rule_resources: [
        { id: 'debait_rules', enabled: true, path: 'rules.json' },
      ],
    },

    ...(browser === 'firefox'
      ? {
          browser_specific_settings: {
            gecko: {
              id: 'debait@devilos.dev',
              strict_min_version: '128.0',
              data_collection_permissions: { required: ['none'] },
            },
          },
        }
      : {}),
  }),
});
