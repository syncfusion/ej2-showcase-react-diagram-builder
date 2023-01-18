import { Node, ToolBase } from '@syncfusion/ej2-diagrams';
import { OrgChartUtilityMethods } from './orgchart';
export class OrgRemoveHandleTool extends ToolBase {
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
export class OrgEditHandleTool extends ToolBase {
    mouseDown(args) {
        this.inAction = true;
        super.mouseDown(args);
    }
    mouseUp(args) {
        if (this.inAction) {
            const selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof Node) {
                    OrgChartUtilityMethods.showCustomProperty();
                }
            }
        }
        super.mouseUp(args);
    }
}