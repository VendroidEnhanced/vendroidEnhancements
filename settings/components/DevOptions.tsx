/* eslint-disable simple-header/header */

import { ErrorBoundary } from "@components/index";
import { ModalCloseButton, ModalContent, ModalHeader, ModalRoot, ModalSize, openModal } from "@utils/modal";
import { Text } from "@webpack/common";

import { cl } from "../../utils";
import { generateOptions } from "../generateOptions";
import { Setting } from "../types";

const devOptions: {
    [key: string]: Setting;
} = {
    allowRemoteDebugging: {
        label: "Allow remote debugging",
        type: "toggle",
        description: "Expose WebView to remote Chrome DevTools. You will be able to inspect the WebView on a browser using chrome://inspect. This does not give any access outside of your local network",
        defaultValue: false
    },
    vencordLocation: {
        label: "Vencord location",
        type: "string",
        description: "This setting is only relevant to people looking to develop VendroidEnhanced. Do not edit it unless you plan to do so. You will not get any support if things go wrong.",
        placeholder: "https://example.com/browser.js"
    }
};

export function showDevOptionsModal() {
    openModal(props =>
        <>
            <ErrorBoundary>
                <ModalRoot {...props} size={ModalSize.DYNAMIC} fullscreenOnMobile={true} >
                    <ModalHeader>
                        <Text variant="heading-lg/semibold" className={cl("header")}>
                            Developer settings
                        </Text>
                        <ModalCloseButton onClick={props.onClose} className={cl("close-button")} />
                    </ModalHeader>
                    <ModalContent>
                        <div className={cl("dev-options")}>
                            {generateOptions(devOptions)}
                        </div>
                    </ModalContent>
                </ModalRoot>
            </ErrorBoundary>
        </>
    );
}
