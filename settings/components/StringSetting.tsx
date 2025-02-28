/* eslint-disable simple-header/header */

import { Forms, TextInput, useState } from "@webpack/common";

import { Setting } from "../types";
import { Divider } from "./Divider";

export function StringSetting({ id, setting }: {
    id: string;
    setting: Setting;
}) {
    if(setting.type !== "string") throw new Error("Invalid setting type");

    const [value, setValue] = useState(window.VencordMobileNative.getString(id, setting.defaultValue));

    return (
        <>
            <Forms.FormText style={{ fontSize: "16px", color: "var(--header-primary)", marginBottom: "8px", fontWeight: "500" }}>{setting.label}</Forms.FormText>
            <Forms.FormText style={{ marginBottom: "10px" }} type="description">{setting.description}</Forms.FormText>
            <TextInput
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
