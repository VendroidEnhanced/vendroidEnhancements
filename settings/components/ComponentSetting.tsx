/* eslint-disable simple-header/header */

import { BaseText } from "@components/BaseText";
import { Divider } from "@components/Divider";

import { cl } from "../../utils";
import { Setting } from "../types";

export function ComponentSetting({ setting }: {
    setting: Setting;
}) {
    if (setting.type !== "component") throw new Error("Invalid setting type");

    return (
        <>
            <BaseText tag="p" weight="medium" className={cl("component-setting-title")}>{setting.label}</BaseText>
            <BaseText tag="p" size="sm" className={cl("component-setting-description")}>{setting.description}</BaseText>
            <setting.component />
            <Divider />
        </>
    );
}
