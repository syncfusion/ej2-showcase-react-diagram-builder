/**
 *  Layers handler
 */
 import { Button } from '@syncfusion/ej2-buttons';
 export class DiagramBuilderLayer {
     constructor(selectedItem, layerDialog) {
         this.isEditing = false;
         this.layerCount1 = 0;
         this.selectedItem = selectedItem;
         this.layerDialog = layerDialog;
     }
     getLayerDialogContent() {
         const layerDialogContent = document.createElement('div');
         const layers = this.getLayers();
         if (layers.length > 0) {
             let orderType = 'None';
             for (let i = layers.length - 1; i >= 0; i--) {
                 if (layers.length > 1) {
                     if (i === layers.length - 1) {
                         orderType = 'Backward';
                     }
                     else if (i === 0) {
                         orderType = 'Forward';
                     }
                     else {
                         orderType = 'Both';
                     }
                 }
                 layerDialogContent.appendChild(this.cloneLayerTemplate(layers[i], orderType, i));
             }
             if (layers.length === 1) {
                 this.removeLayer.disabled = true;
             }
             else {
                 this.removeLayer.disabled = false;
             }
         }
         this.layerDialog.content = layerDialogContent.outerHTML;
         this.layerDialog.dataBind();
         this.triggerEvents();
     }
     cloneLayerTemplate(layer, orderType, index) {
         const layerTemplate = document.getElementsByClassName('db-layer-template')[0].cloneNode(true);
         layerTemplate.style.display = '';
         if (this.getActiveLayer(layer)) {
             layerTemplate.className = 'db-layer-template active';
         }
         const layerNameElement = layerTemplate.getElementsByClassName('db-layer-name')[0];
         layerNameElement.innerHTML = layer.addInfo.name;
         layerNameElement.className = 'db-layer-name ' + layer.id;
         layerNameElement.parentNode.style.width = 'calc(100% - ' + 88 + 'px)';
         return layerTemplate;
     }
     triggerEvents() {
         const visibleElements = document.getElementsByClassName('db-layer-visible');
         const lockElements = document.getElementsByClassName('db-layer-lock');
         let i;
         const layers = this.getLayers();
         for (i = 0; i < layers.length; i++) {
             const layer = layers[i];
             const visibleLayer = new Button({
                 iconCss: layer.visible ? 'sf-icon-View' : 'sf-icon-Invisible',
                 cssClass: layer.id
             });
             const visibleElement = visibleElements[layers.length - i];
             visibleElement.title = layer.visible ? 'Visible' : 'Invisible';
             visibleLayer.appendTo(visibleElement);
             visibleElement.onclick = this.changeLayerVisibility.bind(this);
             if (!layer.visible) {
                 visibleElement.parentElement.className = 'db-layer-content-btn db-layer-invisible';
             }
             const lockElement = lockElements[layers.length - i];
             const lockLayer = new Button({
                 iconCss: layer.lock ? 'sf-icon-Lock' : 'sf-icon-Unlock',
                 cssClass: layer.id,
             });
             lockLayer.appendTo(lockElement);
             lockElement.title = layer.lock ? 'Lock' : 'Unlock';
             lockElement.onclick = this.changeLayerSelection.bind(this);
             if (layer.lock) {
                 lockElement.parentElement.className = 'db-layer-content-btn db-layer-invisible';
             }
         }
         const layerNameElements = document.getElementsByClassName('db-layer-name');
         let j;
         for (j = 0; j < layerNameElements.length; j++) {
             const layerNameElement = layerNameElements[j];
             layerNameElement.parentElement.onclick = this.setActiveLayer.bind(this);
             layerNameElement.parentElement.ondblclick = this.btnRenameLayer.bind(this);
             layerNameElement.parentElement.children[1].addEventListener('focusout', this.renameLayer.bind(this));
             layerNameElement.parentElement.children[1].addEventListener('keydown', this.renameLayerKeyDown.bind(this));
         }
     }
     renameLayerKeyDown(args) {
         if (args.which === 13) {
             this.renameLayer(args);
         }
     }
     getLayerBottomPanel() {
         const bottomPanel = '<div class="db-layer-bottom-panel">' +
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
     initLayerBottomPanel() {
         this.removeLayer = new Button({ iconCss: 'sf-icon-Delete' });
         this.removeLayer.appendTo('#btnRemove');
         document.getElementById('btnRemove').onclick = this.btnRemoveLayer.bind(this);
         // this.selectionLayer = new Button({ content: 'M.Selection', disabled: true });
         // this.selectionLayer.appendTo('#btnSelection');
         // document.getElementById('btnSelection').onclick = this.btnSelectionLayer;
         const duplicateLayer = new Button({ iconCss: 'sf-icon-Copy' });
         duplicateLayer.appendTo('#btnDuplicate');
         document.getElementById('btnDuplicate').onclick = this.btnDuplicateLayer.bind(this);
         const addLayer = new Button({ iconCss: 'sf-icon-Plus' });
         addLayer.appendTo('#btnAdd');
         document.getElementById('btnAdd').onclick = this.btnAddLayer.bind(this);
         const closeLayer = new Button({ iconCss: 'sf-icon-Close' });
         closeLayer.appendTo('#btnCloseLayer');
         document.getElementById('btnCloseLayer').onclick = this.btnCloseDialog.bind(this);
     }
     changeLayerSelection(args) {
         const element = args.target;
         const layerName = element.className.replace('db-layer-lock e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
         const layer = this.findLayer(layerName);
         layer.lock = !layer.lock;
         element.ej2_instances[0].iconCss = layer.lock ? 'sf-icon-Lock' : 'sf-icon-Unlock';
         element.title = layer.lock ? 'Lock' : 'Unlock';
         element.parentElement.className = layer.lock ? 'db-layer-content-btn db-layer-invisible' : 'db-layer-content-btn';
         this.selectedItem.selectedDiagram.dataBind();
     }
     changeLayerVisibility(args) {
         const element = args.target;
         const layerName = element.className.replace('db-layer-visible e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
         const layer = this.findLayer(layerName);
         layer.visible = !layer.visible;
         element.ej2_instances[0].iconCss = layer.visible ? 'sf-icon-View' : 'sf-icon-Invisible';
         element.title = layer.visible ? 'Visible' : 'Invisible';
         element.parentElement.className = layer.visible ? 'db-layer-content-btn' : 'db-layer-content-btn db-layer-invisible';
         this.selectedItem.selectedDiagram.dataBind();
     }
     changeLayerZorder(args) {
         const element = args.target;
         let layerName = element.className.replace('db-layer-order-second e-control e-btn ', '').replace(' e-icon-btn', '').replace(' e-ripple', '');
         layerName = layerName.replace('db-layer-order-first e-control e-btn ', '').replace(' e-ripple', '');
         if (element.innerText.toLowerCase() === 'forward') {
             this.selectedItem.selectedDiagram.bringLayerForward(layerName);
         }
         else {
             this.selectedItem.selectedDiagram.sendLayerBackward(layerName);
         }
         this.getLayerDialogContent();
     }
     setActiveLayer(args) {
         if (!this.isEditing) {
             const target = args.target;
             this.selectedItem.selectedDiagram.setActiveLayer(target.children[0].className.replace('db-layer-name ', ''));
             const elements = document.getElementsByClassName('db-layer-template active');
             if (elements.length > 0) {
                 elements[0].className = 'db-layer-template';
             }
             target.parentElement.parentElement.className = 'db-layer-template active';
         }
     }
     btnRenameLayer(args) {
         if (!this.isEditing) {
             const target = args.target;
             target.classList.add('db-layer-editing');
             const inputElement = target.children[1];
             inputElement.focus();
             inputElement.value = target.children[0].innerHTML;
             inputElement.select();
             this.isEditing = true;
         }
     }
     renameLayer(args) {
         const target = args.target;
         const addInfo = this.selectedItem.selectedDiagram.activeLayer.addInfo;
         target.parentElement.children[0].innerHTML = addInfo.name = target.value;
         target.parentElement.classList.remove('db-layer-editing');
         this.isEditing = false;
     }
     btnRemoveLayer(args) {
         const activeLayerIndex = this.getLayers().indexOf(this.selectedItem.selectedDiagram.activeLayer);
         this.selectedItem.selectedDiagram.removeLayer(this.selectedItem.selectedDiagram.activeLayer.id);
         if (activeLayerIndex - 1 < 0) {
             this.selectedItem.selectedDiagram.setActiveLayer(this.getLayers()[0].id);
         }
         else {
             this.selectedItem.selectedDiagram.setActiveLayer(this.getLayers()[activeLayerIndex - 1].id);
         }
         this.getLayerDialogContent();
     }
     btnCloseDialog() {
         this.layerDialog.hide();
         const btnWindow = document.getElementById('btnWindowMenu');
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
     btnDuplicateLayer() {
         const name = this.selectedItem.selectedDiagram.activeLayer.addInfo.name;
         this.selectedItem.selectedDiagram.cloneLayer(this.selectedItem.selectedDiagram.activeLayer.id);
         this.selectedItem.selectedDiagram.layers[this.selectedItem.selectedDiagram.layers.length - 1].addInfo = {
             'name': name + ' Copy'
         };
         this.getLayerDialogContent();
     }
     btnAddLayer() {
         const layer = {
             id: 'Untitled_Layer' + this.layerCount1,
             addInfo: {
                 'name': 'Untitled_Layer' + this.layerCount1
             }
         };
         this.selectedItem.selectedDiagram.addLayer(layer);
         this.getLayerDialogContent();
         this.layerCount1++;
     }
     getActiveLayer(layer) {
         if (layer.id === this.selectedItem.selectedDiagram.activeLayer.id) {
             return layer;
         }
         return {};
     }
     findLayer(layerName) {
         const layers = this.getLayers();
         for (const item of layers) {
             if (item.id === layerName) {
                 return item;
             }
         }
         return {};
     }
     getLayers() {
         return this.selectedItem.selectedDiagram.layers.sort((a, b) => {
             return a.zIndex - b.zIndex;
         });
     }
 }