import { Node, ToolBase, MouseEventArgs } from '@syncfusion/ej2-diagrams';
import { OrgChartUtilityMethods } from './orgchart';
import { SelectorViewModel } from './selectedItem';
import {} from'./userhandles';


export class OrgRemoveHandleTool extends ToolBase {
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

export class OrgEditHandleTool extends ToolBase {
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
                    OrgChartUtilityMethods.showCustomProperty();
                }
            }
        }
        super.mouseUp(args);
    }
}