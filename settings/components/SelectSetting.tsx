/* eslint-disable simple-header/header */

import { Forms, Select, useState } from "@webpack/common";

import { Setting } from "../types";
import { Divider } from "./Divider";

export function SelectSetting({ id, setting }: {
    id: string;
    setting: Setting;
}) {
    if(setting.type !== "select") throw new Error("Invalid setting type");
    const [value, setValue] = useState(window.VencordMobileNative.getString(id, setting.defaultValue)); // selects are still strings underneath

    return (
        <>
            <Forms.FormText style={{ fontSize: "16px", color: "var(--header-primary)", marginBottom: "8px", fontWeight: "500" }}>{setting.label}</Forms.FormText>
            <Forms.FormText style={{ marginBottom: "10px" }} type="description">{setting.description}</Forms.FormText>
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
