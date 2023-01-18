import { Keys, KeyModifiers, Node, Connector } from '@syncfusion/ej2-diagrams';
export class CommonKeyboardCommands {
    static newDiagram() {
        let origin = window.location.origin;
        if (!origin) {
            origin = window.location.protocol + '//'
                + window.location.hostname
                + (window.location.port ? ':' + window.location.port : '');
        }
        window.open(origin + window.location.pathname);
    }
    static openDiagram() {
        this.openUploadBox(true, '.json');
    }
    static saveDiagram() {
        this.download(this.page.savePage(), document.getElementById('diagramName').innerHTML);
    }
    static zoomIn() {
        const diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
    }
    static zoomOut() {
        const diagram = this.selectedItem.selectedDiagram;
        diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
    }
    static download(data, filename) {
        let dataStr = data;
        if (window.navigator) {
            const blob = new Blob([dataStr], { type: 'data:text/json;charset=utf-8,' });
            window.navigator.msSaveOrOpenBlob(blob, filename + '.json');
        }
        else {
            dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = filename + '.json';
            document.body.appendChild(a);
            a.click();
        }
    }
    static openUploadBox(isOpen, extensionType) {
        let defaultUpload = document.getElementById('defaultfileupload');
        defaultUpload = defaultUpload.ej2_instances[0];
        defaultUpload.clearAll();
        this.selectedItem.orgDataSettings.extensionType = defaultUpload.allowedExtensions = extensionType;
        defaultUpload.dataBind();
        this.isOpen = isOpen;
        document.getElementsByClassName('e-file-select-wrap')[0].children[0].click();
    }
    static addCommonCommands(commands) {
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
    static canExecute() {
        return true;
    }
    static cloneSelectedItems() {
        const diagram = this.selectedItem.selectedDiagram;
        let selectedItems1 = diagram.selectedItems.nodes;
        selectedItems1 = selectedItems1.concat(diagram.selectedItems.connectors);
        return selectedItems1;
    }
    static duplicateSelectedItems() {
        this.selectedItem.selectedDiagram.paste(this.cloneSelectedItems());
    }
    static cloneSelectedItemswithChildElements() {
        return this.cloneChild();
    }
    static cloneChild() {
        const diagram = this.selectedItem.selectedDiagram;
        let selectedItems1 = [];
        if (diagram.selectedItems.nodes !== undefined && diagram.selectedItems.nodes.length > 0) {
            const node = diagram.selectedItems.nodes[0];
            if (node.addInfo) {
                node.addInfo.isFirstNode = true;
            }
            else {
                node.addInfo = { isFirstNode: true };
            }
            selectedItems1.push(node);
            selectedItems1 = this.cloneSubChildSubChild(node, selectedItems1);
        }
        return selectedItems1;
    }
    static sortCollection(select1) {
        const select = [];
        for (let i = select1.length - 1; i >= 0; i--) {
            if (select1[i] instanceof Node) {
                select.push(select1[i]);
            }
        }
        for (let i = select1.length - 1; i >= 0; i--) {
            if (select1[i] instanceof Connector) {
                select.push(select1[i]);
            }
        }
        return select;
    }
    static cloneSubChildSubChild(node, select) {
        const diagram = this.selectedItem.selectedDiagram;
        const select1 = select;
        for (let i = node.outEdges.length - 1; i >= 0; i--) {
            const connector = diagram.getObject(node.outEdges[i]);
            const childNode = diagram.getObject(connector.targetID);
            select1.push(connector);
            select1.push(childNode);
            if (childNode.outEdges.length > 0) {
                this.cloneSubChildSubChild(childNode, select1);
            }
        }
        return this.sortCollection(select1);
    }
}