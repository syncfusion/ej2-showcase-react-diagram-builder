
/**
 *  Palette handler
 */
import {
    NodeModel, ConnectorModel, SymbolInfo, PortVisibility, PortConstraints,
    PaletteModel, SymbolPreviewModel, MarginModel, ShapeStyle,
    NodeConstraints,
    ConnectorConstraints
} from '@syncfusion/ej2-diagrams';
import { ElectricalShapes } from './electrical-shapes';
import { FloorplanShapes } from './floorplan-shapes';
import { NetworkShapes } from './network-shapes';
import { ExpandMode } from '@syncfusion/ej2-navigations';
const NodeTooltipConstraints: NodeConstraints = NodeConstraints.Default | NodeConstraints.Tooltip;
const ConnectorTooltipConstraints: ConnectorConstraints = ConnectorConstraints.Default | ConnectorConstraints.Tooltip;
export class Palettes {
    public expandMode: ExpandMode = 'Multiple';
    public symbolPreview: SymbolPreviewModel = { height: 100, width: 100 };
    public enableSearch: boolean = true;
    public symbolMargin: MarginModel = { left: 12, right: 12, top: 12, bottom: 12 };
    public palettes: PaletteModel[] = [
        { id: 'flow', expanded: true, symbols: this.getFlowShapes(), title: 'Flow Shapes' },
        { id: 'basic', expanded: false, symbols: this.getBasicShapes(), title: 'Basic Shapes' },
        { id: 'bpmn', expanded: false, symbols: this.getBPMNShapes(), title: 'BPMN Shapes' },
        { id: 'connectors', expanded: false, symbols: this.getConnectors(), title: 'Connectors' }
    ];
    private electricalShapes: ElectricalShapes = new ElectricalShapes();
    private floorplans: FloorplanShapes = new FloorplanShapes();
    private networkShapes: NetworkShapes = new NetworkShapes();
    
    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
        return { fit: true };
    }
    public setPaletteNodeDefaults(node: NodeModel): void {
        if (!(node.addInfo && (node.addInfo as { [key: string]: any }).type === 'CustomShapes') && (!node.children)) {
            if (node.id === 'Terminator' || node.id === 'Process') {
                node.width = 130;
                node.height = 65;
            } else {
                node.width = 50;
                node.height = 50;
            }
            node.ports = [
                { offset: { x: 0, y: 0.5 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw },
                { offset: { x: 0.5, y: 0 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw },
                { offset: { x: 1, y: 0.5 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw },
                { offset: { x: 0.5, y: 1 }, style: { fill: 'white' }, visibility: PortVisibility.Connect | PortVisibility.Hover, constraints: PortConstraints.Default | PortConstraints.Draw }
            ];
            (node.style as ShapeStyle).strokeColor = '#3A3A3A';
        }
    }
    public getPalettes(text: string[]): PaletteModel[] {
        let palettes: PaletteModel[] = [];
        if (text.indexOf('Flow') !== -1) {
            palettes.push({ id: 'flow', expanded: true, symbols: this.getFlowShapes(), title: 'Flow Shapes' });
        }
        if (text.indexOf('Basic') !== -1) {
            palettes.push({ id: 'basic', expanded: false, symbols: this.getBasicShapes(), title: 'Basic Shapes' });
        }
        if (text.indexOf('BPMN') !== -1) {
            palettes.push({ id: 'bpmn', expanded: false, symbols: this.getBPMNShapes(), title: 'BPMN Shapes' });
        }
        if (text.indexOf('Connectors') !== -1) {
            palettes.push({ id: 'connectors', expanded: false, symbols: this.getConnectors(), title: 'Connectors' });
        }
        if (text.indexOf('Electrical') !== -1) {
            palettes = palettes.concat(this.electricalShapes.getElectricalShapes());
        }
        if (text.indexOf('Network') !== -1) {
            palettes.push({ id: 'network', expanded: false, symbols: this.networkShapes.getNetworkShapes(), title: 'Network Shapes' });
        }
        if (text.indexOf('Floorplan') !== -1) {
            palettes.push({ id: 'floorplan', expanded: false, symbols: this.floorplans.getFloorPlans(), title: 'Floorplan Shapes' });
        }
        return palettes;
    }
    private getBasicShapes(): NodeModel[] {
        const basicShapes: NodeModel[] = [
            { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' }, style: { strokeWidth: 2 }, tooltip: { content: 'Rectangle' }, constraints: NodeTooltipConstraints },
            { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeWidth: 2 }, tooltip: { content: 'Ellipse' }, constraints: NodeTooltipConstraints },
            { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' }, style: { strokeWidth: 2 }, tooltip: { content: 'Hexagon' }, constraints: NodeTooltipConstraints },
            { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' }, style: { strokeWidth: 2 }, tooltip: { content: 'Parallelogram' }, constraints: NodeTooltipConstraints },
            { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' }, style: { strokeWidth: 2 }, tooltip: { content: 'Triangle' }, constraints: NodeTooltipConstraints },
            { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' }, style: { strokeWidth: 2 }, tooltip: { content: 'Plus' }, constraints: NodeTooltipConstraints },
            { id: 'Star', shape: { type: 'Basic', shape: 'Star' }, style: { strokeWidth: 2 }, tooltip: { content: 'Star' }, constraints: NodeTooltipConstraints },
            { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' }, style: { strokeWidth: 2 }, tooltip: { content: 'Pentagon' }, constraints: NodeTooltipConstraints },
            { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' }, style: { strokeWidth: 2 }, tooltip: { content: 'Heptagon' }, constraints: NodeTooltipConstraints },
            { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' }, style: { strokeWidth: 2 }, tooltip: { content: 'Octagon' }, constraints: NodeTooltipConstraints },
            { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' }, style: { strokeWidth: 2 }, tooltip: { content: 'Trapezoid' }, constraints: NodeTooltipConstraints },
            { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' }, style: { strokeWidth: 2 }, tooltip: { content: 'Decagon' }, constraints: NodeTooltipConstraints },
            { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' }, style: { strokeWidth: 2 }, tooltip: { content: 'Right Triangle' }, constraints: NodeTooltipConstraints },
            { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' }, style: { strokeWidth: 2 }, tooltip: { content: 'Cylinder' }, constraints: NodeTooltipConstraints },
            { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' }, style: { strokeWidth: 2 }, tooltip: { content: 'Diamond' }, constraints: NodeTooltipConstraints },
        ];
        return basicShapes;
    }
    private getFlowShapes(): NodeModel[] {
        const flowShapes: NodeModel[] = [
            { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' }, style: { strokeWidth: 2 }, tooltip: { content: 'Terminator' }, constraints: NodeTooltipConstraints },
            { id: 'Process', shape: { type: 'Flow', shape: 'Process' }, style: { strokeWidth: 2 }, tooltip: { content: 'Process' }, constraints: NodeTooltipConstraints },
            { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' }, style: { strokeWidth: 2 }, tooltip: { content: 'Decision' }, constraints: NodeTooltipConstraints },
            { id: 'Document', shape: { type: 'Flow', shape: 'Document' }, style: { strokeWidth: 2 }, tooltip: { content: 'Document' }, constraints: NodeTooltipConstraints },
            { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' }, style: { strokeWidth: 2 }, tooltip: { content: 'Pre Defined Process' }, constraints: NodeTooltipConstraints },
            { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' }, style: { strokeWidth: 2 }, tooltip: { content: 'Paper Tap' }, constraints: NodeTooltipConstraints },
            { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' }, style: { strokeWidth: 2 }, tooltip: { content: 'Direct Data' }, constraints: NodeTooltipConstraints },
            { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' }, style: { strokeWidth: 2 }, tooltip: { content: 'Sequential Data' }, constraints: NodeTooltipConstraints },
            { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' }, style: { strokeWidth: 2 }, tooltip: { content: 'Sort' }, constraints: NodeTooltipConstraints },
            { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' }, style: { strokeWidth: 2 }, tooltip: { content: 'Multi Document' }, constraints: NodeTooltipConstraints },
            { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' }, style: { strokeWidth: 2 }, tooltip: { content: 'Collate' }, constraints: NodeTooltipConstraints },
            { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' }, style: { strokeWidth: 2 }, tooltip: { content: 'Summing Junction' }, constraints: NodeTooltipConstraints },
            { id: 'Or', shape: { type: 'Flow', shape: 'Or' }, style: { strokeWidth: 2 }, tooltip: { content: 'Or' }, constraints: NodeTooltipConstraints },
            { id: 'InternalStorage', shape: { type: 'Flow', shape: 'InternalStorage' }, style: { strokeWidth: 2 }, tooltip: { content: 'Internal Storage' }, constraints: NodeTooltipConstraints },
            { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' }, style: { strokeWidth: 2 }, tooltip: { content: 'Extract' }, constraints: NodeTooltipConstraints },
            { id: 'ManualOperation', shape: { type: 'Flow', shape: 'ManualOperation' }, style: { strokeWidth: 2 }, tooltip: { content: 'Manual Operation' }, constraints: NodeTooltipConstraints },
            { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' }, style: { strokeWidth: 2 }, tooltip: { content: 'Merge' }, constraints: NodeTooltipConstraints },
            { id: 'OffPageReference', shape: { type: 'Flow', shape: 'OffPageReference' }, style: { strokeWidth: 2 }, tooltip: { content: 'Off Page Reference' }, constraints: NodeTooltipConstraints },
            { id: 'SequentialAccessStorage', shape: { type: 'Flow', shape: 'SequentialAccessStorage' }, style: { strokeWidth: 2 }, tooltip: { content: 'Sequential Access Storage' }, constraints: NodeTooltipConstraints },
            { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' }, style: { strokeWidth: 2 }, tooltip: { content: 'Annotation' }, constraints: NodeTooltipConstraints },
            { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' }, style: { strokeWidth: 2 }, tooltip: { content: 'Annotation 2' }, constraints: NodeTooltipConstraints },
            { id: 'Data', shape: { type: 'Flow', shape: 'Data' }, style: { strokeWidth: 2 }, tooltip: { content: 'Data' }, constraints: NodeTooltipConstraints },
            { id: 'Card', shape: { type: 'Flow', shape: 'Card' }, style: { strokeWidth: 2 }, tooltip: { content: 'Card' }, constraints: NodeTooltipConstraints },
            { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' }, style: { strokeWidth: 2 }, tooltip: { content: 'Delay' }, constraints: NodeTooltipConstraints },
            { id: 'Preparation', shape: { type: 'Flow', shape: 'Preparation' }, style: { strokeWidth: 2 }, tooltip: { content: 'Preparation' }, constraints: NodeTooltipConstraints },
            { id: 'Display', shape: { type: 'Flow', shape: 'Display' }, style: { strokeWidth: 2 }, tooltip: { content: 'Display' }, constraints: NodeTooltipConstraints },
            { id: 'ManualInput', shape: { type: 'Flow', shape: 'ManualInput' }, style: { strokeWidth: 2 }, tooltip: { content: 'Manual Input' }, constraints: NodeTooltipConstraints },
            { id: 'LoopLimit', shape: { type: 'Flow', shape: 'LoopLimit' }, style: { strokeWidth: 2 }, tooltip: { content: 'Loop Limit' }, constraints: NodeTooltipConstraints },
            { id: 'StoredData', shape: { type: 'Flow', shape: 'StoredData' }, style: { strokeWidth: 2 }, tooltip: { content: 'Stored Data' }, constraints: NodeTooltipConstraints }
        ];
        return flowShapes;
    }
    private getBPMNShapes(): NodeModel[] {
        const bpmnShapes: NodeModel[] = [
            {
                id: 'BPMNStart', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'None' } }, tooltip: { content: 'BPMN Start' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'Intermediate', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Intermediate', trigger: 'None' } }, tooltip: { content: 'Intermediate' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'End', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'None' } }, tooltip: { content: 'End' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'Gateway', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Gateway' }, tooltip: { content: 'Gateway' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'Task', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } }, tooltip: { content: 'Task' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'SubProcessEventBased', style: { strokeWidth: 2 }, shape: {
                    type: 'Bpmn', shape: 'Activity', activity: {
                        activity: 'SubProcess',
                        subProcess: { type: 'Transaction', transaction: { success: { visible: false }, failure: { visible: false }, cancel: { visible: false } } }
                    },
                }, tooltip: { content: 'Subprocess Event Based' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'Message', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Message' }, tooltip: { content: 'Message' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'DataObject', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'DataObject' }, tooltip: { content: 'Data Object' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'DataSource', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'DataSource' }, tooltip: { content: 'Data Source' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'Activity', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Activity' }, tooltip: { content: 'Activity' }, constraints: NodeTooltipConstraints
            },
            {
                id: 'Group', style: { strokeWidth: 2 }, shape: { type: 'Bpmn', shape: 'Group' }, tooltip: { content: 'Group' }, constraints: NodeTooltipConstraints
            },

        ];
        return bpmnShapes;
    }
    private getConnectors(): ConnectorModel[] {
        const connectorSymbols: ConnectorModel[] = [
            {
                id: 'OrthogonalArrow', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2 }, tooltip: { content: 'Orthogonal Arrow' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'OrthogonalDashedArrow', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2, strokeDashArray: '3,3' }, tooltip: { content: 'Orthogonal Dashed Arrow' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'Orthogonal', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }, tooltip: { content: 'Orthogonal' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'OrthogonalDashed', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2, strokeDashArray: '3,3' }, targetDecorator: { shape: 'None' }, tooltip: { content: 'Orthogonal Dashed' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'StraightArrow', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2 }, tooltip: { content: 'Straight Arrow' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'StraightDashedArrow', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow', style: { strokeWidth: 2 } }, style: { strokeWidth: 2, strokeDashArray: '3,3' }, tooltip: { content: 'Straight Dashed Arrow' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'Straight', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }, tooltip: { content: 'Straight' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'StraightDashed', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2, strokeDashArray: '3,3' }, targetDecorator: { shape: 'None' }, tooltip: { content: 'Straight Dashed' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'Bezier', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2 }, targetDecorator: { shape: 'None' }, tooltip: { content: 'Bezier' }, constraints: ConnectorTooltipConstraints
            },
            {
                id: 'BezierDashed', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                style: { strokeWidth: 2, strokeDashArray: '3,3' }, targetDecorator: { shape: 'None' }, tooltip: { content: 'Bezier Dashed' }, constraints: ConnectorTooltipConstraints
            }
        ];
        return connectorSymbols;
    }


}