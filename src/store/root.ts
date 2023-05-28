import { Callbacks, createLens } from "@vovikilelik/lens-js";
import { ApplicationListLens } from "../api/app-store";
import { Desktop, DesktopLens } from "../api/desktop";
import { ProcessManagerLens } from "../api/process-manager/ProcessManagerLens";
import { serviceManager } from "../api/service";
import { isServiceContext } from "../api/v1/dto";
import { FileExtensionService } from "../core/service/FileExtensionService";
import { initData } from "./initData";
import { AuthLens } from "./lens";

const root = createLens(initData);

export const lens = root;
export const themeLens = root.go('theme');
export const authLens = root.go('auth', AuthLens);
export const processManagerLens = root.go('processManager', ProcessManagerLens);
export const installedAppsLens = root.go('installedApps', ApplicationListLens);

installedAppsLens.attach(Callbacks.strict(({ current }) => {
    current?.value.forEach(a => {
        if (!isServiceContext(a.context)) {
            return;
        }

        switch (a.context.serviceName) {
            case 'FileExtension':
                serviceManager.registryService(new FileExtensionService(a, a.context as any))
        }
    })
}));

export const _desktopLens = createLens({ desktop: { list:[] } as Desktop });

export const desktopLens = _desktopLens.go('desktop', DesktopLens);
