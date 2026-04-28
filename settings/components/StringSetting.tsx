/* eslint-disable simple-header/header */

import { BaseText } from "@components/BaseText";
import { Divider } from "@components/Divider";
import { TextInput, useState } from "@webpack/common";

import { cl } from "../../utils";
import { Setting } from "../types";

export function StringSetting({ id, setting }: {
    id: string;
    setting: Setting;
}) {
    if (setting.type !== "string") throw new Error("Invalid setting type");

    const [value, setValue] = useState(window.VencordMobileNative.getString(id, setting.defaultValue));

    return (
        <>
            <BaseText tag="p" weight="medium" className={cl("string-setting-title")}>{setting.label}</BaseText>
            <BaseText tag="p" size="sm" className={cl("string-setting-description")}>{setting.description}</BaseText>
            <TextInput
                value={value}
                placeholder={setting.placeholder}
                onChange={v => {
                    setValue(v);
                    window.VencordMobileNative.setString(id, v);
                }}
            />
            <Divider />
        </>
    );
}
