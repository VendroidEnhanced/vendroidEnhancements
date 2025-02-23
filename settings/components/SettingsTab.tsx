/* eslint-disable simple-header/header */

import { SettingsTab as STab } from "@components/VencordSettings/shared";
import { Forms } from "@webpack/common";

import { generateOptions } from "../generateOptions";
import { settings } from "../settings";

export function SettingsTab() {
    return (
        <STab title="VendroidEnhanced Settings">
            {Object.entries(settings).map(([section, sectionSettings]) => {
                return <>
                    <div style={{ marginTop: "20px", width: "100%" }} />
                    <Forms.FormSection title={section}>
                        {
                            generateOptions(sectionSettings)
                        }
                    </Forms.FormSection>
                </>;
            })}
        </STab>
    );
}
