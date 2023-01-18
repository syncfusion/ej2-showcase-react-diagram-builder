/**
 *  Home page handler
 */

import {
    Diagram, CommandManagerModel, Keys, NodeModel, ConnectorModel, Node, Rect,
    Connector, DiagramTools, ShapeAnnotationModel, ConnectorConstraints, SnapConstraints,
    SelectorConstraints, UserHandleModel, KeyModifiers, DiagramConstraints, NodeConstraints, INodeInfo, CommandModel, Container, StrokeStyle, ShapeStyle, StrokeStyleModel
} from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selectedItem';
import { CommonKeyboardCommands } from './commoncommands';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

export class MindMap {

    
    private selectedItem: SelectorViewModel;
    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }
    
    public getCommandSettings(): CommandManagerModel {

        const commandManager: CommandManagerModel = {
            commands: [{
                gesture: { key: Keys.Tab }, canExecute: this.canExecute,
                execute: this.addChild.bind(this), name: 'leftChild'
            },
            {
                gesture: { key: Keys.Tab, keyModifiers: KeyModifiers.Shift }, canExecute: this.canExecute,
                execute: this.addRightChild.bind(this), name: 'rightChild'
            },
            {
                gesture: { key: Keys.Enter }, canExecute: this.canExecute,
                execute: this.addSibilingChildTop.bind(this), name: 'sibilingChildTop'
            },
            {
                gesture: { key: Keys.Enter, keyModifiers: KeyModifiers.Shift }, canExecute: this.canExecute,
                execute: this.addSibilingChildBottom.bind(this), name: 'sibilingChildBottom'
            },
            {
                gesture: { key: Keys.Delete }, canExecute: this.canExecute,
                execute: this.removeChild.bind(this), name: 'deleteChid'
            },
            {
                gesture: { key: Keys.Down }, canExecute: this.canExecute,
                execute: this.navigateBottomChild.bind(this), name: 'navigationDown'
            },
            {
                gesture: { key: Keys.Up }, canExecute: this.canExecute,
                execute: this.navigateTopChild.bind(this), name: 'navigationUp'
            },
            {
                gesture: { key: Keys.Right }, canExecute: this.canExecute,
                execute: this.navigateLeftChild.bind(this), name: 'navigationLeft'
            },
            {
                gesture: { key: Keys.Left }, canExecute: this.canExecute,
                execute: this.navigateRightChild.bind(this), name: 'navigationRight'
            },
            {
                gesture: { key: Keys.Space }, canExecute: this.canExecute,
                execute: this.expandCollapse.bind(this), name: 'expandCollapse'
            },
            {
                gesture: { key: Keys.F2 }, canExecute: this.canExecute,
                execute: this.editNode.bind(this), name: 'editing'
            },
            {
                gesture: { key: Keys.F1 }, canExecute: this.canExecute,
                execute: MindMapUtilityMethods.onHideNodeClick.bind(MindMapUtilityMethods), name: 'showShortCut'
            },
            {
                gesture: { key: Keys.Z, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.undoMindMap.bind(this), name: 'undo'
            },
            {
                gesture: { key: Keys.Y, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.redoMindMap.bind(this), name: 'redo'
            },
            {
                gesture: { key: Keys.X, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.cutMindMap.bind(this), name: 'cutObject'
            },
            {
                gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.copyMindMap.bind(this), name: 'copyObject'
            },
            {
                gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                execute: this.pasteMindMap.bind(this), name: 'pasteObject'
            }
            ]
        };
        commandManager.commands = CommonKeyboardCommands.addCommonCommands(commandManager.commands as CommandModel[]);
        return commandManager;
    }

    public copyMindMap(): void {
        this.selectedItem.utilityMethods.copyLayout(this.selectedItem);
    }
    public pasteMindMap(): void {
        this.selectedItem.utilityMethods.pasteLayout(this.selectedItem);
    }
    public createMindMap(isNew: boolean): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        this.selectedItem.utilityMethods.currentDiagramVisibility('mindmap-diagram', this.selectedItem);
        diagram.updateViewPort();
        if (isNew) {
            diagram.clear();
            diagram.constraints = diagram.constraints & ~DiagramConstraints.UndoRedo;
            const rootNode: NodeModel = MindMapUtilityMethods.createEmptyMindMap();
            diagram.layout = {
                horizontalSpacing: 100,
                verticalSpacing: 50,
                type: 'MindMap',
                getBranch: (node: Node): string => {
                    if (node.addInfo) {
                        const addInfo: { [key: string]: any } = node.addInfo as { [key: string]: any };
                        return addInfo.orientation.toString();
                    }
                    return 'Left';
                },
                root: rootNode.id
            };
            diagram.pageSettings = {};
            diagram.selectedItems = { userHandles: MindMapUtilityMethods.handle, constraints: SelectorConstraints.UserHandle };
            diagram.commandManager = this.getCommandSettings();
            // diagram.tool = DiagramTools.SingleSelect | DiagramTools.ZoomPan;
            diagram.snapSettings.constraints = (diagram.snapSettings.constraints as SnapConstraints) & ~SnapConstraints.ShowLines;
            diagram.constraints = diagram.constraints | DiagramConstraints.UndoRedo;
            diagram.tool = DiagramTools.SingleSelect | DiagramTools.ZoomPan;
            diagram.dataBind();
            this.selectedItem.utilityMethods.bindMindMapProperties(rootNode, this.selectedItem);
        } else {
            this.updateMindMap();
        }
        diagram.contextMenuSettings.show = false;
        diagram.dataBind();
    }
    public updateMindMap(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        diagram.layout = {
            getBranch: (node: Node): string => {
                if (node.addInfo) {
                    const addInfo: { [key: string]: any } = node.addInfo as { [key: string]: any };
                    return addInfo.orientation.toString();
                }
                return 'Left';
            },
        };
        diagram.pageSettings = {};
        diagram.selectedItems = { userHandles: MindMapUtilityMethods.handle, constraints: SelectorConstraints.UserHandle };
        diagram.commandManager = this.getCommandSettings();
        diagram.tool = DiagramTools.SingleSelect | DiagramTools.ZoomPan;
    }
    public getShortCutKeys(shortcutKeys: Array<{ [key: string]: any }>): ShapeAnnotationModel[] {
        const annotations: ShapeAnnotationModel[] = [];
        let y: number = 0.1;
        for (const key of  shortcutKeys) {
            const annotation: ShapeAnnotationModel = {
                content: key.key.toString() + ': ' + key.value.toString(), offset: { "x": 0.1, "y": y }, visibility: true,
                style: { color: 'white' }, horizontalAlignment: 'Left', verticalAlignment: 'Bottom'
            }
            annotations.push(annotation);
            y += 0.1;
        }
        return annotations;
    }

    private canExecute(): boolean {
        return true;
    }

    private undoMindMap(): void {
        this.selectedItem.utilityMethods.undoRedoLayout(true, this.selectedItem);
    }

    private redoMindMap(): void {
        this.selectedItem.utilityMethods.undoRedoLayout(false, this.selectedItem);
    }

    private cutMindMap(): void {
        this.selectedItem.utilityMethods.cutLayout(this.selectedItem);
    }
  

    private addChild(args: { [key: string]: any }): void {
        MindMapUtilityMethods.addNode('Left');
    }

    private addRightChild(args: { [key: string]: any }): void {
        MindMapUtilityMethods.addNode('Right');
    }

    private addSibilingChildTop(): void {
        MindMapUtilityMethods.addSibilingChild('Top');
    }

    private addSibilingChildBottom(): void {
        MindMapUtilityMethods.addSibilingChild('Bottom');
    }

    private removeChild(args: { [key: string]: any }): void {
        this.selectedItem.utilityMethods.removeChild(this.selectedItem);
    }

    private navigateLeftChild(args: any): void {
        this.navigateChild('left');
    }

    private navigateRightChild(): void {
        this.navigateChild('right');
    }

    private navigateTopChild(): void {
        this.navigateChild('top');
    }

    private navigateBottomChild(): void {
        this.navigateChild('bottom');
    }

    private expandCollapse(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if ((diagram.selectedItems.nodes as NodeModel[]).length > 0) {
            const node: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
            node.isExpanded = !node.isExpanded;
            diagram.dataBind();
        }
    }

    private editNode(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if ((diagram.selectedItems.nodes as NodeModel[]).length > 0) {
            const node: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
            diagram.startTextEdit(node, node.annotations[0].id);
            this.selectedItem.isModified = true;
        }
    }

    private navigateChild(direction: string): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        let node: Node;
        if (direction === 'top' || direction === 'bottom') {
            const sameLevelNodes: Node[] = this.getSameLevelNodes();
            const index: number = sameLevelNodes.indexOf((diagram.selectedItems.nodes as NodeModel[])[0] as Node);
            node = direction === 'top' ? sameLevelNodes[index - 1] : sameLevelNodes[index + 1];
        } else {
            node = this.getMinDistanceNode(diagram, direction);
        }
        if (node) {
            diagram.clearSelection();
            diagram.select([node]);
            diagram.bringIntoView(node.wrapper.bounds);
        }
    }

    private getSameLevelNodes(): Node[] {
        const sameLevelNodes: Node[] = [];
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if ((diagram.selectedItems.nodes as NodeModel[]).length > 0) {
            const node: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
            const orientation: string = (node.addInfo as { [key: string]: any }).orientation.toString();
            let connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]) as Connector;
            const parentNode: Node = MindMapUtilityMethods.getNode(diagram.nodes, connector.sourceID) as Node;
            for (const item of  parentNode.outEdges) {
                connector = MindMapUtilityMethods.getConnector(diagram.connectors, item) as Connector;
                const childNode: Node = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID) as Node;
                if (childNode) {
                    const childOrientation: string = (childNode.addInfo as { [key: string]: any }).orientation.toString();
                    if (orientation === childOrientation) {
                        sameLevelNodes.push(childNode);
                    }
                }
            }
        }
        return sameLevelNodes;
    }

    private getMinDistanceNode(diagram: Diagram, direction: string): Node {
        const node: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
        const parentBounds: Rect = node.wrapper.bounds;
        let childBounds: Rect;
        let oldChildBoundsTop: number = 0;
        let childNode: Node;
        let lastChildNode: any = null;
        let leftOrientationFirstChild: any = null;;
        let rightOrientationFirstChild: any = null;
        if (node.id === 'rootNode') {
            const edges: string[] = node.outEdges;
            for (const value of  edges) {
                const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, value) as Connector;
                childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID) as Node;
                const addInfo: { [key: string]: any } = childNode.addInfo as { [key: string]: any };
                if (addInfo.orientation.toString().toLowerCase() === direction) {
                    if (direction === 'left' && leftOrientationFirstChild === null) {
                        leftOrientationFirstChild = childNode;
                    }
                    if (direction === 'right' && rightOrientationFirstChild === null) {
                        rightOrientationFirstChild = childNode;
                    }
                    childBounds = childNode.wrapper.bounds;
                    if (parentBounds.top >= childBounds.top && (childBounds.top >= oldChildBoundsTop || oldChildBoundsTop === 0)) {
                        oldChildBoundsTop = childBounds.top;
                        lastChildNode = childNode;
                    }
                }
            }
            if (!lastChildNode) {
                lastChildNode = direction === 'left' ? leftOrientationFirstChild : rightOrientationFirstChild;
            }

        } else {
            let edges: string[] = [];
            let selecttype: string = '';
            const orientation: string = (node.addInfo as { [key: string]: any }).orientation.toString();
            if (orientation.toLowerCase() === 'left') {
                edges = direction === 'left' ? node.outEdges : node.inEdges;
                selecttype = direction === 'left' ? 'target' : 'source';
            } else {
                edges = direction === 'right' ? node.outEdges : node.inEdges;
                selecttype = direction === 'right' ? 'target' : 'source';
            }
            for (const item of  edges) {
                const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, item) as Connector;
                childNode = MindMapUtilityMethods.getNode(diagram.nodes, selecttype === 'target' ? connector.targetID : connector.sourceID) as Node;
                if (childNode.id === 'rootNode') {
                    lastChildNode = childNode;
                    break;
                } else {
                    childBounds = childNode.wrapper.bounds;
                    if (selecttype === 'target') {
                        if (parentBounds.top >= childBounds.top && (childBounds.top >= oldChildBoundsTop || oldChildBoundsTop === 0)) {
                            oldChildBoundsTop = childBounds.top;
                            lastChildNode = childNode;
                        }
                    } else {
                        lastChildNode = childNode;
                    }
                }
            }
        }
        return lastChildNode;
    }

  
}

export abstract class MindMapUtilityMethods {
    public static selectedItem: SelectorViewModel; 

    public static templateType: string;
    
    public static shortCutkeys: Array<{ [key: string]: any }> = [
        { 'key': 'Tab', 'value': 'Add a subtopic to left side' },
        { 'key': 'Shift + Tab', 'value': 'Add a subtopic to right side' },
        { 'key': 'Enter', 'value': 'Add a sibling subtopic to top' },
        { 'key': 'Shift + Enter', 'value': 'Add a sibling subtopic to bottom' },
        { 'key': 'Delete', 'value': 'Delete a topic' },
        { 'key': 'Spacebar', 'value': 'Expand/Collapse a topic' },
        { 'key': 'F2', 'value': 'Edit a topic' },
        { 'key': 'Esc', 'value': 'End a text editing' },
        { 'key': 'Arrow(Up, Down, Left, Right)', 'value': 'Navigate between topics' },
    ];

    public static handle: UserHandleModel[] = [
        {
            name: 'leftHandle', pathColor: 'white', backgroundColor: '#7d7d7d', borderColor: 'white',
            pathData: 'M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z',
            side: 'Right', offset: 0.5, horizontalAlignment: 'Center', verticalAlignment: 'Center',
        },
        {
            name: 'rightHandle', pathColor: 'white', backgroundColor: '#7d7d7d', borderColor: 'white',
            pathData: 'M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z',
            visible: true, offset: 0.5, side: 'Left', horizontalAlignment: 'Center', verticalAlignment: 'Center'
        }, {
            name: 'removeHandle', pathColor: 'white', backgroundColor: '#7d7d7d', borderColor: 'white',
            pathData: 'M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76 96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04 91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z',
            side: 'Bottom', offset: 0.5, horizontalAlignment: 'Center', verticalAlignment: 'Center'
        }
    ];
    public static mindmapPaste(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const selectedNode: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
        let selectedelement: Node;
        let mindmapData: { [key: string]: any };
        let selecteditemOrientation: string;
        if (this.selectedItem.pasteData.length > 0) {
            diagram.startGroupAction();
            diagram.paste(this.selectedItem.pasteData);
            if (selectedNode.id !== 'rootNode') {
                selecteditemOrientation = (selectedNode.addInfo as { [key: string]: any }).orientation.toString();
            } else {
                selecteditemOrientation = (this.selectedItem.pastedFirstItem.addInfo as { [key: string]: any }).orientation.toString();
            }
            selectedelement = this.selectedItem.pastedFirstItem;
            mindmapData = MindMapUtilityMethods.getMindMapShape(selectedNode);
            const connector: ConnectorModel = MindMapUtilityMethods.setConnectorDefault(diagram, selecteditemOrientation, mindmapData.connector, selectedNode.id, selectedelement.id);
            diagram.add(connector);

            let selectedNodeLevel: number;
            selectedNodeLevel = (selectedNode.addInfo as INodeInfo).level as number;
            this.updateLevel(selectedelement, selectedNodeLevel, selecteditemOrientation);
            diagram.clearSelection();
            this.selectedItem.preventPropertyChange = true;
            diagram.select([selectedelement]);
            this.selectedItem.preventPropertyChange = false;
            diagram.doLayout();
            diagram.endGroupAction();
            diagram.bringIntoView((diagram.nodes[diagram.nodes.length - 1].wrapper as Container).bounds);
        }
    }

    public static addMindMapLevels(level: string): void {
        const mindmap: any = document.getElementById('mindMapLevels') as HTMLElement;
        const dropdownlist: DropDownList = mindmap.ej2_instances[0];
        const dropdowndatasource: any = dropdownlist.dataSource as Array<{ [key: string]: any }>;
        let isExist: boolean = false;
        for (const item of   dropdowndatasource) {
            const data: { [key: string]: any } = item;
            if (data.text === level) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            dropdowndatasource.push({ text: level, value: level });
        }
        dropdownlist.dataSource = dropdowndatasource;
        dropdownlist.dataBind();
    }

   

    public static createEmptyMindMap(): NodeModel {
        const node: NodeModel = {
            id: 'rootNode', width: 150, minHeight: 50,
            annotations: [{ content: 'MindMap', style: { color: '#000000' } }],
            shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 5 },
            ports: [{ id: 'leftPort', offset: { x: 0, y: 0.5 } }, { id: 'rightPort', offset: { x: 1, y: 0.5 } }],
            addInfo: { level: 0 }, style: { fill: '#D0ECFF', strokeColor: '#80BFEA', strokeWidth: 1 },
            constraints: NodeConstraints.Default & ~NodeConstraints.Delete
        };
        this.selectedItem.selectedDiagram.add(node);
        const node1: NodeModel = {
            id: 'textNode', width: 400, height: 280, offsetX: this.selectedItem.selectedDiagram.scrollSettings.viewPortWidth as number - 200, offsetY: 140,
            shape: { type: 'HTML', content: this.getShortCutString() }, style: { strokeWidth: 0 },
            excludeFromLayout: true,
            constraints: NodeConstraints.Default & ~NodeConstraints.Delete
        };
        this.selectedItem.selectedDiagram.add(node1);
        ((document.getElementById('diagram') as HTMLElement).querySelector('#closeIconDiv') as HTMLElement).onclick = this.onHideNodeClick.bind(this);
        return this.selectedItem.selectedDiagram.getObject('rootNode');
    }

    public static onHideNodeClick(): void {
        const node1: NodeModel = MindMapUtilityMethods.getNode(this.selectedItem.selectedDiagram.nodes, 'textNode') as Node;
        node1.visible = !node1.visible;
        this.selectedItem.selectedDiagram.dataBind();
    }

    public static getShortCutString(): string {
        return '<div style="width: 400px; height: 280px; padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">' +
            '<div id="closeIconDiv" style="float: right; width: 22px; height: 22px; border: 1px solid #FFF7B5">' +
            '<span class="sf-icon-Close" style="font-size:14px;cursor:pointer;"></span>' +
            '</div>' +
            '<div>' +
            '<span class="db-html-font-medium">Quick shortcuts</span>' +
            '</div>' +
            '<div style="padding-top:10px">' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">Tab : </span>' +
            '<span class="db-html-font-normal">Add a subtopic to the left</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div>' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">Shift + Tab : </span>' +
            '<span class="db-html-font-normal">Add a subtopic to the right</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div>' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">Enter : </span>' +
            '<span class="db-html-font-normal">Add a sibling subtopic to the top</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            // '<div>' +
            // '<ul>' +
            // '<li>' +
            // '<span class="db-html-font-medium">Shift + Enter - </span>' +
            // '<span class="db-html-font-normal">Add a sibling subtopic to bottom</span>' +
            // '</li>' +
            // '</ul>' +
            // '</div>' +
            '<div>' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">Delete : </span>' +
            '<span class="db-html-font-normal">Delete a topic</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div>' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">F2 : </span>' +
            '<span class="db-html-font-normal">Edit a topic</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div>' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">Esc : </span>' +
            '<span class="db-html-font-normal">End text editing</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div>' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">Arrow(Up, Down, Left, Right) : </span>' +
            '<span class="db-html-font-normal">Navigate between topics</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div>' +
            '<ul>' +
            '<li>' +
            '<span class="db-html-font-medium">F1 : </span>' +
            '<span class="db-html-font-normal">Show/Hide shortcut Key</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>';
    }

    public static getMindMapShape(parentNode: NodeModel): { [key: string]: any } {
        const sss: { [key: string]: any } = {};
        let node: NodeModel = {};
        let connector: ConnectorModel = {};
        const addInfo: { [key: string]: any } = parentNode.addInfo as { [key: string]: any };
        if (this.templateType === 'template1') {
            const annotations: ShapeAnnotationModel = {
                // verticalAlignment: 'Bottom', offset: { x: 0.5, y: 0 },
                content: ''
            };
            node = {
                minWidth: 100, maxWidth: 100, minHeight: 20, shape: { type: 'Basic', shape: 'Rectangle' },
                annotations: [annotations], style: { fill: '#000000', strokeColor: '#000000' },
                addInfo: { level: (addInfo.level as number) + 1 },
                offsetX: 200, offsetY: 200
            };
            connector = { type: 'Bezier', style: { strokeWidth: 3 } };
        } else {
            node = {
                minWidth: 100, maxWidth: 100, minHeight: 50, shape: { type: 'Basic', shape: 'Rectangle' },
                annotations: [{ content: '' }],
                style: { fill: '#000000', strokeColor: '#000000' },
                addInfo: { level: (addInfo.level as number) + 1 },
                offsetX: 200, offsetY: 200
            };
            if (this.templateType === 'template2') {
                connector = { type: 'Orthogonal', style: { strokeColor: '#000000' } };
            } else if (this.templateType === 'template3') {
                connector = { type: 'Straight', style: { strokeColor: '#000000' } };
            } else {
                connector = { type: 'Bezier', style: { strokeColor: '#000000' } };
            }
        }
        if (addInfo.level < 1) {
            (node.style as ShapeStyle).fill = this.selectedItem.utilityMethods.fillColorCode[this.lastFillIndex];
            (node.style as ShapeStyle).strokeColor = this.selectedItem.utilityMethods.borderColorCode[this.lastFillIndex];;
            if (this.lastFillIndex + 1 >= this.selectedItem.utilityMethods.fillColorCode.length) {
                this.lastFillIndex = 0;
            } else {
                this.lastFillIndex++;
            }
        } else {
            (node.style as ShapeStyle).strokeColor = (node.style as ShapeStyle).fill = (parentNode.style as ShapeStyle).fill;
        }
        (connector.style as StrokeStyleModel).strokeColor = (node.style as ShapeStyle).fill;
        connector.targetDecorator = { shape: 'None' };
        connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select | ConnectorConstraints.Delete;
        node.constraints = NodeConstraints.Default & ~NodeConstraints.Drag;
        node.ports = [{ id: 'leftPort', offset: { x: 0, y: 0.5 } }, { id: 'rightPort', offset: { x: 1, y: 0.5 } }];
        sss.node = node;
        sss.connector = connector;
        return sss;
    }

    public static addNode(orientation: string): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const selectedNode: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
        if (selectedNode.id !== 'rootNode') {
            const selectedNodeOrientation: string = (selectedNode.addInfo as { [key: string]: any }).orientation.toString();
            orientation = selectedNodeOrientation;
        }
        diagram.startGroupAction();
        const mindmapData: { [key: string]: any } = this.getMindMapShape(selectedNode);
        const node: NodeModel = mindmapData.node;
        this.addMindMapLevels('Level' + (node.addInfo as { [key: string]: any }).level);
        node.id = 'node' + this.selectedItem.randomIdGenerator();
        if (node.addInfo) {
            (node.addInfo as { [key: string]: any }).orientation = orientation;
        } else {
            node.addInfo = { 'orientation': orientation };
        }
        diagram.add(node);
        const connector: ConnectorModel = this.setConnectorDefault(diagram, orientation, mindmapData.connector, selectedNode.id, node.id);
        diagram.add(connector);
        const node1: NodeModel = this.getNode(diagram.nodes, node.id) as Node;
        diagram.doLayout();
        diagram.endGroupAction();
        this.selectedItem.preventPropertyChange = true;
        diagram.select([node1]);
        this.selectedItem.preventPropertyChange = false;
        diagram.dataBind();
        diagram.bringIntoView((node1.wrapper as Container).bounds);
        diagram.startTextEdit(node1, (node1.annotations as ShapeAnnotationModel[])[0].id);
        this.selectedItem.isModified = true;
    }

    public static addSibilingChild(position: string): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const selectedNode: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
        if (selectedNode.id !== 'rootNode') {
            const selectedNodeOrientation: string = (selectedNode.addInfo as { [key: string]: any }).orientation.toString();
            const orientation: string = selectedNodeOrientation;

            const connector1: Connector = this.getConnector(diagram.connectors, selectedNode.inEdges[0]) as Connector;
            diagram.startGroupAction();
            const mindmapData: { [key: string]: any } = this.getMindMapShape(this.getNode(diagram.nodes, connector1.sourceID));
            const node: NodeModel = mindmapData.node;
            node.id = 'node' + this.selectedItem.randomIdGenerator();
            if (node.addInfo) {
                (node.addInfo as { [key: string]: any }).orientation = orientation;
            } else {
                node.addInfo = { 'orientation': orientation };
            }
            diagram.add(node);

            const connector: ConnectorModel =
                this.setConnectorDefault(diagram, orientation, mindmapData.connector, connector1.sourceID, node.id);
            diagram.add(connector);
            const node1: NodeModel = this.getNode(diagram.nodes, node.id) as NodeModel;
            diagram.doLayout();
            diagram.endGroupAction();
            this.selectedItem.preventPropertyChange = true;
            diagram.select([node1]);
            this.selectedItem.preventPropertyChange = false;
            diagram.bringIntoView((node1.wrapper as Container).bounds);
            diagram.startTextEdit(node1, (node1.annotations as ShapeAnnotationModel[])[0].id);
            this.selectedItem.isModified = true;
        }
    }

    public static getConnector(connectors: ConnectorModel[], name: string) {
        const connector: any = null;
        for (const value of  connectors) {
            if (value.id === name) {
                return value as Connector;
            }
        }
        return connector;
    }

    public static getNode(nodes: NodeModel[], name: string) {
        const node: any = null;
        for (const value of  nodes) {
            if (value.id === name) {
                return value as Node;
            }
        }
        return node;
    }

    public static
        setConnectorDefault(diagram: Diagram, orientation: string, connector: ConnectorModel, sourceID: string, targetID: string):
        ConnectorModel {
        connector.id = 'connector' + this.selectedItem.randomIdGenerator();
        connector.sourceID = sourceID;
        connector.targetID = targetID;
        connector.sourcePortID = 'rightPort';
        connector.targetPortID = 'leftPort';
        if (orientation === 'Right') {
            connector.sourcePortID = 'leftPort';
            connector.targetPortID = 'rightPort';
        }
        (connector.style as StrokeStyle).strokeWidth = 3;
        return connector;
    }
    private static lastFillIndex: number = 0;
    
    private static updateLevel(parentNode: Node, level: number, orientation: string): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const lastNode: Node = parentNode;
        let level1: string;
        (parentNode.addInfo as INodeInfo).level = level + 1;
        level1 = 'Level' + (parentNode.addInfo as INodeInfo).level;
        this.addMindMapLevels(level1);

        (parentNode.addInfo as { [key: string]: any }).orientation = orientation;
        for (let i: number = parentNode.outEdges.length - 1; i >= 0; i--) {
            const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, lastNode.outEdges[i]) as Connector;
            const childNode: Node = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID) as Node;
            (childNode.addInfo as { [key: string]: any }).orientation = orientation;
            connector.sourcePortID = 'rightPort';
            connector.targetPortID = 'leftPort';
            if (orientation === 'Right') {
                connector.sourcePortID = 'leftPort';
                connector.targetPortID = 'rightPort';
            }
            if (childNode.outEdges.length > 0) {
                this.updateLevel(childNode, (parentNode.addInfo as INodeInfo).level as number, orientation);
            } else {
                (childNode.addInfo as INodeInfo).level = (parentNode.addInfo as INodeInfo).level as number + 1;
                level1 = 'Level' + (childNode.addInfo as INodeInfo).level;
                this.addMindMapLevels(level1);
            }
        }

        diagram.dataBind();
    }
  

}