import { ContextMenuItemModel, Node, BpmnShapeModel, Diagram, BpmnEvents, BpmnTriggers } from '@syncfusion/ej2-diagrams';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { CommonKeyboardCommands } from './commoncommands';

export class CustomContextMenuItems {
    public items: ContextMenuItemModel[] = [
        {
            text: 'Duplicate', id: 'duplicate'
        },
    ];

    public getHiddenMenuItems(diagram: Diagram): string[] {
        const hiddenItems: string[] = [];
        hiddenItems.push('duplicate');
        if (diagram.selectedItems.nodes !== undefined && diagram.selectedItems.connectors !== undefined) {
            if (diagram.selectedItems.nodes.length > 0 || diagram.selectedItems.connectors.length > 0) {
                hiddenItems.splice(hiddenItems.indexOf('duplicate'), 1);
            }
            if (diagram.selectedItems.nodes.length === 1 && diagram.selectedItems.connectors.length === 0) {
                const node: Node = diagram.selectedItems.nodes[0] as Node;
                if (node.shape && node.shape.type === 'Bpmn') {
                    const bpmnShape: BpmnShapeModel = node.shape as BpmnShapeModel;
                    if (bpmnShape.shape === 'Event') {
                        
                    }
                }
            }
        }
        return hiddenItems;
    }

    public updateBpmnShape(diagram: Diagram, item: MenuItemModel): void {
        const itemText: string = (item.text as string).replace(/[' ']/g, '').replace(/[-]/g, '');
        if (itemText === 'Duplicate') {
            CommonKeyboardCommands.duplicateSelectedItems();
        } else if (diagram.selectedItems.nodes !== undefined && diagram.selectedItems.nodes.length === 1 &&
            diagram.selectedItems.connectors !== undefined && diagram.selectedItems.connectors.length === 0) {
            const node: Node = diagram.selectedItems.nodes[0] as Node;
            if (node.shape && node.shape.type === 'Bpmn') {

                const bpmnShape: BpmnShapeModel = node.shape as BpmnShapeModel;
                if ((item.id as string).startsWith('eventType') && bpmnShape.event !== undefined) {
                    bpmnShape.event.event = itemText as BpmnEvents;
                } else if ((item.id as string).startsWith('triggerType') && bpmnShape.event !== undefined) {
                    bpmnShape.event.trigger = itemText as BpmnTriggers;
                } else if ((item.id as string).startsWith('taskType') && bpmnShape.activity !== undefined) {
                   
                    bpmnShape.activity.subProcess = {}
                }
            }
        }
    }
}