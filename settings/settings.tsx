/* eslint-disable simple-header/header */

import { Button } from "@webpack/common";

import { AppIconPicker } from "./components/AppIconPicker";
import { showDevOptionsModal } from "./components/DevOptions";
import { Settings } from "./types";

export const settings: Settings = {
  Core: {
    discordBranch: {
      type: "select",
      label: "Discord branch",
      description: "The Discord branch to load",
      options: [
        { key: "stable", label: "Stable" },
        { key: "canary", label: "Canary" },
        { key: "ptb", label: "PTB" },
      ],
      defaultValue: "stable",
    },
    checkVDEUpdates: {
      type: "toggle",
      label: "Automatically check for updates",
      description:
        "When the app starts, check VendroidEnhanced updates and offer to install them",
      defaultValue: true,
    },
    checkAnnouncements: {
      type: "toggle",
      label: "Check for announcements at start",
      description:
        "When the app starts, check for announcements from VendroidEnhanced maintainers",
      defaultValue: true,
    },
    clientMod: {
      type: "select",
      label: "Client mod",
      description: "Choose between Vencord and Equicord to load",
      options: [
        { key: "vencord", label: "Vencord" },
        { key: "equicord", label: "Equicord" },
      ],
      defaultValue: "vencord",
    },
  },
  Customisation: {
    splashScreen: {
      label: "Splash screen",
      type: "select",
      description: "Splash screen to show at app launch",
      defaultValue: "viggy",
      options: [
        {
          key: "viggy",
          label: "Viggy, by Shoritsu",
        },
        {
          key: "shiggy",
          label: "Shiggy, by naga_U",
        },
        {
          key: "oneko",
          label: "Oneko",
        },
      ],
    },
    appIcon: {
      label: "App icon",
      type: "component",
      description: "App icon to display on the home screen",
      component: AppIconPicker,
    },
    desktopMode: {
      label: "Desktop mode",
      type: "toggle",
      description: "Use Discord in desktop mode. Might cause some issues",
      defaultValue: false,
    },
  },
  Other: {
    devSettings: {
      label: "Developer settings",
      description:
        "These settings are only meant for developers to use and you will not get any support if things go wrong. Be careful.",
      type: "component",
      component: () => (
        <>
          <Button
            color={Button.Colors.TRANSPARENT}
            onClick={showDevOptionsModal}
          >
            Open developer settings
          </Button>
        </>
      ),
    },
  },
};
