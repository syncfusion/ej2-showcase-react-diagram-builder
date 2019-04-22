import { SelectorViewModel } from './selectedItem';
import { MindMapUtilityMethods } from './mindmap';
import { Diagram, Node, Connector, FlowShapes, BasicShapes, FlowShapeModel, BasicShapeModel, Segments, TextStyleModel, ShapeStyleModel } from '@syncfusion/ej2-diagrams';

/**
 *  Theme handler
 */

export class DiagramTheme {
    public isThemeApplied: boolean = false;
    public selectedItem: SelectorViewModel;
    public colorList: Array<{ [key: string]: any }> = [
        {
            themeName: 'theme1', themeStyle: [
                { fillColor: '#F0F0F0', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#E3E3E3', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType2' },
                { fillColor: '#ffffff', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#D2D2D2', borderColor: '#D2D2D2', textColor: '#000000', type: 'shapeType4' }
            ], lineColor: '#6A696A', lineType: 'Orthogonal'
        },
        {
            themeName: 'theme2', themeStyle: [
                { fillColor: '#F0F0F0', borderColor: '#ABABAB', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#6A696A', borderColor: '#6A696A', textColor: '#FFFFFF', type: 'shapeType2' },
                { fillColor: '#FFFFFF', borderColor: '#ABABAB', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#161415', borderColor: '#161415', textColor: '#FFFFFF', type: 'shapeType4' }
            ], lineColor: '#6A696A', lineType: 'Orthogonal'
        },
        {
            themeName: 'theme3', themeStyle: [
                { fillColor: '#D8EBEC', borderColor: '#77B4B7', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#F4E6CE', borderColor: '#D8B983', textColor: '#000000', type: 'shapeType2' },
                { fillColor: '#F3CBDB', borderColor: '#F4B1CC', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#528AD8', borderColor: '#174F9C', textColor: '#000000', type: 'shapeType4' }
            ], lineColor: '#18519D', lineType: 'Orthogonal'
        },
        {
            themeName: 'theme4', themeStyle: [
                { fillColor: '#A9DDD8', borderColor: '#00AE9D', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#F4E0BB', borderColor: '#FBB63D', textColor: '#000000', type: 'shapeType2' },
                { fillColor: '#B5DAEA', borderColor: '#29A4DA', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#D69BC1', borderColor: '#C360A0', textColor: '#000000', type: 'shapeType4' }
            ], lineColor: '#C86DA7', lineType: 'Bezier'
        },
        {
            themeName: 'theme5', themeStyle: [
                { fillColor: '#BFEAE5', borderColor: '#96C7BF', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#F8ECC4', borderColor: '#C3B58B', textColor: '#000000', type: 'shapeType2' },
                { fillColor: '#E8E2FF', borderColor: '#CFC4FB', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#F7E2E5', borderColor: '#D4A8AF', textColor: '#000000', type: 'shapeType4' }
            ], lineColor: '#4D4D4D', lineType: 'Orthogonal'
        },
        {
            themeName: 'theme6', themeStyle: [
                { fillColor: '#FFE9E1', borderColor: '#F6D2C4', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#DFEEE4', borderColor: '#ACD9BB', textColor: '#000000', type: 'shapeType2' },
                { fillColor: '#FFF8F6', borderColor: '#FFE7E0', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#B2ABA9', borderColor: '#161415', textColor: '#000000', type: 'shapeType4' }
            ], lineColor: '#161415', lineType: 'Orthogonal'
        },
        {
            themeName: 'theme7', themeStyle: [
                { fillColor: '#9FE3DD', borderColor: '#49C7BC', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#2EA499', borderColor: '#50BFB5', textColor: '#FFFFFF', type: 'shapeType2' },
                { fillColor: '#E6F5F7', borderColor: '#9FE3DD', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#13615A', borderColor: '#13615A', textColor: '#FFFFFF', type: 'shapeType4' }
            ], lineColor: '#13615A', lineType: 'Bezier'
        },
        {
            themeName: 'theme8', themeStyle: [
                { fillColor: '#F5F2D7', borderColor: '#E4D772', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#FCEBFF', borderColor: '#F8CAFF', textColor: '#000000', type: 'shapeType2' },
                { fillColor: '#EAE4F2', borderColor: '#D3BDF1', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#551660', borderColor: '#551660', textColor: '#FFFFFF', type: 'shapeType4' }
            ], lineColor: '#551660', lineType: 'Bezier'
        },
        {
            themeName: 'theme9', themeStyle: [
                { fillColor: '#2CBAA7', borderColor: '#FFFFFF', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#EFC608', borderColor: '#FFFFFF', textColor: '#000000', type: 'shapeType2' },
                { fillColor: '#27BBD6', borderColor: '#FFFFFF', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#2B333C', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType4' }
            ], lineColor: '#2B333C', lineType: 'Orthogonal'
        },
        {
            themeName: 'theme10', themeStyle: [
                { fillColor: '#8DAF5B', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType1' },
                { fillColor: '#E6B15A', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType2' },
                { fillColor: '#2683A8', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType3' },
                { fillColor: '#E64759', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType4' }
            ], lineColor: '#E64759', lineType: 'Bezier'
        },
        {
            themeName: 'theme11', themeStyle: [
                { fillColor: '#46B38E', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType1' },
                { fillColor: '#42A5F5', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType2' },
                { fillColor: '#9F86FF', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType3' },
                { fillColor: '#E64759', borderColor: '#FFFFFF', textColor: '#FFFFFF', type: 'shapeType4' }
            ], lineColor: '#696969', lineType: 'Orthogonal'
        },
        {
            themeName: 'theme12', themeStyle: [
                { fillColor: '#78BFFE', borderColor: '#5AAAFF', textColor: '#000000', type: 'shapeType1' },
                { fillColor: '#288CF7', borderColor: '#288CF7', textColor: '#FFFFFF', type: 'shapeType2' },
                { fillColor: '#BCDEF8', borderColor: '#8ECAFF', textColor: '#000000', type: 'shapeType3' },
                { fillColor: '#054F96', borderColor: '#054F96', textColor: '#FFFFFF', type: 'shapeType4' }
            ], lineColor: '#054F96', lineType: 'Bezier'
        }
    ];
    private nodeOldStyles: Array<{ [key: string]: string }> = [];
    private connectorOldStyles: Array<{ [key: string]: string }> = [];


    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }

   

    public getShapeType(shapeType: FlowShapes | BasicShapes): string {
        if (shapeType === 'Ellipse' || shapeType === 'Terminator') {
            return 'shapeType2';
        } else if (shapeType === 'Plus' || shapeType === 'Star' || shapeType === 'Diamond' || shapeType === 'Decision') {
            return 'shapeType4';
        } else if (shapeType === 'Hexagon' || shapeType === 'Parallelogram' || shapeType === 'Trapezoid' || shapeType === 'Cylinder') {
            return 'shapeType3';
        } else if (shapeType === 'DirectData' || shapeType === 'SequentialData' || shapeType === 'Sort' || shapeType === 'MultiDocument' ||
            shapeType === 'Collate' || shapeType === 'Or' || shapeType === 'InternalStorage' || shapeType === 'SequentialAccessStorage' ||
            shapeType === 'Annotation2' || shapeType === 'ManualInput' || shapeType === 'StoredData') {
            return 'shapeType3';
        } else {
            return 'shapeType1';
        }
    }

    public getShapeStyle(shapeType: string, themeStyle: Array<{ [key: string]: string }>): object {
        let style = null;
        for (const theme of  themeStyle) {
            if (theme.type === shapeType) {
                style = theme;
                break;
            }
        }
        return style as object;
    }

    public getThemeStyle(themeName: string): { [key: string]: any } {
        for (const color of this.colorList) {
            if (color.themeName === themeName) {
                return color;
            }
        }
        return {};
    }

    public themeMouseOver(args: MouseEvent): void {
        const target: HTMLDivElement = args.target as HTMLDivElement;
        // const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (target.className === 'db-theme-style-div') {
            const themeName: string = target.children[0].className.replace('db-theme-style ', '');
            this.applyStyle(themeName);
            this.isThemeApplied = true;
        }
    }

    public applyOldStyle(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        (diagram.historyManager.startGroupAction as () => void)();
        for (const nodeStyle of this.nodeOldStyles) {
            const themeStyle: { [key: string]: string } = nodeStyle;
            const node: Node = MindMapUtilityMethods.getNode(diagram.nodes, nodeStyle.name.toString()) as Node;
            node.style.fill = themeStyle.fill.toString();
            node.style.strokeColor = themeStyle.border.toString();
            if (node.annotations.length > 0) {
                if (!node.annotations[0].hyperlink) {
                    (node.annotations[0].style as TextStyleModel).color = themeStyle.fontColor;
                }
            }
            diagram.dataBind();
        }
        for (const connectorStyle of  this.connectorOldStyles) {
            const themeStyle: { [key: string]: string } = connectorStyle;
            const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, connectorStyle.name.toString()) as Connector;
            connector.style.strokeColor = themeStyle.border.toString();
            (connector.sourceDecorator.style as ShapeStyleModel).fill = (connector.sourceDecorator.style as ShapeStyleModel).strokeColor = themeStyle.border.toString();
            (connector.targetDecorator.style as ShapeStyleModel).fill = (connector.targetDecorator.style as ShapeStyleModel).strokeColor = themeStyle.border.toString();
            connector.type = themeStyle.type as Segments;
            diagram.dataBind();
        }
        this.isThemeApplied = false;
        (diagram.historyManager.endGroupAction as () => void)();
    }

    public themeClick(args: MouseEvent): void {
        const target: HTMLDivElement = args.target as HTMLDivElement;
        if (target.classList.contains('db-theme-style-div')) {
            const themeName: string = target.children[0].className.replace('db-theme-style ', '');
            this.selectedItem.themeStyle = themeName;
            this.applyStyle(themeName);
            this.setNodeOldStyles();
            for (const color of this.colorList) {
                const element: HTMLDivElement = document.getElementsByClassName(String(color.themeName))[0].parentNode as HTMLDivElement;
                if (element.classList.contains('db-theme-focus-style-div')) {
                    element.classList.remove('db-theme-focus-style-div');
                }
                if (color.themeName === themeName) {
                    element.classList.add('db-theme-focus-style-div');
                }
            }
            this.selectedItem.isModified = true;
        }
    }

    public setNodeOldStyles(): void {
        this.nodeOldStyles = []; this.connectorOldStyles = [];
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (diagram.nodes.length > 0) {
            const nodes: Node[] = diagram.nodes as Node[];
            for (const value of  nodes) {
                const node: Node =value;
                const style: { [key: string]: string } = { name: node.id, 'fill': node.style.fill as string, 'border': node.style.strokeColor as string };
                if (node.annotations.length > 0) {
                    if (!node.annotations[0].hyperlink) {
                        style.fontColor = (node.annotations[0].style as TextStyleModel).color as string;
                    }
                }
                this.nodeOldStyles.push(style);
            }
        }
        if (diagram.connectors.length > 0) {
            const connectors: Connector[] = diagram.connectors as Connector[];
            for (const value of  connectors) {
                const connector: Connector =value;
                this.connectorOldStyles.push({ name: connector.id, 'border': connector.style.strokeColor as string, 'type': connector.type });
            }
        }
    }

    public applyStyle(themeName: string): void {
        const themeType: { [key: string]: object } = this.getThemeStyle(themeName);
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        (diagram.historyManager.startGroupAction as () => void)();
        if (diagram.nodes.length > 0) {
            const nodes: Node[] = diagram.nodes as Node[];
            for (const value of  nodes) {
                const node: Node = value;
                if (node.style.gradient) {
                    node.style.gradient.type = 'None';
                }
                this.applyThemeStyleforElement(node, themeType);
            }
        }
        if (diagram.connectors.length > 0 && themeType) {
            const connectors: Connector[] = diagram.connectors as Connector[];
            for (const value of  connectors) {
                const connector: Connector = value;
                this.applyThemeStyleforElement(connector, themeType);
            }
            diagram.dataBind();
        }
        (diagram.historyManager.endGroupAction as () => void)();
    }

    public applyThemeStyleforElement(element: object, themeName: { [key: string]: object }): void {
        let themeType: { [key: string]: any };
        if (!themeName) {
            themeType = this.getThemeStyle(this.selectedItem.themeStyle);
        } else {
            themeType = themeName;
        }
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        (diagram.historyManager.startGroupAction as () => void)();
        if (element instanceof Node) {
            const node: Node = element;
            if (node.shape) {
                let shapeStyle: { [key: string]: string };
                if (node.shape.type === 'Flow' || node.shape.type === 'Basic') {
                    const shapeModel: FlowShapeModel | BasicShapeModel = node.shape as (FlowShapeModel | BasicShapeModel);
                    shapeStyle = this.getShapeStyle(this.getShapeType(shapeModel.shape as FlowShapes), themeType.themeStyle as Array<{ [key: string]: string }>) as { [key: string]: string };
                    if (shapeStyle) {
                        node.style.fill = shapeStyle.fillColor;
                        node.style.strokeColor = shapeStyle.borderColor;
                        if (node.annotations.length > 0) {
                            if (!(node.annotations[0].hyperlink && node.annotations[0].hyperlink.link)) {
                                (node.annotations[0].style as TextStyleModel).color = shapeStyle.textColor;
                            }
                        }
                        diagram.dataBind();
                    }
                }
            }
        } else if (element instanceof Connector) {
            const connector: Connector = element;
            connector.style.strokeColor = themeType.lineColor.toString();
            (connector.sourceDecorator.style as ShapeStyleModel).fill = (connector.sourceDecorator.style as ShapeStyleModel).strokeColor = themeType.lineColor.toString();
            (connector.targetDecorator.style as ShapeStyleModel).fill = (connector.targetDecorator.style as ShapeStyleModel).strokeColor = themeType.lineColor.toString();
            connector.type = themeType.lineType as Segments;
            diagram.dataBind();

        }
        (diagram.historyManager.endGroupAction as () => void)();
    }

}