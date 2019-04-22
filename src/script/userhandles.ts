import { Node, ToolBase, MouseEventArgs, NodeModel } from '@syncfusion/ej2-diagrams';
import { MindMapUtilityMethods } from './mindmap';
import { OrgChartUtilityMethods } from './orgchart';
import { SelectorViewModel } from './selectedItem';
import {OrgRemoveHandleTool,OrgEditHandleTool} from'./handle';

export class CustomTool {
    public selectedItem: SelectorViewModel;
    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }
    public getTool(action: string): ToolBase {
        const tool: any = undefined;
        if (action === 'leftHandle') {
            const leftTool: LeftExtendTool = new LeftExtendTool(this.selectedItem.selectedDiagram.commandHandler);
            leftTool.selectedItem = this.selectedItem;
            return leftTool;
        } else if (action === 'rightHandle') {
            const rightTool: RightExtendTool = new RightExtendTool(this.selectedItem.selectedDiagram.commandHandler);
            rightTool.selectedItem = this.selectedItem;
            return rightTool;
        } else if (action === 'removeHandle') {
            const removeTool: RemoveTool = new RemoveTool(this.selectedItem.selectedDiagram.commandHandler);
            removeTool.selectedItem = this.selectedItem;
            return removeTool;
        } else if (action === 'orgAddHandle') {
            const orgAddTool: OrgAddHandleTool = new OrgAddHandleTool(this.selectedItem.selectedDiagram.commandHandler);
            orgAddTool.selectedItem = this.selectedItem;
            return orgAddTool;
        } else if (action === 'orgRemoveHandle') {
            const orgRemoveTool: OrgRemoveHandleTool = new OrgRemoveHandleTool(this.selectedItem.selectedDiagram.commandHandler);
            orgRemoveTool.selectedItem = this.selectedItem;
            return orgRemoveTool;
        } else if (action === 'orgEditHandle') {
            const orgEditTool: OrgEditHandleTool = new OrgEditHandleTool(this.selectedItem.selectedDiagram.commandHandler);
            orgEditTool.selectedItem = this.selectedItem;
            return orgEditTool;
        }
        return tool;
    }
}

class LeftExtendTool extends ToolBase {
    public selectedItem: SelectorViewModel;
    public mouseDown(args: MouseEventArgs): void {
        this.inAction = true;
        super.mouseDown(args);
    }
    public mouseUp(args: MouseEventArgs): void {
        if (this.inAction) {
            const selectedObject: object[] = this.commandHandler.getSelectedObject();
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
    public selectedItem: SelectorViewModel;
    public mouseDown(args: MouseEventArgs): void {
        this.inAction = true;
        super.mouseDown(args);
    }
    public mouseUp(args: MouseEventArgs): void {
        if (this.inAction) {
            const selectedObject: object[] = this.commandHandler.getSelectedObject();
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
    public selectedItem: SelectorViewModel;
    public mouseDown(args: MouseEventArgs): void {
        this.inAction = true;
        super.mouseDown(args);
    }
    public mouseUp(args: MouseEventArgs): void {
        if (this.inAction) {
            const selectedObject: object[] = this.commandHandler.getSelectedObject();
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
    public selectedItem: SelectorViewModel;
    public mouseDown(args: MouseEventArgs): void {
        this.inAction = true;
        super.mouseDown(args);
    }
    public mouseUp(args: MouseEventArgs): void {
        if (this.inAction) {
            const selectedObject: object[] = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    OrgChartUtilityMethods.addChild((this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0].id as string);
                }
            }
        }
        super.mouseUp(args);
    }
}

