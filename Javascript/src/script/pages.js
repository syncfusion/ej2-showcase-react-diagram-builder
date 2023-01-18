/**
 * Page Handler
 */
 import { Button } from '@syncfusion/ej2-buttons';
 import { Ajax } from '@syncfusion/ej2-base';
 import { SnapConstraints } from '@syncfusion/ej2-diagrams';
 import { MindMapUtilityMethods, MindMap } from './mindmap';
 import { OrgChartUtilityMethods, OrgChartData } from './orgchart';
 export class PageOptions {
 }
 export class PageCreation {
     constructor(selectedItem) {
         this.pageOptionList = [];
         this.pageSwitch = false;
         this.selectedItem = selectedItem;
     }
     generatePageButtons(pages) {
         const pageOptionElement = document.getElementById('pageOptionList');
         const pageContainerWidth = pageOptionElement.parentElement.getBoundingClientRect().width - 1;
         let buttonWidth = 75;
         if (pages.length * buttonWidth > pageContainerWidth) {
             buttonWidth = (pageContainerWidth - 32) / pages.length;
         }
         while (pageOptionElement.hasChildNodes()) {
             pageOptionElement.removeChild(pageOptionElement.lastChild);
         }
         for (const value of pages) {
             const pageOption = value;
             const buttonElement = document.createElement('button');
             buttonElement.setAttribute('id', pageOption.name);
             buttonElement.setAttribute('style', 'width:' + buttonWidth + 'px');
             buttonElement.setAttribute('title', pageOption.text);
             buttonElement.onclick = this.showPageData.bind(this);
             pageOptionElement.appendChild(buttonElement);
             const pageButton = new Button({
                 content: pageOption.text
             });
             pageButton.appendTo(buttonElement);
             if (this.activePage.name === pageOption.name) {
                 buttonElement.classList.add('db-active-page');
             }
         }
         const buttonElement1 = document.createElement('button');
         buttonElement1.setAttribute('id', 'addNewPage');
         pageOptionElement.appendChild(buttonElement1);
         buttonElement1.setAttribute('style', 'width:32px');
         buttonElement1.onclick = this.addNewPage.bind(this);
         const pageButton1 = new Button({
             iconCss: 'sf-icon-Plus'
         });
         pageButton1.appendTo(buttonElement1);
     }
     showPageData(evt) {
         const target = evt.target;
         const page1 = this.findPage(target.id);
         if (page1 != null) {
             if (this.activePage) {
                 const button = document.getElementById(this.activePage.name);
                 if (button.classList.contains('db-active-page')) {
                     button.classList.remove('db-active-page');
                 }
                 this.saveDiagramSettings();
             }
             this.activePage = page1;
             this.pageSwitch = true;
             this.loadDiagramSettings();
             this.pageSwitch = false;
         }
         target.classList.add('db-active-page');
     }
     findPage(id) {
         const page = new PageOptions();
         for (const options of this.pageOptionList) {
             if (options.name === id) {
                 return options;
             }
         }
         return page;
     }
     addNewPage() {
         if (this.activePage) {
             this.saveDiagramSettings();
             this.selectedItem.selectedDiagram.clear();
         }
         if (this.selectedItem.diagramType === 'MindMap') {
             MindMapUtilityMethods.createEmptyMindMap();
             this.selectedItem.selectedDiagram.doLayout();
         }
         else if (this.selectedItem.diagramType === 'OrgChart') {
             OrgChartUtilityMethods.createEmptyOrgChart();
             this.selectedItem.selectedDiagram.doLayout();
         }
         this.activePage = new PageOptions();
         this.activePage.name = 'page' + (this.pageOptionList.length + 1);
         this.activePage.text = 'Page' + (this.pageOptionList.length + 1);
         this.pageOptionList.push(this.activePage);
         this.generatePageButtons(this.pageOptionList);
     }
     savePage() {
         const pageData = {};
         this.saveDiagramSettings();
         pageData.pageOptionList = this.pageOptionList;
         pageData.activePage = this.activePage.name;
         pageData.diagramType = this.selectedItem.diagramType;
         return JSON.stringify(pageData);
     }
     loadPage(savedData) {
         const pageData = JSON.parse(savedData);
         this.pageOptionList = pageData.pageOptionList;
         this.activePage = this.findPage(pageData.activePage.toString());
         this.selectedItem.diagramType = pageData.diagramType.toString();
         this.generatePageButtons(this.pageOptionList);
     }
     saveDiagramSettings() {
         this.activePage.diagram = JSON.parse(this.selectedItem.selectedDiagram.saveDiagram());
         if (this.selectedItem.diagramType === 'MindMap') {
             this.activePage.mindmapTemplateType = MindMapUtilityMethods.templateType;
         }
     }
     loadDiagramSettings() {
         const diagram = this.selectedItem.selectedDiagram;
         document.getElementsByClassName('sidebar')[0].className = 'sidebar show-overview';
         this.selectedItem.isLoading = true;
         diagram.loadDiagram(JSON.stringify(this.activePage.diagram));
         diagram.clearSelection();
         this.selectedItem.isLoading = false;
         document.getElementsByClassName('sidebar')[0].className = 'sidebar';
         if (this.selectedItem.diagramType === 'MindMap') {
             MindMapUtilityMethods.templateType = this.activePage.mindmapTemplateType;
             if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
                 MindMapUtilityMethods.selectedItem = this.selectedItem;
                 const map = new MindMap(this.selectedItem);
                 map.createMindMap(false);
             }
             const closeIconDiv = document.getElementById('diagram').querySelector('#closeIconDiv');
             if (closeIconDiv) {
                 closeIconDiv.onclick = MindMapUtilityMethods.onHideNodeClick.bind(MindMapUtilityMethods);
             }
         }
         if (this.selectedItem.diagramType === 'OrgChart') {
             if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
                 OrgChartUtilityMethods.selectedItem = this.selectedItem;
                 const org = new OrgChartData(this.selectedItem);
                 org.createOrgChart(false);
             }
             const closeIconDiv = document.getElementById('diagram').querySelector('#closeIconDiv');
             if (closeIconDiv) {
                 closeIconDiv.onclick = OrgChartUtilityMethods.onHideNodeClick.bind(OrgChartUtilityMethods);
             }
         }
         let btnView = document.getElementById('btnViewMenu');
         btnView = btnView.ej2_instances[0];
         if (diagram.rulerSettings) {
             btnView.items[5].iconCss = diagram.rulerSettings.showRulers ? 'sf-icon-Selection' : '';
             const containerDiv = document.getElementById('diagramContainerDiv');
             if (!diagram.rulerSettings.showRulers) {
                 containerDiv.classList.remove('db-show-ruler');
             }
             else {
                 if (!containerDiv.classList.contains('db-show-ruler')) {
                     containerDiv.classList.add('db-show-ruler');
                 }
             }
         }
         if (diagram.snapSettings) {
             btnView.items[6].iconCss = (diagram.snapSettings.constraints & SnapConstraints.SnapToObject) ? 'sf-icon-Selection' : '';
             btnView.items[7].iconCss = (diagram.snapSettings.constraints & SnapConstraints.ShowLines) ? 'sf-icon-Selection' : '';
             btnView.items[9].iconCss = (diagram.snapSettings.constraints & SnapConstraints.SnapToLines) ? 'sf-icon-Selection' : '';
         }
     }
     loadJson() {
         if (!this.selectedItem.uniqueId) {
             this.selectedItem.uniqueId = this.selectedItem.randomIdGenerator();
         }
         if (this.selectedItem.isModified) {
             const spanElement = document.getElementById('diagramreport');
             spanElement.innerHTML = 'Saving';
             this.selectedItem.isModified = false;
             const save = this.savePage();
             const ajax = new Ajax('https://ej2services.syncfusion.com/production/web-services/api/Diagram/SaveJson', 'POST', true, 'application/json');
             const data = JSON.stringify({
                 DiagramName: this.selectedItem.uniqueId,
                 DiagramContent: save,
             });
             ajax.send(data).then();
             const context = this;
             ajax.onSuccess = (data1) => {
                 if (window.location.pathname.length === 1) {
                     const uri = window.location.origin + this.selectedItem.getAbsolutePath() + '?id=' + this.selectedItem.uniqueId;
                     window.history.replaceState(null, '', uri);
                     context.isModified = false;
                     spanElement.innerHTML = 'Saved';
                 }
             };
             ajax.onFailure = (args) => {
                 context.isModified = false;
                 spanElement.innerHTML = 'Offline';
             };
             ajax.onError = (args) => {
                 context.isModified = false;
                 spanElement.innerHTML = 'Offline';
                 return {};
             };
         }
     }
 }