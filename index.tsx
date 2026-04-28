/* eslint-disable simple-header/header */

import "./style.css";
import "./mstyle.css?managed";

import { definePluginSettings } from "@api/Settings";
import { enableStyle } from "@api/Styles";
import { BaseText } from "@components/BaseText";
import { UpdaterIcon, VesktopSettingsIcon } from "@components/Icons";
import { Link } from "@components/Link";
import { wrapTab } from "@components/settings/tabs/BaseTab";
import { Contributor } from "@equicordplugins/themeLibrary/types";
import type SettingsPlugin from "@plugins/_core/settings";
import { Margins } from "@utils/margins";
import definePlugin, { OptionType } from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { Alerts } from "@webpack/common";

import myself from ".";
import { UpdaterTab } from "./components/UpdaterTab";
import { SettingsTab } from "./settings/components/SettingsTab";
import { ABANDONWARE_SUPPORT_ID, EQUICORD_SUPPORT_ID, VENCORD_SUPPORT_ID } from "./utils";

export let contributors: Contributor[] = [];
const ChannelSidebarActions = findByPropsLazy("toggleMembersSection");
const PlatformUtils = findByPropsLazy("isAndroidWeb");

let isMembersVisible = false;
let isSidebarVisible = true;

function updatePanelsStatus() {
    isSidebarVisible = !!document.querySelector("div[class^='sidebar_']");
    isMembersVisible = !!document.querySelector("div[class^='members_']");
}

function showNoSupportModal(name: string = "Vencord") {
    Alerts.show({
        title: "Hold on!",
        body: <>
            <img alt="no-support-image" src="https://github.com/user-attachments/assets/4a351bfb-a2a1-4693-be2d-d19f18d76684" />
            <BaseText tag="p" size="sm" className={Margins.top8}>
                You are using VendroidEnhanced, which the {name} Server does not provide support for!
            </BaseText>

            <BaseText tag="p" size="sm" className={Margins.top8}>
                {name} only provides support for official builds.Therefore, please ask for support in the <Link href="https://discord.gg/qtmpcF56Yf"> VendroidEnhanced support server </Link>.
            </BaseText>

            <BaseText weight="bold" className={Margins.top8}> You will be banned from receiving support if you ignore this rule.</BaseText>

            <BaseText size="xs" weight="medium" className={Margins.top8}> You can disable this warning and regain message sending permissions here in the VendroidEnhancements plugin settings.</BaseText>
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
            find: '"chat input type must be set"',
            replacement: [
                {
                    match: /(\i.\i.useSetting\(\))&&!\(0,\i.isAndroidWeb\)\(\)/,
                    replace: "$1",
                },
            ],
            all: true,
        },
    ],
    prepareSettings() {
        (Vencord.Plugins.plugins.Settings as typeof SettingsPlugin).customEntries.push({
            key: "vc-vdenhanced-updater",
            title: "Updater",
            Component: wrapTab(UpdaterTab, "Updater"),
            Icon: UpdaterIcon
        }, {
            key: "vc-vdenhanced-settings",
            title: "VendroidEnhanced Settings",
            Component: wrapTab(SettingsTab, "VendroidEnhanced Settings"),
            Icon: VesktopSettingsIcon
        });
    },
    async start() {
        this.prepareSettings();
        // Populate badges
        try {
            contributors = (await (
                await fetch(
                    "https://vendroid.nin0.dev/api/contributors"
                )
            ).json()).contributors;
        } catch { }

        if (!window.VencordMobileNative.getBool("desktopMode", false) && PlatformUtils.isAndroidWeb()) {
            enableStyle("mstyle");
            setInterval(() => {
                const screenWidth = screen.availWidth;

                const style = document.querySelector("#vde-screen-width") || document.createElement("style");
                style.setAttribute("id", "vde-screen-width");
                style.textContent = `:root { --screen-width: ${screenWidth}px }`;
                document.head.appendChild(style);
            }, 1000);
        }
        setInterval(() => {
            updatePanelsStatus();
        }, 1000);

        // Monkeypatch quickcss opening :heart:
        VencordNative.quickCss.openEditor = async () => {
            window.VencordMobileNative.openQuickCss((await VencordNative.quickCss.get()));
        };

        let startX: number;
        let startY: number;

        if (!myself.settings.store.enableGestures) return;

        document.addEventListener("touchstart", event => {
            startX = event.changedTouches[0].clientX;
            startY = event.changedTouches[0].clientY;
        });
        document.addEventListener("touchend", event => {
            if (!startX || !startY) return;
            const endX = event.changedTouches[0].screenX;
            const endY = event.changedTouches[0].screenY;

            const isSwipeVertical = Math.abs(endY - startY) > 60;
            if (!isSwipeVertical) {
                if (Math.abs(endX - startX) > 60) {
                    if (endX < startX) {
                        // Left swipe (right to left)
                        if (isSidebarVisible) {
                            // @ts-expect-error
                            NavigationRouter.transitionToGuild(SelectedGuildStore.getGuildId());
                            isMembersVisible = false;
                            isSidebarVisible = false;
                        }
                        else {
                            if (!isMembersVisible) {
                                ChannelSidebarActions.toggleMembersSection();
                                isMembersVisible = true;
                                isSidebarVisible = false;
                            }
                        }
                    } else {
                        // Right swipe (left to right)
                        if (!isSidebarVisible) {
                            if (!isMembersVisible) {
                                // @ts-ignore
                                document.querySelector("button[class^='btnHamburger__']").click();
                                isMembersVisible = false;
                                isSidebarVisible = true;
                            }
                        }
                        if (isMembersVisible) {
                            ChannelSidebarActions.toggleMembersSection();
                            isMembersVisible = false;
                            isSidebarVisible = false;
                        }
                    }
                }
            }
        });
    },
    settings: definePluginSettings({
        allowSupportMessageSending: {
            description:
                "Allow sending messages in the Vencord support channel. DO NOT ASK FOR SUPPORT IN IT FOR VENDROIDENHANCED ISSUES!!",
            default: false,
            type: OptionType.BOOLEAN,
        },
        enableGestures: {
            description: "Enable gesture navigation between channels/chat/memberlist, might mess up scrolling",
            default: true,
            type: OptionType.BOOLEAN
        }
    }),
    onBeforeMessageSend(c, msg) {
        if (this.settings.store.allowSupportMessageSending) return;

        const label = [VENCORD_SUPPORT_ID, ABANDONWARE_SUPPORT_ID].includes(c)
            ? "Vencord" : c === EQUICORD_SUPPORT_ID ? "Equicord" : null;
        if (!label) return;

        showNoSupportModal(label);
        msg.content = "";
    },
    userProfileBadge: {
        id: "vendroid_enhanced_contributor_badge",
        description: "VendroidEnhanced Contributor",
        iconSrc: "https://raw.githubusercontent.com/VendroidEnhanced/random-files/f8d6485aadde73599eca60c53ddf8a5769ec1293/ic_launcher-playstore.png",
        position: 0,
        props: {
            style: {
                borderRadius: "50%",
                transform: "scale(0.9)", // The image is a bit too big compared to default badges
            },
        },
        shouldShow: ({ userId }) => contributors.map(c => c.id || 0).includes(userId),
        link: "https://github.com/nin0-dev/VendroidEnhanced",
    },
    flux: {
        async CHANNEL_SELECT({ channelId }) {
            if (myself.settings.store.allowSupportMessageSending) return;
            switch (channelId) {
                case VENCORD_SUPPORT_ID: {
                    showNoSupportModal();
                    break;
                }
                case EQUICORD_SUPPORT_ID: {
                    // @ts-ignore
                    if (Vencord.Api.isEquicord) showNoSupportModal("Equicord");
                    break;
                }
            }
        },
    },
});
