/**
 *  Layers handler
 */

import { SelectorViewModel } from './selectedItem';
import { Button } from '@syncfusion/ej2-buttons';
import { LayerModel } from '@syncfusion/ej2-diagrams/src/diagram/diagram/layer-model';
import { Dialog } from '@syncfusion/ej2-react-popups';


export class DiagramBuilderLayer {
    
    public selectedItem: SelectorViewModel;
    public layerDialog: Dialog;
    // public selectionLayer: Button;
    private removeLayer: Button;
    private isEditing: boolean = false;
    private layerCount1: number = 0;
    constructor(selectedItem: SelectorViewModel, layerDialog: Dialog) {
        this.selectedItem = selectedItem;
        this.layerDialog = layerDialog;
    }   

    public getLayerDialogContent(): void {
        const layerDialogContent: HTMLElement = document.createElement('div');
        const layers: LayerModel[] = this.getLayers();
        if (layers.length > 0) {
            let orderType: string = 'None';
            for (let i: number = layers.length - 1; i >= 0; i--) {
                if (layers.length > 1) {
                    if (i === layers.length - 1) {
                        orderType = 'Backward';
                    } else if (i === 0) {
                        orderType = 'Forward';
                    } else {
                        orderType = 'Both';
                    }
                }
                layerDialogContent.appendChild(this.cloneLayerTemplate(layers[i], orderType, i));
            }
            if (layers.length === 1) {
                this.removeLayer.disabled = true;
            } else {
                this.removeLayer.disabled = false;
            }
        }
        this.layerDialog.content = layerDialogContent.outerHTML;
        this.layerDialog.dataBind();
        this.triggerEvents();
    }

    public cloneLayerTemplate(layer: LayerModel, orderType: string, index: number): HTMLDivElement {
        const layerTemplate: HTMLDivElement =
            (document.getElementsByClassName('db-layer-template')[0] as HTMLDivElement).cloneNode(true) as HTMLDivElement;
        layerTemplate.style.display = '';
        if (this.getActiveLayer(layer)) {
            layerTemplate.className = 'db-layer-template active';
        }

        const layerNameElement: HTMLSpanElement =
            layerTemplate.getElementsByClassName('db-layer-name')[0] as HTMLSpanElement;
        layerNameElement.innerHTML = (layer.addInfo as { [key: string]: any }).name as string;
        layerNameElement.className = 'db-layer-name ' + layer.id;

        (layerNameElement.parentNode as HTMLDivElement).style.width = 'calc(100% - ' + 88 + 'px)';
        return layerTemplate;
    }

    public triggerEvents(): void {
        const visibleElements: HTMLCollectionOf<HTMLButtonElement> =
            document.getElementsByClassName('db-layer-visible') as HTMLCollectionOf<HTMLButtonElement>;
        const lockElements: HTMLCollectionOf<HTMLButtonElement> =
            document.getElementsByClassName('db-layer-lock') as HTMLCollectionOf<HTMLButtonElement>;
        let i: number;
        const layers: LayerModel[] = this.getLayers();
        for (i = 0; i < layers.length; i++) {
            const layer: LayerModel = layers[i];
            const visibleLayer: Button = new Button({
                iconCss: layer.visible ? 'sf-icon-View' : 'sf-icon-Invisible',
                cssClass: layer.id
            });
            const visibleElement: HTMLButtonElement = visibleElements[layers.length - i];
            visibleElement.title = layer.visible ? 'Visible' : 'Invisible';
            visibleLayer.appendTo(visibleElement);
            visibleElement.onclick = this.changeLayerVisibility.bind(this);
            if (!layer.visible) {
                (visibleElement.parentElement as HTMLElement).className = 'db-layer-content-btn db-layer-invisible';
            }

            const lockElement: HTMLButtonElement = lockElements[layers.length - i];
            const lockLayer: Button = new Button({
                iconCss: layer.lock ? 'sf-icon-Lock' : 'sf-icon-Unlock',
                cssClass: layer.id,
            });
            lockLayer.appendTo(lockElement);
            lockElement.title = layer.lock ? 'Lock' : 'Unlock';
            lockElement.onclick = this.changeLayerSelection.bind(this);
            if (layer.lock) {
                (lockElement.parentElement as HTMLElement).className = 'db-layer-content-btn db-layer-invisible';
            }

        }

        const layerNameElements: HTMLCollectionOf<HTMLDivElement> =
            document.getElementsByClassName('db-layer-name') as HTMLCollectionOf<HTMLDivElement>;
            let j: number;

        for ( j= 0; j < layerNameElements.length; j++) {
            const layerNameElement: HTMLDivElement = layerNameElements[j];
            (layerNameElement.parentElement as HTMLElement).onclick = this.setActiveLayer.bind(this);
            (layerNameElement.parentElement as HTMLElement).ondblclick = this.btnRenameLayer.bind(this);
            ((layerNameElement.parentElement as HTMLElement).children[1] as HTMLInputElement).addEventListener('focusout', this.renameLayer.bind(this));
            ((layerNameElement.parentElement as HTMLElement).children[1] as HTMLInputElement).addEventListener('keydown', this.renameLayerKeyDown.bind(this));
        }
    }
    public renameLayerKeyDown(args: MouseEvent): void {
        if (args.which === 13) {
            this.renameLayer(args);
        }
    }

    public getLayerBottomPanel(): string {

        const bottomPanel: string = '<div class="db-layer-bottom-panel">' +
        '<div class="row" style="margin-top: 6px;">' +
        '<div class="col-xs-2">' +
        '<button id="btnAdd" style="right:16px;position:absolute"></button>' +
        '</div>' +
        '<div class="col-xs-2">' +
        '<button id="btnDuplicate" style="right:14px;position:absolute"></button>' +
        '</div>' +
        '<div class="col-xs-2">' +
        '<button id="btnRemove" style="right:12px;position:absolute"></button>' +
        '</div>' +
        '<div class="col-xs-2">' +
        '<button id="btnCloseLayer" style="right:10px;position:absolute"></button>' +
        '</div>' +
        '</div>' +
        '</div>';
        return bottomPanel;
    }

    public initLayerBottomPanel(): void {

        this.removeLayer = new Button({ iconCss: 'sf-icon-Delete' });
        this.removeLayer.appendTo('#btnRemove');
        (document.getElementById('btnRemove') as HTMLElement).onclick = this.btnRemoveLayer.bind(this);

        // this.selectionLayer = new Button({ content: 'M.Selection', disabled: true });
        // this.selectionLayer.appendTo('#btnSelection');
        // document.getElementById('btnSelection').onclick = this.btnSelectionLayer;

        const duplicateLayer: Button = new Button({ iconCss: 'sf-icon-Copy' });
        duplicateLayer.appendTo('#btnDuplicate');
        (document.getElementById('btnDuplicate') as HTMLElement).onclick = this.btnDuplicateLayer.bind(this);

        const addLayer: Button = new Button({ iconCss: 'sf-icon-Plus' });
        addLayer.appendTo('#btnAdd');
        (document.getElementById('btnAdd') as HTMLElement).onclick = this.btnAddLayer.bind(this);

        const closeLayer: Button = new Button({ iconCss: 'sf-icon-Close' });
        closeLayer.appendTo('#btnCloseLayer');
        (document.getElementById('btnCloseLayer') as HTMLElement).onclick = this.btnCloseDialog.bind(this);
    }

    public changeLayerSelection(args: MouseEvent): void {
        const element: any = args.target;
        const layerName: string = element.className.replace('db-layer-lock e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
        const layer: LayerModel = this.findLayer(layerName);
        layer.lock = !layer.lock;
        element.ej2_instances[0].iconCss = layer.lock ? 'sf-icon-Lock' : 'sf-icon-Unlock';
        element.title = layer.lock ? 'Lock' : 'Unlock';
        element.parentElement.className = layer.lock ? 'db-layer-content-btn db-layer-invisible' : 'db-layer-content-btn';
        this.selectedItem.selectedDiagram.dataBind();
    }

    public changeLayerVisibility(args: MouseEvent): void {
        const element: any = args.target;
        const layerName: string = element.className.replace('db-layer-visible e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
        const layer: LayerModel = this.findLayer(layerName);
        layer.visible = !layer.visible;
        element.ej2_instances[0].iconCss = layer.visible ? 'sf-icon-View' : 'sf-icon-Invisible';
        element.title = layer.visible ? 'Visible' : 'Invisible';
        element.parentElement.className = layer.visible ? 'db-layer-content-btn' : 'db-layer-content-btn db-layer-invisible';
        this.selectedItem.selectedDiagram.dataBind();
    }

    public changeLayerZorder(args: MouseEvent): void {
        const element: HTMLElement = args.target as HTMLElement;
        let layerName: string = element.className.replace('db-layer-order-second e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
        layerName = layerName.replace('db-layer-order-first e-control e-btn ', '').replace(' e-ripple', '');
        if (element.innerText.toLowerCase() === 'forward') {
            this.selectedItem.selectedDiagram.bringLayerForward(layerName);
        } else {
            this.selectedItem.selectedDiagram.sendLayerBackward(layerName);
        }
        this.getLayerDialogContent();
    }

    public setActiveLayer(args: MouseEvent): void {
        if (!this.isEditing) {
            const target: HTMLDivElement = args.target as HTMLDivElement;
            this.selectedItem.selectedDiagram.setActiveLayer(target.children[0].className.replace('db-layer-name ', ''));
            const elements: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName('db-layer-template active') as HTMLCollectionOf<HTMLDivElement>;
            if (elements.length > 0) {
                elements[0].className = 'db-layer-template';
            }
            ((target.parentElement as HTMLElement).parentElement as HTMLElement).className = 'db-layer-template active';
        }
    }

    public btnRenameLayer(args: MouseEvent): void {
        if (!this.isEditing) {
            const target: HTMLDivElement = args.target as HTMLDivElement;
            target.classList.add('db-layer-editing');
            const inputElement: HTMLInputElement = target.children[1] as HTMLInputElement;
            inputElement.focus();
            inputElement.value = target.children[0].innerHTML;
            inputElement.select();
            this.isEditing = true;
        }
    }

    public renameLayer(args: MouseEvent): void {
        const target: HTMLInputElement = args.target as HTMLInputElement;
        const addInfo: { [key: string]: any } = this.selectedItem.selectedDiagram.activeLayer.addInfo as { [key: string]: any };
        (target.parentElement as HTMLElement).children[0].innerHTML = addInfo.name = target.value;
        (target.parentElement as HTMLElement).classList.remove('db-layer-editing');
        this.isEditing = false;
    }

    public btnRemoveLayer(args: MouseEvent): void {
        const activeLayerIndex: number = this.getLayers().indexOf(this.selectedItem.selectedDiagram.activeLayer);
        this.selectedItem.selectedDiagram.removeLayer(this.selectedItem.selectedDiagram.activeLayer.id as string);
        if (activeLayerIndex - 1 < 0) {
            this.selectedItem.selectedDiagram.setActiveLayer(this.getLayers()[0].id as string);
        } else {
            this.selectedItem.selectedDiagram.setActiveLayer(this.getLayers()[activeLayerIndex - 1].id as string);
        }
        this.getLayerDialogContent();
    }

    public btnCloseDialog(): void {
        this.layerDialog.hide();
        const btnWindow: any = document.getElementById('btnWindowMenu');
        btnWindow.ej2_instances[0].items[3].iconCss = '';
    }

    // public btnSelectionLayer(): void {
    //     const diagram: Diagram = this.selectedItem.selectedDiagram;
    //     const objects: string[] = [];
    //     for (const i: number = 0; i < diagram.selectedItems.nodes.length; i++) {
    //         objects.push(diagram.selectedItems.nodes[i].id);
    //     }
    //     for (const i: number = 0; i < diagram.selectedItems.connectors.length; i++) {
    //         objects.push(diagram.selectedItems.connectors[i].id);
    //     }
    //     diagram.moveObjects(objects, diagram.activeLayer.id);
    // }

    public btnDuplicateLayer(): void {
        const name: string = (this.selectedItem.selectedDiagram.activeLayer.addInfo as { [key: string]: string }).name;
        this.selectedItem.selectedDiagram.cloneLayer(this.selectedItem.selectedDiagram.activeLayer.id as string);
        this.selectedItem.selectedDiagram.layers[this.selectedItem.selectedDiagram.layers.length - 1].addInfo = {
            'name': name + ' Copy'
        };
        this.getLayerDialogContent();
    }

    public btnAddLayer(): void {
        const layer: LayerModel = {
            id: 'Untitled_Layer' + this.layerCount1,
            addInfo: {
                'name': 'Untitled_Layer' + this.layerCount1
            }
        };
        this.selectedItem.selectedDiagram.addLayer(layer);
        this.getLayerDialogContent();
        this.layerCount1++;
    }

    public getActiveLayer(layer: LayerModel): LayerModel {
        if (layer.id === this.selectedItem.selectedDiagram.activeLayer.id) {
            return layer;
        }
        return {};
    }

    public findLayer(layerName: string): LayerModel {
        const layers: LayerModel[] = this.getLayers();
        for (const item of  layers) {
            if (item.id === layerName) {
                return item;
            }
        }
        return {};
    }

    private getLayers(): LayerModel[] {
        return this.selectedItem.selectedDiagram.layers.sort((a: LayerModel, b: LayerModel): number => {
            return (a.zIndex as number) - (b.zIndex as number);
        });
    }
}