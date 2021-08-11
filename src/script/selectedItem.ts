/**
 * Selector Handler
 */
import {
    Diagram, NodeModel, Node, NodeConstraints,
    ConnectorModel, Connector, Segments, DecoratorShapes, ConnectorConstraints, TextStyleModel, ShapeStyleModel, Gradient
} from '@syncfusion/ej2-diagrams';
import { UtilityMethods } from './utilitymethods';
import { CustomContextMenuItems } from './customcontextmenuitems';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { MindMapUtilityMethods } from './mindmap';
import { NodeProperties, TextProperties, ConnectorProperties, ExportSettings, PrintSettings } from 'src/script/selector'

/* tslint:disable: name-of-rule-to-disable */






export class PageSettings {
    public pageWidth: number = 1056;
    public pageHeight: number = 816;
    public showPageBreaks: boolean;
    public backgroundColor: string = '#ffffff';
    public isPortrait: boolean = false;
    public isLandscape: boolean = true;
    public paperSize: string = 'Letter';
    public pageBreaks: boolean = false;
}

export class ScrollSettings {
    public currentZoom: string = '100%';
}

export class MindMapSettings {
    public opacityText: string = '100%';
    public textOpacityText: string;

    public propertyChange: () => {};
    private mLevelType: string = 'Level0';
    private mFill: string = 'white';
    private mStroke: string = 'white';
    private mStrokeStyle: string = 'None';
    private mStrokeWidth: number = 1;
    private mOpacity: number;
    private mFontFamily: string = 'Arial';
    private mFontSize: number = 12;
    private mFontColor: string = '#ffffff';
    private mTextOpacity: number;

    public get levelType(): string {
        return this.mLevelType;
    }


    public set levelType(levelType: string) {
        if (this.mLevelType !== levelType) {
            this.mLevelType = levelType;
            this.triggerPropertyChange('levelType', levelType);
        }
    }


    public get fill(): string {
        return this.mFill;
    }


    public set fill(fill: string) {
        if (this.mFill !== fill) {
            this.mFill = fill;
            this.triggerPropertyChange('fill', fill);
        }
    }


    public get stroke(): string {
        return this.mStroke;
    }


    public set stroke(stroke: string) {
        if (this.mStroke !== stroke) {
            this.mStroke = stroke;
            this.triggerPropertyChange('stroke', stroke);
        }
    }


    public get strokeStyle(): string {
        return this.mStrokeStyle;
    }


    public set strokeStyle(strokeStyle: string) {
        if (this.mStrokeStyle !== strokeStyle) {
            this.mStrokeStyle = strokeStyle;
            this.triggerPropertyChange('strokeStyle', strokeStyle);
        }
    }


    public get strokeWidth(): number {
        return this.mStrokeWidth;
    }


    public set strokeWidth(strokeWidth: number) {
        if (this.mStrokeWidth !== strokeWidth) {
            this.mStrokeWidth = strokeWidth;
            this.triggerPropertyChange('strokeWidth', strokeWidth);
        }
    }


    public get opacity(): number {
        return this.mOpacity;
    }

    public set opacity(opacity: number) {
        if (this.mOpacity !== opacity) {
            this.mOpacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }



    public get fontFamily(): string {
        return this.mFontFamily;
    }


    public set fontFamily(fontFamily: string) {
        if (this.mFontFamily !== fontFamily) {
            this.mFontFamily = fontFamily;
            this.triggerPropertyChange('fontFamily', fontFamily);
        }
    }


    public get fontSize(): number {
        return this.mFontSize;
    }


    public set fontSize(fontSize: number) {
        if (this.mFontSize !== fontSize) {
            this.mFontSize = fontSize;
            this.triggerPropertyChange('fontSize', fontSize);
        }
    }


    public get fontColor(): string {
        return this.mFontColor;
    }


    public set fontColor(fontColor: string) {
        if (this.mFontColor !== fontColor) {
            this.mFontColor = fontColor;
            this.triggerPropertyChange('fontColor', fontColor);
        }
    }


    public get textOpacity(): number {
        return this.mTextOpacity;
    }


    public set textOpacity(textOpacity: number) {
        if (this.mTextOpacity !== textOpacity) {
            this.mTextOpacity = textOpacity;
            this.triggerPropertyChange('textOpacity', textOpacity);
        }
    }



    public triggerPropertyChange(propName: string, propValue: any): void {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { "propertyName": propName, "propertyValue": propValue });
        }
    }
}

export class OrgDataSettings {
    public dataSourceColumns: Array<{ [key: string]: any }> = [];
    public id: string = '';
    public parent: string = '';
    public nameField: string = '';
    public bindingFields: string[] = [];
    public imageField: string = '';
    public additionalFields: string[] = [];
    public fileformat: string = '';
    public extensionType: string = '.csv';
    public buttonContent: string = 'Download Example CSV';
}

export class SelectorViewModel {


    public selectedDiagram: Diagram;
    public isCopyLayoutElement: boolean = false;
    public themeStyle: string;
    public pastedFirstItem: Node;
    public currentDiagramName: string = '';
    public preventPropertyChange: boolean = false;
    public diagramType: string;
    public isModified: boolean = false;
    public uniqueId: string;
    public preventSelectionChange: boolean = false;
    public pasteData: any[] = [];
    public isLoading: boolean = false;
    public isTemplateLoad: boolean = false;

    public nodeProperties: NodeProperties = new NodeProperties();
    public textProperties: TextProperties = new TextProperties();
    public connectorProperties: ConnectorProperties = new ConnectorProperties();
    public exportSettings: ExportSettings = new ExportSettings();
    public printSettings: PrintSettings = new PrintSettings();
    public pageSettings: PageSettings = new PageSettings();
    public utilityMethods: UtilityMethods = new UtilityMethods();
    public mindmapSettings: MindMapSettings = new MindMapSettings();
    public orgDataSettings: OrgDataSettings = new OrgDataSettings();
    public scrollSettings: ScrollSettings = new ScrollSettings();
    public customContextMenu: CustomContextMenuItems = new CustomContextMenuItems();

    constructor() {
        this.nodeProperties.propertyChange = this.nodePropertyChange.bind(this);
        this.connectorProperties.propertyChange = this.connectorPropertyChange.bind(this);
        this.textProperties.propertyChange = this.textPropertyChange.bind(this);
        this.mindmapSettings.propertyChange = this.mindMapPropertyChange.bind(this);
    }
    public randomIdGenerator() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }

    public getAbsolutePath() {
        return window.location.pathname;
    }



    public nodePropertyChange(args: { [key: string]: any }): void {
        if (!this.preventPropertyChange) {
            const diagram: Diagram = this.selectedDiagram;
            if (diagram) {
                if ((diagram.selectedItems.nodes as NodeModel[]).length > 0) {
                    const selectedNodes: NodeModel[] = this.selectedDiagram.selectedItems.nodes as NodeModel[];
                    for (const value of selectedNodes) {
                        const node: Node = value as Node;
                        const propertyName1: string = args.propertyName.toString().toLowerCase();
                        switch (propertyName1) {
                            case 'offsetx':
                                node.offsetX = (this.nodeProperties.offsetX as any).value;
                                break;
                            case 'offsety':
                                node.offsetY = (this.nodeProperties.offsetY as any).value;
                                break;
                            case 'width':
                                node.width = (this.nodeProperties.width as any).value;
                                break;
                            case 'height':
                                node.height = (this.nodeProperties.height as any).value;
                                break;
                            case 'rotateangle':
                                node.rotateAngle = (this.nodeProperties.rotateAngle as any).value;
                                break;
                            case 'aspectratio':
                                node.constraints = node.constraints ^ NodeConstraints.AspectRatio;
                                break;
                        }
                        if (!node.children) {
                            this.applyNodeStyle(propertyName1, node, args.propertyValue);
                        } else {
                            for (const value1 of node.children) {
                                this.applyNodeStyle(propertyName1, diagram.getObject(value1) as Node, args.propertyValue);
                            }
                        }
                    }
                    this.isModified = true;
                }
                if (diagram.connectors.length > 0) {
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'strokecolor':
                            this.connectorProperties.lineColor = this.getColor(this.nodeProperties.strokeColor);
                            break;
                        case 'strokewidth':
                            this.connectorProperties.lineWidth = this.nodeProperties.strokeWidth;
                            break;
                        case 'strokestyle':
                            this.connectorProperties.lineStyle = this.nodeProperties.strokeStyle;
                            break;
                        case 'opacity':
                            this.connectorProperties.opacity = this.nodeProperties.opacity;
                            break;
                    }

                    this.isModified = true;
                }
                diagram.dataBind();
            }
        }
    }


    public connectorPropertyChange(args: { [key: string]: any }): void {
        if (!this.preventPropertyChange) {
            const diagram: Diagram = this.selectedDiagram;
            if (diagram && (diagram.selectedItems.connectors as ConnectorModel[]).length > 0) {
                const selectedNodes: ConnectorModel[] = diagram.selectedItems.connectors as ConnectorModel[];
                for (const value of selectedNodes) {
                    const connector: Connector = value as Connector;
                    switch (args.propertyName.toString().toLowerCase()) {
                        case 'linecolor':
                            connector.style.strokeColor = this.getColor((this.connectorProperties.lineColor as any).value);
                            connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                            break;
                        case 'linewidth':
                            connector.style.strokeWidth = (this.connectorProperties.lineWidth as any).value;
                            if (connector.sourceDecorator.style) {
                                connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                            } else {
                                connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            if (connector.targetDecorator.style) {
                                connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                            } else {
                                connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                            }
                            break;
                        case 'linestyle':
                            connector.style.strokeDashArray = (this.connectorProperties.lineStyle as any).value;
                            break;
                        case 'linetype':
                            connector.type = (this.connectorProperties.lineType as any).value as Segments;
                            break;
                        case 'sourcetype':
                            connector.sourceDecorator.shape = (this.connectorProperties.sourceType as any).value as DecoratorShapes;
                            break;
                        case 'targettype':
                            connector.targetDecorator.shape = (this.connectorProperties.targetType as any).value as DecoratorShapes;
                            break;
                        case 'sourcesize':
                            connector.sourceDecorator.width = connector.sourceDecorator.height = (this.connectorProperties.sourceSize as any).value;
                            break;
                        case 'targetsize':
                            connector.targetDecorator.width = connector.targetDecorator.height = (this.connectorProperties.targetSize as any).value;
                            break;
                        case 'opacity':
                            connector.style.opacity = (this.connectorProperties.opacity as any).value / 100;
                            (connector.targetDecorator.style as ShapeStyleModel).opacity = connector.style.opacity;
                            (connector.sourceDecorator.style as ShapeStyleModel).opacity = connector.style.opacity;
                            (document.getElementById('connectorOpacitySliderText') as any).value = (this.connectorProperties.opacity as any).value + '%';
                            break;
                        case 'linejump':
                            if ((this.connectorProperties.lineJump as any).value) {
                                connector.constraints = connector.constraints | ConnectorConstraints.Bridging;
                            } else {
                                connector.constraints = connector.constraints & ~ConnectorConstraints.Bridging;
                            }
                            break;
                        case 'linejumpsize':
                            connector.bridgeSpace = (this.connectorProperties.lineJumpSize as any).value;
                            break;
                    }
                }
                diagram.dataBind();
                this.isModified = true;
            }
        }
    }

    public textPropertyChange(args: { [key: string]: any }): void {
        if (!this.preventPropertyChange) {
            const diagram: Diagram = this.selectedDiagram;
            if (diagram) {
                let selectedanys: any[] = diagram.selectedItems.nodes as any[];
                selectedanys = selectedanys.concat(diagram.selectedItems.connectors as ConnectorModel);
                const propertyName: string = args.propertyName.toString().toLowerCase();
                if (selectedanys.length > 0) {
                    for (const value1 of selectedanys) {
                        const node: any = value1;
                        if (node instanceof Node || node instanceof Connector) {
                            if (node.annotations.length > 0) {
                                for (const value of node.annotations) {
                                    const annotation: TextStyleModel = value.style as TextStyleModel;
                                    this.updateTextProperties(propertyName, annotation);
                                }
                            } else if (node.shape && node.shape.type === 'Text') {
                                this.updateTextProperties(propertyName, node.style);
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    }

    public updateTextProperties(propertyName: string, annotation: TextStyleModel): void {
        switch (propertyName) {
            case 'fontfamily':
                annotation.fontFamily = (this.textProperties.fontFamily as any).value;
                break;
            case 'fontsize':
                annotation.fontSize = (this.textProperties.fontSize as any).value;
                break;
            case 'fontcolor':
                annotation.color = this.getColor((this.textProperties.fontColor as any).value);
                break;
            case 'opacity':
                annotation.opacity = (this.textProperties.opacity as any).value / 100;
                (document.getElementById('textOpacityText') as any).value = (this.textProperties.opacity as any).value + '%';
                break;
        }
    }

    public mindMapPropertyChange(args: { [key: string]: any }): void {
        if (!this.preventPropertyChange) {
            const diagram: Diagram = this.selectedDiagram;
            if (diagram && diagram.nodes.length > 0) {
                for (const value of diagram.nodes) {
                    const node: Node = value as Node;
                    if (node.addInfo) {
                        const addInfo: { [key: string]: any } = node.addInfo as { [key: string]: any };
                        const levelType: string = (this.mindmapSettings.levelType as any).value;
                        if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                            switch (args.propertyName.toString().toLowerCase()) {
                                case 'fill':
                                    node.style.fill = this.getColor((this.mindmapSettings.fill as any).value);
                                    break;
                                case 'stroke':
                                    node.style.strokeColor = this.getColor((this.mindmapSettings.stroke as any).value);
                                    if (node.inEdges.length > 0) {
                                        const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]) as Connector;
                                        connector.style.strokeColor = node.style.strokeColor;
                                    }
                                    break;
                                case 'strokewidth':
                                    node.style.strokeWidth = (this.mindmapSettings.strokeWidth as any).value;
                                    if (node.inEdges.length > 0) {
                                        const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]) as Connector;
                                        connector.style.strokeWidth = (this.mindmapSettings.strokeWidth as any).value;
                                    }
                                    break;
                                case 'strokestyle':
                                    node.style.strokeDashArray = (this.mindmapSettings.strokeStyle as any).value;
                                    if (node.inEdges.length > 0) {
                                        const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]) as Connector;
                                        connector.style.strokeDashArray = (this.mindmapSettings.strokeStyle as any).value;
                                    }
                                    break;
                                case 'opacity':
                                    node.style.opacity = (this.mindmapSettings.opacity as any).value / 100;
                                    (document.getElementById('mindmapOpacityText') as any).value = (this.mindmapSettings.opacity as any).value + '%';
                                    break;
                                default:
                                    this.updateMindMapTextStyle(node, args.propertyName.toString().toLowerCase());
                                    break;
                            }
                        }
                    }
                    diagram.dataBind();
                    this.isModified = true;
                }
            }
        }
    }

    public updateMindMapTextStyle(node: Node, propertyName: string): void {
        const diagram: Diagram = this.selectedDiagram;
        if (node.addInfo && node.annotations.length > 0) {
            const annotation: TextStyleModel = node.annotations[0].style as TextStyleModel;
            switch (propertyName) {
                case 'fontfamily':
                    annotation.fontFamily = (this.mindmapSettings.fontFamily as any).value;
                    break;
                case 'fontsize':
                    annotation.fontSize = (this.mindmapSettings.fontSize as any).value;
                    break;
                case 'fontcolor':
                    annotation.color = this.getColor((this.mindmapSettings.fontColor as any).value);
                    break;
                case 'textopacity':
                    annotation.opacity = (this.mindmapSettings.textOpacity as any).value / 100;
                    (document.getElementById('mindmapOpacitySliderText') as any).value = (this.mindmapSettings.textOpacity as any).value + '%';
                    break;
            }
        }
        diagram.dataBind();
        this.isModified = true;
    }

    public getColor(colorName: string): string {
        if (window.navigator && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    }


    private applyNodeStyle(propertyName: string, node: Node, value: any): void {
        // const addInfo: any = node.addInfo || {};
        switch (propertyName) {
            case 'fillcolor':
                node.style.fill = this.getColor(value);
                if (this.nodeProperties.gradient) {
                    this.nodeProperties.getGradient(node);
                }
                break;
            case 'strokecolor':
                node.style.strokeColor = this.getColor((this.nodeProperties.strokeColor as any).value);
                break;
            case 'strokewidth':
                node.style.strokeWidth = (this.nodeProperties.strokeWidth as any).value;
                break;
            case 'strokestyle':
                node.style.strokeDashArray = (this.nodeProperties.strokeStyle as any).value;
                break;
            case 'opacity':
                node.style.opacity = (this.nodeProperties.opacity as any).value / 100;
                (document.getElementById('nodeOpacitySliderText') as any).value = ((this.nodeProperties.opacity as any).value) + '%';
                break;
            case 'gradient':
                if (value && !value.checked) {
                    (node.style.gradient as Gradient).type = 'None';
                } else {
                    this.nodeProperties.getGradient(node);
                }
                break;
            case 'gradientdirection':
            case 'gradientcolor':
            this.nodeProperties.getGradient(node);
                break;
        }
    }
}

/* tslint:enable */