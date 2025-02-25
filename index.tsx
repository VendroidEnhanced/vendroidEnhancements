/* eslint-disable simple-header/header */

import "./style.css?managed";

import { definePluginSettings } from "@api/Settings";
import { Link } from "@components/Link";
import { wrapTab } from "@components/VencordSettings/shared";
import { Margins } from "@utils/margins";
import definePlugin, { OptionType } from "@utils/types";
import { Alerts, Forms, Text } from "@webpack/common";

import myself from ".";
import { UpdaterTab } from "./components/UpdaterTab";
import { SettingsTab } from "./settings/components/SettingsTab";
import { EQUICORD_SUPPORT_ID, isDev, VENCORD_SUPPORT_ID } from "./utils";

function showNoSupportModal(name: string = "Vencord") {
    Alerts.show({
        title: "Hold on!",
        body: <>
            <img src="https://github.com/user-attachments/assets/4a351bfb-a2a1-4693-be2d-d19f18d76684" />
            <Forms.FormText className={Margins.top8}>You are using VendroidEnhanced, which the {name} Server does not provide support for!</Forms.FormText>

            <Forms.FormText className={Margins.top8}>
                {name} only provides support for official builds. Therefore, please ask for support in the <Link href="https://discord.gg/qtmpcF56Yf">VendroidEnhanced support server</Link>.
            </Forms.FormText>

            <Text variant="text-md/bold" className={Margins.top8}>You will be banned from receiving support if you ignore this rule.</Text>

            <Text variant="text-xs/medium" className={Margins.top8}>You can disable this warning and regain message sending permissions here in the VendroidEnhancements plugin settings.</Text>
        </>,
    });
}


export default definePlugin({
    name: "VendroidEnhancements",
    description: "Makes Vendroid usable.",
    required: true,
    authors: [], // no authors because insane
    dependencies: ["MessageEventsAPI"],
    patches: [
        {
            find: "chat input type must be set",
            replacement: [{
                match: /(\i.\i.useSetting\(\))&&!\(0,\i.isAndroidWeb\)\(\)/,
                replace: "$1"
            }]
        }
    ],
    start() {
        (Vencord.Plugins.plugins.Settings as any).customSections.push(() => ({
            section: "VDEUpdater",
            label: "Updater",
            element: wrapTab(UpdaterTab, "Updater"),
            className: "vc-vdenhanced-updater"
        }));
        (Vencord.Plugins.plugins.Settings as any).customSections.push(() => ({
            section: "VDESettings",
            label: "VendroidEnhanced Settings",
            element: wrapTab(SettingsTab, "Vendroid Settings"),
            className: "vc-vdenhanced-settings"
        }));

        // Sidebar showing chat fix
        // FIXME: possibly turn this into a patch. this is needed as discord uses !important on their width
        if (window.VencordMobileNative.getBool("desktopMode", false)) return;
        const sidebarObserver = new MutationObserver(() => {
            try {
                document.querySelector("[class^='sidebar_']")!.setAttribute("style", "width: 100% !important;");
            }
            catch { }
        });
        sidebarObserver.observe(document.querySelector("[class^='content']")!, { childList: true, subtree: true });
    },
    settings: definePluginSettings({
        allowSupportMessageSending: {
            description: "Allow sending messages in the Vencord support channel. DO NOT ASK FOR SUPPORT IN IT FOR VENDROIDENHANCED ISSUES!!",
            default: false,
            type: OptionType.BOOLEAN
        }
    }),
    onBeforeMessageSend(c, msg) {
        if (c === VENCORD_SUPPORT_ID && !this.settings.store.allowSupportMessageSending) {
            showNoSupportModal("Vencord");
            msg.content = "";
        }
        if(c === EQUICORD_SUPPORT_ID && !this.settings.store.allowSupportMessageSending) {
            showNoSupportModal("Equicord");
            msg.content = "";
        }
    },
    userProfileBadge: {
        description: "VendroidEnhanced Contributor",
        image: "https://raw.githubusercontent.com/VendroidEnhanced/UpdateTracker/main/logo.png",
        position: 0,
        props: {
            style: {
                borderRadius: "50%",
                transform: "scale(0.9)" // The image is a bit too big compared to default badges
            }
        },
        shouldShow: ({ userId }) => isDev(userId),
        link: "https://github.com/VendroidEnhanced/Vendroid"
    },
    flux: {
        async CHANNEL_SELECT({ channelId }) {
            if (myself.settings.store.allowSupportMessageSending) return;
            switch (channelId) {
                case VENCORD_SUPPORT_ID: {
                    showNoSupportModal();
                }
            }
        }
    }
});

