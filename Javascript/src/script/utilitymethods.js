/**
 *  Home page handler
 */
 import { NodeConstraints, Node, SelectorConstraints } from '@syncfusion/ej2-diagrams';
 import { MindMapUtilityMethods, MindMap } from './mindmap';
 import { OrgChartUtilityMethods, OrgChartData } from './orgchart';
 import { Ajax } from '@syncfusion/ej2-base';
 import { CommonKeyboardCommands } from './commoncommands';
 // import { getCreditCardFlow } from "./../../public/CreditCardFlow.json"
 export class PaperSize {
 }
 export class UtilityMethods {
     constructor() {
         this.fillColorCode = ['#C4F2E8', '#F7E0B3', '#E5FEE4', '#E9D4F1', '#D4EFED', '#DEE2FF'];
         this.borderColorCode = ['#8BC1B7', '#E2C180', '#ACCBAA', '#D1AFDF', '#90C8C2', '#BBBFD6'];
         this.flowChartImage = [
             { source: './blank_diagram.svg', name: 'Blank Diagram', type: 'svg_blank' },
             { source: './flowchart_Images/Credit_Card_Processing.svg', name: 'Credit Card Processing', type: 'svg_image' },
             { source: './flowchart_Images/Bank_Teller_Flow.svg', name: 'Banking Teller Process Flow', type: 'svg_image' },
             { source: './flowchart_Images/Developer_Workflow.SVG', name: 'Agile"s Developer Workflow', type: 'svg_image' },
         ];
         this.mindMapImage = [
             { source: './common_images/blank_diagram_mind.svg', name: 'Blank Diagram', type: 'svg_image' },
             { source: './mindmap_images/BusinessPlanning.SVG', name: 'Business Planning', type: 'svg_image' },
             { source: './mindmap_images/TQM.SVG', name: 'Quality Management', type: 'svg_image' },
             { source: './mindmap_images/SoftwareLifeCycle.SVG', name: 'Software Life Cycle', type: 'svg_image' },
         ];
         this.orgChartImage = [
             { source: './common_images/blank_diagram_org.svg', name: 'Blank Diagram', type: 'svg_image' },
             { source: './orgchart_images/OrgRenderingStyle_1.svg', name: 'Org Template Style - 1', type: 'svg_image' },
             { source: './orgchart_images/OrgRenderingStyle_2.svg', name: 'Org Template Style - 2', type: 'svg_image' },
             { source: './orgchart_images/OrgRenderingStyle_3.svg', name: 'Org Template Style - 3', type: 'svg_image' },
         ];
         this.bpmnImage = [
             { source: '../assets/dbstyle/common_images/blank_diagram.svg', name: 'Blank Diagram', type: 'svg_blank' },
             { source: '../assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 1' },
             { source: '../assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 2' },
             { source: '../assets/dbstyle/bpmn_images/Template1.png', name: 'BPMN Diagram 3' },
         ];
     }
     bindNodeProperties(node, selectedItem) {
         selectedItem.preventPropertyChange = true;
         selectedItem.nodeProperties.offsetX.value = (Math.round(node.offsetX * 100) / 100);
         selectedItem.nodeProperties.offsetY.value = (Math.round(node.offsetY * 100) / 100);
         selectedItem.nodeProperties.width.value = node.width ? (Math.round(node.width * 100) / 100) : (Math.round(node.minWidth * 100) / 100);
         selectedItem.nodeProperties.height.value = node.height ? (Math.round(node.height * 100) / 100) : (Math.round(node.minHeight * 100) / 100);
         selectedItem.nodeProperties.rotateAngle.value = node.rotateAngle;
         selectedItem.nodeProperties.strokeColor.value = this.getHexColor(node.style.strokeColor);
         selectedItem.nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : 'None';
         selectedItem.nodeProperties.strokeWidth.value = node.style.strokeWidth;
         selectedItem.nodeProperties.fillColor.value = this.getHexColor(node.style.fill);
         selectedItem.nodeProperties.opacity.value = node.style.opacity * 100;
         selectedItem.nodeProperties.opacityText = selectedItem.nodeProperties.opacity.value + '%';
         selectedItem.nodeProperties.aspectRatio.checked = node.constraints & NodeConstraints.AspectRatio ? true : false;
         selectedItem.nodeProperties.gradient = node.style.gradient.type !== 'None' ? true : false;
         const gradientElement = document.getElementById('gradientStyle');
         if (selectedItem.nodeProperties.gradient) {
             gradientElement.className = 'row db-prop-row db-gradient-style-show';
             selectedItem.nodeProperties.gradientColor.value = node.style.gradient.stops[1].color;
             const gradient = node.style.gradient;
             if (gradient.x1) {
                 selectedItem.nodeProperties.gradientDirection.value = 'North';
             }
             else if (gradient.x2) {
                 selectedItem.nodeProperties.gradientDirection.value = 'East';
             }
             else if (gradient.y1) {
                 selectedItem.nodeProperties.gradientDirection.value = 'West';
             }
             else if (gradient.y2) {
                 selectedItem.nodeProperties.gradientDirection.value = 'South';
             }
         }
         else {
             gradientElement.className = 'row db-prop-row db-gradient-style-hide';
             selectedItem.nodeProperties.gradientColor.value = '#ffffff';
             selectedItem.nodeProperties.gradientDirection.value = 'South';
         }
         selectedItem.preventPropertyChange = false;
     }
     bindMindMapProperties(node, selectedItem) {
         selectedItem.preventPropertyChange = true;
         selectedItem.mindmapSettings.stroke.value = node.style.strokeColor;
         selectedItem.mindmapSettings.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : 'None';
         selectedItem.mindmapSettings.strokeWidth.value = node.style.strokeWidth;
         selectedItem.mindmapSettings.fill.value = node.style.fill;
         selectedItem.mindmapSettings.opacity.value = (node.style.opacity || 1) * 100;
         selectedItem.mindmapSettings.opacityText = (selectedItem.mindmapSettings.opacity || '100') + '%';
         if (node.annotations.length > 0) {
             const annotation = node.annotations[0].style;
             selectedItem.mindmapSettings.fontFamily.value = annotation.fontFamily;
             selectedItem.mindmapSettings.fontColor.value = annotation.color;
             selectedItem.mindmapSettings.fontSize.value = annotation.fontSize;
             selectedItem.mindmapSettings.textOpacity.value = (annotation.opacity || 1) * 100;
             selectedItem.mindmapSettings.textOpacityText = (selectedItem.mindmapSettings.textOpacity || '100') + '%';
         }
         selectedItem.preventPropertyChange = false;
     }
     bindTextProperties(text, selectedItem) {
         selectedItem.preventPropertyChange = true;
         selectedItem.textProperties.fontColor.value = this.getHexColor(text.color);
         selectedItem.textProperties.fontFamily.value = text.fontFamily;
         selectedItem.textProperties.fontSize.value = text.fontSize;
         selectedItem.textProperties.opacity.value = text.opacity * 100;
         selectedItem.textProperties.opacityText = selectedItem.textProperties.opacity + '%';
         let toolbarTextStyle = document.getElementById('toolbarTextStyle');
         if (toolbarTextStyle) {
             toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
         }
         if (toolbarTextStyle) {
             toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
             toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
             toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
         }
         this.updateTextAlign(text.textAlign);
         selectedItem.preventPropertyChange = false;
     }
     updateTextAlign(textAlign) {
         let toolbarTextSubAlignment = document.getElementById('toolbarTextSubAlignment');
         if (toolbarTextSubAlignment) {
             toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
         }
         if (toolbarTextSubAlignment) {
             for (const toolbarText of toolbarTextSubAlignment.items) {
                 toolbarText.cssClass = toolbarText.cssClass.replace(' tb-item-selected', '');
             }
             const index = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2);
             toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
         }
     }
     updateHorVertAlign(horizontalAlignment, verticalAlignment) {
         let toolbarHorVerAlignment = document.getElementById('toolbarTextAlignment');
         if (toolbarHorVerAlignment) {
             toolbarHorVerAlignment = toolbarHorVerAlignment.ej2_instances[0];
         }
         if (toolbarHorVerAlignment) {
             for (const toolbarHorVer of toolbarHorVerAlignment.items) {
                 toolbarHorVer.cssClass = toolbarHorVer.cssClass.replace(' tb-item-selected', '');
             }
             let index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
             toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
             index = verticalAlignment === 'Bottom' ? 3 : (verticalAlignment === 'Center' ? 4 : 5);
             toolbarHorVerAlignment.items[index].cssClass = toolbarHorVerAlignment.items[index].cssClass + ' tb-item-selected';
         }
     }
     bindConnectorProperties(connector, selectedItem) {
         selectedItem.preventPropertyChange = true;
         selectedItem.connectorProperties.lineColor.value = this.getHexColor(connector.style.strokeColor);
         selectedItem.connectorProperties.lineStyle.value = connector.style.strokeDashArray ? connector.style.strokeDashArray : 'None';
         selectedItem.connectorProperties.lineType.value = connector.type;
         selectedItem.connectorProperties.lineWidth.value = connector.style.strokeWidth;
         selectedItem.connectorProperties.sourceType.value = connector.sourceDecorator.shape;
         selectedItem.connectorProperties.targetType.value = connector.targetDecorator.shape;
         selectedItem.connectorProperties.opacity.value = connector.style.opacity * 100;
         selectedItem.connectorProperties.opacityText = selectedItem.connectorProperties.opacity + '%';
         selectedItem.connectorProperties.lineJumpSize.value = connector.bridgeSpace;
         selectedItem.connectorProperties.lineJump.value = connector.constraints ? true : false;
         if (selectedItem.connectorProperties.lineJump.value) {
             document.getElementById('lineJumpSizeDiv').style.display = '';
         }
         else {
             document.getElementById('lineJumpSizeDiv').style.display = 'none';
         }
         selectedItem.connectorProperties.targetSize.value = connector.targetDecorator.width;
         selectedItem.connectorProperties.sourceSize.value = connector.sourceDecorator.width;
         selectedItem.preventPropertyChange = false;
     }
     getHexColor(colorStr) {
         const colors = [];
         // let a: HTMLDivElement = document.createElement('div');
         // a.style.color = colorStr;
         // let colors: number[] = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(
         //     (a: string): number => {
         //         return parseInt(a, 10);
         //     }
         // );
         // document.body.removeChild(a);
         return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
     }
     getOffset(position) {
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
     getPosition(offset) {
         if (offset.x === 0 && offset.y === 0) {
             return 'TopLeft';
         }
         else if (offset.x === 0.5 && offset.y === 0) {
             return 'TopCenter';
         }
         else if (offset.x === 1 && offset.y === 0) {
             return 'TopRight';
         }
         else if (offset.x === 0 && offset.y === 0.5) {
             return 'MiddleLeft';
         }
         else if (offset.x === 1 && offset.y === 0.5) {
             return 'MiddleRight';
         }
         else if (offset.x === 0 && offset.y === 1) {
             return 'BottomLeft';
         }
         else if (offset.x === 0.5 && offset.y === 1) {
             return 'BottomCenter';
         }
         else if (offset.x === 1 && offset.y === 1) {
             return 'BottomRight';
         }
         else {
             return 'Center';
         }
     }
     hideElements(elementType, diagram, diagramType) {
         const diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
         if (diagramContainer.classList.contains(elementType)) {
             if (!(diagramType === 'mindmap-diagram' || diagramType === 'orgchart-diagram')) {
                 diagramContainer.classList.remove(elementType);
             }
         }
         else {
             diagramContainer.classList.add(elementType);
         }
         if (diagram) {
             diagram.updateViewPort();
         }
     }
     objectTypeChange(objectType) {
         document.getElementById('diagramPropertyContainer').style.display = 'none';
         document.getElementById('nodePropertyContainer').style.display = 'none';
         document.getElementById('textPropertyContainer').style.display = 'none';
         document.getElementById('connectorPropertyContainer').style.display = 'none';
         // eslint-disable-next-line
         switch (objectType) {
             case 'diagram':
                 document.getElementById('diagramPropertyContainer').style.display = '';
                 break;
             case 'node':
                 document.getElementById('nodePropertyContainer').style.display = '';
                 break;
             case 'connector':
                 document.getElementById('connectorPropertyContainer').style.display = '';
                 break;
         }
     }
     getDefaultDiagramTemplates1(selectedItem, tempCount, backgroundColor, parentId) {
         let i;
         let j;
         tempCount = tempCount ? tempCount : 4;
         backgroundColor = backgroundColor ? backgroundColor : 'red';
         parentId = parentId ? parentId : 'Flow Chart';
         let parentDiv = document.getElementById('diagramTemplateDiv1');
         parentDiv = parentDiv.cloneNode(true);
         parentDiv.id = '';
         parentDiv.style.display = '';
         const parentElements = parentDiv.getElementsByClassName('db-diagram-template-parent-text');
         for (i = 0; i < parentElements.length; i++) {
             if (parentElements[i].children[0].innerHTML.trim() === parentId) {
                 parentElements[i].classList.add('active');
             }
             parentElements[i].click = this.showDiagramTemplates.bind(this, selectedItem);
             ;
         }
         const diagramTemplatesDiv = parentDiv.getElementsByClassName('diagramTemplates')[0];
         diagramTemplatesDiv.appendChild(this.generateDiagramTemplates(tempCount, backgroundColor, parentId, selectedItem));
         this.tempDialog.content = parentDiv.outerHTML;
         this.tempDialog.dataBind();
         this.triggerTemplateEvent(selectedItem);
         setTimeout(() => {
             const divElement = document.getElementsByClassName("db-diagram-template-image-div");
             for (i = 1; i < divElement.length; i++) {
                 divElement[i].onclick = selectedItem.utilityMethods.generateDiagram.bind(selectedItem.utilityMethods, selectedItem);
             }
             const imageElement = document.getElementsByClassName('db-diagram-template-parent-text');
             for (j = 0; j < imageElement.length; j++) {
                 imageElement[j].onclick = selectedItem.utilityMethods.showDiagramTemplates.bind(selectedItem.utilityMethods, selectedItem);
             }
         }, 0);
         return this.tempDialog.content;
     }
     generateDiagramTemplates(tempCount, backgroundColor, parentId, selectedItem) {
         const parentTemplateDiv = document.createElement('div');
         parentTemplateDiv.classList.add('class', 'db-parent-diagram-template');
         const divElement = document.getElementById('diagramTemplateDiv');
         for (let i = 0; i < tempCount; i++) {
             const cloneTemplateDiv = divElement.cloneNode(true);
             cloneTemplateDiv.style.display = '';
             cloneTemplateDiv.id = '';
             const imageDiv = cloneTemplateDiv.children[0];
             imageDiv.setAttribute('id', parentId.replace(' ', '').toLowerCase() + '_child' + i);
             imageDiv.click = this.generateDiagram.bind(this, selectedItem);
             imageDiv.onclick = (evt) => {
                 alert("hi");
             };
             const diagramType = this.getImageSource(parentId, i);
             imageDiv.children[0].style.backgroundImage = 'url(' + diagramType.source + ')';
             if (diagramType.type) {
                 if (diagramType.type === 'svg_blank') {
                     imageDiv.children[0].className = 'db-diagram-template-svg-blank-image';
                 }
                 else {
                     imageDiv.children[0].className = 'db-diagram-template-svg-image';
                 }
             }
             else {
                 imageDiv.children[0].className = 'db-diagram-template-image';
             }
             cloneTemplateDiv.children[1].children[0].innerHTML = diagramType.name;
             parentTemplateDiv.appendChild(cloneTemplateDiv);
         }
         return parentTemplateDiv;
     }
     triggerTemplateEvent(selectedItem) {
         let i;
         const parentElements = document.getElementsByClassName('db-diagram-template-parent-text');
         for (i = 0; i < parentElements.length; i++) {
             parentElements[i].onclick = this.showDiagramTemplates.bind(this, selectedItem);
             ;
         }
         const parentElements1 = document.getElementsByClassName('db-diagram-template-image-div');
         for (i = 0; i < parentElements1.length; i++) {
             parentElements1[i].onclick = this.generateDiagram.bind(this, selectedItem);
             ;
         }
     }
     getImageSource(diagramType, index) {
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
     readTextFile(file, selectedItem) {
         document.getElementsByClassName('sb-content-overlay')[0].style.display = '';
         const ajax = new Ajax(file, 'GET', true);
         ajax.send().then();
         // let value = '../assets/dbstyle/flowchart_Images/CreditCardFlow.json'
         // let context: any = this;
         ajax.onSuccess = (data) => {
             selectedItem.preventSelectionChange = true;
             selectedItem.isTemplateLoad = true;
             this.page.loadPage(data);
             this.page.loadDiagramSettings();
             selectedItem.isTemplateLoad = false;
             if (selectedItem.diagramType === 'MindMap') {
                 const rootNode = MindMapUtilityMethods.getNode(selectedItem.selectedDiagram.nodes, 'rootNode');
                 selectedItem.utilityMethods.bindMindMapProperties(rootNode, selectedItem);
             }
             if (selectedItem.diagramType === 'OrgChart') {
                 selectedItem.selectedDiagram.layout.getLayoutInfo = OrgChartUtilityMethods.getLayoutInfo.bind(OrgChartUtilityMethods);
                 selectedItem.selectedDiagram.selectedItems.userHandles = OrgChartUtilityMethods.handle;
                 selectedItem.selectedDiagram.selectedItems.constraints = SelectorConstraints.UserHandle;
                 selectedItem.selectedDiagram.dataBind();
             }
             selectedItem.preventSelectionChange = false;
             document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
         };
         ajax.onFailure = (data) => {
             document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
         };
         ajax.onError = (evt) => {
             document.getElementsByClassName('sb-content-overlay')[0].style.display = 'none';
             return {};
         };
     }
     currentDiagramVisibility(diagramname, selectedItem) {
         const value = null;
         if (diagramname === 'mindmap-diagram' || diagramname === 'orgchart-diagram') {
             selectedItem.utilityMethods.hideElements('hide-palette', value, diagramname);
             const diagramContainer = document.getElementsByClassName('db-current-diagram-container')[0];
             diagramContainer.classList.add(diagramname);
             const propertyContainer = document.getElementsByClassName('db-property-editor-container')[0];
             if (diagramname === 'mindmap-diagram') {
                 propertyContainer.classList.remove('orgchart-diagram');
             }
             else {
                 propertyContainer.classList.remove('mindmap-diagram');
             }
             propertyContainer.classList.add(diagramname);
         }
     }
     showDiagramTemplates(selectedItem, evt) {
         let target = evt.target;
         if (target.tagName.toLowerCase() === 'span') {
             target = target.parentElement;
         }
         // eslint-disable-next-line
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
     enableToolbarItems(selectedItems) {
         const toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
         let toolbarClassName = 'db-toolbar-container';
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
                 if (selectedItems[0].children) {
                     if (selectedItems[0].children.length > 2) {
                         toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                     }
                     else {
                         toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                     }
                 }
                 else {
                     toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                 }
             }
         }
         else if (selectedItems.length === 2) {
             toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
         }
         else if (selectedItems.length > 2) {
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
     enableMenuItems(itemText, selectedItem) {
         if (selectedItem && selectedItem.selectedDiagram) {
             let selectedItems = selectedItem.selectedDiagram.selectedItems.nodes;
             selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors);
             if (itemText) {
                 const commandType = itemText.replace(/[' ']/g, '');
                 if (selectedItems.length === 0 || selectedItem.diagramType !== 'GeneralDiagram') {
                    // eslint-disable-next-line
                     switch (commandType.toLowerCase()) {
                         case 'edittooltip':
                             let disable = false;
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
                    // eslint-disable-next-line
                     switch (commandType.toLowerCase()) {
                         case 'edittooltip':
                             return true;
                     }
                 }
                 if (selectedItem.pasteData.length === 0 && itemText === 'Paste') {
                     return true;
                 }
                 if (itemText === 'Undo' && selectedItem.selectedDiagram.historyManager.undoStack.length === 0) {
                     return true;
                 }
                 if (itemText === 'Redo' && selectedItem.selectedDiagram.historyManager.redoStack.length === 0) {
                     return true;
                 }
                 if (itemText === 'Select All') {
                     if (selectedItem.diagramType !== 'GeneralDiagram' || (selectedItem.selectedDiagram.nodes.length === 0 && selectedItem.selectedDiagram.connectors.length === 0)) {
                         return true;
                     }
                 }
                 if (selectedItem.diagramType !== 'GeneralDiagram') {
                     if (itemText === 'Themes' || itemText === 'Paste' || itemText === 'Show Rulers' || itemText === 'Show Guides'
                         || itemText === 'Show Grid' || itemText === 'Snap To Grid' || itemText === 'Show Stencil') {
                         return true;
                     }
                 }
             }
         }
         return false;
     }
     enableArrangeMenuItems(selectedItem) {
         // const contextInstance: any = document.getElementById('arrangeContextMenu');
         // const contextMenu: ContextMenu = contextInstance.ej2_instances[0] as ContextMenu;
         const contextMenu = this.arrangeContextMenu;
         let selectedItems = selectedItem.selectedDiagram.selectedItems.nodes;
         selectedItems = selectedItems.concat(selectedItem.selectedDiagram.selectedItems.connectors);
         for (const menuItem of contextMenu.items) {
             contextMenu.enableItems([menuItem.text], false);
         }
         if (selectedItem.diagramType === 'GeneralDiagram') {
             if (selectedItems.length > 1) {
                 contextMenu.enableItems(['Align Objects', 'Distribute Objects', 'Match Size', 'Lock', 'Unlock', 'Group'], true);
             }
             else if (selectedItems.length === 1) {
                 contextMenu.enableItems(['Send To Back', 'Bring To Front', 'Send Backward', 'Bring Forward']);
                 const object = selectedItems[0];
                 if (object instanceof Node) {
                     if (object.children && object.children.length > 0) {
                         contextMenu.enableItems(['Ungroup']);
                     }
                     if (object.constraints & NodeConstraints.Drag) {
                         contextMenu.enableItems(['Lock'], true);
                     }
                     else {
                         contextMenu.enableItems(['Unlock'], true);
                     }
                 }
             }
         }
     }
     getPaperSize(paperName) {
         const paperSize = new PaperSize();
         // eslint-disable-next-line
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
     removeChild(selectedItem) {
         const diagram = selectedItem.selectedDiagram;
         if (diagram.selectedItems.nodes.length > 0) {
             selectedItem.preventPropertyChange = true;
             diagram.historyManager.startGroupAction();
             this.removeSubChild(diagram.selectedItems.nodes[0], selectedItem);
             diagram.historyManager.endGroupAction();
             diagram.doLayout();
             selectedItem.preventPropertyChange = false;
         }
         selectedItem.isModified = true;
     }
     generateDiagram(selectedItem, evt) {
         const diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
         const target = evt.target;
         if (target.id.startsWith('mindmap')) {
             selectedItem.diagramType = 'MindMap';
             MindMapUtilityMethods.selectedItem = selectedItem;
             const mindMapObject = new MindMap(selectedItem);
             if (target.id === 'mindmap_child0') {
                 mindMapObject.createMindMap(true);
                 MindMapUtilityMethods.templateType = 'template1';
             }
             else if (target.id === 'mindmap_child1') {
                 mindMapObject.createMindMap(false);
                 this.readTextFile('./BusinessPlanning.json', selectedItem);
                 MindMapUtilityMethods.templateType = 'template1';
             }
             else if (target.id === 'mindmap_child2') {
                 mindMapObject.createMindMap(false);
                 this.readTextFile('./TQM.json', selectedItem);
                 MindMapUtilityMethods.templateType = 'template2';
             }
             else if (target.id === 'mindmap_child3') {
                 mindMapObject.createMindMap(false);
                 this.readTextFile('./SoftwareDevelopmentLifeCycle.json', selectedItem);
                 MindMapUtilityMethods.templateType = 'template1';
             }
             this.hideMenuItems();
             diagramContainer.classList.add('custom-diagram');
         }
         else if (target.id.startsWith('orgchart')) {
             selectedItem.diagramType = 'OrgChart';
             OrgChartUtilityMethods.selectedItem = selectedItem;
             const orgChartObject = new OrgChartData(selectedItem);
             if (target.id === 'orgchart_child0') {
                 orgChartObject.createOrgChart(true);
             }
             else {
                 OrgChartUtilityMethods.subTreeOrientation = 'Horizontal';
                 OrgChartUtilityMethods.subTreeAlignments = 'Center';
                 if (target.id === 'orgchart_child1') {
                     orgChartObject.createOrgChart(false);
                     this.readTextFile('./OrgTemplateStyle1.json', selectedItem);
                 }
                 else if (target.id === 'orgchart_child2') {
                     orgChartObject.createOrgChart(false);
                     this.readTextFile('./OrgTemplateStyle2.json', selectedItem);
                 }
                 else if (target.id === 'orgchart_child3') {
                     orgChartObject.createOrgChart(false);
                     this.readTextFile('./OrgTemplateStyle3.json', selectedItem);
                 }
             }
             this.hideMenuItems();
             diagramContainer.classList.add('custom-diagram');
         }
         else if (target.id.startsWith('flowchart')) {
             if (target.id === 'flowchart_child0') {
                 selectedItem.selectedDiagram.clear();
             }
             else if (target.id === 'flowchart_child1') {
                 this.readTextFile("./CreditCardFlow.json", selectedItem);
             }
             else if (target.id === 'flowchart_child2') {
                 this.readTextFile('./BankingTellerProcess.json', selectedItem);
             }
             else if (target.id === 'flowchart_child3') {
                 this.readTextFile('./Developer_Workflow.json', selectedItem);
             }
             selectedItem.diagramType = 'GeneralDiagram';
             diagramContainer.classList.add('general-diagram');
         }
         else {
             selectedItem.selectedDiagram.clear();
             selectedItem.diagramType = 'GeneralDiagram';
             diagramContainer.classList.add('general-diagram');
         }
         const diagramName = target.parentElement.children[1].children[0].innerHTML;
         if (diagramName !== 'Blank Diagram') {
             document.getElementById('diagramName').innerHTML = diagramName;
         }
         this.tempDialog.hide();
     }
     cutLayout(selectedItem) {
         const diagram = selectedItem.selectedDiagram;
         if (diagram.selectedItems.nodes.length) {
             selectedItem.utilityMethods.copyLayout(selectedItem);
             selectedItem.utilityMethods.removeChild(selectedItem);
             diagram.doLayout();
             selectedItem.isModified = true;
         }
     }
     copyLayout(selectedItem) {
         const diagram = selectedItem.selectedDiagram;
         const selectedNode = diagram.selectedItems.nodes[0];
         if (selectedNode.id !== 'rootNode') {
             selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItemswithChildElements();
         }
     }
     pasteLayout(selectedItem) {
         selectedItem.isCopyLayoutElement = true;
         if (selectedItem.diagramType === 'MindMap') {
             MindMapUtilityMethods.mindmapPaste();
         }
         else if (selectedItem.diagramType === 'OrgChart') {
             OrgChartUtilityMethods.orgchartPaste();
         }
         selectedItem.isCopyLayoutElement = false;
         selectedItem.isModified = true;
     }
     undoRedoLayout(isundo, selectedItem) {
         const diagram = selectedItem.selectedDiagram;
         if (isundo) {
             diagram.undo();
         }
         else {
             diagram.redo();
         }
         if (diagram.selectedItems.nodes.length === 0) {
             this.updateSectionforNode(selectedItem);
         }
         diagram.doLayout();
         selectedItem.isModified = true;
     }
     updateSectionforNode(selectedItem) {
         const diagram = selectedItem.selectedDiagram;
         for (const node of diagram.nodes) {
             const newselection = node;
             if (newselection.id === 'rootNode') {
                 selectedItem.preventPropertyChange = true;
                 diagram.select([newselection]);
                 selectedItem.preventPropertyChange = false;
             }
         }
     }
     updateLayout(selectedItem, bindBindingFields, imageField) {
         for (let i = 0; i < selectedItem.selectedDiagram.nodes.length; i++) {
             const node = selectedItem.selectedDiagram.nodes[i];
             if (node.id !== 'textNode') {
                 const nodeInfo = node.addInfo;
                 const keys = Object.keys(nodeInfo);
                 const bindingFields = [];
                 const additionalFields = [];
                 let propName = 'Name';
                 if (nodeInfo[propName] && nodeInfo[propName].checked) {
                     bindingFields.push(propName);
                 }
                 for (const key of keys) {
                     const keyValue = nodeInfo[key];
                     if (keyValue && keyValue.type === 'bindingField') {
                         if (keyValue.checked) {
                             if (bindBindingFields) {
                                 bindingFields.push(key);
                             }
                         }
                         else {
                             additionalFields.push(key);
                         }
                     }
                 }
                 selectedItem.selectedDiagram.removeLabels(node, node.annotations);
                 propName = 'Image URL';
                 if (!imageField) {
                     node.minWidth = 150;
                     node.minHeight = 50;
                     node.maxHeight = 50;
                     selectedItem.selectedDiagram.dataBind();
                     node.shape = { type: 'Basic', shape: 'Rectangle', cornerRadius: 5 };
                     selectedItem.selectedDiagram.dataBind();
                 }
                 else if (imageField) {
                     node.minWidth = 300;
                     node.minHeight = 100;
                     node.maxHeight = 100;
                     selectedItem.selectedDiagram.dataBind();
                     node.shape = {
                         type: 'Image', source: nodeInfo[propName] && nodeInfo[propName].value ? nodeInfo[propName].value.toString() : './orgchart_images/blank-male.jpg',
                         align: 'XMinYMin', scale: 'Meet'
                     };
                     selectedItem.selectedDiagram.dataBind();
                 }
                 const annotations = [];
                 let startY = 0.5 - ((bindingFields.length - 1) / 10);
                 for (const binding of bindingFields) {
                     const annotation1 = {
                         content: nodeInfo[binding].value.toString(), offset: { x: 0.5, y: startY }
                     };
                     if (node.shape && node.shape.type === 'Image') {
                         annotation1.offset.x = 0;
                         annotation1.margin = { left: 110 };
                         annotation1.horizontalAlignment = 'Left';
                     }
                     if (i === 0) {
                         annotation1.style = { fontSize: 14, bold: true };
                     }
                     startY += 0.2;
                     annotations.push(annotation1);
                 }
                 if (annotations.length > 0) {
                     selectedItem.selectedDiagram.addLabels(node, annotations);
                 }
                 let content = '';
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
                 }
                 else {
                     node.constraints = NodeConstraints.Default & ~NodeConstraints.Tooltip;
                 }
             }
         }
         selectedItem.selectedDiagram.dataBind();
         selectedItem.selectedDiagram.doLayout();
         selectedItem.isModified = true;
     }
     hideMenuItems() {
         const btnWindow = document.getElementById('btnWindowMenu');
         btnWindow.ej2_instances[0].items[1].iconCss = '';
         const btnView = document.getElementById('btnViewMenu');
         btnView.ej2_instances[0].items[7].iconCss = '';
     }
     removeSubChild(node, selectedItem) {
         const diagram = selectedItem.selectedDiagram;
         for (let i = node.outEdges.length - 1; i >= 0; i--) {
             const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.outEdges[i]);
             const childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.targetID);
             if (childNode != null && childNode.outEdges.length > 0) {
                 this.removeSubChild(childNode, selectedItem);
             }
             else {
                 diagram.remove(childNode);
             }
         }
         for (let j = node.inEdges.length - 1; j >= 0; j--) {
             const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[j]);
             const childNode = MindMapUtilityMethods.getNode(diagram.nodes, connector.sourceID);
             let index = childNode.outEdges.indexOf(connector.id);
             if (childNode.outEdges.length > 1 && index === 0) {
                 index = childNode.outEdges.length;
             }
             if (index > 0) {
                 const node1 = childNode.outEdges[index - 1];
                 const connector1 = diagram.getObject(node1);
                 const node2 = MindMapUtilityMethods.getNode(diagram.nodes, connector1.targetID);
                 diagram.select([node2]);
             }
             else {
                 diagram.select([childNode]);
             }
         }
         diagram.remove(node);
     }
 }