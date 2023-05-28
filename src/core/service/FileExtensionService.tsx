import { Service } from "../../api/service";
import { Application } from "../../api/v1/dto";
import { desktopLens, processManagerLens } from "../../store";
import { IFrame } from "../../share/ui";

export interface FileExtensionServiceProps {

}

const hasExtension = (text: string, ...ext: string[]) => {
    const lower = text.toLowerCase();
    return ext.find(e => lower.endsWith(e.toLowerCase()));
}

const wrapperStyle: React.CSSProperties = { position: 'relative', width: '100%', height: '100%' };
const frameStyle: React.CSSProperties = { position: 'absolute', width: '100%', height: '100%' };

export class FileExtensionService extends Service<FileExtensionServiceProps, void> {
    private readonly application: Application;
    private readonly supportedFiles: string[];
    private readonly href: string;

    constructor(application: Application, props: { href: string, supportedFiles: string[] }) {
        super("FileExtension");

        this.application = application;

        this.href = props.href;
        this.supportedFiles = props.supportedFiles;
    }

    public hasSupport(props?: unknown): boolean {
        return typeof props === 'string' && !!hasExtension(props, ...this.supportedFiles);
    }

    public exec(props: unknown): Promise<void> {
        const path = String(props);

        return processManagerLens.createProcess(this.application, { subject: path })
        .then(processLens => {
            return desktopLens.createView(
                processLens,
                () => (
                    <div key={processLens.get().key} style={wrapperStyle}>
                        <IFrame
                            src={this.href}
                            style={frameStyle}
                        />
                    </div>
                ),
            )
        }).then(viewLens => {
            desktopLens.go('activeKey').set(viewLens.get().key)
        });
    }
}