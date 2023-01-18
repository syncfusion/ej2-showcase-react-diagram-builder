import { Node, Connector, ShapeAnnotation, PathAnnotation } from '@syncfusion/ej2-diagrams';
import { MindMapUtilityMethods } from './mindmap';
import { OrgChartUtilityMethods } from './orgchart';
export class DiagramClientSideEvents {
    constructor(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }
    selectionChange(args) {
        const diagram = this.selectedItem.selectedDiagram;
        if (this.selectedItem.preventSelectionChange || this.selectedItem.isLoading) {
            return;
        }
        if (args.state === 'Changed') {
            if (this.selectedItem.diagramType === 'MindMap') {
                if (args.newValue.length === 1 && diagram.selectedItems.nodes.length === 1) {
                    const node = args.newValue[0];
                    diagram.selectedItems.userHandles[0].visible = false;
                    diagram.selectedItems.userHandles[1].visible = false;
                    diagram.selectedItems.userHandles[2].visible = false;
                    if (node.id !== 'textNode' && !(node instanceof Connector)) {
                        const addInfo = node.addInfo;
                        if (node.id === 'rootNode') {
                            diagram.selectedItems.userHandles[0].visible = true;
                            diagram.selectedItems.userHandles[1].visible = true;
                        }
                        else if (addInfo.orientation.toString() === 'Left') {
                            diagram.selectedItems.userHandles[0].visible = true;
                            diagram.selectedItems.userHandles[2].visible = true;
                            diagram.selectedItems.userHandles[2].side = 'Left';
                        }
                        else {
                            diagram.selectedItems.userHandles[1].visible = true;
                            diagram.selectedItems.userHandles[2].visible = true;
                            diagram.selectedItems.userHandles[2].side = 'Right';
                        }
                        this.selectedItem.utilityMethods.bindMindMapProperties(node, this.selectedItem);
                    }
                    if (node.addInfo && node.addInfo.level !== undefined) {
                        this.selectedItem.mindmapSettings.levelType.value = 'Level' + node.addInfo.level;
                    }
                }
            }
            else if (this.selectedItem.diagramType === 'OrgChart') {
                if (args.newValue.length === 1) {
                    const node = args.newValue[0];
                    diagram.selectedItems.userHandles[0].visible = false;
                    diagram.selectedItems.userHandles[1].visible = false;
                    diagram.selectedItems.userHandles[2].visible = false;
                    if (node.id !== 'textNode' && node instanceof Node) {
                        diagram.selectedItems.userHandles[0].visible = true;
                        diagram.selectedItems.userHandles[1].visible = true;
                        diagram.selectedItems.userHandles[2].visible = true;
                    }
                }
            }
            else {
                let selectedItems = this.selectedItem.selectedDiagram.selectedItems.nodes;
                selectedItems = selectedItems.concat(this.selectedItem.selectedDiagram.selectedItems.connectors);
                this.selectedItem.utilityMethods.enableToolbarItems(selectedItems);
                const nodeContainer = document.getElementById('nodePropertyContainer');
                nodeContainer.classList.remove('multiple');
                nodeContainer.classList.remove('connector');
                if (selectedItems.length > 1) {
                    this.multipleSelectionSettings(selectedItems);
                }
                else if (selectedItems.length === 1) {
                    this.singleSelectionSettings(selectedItems[0]);
                }
                else {
                    this.selectedItem.utilityMethods.objectTypeChange('diagram');
                }
            }
        }
    }
    nodePositionChange(args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.offsetX.value = (Math.round(args.newValue.offsetX * 100) / 100);
        this.selectedItem.nodeProperties.offsetY.value = (Math.round(args.newValue.offsetY * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }
    nodeSizeChange(args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.width.value = (Math.round(args.newValue.width * 100) / 100);
        this.selectedItem.nodeProperties.height.value = (Math.round(args.newValue.height * 100) / 100);
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
            this.selectedItem.preventPropertyChange = false;
        }
    }
    textEdit(args) {
        if (this.selectedItem.diagramType === 'MindMap') {
            const context = this;
            setTimeout(() => { context.selectedItem.selectedDiagram.doLayout(); }, 10);
        }
        this.selectedItem.isModified = true;
    }
    ;
    scrollChange(args) {
        this.selectedItem.scrollSettings.currentZoom = (args.newValue.CurrentZoom * 100).toFixed() + '%';
    }
    nodeRotationChange(args) {
        this.selectedItem.preventPropertyChange = true;
        this.selectedItem.nodeProperties.rotateAngle.value = (Math.round(args.newValue.rotateAngle * 100) / 100);
        this.selectedItem.preventPropertyChange = false;
        if (args.state === 'Completed') {
            this.selectedItem.isModified = true;
        }
    }
    diagramContextMenuClick(args) {
        const diagram = this.selectedItem.selectedDiagram;
        this.selectedItem.customContextMenu.updateBpmnShape(diagram, args.item);
        const text = args.item.text;
        if (text === 'Group' || text === 'Un Group' || text === 'Undo' || text === 'Redo' || text === 'Select All') {
            this.selectedItem.isModified = true;
            if (this.selectedItem.diagramType === 'MindMap' || this.selectedItem.diagramType === 'OrgChart') {
                if (text === 'Undo' || text === 'Redo') {
                    args.cancel = true;
                    if (text === 'Undo') {
                        this.selectedItem.utilityMethods.undoRedoLayout(true, this.selectedItem);
                    }
                    else if (text === 'Redo') {
                        this.selectedItem.utilityMethods.undoRedoLayout(false, this.selectedItem);
                    }
                }
            }
        }
        if (this.selectedItem.diagramType === 'MindMap' || this.selectedItem.diagramType === 'OrgChart') {
            if (text === 'Copy') {
                this.selectedItem.utilityMethods.copyLayout(this.selectedItem);
            }
            else if (text === 'Cut') {
                args.cancel = true;
                this.selectedItem.utilityMethods.cutLayout(this.selectedItem);
            }
            else if (text === 'Paste') {
                args.cancel = true;
                this.selectedItem.utilityMethods.pasteLayout(this.selectedItem);
            }
        }
    }
    dragEnter(args) {
        const obj = args.element;
        const ratio = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
    }
    historyChange(args) {
        const diagram = this.selectedItem.selectedDiagram;
        const toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
    }
    multipleSelectionSettings(selectedItems) {
        this.selectedItem.utilityMethods.objectTypeChange('None');
        let showConnectorPanel = false;
        let showNodePanel = false;
        let showTextPanel = false;
        let showConTextPanel = false;
        const nodeContainer = document.getElementById('nodePropertyContainer');
        for (const item of selectedItems) {
            const object = item;
            if (object instanceof Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
            else if (object instanceof Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        const selectItem1 = this.selectedItem.selectedDiagram.selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.selectedItem.utilityMethods.bindNodeProperties(selectItem1.nodes[0], this.selectedItem);
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            this.selectedItem.utilityMethods.bindConnectorProperties(selectItem1.connectors[0], this.selectedItem);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            }
            else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getConnectorTextPositions();
                    // this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                }
                else {
                    this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                    // this.selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, this.selectedItem);
                }
                this.ddlTextPosition.dataBind();
            }
        }
    }
    singleSelectionSettings(selectedObject) {
        let object = null;
        if (selectedObject instanceof Node) {
            this.selectedItem.utilityMethods.objectTypeChange('node');
            object = selectedObject;
            this.selectedItem.utilityMethods.bindNodeProperties(object, this.selectedItem);
        }
        else if (selectedObject instanceof Connector) {
            this.selectedItem.utilityMethods.objectTypeChange('connector');
            object = selectedObject;
            this.selectedItem.utilityMethods.bindConnectorProperties(object, this.selectedItem);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            this.selectedItem.utilityMethods.bindTextProperties(object.style, this.selectedItem);
        }
        else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            let annotation;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            this.selectedItem.utilityMethods.bindTextProperties(object.annotations[0].style, this.selectedItem);
            this.selectedItem.utilityMethods.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ShapeAnnotation) {
                annotation = object.annotations[0];
                this.ddlTextPosition.dataSource = this.selectedItem.textProperties.getNodeTextPositions();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition;
                this.ddlTextPosition.dataBind();
                this.ddlTextPosition.value = this.selectedItem.textProperties.textPosition = this.selectedItem.utilityMethods.getPosition(annotation.offset);
                this.ddlTextPosition.dataBind();
            }
            else if (object.annotations[0] instanceof PathAnnotation) {
                annotation = object.annotations[0];
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
    constructor(selectedItem, page) {
        this.selectedItem = selectedItem;
        this.page = page;
    }
    pageBreaksChange(args) {
        if (args.event) {
            this.selectedItem.pageSettings.pageBreaks = args.checked;
            this.selectedItem.selectedDiagram.pageSettings.showPageBreaks = args.checked;
        }
    }
    paperListChange(args) {
        if (args.element) {
            const diagram = this.selectedItem.selectedDiagram;
            document.getElementById('pageDimension').style.display = 'none';
            document.getElementById('pageOrientation').style.display = '';
            this.selectedItem.pageSettings.paperSize = args.value;
            const paperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.pageSettings.paperSize);
            let pageWidth = paperSize.pageWidth;
            let pageHeight = paperSize.pageHeight;
            if (pageWidth && pageHeight) {
                if (this.selectedItem.pageSettings.isPortrait) {
                    if (pageWidth > pageHeight) {
                        const temp = pageWidth;
                        pageWidth = pageHeight;
                        pageHeight = temp;
                    }
                }
                else {
                    if (pageHeight > pageWidth) {
                        const temp = pageHeight;
                        pageHeight = pageWidth;
                        pageWidth = temp;
                    }
                }
                diagram.pageSettings.width = pageWidth;
                diagram.pageSettings.height = pageHeight;
                this.selectedItem.pageSettings.pageWidth = pageWidth;
                this.selectedItem.pageSettings.pageHeight = pageHeight;
                diagram.dataBind();
            }
            else {
                document.getElementById('pageOrientation').style.display = 'none';
                document.getElementById('pageDimension').style.display = '';
            }
        }
    }
    pageDimensionChange(args) {
        if (args.event) {
            let pageWidth = Number(this.selectedItem.pageSettings.pageWidth);
            let pageHeight = Number(this.selectedItem.pageSettings.pageHeight);
            let target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            const diagram = this.selectedItem.selectedDiagram;
            if (target.id === 'pageWidth') {
                pageWidth = Number(target.value);
            }
            else {
                pageHeight = Number(target.value);
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    this.selectedItem.pageSettings.isPortrait = false;
                    this.selectedItem.pageSettings.isLandscape = true;
                    diagram.pageSettings.orientation = 'Landscape';
                }
                else {
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
    pageOrientationChange(args) {
        if (args.event) {
            // const pageWidth: number = Number(this.selectedItem.pageSettings.pageWidth);
            //  const pageHeight: number = Number(this.selectedItem.pageSettings.pageHeight);
            const target = args.event.target;
            const diagram = this.selectedItem.selectedDiagram;
            // eslint-disable-next-line
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
            this.selectedItem.pageSettings.pageWidth = diagram.pageSettings.width;
            this.selectedItem.pageSettings.pageHeight = diagram.pageSettings.height;
        }
    }
    pageBackgroundChange1(args) {
        if (args.currentValue) {
            // const target: HTMLInputElement = args.target as HTMLInputElement; 
            const diagram = this.selectedItem.selectedDiagram;
            diagram.pageSettings.background = {
                color: args.currentValue.rgba
            };
            diagram.dataBind();
        }
    }
    textPositionChange(args) {
        if (args.value !== null) {
            this.textPropertyChange('textPosition', args.value);
        }
    }
    toolbarTextStyleChange(args) {
        this.textPropertyChange(args.item.tooltipText, false);
    }
    toolbarTextSubAlignChange(args) {
        const propertyName = args.item.tooltipText.replace(/[' ']/g, '');
        this.textPropertyChange(propertyName, propertyName);
    }
    toolbarTextAlignChange(args) {
        const propertyName = args.item.tooltipText.replace('Align ', '');
        this.textPropertyChange(propertyName, propertyName);
    }
    textPropertyChange(propertyName, propertyValue) {
        if (!this.selectedItem.preventPropertyChange) {
            const diagram = this.selectedItem.selectedDiagram;
            let selectedObjects = diagram.selectedItems.nodes;
            selectedObjects = selectedObjects.concat(diagram.selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (const item of selectedObjects) {
                    const node = item;
                    if (node instanceof Node || node instanceof Connector) {
                        if (node.annotations.length > 0) {
                            for (const value of node.annotations) {
                                let annotation = null;
                                if (value instanceof ShapeAnnotation) {
                                    annotation = value;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = this.selectedItem.utilityMethods.getOffset(propertyValue);
                                    }
                                }
                                else if (value instanceof PathAnnotation) {
                                    annotation = value;
                                    if (propertyName === 'textposition') {
                                        this.selectedItem.textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = this.selectedItem.textProperties.textPosition;
                                    }
                                }
                                if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                                    annotation.horizontalAlignment = propertyValue;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'top' || propertyName === 'bottom') {
                                    annotation.verticalAlignment = propertyValue;
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'middle') {
                                    annotation.verticalAlignment = 'Center';
                                    this.selectedItem.utilityMethods.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else {
                                    this.updateTextProperties(propertyName, propertyValue, annotation.style);
                                }
                            }
                        }
                        else if (node.shape && node.shape.type === 'Text') {
                            this.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                }
                diagram.dataBind();
                this.selectedItem.isModified = true;
            }
        }
    }
    updateTextProperties(propertyName, propertyValue, annotation) {
        // eslint-disable-next-line
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
                annotation.textAlign = propertyValue.toString().replace('AlignText', '');
                this.selectedItem.utilityMethods.updateTextAlign(annotation.textAlign);
                break;
        }
    }
    updateToolbarState(toolbarName, isSelected, index) {
        let toolbarTextStyle = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            const cssClass = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
    }
}
export class MindMapPropertyBinding {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }
    mindmapTextStyleChange(args) {
        this.updateMindMapTextStyle(args.item.tooltipText.toLowerCase(), false);
    }
    updateMindMapTextStyle(propertyName, propertyValue) {
        const diagram = this.selectedItem.selectedDiagram;
        if (diagram.nodes.length > 0) {
            for (const value of diagram.nodes) {
                const node = value;
                if (node.addInfo && node.annotations.length > 0) {
                    const annotation = node.annotations[0].style;
                    const addInfo = node.addInfo;
                    const levelType = this.selectedItem.mindmapSettings.levelType.value;
                    if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                    // eslint-disable-next-line
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
    mindmapPatternChange(args) {
        const target = args.target;
        const diagram = this.selectedItem.selectedDiagram;
        diagram.historyManager.startGroupAction();
        for (const item of this.selectedItem.selectedDiagram.nodes) {
            const node = item;
            if (node.id !== 'textNode') {
                if (target.className === 'mindmap-pattern-style mindmap-pattern1') {
                    if (node.id === 'rootNode') {
                        node.height = 50;
                    }
                    else {
                        node.height = 20;
                    }
                }
                else {
                    node.height = 50;
                }
            }
            this.selectedItem.selectedDiagram.dataBind();
        }
        for (const value of this.selectedItem.selectedDiagram.connectors) {
            const connector = value;
            // eslint-disable-next-line
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
        diagram.historyManager.endGroupAction();
        this.selectedItem.selectedDiagram.doLayout();
        this.selectedItem.isModified = true;
    }
}
export class OrgChartPropertyBinding {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }
    orgDropDownChange(args) {
        if (args.element) {
            const value = args.value ? args.value.toString() : '';
            if (args.element.id === 'employeeId') {
                this.selectedItem.orgDataSettings.id = value;
            }
            else if (args.element.id === 'superVisorId') {
                this.selectedItem.orgDataSettings.parent = value;
            }
            else if (args.element.id === 'orgNameField') {
                this.selectedItem.orgDataSettings.nameField = value;
            }
            else if (args.element.id === 'orgImageField') {
                this.selectedItem.orgDataSettings.imageField = value;
            }
        }
    }
    orgMultiSelectChange(args) {
        if (args.element) {
            if (args.element.id === 'orgAdditionalField') {
                this.selectedItem.orgDataSettings.additionalFields = args.value;
            }
            else if (args.element.id === 'orgBindingFields') {
                this.selectedItem.orgDataSettings.bindingFields = args.value;
            }
        }
    }
    orgChartSpacingChange(args) {
        if (args.event) {
            let target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            if (target.id === 'orgHorizontalSpacing') {
                this.selectedItem.selectedDiagram.layout.horizontalSpacing = args.value;
            }
            else {
                this.selectedItem.selectedDiagram.layout.verticalSpacing = args.value;
            }
        }
    }
    orgChartAligmentChange(args) {
        const diagram = this.selectedItem.selectedDiagram;
        const commandType = args.item.tooltipText.replace(/[' ']/g, '').toLowerCase();
        // eslint-disable-next-line
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
    layoutOrientationChange(args) {
        const target = args.target;
        // eslint-disable-next-line
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
    layoutPatternChange(args) {
        const target = args.target;
        const bindingFields = target.id === 'orgPattern2' || target.id === 'orgPattern4' ? true : false;
        const imageField = target.id === 'orgPattern3' || target.id === 'orgPattern4' ? true : false;
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, bindingFields, imageField);
    }
    getTooltipContent(args) {
        if (args.target) {
            if (args.target.classList.contains('db-employee-id')) {
                return 'Defines a unique column from the data source.';
            }
            else if (args.target.classList.contains('db-supervisor-id')) {
                return 'Defines a column that is used to identify the person to whom the employee reports to.';
            }
            else if (args.target.classList.contains('db-nameField-id')) {
                return 'Defines a column that has an employee name, and it appears at the top of the shapes.';
            }
            else if (args.target.classList.contains('db-bindingField-id')) {
                return 'Defines columns that have employees’ contact information, and appear after the employees’ names in the shape.';
            }
            else if (args.target.classList.contains('db-imageField-id')) {
                return 'Defines a column that has the picture of an employee.';
            }
            else if (args.target.classList.contains('db-additionalField-id')) {
                return 'Defines columns that should be displayed through a tooltip.';
            }
        }
        return '';
    }
}