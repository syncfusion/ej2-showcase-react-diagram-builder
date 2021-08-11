import { createElement, closest, formatUnit } from "@syncfusion/ej2-base";

import {
    DiagramComponent, SelectorConstraints, Overview, DiagramBeforeMenuOpenEventArgs,
    SymbolPaletteComponent, SnapSettingsModel, PageSettingsModel, Keys, DiagramRegions, FileFormats,
    KeyModifiers, CommandModel, IDropEventArgs, Connector, DiagramAction, AlignmentOptions, DiagramTools, ZoomOptions, ShapeAnnotationModel,
    ScrollSettingsModel, SelectorModel, ContextMenuSettingsModel, CommandManagerModel, ConnectorModel, ICollectionChangeEventArgs, NodeConstraints, ConnectorConstraints, ShapeAnnotation, HyperlinkModel,
    UndoRedo, DiagramContextMenu, Snapping, DataBinding, PrintAndExport, BpmnDiagrams, HierarchicalTree, MindMap as MindMapTree, ConnectorBridging, LayoutAnimation, SymbolPalette
} from "@syncfusion/ej2-react-diagrams";
import {
    Diagram, NodeModel, SnapConstraints,
} from "@syncfusion/ej2-react-diagrams";
import {
    DropDownButtonComponent, ItemModel, MenuEventArgs,
    BeforeOpenCloseMenuEventArgs
} from "@syncfusion/ej2-react-splitbuttons";
import { Button } from "@syncfusion/ej2-react-buttons";
import { SelectorViewModel } from "src/script/selectedItem";
import { DiagramClientSideEvents, OrgChartPropertyBinding } from "src/script/events"
import * as React from 'react';
import { DialogComponent, TooltipComponent, AnimationSettingsModel, TooltipEventArgs, PositionDataModel } from "@syncfusion/ej2-react-popups";
import { CommonKeyboardCommands } from 'src/script/commoncommands';
import { CustomTool } from 'src/script/userhandles';
import { DiagramTheme } from 'src/script/themes';
import { PageCreation } from 'src/script/pages';
import { DropDownDataSources } from 'src/script/dropdowndatasource';
import { DiagramPropertyBinding, MindMapPropertyBinding } from 'src/script/events';
import { RadioButtonComponent, ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons"
import { NumericTextBoxComponent, ColorPickerComponent, SliderComponent } from "@syncfusion/ej2-react-inputs"
import { UploaderComponent } from "@syncfusion/ej2-react-inputs"
import { DiagramBuilderLayer } from 'src/script/layers';
import { ListViewComponent } from "@syncfusion/ej2-react-lists";
import { Palettes } from "src/script/palettes";
// import * as ReactDOM from 'react-dom';
import { CustomProperties } from "./script/customproperties";
import { DownloadExampleFiles } from "./script/downloaddata";
import { OrgChartUtilityMethods } from "./script/orgchart";
import { PaperSize } from "./script/utilitymethods";
import { SelectedCollection, FieldsMapping, SelectEventArgs } from "@syncfusion/ej2-react-lists";
import "./font-icons.css";
import { DropDownListComponent, FieldSettingsModel, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    ToolbarComponent, ItemsDirective, ItemDirective, ClickEventArgs, MenuEventArgs as ContextMenuEventArgs,
    ItemModel as ToolbarItemModel, MenuAnimationSettingsModel, ContextMenuComponent, OpenCloseMenuEventArgs
} from '@syncfusion/ej2-react-navigations';
import "../node_modules/@syncfusion/ej2-react-diagrams/styles/diagram/material.css"
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/accordion/material.css";
import "./assets/index.css";
import "./assets/db-icons1/style.css";
import "./assets/dbstyle/diagrambuilder.css";


Diagram.Inject(UndoRedo, DiagramContextMenu, Snapping, DataBinding);
Diagram.Inject(PrintAndExport, BpmnDiagrams, HierarchicalTree, MindMapTree, ConnectorBridging, LayoutAnimation);
SymbolPalette.Inject(BpmnDiagrams);
export let hierarchicalTree: object[] = [
    { id: '111', type: 'Native', x: 200, y: 200, width: 100, height: 100, isVisible: true, content: '<g xmlns="http://www.w3.org/2000/svg">	<g transform="translate(1 1)">		<g>			<path style="fill:#61443C;" d="M61.979,435.057c2.645-0.512,5.291-0.853,7.936-1.109c-2.01,1.33-4.472,1.791-6.827,1.28     C62.726,435.13,62.354,435.072,61.979,435.057z"/>			<path style="fill:#61443C;" d="M502.469,502.471h-25.6c0.163-30.757-20.173-57.861-49.749-66.304     c-5.784-1.581-11.753-2.385-17.749-2.389c-2.425-0.028-4.849,0.114-7.253,0.427c1.831-7.63,2.747-15.45,2.731-23.296     c0.377-47.729-34.52-88.418-81.749-95.317c4.274-0.545,8.577-0.83,12.885-0.853c25.285,0.211,49.448,10.466,67.167,28.504     c17.719,18.039,27.539,42.382,27.297,67.666c0.017,7.846-0.9,15.666-2.731,23.296c2.405-0.312,4.829-0.455,7.253-0.427     C472.572,434.123,502.783,464.869,502.469,502.471z"/>		</g>		<path style="fill:#8B685A;" d="M476.869,502.471H7.536c-0.191-32.558,22.574-60.747,54.443-67.413    c0.375,0.015,0.747,0.072,1.109,0.171c2.355,0.511,4.817,0.05,6.827-1.28c1.707-0.085,3.413-0.171,5.12-0.171    c4.59,0,9.166,0.486,13.653,1.451c2.324,0.559,4.775,0.147,6.787-1.141c2.013-1.288,3.414-3.341,3.879-5.685    c7.68-39.706,39.605-70.228,79.616-76.117c4.325-0.616,8.687-0.929,13.056-0.939c13.281-0.016,26.409,2.837,38.485,8.363    c3.917,1.823,7.708,3.904,11.349,6.229c2.039,1.304,4.527,1.705,6.872,1.106c2.345-0.598,4.337-2.142,5.502-4.264    c14.373-25.502,39.733-42.923,68.693-47.189h0.171c47.229,6.899,82.127,47.588,81.749,95.317c0.017,7.846-0.9,15.666-2.731,23.296    c2.405-0.312,4.829-0.455,7.253-0.427c5.996,0.005,11.965,0.808,17.749,2.389C456.696,444.61,477.033,471.713,476.869,502.471    L476.869,502.471z"/>		<path style="fill:#66993E;" d="M502.469,7.537c0,0-6.997,264.96-192.512,252.245c-20.217-1.549-40.166-5.59-59.392-12.032    c-1.365-0.341-2.731-0.853-4.096-1.28c0,0-0.597-2.219-1.451-6.144c-6.656-34.048-25.088-198.997,231.765-230.144    C485.061,9.159,493.595,8.22,502.469,7.537z"/>		<path style="fill:#9ACA5C;" d="M476.784,10.183c-1.28,26.197-16.213,238.165-166.827,249.6    c-20.217-1.549-40.166-5.59-59.392-12.032c-1.365-0.341-2.731-0.853-4.096-1.28c0,0-0.597-2.219-1.451-6.144    C238.363,206.279,219.931,41.329,476.784,10.183z"/>		<path style="fill:#66993E;" d="M206.192,246.727c-0.768,3.925-1.365,6.144-1.365,6.144c-1.365,0.427-2.731,0.939-4.096,1.28    c-21.505,7.427-44.293,10.417-66.987,8.789C21.104,252.103,8.816,94.236,7.621,71.452c-0.085-1.792-0.085-2.731-0.085-2.731    C222.747,86.129,211.653,216.689,206.192,246.727z"/>		<path style="fill:#9ACA5C;" d="M180.336,246.727c-0.768,3.925-1.365,6.144-1.365,6.144c-1.365,0.427-2.731,0.939-4.096,1.28    c-13.351,4.412-27.142,7.359-41.131,8.789C21.104,252.103,8.816,94.236,7.621,71.452    C195.952,96.881,185.541,217.969,180.336,246.727z"/>	</g>	<g>		<path d="M162.136,426.671c3.451-0.001,6.562-2.08,7.882-5.268s0.591-6.858-1.849-9.298l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012l8.533,8.533    C157.701,425.773,159.872,426.673,162.136,426.671L162.136,426.671z"/>		<path d="M292.636,398.57c3.341,3.281,8.701,3.256,12.012-0.054c3.311-3.311,3.335-8.671,0.054-12.012l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054s-3.335,8.671-0.054,12.012L292.636,398.57z"/>		<path d="M296.169,454.771c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012l8.533,8.533    c3.341,3.281,8.701,3.256,12.012-0.054c3.311-3.311,3.335-8.671,0.054-12.012L296.169,454.771z"/>		<path d="M386.503,475.37c3.341,3.281,8.701,3.256,12.012-0.054c3.311-3.311,3.335-8.671,0.054-12.012l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012L386.503,475.37z"/>		<path d="M204.803,409.604c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C198.241,407.524,201.352,409.603,204.803,409.604z"/>		<path d="M332.803,443.737c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C326.241,441.658,329.352,443.737,332.803,443.737z"/>		<path d="M341.336,366.937c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C334.774,364.858,337.885,366.937,341.336,366.937z"/>		<path d="M164.636,454.771l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C173.337,451.515,167.977,451.49,164.636,454.771L164.636,454.771z"/>		<path d="M232.903,429.171l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C241.604,425.915,236.243,425.89,232.903,429.171L232.903,429.171z"/>		<path d="M384.003,409.604c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    c-3.311-3.311-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298    C377.441,407.524,380.552,409.603,384.003,409.604z"/>		<path d="M70.77,463.304l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271s3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C79.47,460.048,74.11,460.024,70.77,463.304L70.77,463.304z"/>		<path d="M121.97,446.238l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C130.67,442.981,125.31,442.957,121.97,446.238L121.97,446.238z"/>		<path d="M202.302,420.638c-1.6-1.601-3.77-2.5-6.033-2.5c-2.263,0-4.433,0.899-6.033,2.5l-8.533,8.533    c-2.178,2.151-3.037,5.304-2.251,8.262c0.786,2.958,3.097,5.269,6.055,6.055c2.958,0.786,6.111-0.073,8.262-2.251l8.533-8.533    c1.601-1.6,2.5-3.77,2.5-6.033C204.802,424.408,203.903,422.237,202.302,420.638L202.302,420.638z"/>		<path d="M210.836,463.304c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012l8.533,8.533    c2.149,2.188,5.307,3.055,8.271,2.27c2.965-0.785,5.28-3.1,6.065-6.065c0.785-2.965-0.082-6.122-2.27-8.271L210.836,463.304z"/>		<path d="M343.836,454.771l-8.533,8.533c-2.188,2.149-3.055,5.307-2.27,8.271c0.785,2.965,3.1,5.28,6.065,6.065    c2.965,0.785,6.122-0.082,8.271-2.27l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    C352.537,451.515,347.177,451.49,343.836,454.771L343.836,454.771z"/>		<path d="M429.17,483.904c3.341,3.281,8.701,3.256,12.012-0.054s3.335-8.671,0.054-12.012l-8.533-8.533    c-3.341-3.281-8.701-3.256-12.012,0.054c-3.311,3.311-3.335,8.671-0.054,12.012L429.17,483.904z"/>		<path d="M341.336,401.071c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    s-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.441-3.169,6.11-1.849,9.298C334.774,398.991,337.885,401.07,341.336,401.071z"/>		<path d="M273.069,435.204c2.264,0.003,4.435-0.897,6.033-2.5l8.533-8.533c3.281-3.341,3.256-8.701-0.054-12.012    s-8.671-3.335-12.012-0.054l-8.533,8.533c-2.44,2.44-3.169,6.11-1.849,9.298C266.508,433.124,269.618,435.203,273.069,435.204z"/>		<path d="M253.318,258.138c22.738,7.382,46.448,11.338,70.351,11.737c31.602,0.543,62.581-8.828,88.583-26.796    c94.225-65.725,99.567-227.462,99.75-234.317c0.059-2.421-0.91-4.754-2.667-6.421c-1.751-1.679-4.141-2.52-6.558-2.308    C387.311,9.396,307.586,44.542,265.819,104.5c-28.443,42.151-38.198,94.184-26.956,143.776c-3.411,8.366-6.04,17.03-7.852,25.881    c-4.581-7.691-9.996-14.854-16.147-21.358c8.023-38.158,0.241-77.939-21.57-110.261C160.753,95.829,98.828,68.458,9.228,61.196    c-2.417-0.214-4.808,0.628-6.558,2.308c-1.757,1.667-2.726,4-2.667,6.421c0.142,5.321,4.292,130.929,77.717,182.142    c20.358,14.081,44.617,21.428,69.367,21.008c18.624-0.309,37.097-3.388,54.814-9.138c11.69,12.508,20.523,27.407,25.889,43.665    c0.149,15.133,2.158,30.19,5.982,44.832c-12.842-5.666-26.723-8.595-40.759-8.6c-49.449,0.497-91.788,35.567-101.483,84.058    c-5.094-1.093-10.29-1.641-15.5-1.638c-42.295,0.38-76.303,34.921-76.025,77.217c-0.001,2.263,0.898,4.434,2.499,6.035    c1.6,1.6,3.771,2.499,6.035,2.499h494.933c2.263,0.001,4.434-0.898,6.035-2.499c1.6-1.6,2.499-3.771,2.499-6.035    c0.249-41.103-31.914-75.112-72.967-77.154c0.65-4.78,0.975-9.598,0.975-14.421c0.914-45.674-28.469-86.455-72.083-100.045    c-43.615-13.59-90.962,3.282-116.154,41.391C242.252,322.17,242.793,288.884,253.318,258.138L253.318,258.138z M87.519,238.092    c-55.35-38.567-67.358-129.25-69.833-158.996c78.8,7.921,133.092,32.454,161.458,72.992    c15.333,22.503,22.859,49.414,21.423,76.606c-23.253-35.362-77.83-105.726-162.473-140.577c-2.82-1.165-6.048-0.736-8.466,1.125    s-3.658,4.873-3.252,7.897c0.406,3.024,2.395,5.602,5.218,6.761c89.261,36.751,144.772,117.776,161.392,144.874    C150.795,260.908,115.29,257.451,87.519,238.092z M279.969,114.046c37.6-53.788,109.708-86.113,214.408-96.138    c-2.65,35.375-17.158,159.05-91.892,211.175c-37.438,26.116-85.311,30.57-142.305,13.433    c19.284-32.09,92.484-142.574,212.405-191.954c2.819-1.161,4.805-3.738,5.209-6.76c0.404-3.022-0.835-6.031-3.25-7.892    c-2.415-1.861-5.64-2.292-8.459-1.131C351.388,82.01,279.465,179.805,252.231,222.711    C248.573,184.367,258.381,145.945,279.969,114.046L279.969,114.046z M262.694,368.017c15.097-26.883,43.468-43.587,74.3-43.746    c47.906,0.521,86.353,39.717,85.95,87.625c-0.001,7.188-0.857,14.351-2.55,21.337c-0.67,2.763,0.08,5.677,1.999,7.774    c1.919,2.097,4.757,3.1,7.568,2.676c1.994-0.272,4.005-0.393,6.017-0.362c29.59,0.283,54.467,22.284,58.367,51.617H17.661    c3.899-29.333,28.777-51.334,58.367-51.617c4-0.004,7.989,0.416,11.9,1.254c4.622,0.985,9.447,0.098,13.417-2.467    c3.858-2.519,6.531-6.493,7.408-11.017c7.793-40.473,43.043-69.838,84.258-70.192c16.045-0.002,31.757,4.582,45.283,13.212    c4.01,2.561,8.897,3.358,13.512,2.205C256.422,375.165,260.36,372.163,262.694,368.017L262.694,368.017z"/>	</g></g>' },
    {
        id: '112', type: 'Native', x: 200, y: 400, width: 100, height: 100, isVisible: true, content: '<g xmlns="http://www.w3.org/2000/svg">' +
            '<rect height="256" width="256" fill="#34353F"/>' +
            '<path id="path1" transform="rotate(0,128,128) translate(59.1078108549118,59) scale(4.3125,4.3125)  " fill="#FFFFFF" d="M12.12701,24.294998C12.75201,24.294998 13.258998,24.803009 13.258998,25.428009 13.258998,26.056 12.75201,26.563004 12.12701,26.563004 11.499019,26.563004 10.993007,26.056 10.993007,25.428009 10.993007,24.803009 11.499019,24.294998 12.12701,24.294998z M7.9750035,24.294998C8.6010101,24.294998 9.1090057,24.803009 9.1090057,25.428009 9.1090057,26.056 8.6010101,26.563004 7.9750035,26.563004 7.3480199,26.563004 6.8399942,26.056 6.8399942,25.428009 6.8399942,24.803009 7.3480199,24.294998 7.9750035,24.294998z M7.9750035,20.286011C8.6010101,20.286011 9.1090057,20.792999 9.1090057,21.419006 9.1090057,22.044006 8.6010101,22.552002 7.9750035,22.552002 7.3500035,22.552002 6.8420084,22.044006 6.8420084,21.419006 6.8420084,20.792999 7.3500035,20.286011 7.9750035,20.286011z M18.499994,19.317001C18.313013,19.317001,18.156,19.472,18.156,19.656006L18.156,27.01001C18.156,27.195007,18.313013,27.350006,18.499994,27.350006L29.521993,27.350006C29.707998,27.350006,29.865988,27.195007,29.865988,27.01001L29.865988,19.656006C29.865988,19.472,29.707998,19.317001,29.521993,19.317001z M17.243006,17.443008L30.778003,17.443008C31.425007,17.445007,31.947986,17.962006,31.950001,18.602997L31.950001,28.542007C31.947986,29.182999,31.425007,29.702011,30.778003,29.703003L25.654012,29.703003C25.511007,29.703003 25.399008,29.824997 25.413992,29.964996 25.430013,30.13501 25.452993,30.360001 25.477011,30.559998 25.506002,30.809998 25.727987,30.980011 25.976003,31.033997L27.756002,31.419006C27.907003,31.452011 28.015005,31.584 28.015005,31.738007 28.015005,31.883011 27.895986,32 27.74999,32L27.571005,32 20.450004,32 20.318016,32C20.171013,32 20.053001,31.883011 20.053001,31.738007 20.053001,31.585007 20.161003,31.452011 20.312004,31.419998L22.115989,31.033005C22.35601,30.98201 22.572014,30.815002 22.596,30.574005 22.616997,30.363007 22.636009,30.130997 22.648002,29.960007 22.658012,29.819 22.542015,29.70401 22.399986,29.70401L17.243006,29.703003C16.596002,29.702011,16.072992,29.182999,16.071008,28.542007L16.071008,18.602997C16.072992,17.962006,16.596002,17.445007,17.243006,17.443008z M7.9750035,16.133011C8.6020172,16.133011 9.1100128,16.641006 9.1100128,17.268005 9.1100128,17.893997 8.6020172,18.402008 7.9750035,18.402008 7.3489964,18.402008 6.8410013,17.893997 6.8410013,17.268005 6.8410013,16.641006 7.3489964,16.133011 7.9750035,16.133011z M24.027,13.762009C24.654014,13.762009 25.16201,14.270004 25.16201,14.895996 25.16201,15.522003 24.654014,16.029999 24.027,16.029999 23.400993,16.029999 22.892998,15.522003 22.892998,14.895996 22.892998,14.270004 23.400993,13.762009 24.027,13.762009z M24.027,9.6110077C24.653007,9.6110077 25.161003,10.119003 25.161003,10.74501 25.161003,11.37001 24.653007,11.878006 24.027,11.878006 23.402,11.878006 22.894005,11.37001 22.894005,10.74501 22.894005,10.119003 23.402,9.6110077 24.027,9.6110077z M24.027,5.6000061C24.654014,5.6000061 25.16201,6.1080017 25.16201,6.7350006 25.16201,7.3610077 24.654014,7.8690033 24.027,7.8690033 23.400993,7.8690033 22.892998,7.3610077 22.892998,6.7350006 22.892998,6.1080017 23.400993,5.6000061 24.027,5.6000061z M19.876001,5.6000061C20.503013,5.6000061 21.011009,6.1080017 21.011009,6.7350006 21.011009,7.3610077 20.503013,7.8690033 19.876001,7.8690033 19.249994,7.8690033 18.743006,7.3610077 18.743006,6.7350006 18.743006,6.1080017 19.249994,5.6000061 19.876001,5.6000061z M2.4290157,1.8740082C2.2420037,1.8740082,2.0850215,2.029007,2.0850215,2.2140045L2.0850215,9.5680084C2.0850215,9.753006,2.2420037,9.9069977,2.4290157,9.9069977L13.451014,9.9069977C13.637995,9.9069977,13.795008,9.753006,13.795008,9.5680084L13.795008,2.2140045C13.795008,2.029007,13.637995,1.8740082,13.451014,1.8740082z M1.1730042,0L14.706996,0C15.353999,0.0019989014,15.877009,0.51899719,15.878993,1.1600037L15.878993,11.100006C15.877009,11.740005,15.353999,12.26001,14.706996,12.26001L9.5830047,12.26001C9.4399994,12.26001 9.3290069,12.382004 9.3420074,12.52301 9.3600128,12.692001 9.3829925,12.917999 9.4060028,13.117004 9.4349945,13.367004 9.6570099,13.53801 9.9049957,13.591003L11.684994,13.975998C11.835994,14.009003 11.945003,14.141998 11.945003,14.294998 11.945003,14.440002 11.826015,14.557007 11.679012,14.557007L11.499996,14.557007 4.3789966,14.557007 4.2470081,14.557007C4.1000049,14.557007 3.9819935,14.440002 3.9819937,14.294998 3.9819935,14.141998 4.0899952,14.009003 4.2409961,13.977005L6.0450113,13.589996C6.2860086,13.539001 6.501005,13.373001 6.5249918,13.130997 6.5460184,12.921005 6.5650003,12.688004 6.5769937,12.516998 6.5870035,12.376999 6.4710062,12.262009 6.3290079,12.262009L1.1730042,12.26001C0.52499391,12.26001,0.0020143806,11.740005,0,11.100006L0,1.1600037C0.0020143806,0.51899719,0.52499391,0.0019989014,1.1730042,0z"/>' +
            '</g>'
    }
];

export let toolbarHorVerAlignment: ToolbarComponent;

export let beforItem: () => {};
export let beforeOpen: () => {};
export let beforeClose: () => {};
export let tooledit: () => {};
export let zoomchange: () => {};
export let menuclick: () => {};
export let drawShape: () => {};
export let drawConnector: () => {};
export let orderCommand: () => {};
export let dropElement: () => {};
export let collectionChange: () => {};
export let footTemplate: () => {};
export let printTemplateChange: () => {};
export let fileTemplate: () => {};
export let nodeDefault: () => {};
export let connectordefault: () => {};
export let saveTemplate: () => {};
export let moreShapeTemplate: () => {};
export let tooltipTemplate: () => {};
export let hyperLinkTemplate: () => {};
export let themeTemplate: () => {};
export let deleteConfirmationtemplate: () => {};
export let themeDialogTemplate: () => {};
export let zoomTemplate: () => {};
export let drawShapeTemplate: () => {};
export let drawConnectorTemplate: () => {};
export let order: () => {};
export let offsetChange: () => {};
export let offsetYchnage: () => {};
export let nodeWidthChange: () => {};
export let nodeHeightChange: () => {};
export let aspectRatioValue: () => {};
export let rotationChange: () => {};
export let toolbarNodeInsert: () => {};
export let nodeFillColor: () => {};
export let gradientChange: () => {};
export let gradientDirectionChange: () => {};
export let gradientColorChange: () => {};
export let opacityChange: () => {};
export let lineTypeChange: () => {};
export let lineColorChange: () => {};
export let lineStyleChange: () => {};
export let lineWidthChange: () => {};
export let sourceTypeChange: () => {};
export let targetTypeChange: () => {};
export let sourceSizeChange: () => {};
export let targetSizeChange: () => {};
export let bridgeChange: () => {};
export let bridgeSizeChange: () => {};
export let connectorOpacityChange: () => {};
export let fontFamilyChange: () => {};
export let fontSizeChange: () => {};
export let fontColorChange: () => {};
export let fontOpacityChange: () => {};
export let mindmapOpacityChange: () => {};
export let mindmapFontfamilyText: () => {};
export let mindmapFontSizeChange: () => {};
export let mindmapFontColorChange: () => {};
export let mindmapFontOpacityChange: () => {};
export let moreShapes: () => {};
export let uploadChange: () => {};
export let contextMenuOpenChange: () => {};
export let contextMenuClickEvent: () => {};
export let contextMenuchange: () => {};
export let mindMapLavelChange: () => {};
export let mindmapFillColor: () => {};
export let strokeWidthChange: () => {};
export let nodeBorderChange: () => {};
export let strokeColorChange: () => {};
export let mindMapSrtokeChange: () => {};
export let mindmapStrokeStyleChange: () => {};
export let mindmapStrokeWidthChange: () => {};
export let diagramName: () => {};

class App extends React.Component<{}, {}> {
    public diagram: DiagramComponent;
    public symbolpalette: SymbolPaletteComponent;
    public printDialog: DialogComponent;
    public exportDialog: DialogComponent;
    public fileUploadDialog: DialogComponent;
    public openTemplateDialog: DialogComponent;
    public saveDialog: DialogComponent;
    public customPropertyDialog: DialogComponent;
    public layerDialog: DialogComponent;
    public tooltipDialog: DialogComponent;
    public hyperlinkDialog: DialogComponent;
    public themeDialog: DialogComponent;
    public deleteConfirmationDialog: DialogComponent;
    public btnHelpMenu: DropDownButtonComponent;
    public toolbarEditor: ToolbarComponent;
    public arrangeContextMenu: ContextMenuComponent;
    public btnDrawShape: DropDownButtonComponent;
    public btnDrawConnector: DropDownButtonComponent;
    public defaultupload: UploaderComponent;
    public nodeInsert: ToolbarComponent;
    public fillColor: ColorPickerComponent;
    public mindmapTextColor: ColorPickerComponent;
    public opacity: SliderComponent;
    public strokeWidth: NumericTextBoxComponent;
    public lineType: DropDownListComponent;
    public fontSize: NumericTextBoxComponent;
    public nodeBorder: DropDownListComponent;
    public lineColor: ColorPickerComponent;
    public nodeOffsetX: NumericTextBoxComponent;
    public nodeOffsetY: NumericTextBoxComponent;
    public lineWidth: NumericTextBoxComponent;
    public fontFamily: DropDownListComponent;
    public gradientColor: ColorPickerComponent;
    public gradient: CheckBoxComponent;
    public gradientDirection: DropDownListComponent;
    public width: NumericTextBoxComponent;
    public connectorOpacity: SliderComponent;
    public height: NumericTextBoxComponent;
    public lineStyle: DropDownListComponent;
    public sourceType: DropDownListComponent;
    public targetType: DropDownListComponent;
    public mindMapLevel: DropDownListComponent;
    public strokeColor: ColorPickerComponent;
    public mindmapFill: ColorPickerComponent;
    public mindMapStroke: ColorPickerComponent;
    public mindmapStrokeStyle: DropDownListComponent;
    public bridge: CheckBoxComponent;
    public ttextStyle: ToolbarComponent;
    public bridgeSize: NumericTextBoxComponent;
    public sourceSize: NumericTextBoxComponent;
    public targetSize: NumericTextBoxComponent;
    public rotate: NumericTextBoxComponent
    public colorPicker: ColorPickerComponent;
    public tooltip: TooltipComponent;
    public aspectRatio: CheckBoxComponent;
    public fontColor: ColorPickerComponent;
    public btnDownloadFile: ButtonComponent;
    public ddlTextPosition: DropDownListComponent;
    public mindmapStrokeWidth: NumericTextBoxComponent;
    public mindmapFontSize: NumericTextBoxComponent;
    public moreShapesList: ListViewComponent;
    public animationSettings: MenuAnimationSettingsModel = { effect: 'None' };
    public dropdownListFields: FieldSettingsModel = { text: 'text', value: 'value' };
    public dialogAnimationSettings: AnimationSettingsModel = { effect: 'None' };
    public themesdialogPosition: PositionDataModel = { X: 'right', Y: 112 };

    public moreShapesDialog: DialogComponent;
    public zoomMenuItems: ItemModel[] = [
        { text: '400%' }, { text: '300%' }, { text: '200%' }, { text: '150%' },
        { text: '100%' }, { text: '75%' }, { text: '50%' }, { text: '25%' }, { separator: true },
        { text: 'Fit To Screen' }
        // { separator: true },
        // { text: 'Custom' },
    ];
    public fileMenuItems: ItemModel[] = this.getFileMenuItems();
    public selectedItem: SelectorViewModel = new SelectorViewModel();
    public page: PageCreation = new PageCreation(this.selectedItem);
    public scrollSettings: ScrollSettingsModel = { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 };
    public selectedItems: SelectorModel = { constraints: SelectorConstraints.All & ~SelectorConstraints.ToolTip };
    public commandManager: CommandManagerModel = this.getCommandSettings();
    public dropDownDataSources: DropDownDataSources = new DropDownDataSources();
    public palettes: Palettes = new Palettes();
    public mindmapPropertyBinding: MindMapPropertyBinding = new MindMapPropertyBinding(this.selectedItem);
    public diagramPropertyBinding: DiagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem, this.page);
    public customTool: CustomTool = new CustomTool(this.selectedItem);
    public getCustomTool = this.customTool.getTool.bind(this);
    public orgChartPropertyBinding: OrgChartPropertyBinding = new OrgChartPropertyBinding(this.selectedItem);
    public customProperty: CustomProperties = new CustomProperties(this.selectedItem, this.customPropertyDialog);
    public downloadFile: DownloadExampleFiles;
    public fontOpacity: SliderComponent;
    public mindmapOpacity: SliderComponent;
    public mindmapOpacityText: SliderComponent;
    public exportingButtons: any = this.getDialogButtons('export');
    public printingButtons: object[] = this.getDialogButtons('print');
    public saveButtons: object[] = this.getDialogButtons('save');
    public moreShapesButtons: object[] = this.getDialogButtons('moreshapes');
    public hyperlinkButtons: object[] = this.getDialogButtons('hyperlink');
    public tooltipButtons: object[] = this.getDialogButtons('tooltip');
    public deleteConfirmationButtons: object[] = this.getDialogButtons('deleteconfirmation');
    public uploadButtons: any = this.getUploadButtons();
    public dlgTarget: HTMLElement = document.body;
    public dialogVisibility: boolean = false;
    public overview: Overview;
    public isModalDialog: boolean = false;
    public diagramLayer: DiagramBuilderLayer = new DiagramBuilderLayer(this.selectedItem, this.layerDialog);

    // public event :UtilityMethods = new UtilityMethods();

    public diagramThemes: DiagramTheme = new DiagramTheme(this.selectedItem);
    public listViewFields: FieldsMapping = { isChecked: 'checked' };
    public layerFooterTemplate: string = this.diagramLayer.getLayerBottomPanel();

    public contextMenuSettings: ContextMenuSettingsModel = {
        show: true,
        items: this.selectedItem.customContextMenu.items
    };
    public diagramEvents: DiagramClientSideEvents = new DiagramClientSideEvents(this.selectedItem, this.page);


    public snapSettings: SnapSettingsModel = {
        horizontalGridlines: {
            lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
            lineColor: '#EEEEEE'
        },
        verticalGridlines: {
            lineIntervals: [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75],
            lineColor: '#EEEEEE'
        },
        constraints: (SnapConstraints.All & ~SnapConstraints.SnapToLines)
    };

    public pageSettings: PageSettingsModel = {
        background: { color: 'white' }, width: 816, height: 1056, multiplePage: true, margin: { left: 5, top: 5 },
        orientation: 'Landscape'
    };
    public path: object = {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    };
    private initLayerPanel: boolean = false;
    private buttonInstance: any;

    constructor(props: any) {
        super(props);
        beforItem = this.beforeItemRender.bind(this);
        beforeOpen = this.arrangeMenuBeforeOpen.bind(this);
        beforeClose = this.arrangeMenuBeforeClose.bind(this);
        tooledit = this.toolbarEditorClick.bind(this);
        zoomchange = this.zoomChange.bind(this);
        menuclick = this.menuClick.bind(this);
        drawShape = this.drawShapeChange.bind(this);
        drawConnector = this.drawConnectorChange.bind(this);
        orderCommand = this.orderCommandsChange.bind(this);
        dropElement = this.drop.bind(this);
        collectionChange = this.collectionChange.bind(this);
        footTemplate = this.footerTemplate.bind(this);
        printTemplateChange = this.printTemplate.bind(this);
        fileTemplate = this.fileTemplate.bind(this);
        nodeDefault = this.setNodeDefaults.bind(this);
        connectordefault = this.setConnectorDefaults.bind(this);
        saveTemplate = this.saveTemplate.bind(this);
        moreShapeTemplate = this.moreShapeTemplate.bind(this);
        hyperLinkTemplate = this.hyperlinkTemplate.bind(this);
        themeTemplate = this.themeTemplate.bind(this);
        deleteConfirmationtemplate = this.deleteConformationTemplate.bind(this);
        themeDialogTemplate = this.themeDialogCreated.bind(this);
        zoomTemplate = this.zoomTemplate.bind(this);
        drawShapeTemplate = this.drawShapeTemplate.bind(this);
        drawConnectorTemplate = this.drawConnector.bind(this);
        order = this.orderTemplate.bind(this);
        offsetChange = this.offsetX.bind(this);
        offsetYchnage = this.offsetY.bind(this);
        nodeWidthChange = this.nodeWidth.bind(this);
        nodeHeightChange = this.nodeHeight.bind(this);
        aspectRatioValue = this.aspectRatioChange.bind(this);
        rotationChange = this.nodeRotationChange.bind(this);
        toolbarNodeInsert = this.toolbarInsertClick.bind(this);
        nodeFillColor = this.nodeFillColorChange.bind(this);
        gradientChange = this.nodeGradientChange.bind(this);
        gradientDirectionChange = this.gradientDropDownChange.bind(this);
        gradientColorChange = this.nodeGradientColorChange.bind(this);
        opacityChange = this.nodeOpcityChange.bind(this);
        lineTypeChange = this.connectorTypeChange.bind(this);
        lineColorChange = this.connectorColorChange.bind(this);
        lineStyleChange = this.ConnectorLineStyle.bind(this);
        lineWidthChange = this.ConnectorLineWidthChnage.bind(this);
        sourceTypeChange = this.connectorSourceType.bind(this);
        targetTypeChange = this.connectorTargetType.bind(this);
        sourceSizeChange = this.connectorSourceSize.bind(this);
        targetSizeChange = this.connectorTargetSize.bind(this);
        bridgeChange = this.connectorBridgeChange.bind(this);
        bridgeSizeChange = this.connectorBridgeSize.bind(this);
        connectorOpacityChange = this.ConnectorOpacityChange.bind(this);
        fontFamilyChange = this.nodeFontFamilyChange.bind(this);
        fontSizeChange = this.nodeFontSizeChange.bind(this);
        fontColorChange = this.nodeFontColor.bind(this);
        fontOpacityChange = this.fontOpacityChangeEvent.bind(this);
        mindmapOpacityChange = this.mindmapOpacityChangeEvent.bind(this);
        mindmapFontSizeChange = this.mindmapFontSizeChangeEvent.bind(this);
        mindmapFontfamilyText = this.mindmapFontfamilyTextEvent.bind(this);
        mindmapFontColorChange = this.mindmapFontColorChangeEvent.bind(this);
        mindmapFontOpacityChange = this.mindmapFontOpacityChangeEvent.bind(this);
        moreShapes = this.moreShapesClick.bind(this);
        uploadChange = this.onUploadSuccess.bind(this);
        contextMenuOpenChange = this.arrangeMenuBeforeOpen.bind(this);
        contextMenuchange = this.diagramContextMenuOpen.bind(this.diagramEvents);
        mindMapLavelChange = this.DiagrammindMapLevel.bind(this);
        mindmapFillColor = this.mindmapFillColorChange.bind(this);
        strokeWidthChange = this.nodeStrokeWidthChange.bind(this);
        nodeBorderChange = this.nodeBoderStyleChange.bind(this);
        strokeColorChange = this.nodeStrokeColorChange.bind(this);
        mindMapSrtokeChange = this.mindMapStrokeChangeEvent.bind(this);
        mindmapStrokeStyleChange = this.mindmapStorkeStyleChangeEvent.bind(this);
        mindmapStrokeWidthChange = this.mindmapStrokewidthChangeEvent.bind(this);
        contextMenuClickEvent = this.contextMenuClick.bind(this);
        diagramName = this.diagramNameChange.bind(this);
    }

    public nodeBorderItemTemplate(data: any): JSX.Element {
        return (
            <div className='db-ddl-template-style'><span className={data.className}/></div>
        );
    };
    // set the value to value template
    public nodeBorderValueTemplate(data: any): JSX.Element {
        return (
            <div className='db-ddl-template-style'><span className={data.className}/></div>
        );
    };

    public lineItemTemplate(data: any): JSX.Element {
        return (
            <div className='db-ddl-template-style'><span className={data.className}/></div>
        );
    };
    // set the value to value template
    public lineValueTemplate(data: any): JSX.Element {
        return (
            <div className='db-ddl-template-style'><span className={data.className}/></div>
        );
    };

    public mindmapItemTemplate(data: any): JSX.Element {
        return (
            <div className='db-ddl-template-style'><span className={data.className}/></div>
        );
    };
    // set the value to value template
    public mindmapValueTemplate(data: any): JSX.Element {
        return (
            <div className='db-ddl-template-style'><span className={data.className}/></div>
        );
    };

    public getFileMenuItems(): ItemModel[] {
        const menuItems: ItemModel[] = [
            { text: 'New' }, { text: 'Open' }, { separator: true },
            { text: 'Save', iconCss: 'sf-icon-Save' }, { text: 'Save As' },
            // { text: 'Rename' }, { separator: true },
            { text: 'Export', iconCss: 'sf-icon-Export' }, { separator: true },
            { text: 'Print', iconCss: 'sf-icon-Print' }
        ];
        return menuItems;
    }
    public themeDialogCreated(args: object): void {
        const themeDialogContent: HTMLElement = document.getElementById('themeDialogContent') as HTMLElement;
        themeDialogContent.onmouseover = this.diagramThemes.themeMouseOver.bind(this.diagramThemes);
        themeDialogContent.onclick = this.diagramThemes.themeClick.bind(this.diagramThemes);
        themeDialogContent.onmouseleave = this.diagramThemes.applyOldStyle.bind(this.diagramThemes);
    }
    public componentDidMount(): void {
        this.generateDiagram();
        this.page.addNewPage();
        this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
        this.customProperty.customPropertyDialog = this.customPropertyDialog;
        this.diagramLayer.layerDialog = this.layerDialog;

        this.downloadFile = new DownloadExampleFiles(this.selectedItem);
        this.selectedItem.utilityMethods.page = this.page;
        this.selectedItem.utilityMethods.tempDialog = this.openTemplateDialog;
        this.selectedItem.utilityMethods.toolbarEditor = this.toolbarEditor;
        this.selectedItem.utilityMethods.arrangeContextMenu = this.arrangeContextMenu;

        OrgChartUtilityMethods.uploadDialog = this.fileUploadDialog;
        OrgChartUtilityMethods.customPropertyDialog = this.customPropertyDialog;

        CommonKeyboardCommands.selectedItem = this.selectedItem;
        CommonKeyboardCommands.page = this.page;

        (document.getElementById('btnHideToolbar') as HTMLElement).onclick = this.hideMenuBar.bind(this);
        (document.getElementById('diagramContainerDiv') as HTMLElement).onmouseleave = this.diagramThemes.setNodeOldStyles.bind(this.diagramThemes);
        document.onmouseover = this.menumouseover.bind(this);

        const context: any = this;
        setTimeout(() => { context.loadPage(); }, 2000);
        setInterval(() => { context.savePage(); }, 2000);

        // window.onbeforeunload = this.closeWindow.bind(this);
    }
    public overviewSpanClick(args: React.MouseEvent<Element>): void {
        const target: HTMLElement = args.target as HTMLElement;
        const element: Element = document.getElementsByClassName('sidebar')[0];
        if (element.classList.contains('show-overview')) {
            element.classList.remove('show-overview');
            target.className = 'db-overview';
        } else {
            element.classList.add('show-overview');
            target.className = 'db-overview active';
            this.overview.refresh();
        }
    }

    public loadPage(): void {
        (document.getElementsByClassName('diagrambuilder-container')[0] as HTMLDivElement).style.display = '';
        this.selectedItem.selectedDiagram.updateViewPort();
        this.overview = new Overview({ width: '255px', height: '200px', sourceID: 'diagram' });
        this.overview.appendTo('#overview');
        (document.getElementById('overviewspan') as any).onclick = this.overviewSpanClick.bind(this);
        this.selectedItem.nodeProperties.offsetX = this.nodeOffsetX as any;
        this.selectedItem.nodeProperties.offsetY = this.nodeOffsetY as any;
        this.selectedItem.nodeProperties.width = this.width as any;
        this.selectedItem.nodeProperties.height = this.height as any;
        this.selectedItem.nodeProperties.rotateAngle = this.rotate as any;
        this.selectedItem.nodeProperties.aspectRatio = this.aspectRatio as any;
        this.selectedItem.nodeProperties.fillColor = this.fillColor as any;
        this.selectedItem.nodeProperties.gradientDirection = this.gradientDirection as any;
        this.selectedItem.nodeProperties.gradientColor = this.gradientColor as any;
        this.selectedItem.nodeProperties.strokeStyle = this.nodeBorder as any;
        this.selectedItem.nodeProperties.opacity = this.opacity as any;
        this.selectedItem.connectorProperties.lineType = this.lineType as any;
        this.selectedItem.connectorProperties.lineColor = this.lineColor as any;
        this.selectedItem.connectorProperties.lineStyle = this.lineStyle as any;
        this.selectedItem.connectorProperties.lineWidth = this.lineWidth as any;
        this.selectedItem.nodeProperties.strokeWidth = this.strokeWidth as any;
        this.selectedItem.nodeProperties.strokeColor = this.strokeColor as any;
        this.selectedItem.connectorProperties.sourceType = this.sourceType as any;
        this.selectedItem.connectorProperties.targetType = this.targetType as any;
        this.selectedItem.connectorProperties.sourceSize = this.sourceSize as any;
        this.selectedItem.connectorProperties.targetSize = this.targetSize as any;
        this.selectedItem.connectorProperties.lineJump = this.bridge as any;
        this.selectedItem.connectorProperties.lineJumpSize = this.bridgeSize as any;
        this.selectedItem.connectorProperties.opacity = this.connectorOpacity as any;
        this.selectedItem.textProperties.fontFamily = this.fontFamily as any;
        this.selectedItem.textProperties.fontSize = this.fontSize as any;
        this.selectedItem.textProperties.fontColor = this.fontColor as any;
        this.selectedItem.textProperties.opacity = this.fontOpacity as any;
        this.selectedItem.mindmapSettings.levelType = this.mindMapLevel as any;
        this.selectedItem.mindmapSettings.fill = this.mindmapFill as any;
        this.selectedItem.mindmapSettings.strokeStyle = this.mindmapStrokeStyle as any;
        this.selectedItem.mindmapSettings.stroke = this.mindMapStroke as any;
        this.selectedItem.mindmapSettings.strokeWidth = this.mindmapStrokeWidth as any;
        this.selectedItem.mindmapSettings.opacity = this.mindmapOpacity as any;
        this.selectedItem.mindmapSettings.textOpacity = this.mindmapOpacityText as any;
        this.selectedItem.mindmapSettings.fontFamily = this.ddlTextPosition as any;
        this.selectedItem.mindmapSettings.fontSize = this.mindmapFontSize as any;
        this.selectedItem.mindmapSettings.fontColor = this.mindmapTextColor as any;

        document.getElementsByClassName('sidebar')[0].className = 'sidebar';
        if (window.location.search.length === 0) {
            this.selectedItem.uniqueId = this.selectedItem.randomIdGenerator();
            (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
            this.openTemplateDialog.show();
            this.selectedItem.utilityMethods.getDefaultDiagramTemplates1(this.selectedItem);
            // this.openTemplateDialog.content = this.selectedItem.utilityMethods.tempDialog.content;
            // this.openTemplateDialog.content = this.openTemplateDialog.content;
            this.openTemplateDialog.content = this.selectedItem.utilityMethods.getDefaultDiagramTemplates1(this.selectedItem);

            // const evt :MouseEvent =undefined;


            // this.selectedItem.utilityMethods.generateDiagram(this.selectedItem, evt: MouseEvent);

            this.diagram.layers[0].addInfo = { 'name': 'Layer0' }
        } else {
            // let dataValue: string = window.location.search.split('?id=')[1];
            // let ajax: Ajax = new Ajax('https://ej2services.syncfusion.com/development/web-services/api/Diagram/LoadJson', 'POST', true, 'application/json');
            // let datastring: string = JSON.stringify({
            //     DiagramName: dataValue,
            // });
            // ajax.send(datastring).then();
            // ajax.onSuccess = (data: string): void => {
            //     this.selectedItem.preventSelectionChange = true;
            //     this.page.loadPage(data);
            //     this.selectedItem.isTemplateLoad = true;
            //     if (this.selectedItem.diagramType === 'MindMap') {
            //         MindMapUtilityMethods.selectedItem = this.selectedItem;
            //         let mindMapObject: MindMap = new MindMap(this.selectedItem);
            //         mindMapObject.createMindMap(false);
            //     } else if (this.selectedItem.diagramType === 'OrgChart') {
            //         OrgChartUtilityMethods.selectedItem = this.selectedItem;
            //         let orgChartObject: OrgChartData = new OrgChartData(this.selectedItem);
            //         orgChartObject.createOrgChart(false);
            //     }
            //     this.page.loadDiagramSettings();
            //     this.selectedItem.isTemplateLoad = false;
            //     this.selectedItem.preventSelectionChange = false;
            //     (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
            // };
            // ajax.onFailure = (args: string): void => {
            //     (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
            // };
            // ajax.onError = (args: Event): Object => {
            //     (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
            //     return null;
            // };
        }
        this.selectedItem.exportSettings.fileName = (document.getElementById('diagramName') as HTMLElement).innerHTML;
    }

    public savePage(): void {
        // this.page.loadJson();
    }

    public getDialogButtons(dialogType: string): object[] {
        const buttons: object[] = [];
        switch (dialogType) {
            case 'export':
                buttons.push({
                    click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'print':
                buttons.push({
                    click: this.btnPrintClick.bind(this), buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'save':
                buttons.push({
                    click: this.btnSave.bind(this), buttonModel: { content: 'Save', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'tooltip':
                buttons.push({
                    click: this.btnTooltip.bind(this), buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'hyperlink':
                buttons.push({
                    click: this.btnHyperLink.bind(this), buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'deleteconfirmation':
                buttons.push({
                    click: this.btnDeleteConfirmation.bind(this), buttonModel: { content: 'Ok', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'moreshapes':
                buttons.push({
                    click: this.btnMoreShapes.bind(this), buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
        }
        buttons.push({
            click: this.btnCancelClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
        });
        return buttons;
    }
    public menuClick(args: MenuEventArgs): void {
        const buttonElement: any = document.getElementsByClassName('e-btn-hover')[0];
        if (buttonElement) {
            buttonElement.classList.remove('e-btn-hover');
        }
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const commandType: string = (args.item.text as string).replace(/[' ']/g, '');
        switch (commandType.toLowerCase()) {
            case 'new':
                CommonKeyboardCommands.newDiagram();
                break;
            case 'open':
                CommonKeyboardCommands.openUploadBox(true, '.json');
                break;
            case 'save':
                CommonKeyboardCommands.download(this.page.savePage(), (document.getElementById('diagramName') as HTMLElement).innerHTML);
                break;
            case 'saveas':
                (document.getElementById('saveFileName') as HTMLInputElement).value = (document.getElementById('diagramName') as HTMLElement).innerHTML;
                this.saveDialog.show();
                break;
            case 'print':
                this.selectedItem.printSettings.pageHeight = this.selectedItem.pageSettings.pageHeight;
                this.selectedItem.printSettings.pageWidth = this.selectedItem.pageSettings.pageWidth;
                this.selectedItem.printSettings.paperSize = this.selectedItem.pageSettings.paperSize;
                this.selectedItem.printSettings.isPortrait = this.selectedItem.pageSettings.isPortrait;
                this.selectedItem.printSettings.isLandscape = !this.selectedItem.pageSettings.isPortrait;
                this.printDialog.show();
                break;
            case 'export':
                this.exportDialog.show();
                break;
            case 'showguides':
                diagram.snapSettings.constraints = (diagram.snapSettings.constraints as SnapConstraints) ^ SnapConstraints.SnapToObject;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showgrid':
                diagram.snapSettings.constraints = (diagram.snapSettings.constraints as SnapConstraints) ^ SnapConstraints.ShowLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                let container: HTMLDivElement = document.getElementsByClassName('db-current-diagram-container')[0] as HTMLDivElement;
                if (!args.item.iconCss) {
                    container.classList.add('db-hide-grid');
                } else {
                    container.classList.remove('db-hide-grid');
                }
                break;
            case 'snaptogrid':
                diagram.snapSettings.constraints = (diagram.snapSettings.constraints as SnapConstraints) ^ SnapConstraints.SnapToLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'fittoscreen':
                diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
                break;
            case 'showrulers':
                this.selectedItem.selectedDiagram.rulerSettings.showRulers = !this.selectedItem.selectedDiagram.rulerSettings.showRulers;
                if (this.selectedItem.selectedDiagram.rulerSettings.showRulers) {
                    this.selectedItem.selectedDiagram.rulerSettings.dynamicGrid = false;
                }
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                container = document.getElementsByClassName('db-current-diagram-container')[0] as HTMLDivElement;
                if (!args.item.iconCss) {
                    container.classList.remove('db-show-ruler');
                } else {
                    container.classList.add('db-show-ruler');
                }
                break;
            case 'zoomin':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom as number * 100).toFixed() + '%';
                break;
            case 'zoomout':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom as number * 100).toFixed() + '%';
                break;
            case 'showtoolbar':
                this.selectedItem.utilityMethods.hideElements('hide-toolbar', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showstencil':
                this.selectedItem.utilityMethods.hideElements('hide-palette', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showproperties':
                this.selectedItem.utilityMethods.hideElements('hide-properties', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            case 'showlayers':
                this.showHideLayers();
                break;
            case 'themes':
                this.showHideThemes();
                break;
            case 'showpager':
                this.selectedItem.utilityMethods.hideElements('hide-pager', this.selectedItem.selectedDiagram);
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-Selection';
                break;
            default:
                this.executeEditMenu(diagram, commandType);
                break;
        }
        diagram.dataBind();
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
            // '<div class="col-xs-2" style="padding-left:0px">' +
            // '<button id="btnSelection" style="width:100%" ></button>' +
            // '</div>' +
            '</div>' +
            '</div>';
        return bottomPanel;
    }
    public getUploadButtons(): object[] {
        const buttons: object[] = [];
        buttons.push({
            click: this.btnCancelClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
        });
        buttons.push({
            click: this.btnUploadNext.bind(this), buttonModel: { content: 'Next', cssClass: 'e-flat e-db-primary', isPrimary: true },
        });
        return buttons;
    }

    public executeEditMenu(diagram: Diagram, commandType: string): void {
        switch (commandType.toLowerCase()) {
            case 'undo':
                this.undo();
                if (this.selectedItem.diagramType === 'MindMap' || this.selectedItem.diagramType === 'OrgChart') {
                    diagram.doLayout();
                }
                break;
            case 'redo':
                this.redo();
                break;
            case 'cut':
                this.cutObjects();
                break;
            case 'copy':
                this.copyObjects();
                break;
            case 'paste':
                this.pasteObjects();
                break;
            case 'delete':
                this.delete();
                break;
            case 'duplicate':
                CommonKeyboardCommands.duplicateSelectedItems();
                break;
            case 'selectall':
                this.selectAll();
                break;
            case 'edittooltip':
                this.selectedItem.isModified = true;
                if ((diagram.selectedItems.nodes as NodeModel[]).length > 0) {
                    this.tooltipDialog.show();
                }
                break;
        }
    }

    public btnImportClick(): void {
        let registerBrowseEvent: boolean = false;
        let defaultUpload: any = document.getElementById('defaultfileupload');
        defaultUpload = defaultUpload.ej2_instances[0];
        if (!registerBrowseEvent) {
            defaultUpload.dropArea = document.getElementById('dropRegion') as HTMLElement;
            (document.getElementById('browseFile') as HTMLElement).onclick = () => {
                (document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button') as any).click();
                return false;
            };
            registerBrowseEvent = true;
        }
        // this.selectedItem.orgDataSettings.extensionType = '.csv';
        CommonKeyboardCommands.isOpen = false;
        defaultUpload.clearAll();
        const uploadDialogContent: any = document.getElementById('uploadDialogContent');
        uploadDialogContent.className = 'db-upload-content firstPage';
        OrgChartUtilityMethods.showUploadDialog();
    }

    public menumouseover(args: React.MouseEvent<Element>): void {
        const target: any = args.target as HTMLButtonElement;
        if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
            target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
            if (this.buttonInstance && this.buttonInstance.id !== target.id) {
                if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                    this.buttonInstance.toggle();
                    const buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove('e-btn-hover');
                }
            }
            const button1: any = target.ej2_instances[0];
            this.buttonInstance = button1;
            if (button1.getPopUpElement().classList.contains('e-popup-close')) {
                button1.toggle();
                if (button1.element.id === 'btnArrangeMenu') {
                    this.selectedItem.utilityMethods.enableArrangeMenuItems(this.selectedItem);
                }
                const buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.add('e-btn-hover');
            }
        } else {
            if (closest(target, '.e-dropdown-popup') === null && closest(target, '.e-dropdown-btn') === null) {
                if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                    this.buttonInstance.toggle();
                    const buttonElement: any = document.getElementById(this.buttonInstance.element.id);
                    buttonElement.classList.remove('e-btn-hover');
                }
            }
        }
    }

    public hideMenuBar(): void {
        const expandcollapseicon: any = document.getElementById('btnHideToolbar') as HTMLElement;
        const button1: Button = expandcollapseicon.ej2_instances[0];
        if (button1.iconCss.indexOf('sf-icon-Collapse tb-icons') > -1) {
            button1.iconCss = 'sf-icon-DownArrow2 tb-icons';
        } else {
            button1.iconCss = 'sf-icon-Collapse tb-icons';
        }
        this.selectedItem.utilityMethods.hideElements('hide-menubar', this.selectedItem.selectedDiagram);
        this.selectedItem.selectedDiagram.refresh();
    }
    public beforeItemRender(args: MenuEventArgs): void {
        const shortCutText: string = this.getShortCutKey(args.item.text as string);
        if (shortCutText) {
            const shortCutSpan: HTMLElement = createElement('span');
            // const text: string = args.item.text as string;
            shortCutSpan.textContent = shortCutText;
            shortCutSpan.style.pointerEvents = 'none';
            args.element.appendChild(shortCutSpan);
            shortCutSpan.setAttribute('class', 'db-shortcut');
        }
        const status: boolean = this.selectedItem.utilityMethods.enableMenuItems(args.item.text as string, this.selectedItem);
        if (status) {
            args.element.classList.add('e-disabled');
        } else {
            if (args.element.classList.contains('e-disabled')) {
                args.element.classList.remove('e-disabled');
            }
        }
    }
    public themeTemplate(): JSX.Element {
        return (
            <div id="themeDialogContent">
                <div className="row">
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme1" />
                    </div>
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme2" />
                    </div>

                </div>
                <div className="row">
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme3" />
                    </div>
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme4" />
                    </div>

                </div>
                <div className="row">
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme5" />
                    </div>
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme6" />
                    </div>

                </div>
                <div className="row">
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme7" />
                    </div>
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme8" />
                    </div>

                </div>
                <div className="row">
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme9" />
                    </div>
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme10" />
                    </div>

                </div>
                <div className="row">
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme11" />

                    </div>
                    <div className="db-theme-style-div">
                        <div className="db-theme-style theme12" />
                    </div>
                </div>
            </div>
        );
    }

    public deleteConformationTemplate(): JSX.Element {
        return (
            <div id='deleteConfirmationContent'>
                <span style={{ fontSize: "13px", color: "black" }}>
                    Please confirm that you want to delete this field?. All data will be lost for this field once you deleted.
            </span>
            </div>
        );
    }

    public hyperlinkTemplate(): JSX.Element {
        return (
            <div id="hyperlinkDialogContent">
                <div className="row">
                    <div className="row">Enter URL</div>
                    <div className="row db-dialog-child-prop-row">
                        <input type="text" id="hyperlink" />
                    </div>
                </div>
                <div className="row db-dialog-prop-row">
                    <div className="row">Link Text (Optional)</div>
                    <div className="row db-dialog-child-prop-row">
                        <input type="text" id="hyperlinkText" />
                    </div>
                </div>
            </div>
        );
    }

    public tootipTemplate(): JSX.Element {
        return (
            <div id="tooltipDialogContent">
                <div className="row">
                    <div>
                        <textarea id="objectTooltip" style={{ resize: "none", width: "100%", height: "120px" }} />
                    </div>
                </div>
            </div>
        );
    }

    public moreShapeTemplate(): JSX.Element {
        return (
            <div id="moreShapesDialogContent">
                <div className="row">
                    <div className="col-xs-3 temp-left-pane">
                        <ListViewComponent ref={moreShapesList => (this.moreShapesList as ListViewComponent) = (moreShapesList as ListViewComponent)} id='moreShapesList' dataSource={this.dropDownDataSources.listViewData}
                            fields={this.listViewFields} showCheckBox={true} select={this.listViewSelectionChange} />
                    </div>
                    <div className="col-xs-9 diagramTemplates temp-right-pane" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                        <img id="shapePreviewImage" src={require('./assets/dbstyle/shapes_images/flow.png') }/>
                    </div>
                </div>
            </div>
        );
    }

    public saveTemplate(): JSX.Element {
        return (
            <div id="saveDialogContent">
                <div className="row">
                    <div className="row">File Name</div>
                    <div className="row db-dialog-child-prop-row">
                        <input type="text" id="saveFileName" value="Diagram1" />
                    </div>
                </div>
            </div>
        );
    }

    public footerTemplate(): JSX.Element {
        return (
            <div id="exportDialogContent" >
                <div className="row">
                    <div className="row">
                        File Name
                </div>
                    <div className="row db-dialog-child-prop-row">
                        <input type="text" id="exportfileName" onClick={() => this.selectedItem.exportSettings.fileName} />
                    </div>
                </div>
                <div className="row db-dialog-prop-row">
                    <div className="col-xs-6 db-col-left">
                        <div className="row">
                            Format
                    </div>
                        <div className="row db-dialog-child-prop-row">
                            <DropDownListComponent id="exportFormat" ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)}
                                value={this.selectedItem.exportSettings.format} dataSource={this.dropDownDataSources.fileFormats}
                                fields={this.dropdownListFields} />

                        </div>
                    </div>
                    <div className="col-xs-6 db-col-right">
                        <div className="row">
                            Region
                    </div>
                        <div className="row db-dialog-child-prop-row">
                            <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} id="exportRegion" value={this.selectedItem.exportSettings.region} dataSource={this.dropDownDataSources.diagramRegions}
                                fields={this.dropdownListFields} />
                        </div>
                    </div >
                </div >
            </div >
        );
    }
    public onTooltipBeforeRender(args: TooltipEventArgs): void {
        if (args.target) {
            this.tooltip.content = this.orgChartPropertyBinding.getTooltipContent(args);
        }
    }
    public tooltipCreated(args: object): void {
        this.tooltip.target = '.db-info-style';
    }
    public onUploadSuccess(args: { [key: string]: any }): void {
        (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
        if (args.operation !== 'remove') {
            const file1: { [key: string]: any } = args.file as { [key: string]: any };
            const file: Blob = file1.rawFile as Blob;
            OrgChartUtilityMethods.fileType = file1.type.toString();
            const reader: FileReader = new FileReader();
            if (OrgChartUtilityMethods.fileType.toLowerCase() === 'jpg' || OrgChartUtilityMethods.fileType.toLowerCase() === 'png') {
                reader.readAsDataURL(file);
                reader.onloadend = this.setImage.bind(this);
            } else {
                reader.readAsText(file);
                if (OrgChartUtilityMethods.fileType === 'json' && CommonKeyboardCommands.isOpen) {
                    reader.onloadend = this.loadDiagram.bind(this);
                } else {
                    OrgChartUtilityMethods.isUploadSuccess = true;
                    reader.onloadend = OrgChartUtilityMethods.readFile.bind(OrgChartUtilityMethods);
                }
            }
            CommonKeyboardCommands.isOpen = false;
        }
    }
    public setImage(event: ProgressEvent): void {
        // (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
        const node: NodeModel = (this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0];
        const imageSource = (event.target as FileReader).result as string;
        node.shape = { type: 'Image', source: imageSource, align: 'None' };
    }

    public loadDiagram(event: ProgressEvent): void {
        this.page.loadPage(((event.target as FileReader).result as string).toString());
        this.page.loadDiagramSettings();
        this.fileUploadDialog.hide();
    }

    public onUploadFailure(args: { [key: string]: any }): void {
        (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = 'none';
    }

    public onUploadFileSelected(args: { [key: string]: any }): void {
        (document.getElementsByClassName('sb-content-overlay')[0] as HTMLDivElement).style.display = '';
    }
    public printTemplate(): JSX.Element {
        return (
            <div id="printDialogContent">
                <div className="row">
                    <div className="row">
                        Region
                </div>
                    <div className="row db-dialog-child-prop-row">
                        <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} value={this.selectedItem.printSettings.region} dataSource={this.dropDownDataSources.diagramRegions}
                            fields={this.dropdownListFields} />
                    </div>
                </div>
                <div className="row db-dialog-prop-row">
                    <div className="row">
                        Print Settings
                </div>
                    <div className="row db-dialog-child-prop-row">
                        <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} dataSource={this.dropDownDataSources.paperList} fields={this.dropdownListFields}
                            value={this.selectedItem.pageSettings.paperSize} />
                    </div>
                </div >
                <div id="printCustomSize" className="row db-dialog-prop-row" style={{ display: "none", height: "28px" }}>
                    <div className="col-xs-6 db-col-left">
                        <div className="db-text-container">
                            <div className="db-text">
                                <span>W</span>
                            </div>
                            <div className="db-text-input">
                                <NumericTextBoxComponent id="printPageWidth" min={100} step={1} format="n0" value={this.selectedItem.printSettings.pageWidth} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 db-col-right">
                        <div className="db-text-container">
                            <div className="db-text">
                                <span>H</span>
                            </div>
                            <div className="db-text-input">
                                <NumericTextBoxComponent id="printPageHeight" min={100} step={1} format="n0" value={this.selectedItem.printSettings.pageHeight} />
                            </div>
                        </div>
                    </div >
                </div >
                <div id="printOrientation" className="row db-dialog-prop-row" style={{ height: "28px", padding: "5px 0px" }}>
                    <div className="col-xs-3 db-prop-col-style" style={{ marginRight: "8px" }}>
                        <RadioButtonComponent id='printPortrait' label="Portrait" name="printSettings" checked={this.selectedItem.printSettings.isPortrait} />
                    </div>
                    <div className="col-xs-3 db-prop-col-style">
                        <RadioButtonComponent id='printLandscape' label="Landscape" name="printSettings" checked={this.selectedItem.printSettings.isLandscape} />
                    </div >
                </div >
                <div className="row db-dialog-prop-row" style={{ marginTop: "16px" }}>
                    <CheckBoxComponent id='printMultiplePage' label="Scale to fit 1 page" checked={this.selectedItem.printSettings.multiplePage} />
                </div >
            </div >
        );
    }

    public fileTemplate(): JSX.Element {
        return (
            <div id="uploadDialogContent" className="db-upload-content firstPage">
                {/* <TooltipComponent  beforeRender = {this.onTooltipBeforeRender}  position="tooltipPosition"  /> */}
                <div id='uploadInformationDiv' className="row db-dialog-prop-row" style={{ marginTop: "0px" }}>
                    <div className="row">
                        <div className="row" style={{ fontSize: "12px", fontWeight: 500, color: "black" }}>
                            <div className="db-info-text">
                                Choose Format
                            </div>
                            <div className='db-format-type' style={{ display: "none" }} />
                        </div>
                        <div className="row db-dialog-child-prop-row">
                            <div className="col-xs-3 db-prop-col-style">
                                <RadioButtonComponent id='csvFormat' label="csv" name="uploadFileFormat" checked={true}
                                    change={this.downloadFile.downloadFormatChange.bind(this.downloadFile)} />
                            </div>
                            <div className="col-xs-3 db-prop-col-style">
                                <RadioButtonComponent id='xmlFormat' label="xml" name="uploadFileFormat" change={this.downloadFile.downloadFormatChange.bind(this.downloadFile)} />
                            </div>
                            <div className="col-xs-3 db-prop-col-style">
                                <RadioButtonComponent id='jsonFormat' label="json" name="uploadFileFormat" change={this.downloadFile.downloadFormatChange.bind(this.downloadFile)} />
                            </div>
                        </div >
                    </div >
                    <div className="row db-dialog-prop-row" style={{ padding: "10px", backgroundColor: "#FFF7B5", border: "1px solid #FFF7B5" }} >
                        <div className="db-info-parent" style={{ width: "10%", backgroundColor: "transparent", height: "60px" }} />

                        <div style={{ float: "left", width: "calc(90% - 5px)" }}>
                            <ul style={{ paddingLeft: "25px", marginBottom: "0px" }}>
                                <li style={{ marginBottom: "5px" }}>
                                    <span id="descriptionText1" style={{ color: "#515151", fontSize: "11px", lineHeight: "15px" }}>Make
                                    sure that the every column of your table has a header</span>
                                </li>
                                <li>
                                    <span id="descriptionText2" style={{ color: "#515151", fontSize: "11px", lineHeight: "15px" }}>Each
                                        employee should have a reporting person (except for top most employee of the organization)
                                        and it should be indicated by any field from your data source.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row db-dialog-prop-row">
                        <ButtonComponent id="btnDownloadFile" content={this.selectedItem.orgDataSettings.buttonContent} onClick={this.downloadFile.downloadExampleFiles.bind(this.downloadFile)} />
                    </div >
                    <div className="row">
                        <div id="dropArea">
                            <span id="dropRegion" className="droparea"> Drop files here or
                                <a href="" id="browseFile">
                                    <u>Browse</u>
                                </a>
                            </span>
                            <UploaderComponent ref={defaultupload => (this.defaultupload as UploaderComponent) = (defaultupload as UploaderComponent)} id='defaultfileupload' asyncSettings={this.path} success={uploadChange} failure={this.onUploadFailure}
                                progress={this.onUploadFileSelected} allowedExtensions={this.selectedItem.orgDataSettings.extensionType} />
                        </div>
                    </div >
                </div >
                <div id='parentChildRelationDiv' className="row db-dialog-prop-row">
                    <div className="row db-dialog-child-prop-row" style={{ marginTop: "20px" }}>
                        <div className="row">
                            <div className="db-info-text">
                                Employee Id
                            </div>
                            <div className='db-info-style db-employee-id' />
                        </div>
                        <div className="row db-dialog-child-prop-row">
                            <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} id="employeeId" change={this.orgChartPropertyBinding.orgDropDownChange.bind(this.orgChartPropertyBinding)} dataSource={this.selectedItem.orgDataSettings.dataSourceColumns}
                                fields={this.dropdownListFields} />
                        </div>
                    </div>
                    <div className="row db-dialog-prop-row">
                        <div className="row">
                            <div className="db-info-text">
                                Supervisor Id
                            </div>
                            <div className='db-info-style db-supervisor-id' />
                        </div>
                        <div className="row db-dialog-child-prop-row">
                            <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} id="superVisorId" change={this.orgChartPropertyBinding.orgDropDownChange.bind(this.orgChartPropertyBinding)} dataSource={this.selectedItem.orgDataSettings.dataSourceColumns}
                                fields={this.dropdownListFields} />

                        </div>
                    </div >
                </div >
                <div id='moreInformationDiv' className="row db-dialog-prop-row">
                    <div id='bindingFields' className="row">
                        <div className="row">
                            <div className="db-info-text">
                                Name
                            </div>
                            <div className='db-info-style db-nameField-id' />
                        </div>
                        <div className="row db-dialog-child-prop-row">
                            <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} id="orgNameField" change={this.orgChartPropertyBinding.orgDropDownChange.bind(this.orgChartPropertyBinding)}
                                dataSource={this.selectedItem.orgDataSettings.dataSourceColumns} fields={this.dropdownListFields} />

                        </div>
                    </div>
                    <div id='bindingFields' className="row db-dialog-prop-row" style={{ marginTop: "20px" }}>
                        <div className="row">
                            <div className="db-info-text">
                                Binding Fields
                            </div>
                            <div className='db-info-style db-bindingField-id' />
                        </div>
                        <div className="row db-dialog-child-prop-row">
                            <MultiSelectComponent id="orgBindingFields" change={this.orgChartPropertyBinding.orgMultiSelectChange.bind(this.orgChartPropertyBinding)}
                                dataSource={this.selectedItem.orgDataSettings.dataSourceColumns} fields={this.dropdownListFields} mode='Delimiter' />
                        </div>
                    </div >
                    <div id='imageFields' className="row db-dialog-prop-row">
                        <div className="row">
                            <div className="db-info-text">
                                Image Field
                            </div>
                            <div className='db-info-style db-imageField-id' />
                        </div>
                        <div className="row db-dialog-child-prop-row">
                            <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} id="orgImageField" change={this.orgChartPropertyBinding.orgDropDownChange.bind(this.orgChartPropertyBinding)} dataSource={this.selectedItem.orgDataSettings.dataSourceColumns}
                                fields={this.dropdownListFields} />
                        </div>
                    </div >
                    <div id='additionalFields' className="row db-dialog-prop-row">
                        <div className="row">
                            <div className="db-info-text">
                                Additional Fields
                            </div>
                            <div className='db-info-style db-additionalField-id' />
                        </div>
                        <div className="row db-dialog-child-prop-row">
                            <MultiSelectComponent id="orgAdditionalField" change={this.orgChartPropertyBinding.orgMultiSelectChange.bind(this.orgChartPropertyBinding)} dataSource={this.selectedItem.orgDataSettings.dataSourceColumns}
                                fields={this.dropdownListFields} mode='Delimiter' />
                        </div>
                    </div >
                </div >

            </div >
        );
    }

    public getShortCutKey(menuItem: string): string {
        let shortCutKey: string = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
        switch (menuItem) {
            case 'New':
                shortCutKey = 'Shift' + '+N';
                break;
            case 'Open':
                shortCutKey = shortCutKey + '+O';
                break;
            case 'Save':
                shortCutKey = shortCutKey + '+S';
                break;
            case 'Undo':
                shortCutKey = shortCutKey + '+Z';
                break;
            case 'Redo':
                shortCutKey = shortCutKey + '+Y';
                break;
            case 'Cut':
                shortCutKey = shortCutKey + '+X';
                break;
            case 'Copy':
                shortCutKey = shortCutKey + '+C';
                break;
            case 'Paste':
                shortCutKey = shortCutKey + '+V';
                break;
            case 'Delete':
                shortCutKey = 'Delete';
                break;
            case 'Duplicate':
                shortCutKey = shortCutKey + '+D';
                break;
            case 'Select All':
                shortCutKey = shortCutKey + '+A';
                break;
            case 'Zoom In':
                shortCutKey = shortCutKey + '++';
                break;
            case 'Zoom Out':
                shortCutKey = shortCutKey + '+-';
                break;
            case 'Group':
                shortCutKey = shortCutKey + '+G';
                break;
            case 'Ungroup':
                shortCutKey = shortCutKey + '+U';
                break;
            case 'Send To Back':
                shortCutKey = shortCutKey + '+Shift+B';
                break;
            case 'Bring To Front':
                shortCutKey = shortCutKey + '+Shift+F';
                break;
            default:
                shortCutKey = '';
                break;
        }
        return shortCutKey;
    }
    public arrangeMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        (args.element.children[0] as HTMLElement).style.display = 'block';
        if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
    }

    public arrangeMenuBeforeClose(args: BeforeOpenCloseMenuEventArgs): void {
        if (args.event && closest(args.event.target as Element, '.e-dropdown-btn') !== null) {
            args.cancel = true;
        }
        if (!args.element) {
            args.cancel = true;
        }
    }
    public moreShapesClick(): void {
        this.moreShapesDialog.show();
    }



    public setNodeDefaults(node: NodeModel, diagram: Diagram): NodeModel {
        if (node.style) {
            if (node.style.fill === 'transparent' && !node.children) {
                node.style.fill = 'white';
            }
        }
        const node1: NodeModel = {
            style: { strokeWidth: 2 }
        };
        return node1;
    }

    public setConnectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
        const connector1: ConnectorModel = {
            annotations: [
                { content: '', style: { fill: '#ffffff' } }
            ],
            style: { strokeWidth: 2 }
        };
        return connector1;
    }

    public collectionChange(args: ICollectionChangeEventArgs): void {
        if (this.selectedItem.diagramType === 'GeneralDiagram') {
            if (args.state === 'Changed' && args.type === 'Addition' &&
                args.cause === (DiagramAction.Render | DiagramAction.ToolAction)) {
                if (this.selectedItem.themeStyle !== undefined && this.selectedItem.themeStyle !== null) {
                    this.diagramThemes.applyThemeStyleforElement(args.element, {});
                }
                this.selectedItem.isModified = true;
            }
        } else {
            if (args.state === 'Changed' && this.selectedItem.isCopyLayoutElement) {
                if (args.element instanceof Node) {
                    if (args.element.addInfo) {
                        if ((args.element.addInfo as { [key: string]: object }).isFirstNode) {
                            (this.selectedItem.pastedFirstItem as NodeModel | ConnectorModel) = args.element;
                        }
                    }
                }
                this.selectedItem.isModified = true;
            }
        }
    }
    public getCommandSettings(): CommandManagerModel {
        const commandManager: CommandManagerModel = {
            commands: [
                {
                    gesture: { key: Keys.D, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: CommonKeyboardCommands.duplicateSelectedItems.bind(CommonKeyboardCommands), name: 'Duplicate'
                },
                {
                    gesture: { key: Keys.B, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.sendToBack.bind(this), name: 'SendToBack'
                },
                {
                    gesture: { key: Keys.F, keyModifiers: KeyModifiers.Control | KeyModifiers.Shift }, canExecute: this.canExecute,
                    execute: this.bringToFront.bind(this), name: 'BringToFront'
                },
                {
                    gesture: { key: Keys.G, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.group.bind(this), name: 'Group'
                },
                {
                    gesture: { key: Keys.U, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.ungroup.bind(this), name: 'Ungroup'
                },
                {
                    gesture: { key: Keys.X, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.cutObjects.bind(this), name: 'cutObjects'
                },
                {
                    gesture: { key: Keys.C, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.copyObjects.bind(this), name: 'copyObjects'
                },
                {
                    gesture: { key: Keys.V, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.pasteObjects.bind(this), name: 'pasteObjects'
                },
                {
                    gesture: { key: Keys.Z, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.undo.bind(this), name: 'undo'
                },
                {
                    gesture: { key: Keys.Y, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.redo.bind(this), name: 'redo'
                },
                {
                    gesture: { key: Keys.Delete, keyModifiers: KeyModifiers.None }, canExecute: this.canExecute,
                    execute: this.delete.bind(this), name: 'delete'
                },
                {
                    gesture: { key: Keys.A, keyModifiers: KeyModifiers.Control }, canExecute: this.canExecute,
                    execute: this.selectAll.bind(this), name: 'selectAll'
                }
            ]
        };
        commandManager.commands = CommonKeyboardCommands.addCommonCommands(commandManager.commands as CommandModel[]);
        return commandManager;
    }


    public drop(args: IDropEventArgs): void {
        if (this.selectedItem.diagramType === 'OrgChart') {
            const diagram: Diagram = this.selectedItem.selectedDiagram;
            const source: object = args.source as object;
            let sourceNode: any = null;
            if (source instanceof Diagram) {
                if ((diagram.selectedItems.nodes as NodeModel[]).length === 1) {
                    sourceNode = (diagram.selectedItems.nodes as NodeModel[])[0] as Node;
                }
            } else if (source instanceof Node) {
                sourceNode = source;
            }
            if (sourceNode !== null && sourceNode.id !== 'rootNode' && args.target instanceof Node) {
                const targetNode: NodeModel = args.target as NodeModel;
                const connector: Connector = diagram.getObject(sourceNode.inEdges[0]) as Connector;
                connector.sourceID = targetNode.id as string;
                diagram.dataBind();
            }
            diagram.doLayout();
        }
    };
    public renameDiagram(): void {
        document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
        const element: HTMLInputElement = (document.getElementById('diagramEditable') as HTMLInputElement);
        element.value = (document.getElementById('diagramName') as HTMLElement).innerHTML;
        element.focus();
        element.select();
    }
    public diagramNameKeyDown(args: KeyboardEvent): void {
        if (args.which === 13) {
            (document.getElementById('diagramName') as HTMLElement).innerHTML = (document.getElementById('diagramEditable') as HTMLInputElement).value;
            document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
        }
    }
    public diagramNameChange(): void {
        (document.getElementById('diagramName') as HTMLElement).innerHTML = (document.getElementById('diagramEditable') as HTMLInputElement).value;
        document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
        this.selectedItem.exportSettings.fileName = (document.getElementById('diagramName') as HTMLElement).innerHTML;
    }
    public toolbarEditorClick(args: ClickEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const commandType: string = (args.item.tooltipText as string).replace(/[' ']/g, '').toLowerCase();
        switch (commandType) {
            case 'undo':
                this.undo();
                break;
            case 'redo':
                this.redo();
                break;
            case 'zoomin(ctrl++)':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom as number * 100).toFixed() + '%';
                break;
            case 'zoomout(ctrl+-)':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                this.selectedItem.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom as number * 100).toFixed() + '%';
                break;
            case 'pantool':
                diagram.tool = DiagramTools.ZoomPan;
                diagram.clearSelection();
                this.selectedItem.utilityMethods.objectTypeChange('diagram');
                break;
            case 'pointer':
                diagram.drawingObject = {};
                diagram.tool = DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
                break;
            case 'texttool':
                diagram.drawingObject = { shape: { type: 'Text' }, style: { strokeColor: 'none', fill: 'none' } };
                diagram.tool = DiagramTools.ContinuousDraw;
                break;
            case 'delete':
                this.delete();
                break;
            case 'lock':
                this.lockObject();
                break;
            case 'fillcolor':
                this.showColorPicker('nodeFillColor', 'tb-item-fill');
                break;
            case 'bordercolor':
                if ((this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[]).length > 0) {
                    this.showColorPicker('nodeStrokeColor', 'tb-item-stroke');
                } else {
                    this.showColorPicker('lineColor', 'tb-item-stroke');
                }
                break;
            case 'group':
                this.group();
                break;
            case 'ungroup':
                this.ungroup();
                break;
            case 'alignleft':
            case 'alignright':
            case 'aligntop':
            case 'alignbottom':
            case 'alignmiddle':
            case 'aligncenter':
                this.selectedItem.isModified = true;
                const alignType: string = commandType.replace('align', '');
                const alignType1: AlignmentOptions = alignType.charAt(0).toUpperCase() + alignType.slice(1) as AlignmentOptions;
                diagram.align(alignType1);
                break;
            case 'distributeobjectshorizontally':
                this.distribute('RightToLeft');
                break;
            case 'distributeobjectsvertically':
                this.distribute('BottomToTop');
                break;
            case 'showlayers':
                this.showHideLayers();
                break;
            case 'themes':
                this.showHideThemes();
                break;
        }
        if (commandType === 'pantool' || commandType === 'pointer' || commandType === 'texttool') {
            if ((args.item.cssClass as string).indexOf('tb-item-selected') === -1) {
                this.removeSelectedToolbarItem();
                args.item.cssClass += ' tb-item-selected';
            }
        }
    }

    public showHideLayers(): void {
        const btnWindow: any = document.getElementById('btnWindowMenu');
        const iconCss: string = btnWindow.ej2_instances[0].items[3].iconCss;
        if (!this.initLayerPanel) {
            this.diagramLayer.initLayerBottomPanel();
            this.initLayerPanel = true;
        }
        if (iconCss) {
            this.layerDialog.hide();
        } else {
            this.diagramLayer.getLayerDialogContent();
            this.layerDialog.show();
        }
        btnWindow.ej2_instances[0].items[3].iconCss = iconCss ? '' : 'sf-icon-Selection';
    }

    public showHideThemes(): void {
        const btnWindow: any = document.getElementById('btnWindowMenu');
        const iconCss: string = btnWindow.ej2_instances[0].items[5].iconCss;
        if (iconCss) {
            this.themeDialog.hide();
        } else {
            this.themeDialog.show();
        }
        btnWindow.ej2_instances[0].items[5].iconCss = iconCss ? '' : 'sf-icon-Selection';
    }
    public removeSelectedToolbarItem(): void {
        for (const value of this.toolbarEditor.items) {
            const item: ToolbarItemModel = value;
            if ((item.cssClass as string).indexOf('tb-item-selected') !== -1) {
                item.cssClass = (item.cssClass as string).replace(' tb-item-selected', '');
            }
        }
        this.toolbarEditor.dataBind();
        (document.getElementById('btnDrawShape') as HTMLElement).classList.remove('tb-item-selected');
        (document.getElementById('btnDrawConnector') as HTMLElement).classList.remove('tb-item-selected');
    }

    public showColorPicker(propertyName: string, toolbarName: string): void {
        const value: HTMLElement = document.getElementById(propertyName) as HTMLElement;
        const fillElement: HTMLButtonElement =
            (value.parentElement as HTMLElement).getElementsByClassName('e-dropdown-btn')[0] as HTMLButtonElement;
        fillElement.click();
        const popupElement: HTMLElement = document.getElementById(fillElement.id + '-popup') as HTMLElement;
        const bounds: ClientRect = document.getElementsByClassName(toolbarName)[0].getBoundingClientRect();
        popupElement.style.left = bounds.left + 'px';
        popupElement.style.top = (bounds.top + 40) + 'px';
    }

    public zoomChange(args: MenuEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;

        if (args.item.text === 'Fit To Screen') {
            this.selectedItem.scrollSettings.currentZoom = 'Fit ...';
            diagram.fitToPage({ mode: 'Page', region: 'Content', margin: { left: 0, top: 0, right: 0, bottom: 0 } });
        } else {
            const currentZoom: number = diagram.scrollSettings.currentZoom as number;
            const zoom: ZoomOptions = {};
            switch (args.item.text) {
                case '400%':
                    zoom.zoomFactor = (4 / currentZoom) - 1;
                    break;
                case '300%':
                    zoom.zoomFactor = (3 / currentZoom) - 1;
                    break;
                case '200%':
                    zoom.zoomFactor = (2 / currentZoom) - 1;
                    break;
                case '150%':
                    zoom.zoomFactor = (1.5 / currentZoom) - 1;
                    break;
                case '100%':
                    zoom.zoomFactor = (1 / currentZoom) - 1;
                    break;
                case '75%':
                    zoom.zoomFactor = (0.75 / currentZoom) - 1;
                    break;
                case '50%':
                    zoom.zoomFactor = (0.5 / currentZoom) - 1;
                    break;
                case '25%':
                    zoom.zoomFactor = (0.25 / currentZoom) - 1;
                    break;
            }
            this.selectedItem.scrollSettings.currentZoom = args.item.text as string;
            diagram.zoomTo(zoom);
        }
    }

    public drawShapeChange(args: MenuEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (args.item.text === 'Rectangle') {
            diagram.drawingObject = { shape: { type: 'Basic', shape: 'Rectangle' }, style: { strokeWidth: 2 } };
        } else if (args.item.text === 'Ellipse') {
            diagram.drawingObject = { shape: { type: 'Basic', shape: 'Ellipse' }, style: { strokeWidth: 2 } };
        } else if (args.item.text === 'Polygon') {
            diagram.drawingObject = { shape: { type: 'Basic', shape: 'Polygon' }, style: { strokeWidth: 2 } };
        }
        diagram.tool = DiagramTools.ContinuousDraw;
        this.removeSelectedToolbarItem();
        (document.getElementById('btnDrawShape') as HTMLElement).classList.add('tb-item-selected');
    }

    public drawConnectorChange(args: MenuEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (args.item.text === 'Straight Line') {
            diagram.drawingObject = { type: 'Straight', style: { strokeWidth: 2 } };
        } else if (args.item.text === 'Orthogonal Line') {
            diagram.drawingObject = { type: 'Orthogonal', style: { strokeWidth: 2 } };
        } else if (args.item.text === 'Bezier') {
            diagram.drawingObject = { type: 'Bezier', style: { strokeWidth: 2 } };
        }
        diagram.tool = DiagramTools.ContinuousDraw;
        diagram.clearSelection();
        this.removeSelectedToolbarItem();
        (document.getElementById('btnDrawConnector') as HTMLElement).classList.add('tb-item-selected');
    }

    public orderCommandsChange(args: MenuEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (args.item.text === 'Send To Back') {
            this.sendToBack();
        } else if (args.item.text === 'Bring To Front') {
            this.bringToFront();
        } else if (args.item.text === 'Bring Forward') {
            this.selectedItem.isModified = true;
            diagram.moveForward();
        } else if (args.item.text === 'Send Backward') {
            this.selectedItem.isModified = true;
            diagram.sendBackward();
        }
    }
    public toolbarInsertClick(args: ClickEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        const commandType: string = (args.item.tooltipText as string).replace(/[' ']/g, '');
        if ((diagram.selectedItems.nodes as NodeModel[]).length > 0) {
            switch (commandType.toLowerCase()) {
                case 'insertlink':
                    (document.getElementById('hyperlink') as HTMLInputElement).value = '';
                    (document.getElementById('hyperlinkText') as HTMLInputElement).value = '';
                    if (((diagram.selectedItems.nodes as NodeModel[])[0].annotations as ShapeAnnotation[]).length > 0) {
                        const annotation: ShapeAnnotationModel = ((diagram.selectedItems.nodes as NodeModel[])[0].annotations as ShapeAnnotationModel)[0];
                        if ((annotation.hyperlink as HyperlinkModel).link || annotation.content) {
                            (document.getElementById('hyperlink') as HTMLInputElement).value = (annotation.hyperlink as HyperlinkModel).link as string;
                            (document.getElementById('hyperlinkText') as HTMLInputElement).value = ((annotation.hyperlink as HyperlinkModel).content || annotation.content) as string;
                        }
                    }
                    this.hyperlinkDialog.show();
                    break;
                case 'insertimage':
                    CommonKeyboardCommands.openUploadBox(false, '.jpg,.png,.bmp');
                    break;
            }

        }
    }

    public arrangeContextMenuOpen(args: OpenCloseMenuEventArgs): void {
        if (args.element.classList.contains('e-menu-parent')) {
            const popup: HTMLElement = document.querySelector('#btnArrangeMenu-popup') as HTMLElement;
            args.element.style.left = formatUnit(parseInt(args.element.style.left as string, 10) - parseInt(popup.style.left as string, 10));
            args.element.style.top = formatUnit(parseInt(args.element.style.top as string, 10) - parseInt(popup.style.top as string, 10));
        }
    }
    public contextMenuClick(args: ContextMenuEventArgs): void {
        const buttonElement: any = document.getElementsByClassName('e-btn-hover')[0];
        if (buttonElement) {
            buttonElement.classList.remove('e-btn-hover');
        }
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        let commandType: string = '';
        if (args.element.innerText.indexOf('Ctrl') !== -1) {
            commandType = args.element.innerText.substring(0, args.element.innerText.indexOf('Ctrl')).trim();
        } else {
            commandType = args.element.innerText.trim();
        }
        commandType = commandType.replace(/[' ']/g, '');
        switch (commandType.toLowerCase()) {
            case 'left':
            case 'right':
            case 'top':
            case 'bottom':
            case 'middle':
            case 'center':
                this.selectedItem.isModified = true;
                diagram.align(args.item.text as AlignmentOptions);
                break;
            case 'horizontally':
                this.distribute('RightToLeft');
                break;
            case 'vertically':
                this.distribute('BottomToTop');
                break;
            case 'width':
                this.selectedItem.isModified = true;
                diagram.sameSize('Width');
                break;
            case 'height':
                this.selectedItem.isModified = true;
                diagram.sameSize('Height');
                break;
            case 'bothwidthandheight':
                this.selectedItem.isModified = true;
                diagram.sameSize('Size');
                break;
            case 'sendtoback':
                this.sendToBack();
                break;
            case 'bringtofront':
                this.bringToFront();
                break;
            case 'bringforward':
                this.selectedItem.isModified = true;
                diagram.moveForward();
                break;
            case 'sendbackward':
                this.selectedItem.isModified = true;
                diagram.sendBackward();
                break;
            case 'lock':
            case 'unlock':
                this.lockObject();
                break;
            case 'group':
                this.group();
                break;
            case 'ungroup':
                this.ungroup();
                break;
        }
    }
    public zoomTemplate(): JSX.Element {
        return (
            <div id="template_toolbar">
                <DropDownButtonComponent id="btnZoomIncrement" items={this.zoomMenuItems} content={this.selectedItem.scrollSettings.currentZoom}
                    select={zoomchange} />
            </div>
        );
    }

    public drawShapeTemplate(): JSX.Element {
        return (
            <div id="template_toolbar">
                <DropDownButtonComponent id='btnDrawShape' items={this.dropDownDataSources.drawShapesList} iconCss='sf-icon-DrawingMode' select={drawShape} />
            </div>
        );
    }

    public drawConnector(): JSX.Element {
        return (
            <div id="template_toolbar">
                <DropDownButtonComponent id='btnDrawConnector' items={this.dropDownDataSources.drawConnectorsList} iconCss='sf-icon-ConnectorMode' select={drawConnector} />
            </div>
        );
    }

    public orderTemplate(): JSX.Element {
        return (
            <div id="template_toolbar">
                <DropDownButtonComponent items={this.dropDownDataSources.orderCommandsList} iconCss='sf-icon-Order' select={orderCommand} />
            </div>
        );
    }
    // let offsetX: NumericTextBoxComponent = new NumericTextBoxComponent();
    public offsetX(args: any) {

        if (args.isInteracted as any) {
            (this.selectedItem.nodeProperties.offsetX as any).value = args.value;
            this.selectedItem.nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
        }
    }

    public offsetY(args: any) {
        if (args.isInteracted as any) {
            (this.selectedItem.nodeProperties.offsetY as any).value = args.value;
            this.selectedItem.nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
        }
    }
    public nodeWidth(args: any) {
        if (args.isInteracted as any) {
            (this.selectedItem.nodeProperties.width as any).value = args.value;
            this.selectedItem.nodePropertyChange({ propertyName: 'width', propertyValue: args });
        }
    }
    public nodeHeight(args: any) {
        if (args.isInteracted as any) {
            (this.selectedItem.nodeProperties.height as any).value = args.value;
            this.selectedItem.nodePropertyChange({ propertyName: 'height', propertyValue: args });
        }
    }

    public aspectRatioChange(args: any) {
        this.selectedItem.nodePropertyChange({ propertyName: 'aspectRatio', propertyValue: args });
    }
    public nodeRotationChange(args: any) {
        (this.selectedItem.nodeProperties.rotateAngle as any).value = args.value;
        this.selectedItem.nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
    }
    public nodeFillColorChange(args: any) {
        this.selectedItem.nodePropertyChange({ propertyName: 'fillColor', propertyValue: args.currentValue.hex });
    }
    public nodeGradientChange(args: any) {
        this.selectedItem.nodeProperties.gradient = args.value;
        const gradientElement = document.getElementById('gradientStyle');
        if (args.checked) {
            (gradientElement as any).className = 'row db-prop-row db-gradient-style-show';
        }
        else {
            (gradientElement as any).className = 'row db-prop-row db-gradient-style-hide';
        }
        this.selectedItem.nodePropertyChange({ propertyName: 'gradient', propertyValue: args });
    }
    public gradientDropDownChange(args: any) {
        this.selectedItem.nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args });
    }

    public nodeGradientColorChange(args: any) {
        (this.selectedItem.nodeProperties.gradientColor as any).value = args.currentValue.hex;
        this.selectedItem.nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
    }
    public nodeOpcityChange(args: any) {
        (this.selectedItem.nodeProperties.opacity as any).value = args.value;
        this.selectedItem.nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
    public connectorTypeChange(args: any) {
        (this.selectedItem.connectorProperties.lineType as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
    }
    public connectorColorChange(args: any) {
        (this.selectedItem.connectorProperties.lineColor as any).value = args.currentValue.hex;
        this.selectedItem.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
    }
    public ConnectorLineStyle(args: any) {
        (this.selectedItem.connectorProperties.lineStyle as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
    }
    public ConnectorLineWidthChnage(args: any) {
        (this.selectedItem.connectorProperties.lineWidth as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
    }
    public connectorSourceType(args: any) {
        (this.selectedItem.connectorProperties.sourceType as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });

    }
    public connectorTargetType(args: any) {
        (this.selectedItem.connectorProperties.targetType as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
    }
    public connectorSourceSize(args: any) {
        (this.selectedItem.connectorProperties.sourceSize as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });

    }
    public connectorTargetSize(args: any) {
        (this.selectedItem.connectorProperties.targetSize as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
    }
    public connectorBridgeChange(args: any) {
        if (args.checked) {
            (document.getElementById('lineJumpSizeDiv') as HTMLElement).style.display = '';
        }
        else {
            (document.getElementById('lineJumpSizeDiv') as HTMLElement).style.display = 'none';
        }
        this.selectedItem.connectorPropertyChange({ propertyName: 'lineJump', propertyValue: args });
    }
    public connectorBridgeSize(args: any) {
        (this.selectedItem.connectorProperties.lineJumpSize as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'lineJumpSize', propertyValue: args });
    }
    public ConnectorOpacityChange(args: any) {
        (this.selectedItem.connectorProperties.opacity as any).value = args.value;
        this.selectedItem.connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
    public nodeFontFamilyChange(args: any) {
        (this.selectedItem.textProperties.fontFamily as any).value = args.value;
        this.selectedItem.textPropertyChange({ propertyName: 'fontFamily', propertyValue: args });
    }
    public nodeFontSizeChange(args: any) {
        (this.selectedItem.textProperties.fontSize as any).value = args.value;
        this.selectedItem.textPropertyChange({ propertyName: 'fontSize', propertyValue: args });
    }
    public nodeFontColor(args: any) {
        (this.selectedItem.textProperties.fontColor as any).value = args.currentValue.hex;
        this.selectedItem.textPropertyChange({ propertyName: 'fontColor', propertyValue: args });
    }
    public fontOpacityChangeEvent(args: any) {
        (this.selectedItem.textProperties.opacity as any).value = args.value;
        this.selectedItem.textPropertyChange({ propertyName: 'opacity', propertyValue: args });

    }
    public mindmapOpacityChangeEvent(args: any) {
        (this.selectedItem.mindmapSettings.opacity as any).value = args.value;
        this.selectedItem.mindMapPropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
    public mindmapFontOpacityChangeEvent(args: any) {
        (this.selectedItem.mindmapSettings.opacity as any).value = args.value;
        this.selectedItem.mindMapPropertyChange({propertyName: 'textOpacity', propertyValue: args});
    }
    public diagramContextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        args.hiddenItems = args.hiddenItems.concat(this.selectedItem.customContextMenu.getHiddenMenuItems(diagram));
    }
    public DiagrammindMapLevel(args: any) {
        (this.selectedItem.mindmapSettings.levelType as any).value = args.value;
        this.selectedItem.mindMapPropertyChange({ propertyName: 'levelType', propertyValue: args });
    }
    public mindmapFillColorChange(args: any) {
        (this.selectedItem.mindmapSettings.fill as any).value = args.currentValue.hex;
        this.selectedItem.mindMapPropertyChange({ propertyName: 'fill', propertyValue: args });
    }
    public nodeStrokeWidthChange(args: any) {
        (this.selectedItem.nodeProperties.strokeWidth as any).value = args.value;
        this.selectedItem.nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
    }
    public nodeBoderStyleChange(args: any) {
        (this.selectedItem.nodeProperties.strokeStyle as any).value = args.value;
        this.selectedItem.nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
    }
    public nodeStrokeColorChange(args: any) {
        (this.selectedItem.nodeProperties.strokeColor as any).value = args.currentValue.hex;
        this.selectedItem.nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
    }
    public mindMapStrokeChangeEvent(args: any) {
        (this.selectedItem.mindmapSettings.stroke as any).value = args.currentValue.hex;
        this.selectedItem.mindMapPropertyChange({ propertyName: 'stroke', propertyValue: args });
    }
    public mindmapStorkeStyleChangeEvent(args: any) {
        (this.selectedItem.mindmapSettings.strokeStyle as any).value = args.value;
        this.selectedItem.mindMapPropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
    }
    public mindmapStrokewidthChangeEvent(args: any) {
        (this.selectedItem.mindmapSettings.strokeWidth as any).value = args.value;
        this.selectedItem.mindMapPropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
    }
    public mindmapFontSizeChangeEvent(args: any) {
        (this.selectedItem.mindmapSettings.fontSize as any).value = args.value;
        this.selectedItem.mindMapPropertyChange({ propertyName: 'fontSize', propertyValue: args });
    }
    public mindmapFontfamilyTextEvent(args: any) {
        (this.selectedItem.mindmapSettings.fontFamily as any).value = args.value;
        this.selectedItem.mindMapPropertyChange({propertyName: 'fontFamily', propertyValue: args});
    }
    public mindmapFontColorChangeEvent(args: any) {
        (this.selectedItem.mindmapSettings.fontColor as any).value = args.currentValue.hex;
        this.selectedItem.mindMapPropertyChange({propertyName: 'fontColor', propertyValue: args});
    }

    public render() {
        return (
            <div>
                <ContextMenuComponent id='arrangeContextMenu' ref={arrangeContextMenu => (this.arrangeContextMenu) = (arrangeContextMenu as ContextMenuComponent)} animationSettings={this.animationSettings} items={this.dropDownDataSources.arrangeMenuItems}
                    onOpen={contextMenuOpenChange} cssClass="arrangeMenu" beforeItemRender={beforItem}
                    select={contextMenuClickEvent} beforeClose={() => this.arrangeMenuBeforeClose} />
                <div className="diagrambuilder-container" style={{display:"none"}}>
                    <div className='header navbar'>
                        <div className="db-header-container">
                            <div className="db-diagram-name-container">
                                <span id='diagramName' className="db-diagram-name" style={{
                                    width: "250px", overflow: "hidden",
                                    textOverflow: "ellipse", whiteSpace: "nowrap"
                                }} onClick={this.renameDiagram}>
                                    Untitled Diagram
                            </span>
                                <input id='diagramEditable' type="text" className="db-diagram-name"
                                    onFocus={diagramName} />

                                <span id='diagramreport' className="db-diagram-name db-save-text" />
                            </div>
                            <div className='db-menu-container'>
                                <div className="db-menu-style">
                                    < DropDownButtonComponent id="btnFileMenu" cssClass={"db-dropdown-menu"} content="File"
                                        items={this.dropDownDataSources.fileMenuItems} beforeItemRender={beforItem} beforeOpen={beforeOpen}
                                        beforeClose={beforeClose} select={menuclick}
                                    />
                                </div>
                                <div className="db-menu-style">
                                    < DropDownButtonComponent id="btnEditMenu" cssClass={"db-dropdown-menu"} content="Edit"
                                        items={this.dropDownDataSources.editMenuItems} beforeItemRender={beforItem} beforeOpen={beforeOpen}
                                        beforeClose={beforeClose} select={menuclick}
                                    />
                                </div>
                                <div className="db-menu-style">
                                    < DropDownButtonComponent id="btnViewMenu" cssClass={"db-dropdown-menu"} content="View"
                                        items={this.dropDownDataSources.viewMenuItems} beforeItemRender={beforItem} beforeOpen={beforeOpen}
                                        beforeClose={beforeClose} select={menuclick}
                                    />
                                </div>
                                <div className="db-menu-style">
                                    < DropDownButtonComponent id="btnArrangeMenu" cssClass={"db-dropdown-menu"} content="Arrange"
                                        target='.e-contextmenu-wrapper.arrangeMenu' items={this.dropDownDataSources.arrangeMenuItems} beforeItemRender={beforItem} beforeOpen={beforeOpen}
                                        beforeClose={beforeClose} select={menuclick}
                                    />
                                </div>
                                <div className="db-menu-style">
                                    < DropDownButtonComponent id="btnWindowMenu" cssClass={"db-dropdown-menu"} content="Window"
                                        items={this.dropDownDataSources.windowMenuItems} beforeItemRender={beforItem} beforeOpen={beforeOpen}
                                        beforeClose={beforeClose} select={menuclick}
                                    />
                                </div>
                                <div className="db-menu-style" style={{ display: "none" }}>
                                    < DropDownButtonComponent id="btnHelpMenu" cssClass={"db-dropdown-menu"} content="Help"
                                        items={this.dropDownDataSources.helpMenuItems} beforeItemRender={beforItem} beforeOpen={beforeOpen}
                                        beforeClose={beforeClose} select={menuclick}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='db-toolbar-editor'>
                            <div className='db-toolbar-container'>
                                <ToolbarComponent ref={toolbar => (this.toolbarEditor) = (toolbar as ToolbarComponent)} id='toolbarEditor' overflowMode='Scrollable' clicked={tooledit}>
                                    <ItemsDirective>
                                        <ItemDirective prefixIcon="sf-icon-Undo tb-icons" tooltipText="Undo" cssClass="tb-item-start tb-item-undo" />
                                        <ItemDirective prefixIcon="sf-icon-Redo tb-icons" tooltipText="Redo" cssClass="tb-item-end tb-item-redo" />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective prefixIcon="sf-icon-ZoomOut tb-icons" tooltipText="Zoom Out(Ctrl + -)" cssClass="tb-item-start" />
                                        <ItemDirective cssClass="tb-item-end tb-zoom-dropdown-btn" template={zoomTemplate} />
                                        <ItemDirective prefixIcon="sf-icon-ZoomIn tb-icons" tooltipText="Zoom In(Ctrl + +)" cssClass="tb-item-end" />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective prefixIcon="sf-icon-Pan tb-icons" tooltipText="Pan Tool" cssClass="tb-item-start" />
                                        <ItemDirective prefixIcon="sf-icon-Selector tb-icons" tooltipText="Pointer" cssClass="tb-item-middle tb-item-selected" />
                                        <ItemDirective tooltipText="Draw Shapes" cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable" template={drawShapeTemplate} />
                                        <ItemDirective tooltipText="Draw Connectors" cssClass="tb-item-middle tb-drawtools-dropdown-btn tb-custom-diagram-disable" template={drawConnectorTemplate} />
                                        <ItemDirective prefixIcon="sf-icon-TextInput tb-icons" tooltipText="Text Tool" cssClass="tb-item-end tb-custom-diagram-disable" />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective prefixIcon="sf-icon-ColorPickers tb-icons" cssClass="tb-item-start tb-item-fill" tooltipText="Fill Color" />
                                        <ItemDirective prefixIcon="sf-icon-Pickers tb-icons" tooltipText="Border Color" cssClass="tb-item-end tb-item-stroke" />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective prefixIcon="sf-icon-Group tb-icons" tooltipText="Group" cssClass="tb-item-start tb-item-align-category" />
                                        <ItemDirective prefixIcon="sf-icon-Ungroup tb-icons" tooltipText="Ungroup" cssClass="tb-item-end tb-item-ungroup" />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective prefixIcon="sf-icon-Lock tb-icons" tooltipText="Lock" cssClass="tb-item-start tb-item-lock-category" />
                                        <ItemDirective prefixIcon="sf-icon-Delete tb-icons" tooltipText="Delete" cssClass="tb-item-end tb-item-lock-category" />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective prefixIcon="sf-icon-Layers tb-icons" tooltipText="Show Layers" cssClass="tb-item-start tb-custom-diagram-disable" />
                                        <ItemDirective prefixIcon="db-theme-svg tb-icons" tooltipText="Themes" cssClass="tb-item-end tb-custom-diagram-disable" />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective tooltipText="Order" cssClass="tb-item-end tb-item-order tb-dropdown-btn-icon" template={order} />
                                        <ItemDirective type="Separator" />
                                        <ItemDirective prefixIcon="sf-icon-AlignLeft tb-icons" tooltipText="Align Left" cssClass="tb-item-start tb-item-align-category" />
                                        <ItemDirective prefixIcon="sf-icon-AlignHorizontally tb-icons" tooltipText="Align Center" cssClass="tb-item-middle  tb-item-align-category" />
                                        <ItemDirective prefixIcon="sf-icon-AlignRight tb-icons" tooltipText="Align Right" cssClass="tb-item-middle tb-item-align-category" />
                                        <ItemDirective prefixIcon="sf-icon-AilgnTop tb-icons" tooltipText="Align Top" cssClass="tb-item-middle tb-item-align-category" />
                                        <ItemDirective prefixIcon="sf-icon-AlignVertically tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle tb-item-align-category" />
                                        <ItemDirective prefixIcon="sf-icon-AlignBottom tb-icons" tooltipText="Align Bottom" cssClass="tb-item-middle tb-item-align-category" />
                                        <ItemDirective prefixIcon="sf-icon-DistributeHorizontal tb-icons" tooltipText="Distribute Objects Vertically" cssClass="tb-item-middle tb-item-space-category" />
                                        <ItemDirective prefixIcon="sf-icon-DistributeVertical tb-icons" tooltipText="Distribute Objects Horizontally" cssClass="tb-item-end tb-item-space-category" />
                                    </ItemsDirective>
                                </ToolbarComponent>
                            </div>
                            <div className="db-toolbar-hide-btn">
                                <ButtonComponent id="btnHideToolbar" iconCss='sf-icon-Collapse tb-icons' />
                            </div>
                        </div>
                    </div>
                    <div className='row content'>
                        <div className='sidebar show-overview'>
                            <div className="db-palette-parent">
                                <SymbolPaletteComponent ref={symbolpalette => (this.symbolpalette) = (symbolpalette as SymbolPaletteComponent)} id="symbolpalette" width="100%" height="100%" symbolHeight={50} symbolWidth={50}
                                    expandMode={this.palettes.expandMode} palettes={this.palettes.palettes} enableSearch={this.palettes.enableSearch}
                                    symbolPreview={this.palettes.symbolPreview} symbolMargin={this.palettes.symbolMargin} getSymbolInfo={this.palettes.getSymbolInfo}
                                    getNodeDefaults={this.palettes.setPaletteNodeDefaults}
                                />
                            </div>
                            <div className="db-overview-parent">
                                <div id="overview" />
                            </div>
                            <div id="moreShapesDiv" className="db-palette-more-shapes">
                                <div id='overviewspan' className="db-overview">
                                    <span />
                                </div>
                                <div className="db-palette-more-shapes-text" onClick={moreShapes}>More Shapes </div>
                            </div>
                        </div>
                        <div className='main-content' role='main'>
                            <div className="db-diagram-container">
                                <div id="diagramContainerDiv" className='db-current-diagram-container'>
                                    <DiagramComponent ref={diagram => ((this.diagram as DiagramComponent) = diagram as DiagramComponent)} id="diagram" width={"100%"} height={"100%"}
                                        snapSettings={this.snapSettings} pageSettings={this.pageSettings} scrollSettings={this.scrollSettings}
                                        selectedItems={this.selectedItems} getNodeDefaults={nodeDefault} getConnectorDefaults={connectordefault}
                                        commandManager={this.commandManager} backgroundColor="transparent"
                                        contextMenuSettings={this.contextMenuSettings}
                                        selectionChange={this.diagramEvents.selectionChange.bind(this.diagramEvents)}
                                        positionChange={this.diagramEvents.nodePositionChange.bind(this.diagramEvents)}
                                        sizeChange={this.diagramEvents.nodeSizeChange.bind(this.diagramEvents)} rotateChange={this.diagramEvents.nodeRotationChange.bind(this.diagramEvents)}
                                        contextMenuOpen={contextMenuchange} contextMenuClick={this.diagramEvents.diagramContextMenuClick.bind(this.diagramEvents)}
                                        dragEnter={this.diagramEvents.dragEnter.bind(this.diagramEvents)} historyChange={this.diagramEvents.historyChange.bind(this.diagramEvents)} scrollChange={this.diagramEvents.scrollChange.bind(this.diagramEvents)}
                                        collectionChange={collectionChange}
                                        drop={dropElement}
                                        getCustomTool={this.getCustomTool}
                                        textEdit={this.diagramEvents.textEdit.bind(this.diagramEvents)}
                                    />
                                </div>
                                <div className="db-more-diagram-options-container">
                                    <div id="pageOptionList" />
                                </div>
                            </div>
                            <div className='db-property-editor-container' style={{ overflow: "auto" }}>
                                <div id="generalDiagramContainer" className="db-general-diagram-prop-container">
                                    <div id='diagramPropertyContainer' className="db-diagram-prop-container">
                                        <div className="row db-prop-header-text">
                                            Page Settings
                                                </div>
                                        <div className="row db-prop-row">
                                            <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} dataSource={this.dropDownDataSources.paperList}
                                                change={this.diagramPropertyBinding.paperListChange.bind(this.diagramPropertyBinding)}
                                                fields={this.dropdownListFields} value={this.selectedItem.pageSettings.paperSize}
                                            />
                                        </div>
                                        <div className="row db-prop-row" id="pageOrientation">
                                            <div className="col-xs-3 db-prop-col-style" style={{ marginRight: "8px", width: "30%" }}>
                                                <RadioButtonComponent id="pagePortrait" label="Portrait" name="pageSettings"
                                                    checked={this.selectedItem.pageSettings.isPortrait} change={this.diagramPropertyBinding.pageOrientationChange.bind(this.diagramPropertyBinding)} />
                                            </div>
                                            <div className="col-xs-3 db-prop-col-style">
                                                <RadioButtonComponent id="pageLandscape" label="Landscape" name="pageSettings"
                                                    change={this.diagramPropertyBinding.pageOrientationChange.bind(this.diagramPropertyBinding)} checked={this.selectedItem.pageSettings.isLandscape} />
                                            </div>
                                        </div>
                                        <div className="row db-prop-row" id='pageDimension' style={{ display: "none" }}>
                                            <div className="col-xs-6 db-col-left">
                                                <div className="db-text-container">
                                                    <div className="db-text">
                                                        <span>W</span>
                                                    </div>
                                                    <div className="db-text-input">
                                                        <NumericTextBoxComponent id="pageWidth" min={100} format={"n0"} value={this.selectedItem.pageSettings.pageWidth}
                                                            change={this.diagramPropertyBinding.pageDimensionChange.bind(this.diagramPropertyBinding)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-6 db-col-right">
                                                <div className="db-text-container">
                                                    <div className="db-text">
                                                        <span>H</span>
                                                    </div>
                                                    <div className="db-text-input">
                                                        <NumericTextBoxComponent id="pageHeight" min={100} format={"n0"}
                                                            value={this.selectedItem.pageSettings.pageHeight} change={this.diagramPropertyBinding.pageDimensionChange.bind(this.diagramPropertyBinding)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-6 db-col-left">
                                                <div className="db-color-container">
                                                    <div className="db-color-input">
                                                        <ColorPickerComponent ref={colorPicker => (this.colorPicker as ColorPickerComponent) = (colorPicker as ColorPickerComponent)} mode="Palette" value={this.selectedItem.pageSettings.backgroundColor}
                                                            change={this.diagramPropertyBinding.pageBackgroundChange1.bind(this.diagramPropertyBinding)} />
                                                    </div>
                                                    <div className="db-color-btn">
                                                        <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <CheckBoxComponent id='showPageBreaks' label="Page Breaks" checked={this.selectedItem.pageSettings.pageBreaks}
                                                change={this.diagramPropertyBinding.pageBreaksChange.bind(this.diagramPropertyBinding)} />
                                        </div>
                                    </div>
                                    <div id='nodePropertyContainer' className="db-node-prop-container" style={{ display: "none" }}>
                                        <div className="db-node-behaviour-prop">
                                            <div className="row db-prop-header-text">
                                                Dimensions
                                                </div>
                                            <div className="row db-prop-row">
                                                <div className="col-xs-6 db-col-left">
                                                    <div className="db-text-container">
                                                        <div className="db-text">
                                                            <span>X</span>
                                                        </div>
                                                        <div className="db-text-input">
                                                            <NumericTextBoxComponent ref={nodeOffsetX => ((this.nodeOffsetX as NumericTextBoxComponent) = nodeOffsetX as NumericTextBoxComponent)} id="nodeOffsetX" format="n0"
                                                                // value={this.selectedItem.nodeProperties.offsetX} 
                                                                change={offsetChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 db-col-right">
                                                    <div className="db-text-container">
                                                        <div className="db-text">
                                                            <span>Y</span>
                                                        </div>
                                                        <div className="db-text-input">
                                                            <NumericTextBoxComponent ref={nodeOffsetY => ((this.nodeOffsetY as NumericTextBoxComponent) = nodeOffsetY as NumericTextBoxComponent)} id="nodeOffsetY" format="n0"
                                                                // value={this.selectedItem.nodeProperties.offsetY} 
                                                                change={offsetYchnage} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row db-prop-row">
                                                <div className="col-xs-6 db-col-left">
                                                    <div className="db-text-container">
                                                        <div className="db-text">
                                                            <span>W</span>
                                                        </div>
                                                        <div className="db-text-input">
                                                            <NumericTextBoxComponent ref={width => ((this.width as NumericTextBoxComponent) = width as NumericTextBoxComponent)} id="nodeWidth" min={1} format="n0"
                                                                // value={this.selectedItem.nodeProperties.width}
                                                                change={nodeWidthChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 db-col-right">
                                                    <div className="db-text-container">
                                                        <div className="db-text">
                                                            <span>H</span>
                                                        </div>
                                                        <div className="db-text-input">
                                                            <NumericTextBoxComponent ref={height => ((this.height as NumericTextBoxComponent) = height as NumericTextBoxComponent)} id="nodeHeight" min={1} format="n0"
                                                                // value={this.selectedItem.nodeProperties.height} 
                                                                change={nodeHeightChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row db-prop-row">
                                                <div className="col-xs-6 db-col-left">
                                                    <CheckBoxComponent ref={aspectRatio => ((this.aspectRatio as CheckBoxComponent) = aspectRatio as CheckBoxComponent)}
                                                        id='aspectRatio' label="Aspect Ratio" checked={this.selectedItem.nodeProperties.aspectRatio} change={aspectRatioValue} />
                                                </div>
                                            </div>
                                            <div className="row db-prop-row">
                                                <div className="col-xs-6 db-col-left">
                                                    <span className="db-prop-text-style">Rotate</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 db-col-left">
                                                    <div className="db-text-container">
                                                        <div className="db-text">
                                                            <ButtonComponent iconCss='sf-icon-Rotate1 tb-icons' />
                                                        </div>
                                                        <div className="db-text-input">
                                                            <NumericTextBoxComponent ref={rotate => ((this.rotate as NumericTextBoxComponent) = rotate as NumericTextBoxComponent)} id="nodeRotateAngle" format="n0"
                                                                // value={this.selectedItem.nodeProperties.rotateAngle}
                                                                change={rotationChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="db-prop-separator" />
                                            <div className="row db-prop-header-text">
                                                Insert</div>
                                            <div className="row db-prop-row">
                                                <div className="col-xs-6 db-col-left">
                                                    <ToolbarComponent ref={nodeInsert => ((this.nodeInsert as ToolbarComponent) = nodeInsert as ToolbarComponent)} id='toolbarNodeInsert' overflowMode='Scrollable'
                                                        clicked={toolbarNodeInsert} >
                                                        <ItemsDirective>
                                                            <ItemDirective prefixIcon="sf-icon-InsertLink tb-icons" tooltipText="Insert Link" cssClass="tb-item-start" />
                                                            <ItemDirective prefixIcon="sf-icon-InsertImage tb-icons" tooltipText="Insert Image" cssClass="tb-item-end" />
                                                        </ItemsDirective>
                                                    </ToolbarComponent>
                                                </div>
                                            </div>
                                            <div className="db-prop-separator" />
                                        </div>
                                        <div id='nodeStyleProperties' className="db-node-style-prop">
                                            <div className="row db-background-style">
                                                <div className="row db-prop-header-text">
                                                    Background and Border Styles
                                                                </div>
                                                <div className="row db-prop-row">
                                                    <div className="col-xs-6 db-col-left">
                                                        <div className="db-color-container">
                                                            <div className="db-color-input">
                                                                <ColorPickerComponent ref={fillColor => ((this.fillColor as ColorPickerComponent) = fillColor as ColorPickerComponent)} type="color" mode="Palette" value={this.selectedItem.nodeProperties.fillColor}
                                                                    change={nodeFillColor} id="nodeFillColor" />
                                                            </div>
                                                            <div className="db-color-btn">
                                                                <ButtonComponent iconCss='sf-icon-ColorPickers tb-icons' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id='gradientStyle' className="row db-prop-row db-gradient-style-hide">
                                                    <div className="col-xs-4 db-col-left">
                                                        <CheckBoxComponent ref={gradient => ((this.gradient as CheckBoxComponent) = gradient as CheckBoxComponent)} id='gradient' label="Gradient" checked={this.selectedItem.nodeProperties.gradient}
                                                            change={gradientChange} />
                                                    </div>
                                                    <div className="col-xs-4 db-col-center">
                                                        <DropDownListComponent ref={gradientDirection => (this.gradientDirection as DropDownListComponent) = (gradientDirection as DropDownListComponent)}
                                                            value={this.selectedItem.nodeProperties.gradientDirection} dataSource={this.dropDownDataSources.gradientDirections}
                                                            fields={this.dropdownListFields} popupHeight={"200px"} change={gradientDirectionChange} />
                                                    </div>
                                                    <div className="col-xs-4 db-col-right">
                                                        <div className="db-color-container">
                                                            <div className="db-color-input">
                                                                <ColorPickerComponent type="color" mode="Palette" ref={gradientColor => (this.gradientColor as ColorPickerComponent) = (gradientColor as ColorPickerComponent)}
                                                                    value={this.selectedItem.nodeProperties.gradientColor} change={gradientColorChange} />
                                                            </div>
                                                            <div className="db-color-btn">
                                                                <ButtonComponent iconCss='sf-icon-ColorPickers tb-icons' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row db-border-style">
                                                <div className="row db-prop-header-text db-border-style-header">
                                                    Border/Line Styles
                                                                </div>
                                                <div className="row db-prop-row">
                                                    <div className="col-xs-4 db-col-right">
                                                        <span className="db-prop-text-style">Stroke Color</span>
                                                    </div>
                                                    <div className="col-xs-4 db-col-center">
                                                        <span className="db-prop-text-style">Stroke Style</span>
                                                    </div>
                                                    <div className="col-xs-4 db-col-left">
                                                        <span className="db-prop-text-style">Stroke Width</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xs-4 db-col-left">
                                                        <div className="db-color-container">
                                                            <div className="db-color-input">
                                                                <ColorPickerComponent id="nodeStrokeColor" ref={strokeColor => (this.strokeColor as ColorPickerComponent) = (strokeColor as ColorPickerComponent)}
                                                                    type="color" mode="Palette" value={this.selectedItem.nodeProperties.strokeColor} change={strokeColorChange} />
                                                            </div>
                                                            <div className="db-color-btn">
                                                                <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xs-4 db-col-center">
                                                        <DropDownListComponent ref={nodeBorder => (this.nodeBorder as DropDownListComponent) = (nodeBorder as DropDownListComponent)} id="nodeBorderStyle" value={this.selectedItem.nodeProperties.strokeStyle}
                                                            dataSource={this.dropDownDataSources.borderStyles} popupWidth={"160px"} fields={this.dropdownListFields} change={nodeBorderChange} itemTemplate={this.nodeBorderItemTemplate} valueTemplate={this.nodeBorderValueTemplate} />
                                                    </div>
                                                    <div className="col-xs-4 db-col-right">
                                                        <NumericTextBoxComponent ref={strokeWidth => (this.strokeWidth as NumericTextBoxComponent) = (strokeWidth as NumericTextBoxComponent)}
                                                            id="nodeStrokeWidth" min={0} step={0.5} value={this.selectedItem.nodeProperties.strokeWidth} change={strokeWidthChange} />
                                                    </div>
                                                </div>
                                                <div className="row db-prop-row">
                                                    <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                                                        <span className="db-prop-text-style">Opacity</span>
                                                    </div>
                                                    <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                                                        <SliderComponent ref={opacity => (this.opacity as SliderComponent) = (opacity as SliderComponent)}
                                                            value={this.selectedItem.nodeProperties.opacity} min={0} max={100} step={10} type='MinRange' change={opacityChange} />
                                                    </div>
                                                    <div className="col-xs-2 db-col-right">
                                                        <input id='nodeOpacitySliderText' type="text" value={this.selectedItem.nodeProperties.opacityText} readOnly={true} className="db-readonly-input" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id='connectorPropertyContainer' className="db-connector-prop-container" style={{ display: "none" }}>
                                        <div className="row db-prop-header-text">
                                            Connector Properties
                                                    </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-6 db-col-left db-prop-text-style">
                                                <span className="db-prop-text-style">Connector Type</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-6 db-col-left">
                                                <DropDownListComponent ref={lineType => (this.lineType as DropDownListComponent) = (lineType as DropDownListComponent)}
                                                    value={this.selectedItem.connectorProperties.lineType} dataSource={this.dropDownDataSources.lineTypes}
                                                    fields={this.dropdownListFields} change={lineTypeChange} />
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-6 db-col-left">
                                                <div className="db-color-container">
                                                    <div className="db-color-input">
                                                        <ColorPickerComponent ref={lineColor => (this.lineColor as ColorPickerComponent) = (lineColor as ColorPickerComponent)} mode="Palette" type="color"
                                                            id="lineColor" value={this.selectedItem.connectorProperties.lineColor} change={lineColorChange} />
                                                    </div>
                                                    <div className="db-color-btn">
                                                        <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-8 db-col-left db-prop-text-style">
                                                <span className="db-prop-text-style">Stroke Style</span>
                                            </div>
                                            <div className="col-xs-4 db-col-right db-prop-text-style">
                                                <span className="db-prop-text-style">Thickness</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-8 db-col-left">
                                                <DropDownListComponent ref={lineStyle => (this.lineStyle as DropDownListComponent) = (lineStyle as DropDownListComponent)} id="lineStyle" value={this.selectedItem.connectorProperties.lineStyle}
                                                    dataSource={this.dropDownDataSources.borderStyles} fields={this.dropdownListFields} itemTemplate={this.lineItemTemplate} valueTemplate={this.lineValueTemplate} change={lineStyleChange} />
                                            </div>
                                            <div className="col-xs-4 db-col-right">
                                                <NumericTextBoxComponent min={0.5} step={0.5} ref={lineWidth => (this.lineWidth as NumericTextBoxComponent) = (lineWidth as NumericTextBoxComponent)}
                                                    value={this.selectedItem.connectorProperties.lineWidth} change={lineWidthChange} />
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-8 db-col-left db-prop-text-style">
                                                <span className="db-prop-text-style">Start Arrow</span>
                                            </div>
                                            <div className="col-xs-4 db-col-right db-prop-text-style">
                                                <span className="db-prop-text-style">Size</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-8 db-col-left">
                                                <DropDownListComponent ref={sourceType => (this.sourceType as DropDownListComponent) = (sourceType as DropDownListComponent)}
                                                    value={this.selectedItem.connectorProperties.sourceType} dataSource={this.dropDownDataSources.decoratorList}
                                                    fields={this.dropdownListFields} change={sourceTypeChange} />
                                            </div>
                                            <div className="col-xs-4 db-col-right">
                                                <NumericTextBoxComponent ref={sourceSize => (this.sourceSize as NumericTextBoxComponent) = (sourceSize as NumericTextBoxComponent)} min={1} step={1} value={this.selectedItem.connectorProperties.sourceSize}
                                                    change={sourceSizeChange} />
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-8 db-col-left db-prop-text-style">
                                                <span className="db-prop-text-style">End Arrow</span>
                                            </div>
                                            <div className="col-xs-4 db-col-right db-prop-text-style">
                                                <span className="db-prop-text-style">Size</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-8 db-col-left">
                                                <DropDownListComponent ref={targetType => (this.targetType as DropDownListComponent) = (targetType as DropDownListComponent)}
                                                    value={this.selectedItem.connectorProperties.targetType} dataSource={this.dropDownDataSources.decoratorList}
                                                    fields={this.dropdownListFields} change={targetTypeChange} />
                                            </div>
                                            <div className="col-xs-4 db-col-right">
                                                <NumericTextBoxComponent ref={targetSize => (this.targetSize as NumericTextBoxComponent) = (targetSize as NumericTextBoxComponent)} min={1} step={1} value={this.selectedItem.connectorProperties.targetSize}
                                                    change={targetSizeChange} />
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-8 db-col-left" style={{ marginTop: "5px" }}>
                                                <CheckBoxComponent ref={bridge => (this.bridge as CheckBoxComponent) = (bridge as CheckBoxComponent)} id='lineJump'
                                                    label="Bridging" checked={this.selectedItem.connectorProperties.lineJump} change={bridgeChange} />
                                            </div>
                                            <div className="col-xs-4 db-col-right" id="lineJumpSizeDiv" style={{ display: "none" }}>
                                                <NumericTextBoxComponent ref={bridgeSize => (this.bridgeSize as NumericTextBoxComponent) = (bridgeSize as NumericTextBoxComponent)}
                                                    min={1} step={1} value={this.selectedItem.connectorProperties.lineJumpSize} change={bridgeSizeChange} />
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                                                <span className="db-prop-text-style">Opacity</span>
                                            </div>
                                            <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                                                <SliderComponent id='default' ref={connectorOpacity => (this.connectorOpacity as SliderComponent) = (connectorOpacity as SliderComponent)}
                                                    value={this.selectedItem.connectorProperties.opacity} min={0} max={100} step={10} type='MinRange' change={connectorOpacityChange} />
                                            </div>
                                            <div className="col-xs-2 db-col-right">
                                                <input id='connectorOpacitySliderText' type="text" readOnly={true} className="db-readonly-input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div id='textPropertyContainer' className="db-text-prop-container" style={{ display: "none" }}>
                                        <div className="db-prop-separator" />
                                        <div className="row db-prop-header-text">
                                            Text
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-8 db-col-left">
                                                <DropDownListComponent ref={fontFamily => (this.fontFamily as DropDownListComponent) = (fontFamily as DropDownListComponent)} dataSource={this.dropDownDataSources.fontFamilyList}
                                                    fields={this.dropdownListFields} change={fontFamilyChange} />
                                            </div>
                                            <div className="col-xs-4 db-col-right">
                                                <NumericTextBoxComponent min={1} ref={fontSize => (this.fontSize as NumericTextBoxComponent) = (fontSize as NumericTextBoxComponent)} step={1} value={this.selectedItem.textProperties.fontSize} change={fontSizeChange} />
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-6 db-col-left" id="textPositionDiv">
                                                <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} dataSource={this.selectedItem.textProperties.textPositionDataSource} index={4}
                                                    fields={this.dropdownListFields} change={this.diagramPropertyBinding.textPositionChange.bind(this.diagramPropertyBinding)} />
                                            </div>
                                            <div className="col-xs-6 db-col-right" id="textColorDiv">
                                                <div className="db-color-container">
                                                    <div className="db-color-input">
                                                        <ColorPickerComponent ref={fontColor => (this.fontColor as ColorPickerComponent) = (fontColor as ColorPickerComponent)} mode="Palette" type="color" value={this.selectedItem.textProperties.fontColor} change={fontColorChange} />
                                                    </div>
                                                    <div className="db-color-btn">
                                                        <ButtonComponent iconCss='sf-icon-ColorPickers tb-icons' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-6 db-col-left">
                                                <ToolbarComponent id='toolbarTextStyle' overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextStyleChange.bind(this.diagramPropertyBinding)}>
                                                    <ItemsDirective>
                                                        <ItemDirective prefixIcon="sf-icon-Bold tb-icons" tooltipText="Bold" cssClass="tb-item-start" />
                                                        <ItemDirective prefixIcon="sf-icon-Italic tb-icons" tooltipText="Italic" cssClass="tb-item-middle" />
                                                        <ItemDirective prefixIcon="sf-icon-Underline tb-icons" tooltipText="Underline" cssClass="tb-item-end" />
                                                    </ItemsDirective>
                                                </ToolbarComponent>
                                            </div>
                                            <div className="col-xs-6 db-col-right">
                                                <ToolbarComponent id='toolbarTextSubAlignment' overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextSubAlignChange.bind(this.diagramPropertyBinding)}>
                                                    <ItemsDirective>
                                                        <ItemDirective prefixIcon="sf-icon-ParaAlignLeft tb-icons" tooltipText="Align Text Left" cssClass="tb-item-start" />
                                                        <ItemDirective prefixIcon="sf-icon-ParaAlignCenter tb-icons" tooltipText="Align Text Center" cssClass="tb-item-middle" />
                                                        <ItemDirective prefixIcon="sf-icon-ParaAlignRight tb-icons" tooltipText="Align Text Right" cssClass="tb-item-end" />
                                                    </ItemsDirective>
                                                </ToolbarComponent>
                                            </div>
                                        </div>
                                        <div className="row db-prop-row" id='toolbarTextAlignmentDiv'>
                                            <ToolbarComponent id='toolbarTextAlignment' ref={toolbarTextAlignment => (toolbarTextAlignment as ToolbarComponent) = (toolbarTextAlignment as ToolbarComponent)} overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextAlignChange.bind(this.diagramPropertyBinding)} >
                                            <ItemsDirective>
                                                <ItemDirective prefixIcon="sf-icon-TextLeft tb-icons" tooltipText="Align Right" cssClass="tb-item-start" />
                                                <ItemDirective prefixIcon="sf-icon-TextVerticalCenter tb-icons" tooltipText="Align Center" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextRight tb-icons" tooltipText="Align Left" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextTop tb-icons" tooltipText="Align Bottom" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextHorizontalCenter tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextBottom tb-icons" tooltipText="Align Top" cssClass="tb-item-end" />
                                            </ItemsDirective>
                                            </ToolbarComponent>
                                        </div>
                                        <div className="row db-prop-row">
                                            <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                                                <span className="db-prop-text-style">Opacity</span>
                                            </div>
                                            <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                                                <SliderComponent ref={fontOpacity => (this.fontOpacity as SliderComponent) = (fontOpacity as SliderComponent)} value={this.selectedItem.textProperties.opacity} min={0} max={100} step={10} type='MinRange' change={fontOpacityChange} />
                                            </div>
                                            <div className="col-xs-2 db-col-right">
                                                <input id='textOpacityText' type="text" value={this.selectedItem.textProperties.opacityText} readOnly={true} className="db-readonly-input" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id='mindMapContainer' className="db-mindmap-prop-container">
                                    <div className="row db-prop-header-text">
                                        MindMap Pattern
                                    </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div onClick={this.mindmapPropertyBinding.mindmapPatternChange.bind(this.mindmapPropertyBinding)} className="mindmap-pattern-style mindmap-pattern1" />
                                        </div>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div onClick={this.mindmapPropertyBinding.mindmapPatternChange.bind(this.mindmapPropertyBinding)} className="mindmap-pattern-style mindmap-pattern2" />
                                        </div>
                                    </div>
                                    <div className="row db-prop-row" style={{ marginTop: "5px" }}>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div onClick={this.mindmapPropertyBinding.mindmapPatternChange.bind(this.mindmapPropertyBinding)} className="mindmap-pattern-style mindmap-pattern3" />
                                        </div>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div onClick={this.mindmapPropertyBinding.mindmapPatternChange.bind(this.mindmapPropertyBinding)} className="mindmap-pattern-style mindmap-pattern4" />
                                        </div>
                                    </div>
                                    <div className="db-prop-separator" />
                                    <div className="row db-prop-header-text">
                                        MindMap Levels Styles
                                                </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-6 db-col-left">
                                            <DropDownListComponent ref={mindMapLevel => (this.mindMapLevel as DropDownListComponent) = (mindMapLevel as DropDownListComponent)}
                                                id="mindMapLevels" value={this.selectedItem.mindmapSettings.levelType} dataSource={this.dropDownDataSources.mindmapLevels}
                                                fields={this.dropdownListFields} change={mindMapLavelChange} />
                                        </div>
                                    </div>
                                    <div id='mindMapFill' className="row db-prop-row">
                                        <div className="col-xs-6 db-col-left">
                                            <div className="db-color-container">
                                                <div className="db-color-input">
                                                    <ColorPickerComponent ref={mindmapFill => (this.mindmapFill as ColorPickerComponent) = (mindmapFill as ColorPickerComponent)}
                                                        mode="Palette" id='mindmapFill' type="color" value={this.selectedItem.mindmapSettings.fill} change={mindmapFillColor} />
                                                </div>
                                                <div className="db-color-btn">
                                                    <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-4 db-col-left">
                                            <div className="db-color-container">
                                                <div className="db-color-input">
                                                    <ColorPickerComponent ref={mindMapStroke => (this.mindMapStroke as ColorPickerComponent) = (mindMapStroke as ColorPickerComponent)} id='mindmapStroke' mode="Palette" value={this.selectedItem.mindmapSettings.stroke}
                                                        type="color" change={mindMapSrtokeChange} />
                                                </div>
                                                <div className="db-color-btn">
                                                    <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-4 db-col-center">
                                            <DropDownListComponent ref={mindmapStrokeStyle => (this.mindmapStrokeStyle as DropDownListComponent) = (mindmapStrokeStyle as DropDownListComponent)} value={this.selectedItem.mindmapSettings.strokeStyle} dataSource={this.dropDownDataSources.borderStyles}
                                                fields={this.dropdownListFields} itemTemplate={this.mindmapItemTemplate} valueTemplate={this.mindmapValueTemplate}  change={mindmapStrokeStyleChange} />
                                        </div>
                                        <div className="col-xs-4 db-col-right">
                                            <NumericTextBoxComponent ref={mindmapStrokeWidth => (this.mindmapStrokeWidth as NumericTextBoxComponent) = (mindmapStrokeWidth as NumericTextBoxComponent)}
                                                id="mindmapStrokeWidth" min={0.5} step={0.5} value={this.selectedItem.mindmapSettings.strokeWidth} change={mindmapStrokeWidthChange} />
                                        </div>
                                    </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                                            <span className="db-prop-text-style">Opacity</span>
                                        </div>
                                        <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                                            <SliderComponent ref={mindmapOpacity => (this.mindmapOpacity as SliderComponent) = (mindmapOpacity as SliderComponent)} value={this.selectedItem.mindmapSettings.opacity} min={0} max={100} step={10} type='MinRange' change={mindmapOpacityChange} />
                                        </div>
                                        <div className="col-xs-2 db-col-right">
                                            <input type="text" id="mindmapOpacityText" value={this.selectedItem.mindmapSettings.opacityText} readOnly={true} className="db-readonly-input" />
                                        </div>
                                    </div><div style={{ marginTop: "10px", marginBottom: "15px" }} />
                                    <div className="row db-prop-header-text">
                                        Text Style
                                                </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-8 db-col-left">
                                            <DropDownListComponent ref={dropdown => (this.ddlTextPosition as DropDownListComponent) = (dropdown as DropDownListComponent)} dataSource={this.dropDownDataSources.fontFamilyList} value={this.selectedItem.mindmapSettings.fontFamily}
                                                fields={this.dropdownListFields} change={mindmapFontfamilyText} />
                                        </div>
                                        <div className="col-xs-4 db-col-right">
                                            <NumericTextBoxComponent ref={mindmapFontSize => (this.mindmapFontSize as NumericTextBoxComponent) = (mindmapFontSize as NumericTextBoxComponent)} min={1} step={1} value={this.selectedItem.mindmapSettings.fontSize} change={mindmapFontSizeChange} />
                                        </div>
                                    </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-6 db-col-left">
                                            <ToolbarComponent overflowMode='Scrollable' clicked={this.mindmapPropertyBinding.mindmapTextStyleChange.bind(this.mindmapPropertyBinding)}>
                                                <ItemsDirective>
                                                    <ItemDirective prefixIcon="sf-icon-Bold tb-icons" tooltipText="Bold" cssClass="tb-item-start" />
                                                    <ItemDirective prefixIcon="sf-icon-Italic tb-icons" tooltipText="Italic" cssClass="tb-item-middle" />
                                                    <ItemDirective prefixIcon="sf-icon-Underline tb-icons" tooltipText="Underline" cssClass="tb-item-end" />
                                                </ItemsDirective>
                                            </ToolbarComponent>
                                        </div>
                                        <div className="col-xs-6 db-col-right" id="textColorDiv">
                                            <div className="db-color-container">
                                                <div className="db-color-input">
                                                    <ColorPickerComponent id='mindmapTextColor' ref={mindmapTextColor => (this.mindmapTextColor as ColorPickerComponent) = (mindmapTextColor as ColorPickerComponent)} mode="Palette" type="color" value={this.selectedItem.mindmapSettings.fontColor} change={mindmapFontColorChange} />
                                                </div>
                                                <div className="db-color-btn">
                                                    <ButtonComponent iconCss='sf-icon-ColorPickers tb-icons' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                                            <span className="db-prop-text-style">Opacity</span>
                                        </div>
                                        <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                                            <SliderComponent ref={mindmapOpacityText => (this.mindmapOpacityText as SliderComponent) = (mindmapOpacityText as SliderComponent)} value={this.selectedItem.mindmapSettings.textOpacity} min={0} max={100} step={10} type='MinRange' change={mindmapFontOpacityChange} />
                                        </div>
                                        <div className="col-xs-2 db-col-right">
                                            <input id='mindmapOpacitySliderText' type="text" value={this.selectedItem.mindmapSettings.opacityText} readOnly={true} className="db-readonly-input" />
                                        </div>
                                    </div>
                                </div>

                                <div id='orgChartContainer' className="db-orgchart-prop-container">
                                    <div className="row db-prop-row db-prop-header-text">
                                        Import
                                            </div>
                                    <div className="row db-prop-row" style={{ height: "28px" }}>
                                        <ButtonComponent id="btnImportData" content="Import Data" cssClass="db-btn-primary" onClick= {this.btnImportClick} />
                                    </div>
                                    <div className="db-prop-separator" />
                                    <div className="row db-prop-header-text">
                                        OrgChart Settings
                                                    </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-6 db-col-left">
                                            <span className="db-prop-text-style">Horizontal Spacing</span>
                                        </div>
                                        <div className="col-xs-6 db-col-right">
                                            <span className="db-prop-text-style">Vertical Spacing</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 db-col-left">
                                            <NumericTextBoxComponent id="orgHorizontalSpacing" min={25} step={1} format="n0" value={50} change={this.orgChartPropertyBinding.orgChartSpacingChange.bind(this.orgChartPropertyBinding)} />
                                        </div>
                                        <div className="col-xs-6 db-col-right">
                                            <NumericTextBoxComponent id="orgVerticalSpacing" min={25} step={1} format="n0" value={50} change={this.orgChartPropertyBinding.orgChartSpacingChange.bind(this.orgChartPropertyBinding)} />
                                        </div>
                                    </div>
                                    <div className="row db-prop-row">
                                        <ToolbarComponent id='orgChartAlignment' overflowMode='Scrollable' clicked={this.orgChartPropertyBinding.orgChartAligmentChange.bind(this.orgChartPropertyBinding)}>
                                            <ItemsDirective>
                                                <ItemDirective prefixIcon="sf-icon-TextLeft tb-icons" tooltipText="Align Left" cssClass="tb-item-start" />
                                                <ItemDirective prefixIcon="sf-icon-TextHorizontalCenter tb-icons" tooltipText="Align Center" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextRight tb-icons" tooltipText="Align Right" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextTop tb-icons" tooltipText="Align Top" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextVerticalCenter tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle" />
                                                <ItemDirective prefixIcon="sf-icon-TextBottom tb-icons" tooltipText="Align Bottom" cssClass="tb-item-end" />
                                            </ItemsDirective>
                                        </ToolbarComponent>
                                    </div>
                                    <div className="db-prop-separator" />
                                    <div className="row db-prop-row db-prop-header-text">
                                        Orientation Styles
                                        </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div className="org-pattern-style org-pattern-1 vertical-alternate" onClick={this.orgChartPropertyBinding.layoutOrientationChange.bind(this.orgChartPropertyBinding)} />
                                        </div>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div className="org-pattern-style org-pattern-2 vertical-left" onClick={this.orgChartPropertyBinding.layoutOrientationChange.bind(this.orgChartPropertyBinding)} />
                                        </div>
                                    </div>
                                    <div className="row db-prop-row" style={{ marginTop: "5px" }}>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div className="org-pattern-style org-pattern-3 vertical-right" onClick={this.orgChartPropertyBinding.layoutOrientationChange.bind(this.orgChartPropertyBinding)} />
                                        </div>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div onClick={this.orgChartPropertyBinding.layoutOrientationChange.bind(this.orgChartPropertyBinding)} className="org-pattern-style org-pattern-4 horizontal-center" />
                                        </div>
                                    </div>
                                    <div className="row db-prop-row" style={{ marginTop: "5px" }}>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div onClick={this.orgChartPropertyBinding.layoutOrientationChange.bind(this.orgChartPropertyBinding)} className="org-pattern-style org-pattern-5 horizontal-right" />
                                        </div>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div onClick={this.orgChartPropertyBinding.layoutOrientationChange.bind(this.orgChartPropertyBinding)} className="org-pattern-style org-pattern-6 horizontal-left"/>
                                        </div>
                                    </div>
                                    <div className="db-prop-separator" />
                                    <div className="row db-prop-header-text">
                                        OrgChart Templates
                                        </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div id="orgPattern1" onClick={this.orgChartPropertyBinding.layoutPatternChange.bind(this.orgChartPropertyBinding)} className="org-pattern-style" />
                                        </div>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div id="orgPattern2" onClick={this.orgChartPropertyBinding.layoutPatternChange.bind(this.orgChartPropertyBinding)} className="org-pattern-style" />
                                        </div>
                                    </div>
                                    <div className="row db-prop-row">
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div id="orgPattern3" onClick={this.orgChartPropertyBinding.layoutPatternChange.bind(this.orgChartPropertyBinding)} className="org-pattern-style" />
                                        </div>
                                        <div className="col-xs-6 org-pattern-parent">
                                            <div id="orgPattern4" onClick={this.orgChartPropertyBinding.layoutPatternChange.bind(this.orgChartPropertyBinding)} className="org-pattern-style" />
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                </div>
                <DialogComponent ref={dialog => (this.exportDialog as DialogComponent) = (dialog as DialogComponent)} id="exportDialog" width={"400px"} header='Export Diagram' target={this.dlgTarget}
                    isModal={true} animationSettings={this.dialogAnimationSettings} buttons={this.exportingButtons} showCloseIcon= {true}
                    content={footTemplate} visible={this.dialogVisibility} />

                <DialogComponent id="printDialog" ref={dialog => (this.printDialog as DialogComponent) = (dialog as DialogComponent)} width={"335px"} header='Print Diagram' target={this.dlgTarget}
                    isModal={true} animationSettings={this.dialogAnimationSettings} buttons={this.printingButtons}
                    content={printTemplateChange} visible={this.dialogVisibility} />

                <DialogComponent id="fileUploadDialog" ref={dialog => (this.fileUploadDialog as DialogComponent) = (dialog as DialogComponent)} width={"500px"} height={"485px"} header='Upload File' target={this.dlgTarget}
                    isModal={true} animationSettings={this.dialogAnimationSettings} buttons={this.uploadButtons} showCloseIcon={true} allowDragging={true}
                    visible={this.dialogVisibility} content={fileTemplate} />

                <div id="diagramTemplateDiv" className="db-diagram-template-div" style={{ display: "none" }}>
                    <div className="db-diagram-template-image-div">
                        <div className="db-diagram-template-image" />
                    </div>
                    <div className="db-diagram-template-text">
                        <span id="diagramTemplateText" />
                    </div>
                </div>
                <div id="diagramTemplateDiv1" style={{ display: "none" }}>
                    <div className="row">
                        <div className="col-xs-3 temp-left-pane">
                            <div className="row db-diagram-template-parent-text flowdiagram-template">
                                <span>Flow Chart</span>
                            </div>
                            <div className="row db-diagram-template-parent-text mindmap-template">
                                <span>Mind Map</span>
                            </div>
                            <div className="row db-diagram-template-parent-text orgchart-template">
                                <span>Org Chart</span>
                            </div>
                        </div>
                        <div className="col-xs-9 diagramTemplates temp-right-pane" style={{ paddingLeft: "0px", paddingRight: "0px" }} />

                    </div>
                </div>
                <DialogComponent id="openTemplateDialog" ref={openTemplateDialog => (this.openTemplateDialog as DialogComponent) = (openTemplateDialog as DialogComponent)} width={"695px"} height="470px" header='Create New Diagram' target={this.dlgTarget}
                    isModal={true} animationSettings={this.dialogAnimationSettings} showCloseIcon={true} allowDragging={true} visible={this.dialogVisibility} />
                <DialogComponent id="saveDialog" ref={saveDialog => (this.saveDialog as DialogComponent) = (saveDialog as DialogComponent)} width={"335px"} header='Save Diagram' target={this.dlgTarget} isModal={true}
                    showCloseIcon={true} allowDragging={true} animationSettings={this.dialogAnimationSettings} visible={this.dialogVisibility} buttons={this.saveButtons} content={saveTemplate} />
                <DialogComponent id="moreShapesDialog" ref={moreShapesDialog => (this.moreShapesDialog as DialogComponent) = (moreShapesDialog as DialogComponent)} width={"695px"} height={"470px"} header='Shapes' target={this.dlgTarget} isModal={true} animationSettings={this.dialogAnimationSettings} showCloseIcon={true} allowDragging={true}
                    buttons={this.moreShapesButtons} visible={this.dialogVisibility} content={moreShapeTemplate} />

                <DialogComponent id="tooltipDialog" ref={tooltipDialog => (this.tooltipDialog as DialogComponent) = (tooltipDialog as DialogComponent)} width={"335px"} header='Edit Tooltip' target={this.dlgTarget} isModal={true} animationSettings={this.dialogAnimationSettings}
                    visible={this.dialogVisibility} showCloseIcon={true} content={this.tootipTemplate} buttons={this.tooltipButtons} />
                <DialogComponent id="hyperlinkDialog" ref={hyperlinkDialog => (this.hyperlinkDialog as DialogComponent) = (hyperlinkDialog as DialogComponent)} width={"400px"} header='Insert Link' target={this.dlgTarget} isModal={true}
                    visible={this.dialogVisibility} animationSettings={this.dialogAnimationSettings} showCloseIcon={true} buttons={this.hyperlinkButtons}
                    content={hyperLinkTemplate} />
                <div className="db-custom-prop-template" style={{ display: "none" }}>
                    <div className="row">
                        <div className="col-xs-6 db-col-left" style={{ width: "70%" }}>
                            <input className="txtPropertyName" type="text" placeholder="Enter Property Name" style={{ width: "100%", height: "27px" }} />
                        </div>
                        <div className="col-xs-6 db-col-right" style={{ width: "30%" }} >
                            <button className="db-custom-prop-button" style={{ width: "100%", textTransform: "none", boxShadow: "0 0 0 0 " }}>Add Property</button>
                        </div>
                    </div>
                </div>
                <div className="db-custom-prop-info-template" style={{ display: "none" }}>
                    <div className="row">
                        <div className="col-xs-6 db-col-left propertyNameDiv" />
                        <div className="col-xs-6 db-col-right propertyValueDiv">
                            <input type="text" className="propertyValue" style={{ height: "27px" }} />
                        </div>
                        <div className="propertyTooltipDiv">
                            <input type="checkbox" className="propertyCheckBox" />
                        </div>
                        <div className="propertyLabelDiv">
                            <button className="btnRemoveProperty" style={{ height: "20px", width: "27px" }} />
                        </div>
                    </div>
                </div>

                <div className="db-place-holder" style={{ display: "none" }}>
                    <div className="row">
                        <input type="checkbox" className="chkPlaceholders" />
                    </div>
                </div>
                <DialogComponent id="customPropertyDialog" width={"500px"} header='Additional Information' target={this.dlgTarget}
                    isModal={this.isModalDialog} animationSettings={this.dialogAnimationSettings} allowDragging={true} showCloseIcon={true}
                    visible={this.dialogVisibility} ref={customPropertyDialog => (this.customPropertyDialog as DialogComponent) = (customPropertyDialog as DialogComponent)} />

                <div className="db-layer-template" style={{ display: "none" }}>
                    <div className="row">
                        <div className="db-layer-content-name">
                            <span className="db-layer-name" />
                            <input type="text" className="db-layer-edit" />
                        </div>
                        <div className="db-layer-content-btn">
                            <button className="db-layer-lock" />
                        </div>
                        <div className="db-layer-content-btn">
                            <button className="db-layer-visible" />
                        </div>
                        <button className="db-layer-order-first" />
                    </div>
                    <div className="db-layer-content-btn">
                        <button className="db-layer-order-second" />

                    </div>
                </div>
                <DialogComponent id="layerDialog" ref={layerDialog => (this.layerDialog as DialogComponent) = (layerDialog as DialogComponent)} width={"300px"} height={"400px"} header='Layers' target={this.dlgTarget}
                    isModal={this.isModalDialog} animationSettings={this.dialogAnimationSettings} allowDragging={true}
                    visible={this.dialogVisibility} content={this.layerFooterTemplate} />

                <DialogComponent id="themeDialog" ref={themeDialog => (this.themeDialog as DialogComponent) = (themeDialog as DialogComponent)} width={"174px"} header='Themes' target={this.dlgTarget} isModal={this.isModalDialog}
                    animationSettings={this.dialogAnimationSettings} allowDragging={true} visible={this.dialogVisibility} showCloseIcon={true}
                    position={this.themesdialogPosition} created={themeDialogTemplate} content={this.themeTemplate} />

                <DialogComponent id="deleteConfirmationDialog" ref={deleteConfirmationDialog => (this.deleteConfirmationDialog as DialogComponent) = (deleteConfirmationDialog as DialogComponent)} width={"400px"} header='Delete Field' target={this.dlgTarget}
                    isModal={true} animationSettings={this.dialogAnimationSettings} visible={this.dialogVisibility} showCloseIcon={true}
                    buttons={this.deleteConfirmationButtons} content={this.deleteConformationTemplate} />
            </div >
        );

    }
    private sendToBack(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.sendToBack();
    }
    private cutObjects(): void {
        this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
        this.selectedItem.selectedDiagram.cut();
    }

    private copyObjects(): void {
        this.selectedItem.pasteData = CommonKeyboardCommands.cloneSelectedItems();
    }

    private pasteObjects(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if (this.selectedItem.pasteData.length > 0) {
            diagram.paste(this.selectedItem.pasteData);
        }
    }

    private bringToFront(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.bringToFront();
    }

    private group(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.group();
    }

    private ungroup(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.unGroup();
    }
    private lockObject(): void {
        this.selectedItem.isModified = true;
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        for (const value of (diagram.selectedItems.nodes as NodeModel[])) {
            const node: NodeModel = value;
            if ((node.constraints as NodeConstraints) & NodeConstraints.Drag) {
                node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
            } else {
                node.constraints = NodeConstraints.Default;
            }
        }
        for (const item of (diagram.selectedItems.connectors as ConnectorModel[])) {
            const connector: ConnectorModel = item;
            if ((connector.constraints as ConnectorConstraints) & ConnectorConstraints.Drag) {
                connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
            } else {
                connector.constraints = ConnectorConstraints.Default;
            }
        }
        diagram.dataBind();
    }
    private undo(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.undo();
    }
    private distribute(value: any): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.distribute(value);
    }
    private redo(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.redo();
    }
    private delete(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.remove();
    }
    private selectAll(): void {
        this.selectedItem.isModified = true;
        this.selectedItem.selectedDiagram.selectAll();
    }
    // private distribute(value: any): void {
    //     this.selectedItem.isModified = true;
    //     this.selectedItem.selectedDiagram.distribute(value);
    // }
    private canExecute(): boolean {
        return true;
    }
    private generateDiagram(): void {
        this.selectedItem.selectedDiagram = this.diagram;
        // this.diagram.layers[0].addInfo = { 'name': 'Layer0' };
    }
    private btnExportClick(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        diagram.exportDiagram({
            fileName: this.selectedItem.exportSettings.fileName,
            format: this.selectedItem.exportSettings.format as FileFormats,
            region: this.selectedItem.exportSettings.region as DiagramRegions
        });
        this.exportDialog.hide();
    }

    private btnPrintClick(): void {
        let pageWidth: number = this.selectedItem.printSettings.pageWidth;
        let pageHeight: number = this.selectedItem.printSettings.pageHeight;
        const paperSize: PaperSize = this.selectedItem.utilityMethods.getPaperSize(this.selectedItem.printSettings.paperSize);
        if (paperSize.pageHeight && paperSize.pageWidth) {
            pageWidth = paperSize.pageWidth;
            pageHeight = paperSize.pageHeight;
        }
        if (this.selectedItem.pageSettings.isPortrait) {
            if (pageWidth > pageHeight) {
                const temp: number = pageWidth;
                pageWidth = pageHeight;
                pageHeight = temp;
            }
        } else {
            if (pageHeight > pageWidth) {
                const temp: number = pageHeight;
                pageHeight = pageWidth;
                pageWidth = temp;
            }
        }
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        diagram.print({
            "region": this.selectedItem.printSettings.region as DiagramRegions, "pageHeight": pageHeight, "pageWidth": pageWidth,
            "multiplePage": !this.selectedItem.printSettings.multiplePage,
            "pageOrientation": this.selectedItem.printSettings.isPortrait ? 'Portrait' : 'Landscape'
        });
        this.printDialog.hide();
    }

    private btnTooltip(): void {
        const diagram: Diagram = this.selectedItem.selectedDiagram;
        if ((this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[]).length > 0) {
            const node: NodeModel = (this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0];
            this.customProperty.setTooltip(node, (document.getElementById('objectTooltip') as HTMLTextAreaElement).value);
            this.selectedItem.nodeProperties.tooltip = (node.tooltip as any).content as string;
            diagram.dataBind();
        }
        this.tooltipDialog.hide();
    }

    private btnSave(): void {
        CommonKeyboardCommands.download(this.page.savePage(), (document.getElementById('saveFileName') as HTMLInputElement).value);
        this.saveDialog.hide();
    }

    private btnHyperLink(): void {
        const node: NodeModel = (this.selectedItem.selectedDiagram.selectedItems.nodes as NodeModel[])[0] as NodeModel;
        if ((node.annotations as ShapeAnnotation[]).length > 0) {
            (node.annotations as ShapeAnnotation[])[0].hyperlink.link = (document.getElementById('hyperlink') as HTMLInputElement).value;
            (node.annotations as ShapeAnnotation[])[0].hyperlink.content = (document.getElementById('hyperlinkText') as HTMLInputElement).value;
            this.applyToolTipforHyperlink(node);
            this.selectedItem.selectedDiagram.dataBind();
        } else {
            const annotation: ShapeAnnotationModel = {
                hyperlink: {
                    content: (document.getElementById('hyperlinkText') as HTMLInputElement).value,
                    link: (document.getElementById('hyperlink') as HTMLInputElement).value
                }
            };
            this.selectedItem.selectedDiagram.addLabels(node, [annotation]);
            this.applyToolTipforHyperlink(node);
            this.selectedItem.selectedDiagram.dataBind();
        }
        this.hyperlinkDialog.hide();
    }
    private applyToolTipforHyperlink(node: NodeModel): void {
        node.constraints = NodeConstraints.Default & ~NodeConstraints.InheritTooltip | NodeConstraints.Tooltip;
        node.tooltip = {
            content: ((node.annotations as ShapeAnnotation[])[0].hyperlink as HyperlinkModel).link, relativeMode: 'Object',
            position: 'TopCenter', showTipPointer: true,
        };
    }
    private btnDeleteConfirmation(): void {
        this.customProperty.removeProperty();
    }
    private btnCancelClick(args: React.MouseEvent<Element>): void {
        const ss: HTMLElement = args.target as HTMLElement;
        const key: string = (ss.offsetParent as HTMLElement).id;
        switch (key) {
            case 'exportDialog':
                this.exportDialog.hide();
                break;
            case 'printDialog':
                this.printDialog.hide();
                break;
            case 'saveDialog':
                this.saveDialog.hide();
                break;
            case 'customPropertyDialog':
                this.customPropertyDialog.hide();
                break;
            case 'tooltipDialog':
                this.tooltipDialog.hide();
                break;
            case 'hyperlinkDialog':
                this.hyperlinkDialog.hide();
                break;
            case 'deleteConfirmationDialog':
                this.deleteConfirmationDialog.hide();
                break;
            case 'fileUploadDialog':
                this.fileUploadDialog.hide();
                OrgChartUtilityMethods.isUploadSuccess = false;
                break;
            case 'moreShapesDialog':
                this.moreShapesDialog.hide();
                break;
        }
    }
    private btnMoreShapes(args: React.MouseEvent<Element>): void {
        const listSelectedItem: SelectedCollection = this.moreShapesList.getSelectedItems() as SelectedCollection;
        if (listSelectedItem.text.length > 0) {
            this.symbolpalette.palettes = this.palettes.getPalettes(listSelectedItem.text as string[]);
            this.moreShapesDialog.hide();
        }
    }
    private btnUploadNext(args: React.MouseEvent<Element>): void {
        const target: any = args.target;
        const buttonInstance: any = target.ej2_instances[0];
        const uploadDialogContent: any = document.getElementById('uploadDialogContent');
        if (OrgChartUtilityMethods.isUploadSuccess) {
            if (uploadDialogContent.className === 'db-upload-content firstPage') {
                if (OrgChartUtilityMethods.fileType === 'xml') {
                    this.fileUploadDialog.header = ' Define Employee Information';
                    uploadDialogContent.className = 'db-upload-content thirdPage';
                    buttonInstance.content = 'Finish';
                } else {
                    this.fileUploadDialog.header = ' Define Employee - Supervisor Relationship';
                    uploadDialogContent.className = 'db-upload-content secondPage';
                }
            } else if (uploadDialogContent.className === 'db-upload-content secondPage') {
                const id: string = this.selectedItem.orgDataSettings.id;
                const parent: string = this.selectedItem.orgDataSettings.parent;
                if (id && parent) {
                    if (!OrgChartUtilityMethods.validateParentChildRelation()) {
                        alert('We haven"t found the parent child relationship between the chosen fields');
                    } else {
                        this.fileUploadDialog.header = ' Define Employee Information';
                        uploadDialogContent.className = 'db-upload-content thirdPage';
                        buttonInstance.content = 'Finish';
                    }
                } else {
                    alert('EmployeeId and SupervisorId can"t be empty');
                }

            } else {
                const nameField: string = this.selectedItem.orgDataSettings.nameField;
                if (nameField) {
                    uploadDialogContent.className = 'db-upload-content firstPage';
                    buttonInstance.content = 'Next';
                    OrgChartUtilityMethods.applyDataSource();
                    this.defaultupload.clearAll();
                } else {
                    alert('Name field can"t be empty');
                }
            }
        }
    }
    private listViewSelectionChange(args: SelectEventArgs): void {
        (document.getElementById('shapePreviewImage') as HTMLImageElement).src =  require('./assets/dbstyle/shapes_images/' + args.text.toLowerCase() + '.png');
    }

    // private closeWindow(evt: BeforeUnloadEvent): BeforeUnloadEvent {
    //     const value :any = null;
    //     const message: string = 'Are you sure you want to close?';
    //     if (evt && this.selectedItem.isModified) {
    //         evt.returnValue = message;
    //         return evt;
    //     }
    //     return value;
    // }
};




// class CloneTool extends MoveTool {
//   public mouseDown(args: MouseEventArgs): void {
//     alert("Clone user handle is clicked")
//   }
// }

// class SettingsTool extends MoveTool {
//   public mouseDown(args: MouseEventArgs): void {
//     alert("Settings user handle is clicked")
//   }
// }

// function getTool(action: string): ToolBase | null {
//   let tool: ToolBase;
//   if (action === "clone") {
//     tool = new CloneTool(diagramInstance.commandHandler);
//     return tool;
//   } else if (action === "settings") {
//     tool = new SettingsTool(diagramInstance.commandHandler);
//     return tool;
//   }
//   return null;
// }



export default App;

