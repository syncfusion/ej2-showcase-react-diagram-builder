/**
 * Page Handler
 */
import { Button } from '@syncfusion/ej2-buttons';
import { SelectorViewModel } from './selectedItem';
import { Ajax } from '@syncfusion/ej2-base';
import { Diagram, SnapConstraints } from '@syncfusion/ej2-diagrams';
import { MindMapUtilityMethods, MindMap } from './mindmap';
import { OrgChartUtilityMethods, OrgChartData } from './orgchart';

export class PageOptions {
    public name: string;
    public diagram?: any;
    public text: string;
    public templateDiagramType: string;
    public mindmapTemplateType: string;
    public orgChartTemplateType: string;
}

export class PageCreation {

    public pageOptionList: PageOptions[] = [];
    public activePage: PageOptions;
    public selectedItem: SelectorViewModel;
    public pageSwitch: boolean = false;
    constructor(selectedItem: SelectorViewModel) {
        this.selectedItem = selectedItem;
    }

    public generatePageButtons(pages: PageOptions[]): void {
        const pageOptionElement: HTMLDivElement = document.getElementById('pageOptionList') as HTMLDivElement;
        const pageContainerWidth: number = (pageOptionElement.parentElement as HTMLElement).getBoundingClientRect().width - 1;
        let buttonWidth: number = 75;
        if (pages.length * buttonWidth > pageContainerWidth) {
            buttonWidth = (pageContainerWidth - 32) / pages.length;
        }
        while (pageOptionElement.hasChildNodes()) {
            pageOptionElement.removeChild(pageOptionElement.lastChild as ChildNode);
        }
        for (const value of  pages) {
            const pageOption: PageOptions = value;
            const buttonElement: HTMLButtonElement = document.createElement('button');
            buttonElement.setAttribute('id', pageOption.name);
            buttonElement.setAttribute('style', 'width:' + buttonWidth + 'px');
            buttonElement.setAttribute('title', pageOption.text);
            buttonElement.onclick = this.showPageData.bind(this);
            pageOptionElement.appendChild(buttonElement);
            const pageButton: Button = new Button({
                content: pageOption.text
            });
            pageButton.appendTo(buttonElement);
            if (this.activePage.name === pageOption.name) {
                buttonElement.classList.add('db-active-page');
            }
        }
        const buttonElement1: HTMLButtonElement = document.createElement('button');
        buttonElement1.setAttribute('id', 'addNewPage');
        pageOptionElement.appendChild(buttonElement1);
        buttonElement1.setAttribute('style', 'width:32px');
        buttonElement1.onclick = this.addNewPage.bind(this);
        const pageButton1: Button = new Button({
            iconCss: 'sf-icon-Plus'
        });
        pageButton1.appendTo(buttonElement1);
    }

    public showPageData(evt: MouseEvent): void {
        const target: HTMLButtonElement = evt.target as HTMLButtonElement;
        const page1: PageOptions = this.findPage(target.id);
        if (page1 != null) {
            if (this.activePage) {
                const button: HTMLElement = document.getElementById(this.activePage.name) as HTMLElement;
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

    public findPage(id: string): PageOptions {
        const page: PageOptions = new PageOptions;
        for (const options of  this.pageOptionList) {
            if (options.name === id) {
                return options;
            }
        }
        return page;
    }

    public addNewPage(): void {
        if (this.activePage) {
            this.saveDiagramSettings();
            this.selectedItem.selectedDiagram.clear();
        }
        if (this.selectedItem.diagramType === 'MindMap') {
            MindMapUtilityMethods.createEmptyMindMap();
            this.selectedItem.selectedDiagram.doLayout();
        } else if (this.selectedItem.diagramType === 'OrgChart') {
            OrgChartUtilityMethods.createEmptyOrgChart();
            this.selectedItem.selectedDiagram.doLayout();
        }
        this.activePage = new PageOptions();
        this.activePage.name = 'page' + (this.pageOptionList.length + 1);
        this.activePage.text = 'Page' + (this.pageOptionList.length + 1);
        this.pageOptionList.push(this.activePage);
        this.generatePageButtons(this.pageOptionList);
    }

    public savePage(): string {
        const pageData: { [key: string]: any } = {};
        this.saveDiagramSettings();
        pageData.pageOptionList = this.pageOptionList;
        pageData.activePage = this.activePage.name;
        pageData.diagramType = this.selectedItem.diagramType;
        return JSON.stringify(pageData);
    }

    public loadPage(savedData: string): void {
        const pageData: { [key: string]: any } = JSON.parse(savedData);
        this.pageOptionList = pageData.pageOptionList as PageOptions[];
        this.activePage = this.findPage(pageData.activePage.toString());
        this.selectedItem.diagramType = pageData.diagramType.toString();
        this.generatePageButtons(this.pageOptionList);
    }

    public saveDiagramSettings(): void {
        this.activePage.diagram = JSON.parse(this.selectedItem.selectedDiagram.saveDiagram());
        if (this.selectedItem.diagramType === 'MindMap') {
            this.activePage.mindmapTemplateType = MindMapUtilityMethods.templateType;
        }
    }

    public loadDiagramSettings(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
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
                const map: MindMap = new MindMap(this.selectedItem);
                map.createMindMap(false);
            }
            const closeIconDiv: HTMLElement = ((document.getElementById('diagram') as HTMLElement).querySelector('#closeIconDiv') as HTMLElement);
            if (closeIconDiv) {
                closeIconDiv.onclick = MindMapUtilityMethods.onHideNodeClick.bind(MindMapUtilityMethods);
            }
        }
        if (this.selectedItem.diagramType === 'OrgChart') {
            if (!this.pageSwitch && !this.selectedItem.isTemplateLoad) {
                OrgChartUtilityMethods.selectedItem = this.selectedItem;
                const org: OrgChartData = new OrgChartData(this.selectedItem);
                org.createOrgChart(false);
            }
            const closeIconDiv: HTMLElement = ((document.getElementById('diagram') as HTMLElement).querySelector('#closeIconDiv') as HTMLElement);
            if (closeIconDiv) {
                closeIconDiv.onclick = OrgChartUtilityMethods.onHideNodeClick.bind(OrgChartUtilityMethods);
            }
        }
        let btnView: any = document.getElementById('btnViewMenu');
        btnView = btnView.ej2_instances[0];
        if (diagram.rulerSettings) {
            btnView.items[5].iconCss = diagram.rulerSettings.showRulers ? 'sf-icon-Selection' : '';
            const containerDiv: HTMLElement = document.getElementById('diagramContainerDiv') as HTMLElement;
            if (!diagram.rulerSettings.showRulers) {
                containerDiv.classList.remove('db-show-ruler');
            } else {
                if (!containerDiv.classList.contains('db-show-ruler')) {
                    containerDiv.classList.add('db-show-ruler');
                }
            }
        }
        if (diagram.snapSettings) {
            btnView.items[6].iconCss = ((diagram.snapSettings.constraints as SnapConstraints) & SnapConstraints.SnapToObject) ? 'sf-icon-Selection' : '';
            btnView.items[7].iconCss = ((diagram.snapSettings.constraints as SnapConstraints) & SnapConstraints.ShowLines) ? 'sf-icon-Selection' : '';
            btnView.items[9].iconCss = ((diagram.snapSettings.constraints as SnapConstraints) & SnapConstraints.SnapToLines) ? 'sf-icon-Selection' : '';
        }
    }

    public loadJson(): void {
        if (!this.selectedItem.uniqueId) {
            this.selectedItem.uniqueId = this.selectedItem.randomIdGenerator();
        }
        if (this.selectedItem.isModified) {
            const spanElement: HTMLSpanElement = document.getElementById('diagramreport') as HTMLSpanElement;
            spanElement.innerHTML = 'Saving';
            this.selectedItem.isModified = false;
            const save: string = this.savePage();
            const ajax: Ajax = new Ajax('https://ej2services.syncfusion.com/production/web-services/api/Diagram/SaveJson', 'POST', true, 'application/json');
            const data: string = JSON.stringify({
                DiagramName: this.selectedItem.uniqueId,
                DiagramContent: save,
            });
            ajax.send(data).then();
            const context: any = this;
            ajax.onSuccess = (data1: string): void => {
                if (window.location.pathname.length === 1) {
                const uri: string = window.location.origin + this.selectedItem.getAbsolutePath() + '?id=' + this.selectedItem.uniqueId;
                window.history.replaceState(null, '', uri);
                context.isModified = false;
                spanElement.innerHTML = 'Saved';
                 }
            };
            ajax.onFailure = (args: string): void => {
                context.isModified = false;
                spanElement.innerHTML = 'Offline';
            };
            ajax.onError = (args: Event): any => {
                context.isModified = false;
                spanElement.innerHTML = 'Offline';
                return {};
            };
        }
    }
}




