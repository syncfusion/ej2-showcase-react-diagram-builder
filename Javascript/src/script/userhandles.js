import { Node, ToolBase } from '@syncfusion/ej2-diagrams';
import { MindMapUtilityMethods } from './mindmap';
import { OrgChartUtilityMethods } from './orgchart';
import { OrgRemoveHandleTool, OrgEditHandleTool } from './handle';
export class CustomTool {
    constructor(selectedItem) {
        this.selectedItem = selectedItem;
    }
    getTool(action) {
        const tool = undefined;
        if (action === 'leftHandle') {
            const leftTool = new LeftExtendTool(this.selectedItem.selectedDiagram.commandHandler);
            leftTool.selectedItem = this.selectedItem;
            return leftTool;
        }
        else if (action === 'rightHandle') {
            const rightTool = new RightExtendTool(this.selectedItem.selectedDiagram.commandHandler);
            rightTool.selectedItem = this.selectedItem;
            return rightTool;
        }
        else if (action === 'removeHandle') {
            const removeTool = new RemoveTool(this.selectedItem.selectedDiagram.commandHandler);
            removeTool.selectedItem = this.selectedItem;
            return removeTool;
        }
        else if (action === 'orgAddHandle') {
            const orgAddTool = new OrgAddHandleTool(this.selectedItem.selectedDiagram.commandHandler);
            orgAddTool.selectedItem = this.selectedItem;
            return orgAddTool;
        }
        else if (action === 'orgRemoveHandle') {
            const orgRemoveTool = new OrgRemoveHandleTool(this.selectedItem.selectedDiagram.commandHandler);
            orgRemoveTool.selectedItem = this.selectedItem;
            return orgRemoveTool;
        }
        else if (action === 'orgEditHandle') {
            const orgEditTool = new OrgEditHandleTool(this.selectedItem.selectedDiagram.commandHandler);
            orgEditTool.selectedItem = this.selectedItem;
            return orgEditTool;
        }
        return tool;
    }
}
class LeftExtendTool extends ToolBase {
    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }
    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    MindMapUtilityMethods.addNode('Left');
                }
            }
        }
        super.mouseUp(args);
    }
}
class RightExtendTool extends ToolBase {
    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }
    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    MindMapUtilityMethods.addNode('Right');
                }
            }
        }
        super.mouseUp(args);
    }
}
class RemoveTool extends ToolBase {
    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }
    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    this.selectedItem.utilityMethods.removeChild(this.selectedItem);
                }
            }
        }
        super.mouseUp(args);
    }
}
class OrgAddHandleTool extends ToolBase {
    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }
    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    OrgChartUtilityMethods.addChild(this.selectedItem.selectedDiagram.selectedItems.nodes[0].id);
                }
            }
        }
        super.mouseUp(args);
    }
}