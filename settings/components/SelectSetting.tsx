/* eslint-disable simple-header/header */

import { BaseText } from "@components/BaseText";
import { Divider } from "@components/Divider";
import { Select, useState } from "@webpack/common";

import { cl } from "../../utils";
import { Setting } from "../types";

export function SelectSetting({ id, setting }: {
    id: string;
    setting: Setting;
}) {
    if (setting.type !== "select") throw new Error("Invalid setting type");

    const [value, setValue] = useState(window.VencordMobileNative.getString(id, setting.defaultValue)); // selects are still strings underneath

    return (
        <>
            <BaseText tag="p" weight="medium" className={cl("select-setting-title")}>{setting.label}</BaseText>
            <BaseText tag="p" size="sm" className={cl("select-setting-description")}>{setting.description}</BaseText>
            <Select
                options={setting.options.map(o => {
                    return {
                        label: o.label,
                        value: o.key
                    };
                })}
                isSelected={v => v === value}
                select={v => {
                    setValue(v);
                    window.VencordMobileNative.setString(id, v);
                }}
                serialize={String}
            />
            <Divider />
        </>
    );
}
