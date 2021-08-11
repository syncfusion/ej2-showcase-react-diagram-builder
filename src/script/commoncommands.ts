import { SelectorViewModel } from './selectedItem';
import { PageCreation } from './pages';
import { Diagram, CommandModel, Keys, KeyModifiers, NodeModel, ConnectorModel, Node, Connector } from '@syncfusion/ej2-diagrams';

export abstract class CommonKeyboardCommands {
    public static selectedItem: SelectorViewModel;
    public static page: PageCreation;
    public static isOpen: boolean;

    public static newDiagram(): void {
        let origin: string = window.location.origin;
        if (!origin) {
            origin = window.location.protocol + '//'
                + window.location.hostname
                + (window.location.port ? ':' + window.location.port : '');
        }
        window.open(origin + window.location.pathname);
    }

    public static openDiagram(): void {
        this.openUploadBox(true, '.json');
    }

    public static saveDiagram(): void {
        this.download(this.page.savePage(), (document.getElementById('diagramName') as HTMLElement).innerHTML);
    }

    public static zoomIn(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = ((diagram.scrollSettings.currentZoom as number) * 100).toFixed() + '%';
    }

    public static zoomOut(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = ((diagram.scrollSettings.currentZoom as number) * 100).toFixed() + '%';
    }

    public static download(data: string, filename: string): void {
        let dataStr: string = data;
        if (window.navigator) {
            const blob: Blob = new Blob([dataStr], { type: 'data:text/json;charset=utf-8,' });
            window.navigator.msSaveOrOpenBlob(blob, filename + '.json');
        } else {
            dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const a: HTMLAnchorElement = document.createElement('a');
            a.href = dataStr;
            a.download = filename + '.json';
            document.body.appendChild(a);
            a.click();
        }
    }

    public static openUploadBox(isOpen: boolean, extensionType: string): void {
        let defaultUpload: any = document.getElementById('defaultfileupload');
        defaultUpload = defaultUpload.ej2_instances[0];
        defaultUpload.clearAll();
        this.selectedItem.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
        defaultUpload.dataBind();
        this.isOpen = isOpen;
        (document.getElementsByClassName('e-file-select-wrap')[0].children[0] as HTMLButtonElement).click();
    }

    public static addCommonCommands(commands: CommandModel[]): CommandModel[] {
        commands.push({
            gesture: { key: Keys.N, keyModifiers: KeyModifiers.Shift }, canExecute: this.canExecute,
            execute: this.newDiagram.bind(this), name: 'New'
        });
        commands.push({
            gesture: { key: Keys.N, keyModifiers: KeyModifiers.Shift }, canExecute: this.canExecute,
            execute: this.newDiagram.bind(this), name: 'New'
        });
        commands.push({
            gesture: { key: Keys.O, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.openDiagram.bind(this), name: 'Open'
        });
        commands.push({
            gesture: { key: Keys.S, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.saveDiagram.bind(this), name: 'Save'
        });
        commands.push({
            gesture: { key: Keys.Plus, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.zoomIn.bind(this), name: 'ZoomIn'
        });
        commands.push({
            gesture: { key: Keys.Minus, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
            execute: this.zoomOut.bind(this), name: 'ZoomOut'
        });
        return commands;
    }

    public static canExecute(): boolean {
        return true;
    }

    public static cloneSelectedItems(): Array<(NodeModel | ConnectorModel)> {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        let selectedItems1: Array<(NodeModel | ConnectorModel)> = diagram.selectedItems.nodes as Array<NodeModel | ConnectorModel>;
        selectedItems1 = selectedItems1.concat(diagram.selectedItems.connectors as ConnectorModel[]);
        return selectedItems1;
    }

    public static duplicateSelectedItems(): void {
        this.selectedItem.selectedDiagram.paste(this.cloneSelectedItems());
    }

    public static cloneSelectedItemswithChildElements(): Array<(NodeModel | ConnectorModel)> {

        return this.cloneChild();
    }
    public static cloneChild(): any {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        let selectedItems1: Array<(NodeModel | ConnectorModel)> = [];
        if (diagram.selectedItems.nodes !== undefined && diagram.selectedItems.nodes.length > 0) {
            const node: Node = diagram.selectedItems.nodes[0] as Node;
            if (node.addInfo) {
                (node.addInfo as { [key: string]: any }).isFirstNode = true;
            } else {
                node.addInfo = { isFirstNode: true };
            }
            selectedItems1.push(node);
            selectedItems1 = this.cloneSubChildSubChild(node, selectedItems1);
        }
        return selectedItems1;
    }

    public static sortCollection(select1: any): any {
        const select: Array<(NodeModel | ConnectorModel)> = [];
        for (let i: number = select1.length - 1; i >= 0; i--) {
            if (select1[i] instanceof Node) {
                select.push(select1[i]);
            }
        }
        for (let i: number = select1.length - 1; i >= 0; i--) {
            if (select1[i] instanceof Connector) {
                select.push(select1[i]);
            }
        }
        return select;
    }

    private static cloneSubChildSubChild(node: Node, select: any): any {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const select1: Array<(NodeModel | ConnectorModel)> = select;
        for (let i: number = node.outEdges.length - 1; i >= 0; i--) {
            const connector: Connector = diagram.getObject(node.outEdges[i]) as Connector;
            const childNode: Node = diagram.getObject(connector.targetID) as Node;
            select1.push(connector);
            select1.push(childNode);
            if (childNode.outEdges.length > 0) {
                this.cloneSubChildSubChild(childNode, select1);
            }
        }
        return this.sortCollection(select1);
    }
    

}