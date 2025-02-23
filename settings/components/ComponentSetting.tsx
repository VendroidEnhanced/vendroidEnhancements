/* eslint-disable simple-header/header */

import { Forms } from "@webpack/common";

import { Setting } from "../types";
import { Divider } from "./Divider";

export function ComponentSetting({ setting }: {
    setting: Setting;
}) {
    if(setting.type !== "component") throw new Error("Invalid setting type");

    return (
        <>
            <Forms.FormText style={{ fontSize: "16px", color: "var(--header-primary)", marginBottom: "8px", fontWeight: "500" }}>{setting.label}</Forms.FormText>
            <Forms.FormText style={{ marginBottom: "10px" }} type="description">{setting.description}</Forms.FormText>
            <setting.component />
            <Divider />
        </>
    );
}
