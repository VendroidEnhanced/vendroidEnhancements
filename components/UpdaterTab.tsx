/* eslint-disable simple-header/header */

import { Flex } from "@components/Flex";
import { SettingsTab as STab } from "@components/settings/tabs/BaseTab";
import { classes } from "@utils/misc";
import { Button, Card, Text } from "@webpack/common";

export function UpdaterTab() {
    return (
        <STab title="Updater">
            <Card className={classes("vc-settings-card", "info-card")}>
                <Flex flexDirection="column">
                    <Text style={{ fontWeight: "bold", marginBottom: "3px" }}>App updates</Text>
                    <Text>Currently, VendroidEnhanced update checking is {window.VencordMobileNative.getBool("checkVDEUpdates", true) ? "enabled" : "disabled"}. You can still check for updates using the button below.</Text>
                    <Button
                        color={Button.Colors.TRANSPARENT}
                        onClick={() => { window.VencordMobileNative.updateVendroid(); }}>
                        Check for app updates
                    </Button>
                </Flex>
            </Card>
            <Card className={classes("vc-settings-card", "info-card")}>
                <Flex flexDirection="column">
                    {/* @ts-expect-error */}
                    <Text style={{ fontWeight: "bold", marginBottom: "3px" }}>{Vencord.Api.isEquicord ? "Equicord" : "Vencord"} updates</Text>
                    <Text>Your client mod of choice is automatically updated on app updates. However, you are able to manually trigger an update using the button below.</Text>
                    <Button
                        color={Button.Colors.TRANSPARENT}
                        onClick={() => { window.VencordMobileNative.updateVencord(); }}>
                        {/* @ts-expect-error */}
                        Update {Vencord.Api.isEquicord ? "Equicord" : "Vencord"}
                    </Button>
                </Flex>
            </Card>
        </STab>
    );
}
