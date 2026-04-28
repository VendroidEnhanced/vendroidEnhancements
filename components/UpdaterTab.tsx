/* eslint-disable simple-header/header */

import { BaseText } from "@components/BaseText";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Flex } from "@components/Flex";
import { SettingsTab as STab } from "@components/settings/tabs/BaseTab";
import { classes } from "@utils/misc";

import { cl } from "../utils";

export function UpdaterTab() {
    return (
        <STab>
            <Card className={classes("vc-settings-card", "info-card")}>
                <Flex flexDirection="column">
                    <BaseText weight="bold" className={cl("updater-tab-app-updates")}>
                        App updates
                    </BaseText>
                    <BaseText>
                        Currently, VendroidEnhanced update checking is {window.VencordMobileNative.getBool("checkVDEUpdates", true) ? "enabled" : "disabled"}.
                        {" "}
                        You can still check for updates using the button below.
                    </BaseText>
                    <Button
                        variant="secondary"
                        onClick={() => { window.VencordMobileNative.updateVendroid(); }}>
                        Check for app updates
                    </Button>
                </Flex>
            </Card>
            <Card className={classes("vc-settings-card", "info-card")}>
                <Flex flexDirection="column">
                    <BaseText weight="bold" className={cl("updater-tab-vencord-updates")}>
                        {Vencord.Api.isEquicord ? "Equicord" : "Vencord"} updates
                    </BaseText>
                    <BaseText>
                        Your client mod of choice is automatically updated on app updates.
                        {" "}
                        However, you are able to manually trigger an update using the button below.
                    </BaseText>
                    <Button
                        variant="secondary"
                        onClick={() => { window.VencordMobileNative.updateVencord(); }}
                    >
                        Update {Vencord.Api.isEquicord ? "Equicord" : "Vencord"}
                    </Button>
                </Flex>
            </Card>
        </STab>
    );
}
