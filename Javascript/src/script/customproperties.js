/**
 *  Custom Properties handler
 */
 import { NodeConstraints } from '@syncfusion/ej2-diagrams';
 import { Button, CheckBox } from '@syncfusion/ej2-buttons';
 export class CustomProperties {
     constructor(selectedItem, customPropertyDialog) {
         this.selectedItem = selectedItem;
         this.customPropertyDialog = customPropertyDialog;
     }
     getPropertyDialogContent(addInfo) {
         const propertyDialogContent = document.createElement('div');
         if (addInfo) {
             const addInfo1 = addInfo;
             const keys = Object.keys(addInfo1);
             for (const key of keys) {
                 propertyDialogContent.appendChild(this.clonePropInfoTemplate(key, addInfo1[key]));
             }
             this.createSpaceElement(propertyDialogContent);
         }
         propertyDialogContent.appendChild(this.clonePropTemplate());
         this.customPropertyDialog.content = propertyDialogContent.outerHTML;
         this.customPropertyDialog.refresh();
         this.triggerEvents(addInfo);
     }
     removeProperty() {
         for (const selectedNode of this.selectedItem.selectedDiagram.nodes) {
             const node = selectedNode;
             if (node.id !== 'textNode') {
                 const nodeInfo = node.addInfo;
                 delete nodeInfo[this.deleteField];
             }
         }
         const addInfo = this.selectedItem.selectedDiagram.selectedItems.nodes[0].addInfo;
         this.getPropertyDialogContent(addInfo);
         let imageField = false;
         if (addInfo['Image URL'] && addInfo['Image URL'].checked) {
             imageField = true;
         }
         this.selectedItem.utilityMethods.updateLayout(this.selectedItem, true, imageField);
         this.deleteField = '';
         const dialog = document.getElementById('deleteConfirmationDialog');
         dialog.ej2_instances[0].hide();
     }
     setTooltip(node, content) {
         if (content) {
             node.constraints = node.constraints | NodeConstraints.Tooltip;
             node.tooltip = { "content": content, "position": 'BottomCenter', "relativeMode": 'Object' };
         }
         else {
             node.constraints = node.constraints & ~NodeConstraints.Tooltip;
         }
     }
     triggerEvents(addInfo) {
         const removeBtnElements = document.getElementsByClassName('propertyLabelDiv');
         const removeCheckBoxElements = document.getElementsByClassName('propertyTooltipDiv');
         const propertyValueElements = document.getElementsByClassName('propertyValueDiv');
         const addInfo1 = addInfo;
         const keys = Object.keys(addInfo1);
         for (let i = 0; i < keys.length; i++) {
             const removeBtnElement = removeBtnElements[i + 1].children[0];
             const removeButton = new Button({ iconCss: 'sf-icon-Delete', cssClass: keys[i] });
             removeButton.appendTo(removeBtnElement);
             removeBtnElement.onclick = this.showConfirmationDialog.bind(this);
             const checkboxTooltipElement = removeCheckBoxElements[i + 1].children[0];
             const checkboxTooltip = new CheckBox({ checked: Boolean(addInfo1[keys[i]].checked), cssClass: keys[i] });
             checkboxTooltip.change = this.removeField.bind(this);
             checkboxTooltip.appendTo(checkboxTooltipElement);
             propertyValueElements[i + 1].children[0].value = addInfo1[keys[i]].value.toString();
             propertyValueElements[i + 1].children[0].onchange = this.valueChange.bind(this);
         }
         const propButton = document.getElementsByClassName('db-custom-prop-button')[1];
         const button = new Button();
         button.appendTo(propButton);
         propButton.onclick = this.addCustomProperty.bind(this);
     }
     clonePropInfoTemplate(key, keyValue) {
         const propertyInfo = document.getElementsByClassName('db-custom-prop-info-template')[0].cloneNode(true);
         propertyInfo.style.display = '';
         let propertyName = key;
         if (keyValue.type === 'nameField') {
             propertyName = 'Name';
         }
         else if (keyValue.type === 'imageField') {
             propertyName = 'Image URL';
         }
         propertyInfo.getElementsByClassName('propertyNameDiv')[0].innerHTML = propertyName;
         const removeBtnElement = propertyInfo.getElementsByClassName('btnRemoveProperty')[0];
         if (keyValue.type !== 'bindingField') {
             removeBtnElement.style.display = 'None';
         }
         return propertyInfo;
     }
     valueChange(args) {
         const target = args.target;
         const addInfo = this.selectedItem.selectedDiagram.selectedItems.nodes[0].addInfo;
         addInfo[target.parentElement.parentElement.children[0].innerHTML].value = target.value;
         let imageField = false;
         if (addInfo['Image URL'] && addInfo['Image URL'].checked) {
             imageField = true;
         }
         this.selectedItem.utilityMethods.updateLayout(this.selectedItem, true, imageField);
     }
     removeField(args) {
         const target = args.event.target;
         const className = target.parentElement.parentElement.className.replace('e-checkbox-wrapper ', '').trim();
         for (const selectedNode of this.selectedItem.selectedDiagram.nodes) {
             const node = selectedNode;
             if (node.id !== 'textNode') {
                 const nodeInfo = node.addInfo;
                 nodeInfo[className].checked = args.checked;
             }
         }
         let imageField = false;
         const addInfo = this.selectedItem.selectedDiagram.selectedItems.nodes[0].addInfo;
         if (addInfo['Image URL'] && addInfo['Image URL'].checked) {
             imageField = true;
         }
         this.selectedItem.utilityMethods.updateLayout(this.selectedItem, true, imageField);
     }
     showConfirmationDialog(args) {
         let target = args.target;
         if (target.tagName.toLowerCase() === 'span') {
             target = target.parentElement;
         }
         this.deleteField = target.className.replace('btnRemoveProperty e-control e-btn ', '').replace(' e-icon-btn', '').trim();
         const dialog = document.getElementById('deleteConfirmationDialog');
         dialog.ej2_instances[0].show();
     }
     createSpaceElement(element) {
         const spaceDiv = document.createElement('div');
         spaceDiv.style.height = '10px';
         element.appendChild(spaceDiv);
     }
     clonePropTemplate() {
         const propertyInfo = document.getElementsByClassName('db-custom-prop-template')[0].cloneNode(true);
         propertyInfo.style.display = '';
         return propertyInfo;
     }
     addCustomProperty() {
         const propName = document.getElementsByClassName('txtPropertyName')[1].value;
         if (propName) {
             for (const selectedNode of this.selectedItem.selectedDiagram.nodes) {
                 const node = selectedNode;
                 if (node.id !== 'textNode') {
                     const nodeInfo = node.addInfo;
                     nodeInfo[propName] = { value: '', type: 'bindingField', checked: false };
                 }
             }
             this.getPropertyDialogContent(this.selectedItem.selectedDiagram.selectedItems.nodes[0].addInfo);
         }
         else {
             alert('Invalid Name');
         }
     }
 }