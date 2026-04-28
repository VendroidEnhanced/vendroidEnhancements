/* eslint-disable simple-header/header */

import { SettingsTab as STab } from "@components/settings/tabs/BaseTab";

import { cl } from "../../utils";
import { generateOptions } from "../generateOptions";
import { settings } from "../settings";

export function SettingsTab() {
    return (
        <STab>
            {Object.entries(settings).map(([section, sectionSettings]) => {
                return <>
                    <div className={cl("settings-tab")} />
                    <section title={section}>
                        {generateOptions(sectionSettings)}
                    </section>
                </>;
            })}
        </STab>
    );
}
