
/**
 *  Home page handler
 */

import {
    NodeModel, NodeConstraints, PointModel, ConnectorModel,
    Diagram, ConnectorConstraints, Node, TextStyle, TextStyleModel, SelectorConstraints, TextAlign, HorizontalAlignment, VerticalAlignment, Connector, ShapeAnnotationModel, HistoryEntry, DecoratorModel, StrokeStyle, ShapeStyle, Gradient, LinearGradient,
    SelectorModel,
    SnapConstraints,
    SnapSettingsModel,
    DiagramConstraints,
    DiagramTools,
} from '@syncfusion/ej2-diagrams';
import { SelectorViewModel } from './selectedItem';
import { Dialog } from '@syncfusion/ej2-react-popups';
import { MindMapUtilityMethods, MindMap } from './mindmap';
import { OrgChartUtilityMethods, OrgChartData } from './orgchart';
import { Ajax } from '@syncfusion/ej2-base';
import { Toolbar, MenuItemModel, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';
import { PageCreation } from './pages';
import { CommonKeyboardCommands } from './commoncommands';


export class PaperSize {
    public pageWidth!: number;
    public pageHeight!: number;
}

export class UtilityMethods {

    public page!: PageCreation;
    public tempDialog!: Dialog;
    public toolbarEditor!: Toolbar;
    public arrangeContextMenu!: ContextMenuComponent;
    public fillColorCode: string[] = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];

    public borderColorCode: string[] = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];

    public flowChartImage: { [key: string]: string }[] = [
        { source: 'assets/dbstyle/common_images/blank_diagram.svg', name: 'Blank Diagram', type: 'svg_blank' },
        { source: 'assets/dbstyle/flowchart_Images/Credit_Card_Processing.svg', name: 'Credit Card Processing', type: 'svg_image' },
        { source: 'assets/dbstyle/flowchart_Images/Bank_Teller_Flow.svg', name: 'Banking Teller Process Flow', type: 'svg_image' },
        { source: 'assets/dbstyle/flowchart_Images/Developer_Workflow.SVG', name: "Agile's Developer Workflow", type: 'svg_image' },
    ];

    public mindMapImage: { [key: string]: string }[] = [
        { source: 'assets/dbstyle/common_images/blank_diagram_mind.svg', name: 'Blank Diagram', type: 'svg_image' },
        { source: 'assets/dbstyle/mindmap_images/BusinessPlanning.SVG', name: 'Business Planning', type: 'svg_image' },
        { source: 'assets/dbstyle/mindmap_images/TQM.SVG', name: 'Quality Management', type: 'svg_image' },
        { source: 'assets/dbstyle/mindmap_images/SoftwareLifeCycle.SVG', name: 'Software Life Cycle', type: 'svg_image' },
    ];

    public orgChartImage: { [key: string]: string }[] = [
        { source: 'assets/dbstyle/common_images/blank_diagram_org.svg', name: 'Blank Diagram', type: 'svg_image' },
        { source: 'assets/dbstyle/orgchart_images/OrgRenderingStyle_1.svg', name: 'Org Template Style - 1', type: 'svg_image' },
        { source: 'assets/dbstyle/orgchart_images/OrgRenderingStyle_2.svg', name: 'Org Template Style - 2', type: 'svg_image' },
        { source: 'assets/dbstyle/orgchart_images/OrgRenderingStyle_3.svg', name: 'Org Template Style - 3', type: 'svg_image' },
    ];

    public bpmnImage: { [key: string]: string }[] = [
        { source: 'assets/dbstyle/common_images/blank_diagram.svg', name: 'Blank Diagram', type: 'svg_blank' },
        { source: 'assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 1' },
        { source: 'assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 2' },
        { source: 'assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 3' },
    ];
    
    public bindNodeProperties(node: Node, selectedItem: any, isMultiSelect: boolean): void {
        selectedItem.preventPropertyChange = true;
        (selectedItem.nodeProperties.opacity as any).value = ((node as any).style.opacity * 100);

        if (node.children && node.children.length > 0) {
            const childNode = selectedItem.selectedDiagram.nameTable[node.children[0]] as Node;
            selectedItem.preventPropertyChange = true;
            (selectedItem.nodeProperties.offsetX as any).value = (Math.round((node as Node).offsetX * 100) / 100);
            (selectedItem.nodeProperties.offsetY as any).value = (Math.round((node as Node).offsetY * 100) / 100);
            (selectedItem.nodeProperties.width as any).value = node.width ? (Math.round(node.width * 100) / 100) : (Math.round(node.minWidth as number * 100) / 100);
            (selectedItem.nodeProperties.height as any).value = node.height ? (Math.round(node.height * 100) / 100) : (Math.round(node.minHeight as number * 100) / 100);
            if (selectedItem.selectedDiagram.selectedItems?.nodes?.length === 1) {
                (selectedItem.nodeProperties.rotateAngle as any).value = node.rotateAngle as number;
            }
            (selectedItem.nodeProperties.strokeColor as any).value = this.getHexColor((childNode.style as ShapeStyle).strokeColor as string);
            (selectedItem.nodeProperties.strokeStyle as any).value = (childNode.style as ShapeStyle).strokeDashArray ? (node.style as ShapeStyle).strokeDashArray : 'None';
            (selectedItem.nodeProperties.strokeWidth as any).value = (childNode.style as ShapeStyle).strokeWidth;
            (selectedItem.nodeProperties.fillColor as any).value = this.getHexColor((childNode.style as ShapeStyle).fill);
            (selectedItem.nodeProperties.opacity as any).value = (childNode.style as ShapeStyle).opacity * 100;
            selectedItem.nodeProperties.opacityText = (selectedItem.nodeProperties.opacity as any).value + '%';
            (selectedItem.nodeProperties.aspectRatio as any).checked = (node.constraints as NodeConstraints) & NodeConstraints.AspectRatio ? true : false;
            selectedItem.nodeProperties.gradient = (childNode.style as ShapeStyle).gradient.type !== 'None' ? true : false;
            const gradientElement: HTMLElement = document.getElementById('gradientStyle') as HTMLElement;
            if (selectedItem.nodeProperties.gradient) {
                gradientElement.className = 'row db-prop-row db-gradient-style-show';
                (document.getElementById('gradient') as any).ej2_instances[0].checked = true;
                (selectedItem.nodeProperties.gradientColor as any).value = ((childNode.style as ShapeStyle).gradient as Gradient).stops[1].color as string;
                const gradient: LinearGradient = (childNode.style as ShapeStyle).gradient as LinearGradient;
                if (gradient.x1) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'North';
                } else if (gradient.x2) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'East';
                } else if (gradient.y1) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'West';
                } else if (gradient.y2) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'South';
                }
            } else {
                gradientElement.className = 'row db-prop-row db-gradient-style-hide';
                (document.getElementById('gradient') as any).ej2_instances[0].checked = false;
                (selectedItem.nodeProperties.gradientColor as any).value = '#ffffff';
                (selectedItem.nodeProperties.gradientDirection as any).value = 'South';
            }
        } else if (!isMultiSelect) {
            (selectedItem.nodeProperties.offsetX as any).value = (Math.round((node as Node).offsetX * 100) / 100);
            (selectedItem.nodeProperties.offsetY as any).value = (Math.round((node as Node).offsetY * 100) / 100);
            (selectedItem.nodeProperties.width as any).value = node.width ? (Math.round(node.width * 100) / 100) : (Math.round(node.minWidth as number * 100) / 100);
            (selectedItem.nodeProperties.height as any).value = node.height ? (Math.round(node.height * 100) / 100) : (Math.round(node.minHeight as number * 100) / 100);
            if (selectedItem.selectedDiagram.selectedItems?.nodes?.length === 1) {
                (selectedItem.nodeProperties.rotateAngle as any).value = node.rotateAngle as number;
            }
            (selectedItem.nodeProperties.strokeColor as any).value = this.getHexColor((node.style as ShapeStyle).strokeColor as string);
            (selectedItem.nodeProperties.strokeStyle as any).value = (node.style as ShapeStyle).strokeDashArray ? (node.style as ShapeStyle).strokeDashArray : 'None';
            (selectedItem.nodeProperties.strokeWidth as any).value = (node.style as ShapeStyle).strokeWidth;
            (selectedItem.nodeProperties.fillColor as any).value = this.getHexColor((node.style as ShapeStyle).fill);
            (selectedItem.nodeProperties.opacity as any).value = (node.style as ShapeStyle).opacity * 100;
            selectedItem.nodeProperties.opacityText = (selectedItem.nodeProperties.opacity as any).value + '%';
            (selectedItem.nodeProperties.aspectRatio as any).checked = (node.constraints as NodeConstraints) & NodeConstraints.AspectRatio ? true : false;
            selectedItem.nodeProperties.gradient = (node.style as ShapeStyle).gradient.type !== 'None' ? true : false;
            const gradientElement: HTMLElement = document.getElementById('gradientStyle') as HTMLElement;
            if (selectedItem.nodeProperties.gradient) {
                gradientElement.className = 'row db-prop-row db-gradient-style-show';
                (document.getElementById('gradient') as any).ej2_instances[0].checked = true;
                (selectedItem.nodeProperties.gradientColor as any).value = ((node.style as ShapeStyle).gradient as Gradient).stops[1].color as string;
                const gradient: LinearGradient = (node.style as ShapeStyle).gradient as LinearGradient;
                if (gradient.x1) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'North';
                } else if (gradient.x2) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'East';
                } else if (gradient.y1) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'West';
                } else if (gradient.y2) {
                    (selectedItem.nodeProperties.gradientDirection as any).value = 'South';
                }
            } else {
                gradientElement.className = 'row db-prop-row db-gradient-style-hide';
                (document.getElementById('gradient') as any).ej2_instances[0].checked = false;
                (selectedItem.nodeProperties.gradientColor as any).value = '#ffffff';
                (selectedItem.nodeProperties.gradientDirection as any).value = 'South';
            }
        }
        selectedItem.preventPropertyChange = false;
    }

    public bindMindMapProperties(node: NodeModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        (selectedItem.mindmapSettings.stroke as any).value = (node.style as ShapeStyle).strokeColor;
        (selectedItem.mindmapSettings.strokeStyle as any).value = (node.style as ShapeStyle).strokeDashArray ? (node.style as ShapeStyle).strokeDashArray : 'None';
        (selectedItem.mindmapSettings.strokeWidth as any).value = (node.style as ShapeStyle).strokeWidth;
        (selectedItem.mindmapSettings.fill as any).value = (node.style as ShapeStyle).fill;
        (selectedItem.mindmapSettings.opacity as any).value = ((node.style as ShapeStyle).opacity || 1) * 100;
        selectedItem.mindmapSettings.opacityText = ((selectedItem.mindmapSettings.opacity as any).value || '100') + '%';
        (document.getElementById('mindmapOpacityText') as any).value = selectedItem.mindmapSettings.opacityText;
        if ((node.annotations as ShapeAnnotationModel[]).length > 0) {
            const annotation: TextStyle = (node.annotations as ShapeAnnotationModel[])[0].style as TextStyle;
            (selectedItem.mindmapSettings.fontFamily as any).value = annotation.fontFamily;
            (selectedItem.mindmapSettings.fontColor as any).value = annotation.color;
            (selectedItem.mindmapSettings.fontSize as any).value = annotation.fontSize;
            (selectedItem.mindmapSettings.textOpacity as any).value = (annotation.opacity || 1) * 100;
            selectedItem.mindmapSettings.textOpacityText = ((selectedItem.mindmapSettings.textOpacity as any).value || '100') + '%';
            (document.getElementById('mindmapOpacitySliderText') as any).value = selectedItem.mindmapSettings.textOpacityText;
             //Bind text style toolbar with mindmap.
            let mindmapTextStyleToolbar = (document.getElementById('mindmapTextStyleToolbar') as any).ej2_instances[0];
            mindmapTextStyleToolbar.items[0].cssClass = annotation.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            mindmapTextStyleToolbar.items[1].cssClass = annotation.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            mindmapTextStyleToolbar.items[2].cssClass = annotation.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        selectedItem.preventPropertyChange = false;
    }

    public bindTextProperties(text: TextStyleModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        (selectedItem.textProperties.fontColor as any).value = this.getHexColor(text.color as string);
        (selectedItem.textProperties.fontFamily as any).value = text.fontFamily as string;
        (selectedItem.textProperties.fontSize as any).value = text.fontSize as number;
        (selectedItem.textProperties.opacity as any).value = text.opacity as number * 100;
        selectedItem.textProperties.opacityText = selectedItem.textProperties.opacity + '%';
        let toolbarTextStyle: any = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        this.updateTextAlign(text.textAlign as TextAlign);
        selectedItem.preventPropertyChange = false;
    }

    public updateTextAlign(textAlign: TextAlign): void {
        let toolbarTextSubAlignment: any = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (const toolbarText of toolbarTextSubAlignment.items) {
                toolbarText.cssClass = toolbarText.cssClass.replace(' tb-item-selected', '');
            }
            const index: number = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2)
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    public updateHorVertAlign(horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment): void {
        let toolbarHorVerAlignment: any = document.getElementById('toolbarTextAlignment');
        if(toolbarHorVerAlignment) {
            toolbarHorVerAlignment = toolbarHorVerAlignment.ej2_instances[0];
        }
        if (toolbarHorVerAlignment) {
            for (const toolbarHorVer of toolbarHorVerAlignment.items) {
                toolbarHorVer.cssClass = (toolbarHorVer.cssClass as any).replace(' tb-item-selected', '');
            }
            let index: number = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
            index = verticalAlignment === 'Bottom' ? 3 : (verticalAlignment === 'Center' ? 4 : 5);
            toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    public bindConnectorProperties(connector: ConnectorModel, selectedItem: SelectorViewModel): void {
        selectedItem.preventPropertyChange = true;
        (selectedItem.connectorProperties.lineColor as any).value = this.getHexColor((connector.style as StrokeStyle).strokeColor as string);
        (selectedItem.connectorProperties.lineStyle as any).value = (connector.style as StrokeStyle).strokeDashArray ? (connector.style as StrokeStyle).strokeDashArray : 'None';
        (selectedItem.connectorProperties.lineType as any).value = connector.type as string;
        (selectedItem.connectorProperties.lineWidth as any).value = (connector.style as StrokeStyle).strokeWidth as number;
        (selectedItem.connectorProperties.sourceType as any).value = (connector.sourceDecorator as DecoratorModel).shape as string;
        (selectedItem.connectorProperties.targetType as any).value = (connector.targetDecorator as DecoratorModel).shape as string;
        (selectedItem.connectorProperties.opacity as any).value = ((connector.style as StrokeStyle).opacity as number) * 100;
        selectedItem.connectorProperties.opacityText = selectedItem.connectorProperties.opacity + '%';
        (selectedItem.connectorProperties.lineJumpSize as any).value = connector.bridgeSpace as number;
        (selectedItem.connectorProperties.lineJump as any).value = connector.constraints as ConnectorConstraints & ConnectorConstraints.Bridging ? true : false;
        if ((selectedItem.connectorProperties.lineJump as any).value) {
            (document.getElementById('lineJumpSizeDiv') as HTMLElement).style.display = '';
        } else {
            (document.getElementById('lineJumpSizeDiv') as HTMLElement).style.display = 'none';
        }
        (selectedItem.connectorProperties.targetSize as any).value = (connector.targetDecorator as DecoratorModel).width as number;
        (selectedItem.connectorProperties.sourceSize as any).value = (connector.sourceDecorator as DecoratorModel).width as number;
        selectedItem.preventPropertyChange = false;
    }

    public getHexColor(colorStr: string): string {
        // const colors: number[] = [];
        let a: HTMLDivElement = document.createElement('div');
        a.style.color = colorStr;
        let colors: number[] = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(
            (a: string): number => {
                return parseInt(a, 10);
            }
        );
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
    }

    public getOffset(position: string): PointModel {
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            default:
                return { x: 0.5, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
        }
    }

    public getPosition(offset: PointModel): string {
        if (offset.x === 0 && offset.y === 0) {
            return 'TopLeft';
        } else if (offset.x === 0.5 && offset.y === 0) {
            return 'TopCenter';
        } else if (offset.x === 1 && offset.y === 0) {
            return 'TopRight';
        } else if (offset.x === 0 && offset.y === 0.5) {
            return 'MiddleLeft';
        } else if (offset.x === 1 && offset.y === 0.5) {
            return 'MiddleRight';
        } else if (offset.x === 0 && offset.y === 1) {
            return 'BottomLeft';
        } else if (offset.x === 0.5 && offset.y === 1) {
            return 'BottomCenter';
        } else if (offset.x === 1 && offset.y === 1) {
            return 'BottomRight';
        } else {
            return 'Center';
        }
    }

    public hideElements(elementType: string, diagram?: Diagram, diagramType?: string): void {
        const diagramContainer: HTMLElement = document.getElementsByClassName('diagrambuilder-container')[0] as HTMLElement;
        if (diagramContainer.classList.contains(elementType)) {
            if (!(diagramType === 'mindmap-diagram' || diagramType === 'orgchart-diagram')) {
                diagramContainer.classList.remove(elementType);
            }
        } else {
            diagramContainer.classList.add(elementType);
        }
        if (diagram) {
            diagram.updateViewPort();
        }
    }

    public objectTypeChange(objectType: string): void {
        (document.getElementById('diagramPropertyContainer') as HTMLElement).style.display = 'none';
        (document.getElementById('nodePropertyContainer') as HTMLElement).style.display = 'none';
        (document.getElementById('textPropertyContainer') as HTMLElement).style.display = 'none';
        (document.getElementById('connectorPropertyContainer') as HTMLElement).style.display = 'none';
        switch (objectType) {
            case 'diagram':
                (document.getElementById('diagramPropertyContainer') as HTMLElement).style.display = '';
                break;
            case 'node':
                (document.getElementById('nodePropertyContainer') as HTMLElement).style.display = '';
                break;
            case 'connector':
                (document.getElementById('connectorPropertyContainer') as HTMLElement).style.display = '';
                break;
        }
    }

    public getDefaultDiagramTemplates1(selectedItem: SelectorViewModel, tempCount?: number, backgroundColor?: string, parentId?: string) {
        let i: number;
        let j: number;
        tempCount = tempCount ? tempCount : 4;
        backgroundColor = backgroundColor ? backgroundColor : 'red';
        parentId = parentId ? parentId : 'Flow Chart';
        let parentDiv: HTMLDivElement = document.getElementById('diagramTemplateDiv1') as HTMLDivElement;
        parentDiv = parentDiv.cloneNode(true) as HTMLDivElement;
        parentDiv.id = '';
        parentDiv.style.display = '';

        const parentElements: HTMLCollectionOf<HTMLDivElement> =
            parentDiv.getElementsByClassName('db-diagram-template-parent-text') as HTMLCollectionOf<HTMLDivElement>;


        for (i = 0; i < parentElements.length; i++) {
            if (parentElements[i].children[0].innerHTML.trim() === parentId) {
                parentElements[i].classList.add('active');
            }
            parentElements[i].click = this.showDiagramTemplates.bind(this, selectedItem);;
        }
        const diagramTemplatesDiv: HTMLDivElement = parentDiv.getElementsByClassName('diagramTemplates')[0] as HTMLDivElement;
        diagramTemplatesDiv.appendChild(this.generateDiagramTemplates(tempCount, backgroundColor, parentId, selectedItem));
        this.tempDialog.content = parentDiv.outerHTML;
        this.tempDialog.dataBind();
        this.triggerTemplateEvent(selectedItem);
        setTimeout(() => {
            const divElement: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("db-diagram-template-image-div") as HTMLCollectionOf<HTMLElement>
            for (i = 1; i < divElement.length; i++) {
                divElement[i].onclick = selectedItem.utilityMethods.generateDiagram.bind(selectedItem.utilityMethods, selectedItem);
            }
            const imageElement: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('db-diagram-template-parent-text') as HTMLCollectionOf<HTMLElement>;
            for (j = 0; j < imageElement.length; j++) {
                imageElement[j].onclick = selectedItem.utilityMethods.showDiagramTemplates.bind(selectedItem.utilityMethods, selectedItem);
            }
        }, 0);
        return this.tempDialog.content;
    }

    public generateDiagramTemplates(tempCount: number, backgroundColor: string, parentId: string, selectedItem: SelectorViewModel): HTMLDivElement {

        const parentTemplateDiv: HTMLDivElement = document.createElement('div');
        parentTemplateDiv.classList.add('class', 'db-parent-diagram-template');

        const divElement: HTMLDivElement = document.getElementById('diagramTemplateDiv') as HTMLDivElement;
        for (let i: number = 0; i < tempCount; i++) {
            const cloneTemplateDiv: HTMLDivElement = divElement.cloneNode(true) as HTMLDivElement;
            cloneTemplateDiv.style.display = '';
            cloneTemplateDiv.id = '';
            const imageDiv: HTMLDivElement = cloneTemplateDiv.children[0] as HTMLDivElement;

            imageDiv.setAttribute('id', parentId.replace(' ', '').toLowerCase() + '_child' + i);
            imageDiv.click = this.generateDiagram.bind(this, selectedItem);
            imageDiv.onclick = (evt) => {
                alert("hi");
            }
            const diagramType: { [key: string]: string } = this.getImageSource(parentId, i);
            (imageDiv.children[0] as HTMLDivElement).style.backgroundImage = 'url(' + diagramType.source + ')';
            if (diagramType.type) {
                if (diagramType.type === 'svg_blank') {
                    (imageDiv.children[0] as HTMLDivElement).className = 'db-diagram-template-svg-blank-image';
                } else {
                    (imageDiv.children[0] as HTMLDivElement).className = 'db-diagram-template-svg-image';
                }
            } else {
                (imageDiv.children[0] as HTMLDivElement).className = 'db-diagram-template-image';
            }
            cloneTemplateDiv.children[1].children[0].innerHTML = diagramType.name;
            parentTemplateDiv.appendChild(cloneTemplateDiv);
        }
        return parentTemplateDiv;
    }

    public triggerTemplateEvent(selectedItem: SelectorViewModel): void {
        let i: number;
        const parentElements: HTMLCollectionOf<HTMLDivElement> =
            document.getElementsByClassName('db-diagram-template-parent-text') as HTMLCollectionOf<HTMLDivElement>;

        for (i = 0; i < parentElements.length; i++) {
            parentElements[i].onclick = this.showDiagramTemplates.bind(this, selectedItem);;
        }

        const parentElements1: HTMLCollectionOf<HTMLDivElement> =
            document.getElementsByClassName('db-diagram-template-image-div') as HTMLCollectionOf<HTMLDivElement>;
        for (i = 0; i < parentElements1.length; i++) {
            parentElements1[i].onclick = this.generateDiagram.bind(this, selectedItem);;
        }
    }


    public getImageSource(diagramType: string, index: number): { [key: string]: string } {
        switch (diagramType) {
            case 'Flow Chart':
                return this.flowChartImage[index];
            case 'Mind Map':
                return this.mindMapImage[index];
            case 'Org Chart':
                return this.orgChartImage[index];
            default:
                return this.bpmnImage[index];
        }
    }

    public readTextFile(file: string, selectedItem: SelectorViewModel): void {
        (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = '';
        const ajax: Ajax = new Ajax(file, 'GET', true);
        ajax.send().then();
        // let value = '../assets/dbstyle/flowchart_Images/CreditCardFlow.json'
        // let context: any = this;
        ajax.onSuccess = (data: string): void => {
            selectedItem.preventSelectionChange = true;
            selectedItem.isTemplateLoad = true;
            this.page.loadPage(data);
            this.page.loadDiagramSettings();
            selectedItem.isTemplateLoad = false;
            if (selectedItem.diagramType === 'MindMap') {
                const rootNode: Node = MindMapUtilityMethods.getNode(selectedItem.selectedDiagram.nodes, 'rootNode') as Node;
                selectedItem.utilityMethods.bindMindMapProperties(rootNode, selectedItem);
            }
            if (selectedItem.diagramType === 'OrgChart') {
                selectedItem.selectedDiagram.layout.getLayoutInfo = OrgChartUtilityMethods.getLayoutInfo.bind(OrgChartUtilityMethods);
                selectedItem.selectedDiagram.selectedItems.userHandles = OrgChartUtilityMethods.handle;
                selectedItem.selectedDiagram.selectedItems.constraints = SelectorConstraints.UserHandle;
                selectedItem.selectedDiagram.dataBind();
                selectedItem.selectedDiagram.fitToPage();
            }
            selectedItem.preventSelectionChange = false;
            (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
        };
        ajax.onFailure = (data: string): void => {
            (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
        };
        ajax.onError = (evt: Event): object => {
            (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
            return {};
        };
    }

    public currentDiagramVisibility(diagramname: string, selectedItem: SelectorViewModel): void {
        const value: any = null;
        if (diagramname === 'mindmap-diagram' || diagramname === 'orgchart-diagram') {
            selectedItem.utilityMethods.hideElements('hide-palette', value, diagramname);

            const diagramContainer: HTMLDivElement = document.getElementsByClassName('db-current-diagram-container')[0] as HTMLDivElement;
            diagramContainer.classList.add(diagramname);

            const propertyContainer: HTMLDivElement = document.getElementsByClassName('db-property-editor-container')[0] as HTMLDivElement;
            if (diagramname === 'mindmap-diagram') {
                propertyContainer.classList.remove('orgchart-diagram');
            } else {
                propertyContainer.classList.remove('mindmap-diagram');
            }
            propertyContainer.classList.add(diagramname);
        }
    }
    public showDiagramTemplates(selectedItem: SelectorViewModel, evt: MouseEvent): void {
        let target: HTMLDivElement = evt.target as HTMLDivElement;
        if (target.tagName.toLowerCase() === 'span') {
            target = target.parentElement as HTMLDivElement;
        }
        switch (target.children[0].innerHTML.trim()) {
            case 'Flow Chart':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'red', 'Flow Chart');
                break;
            case 'Mind Map':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'blue', 'Mind Map');
                break;
            case 'Org Chart':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'orange', 'Org Chart');
                break;
            case 'BPMN':
                this.getDefaultDiagramTemplates1(selectedItem, 4, 'brown', 'BPMN');
                break;
        }
    }

    public enableToolbarItems(selectedItems: object[]): void {
        const toolbarContainer: HTMLDivElement = document.getElementsByClassName('db-toolbar-container')[0] as HTMLDivElement;
        let toolbarClassName: string = 'db-toolbar-container';
        if (toolbarContainer.classList.contains('db-undo')) {
            toolbarClassName += ' db-undo';
        }
        if (toolbarContainer.classList.contains('db-redo')) {
            toolbarClassName += ' db-redo';
        }
        toolbarContainer.className = toolbarClassName;
        if (selectedItems.length === 1) {
            toolbarContainer.className = toolbarContainer.className + ' db-select';
            if (selectedItems[0] instanceof Node) {
                if ((selectedItems[0] as Node).children) {
                    if ((selectedItems[0] as Node).children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-multiple db-node db-group';
                    } else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-node db-group';
                    }
                } else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        } else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        } else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            // let isNodeExist: boolean = false;
            for (const item of selectedItems) {
                if (item instanceof Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    }

    public enableMenuItems(itemText: string, selectedItem: SelectorViewModel): boolean {
        if(selectedItem && selectedItem.selectedDiagram) {
            let selectedItems: object[] = selectedItem.selectedDiagram.selectedItems.nodes as object[];
            selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors as ConnectorModel);
            if (itemText) {
                const commandType: string = itemText.replace(/[' ']/g, '');
                if (selectedItems.length === 0 || selectedItem.diagramType !== 'GeneralDiagram') {
                    switch (commandType.toLowerCase()) {
                        case 'edittooltip':
                            let disable: boolean = false;
                            if (!(selectedItems.length === 1)) {
                                disable = true;
                            }
                            return disable;
                        case 'cut':
                            return true;
                        case 'copy':
                            return true;
                        case 'delete':
                            return true;
                        case 'duplicate':
                            return true;
                    }
                }
                if (selectedItems.length > 1) {
                    switch (commandType.toLowerCase()) {
                        case 'edittooltip':
                            return true;
                    }
                }
                if (selectedItem.pasteData.length === 0 && itemText === 'Paste') {
                    return true;
                }
                if (itemText === 'Undo' && (selectedItem.selectedDiagram.historyManager.undoStack as HistoryEntry[]).length === 0) {
                    return true;
                }
                if (itemText === 'Redo' && (selectedItem.selectedDiagram.historyManager.redoStack as HistoryEntry[]).length === 0) {
                    return true;
                }
                if (itemText === 'Select All') {
                    if (selectedItem.diagramType !== 'GeneralDiagram' || (selectedItem.selectedDiagram.nodes.length === 0 && selectedItem.selectedDiagram.connectors.length === 0)) {
                        return true;
                    }
                }
                if (['Align Objects', 'Distribute Objects', 'Match Size', 'Group'].includes(itemText)) {
                if (selectedItems.length < 2) {
                    return true;
                }
            }
            if (['Bring To Front', 'Send To Back', 'Bring Forward', 'Send Backward'].includes(itemText)) {
                if (selectedItems.length !== 1) {
                    return true;
                }
            }
            if (['Lock', 'Unlock'].includes(itemText)) {
                if (selectedItems.length < 1) {
                    return true;
                } else {
                    if (itemText === 'Lock') {
                        for (let i = 0; i < selectedItems.length; i++) {
                            if ((selectedItems[i] as any).constraints !== NodeConstraints.Default) {
                                return true;
                            }
                        }
                    } else {
                        for (let i = 0; i < selectedItems.length; i++) {
                            if ((selectedItems[i] as any).constraints === NodeConstraints.Default) {
                                return true;
                            }
                        }
                    }
                }
            }
            if (itemText === 'Ungroup') {
                if (selectedItems.length !== 1 || !(selectedItems[0] instanceof Node) || !selectedItems[0].children || selectedItems[0].children.length === 0) {
                    return true;
                }
            }
                if (selectedItem.diagramType !== 'GeneralDiagram') {
                     if (['Themes', 'Paste', 'Show Rulers', 'Show Guides', 'Show Grid', 'Snap To Grid', 'Show Layers', 'Show Stencil','Align Objects', 'Distribute Objects', 'Match Size', 'Group',
                    'Bring To Front', 'Send To Back', 'Bring Forward', 'Send Backward','Lock', 'Unlock','Ungroup'].includes(itemText)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public enableArrangeMenuItems(selectedItem: SelectorViewModel): void {
        // const contextInstance: any = document.getElementById('arrangeContextMenu');
        // const contextMenu: ContextMenu = contextInstance.ej2_instances[0] as ContextMenu;
        const contextMenu: ContextMenuComponent = this.arrangeContextMenu;
        let selectedItems: object[] = selectedItem.selectedDiagram.selectedItems.nodes as object[];
        selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors as ConnectorModel[]);
        for (const menuItem of contextMenu.items) {
            contextMenu.enableItems([(menuItem as MenuItemModel).text as string], false);
        }
        if (selectedItem.diagramType === 'GeneralDiagram') {
            if (selectedItems.length > 1) {
                contextMenu.enableItems(['Align Objects', 'Distribute Objects', 'Match Size', 'Lock', 'Unlock', 'Group'], true);
                for (let i = 0; i < 1; i++) {
                    if((selectedItems[i] as any).constraints & NodeConstraints.Drag) {
                        contextMenu.enableItems(['Lock'], true);
                        contextMenu.enableItems(['Unlock'], false);
                    }
                    else {
                        contextMenu.enableItems(['Lock'], false);
                        contextMenu.enableItems(['Unlock'], true);
                    }
                }
            } else if (selectedItems.length === 1) {
                contextMenu.enableItems(['Send To Back', 'Bring To Front', 'Send Backward', 'Bring Forward']);
                const object: object = selectedItems[0];
                if (object instanceof Node) {
                    if (object.children && object.children.length > 0) {
                        contextMenu.enableItems(['Ungroup']);
                    }
                    if (object.constraints & NodeConstraints.Drag) {
                        contextMenu.enableItems(['Lock'], true);
                        contextMenu.enableItems(['Unlock'], false);
                    } else {
                        contextMenu.enableItems(['Unlock'], true);
                        contextMenu.enableItems(['Lock'], false);
                    }
                }
            }
        }
    }



    public getPaperSize(paperName: string): PaperSize {
        const paperSize: PaperSize = new PaperSize();
        switch (paperName) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize;
    }

    public removeChild(selectedItem: SelectorViewModel): void {
        const diagram: Diagram = selectedItem.selectedDiagram;
        if ((diagram.selectedItems.nodes as NodeModel[]).length > 0) {
            selectedItem.preventPropertyChange = true;
            (diagram.historyManager.startGroupAction as () => void)();
            this.removeSubChild((diagram.selectedItems.nodes as NodeModel[])[0] as Node, selectedItem);
            (diagram.historyManager.endGroupAction as () => void)();
            diagram.doLayout();
            selectedItem.preventPropertyChange = false;
        }
        selectedItem.isModified = true;
    }


    public generateDiagram(selectedItem: SelectorViewModel, evt: MouseEvent): void {
        const diagramContainer: HTMLElement = document.getElementsByClassName('diagrambuilder-container')[0] as HTMLElement;
        const diagram: Diagram = selectedItem.selectedDiagram;
        const target: HTMLDivElement = evt.target as HTMLDivElement;
        if (target.id.startsWith('mindmap')) {
            selectedItem.diagramType = 'MindMap';
            MindMapUtilityMethods.selectedItem = selectedItem;
            const mindMapObject: MindMap = new MindMap(selectedItem);
            if (target.id === 'mindmap_child0') {
                mindMapObject.createMindMap(true);
                selectedItem.selectedDiagram.refresh();
                MindMapUtilityMethods.templateType = 'template1';
            } else if (target.id === 'mindmap_child1') {
               diagram.clear();
                mindMapObject.createMindMap(false);
                this.readTextFile('assets/dbstyle/mindmap_images/BusinessPlanning.json', selectedItem);
                MindMapUtilityMethods.templateType = 'template1';
            } else if (target.id === 'mindmap_child2') {
                diagram.clear();
                mindMapObject.createMindMap(false);
                this.readTextFile('assets/dbstyle/mindmap_images/TQM.json', selectedItem);
                MindMapUtilityMethods.templateType = 'template2';
            } else if (target.id === 'mindmap_child3') {
                diagram.clear();
                mindMapObject.createMindMap(false);
                this.readTextFile('assets/dbstyle/mindmap_images/SoftwareDevelopmentLifeCycle.json', selectedItem);
                MindMapUtilityMethods.templateType = 'template1';
            }
            this.hideMenuItems();
            diagramContainer.classList.add('custom-diagram');
        } else if (target.id.startsWith('orgchart')) {
            selectedItem.diagramType = 'OrgChart';
            OrgChartUtilityMethods.selectedItem = selectedItem;
            const orgChartObject: OrgChartData = new OrgChartData(selectedItem);
            if (target.id === 'orgchart_child0') {
                orgChartObject.createOrgChart(true);
            } else {
                OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                OrgChartUtilityMethods.subTreeAlignments = 'Center';
                if (target.id === 'orgchart_child1') {
                    orgChartObject.createOrgChart(false);

                    this.readTextFile('assets/dbstyle/orgchart_images/OrgTemplateStyle1.json', selectedItem);
                } else if (target.id === 'orgchart_child2') {
                    orgChartObject.createOrgChart(false);
                    this.readTextFile('assets/dbstyle/orgchart_images/OrgTemplateStyle2.json', selectedItem);
                } else if (target.id === 'orgchart_child3') {
                    orgChartObject.createOrgChart(false);
                    this.readTextFile('assets/dbstyle/orgchart_images/OrgTemplateStyle3.json', selectedItem);
                }
            }
            this.hideMenuItems();
            diagramContainer.classList.add('custom-diagram');
        } else if (target.id.startsWith('flowchart')) {
            if (target.id === 'flowchart_child0') {
                this.hideShortcutVisibility();
                let selectedItemSettings: SelectorModel = { constraints: SelectorConstraints.All & ~SelectorConstraints.ToolTip };
                selectedItem.selectedDiagram.snapSettings = this.getSnapSettings();
                selectedItem.selectedDiagram.selectedItems = selectedItemSettings;
                selectedItem.selectedDiagram.selectedItems.userHandles = [];
                selectedItem.selectedDiagram.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
                selectedItem.selectedDiagram.clear();
                this.updatePalette(selectedItem.selectedDiagram);
            } else if (target.id === 'flowchart_child1') {
                this.readTextFile("assets/dbstyle/flowchart_Images/CreditCardFlow.json", selectedItem);
            } else if (target.id === 'flowchart_child2') {
                this.readTextFile('assets/dbstyle/flowchart_Images/BankingTellerProcess.json', selectedItem);
            } else if (target.id === 'flowchart_child3') {
                this.readTextFile('assets/dbstyle/flowchart_Images/Developer_Workflow.json', selectedItem);
            }
            selectedItem.diagramType = 'GeneralDiagram';
            diagramContainer.classList.add('general-diagram');
        } else {
            selectedItem.selectedDiagram.clear();
            selectedItem.diagramType = 'GeneralDiagram';
            diagramContainer.classList.add('general-diagram');
        }
        const diagramName: string = (target.parentElement as HTMLElement).children[1].children[0].innerHTML;
        if (diagramName !== 'Blank Diagram') {
            (document.getElementById('diagramName') as HTMLElement).innerHTML = diagramName;
        }
        this.tempDialog.hide();
    }

    public getSnapSettings() {
        let snapSettings: SnapSettingsModel = {
            horizontalGridlines: {
                lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
                lineColor: '#EEEEEE'
            },
            verticalGridlines: {
                lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
                lineColor: '#EEEEEE'
            },
            constraints: (SnapConstraints.All & ~SnapConstraints.SnapToLines)
        };
        return snapSettings;

    }

    public cutLayout(selectedItem: SelectorViewModel): void {
        const diagram: Diagram = selectedItem.selectedDiagram;
        if ((diagram.selectedItems.nodes as NodeModel[]).length) {
            selectedItem.utilityMethods.copyLayout(selectedItem);
            selectedItem.utilityMethods.removeChild(selectedItem);
            diagram.doLayout();
            selectedItem.isModified = true;
        }
    }
    public copyLayout(selectedItem: SelectorViewModel): void {
        const diagram: Diagram = selectedItem.selectedDiagram;
        const selectedNode: Node = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
        if (selectedNode.id !== 'rootNode') {
            selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItemswithChildElements();
        }
    }
    public pasteLayout(selectedItem: SelectorViewModel): void {
        selectedItem.isCopyLayoutElement = true;
        if (selectedItem.diagramType === 'MindMap') {
            MindMapUtilityMethods.mindmapPaste();
        } else if (selectedItem.diagramType === 'OrgChart') {
            OrgChartUtilityMethods.orgchartPaste();
        }
        selectedItem.isCopyLayoutElement = false;
        selectedItem.isModified = true;
    }
    public undoRedoLayout(isundo: boolean, selectedItem: SelectorViewModel): void {
        const diagram: Diagram = selectedItem.selectedDiagram;
        if (isundo) {
            diagram.undo();
        } else {
            diagram.redo();
        }
        if ((diagram.selectedItems.nodes as NodeModel[]).length === 0) {
            this.updateSectionforNode(selectedItem);
        }
        diagram.doLayout();
        selectedItem.isModified = true;
    }

    public updateSectionforNode(selectedItem: SelectorViewModel): void {
        const diagram: Diagram = selectedItem.selectedDiagram;
        for (const node of diagram.nodes) {
            const newselection: Node = node as Node;
            if (newselection.id === 'rootNode') {
                selectedItem.preventPropertyChange = true;
                diagram.select([newselection]);
                selectedItem.preventPropertyChange = false;
            }
        }
    }


    public updateLayout(selectedItem: SelectorViewModel, bindBindingFields?: boolean, imageField?: boolean): void {
        selectedItem.selectedDiagram.constraints = selectedItem.selectedDiagram.constraints &= ~DiagramConstraints.UndoRedo;
        for (let i: number = 0; i < selectedItem.selectedDiagram.nodes.length; i++) {
            const node: Node = selectedItem.selectedDiagram.nodes[i] as Node;
            if (node.id !== 'textNode') {
                const nodeInfo: any = node.addInfo as { [key: string]: object };
                const keys: string[] = Object.keys(nodeInfo);
                const bindingFields: string[] = [];
                const additionalFields: string[] = [];
                let propName: string = 'Name';
                if (nodeInfo[propName] && nodeInfo[propName].checked) {
                    bindingFields.push(propName);
                }

                for (const key of keys) {
                    const keyValue: any = nodeInfo[key];
                    if (keyValue && keyValue.type === 'bindingField') {
                        if (keyValue.checked) {
                            if (bindBindingFields) {
                                bindingFields.push(key);
                            }
                        } else {
                            additionalFields.push(key);
                        }
                    }
                }

                selectedItem.selectedDiagram.removeLabels(node, node.annotations);
                propName = 'Image URL';
                if (!imageField) {
                    node.minWidth = 150; node.minHeight = 50; node.maxHeight = 50;node.maxWidth = 150;
                    selectedItem.selectedDiagram.dataBind();
                    node.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 5 };
                    selectedItem.selectedDiagram.dataBind();
                } else if (imageField) {
                    node.minWidth = 300; node.minHeight = 100; node.maxHeight = 100;node.maxWidth = 300;
                    selectedItem.selectedDiagram.dataBind();
                    node.shape = {
                        type: 'Image', source: nodeInfo[propName] && nodeInfo[propName].value ? nodeInfo[propName].value.toString() : 'assets/dbstyle/orgchart_images/blank-male.jpg',
                        align: 'XMinYMin', scale: 'Meet'
                    };
                    node.addInfo[propName].value = node.shape.source;
                    selectedItem.selectedDiagram.dataBind();
                }
                const annotations: ShapeAnnotationModel[] = [];
                let startY: number = 0.5 - ((bindingFields.length - 1) / 10);
                let count: number = 0;
                for (let b = 0; b < bindingFields.length; b++) {
                    let binding = bindingFields[b];
                    const annotation1: ShapeAnnotationModel = {
                        content: nodeInfo[binding].value.toString() || binding, addInfo: binding as any, offset: { x: 0.5, y: startY }
                    };
                    if (node.shape && node.shape.type === 'Image') {
                        (annotation1.offset as PointModel).x = 0;
                        annotation1.margin = { left: 110 };
                        annotation1.horizontalAlignment = 'Left';
                    }
                    if (count === 0) {
                        annotation1.style = { fontSize: 14, bold: true };
                    }
                    startY += 0.2;
                    annotations.push(annotation1);
                    count++;
                }
                if (annotations.length > 0) {
                    selectedItem.selectedDiagram.addLabels(node, annotations);
                }
                let content: string = '';
                if (additionalFields.length > 0) {
                    for (const field of additionalFields) {
                        if (nodeInfo[field].value) {
                            content = content + field + ':' + nodeInfo[field].value + '\n';
                        }
                    }
                }
                if (content) {
                    node.tooltip = { "content": content, "position": 'BottomCenter', "relativeMode": 'Object' };
                    node.constraints = NodeConstraints.Default | NodeConstraints.Tooltip;
                } else {
                    node.constraints = NodeConstraints.Default & ~NodeConstraints.Tooltip;
                }
            }
        }
        selectedItem.selectedDiagram.dataBind();
        selectedItem.selectedDiagram.doLayout();
        selectedItem.isModified = true;
        selectedItem.selectedDiagram.constraints = selectedItem.selectedDiagram.constraints |= DiagramConstraints.UndoRedo;
    }

    private hideMenuItems(): void {
        const btnWindow = (document.getElementById('diagram-menu') as any).ej2_instances[0].items[4];
        btnWindow.items[1].iconCss = '';
        const btnView = (document.getElementById('diagram-menu') as any).ej2_instances[0].items[2]
        btnView.items[7].iconCss = '';
    }

    private removeSubChild(node: Node, selectedItem: SelectorViewModel): void {
        const diagram: Diagram = selectedItem.selectedDiagram;
        for (let i: number = node.outEdges.length - 1; i >= 0; i--) {
            const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.outEdges[i]) as Connector;
            const childNode: Node = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID) as Node;
            if (childNode != null && childNode.outEdges.length > 0) {
                this.removeSubChild(childNode, selectedItem);
            } else {
                diagram.remove(childNode);
            }
        }
        for (let j: number = node.inEdges.length - 1; j >= 0; j--) {
            const connector: Connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[j]) as Connector;
            const childNode: Node = MindMapUtilityMethods.getNode(diagram.nodes, connector.sourceID) as Node;
            let index: number = childNode.outEdges.indexOf(connector.id);
            if (childNode.outEdges.length > 1 && index === 0) {
                index = childNode.outEdges.length;
            }
            if (index > 0) {
                const node1: string = childNode.outEdges[index - 1] as string;
                const connector1: any = diagram.getObject(node1);
                const node2: Node = MindMapUtilityMethods.getNode(diagram.nodes, connector1.targetID) as Node;
                diagram.select([node2]);
            } else {
                diagram.select([childNode]);
            }
        }
        diagram.remove(node);
    }

     createShortCutDiv(diagramType: string) {
        let shortCut = document.getElementById('customShortcutDiv');
        if (!shortCut) {
            let div: HTMLDivElement = document.createElement('div');
            div.id = 'customShortcutDiv';
            div.innerHTML = this.getShortCutDiv(diagramType);
            div.style.zIndex = '10000';
            div.style.position = 'absolute';
            div.style.userSelect = 'none';
            div.style.cursor = 'move';
            document.body.appendChild(div);
            // Make the div draggable
            let isDragging = false;
            let offsetX: number, offsetY: number;
            div.addEventListener('mousedown', function (e) {
                isDragging = true;
                offsetX = e.clientX - div.offsetLeft;
                offsetY = e.clientY - div.offsetTop;
            });
            document.addEventListener('mousemove', function (e) {
                if (isDragging) {
                    div.style.left = (e.clientX - offsetX) + 'px';
                    div.style.top = (e.clientY - offsetY) + 'px';
                }
            });
            document.addEventListener('mouseup', function () {
                isDragging = false;
            });
            ((document.getElementById('customShortcutDiv') as HTMLElement).querySelector('#closeIconDiv') as HTMLElement).onclick = this.toggleShortcutVisibility.bind(this);
        } else if (shortCut && shortCut.style.display !== 'block') {
            shortCut.style.display = 'block';
        }
    }
    getShortCutDiv(diagramType: string): string {
        let shortcuts =[];
        if (diagramType === 'orgchart-diagram') {
            shortcuts = [
                { key: 'Tab', text: 'Add a child to parent' },
                { key: 'Enter', text: 'Add a child to the same level' },
                { key: 'Shift + Tab', text: 'Move the child parent to the next level' },
                { key: 'Delete', text: 'Delete a topic' },
                { key: 'F2', text: 'Edit a topic' },
                { key: 'Esc', text: 'End text editing' },
                { key: 'Arrow (Up, Down, Left, Right)', text: 'Navigate between topics' },
                { key: 'F1', text: 'Show/Hide shortcut Key' }
            ];
        }
        else {
            shortcuts = [
                { key: 'Tab', text: 'Add a child to parent' },
                { key: 'Enter', text: 'Add a child to the same level' },
                { key: 'Shift + Tab', text: 'Add a child to parent in right side' },
                { key: 'Delete', text: 'Delete a topic' },
                { key: 'F2', text: 'Edit a topic' },
                { key: 'Esc', text: 'End text editing' },
                { key: 'Arrow (Up, Down, Left, Right)', text: 'Navigate between topics' },
                { key: 'F1', text: 'Show/Hide shortcut Key' }
            ];
        }

        return `
            <div style="width: 400px; height: 300px; padding: 10px; background-color: #FFF7B5; border: 1px solid #FFF7B5">
                <div id="closeIconDiv" style="float: right; width: 22px; height: 22px; border: 1px solid #FFF7B5">
                    <span class="sf-icon-Close" style="font-size:14px;cursor:pointer;"></span>
                </div>
                <div>
                    <span class="db-html-font-medium">Quick shortcuts</span>
                </div>
                <div style="padding-top:10px">
                    ${shortcuts
                    .map(({ key, text }) => `
                        <div>
                            <ul>
                                <li>
                                    <span class="db-html-font-medium">${key} : </span>
                                    <span class="db-html-font-normal">${text}</span>
                                </li>
                            </ul>
                        </div>`)
                    .join('')}
                </div>
            </div>
        `;
    }
    toggleShortcutVisibility() {
        const shortcutDiv = document.getElementById('customShortcutDiv');
        if (shortcutDiv) {
            shortcutDiv.style.display = (shortcutDiv.style.display === 'block' || shortcutDiv.style.display === '') ? 'none' : 'block';
        }
    }
    hideShortcutVisibility() {
        const shortcutDiv = document.getElementById('customShortcutDiv');
        if (shortcutDiv) {
            shortcutDiv.style.display = 'none';
        }
    }
    showShortcutVisibility() {
        const shortcutDiv = document.getElementById('customShortcutDiv');
        if (shortcutDiv) {
            shortcutDiv.style.display = 'block';
        }
    }

    updatePalette(diagram: Diagram) {
        const diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
        const propertyContainer = document.getElementsByClassName('db-property-editor-container')[0];
        if (diagramContainer.classList.contains('hide-palette')) {
            diagramContainer.classList.remove('hide-palette');
            diagramContainer.classList.remove('custom-diagram');
            diagram.updateViewPort();
        }
        if (propertyContainer.classList.contains('orgchart-diagram')) {
            propertyContainer.classList.remove('orgchart-diagram');
        } else if (propertyContainer.classList.contains('mindmap-diagram')) {
            propertyContainer.classList.remove('mindmap-diagram')
        }
    }

    resetZoomTo100(diagram: Diagram) {
        const currentZoom: number = diagram.scrollSettings.currentZoom as number;
        if (currentZoom !== 1) {
            const zoom = { zoomFactor: (1 / currentZoom) - 1 };
            diagram.zoomTo(zoom);
            let zoomCurrentValue = (document.getElementById("btnZoomIncrement") as any).ej2_instances[0];
            zoomCurrentValue.content = ((diagram.scrollSettings.currentZoom as number)* 100).toFixed() + '%';
        }
    }

     updatePages(selectedItem: SelectorViewModel, type: string) {
        let page = new PageCreation(selectedItem);
        let diagramString = selectedItem.selectedDiagram.saveDiagram();
        let diagramObject = JSON.parse(diagramString);
        let pageOption = { text: 'Page1', name: 'page1', diagram: JSON.parse(selectedItem.selectedDiagram.saveDiagram()) };
        diagramObject.activePage = 'page1';
        diagramObject.pageOptionList = [pageOption];
        diagramObject.diagramType = type;
        page.loadPage(JSON.stringify(diagramObject));
    }

    updateDiagramViews(selectedItem: SelectorViewModel){
        // While calling diagram refresh, the overview is removed from the diagram views causing diagram not visible after load or creating new page.
        const diagram = selectedItem.selectedDiagram;
        const overview = (document.getElementById('overview') as any).ej2_instances[0];
        if (diagram.views.length === 1 && diagram.views[0] !== 'overview') {
            diagram.views.push(overview.element.id);
            diagram.views[overview.element.id] = overview;
        }
    }

}