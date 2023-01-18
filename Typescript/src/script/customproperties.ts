/**
 *  Custom Properties handler
 */

import { NodeModel, NodeConstraints, Node } from '@syncfusion/ej2-diagrams';
import { Button, CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { SelectorViewModel } from './selectedItem';
import { Dialog } from '@syncfusion/ej2-react-popups';


export class CustomProperties {
    public selectedItem: SelectorViewModel;
    public customPropertyDialog: Dialog;
    public deleteField: string;

    constructor(selectedItem: SelectorViewModel, customPropertyDialog: Dialog) {
        this.selectedItem = selectedItem;
        this.customPropertyDialog = customPropertyDialog;
    }

    public getPropertyDialogContent(addInfo: object): void {
        const propertyDialogContent: HTMLElement = document.createElement('div');
        if (addInfo) {
            const addInfo1: { [key: string]: object } = addInfo as { [key: string]: object };
            const keys: string[] = Object.keys(addInfo1);
            for (const key of  keys) {
                propertyDialogContent.appendChild(this.clonePropInfoTemplate(key, addInfo1[key] as { [key: string]: object }));
            }
            this.createSpaceElement(propertyDialogContent);
        }
        propertyDialogContent.appendChild(this.clonePropTemplate());
        this.customPropertyDialog.content = propertyDialogContent.outerHTML;
        this.customPropertyDialog.refresh();
        this.triggerEvents(addInfo);
    }

    public removeProperty(): void {
        for (const selectedNode of  this.selectedItem.selectedDiagram.nodes) {
            const node: Node = selectedNode as Node;
            if (node.id !== 'textNode') {
                const nodeInfo: any = node.addInfo;
                delete nodeInfo[this.deleteField];
            }
        }
        const addInfo: any = (this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0].addInfo;
        this.getPropertyDialogContent(addInfo);
        let imageField: boolean = false;
        if (addInfo['Image URL'] && addInfo['Image URL'].checked) {
            imageField = true;
        }
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, true, imageField);
        this.deleteField = '';
        const dialog: any = document.getElementById('deleteConfirmationDialog');
        dialog.ej2_instances[0].hide();
    }

    public setTooltip(node: NodeModel, content: string): void {
        if (content) {
            node.constraints = (node.constraints as NodeConstraints) | NodeConstraints.Tooltip;
            node.tooltip = { "content": content, "position": 'BottomCenter', "relativeMode": 'Object' };
        } else {
            node.constraints = (node.constraints as NodeConstraints) & ~NodeConstraints.Tooltip;
        }
    }

    private triggerEvents(addInfo: object): void {
        const removeBtnElements: HTMLCollectionOf<HTMLDivElement> =
            document.getElementsByClassName('propertyLabelDiv') as HTMLCollectionOf<HTMLDivElement>;

        const removeCheckBoxElements: HTMLCollectionOf<HTMLDivElement> =
            document.getElementsByClassName('propertyTooltipDiv') as HTMLCollectionOf<HTMLDivElement>;

        const propertyValueElements: HTMLCollectionOf<HTMLDivElement> =
            document.getElementsByClassName('propertyValueDiv') as HTMLCollectionOf<HTMLDivElement>;

        const addInfo1: { [key: string]: object } = addInfo as { [key: string]: object };
        const keys: string[] = Object.keys(addInfo1);
        for (let i: number = 0; i < keys.length; i++) {
            const removeBtnElement: HTMLButtonElement = removeBtnElements[i + 1].children[0] as HTMLButtonElement;
            const removeButton: Button = new Button({ iconCss: 'sf-icon-Delete', cssClass: keys[i] });
            removeButton.appendTo(removeBtnElement);
            removeBtnElement.onclick = this.showConfirmationDialog.bind(this);

            const checkboxTooltipElement: HTMLInputElement = removeCheckBoxElements[i + 1].children[0] as HTMLInputElement;
            const checkboxTooltip: CheckBox = new CheckBox({ checked: Boolean((addInfo1[keys[i]] as { [key: string]: object }).checked), cssClass: keys[i] });
            checkboxTooltip.change = this.removeField.bind(this);
            checkboxTooltip.appendTo(checkboxTooltipElement);

            (propertyValueElements[i + 1].children[0] as HTMLInputElement).value = (addInfo1[keys[i]] as { [key: string]: object }).value.toString();
            (propertyValueElements[i + 1].children[0] as HTMLInputElement).onchange = this.valueChange.bind(this);
        }
        const propButton: HTMLButtonElement =
            document.getElementsByClassName('db-custom-prop-button')[1] as HTMLButtonElement;
        const button: Button = new Button();
        button.appendTo(propButton);
        propButton.onclick = this.addCustomProperty.bind(this);
    }

    private clonePropInfoTemplate(key: string, keyValue: { [key: string]: any }): HTMLDivElement {
        const propertyInfo: HTMLDivElement =
            (document.getElementsByClassName('db-custom-prop-info-template')[0] as HTMLDivElement).cloneNode(true) as HTMLDivElement;
        propertyInfo.style.display = '';
        let propertyName: string = key;
        if (keyValue.type === 'nameField') {
            propertyName = 'Name';
        } else if (keyValue.type === 'imageField') {
            propertyName = 'Image URL';
        }
        propertyInfo.getElementsByClassName('propertyNameDiv')[0].innerHTML = propertyName;

        const removeBtnElement: HTMLButtonElement = propertyInfo.getElementsByClassName('btnRemoveProperty')[0] as HTMLButtonElement;
        if (keyValue.type !== 'bindingField') {
            removeBtnElement.style.display = 'None';
        }
        return propertyInfo;
    }

    private valueChange(args: MouseEvent): void {
        const target: HTMLInputElement = args.target as HTMLInputElement;
        const addInfo: any = (this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0].addInfo;
        addInfo[((target.parentElement as HTMLElement).parentElement as HTMLElement).children[0].innerHTML].value = target.value;
        let imageField: boolean = false;
        if (addInfo['Image URL'] && addInfo['Image URL'].checked) {
            imageField = true;
        }
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, true, imageField);
    }

    private removeField(args: ChangeEventArgs): void {
        const target: HTMLInputElement = (args.event as Event).target as HTMLInputElement;
        const className: string = ((target.parentElement as HTMLElement).parentElement as HTMLElement).className.replace('e-checkbox-wrapper ', '').trim();
        for (const selectedNode of  this.selectedItem.selectedDiagram.nodes) {
            const node: Node = selectedNode as Node;
            if (node.id !== 'textNode') {
                const nodeInfo: any = node.addInfo;
                nodeInfo[className].checked = args.checked;
            }
        }
        let imageField: boolean = false;
        const addInfo: any = (this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0].addInfo;
        if (addInfo['Image URL'] && addInfo['Image URL'].checked) {
            imageField = true;
        }
        this.selectedItem.utilityMethods.updateLayout(this.selectedItem, true, imageField);
    }

    private showConfirmationDialog(args: MouseEvent): void {
          let target: HTMLElement = args.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'span') {
            target = target.parentElement as HTMLElement;
        }
        this.deleteField = target.className.replace('btnRemoveProperty e-control e-btn ', '').replace(' e-icon-btn', '').trim();
        const dialog: any = document.getElementById('deleteConfirmationDialog');
        dialog.ej2_instances[0].show();
    }

   

    private createSpaceElement(element: HTMLElement): void {
        const spaceDiv: HTMLElement = document.createElement('div');
        spaceDiv.style.height = '10px';
        element.appendChild(spaceDiv);
    }

    private clonePropTemplate(): HTMLDivElement {
        const propertyInfo: HTMLDivElement =
            (document.getElementsByClassName('db-custom-prop-template')[0] as HTMLDivElement).cloneNode(true) as HTMLDivElement;
        propertyInfo.style.display = '';
        return propertyInfo;
    }

    private addCustomProperty(): void {
        const propName: string = (document.getElementsByClassName('txtPropertyName')[1] as HTMLInputElement).value;
        if (propName) {
            for (const selectedNode of this.selectedItem.selectedDiagram.nodes) {
                const node: Node = selectedNode as Node;
                if (node.id !== 'textNode') {
                    const nodeInfo: any = node.addInfo;
                    nodeInfo[propName] = { value: '', type: 'bindingField', checked: false };
                }
            }
            this.getPropertyDialogContent((this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0].addInfo as object);
        } else {
            alert('Invalid Name');
        }
    }    
}





