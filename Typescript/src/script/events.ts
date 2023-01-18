import { SelectorViewModel } from './selectedItem';
import {
    IDraggingEventArgs, ISizeChangeEventArgs, IRotationEventArgs,
    ISelectionChangeEventArgs, IDragEnterEventArgs, Diagram, Node, Connector, NodeModel,
    ShapeAnnotationModel, TextAlign, HorizontalAlignment, VerticalAlignment, IHistoryChangeArgs, TextStyleModel,
    PathAnnotationModel, ShapeAnnotation, PathAnnotation, AnnotationAlignment, SelectorModel,
    IScrollChangeEventArgs, DiagramMenuEventArgs, ITextEditEventArgs, UserHandleModel, ConnectorModel, HistoryEntry
} from '@syncfusion/ej2-diagrams';
import { ChangeEventArgs as DropDownChangeEventArgs, MultiSelectChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ChangeEventArgs as NumericChangeEventArgs, ColorPickerEventArgs } from '@syncfusion/ej2-inputs';
import { ChangeEventArgs as CheckBoxChangeEventArgs, ChangeArgs as ButtonChangeArgs } from '@syncfusion/ej2-buttons';
import { ClickEventArgs as ToolbarClickEventArgs } from '@syncfusion/ej2-navigations';
import { MindMapUtilityMethods } from './mindmap';
import { OrgChartUtilityMethods } from './orgchart';
import { TooltipEventArgs } from '@syncfusion/ej2-popups';
import { PageCreation } from "src/script/pages";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PaperSize } from './utilitymethods';

export class DiagramClientSideEvents {

    public page: PageCreation;
    public ddlTextPosition: DropDownListComponent;
    private selectedItem: SelectorViewModel;
    constructor(selectedItem: SelectorViewModel, page: PageCreation) {
        this.selectedItem = selectedItem;
        this.page = page;
    }

    public selectionChange(args: ISelectionChangeEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (this.selectedItem.preventSelectionChange || this.selectedItem.isLoading) {
            return;
        }
        if (args.state === 'Changed') {
            if (this.selectedItem.diagramType === 'MindMap') {
                if (args.newValue.length === 1 && (diagram.selectedItems.nodes as NodeModel[]).length === 1) {
                    const node: Node = args.newValue[0] as Node;
                    (diagram.selectedItems.userHandles as UserHandleModel[])[0].visible = false;
                    (diagram.selectedItems.userHandles as UserHandleModel[])[1].visible = false;
                    (diagram.selectedItems.userHandles as UserHandleModel[])[2].visible = false;
                    if (node.id !== 'textNode' && !(node instanceof Connector)) {
                        const addInfo: { [key: string]: object } = node.addInfo as { [key: string]: object };
                        if (node.id === 'rootNode') {
                            (diagram.selectedItems.userHandles as UserHandleModel[])[0].visible = true;
                            (diagram.selectedItems.userHandles as UserHandleModel[])[1].visible = true;
                        } else if (addInfo.orientation.toString() === 'Left') {
                            (diagram.selectedItems.userHandles as UserHandleModel[])[0].visible = true;
                            (diagram.selectedItems.userHandles as UserHandleModel[])[2].visible = true;
                            (diagram.selectedItems.userHandles as UserHandleModel[])[2].side = 'Left';
                        } else {
                            (diagram.selectedItems.userHandles as UserHandleModel[])[1].visible = true;
                            (diagram.selectedItems.userHandles as UserHandleModel[])[2].visible = true;
                            (diagram.selectedItems.userHandles as UserHandleModel[])[2].side = 'Right';
                        }
                        this.selectedItem.utilityMethods.bindMindMapProperties(node, this.selectedItem);
                    }
                    if (node.addInfo && (node.addInfo as { [key: string]: object }).level !== undefined) {
                        ((this.selectedItem.mindmapSettings.levelType as any).value as string) = 'Level' + (node.addInfo as { [key: string]: object }).level;
                    }
                }
            } else if (this.selectedItem.diagramType === 'OrgChart') {
                if (args.newValue.length === 1) {
                    const node: any = args.newValue[0];
                    (diagram.selectedItems.userHandles as UserHandleModel[])[0].visible = false;
                    (diagram.selectedItems.userHandles as UserHandleModel[])[1].visible = false;
                    (diagram.selectedItems.userHandles as UserHandleModel[])[2].visible = false;
                    if (node.id !== 'textNode' && node instanceof Node) {
                        (diagram.selectedItems.userHandles as UserHandleModel[])[0].visible = true;
                        (diagram.selectedItems.userHandles as UserHandleModel[])[1].visible = true;
                        (diagram.selectedItems.userHandles as UserHandleModel[])[2].visible = true;
                    }
                }
            } else {
                let selectedItems: object[] = this.selectedItem.selectedDiagram.selectedItems.nodes as object[];
                selectedItems = selectedItems.concat(this.selectedItem.selectedDiagram.selectedItems.connectors as ConnectorModel[]);
                this.selectedItem.utilityMethods.enableToolbarItems(selectedItems);
                const nodeContainer: HTMLElement = document.getElementById('nodePropertyContainer') as HTMLElement;
                nodeContainer.classList.remove('multiple');
                nodeContainer.classList.remove('connector');
                if (selectedItems.length > 1) {
                    this.multipleSelectionSettings(selectedItems);
                } else if (selectedItems.length === 1) {
                    this.singleSelectionSettings(selectedItems[0]);
                } else {
                    this.selectedItem.utilityMethods.objectTypeChange('diagram');
                }
            }
        }
    }

    public nodePositionChange(args: IDraggingEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        (this.selectedItem.nodeProperties.offsetX as any).value = (Math.round(args.newValue.offsetX as number * 100) / 100);
        (this.selectedItem.nodeProperties.offsetY as any).value = (Math.round(args.newValue.offsetY as number * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }

    public nodeSizeChange(args: ISizeChangeEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        (this.selectedItem.nodeProperties.width as any).value = (Math.round(args.newValue.width as number * 100) / 100);
        (this.selectedItem.nodeProperties.height as any).value = (Math.round(args.newValue.height as number * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }

    public textEdit(args: ITextEditEventArgs): void {
        if (this.selectedItem.diagramType === 'MindMap') {
            const context: any = this;
            setTimeout(() => { context.selectedItem.selectedDiagram.doLayout(); }, 10);
        }
        this.selectedItem.isModified = true;
    };

    public scrollChange(args: IScrollChangeEventArgs): void {
        this.selectedItem.scrollSettings.currentZoom = (args.newValue.CurrentZoom * 100).toFixed() + '%';
    }

    public nodeRotationChange(args: IRotationEventArgs): void {
        this.selectedItem.preventPropertyChange = true;
        (this.selectedItem.nodeProperties.rotateAngle as any).value = (Math.round(args.newValue.rotateAngle as number * 100) / 100);
        this.selectedItem.preventPropertyChange = false;
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
        }
    }

    public diagramContextMenuClick(args: DiagramMenuEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        this.selectedItem.customContextMenu.updateBpmnShape(diagram, args.item);
        const text: string = args.item.text as string;
        if (text === 'Group' || text === 'Un Group' || text === 'Undo' || text === 'Redo' || text === 'Select All') {
            this.selectedItem.isModified = true;
            if (this.selectedItem.diagramType === 'MindMap' || this.selectedItem.diagramType === 'OrgChart') {
                if (text === 'Undo' || text === 'Redo') {
                    args.cancel = true;
                    if (text === 'Undo') {
                        this.selectedItem.utilityMethods.undoRedoLayout(true, this.selectedItem);
                    } else if (text === 'Redo') {
                        this.selectedItem.utilityMethods.undoRedoLayout(false, this.selectedItem);
                    }
                }
            }
        }
        if (this.selectedItem.diagramType === 'MindMap' || this.selectedItem.diagramType === 'OrgChart') {
            if (text === 'Copy') {
                this.selectedItem.utilityMethods.copyLayout(this.selectedItem);
            } else if (text === 'Cut') {
                args.cancel = true;
                this.selectedItem.utilityMethods.cutLayout(this.selectedItem);
            } else if (text === 'Paste') {
                args.cancel = true;
                this.selectedItem.utilityMethods.pasteLayout(this.selectedItem);
            }
        }
    }



    public dragEnter(args: IDragEnterEventArgs): void {
        const obj: NodeModel = args.element as NodeModel;
        const ratio: number = 100 / (obj.width as number);
        obj.width = 100;
        (obj.height as number) *= ratio;
    }

    public historyChange(args: IHistoryChangeArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const toolbarContainer: HTMLDivElement = document.getElementsByClassName('db-toolbar-container')[0] as HTMLDivElement;
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if ((diagram.historyManager.undoStack as HistoryEntry[]).length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if ((diagram.historyManager.redoStack as HistoryEntry[]).length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
    }

    private multipleSelectionSettings(selectedItems: object[]): void {
        this.selectedItem.utilityMethods.objectTypeChange('None');
        let showConnectorPanel: boolean = false
        let showNodePanel: boolean = false;
        let showTextPanel: boolean = false
        let showConTextPanel: boolean = false;
        const nodeContainer: HTMLElement = document.getElementById('nodePropertyContainer') as HTMLElement;
        for (const item of selectedItems) {
            const object: object = item;
            if (object instanceof Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            } else if (object instanceof Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        const selectItem1: SelectorModel = this.selectedItem.selectedDiagram.selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.selectedItem.utilityMethods.bindNodeProperties((selectItem1.nodes as NodeModel[])[0], this.selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            (document.getElementById('connectorPropertyContainer') as HTMLElement).style.display = '';
            this.selectedItem.utilityMethods.bindConnectorProperties((selectItem1.connectors as ConnectorModel[])[0], this.selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            (document.getElementById('textPropertyContainer') as HTMLElement).style.display = '';
            if (showTextPanel && showConTextPanel) {
                (document.getElementById('textPositionDiv') as HTMLElement).style.display = 'none';
                (document.getElementById('textColorDiv') as HTMLElement).className = 'col-xs-6 db-col-left';
            } else {
                (document.getElementById('textPositionDiv') as HTMLElement).style.display = '';
                (document.getElementById('textColorDiv') as HTMLElement).className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                    // this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                } else {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                    // this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                }
                this.ddlTextPosition.dataBind();
            }
        }
    }

    private singleSelectionSettings(selectedObject: object): void {
        let object: any = null;
        if (selectedObject instanceof Node) {
            this.selectedItem.utilityMethods.objectTypeChange('node');
            object = selectedObject as Node;
            this.selectedItem.utilityMethods.bindNodeProperties(object, this.selectedItem);
        } else if (selectedObject instanceof Connector) {
            this.selectedItem.utilityMethods.objectTypeChange('connector');
            object = selectedObject as Connector;
            this.selectedItem.utilityMethods.bindConnectorProperties(object, this.selectedItem);
        }
        if (object.shape && object.shape.type === 'Text') {
            (document.getElementById('textPropertyContainer') as HTMLElement).style.display = '';
            (document.getElementById('toolbarTextAlignmentDiv') as HTMLElement).style.display = 'none';
            (document.getElementById('textPositionDiv') as HTMLElement).style.display = 'none';
            (document.getElementById('textColorDiv') as HTMLElement).className = 'col-xs-6 db-col-left';
            this.selectedItem.utilityMethods.bindTextProperties(object.style, this.selectedItem);
        } else if (object.annotations.length > 0 && object.annotations[0].content) {
            (document.getElementById('textPropertyContainer') as HTMLElement).style.display = '';
            let annotation: ShapeAnnotation | PathAnnotation;
            (document.getElementById('toolbarTextAlignmentDiv') as HTMLElement).style.display = '';
            (document.getElementById('textPositionDiv') as HTMLElement).style.display = '';
            (document.getElementById('textColorDiv') as HTMLElement).className = 'col-xs-6 db-col-right';
            this.selectedItem.utilityMethods.bindTextProperties(object.annotations[0].style as TextStyleModel, this.selectedItem);
            this.selectedItem.utilityMethods.updateHorVertAlign(object.annotations[0].horizontalAlignment as HorizontalAlignment, object.annotations[0].verticalAlignment as VerticalAlignment);
            if (object.annotations[0] instanceof ShapeAnnotation) {
                annotation = object.annotations[0] as ShapeAnnotation;
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = this.selectedItem.utilityMethods.getPosition(annotation.offset);
                this.ddlTextPosition.dataBind();
            } else if (object.annotations[0] instanceof PathAnnotation) {
                annotation = object.annotations[0] as PathAnnotation;
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = annotation.alignment;
                this.ddlTextPosition.dataBind();
            }
        }
    }


}

export class DiagramPropertyBinding {


    public page: PageCreation;
    private selectedItem: SelectorViewModel;
    constructor(selectedItem: SelectorViewModel, page: PageCreation) {
        this.selectedItem = selectedItem;
        this.page = page;
    }

    public pageBreaksChange(args: CheckBoxChangeEventArgs): void {
        if (args.event) {
            this.selectedItem.pageSettings.pageBreaks = args.checked as boolean;
            this.selectedItem.selectedDiagram.pageSettings.showPageBreaks = args.checked;
        }
    }

    public paperListChange(args: DropDownChangeEventArgs): void {
        if (args.element) {
            const diagram: Diagram = this.selectedItem.selectedDiagram;
            (document.getElementById('pageDimension') as HTMLElement).style.display = 'none';
            (document.getElementById('pageOrientation') as HTMLElement).style.display = '';
            this.selectedItem.pageSettings.paperSize = args.value as string;
            const paperSize: PaperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.pageSettings.paperSize);
            let pageWidth: number = paperSize.pageWidth;
            let pageHeight: number = paperSize.pageHeight;
            if (pageWidth && pageHeight) {
                if (this.selectedItem.pageSettings.isPortrait) {
                    if (pageWidth > pageHeight) {
                        const temp: number = pageWidth;
                        pageWidth = pageHeight;
                        pageHeight = temp;
                    }
                } else {
                    if (pageHeight > pageWidth) {
                        const temp: number = pageHeight;
                        pageHeight = pageWidth;
                        pageWidth = temp;
                    }
                }
                diagram.pageSettings.width = pageWidth;
                diagram.pageSettings.height = pageHeight;
                this.selectedItem.pageSettings.pageWidth = pageWidth;
                this.selectedItem.pageSettings.pageHeight = pageHeight;
                diagram.dataBind();
            } else {
                (document.getElementById('pageOrientation') as HTMLElement).style.display = 'none';
                (document.getElementById('pageDimension') as HTMLElement).style.display = '';
            }
        }
    }

    public pageDimensionChange(args: NumericChangeEventArgs): void {
        if (args.event) {
            let pageWidth: number = Number(this.selectedItem.pageSettings.pageWidth);
            let pageHeight: number = Number(this.selectedItem.pageSettings.pageHeight);
            let target: HTMLInputElement = args.event.target as HTMLInputElement;
            if (target.tagName.toLowerCase() === 'span') {
                target = (target.parentElement as HTMLElement).children[0] as HTMLInputElement;
            }
            const diagram: Diagram = this.selectedItem.selectedDiagram;
            if (target.id === 'pageWidth') {
                pageWidth = Number(target.value);
            } else {
                pageHeight = Number(target.value);
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                } else {
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                }
                this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width = pageWidth;
                this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height = pageHeight;
                diagram.dataBind();
            }
        }
    }

    public pageOrientationChange(args: ButtonChangeArgs): void {
        if (args.event) {
            // const pageWidth: number = Number(this.selectedItem.pageSettings.pageWidth);
            //  const pageHeight: number = Number(this.selectedItem.pageSettings.pageHeight);
            const target: HTMLElement = args.event.target as HTMLElement;
            const diagram: Diagram = this.selectedItem.selectedDiagram;
            switch (target.id) {
                case 'pagePortrait':
                    this.selectedItem.pageSettings.isPortrait = true;
                    this.selectedItem.pageSettings.isLandscape = false;
                    diagram.pageSettings.orientation = 'Portrait';
                    break;
                case 'pageLandscape':
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                    break;
            }
            diagram.dataBind();
            this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width as number;
            this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height as number;
        }
    }

    public pageBackgroundChange1(args: ColorPickerEventArgs): void {
        if (args.currentValue) {
            // const target: HTMLInputElement = args.target as HTMLInputElement; 
            const diagram: Diagram = this.selectedItem.selectedDiagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    }

    public textPositionChange(args: DropDownChangeEventArgs): void {
        if (args.value !== null) {
            this.textPropertyChange('textPosition', args.value);
        }
    }

    public toolbarTextStyleChange(args: ToolbarClickEventArgs): void {
        this.textPropertyChange(args.item.tooltipText as string, false);
    }

    public toolbarTextSubAlignChange(args: ToolbarClickEventArgs): void {
        const propertyName: string = (args.item.tooltipText as string).replace(/[' ']/g, '');
        this.textPropertyChange(propertyName, propertyName);
    }

    public toolbarTextAlignChange(args: ToolbarClickEventArgs): void {
        const propertyName: string = (args.item.tooltipText as string).replace('Align ', '');
        this.textPropertyChange(propertyName, propertyName);
    }

    public textPropertyChange(propertyName: string, propertyValue: any): void {
        if (!this.selectedItem.preventPropertyChange) {
            const diagram: Diagram = this.selectedItem.selectedDiagram;
            let selectedObjects: object[] = diagram.selectedItems.nodes as object[];
            selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors as ConnectorModel[]);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (const item of selectedObjects) {
                    const node: object = item;
                    if (node instanceof Node || node instanceof Connector) {
                        if (node.annotations.length > 0) {
                            for (const value of node.annotations) {
                                let annotation: any = null;
                                if (value instanceof ShapeAnnotation) {
                                    annotation = value as ShapeAnnotationModel;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = this.selectedItem.utilityMethods.getOffset(propertyValue as string);
                                    }
                                } else if (value instanceof PathAnnotation) {
                                    annotation = value as PathAnnotationModel;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = this.selectedItem.textProperties.textPosition as AnnotationAlignment;
                                    }
                                }
                                if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                                    annotation.horizontalAlignment = propertyValue as HorizontalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment as VerticalAlignment);
                                } else if (propertyName === 'top' || propertyName === 'bottom') {
                                    annotation.verticalAlignment = propertyValue as VerticalAlignment;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment as HorizontalAlignment, annotation.verticalAlignment);
                                } else if (propertyName === 'middle') {
                                    annotation.verticalAlignment = 'Center';
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment as HorizontalAlignment, annotation.verticalAlignment);
                                } else {
                                    this.updateTextProperties(propertyName, propertyValue, annotation.style as TextStyleModel);
                                }
                            }
                        } else if (node.shape && node.shape.type === 'Text') {
                            this.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    }

    public updateTextProperties(propertyName: string, propertyValue: object, annotation: TextStyleModel): void {
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
                this.selectedItem.textProperties.textDecoration = !this.selectedItem.textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                this.updateToolbarState('toolbarTextStyle', this.selectedItem.textProperties.textDecoration, 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '') as TextAlign;
                this.selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    }

    private updateToolbarState(toolbarName: string, isSelected: boolean, index: number) {
        let toolbarTextStyle: any = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            const cssClass: string = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
    }
}

export class MindMapPropertyBinding {

    private selectedItem: SelectorViewModel;

    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }

    public mindmapTextStyleChange(args: ToolbarClickEventArgs): void {
        this.updateMindMapTextStyle((args.item.tooltipText as string).toLowerCase(), false);
    }

    public updateMindMapTextStyle(propertyName: string, propertyValue: any): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (diagram.nodes.length > 0) {
            for (const value of diagram.nodes) {
                const node: Node = value as Node;
                if (node.addInfo && node.annotations.length > 0) {
                    const annotation: TextStyleModel = node.annotations[0].style as TextStyleModel;
                    const addInfo: { [key: string]: any } = node.addInfo as { [key: string]: any };
                    const levelType: string = (this.selectedItem.mindmapSettings.levelType as any).value;
                    if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                        switch (propertyName) {
                            case 'bold':
                                annotation.bold = !annotation.bold;
                                break;
                            case 'italic':
                                annotation.italic = !annotation.italic;
                                break;
                            case 'underline':
                                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                                break;
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    }

    public mindmapPatternChange(args: MouseEvent): void {
        const target: HTMLDivElement = args.target as HTMLDivElement;
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        (diagram.historyManager.startGroupAction as () => void)();
        for (const item of this.selectedItem.selectedDiagram.nodes) {
            const node: Node = item as Node;
            if (node.id !== 'textNode') {
                if (target.className === 'mindmap-pattern-style mindmap-pattern1') {
                    if (node.id === 'rootNode') {
                        node.height = 50;
                    } else {
                        node.height = 20;
                    }
                } else {
                    node.height = 50;
                }
            }
            this.selectedItem.selectedDiagram.dataBind();
        }
        for (const value of this.selectedItem.selectedDiagram.connectors) {
            const connector: Connector = value as Connector;
            switch (target.className) {
                case 'mindmap-pattern-style mindmap-pattern1':
                    connector.type = 'Bezier';
                    MindMapUtilityMethods.templateType = 'template1';
                    break;
                case 'mindmap-pattern-style mindmap-pattern2':
                    connector.type = 'Bezier';
                    MindMapUtilityMethods.templateType = 'template4';
                    break;
                case 'mindmap-pattern-style mindmap-pattern3':
                    connector.type = 'Orthogonal';
                    MindMapUtilityMethods.templateType = 'template2';
                    break;
                case 'mindmap-pattern-style mindmap-pattern4':
                    connector.type = 'Straight';
                    MindMapUtilityMethods.templateType = 'template3';
                    break;
            }
            this.selectedItem.selectedDiagram.dataBind();
        }
        (diagram.historyManager.endGroupAction as () => void)();
        this.selectedItem.selectedDiagram.doLayout();
        this.selectedItem.isModified = true;
    }
}

export class OrgChartPropertyBinding {

    private selectedItem: SelectorViewModel;

    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }

    public orgDropDownChange(args: DropDownChangeEventArgs): void {
        if (args.element) {
            const value: string = args.value ? args.value.toString() : '';
            if (args.element.id === 'employeeId') {
                this.selectedItem.orgDataSettings.id = value;
            } else if (args.element.id === 'superVisorId') {
                this.selectedItem.orgDataSettings.parent = value;
            } else if (args.element.id === 'orgNameField') {
                this.selectedItem.orgDataSettings.nameField = value;
            } else if (args.element.id === 'orgImageField') {
                this.selectedItem.orgDataSettings.imageField = value;
            }
        }
    }

    public orgMultiSelectChange(args: MultiSelectChangeEventArgs): void {
        if (args.element) {
            if (args.element.id === 'orgAdditionalField') {
                this.selectedItem.orgDataSettings.additionalFields = args.value as string[];
            } else if (args.element.id === 'orgBindingFields') {
                this.selectedItem.orgDataSettings.bindingFields = args.value as string[];
            }
        }
    }

    public orgChartSpacingChange(args: NumericChangeEventArgs): void {
        if (args.event) {
            let target: HTMLInputElement = args.event.target as HTMLInputElement;
            if (target.tagName.toLowerCase() === 'span') {
                target = (target.parentElement as HTMLElement).children[0] as HTMLInputElement;
            }
            if (target.id === 'orgHorizontalSpacing') {
                this.selectedItem.selectedDiagram.layout.horizontalSpacing = args.value;
            } else {
                this.selectedItem.selectedDiagram.layout.verticalSpacing = args.value;
            }
        }
    }

    public orgChartAligmentChange(args: ToolbarClickEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const commandType: string = (args.item.tooltipText as string).replace(/[' ']/g, '').toLowerCase();
        switch (commandType) {
            case 'alignleft':
                diagram.layout.horizontalAlignment = 'Left';
                break;
            case 'alignright':
                diagram.layout.horizontalAlignment = 'Right';
                break;
            case 'aligncenter':
                diagram.layout.horizontalAlignment = 'Center';
                break;
            case 'aligntop':
                diagram.layout.verticalAlignment = 'Top';
                break;
            case 'alignmiddle':
                diagram.layout.verticalAlignment = 'Center';
                break;
            case 'alignbottom':
                diagram.layout.verticalAlignment = 'Bottom';
                break;
        }
        this.selectedItem.isModified = true;
    }

    public layoutOrientationChange(args: MouseEvent): void {
        const target: HTMLDivElement = args.target as HTMLDivElement;
        switch (target.className) {
            case 'org-pattern-style org-pattern-1 vertical-alternate':
                OrgChartUtilityMethods.subTreeAlignments = 'Alternate';
                OrgChartUtilityMethods.subTreeOrientation = 'Vertical';
                break;
            case 'org-pattern-style org-pattern-2 vertical-left':
                OrgChartUtilityMethods.subTreeAlignments = 'Left';
                OrgChartUtilityMethods.subTreeOrientation = 'Vertical';
                break;
            case 'org-pattern-style org-pattern-3 vertical-right':
                OrgChartUtilityMethods.subTreeAlignments = 'Right';
                OrgChartUtilityMethods.subTreeOrientation = 'Vertical';
                break;
            case 'org-pattern-style org-pattern-4 horizontal-center':
                OrgChartUtilityMethods.subTreeAlignments = 'Center';
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                break;
            case 'org-pattern-style org-pattern-5 horizontal-right':
                OrgChartUtilityMethods.subTreeAlignments = 'Right';
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                break;
            case 'org-pattern-style org-pattern-6 horizontal-left':
                OrgChartUtilityMethods.subTreeAlignments = 'Left';
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                break;
        }
        this.selectedItem.selectedDiagram.doLayout();
        this.selectedItem.isModified = true;
    }

    public layoutPatternChange(args: MouseEvent): void {
        const target: HTMLDivElement = args.target as HTMLDivElement;
        const bindingFields: boolean = target.id === 'orgPattern2' || target.id === 'orgPattern4' ? true : false;
        const imageField: boolean = target.id === 'orgPattern3' || target.id === 'orgPattern4' ? true : false;
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, bindingFields, imageField);
    }

    public getTooltipContent(args: TooltipEventArgs): string {
        if (args.target) {
            if (args.target.classList.contains('db-employee-id')) {
                return 'Defines a unique column from the data source.';
            } else if (args.target.classList.contains('db-supervisor-id')) {
                return 'Defines a column that is used to identify the person to whom the employee reports to.';
            } else if (args.target.classList.contains('db-nameField-id')) {
                return 'Defines a column that has an employee name, and it appears at the top of the shapes.';
            } else if (args.target.classList.contains('db-bindingField-id')) {
                return 'Defines columns that have employees’ contact information, and appear after the employees’ names in the shape.';
            } else if (args.target.classList.contains('db-imageField-id')) {
                return 'Defines a column that has the picture of an employee.';
            } else if (args.target.classList.contains('db-additionalField-id')) {
                return 'Defines columns that should be displayed through a tooltip.';
            }
        }
        return '';
    }
}