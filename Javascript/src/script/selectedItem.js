/**
 * Selector Handler
 */
 import { Node, NodeConstraints, Connector, ConnectorConstraints } from '@syncfusion/ej2-diagrams';
 import { UtilityMethods } from './utilitymethods';
 import { CustomContextMenuItems } from './customcontextmenuitems';
 import { isNullOrUndefined } from '@syncfusion/ej2-base';
 import { MindMapUtilityMethods } from './mindmap';
 import { NodeProperties, TextProperties, ConnectorProperties, ExportSettings, PrintSettings } from './selector';
 /* tslint:disable: name-of-rule-to-disable */
 export class PageSettings {
     constructor() {
         this.pageWidth = 1056;
         this.pageHeight = 816;
         this.backgroundColor = '#ffffff';
         this.isPortrait = false;
         this.isLandscape = true;
         this.paperSize = 'Letter';
         this.pageBreaks = false;
     }
 }
 export class ScrollSettings {
     constructor() {
         this.currentZoom = '100%';
     }
 }
 export class MindMapSettings {
     constructor() {
         this.opacityText = '100%';
         this.mLevelType = 'Level0';
         this.mFill = 'white';
         this.mStroke = 'white';
         this.mStrokeStyle = 'None';
         this.mStrokeWidth = 1;
         this.mFontFamily = 'Arial';
         this.mFontSize = 12;
         this.mFontColor = '#ffffff';
     }
     get levelType() {
         return this.mLevelType;
     }
     set levelType(levelType) {
         if (this.mLevelType !== levelType) {
             this.mLevelType = levelType;
             this.triggerPropertyChange('levelType', levelType);
         }
     }
     get fill() {
         return this.mFill;
     }
     set fill(fill) {
         if (this.mFill !== fill) {
             this.mFill = fill;
             this.triggerPropertyChange('fill', fill);
         }
     }
     get stroke() {
         return this.mStroke;
     }
     set stroke(stroke) {
         if (this.mStroke !== stroke) {
             this.mStroke = stroke;
             this.triggerPropertyChange('stroke', stroke);
         }
     }
     get strokeStyle() {
         return this.mStrokeStyle;
     }
     set strokeStyle(strokeStyle) {
         if (this.mStrokeStyle !== strokeStyle) {
             this.mStrokeStyle = strokeStyle;
             this.triggerPropertyChange('strokeStyle', strokeStyle);
         }
     }
     get strokeWidth() {
         return this.mStrokeWidth;
     }
     set strokeWidth(strokeWidth) {
         if (this.mStrokeWidth !== strokeWidth) {
             this.mStrokeWidth = strokeWidth;
             this.triggerPropertyChange('strokeWidth', strokeWidth);
         }
     }
     get opacity() {
         return this.mOpacity;
     }
     set opacity(opacity) {
         if (this.mOpacity !== opacity) {
             this.mOpacity = opacity;
             this.triggerPropertyChange('opacity', opacity);
         }
     }
     get fontFamily() {
         return this.mFontFamily;
     }
     set fontFamily(fontFamily) {
         if (this.mFontFamily !== fontFamily) {
             this.mFontFamily = fontFamily;
             this.triggerPropertyChange('fontFamily', fontFamily);
         }
     }
     get fontSize() {
         return this.mFontSize;
     }
     set fontSize(fontSize) {
         if (this.mFontSize !== fontSize) {
             this.mFontSize = fontSize;
             this.triggerPropertyChange('fontSize', fontSize);
         }
     }
     get fontColor() {
         return this.mFontColor;
     }
     set fontColor(fontColor) {
         if (this.mFontColor !== fontColor) {
             this.mFontColor = fontColor;
             this.triggerPropertyChange('fontColor', fontColor);
         }
     }
     get textOpacity() {
         return this.mTextOpacity;
     }
     set textOpacity(textOpacity) {
         if (this.mTextOpacity !== textOpacity) {
             this.mTextOpacity = textOpacity;
             this.triggerPropertyChange('textOpacity', textOpacity);
         }
     }
     triggerPropertyChange(propName, propValue) {
         if (!isNullOrUndefined(this.propertyChange)) {
             this.propertyChange.call(this, { "propertyName": propName, "propertyValue": propValue });
         }
     }
 }
 export class OrgDataSettings {
     constructor() {
         this.dataSourceColumns = [];
         this.id = '';
         this.parent = '';
         this.nameField = '';
         this.bindingFields = [];
         this.imageField = '';
         this.additionalFields = [];
         this.fileformat = '';
         this.extensionType = '.csv';
         this.buttonContent = 'Download Example CSV';
     }
 }
 export class SelectorViewModel {
     constructor() {
         this.isCopyLayoutElement = false;
         this.currentDiagramName = '';
         this.preventPropertyChange = false;
         this.isModified = false;
         this.preventSelectionChange = false;
         this.pasteData = [];
         this.isLoading = false;
         this.isTemplateLoad = false;
         this.nodeProperties = new NodeProperties();
         this.textProperties = new TextProperties();
         this.connectorProperties = new ConnectorProperties();
         this.exportSettings = new ExportSettings();
         this.printSettings = new PrintSettings();
         this.pageSettings = new PageSettings();
         this.utilityMethods = new UtilityMethods();
         this.mindmapSettings = new MindMapSettings();
         this.orgDataSettings = new OrgDataSettings();
         this.scrollSettings = new ScrollSettings();
         this.customContextMenu = new CustomContextMenuItems();
         this.nodeProperties.propertyChange = this.nodePropertyChange.bind(this);
         this.connectorProperties.propertyChange = this.connectorPropertyChange.bind(this);
         this.textProperties.propertyChange = this.textPropertyChange.bind(this);
         this.mindmapSettings.propertyChange = this.mindMapPropertyChange.bind(this);
     }
     randomIdGenerator() {
         return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
     }
     getAbsolutePath() {
         return window.location.pathname;
     }
     nodePropertyChange(args) {
         if (!this.preventPropertyChange) {
             const diagram = this.selectedDiagram;
             if (diagram) {
                 if (diagram.selectedItems.nodes.length > 0) {
                     const selectedNodes = this.selectedDiagram.selectedItems.nodes;
                     for (const value of selectedNodes) {
                         const node = value;
                         const propertyName1 = args.propertyName.toString().toLowerCase();
                         // eslint-disable-next-line
                         switch (propertyName1) {
                             case 'offsetx':
                                 node.offsetX = this.nodeProperties.offsetX.value;
                                 break;
                             case 'offsety':
                                 node.offsetY = this.nodeProperties.offsetY.value;
                                 break;
                             case 'width':
                                 node.width = this.nodeProperties.width.value;
                                 break;
                             case 'height':
                                 node.height = this.nodeProperties.height.value;
                                 break;
                             case 'rotateangle':
                                 node.rotateAngle = this.nodeProperties.rotateAngle.value;
                                 break;
                             case 'aspectratio':
                                 node.constraints = node.constraints ^ NodeConstraints.AspectRatio;
                                 break;
                         }
                         if (!node.children) {
                             this.applyNodeStyle(propertyName1, node, args.propertyValue);
                         }
                         else {
                             for (const value1 of node.children) {
                                 this.applyNodeStyle(propertyName1, diagram.getObject(value1), args.propertyValue);
                             }
                         }
                     }
                     this.isModified = true;
                 }
                 if (diagram.connectors.length > 0) {
                    // eslint-disable-next-line
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
     connectorPropertyChange(args) {
         if (!this.preventPropertyChange) {
             const diagram = this.selectedDiagram;
             if (diagram && diagram.selectedItems.connectors.length > 0) {
                 const selectedNodes = diagram.selectedItems.connectors;
                 for (const value of selectedNodes) {
                     const connector = value;
                     // eslint-disable-next-line
                     switch (args.propertyName.toString().toLowerCase()) {
                         case 'linecolor':
                             connector.style.strokeColor = this.getColor(this.connectorProperties.lineColor.value);
                             connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                             connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                             break;
                         case 'linewidth':
                             connector.style.strokeWidth = this.connectorProperties.lineWidth.value;
                             if (connector.sourceDecorator.style) {
                                 connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                             }
                             else {
                                 connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                             }
                             if (connector.targetDecorator.style) {
                                 connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                             }
                             else {
                                 connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                             }
                             break;
                         case 'linestyle':
                             connector.style.strokeDashArray = this.connectorProperties.lineStyle.value;
                             break;
                         case 'linetype':
                             connector.type = this.connectorProperties.lineType.value;
                             break;
                         case 'sourcetype':
                             connector.sourceDecorator.shape = this.connectorProperties.sourceType.value;
                             break;
                         case 'targettype':
                             connector.targetDecorator.shape = this.connectorProperties.targetType.value;
                             break;
                         case 'sourcesize':
                             connector.sourceDecorator.width = connector.sourceDecorator.height = this.connectorProperties.sourceSize.value;
                             break;
                         case 'targetsize':
                             connector.targetDecorator.width = connector.targetDecorator.height = this.connectorProperties.targetSize.value;
                             break;
                         case 'opacity':
                             connector.style.opacity = this.connectorProperties.opacity.value / 100;
                             connector.targetDecorator.style.opacity = connector.style.opacity;
                             connector.sourceDecorator.style.opacity = connector.style.opacity;
                             document.getElementById('connectorOpacitySliderText').value = this.connectorProperties.opacity.value + '%';
                             break;
                         case 'linejump':
                             if (this.connectorProperties.lineJump.value) {
                                 connector.constraints = connector.constraints | ConnectorConstraints.Bridging;
                             }
                             else {
                                 connector.constraints = connector.constraints & ~ConnectorConstraints.Bridging;
                             }
                             break;
                         case 'linejumpsize':
                             connector.bridgeSpace = this.connectorProperties.lineJumpSize.value;
                             break;
                     }
                 }
                 diagram.dataBind();
                 this.isModified = true;
             }
         }
     }
     textPropertyChange(args) {
         if (!this.preventPropertyChange) {
             const diagram = this.selectedDiagram;
             if (diagram) {
                 let selectedanys = diagram.selectedItems.nodes;
                 selectedanys = selectedanys.concat(diagram.selectedItems.connectors);
                 const propertyName = args.propertyName.toString().toLowerCase();
                 if (selectedanys.length > 0) {
                     for (const value1 of selectedanys) {
                         const node = value1;
                         if (node instanceof Node || node instanceof Connector) {
                             if (node.annotations.length > 0) {
                                 for (const value of node.annotations) {
                                     const annotation = value.style;
                                     this.updateTextProperties(propertyName, annotation);
                                 }
                             }
                             else if (node.shape && node.shape.type === 'Text') {
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
     updateTextProperties(propertyName, annotation) {
        // eslint-disable-next-line
         switch (propertyName) {
             case 'fontfamily':
                 annotation.fontFamily = this.textProperties.fontFamily.value;
                 break;
             case 'fontsize':
                 annotation.fontSize = this.textProperties.fontSize.value;
                 break;
             case 'fontcolor':
                 annotation.color = this.getColor(this.textProperties.fontColor.value);
                 break;
             case 'opacity':
                 annotation.opacity = this.textProperties.opacity.value / 100;
                 document.getElementById('textOpacityText').value = this.textProperties.opacity.value + '%';
                 break;
         }
     }
     mindMapPropertyChange(args) {
         if (!this.preventPropertyChange) {
             const diagram = this.selectedDiagram;
             if (diagram && diagram.nodes.length > 0) {
                 for (const value of diagram.nodes) {
                     const node = value;
                     if (node.addInfo) {
                         const addInfo = node.addInfo;
                         const levelType = this.mindmapSettings.levelType.value;
                         if ('Level' + addInfo.level === levelType || addInfo.level === levelType) {
                             switch (args.propertyName.toString().toLowerCase()) {
                                 case 'fill':
                                     node.style.fill = this.getColor(this.mindmapSettings.fill.value);
                                     break;
                                 case 'stroke':
                                     node.style.strokeColor = this.getColor(this.mindmapSettings.stroke.value);
                                     if (node.inEdges.length > 0) {
                                         const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                         connector.style.strokeColor = node.style.strokeColor;
                                     }
                                     break;
                                 case 'strokewidth':
                                     node.style.strokeWidth = this.mindmapSettings.strokeWidth.value;
                                     if (node.inEdges.length > 0) {
                                         const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                         connector.style.strokeWidth = this.mindmapSettings.strokeWidth.value;
                                     }
                                     break;
                                 case 'strokestyle':
                                     node.style.strokeDashArray = this.mindmapSettings.strokeStyle.value;
                                     if (node.inEdges.length > 0) {
                                         const connector = MindMapUtilityMethods.getConnector(diagram.connectors, node.inEdges[0]);
                                         connector.style.strokeDashArray = this.mindmapSettings.strokeStyle.value;
                                     }
                                     break;
                                 case 'opacity':
                                     node.style.opacity = this.mindmapSettings.opacity.value / 100;
                                     document.getElementById('mindmapOpacityText').value = this.mindmapSettings.opacity.value + '%';
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
     updateMindMapTextStyle(node, propertyName) {
         const diagram = this.selectedDiagram;
         if (node.addInfo && node.annotations.length > 0) {
             const annotation = node.annotations[0].style;
             // eslint-disable-next-line
             switch (propertyName) {
                 case 'fontfamily':
                     annotation.fontFamily = this.mindmapSettings.fontFamily.value;
                     break;
                 case 'fontsize':
                     annotation.fontSize = this.mindmapSettings.fontSize.value;
                     break;
                 case 'fontcolor':
                     annotation.color = this.getColor(this.mindmapSettings.fontColor.value);
                     break;
                 case 'textopacity':
                     annotation.opacity = this.mindmapSettings.textOpacity.value / 100;
                     document.getElementById('mindmapOpacitySliderText').value = this.mindmapSettings.textOpacity.value + '%';
                     break;
             }
         }
         diagram.dataBind();
         this.isModified = true;
     }
     getColor(colorName) {
         if (window.navigator && colorName.length === 9) {
             return colorName.substring(0, 7);
         }
         return colorName;
     }
     applyNodeStyle(propertyName, node, value) {
         // const addInfo: any = node.addInfo || {};
         // eslint-disable-next-line
         switch (propertyName) {
             case 'fillcolor':
                 node.style.fill = this.getColor(value);
                 if (this.nodeProperties.gradient) {
                     this.nodeProperties.getGradient(node);
                 }
                 break;
             case 'strokecolor':
                 node.style.strokeColor = this.getColor(this.nodeProperties.strokeColor.value);
                 break;
             case 'strokewidth':
                 node.style.strokeWidth = this.nodeProperties.strokeWidth.value;
                 break;
             case 'strokestyle':
                 node.style.strokeDashArray = this.nodeProperties.strokeStyle.value;
                 break;
             case 'opacity':
                 node.style.opacity = this.nodeProperties.opacity.value / 100;
                 document.getElementById('nodeOpacitySliderText').value = (this.nodeProperties.opacity.value) + '%';
                 break;
             case 'gradient':
                 if (value && !value.checked) {
                     node.style.gradient.type = 'None';
                 }
                 else {
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