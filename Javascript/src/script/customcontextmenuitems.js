import { CommonKeyboardCommands } from './commoncommands';
export class CustomContextMenuItems {
    constructor() {
        this.items = [
            {
                text: 'Duplicate', id: 'duplicate'
            },
        ];
    }
    getHiddenMenuItems(diagram) {
        const hiddenItems = [];
        hiddenItems.push('duplicate');
        if (diagram.selectedItems.nodes !== undefined && diagram.selectedItems.connectors !== undefined) {
            // hiddenItems.push('Ad-Hoc', 'Loop', 'Compensation', 'Activity-Type', 'Boundry',
            //     'Data Object', 'Collection', 'Call', 'Trigger Result', 'Event Type', 'Task Type', 'GateWay');
            if (diagram.selectedItems.nodes.length > 0 || diagram.selectedItems.connectors.length > 0) {
                hiddenItems.splice(hiddenItems.indexOf('duplicate'), 1);
            }
            if (diagram.selectedItems.nodes.length === 1 && diagram.selectedItems.connectors.length === 0) {
                const node = diagram.selectedItems.nodes[0];
                if (node.shape && node.shape.type === 'Bpmn') {
                    const bpmnShape = node.shape;
                    if (bpmnShape.shape === 'Event') {
                        // hiddenItems.splice(hiddenItems.indexOf('Event Type'), 1);
                        // hiddenItems.splice(hiddenItems.indexOf('Trigger Result'), 1);
                    }
                }
            }
        }
        return hiddenItems;
    }
    updateBpmnShape(diagram, item) {
        const itemText = item.text.replace(/[' ']/g, '').replace(/[-]/g, '');
        if (itemText === 'Duplicate') {
            CommonKeyboardCommands.duplicateSelectedItems();
        }
        else if (diagram.selectedItems.nodes !== undefined && diagram.selectedItems.nodes.length === 1 &&
            diagram.selectedItems.connectors !== undefined && diagram.selectedItems.connectors.length === 0) {
            const node = diagram.selectedItems.nodes[0];
            if (node.shape && node.shape.type === 'Bpmn') {
                const bpmnShape = node.shape;
                if (item.id.startsWith('eventType') && bpmnShape.event !== undefined) {
                    bpmnShape.event.event = itemText;
                }
                else if (item.id.startsWith('triggerType') && bpmnShape.event !== undefined) {
                    bpmnShape.event.trigger = itemText;
                }
                else if (item.id.startsWith('taskType') && bpmnShape.activity !== undefined) {
                    // bpmnShape.activity.task.type = itemText as BpmnTasks;
                    bpmnShape.activity.subProcess = {};
                }
            }
        }
    }
}