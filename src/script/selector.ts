/**
 * Selector Handler
 */
import {
    Node,
} from '@syncfusion/ej2-diagrams';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

/* tslint:disable: name-of-rule-to-disable */

export class NodeProperties {

    public propertyChange: () => {};

    public opacityText: string = '100%';

    public tooltip: string;

    private mOffsetX: number = 0;
    private mOffsetY: number = 0;

    private mWidth: number = 0;
    private mHeight: number = 0;
    private mRotateAngle: number = 0;
    private mFillColor: string = '#ffffff';
    private mStrokeColor: string = '#000000';
    private mStrokeStyle: string = 'None';
    private mStrokeWidth: number = 1;
    private mOpacity: number = 0;
    private mAspectRatio: boolean = false;
    private mGradient: boolean = false;
    private mGradientDirection: string = 'BottomToTop';
    private mGradientColor: string = '#ffffff';

    public get offsetX(): number {
        return this.mOffsetX;
    }

    public set offsetX(offsetX: number) {
        if (this.mOffsetX !== offsetX) {
            this.mOffsetX = offsetX;
            this.triggerPropertyChange('offsetX', offsetX);
        }
    }


    public get offsetY(): number {
        return this.mOffsetY;
    }


    public set offsetY(offsetY: number) {
        if (this.mOffsetY !== offsetY) {
            this.mOffsetY = offsetY;
            this.triggerPropertyChange('offsetY', offsetY);
        }
    }


    public get width(): number {
        return this.mWidth;
    }


    public set width(width: number) {
        if (this.mWidth !== width) {
            this.mWidth = width || 3;
            this.triggerPropertyChange('width', width);
        }
    }


    public get height(): number {
        return this.mHeight;
    }

    public set height(height: number) {
        if (this.mHeight !== height) {
            this.mHeight = height || 3;
            this.triggerPropertyChange('height', height);
        }
    }


    public get rotateAngle(): number {
        return this.mRotateAngle;
    }


    public set rotateAngle(rotateAngle: number) {
        if (this.mRotateAngle !== rotateAngle) {
            this.mRotateAngle = rotateAngle;
            this.triggerPropertyChange('rotateAngle', rotateAngle);
        }
    }


    public get fillColor(): string {
        return this.mFillColor;
    }


    public set fillColor(fillColor: string) {
        if (this.mFillColor !== fillColor) {
            this.mFillColor = fillColor;
            this.triggerPropertyChange('fillColor', fillColor);
        }
    }


    public get strokeColor(): string {
        return this.mStrokeColor;
    }


    public set strokeColor(strokeColor: string) {
        if (this.mStrokeColor !== strokeColor) {
            this.mStrokeColor = strokeColor;
            this.triggerPropertyChange('strokeColor', strokeColor);
        }
    }


    public get strokeStyle(): string {
        return this.mStrokeStyle;
    }


    public set strokeStyle(strokeStyle: string) {
        if (this.mStrokeStyle !== strokeStyle) {
            this.mStrokeStyle = strokeStyle;
            this.triggerPropertyChange('strokeStyle', strokeStyle);
        }
    }


    public get strokeWidth(): number {
        return this.mStrokeWidth;
    }


    public set strokeWidth(strokeWidth: number) {
        if (this.mStrokeWidth !== strokeWidth) {
            this.mStrokeWidth = strokeWidth;
            this.triggerPropertyChange('strokeWidth', strokeWidth);
        }
    }


    public get opacity(): number {
        return this.mOpacity;
    }

    public set opacity(opacity: number) {
        if (this.mOpacity !== opacity) {
            this.mOpacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }




    public get aspectRatio(): boolean {
        return this.mAspectRatio;
    }


    public set aspectRatio(aspectRatio: boolean) {
        if (this.mAspectRatio !== aspectRatio) {
            this.mAspectRatio = aspectRatio;
            this.triggerPropertyChange('aspectRatio', aspectRatio);
        }
    }


    public get gradient(): boolean {
        return this.mGradient;
    }


    public set gradient(gradient: boolean) {
        if (this.mGradient !== gradient) {
            this.mGradient = gradient;
            const gradientElement: HTMLElement = document.getElementById('gradientStyle') as HTMLElement;
            if (gradient) {
                gradientElement.className = 'row db-prop-row db-gradient-style-show';
            } else {
                gradientElement.className = 'row db-prop-row db-gradient-style-hide';
            }
            this.triggerPropertyChange('gradient', gradient);
        }
    }


    public get gradientDirection(): string {
        return this.mGradientDirection;
    }


    public set gradientDirection(gradientDirection: string) {
        if (this.mGradientDirection !== gradientDirection) {
            this.mGradientDirection = gradientDirection;
            this.triggerPropertyChange('gradient', true);
        }
    }


    public get gradientColor(): string {
        return this.mGradientColor;
    }


    public set gradientColor(gradientColor: string) {
        if (this.mGradientColor !== gradientColor) {
            this.mGradientColor = gradientColor;
            this.triggerPropertyChange('gradient', true);
        }
    }

    public triggerPropertyChange(propName: string, propValue: any): void {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propName, propertyValue: propValue });
        }
    }

    public getGradient(node: Node): void {
        const gradientValue: { [key: string]: number } =
            this.getGradientDirectionValue((this.gradientDirection as any).value);
        node.style.gradient = {
            type: 'Linear',
            x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
            stops: [
                { color: node.style.fill, offset: 0 },
                { color: this.getColor((this.gradientColor as any).value), offset: 1 }
            ]
        };
    }

    public getGradientDirectionValue(direction: string): { [key: string]: number } {
        let gradientValue: { [key: string]: number } = {};
        let x1: number = 0; let x2: number = 0; let y1: number = 0; let y2: number = 0;
        if (direction === 'LeftToRight') {
            x1 = 100;
        } else if (direction === 'BottomToTop') {
            y2 = 100;
        } else if (direction === 'RightToLeft') {
            x2 = 100;
        } else {
            y1 = 100;
        }
        gradientValue = { 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2 };
        return gradientValue;
    }


    private getColor(colorName: string): string {
        if (window.navigator && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    }
}

export class ConnectorProperties {

    public opacityText: string = '100%';
    public propertyChange: () => {};
    private mLineColor: string = '#ffffff';
    private mLineWidth: number;
    private mLineStyle: string;
    private mLineType: string;
    private mLineJump: boolean;
    private mLineJumpSize: number;
    private mSourceType: string;
    private mTargetType: string;
    private mSourceSize: number;
    private mTargetSize: number;
    private mOpacity: number;
    public get lineColor(): string {
        return this.mLineColor;
    }


    public set lineColor(lineColor: string) {
        if (this.mLineColor !== lineColor) {
            this.mLineColor = lineColor;
            this.triggerPropertyChange('lineColor', lineColor);
        }
    }


    public get lineWidth(): number {
        return this.mLineWidth;
    }

    public set lineWidth(lineWidth: number) {
        if (this.mLineWidth !== lineWidth) {
            this.mLineWidth = lineWidth;
            this.triggerPropertyChange('lineWidth', lineWidth);
        }
    }


    public get lineStyle(): string {
        return this.mLineStyle;
    }


    public set lineStyle(lineStyle: string) {
        if (this.mLineStyle !== lineStyle) {
            this.mLineStyle = lineStyle;
            this.triggerPropertyChange('lineStyle', lineStyle);
        }
    }


    public get lineType(): string {
        return this.mLineType;
    }


    public set lineType(lineType: string) {
        if (this.mLineType !== lineType) {
            this.mLineType = lineType;
            this.triggerPropertyChange('lineType', lineType);
        }
    }


    public get lineJump(): boolean {
        return this.mLineJump;
    }


    public set lineJump(lineJump: boolean) {
        if (this.mLineJump !== lineJump) {
            this.mLineJump = lineJump;
            if (lineJump) {
                (document.getElementById('lineJumpSizeDiv') as HTMLElement).style.display = '';
            } else {
                (document.getElementById('lineJumpSizeDiv') as HTMLElement).style.display = 'none';
            }
            this.triggerPropertyChange('lineJump', lineJump);
        }
    }


    public get lineJumpSize(): number {
        return this.mLineJumpSize;
    }


    public set lineJumpSize(lineJumpSize: number) {
        if (this.mLineJumpSize !== lineJumpSize) {
            this.mLineJumpSize = lineJumpSize;
            this.triggerPropertyChange('lineJumpSize', lineJumpSize);
        }
    }


    public get sourceType(): string {
        return this.mSourceType;
    }

    public set sourceType(sourceType: string) {
        if (this.mSourceType !== sourceType) {
            this.mSourceType = sourceType;
            this.triggerPropertyChange('sourceType', sourceType);
        }
    }


    public get targetType(): string {
        return this.mTargetType;
    }


    public set targetType(targetType: string) {
        if (this.mTargetType !== targetType) {
            this.mTargetType = targetType;
            this.triggerPropertyChange('targetType', targetType);
        }
    }


    public get sourceSize(): number {
        return this.mSourceSize;
    }


    public set sourceSize(sourceSize: number) {
        if (this.mSourceSize !== sourceSize) {
            this.mSourceSize = sourceSize;
            this.triggerPropertyChange('sourceSize', sourceSize);
        }
    }


    public get targetSize(): number {
        return this.mTargetSize;
    }


    public set targetSize(targetSize: number) {
        if (this.mTargetSize !== targetSize) {
            this.mTargetSize = targetSize;
            this.triggerPropertyChange('targetSize', targetSize);
        }
    }


    public get opacity(): number {
        return this.mOpacity;
    }


    public set opacity(opacity: number) {
        if (this.mOpacity !== opacity) {
            this.mOpacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }



    public triggerPropertyChange(propName: string, propValue: any): void {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { "propertyName": propName, "propertyValue": propValue });
        }
    }
}

export class TextProperties {

    public opacityText: string = '100%';
    public propertyChange: () => {};

    public textDecoration: boolean;

    public bold: boolean;

    public italic: boolean;

    public textAlign: string;

    public horizontalAlign: string;

    public verticalAlign: string;

    public textPositionDataSource: Array<{ [key: string]: any }> = this.getNodeTextPositions();
    private mTextPosition: string = '';
    private mFontFamily: string = 'Arial';
    private mFontColor: string = '#000000';
    private mFontSize: number;
    private mOpacity: number;
    public get textPosition(): string {
        return this.mTextPosition;
    }


    public set textPosition(textPosition: string) {
        if (this.mTextPosition !== textPosition) {
            this.mTextPosition = textPosition;
            this.triggerPropertyChange('textPosition', textPosition);
        }
    }


    public get fontFamily(): string {
        return this.mFontFamily;
    }


    public set fontFamily(fontFamily: string) {
        if (this.mFontFamily !== fontFamily) {
            this.mFontFamily = fontFamily;
            this.triggerPropertyChange('fontFamily', fontFamily);
        }
    }


    public get fontSize(): number {
        return this.mFontSize;
    }


    public set fontSize(fontSize: number) {
        if (this.mFontSize !== fontSize) {
            this.mFontSize = fontSize;
            this.triggerPropertyChange('fontSize', fontSize);
        }
    }


    public get fontColor(): string {
        return this.mFontColor;
    }


    public set fontColor(fontColor: string) {
        if (this.mFontColor !== fontColor) {
            this.mFontColor = fontColor;
            this.triggerPropertyChange('fontColor', fontColor);
        }
    }


    public get opacity(): number {
        return this.mOpacity;
    }


    public set opacity(opacity: number) {
        if (this.mOpacity !== opacity) {
            this.mOpacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }



    public getNodeTextPositions(): Array<{ [key: string]: any }> {
        return [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
    }

    public getConnectorTextPositions(): Array<{ [key: string]: any }> {
        return [
            { text: 'Before', value: 'Before' }, { text: 'Center', value: 'Center' },
            { text: 'After', value: 'After' },
        ];
    }



    public triggerPropertyChange(propName: string, propValue: any): void {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { "propertyName": propName, "propertyValue": propValue });
        }
    }

}

export class ExportSettings {
    private mFileName: string = 'Diagram';
    private mFormat: string = 'JPG';
    private mRegion: string = 'PageSettings';
    public get fileName(): string {
        return this.mFileName;
    }


    public set fileName(fileName: string) {
        this.mFileName = fileName;
    }


    public get format(): string {
        return this.mFormat;
    }

    public set format(format: string) {
        this.mFormat = format;
    }


    public get region(): string {
        return this.mRegion;
    }


    public set region(region: string) {
        this.mRegion = region;
    }
}

export class PrintSettings {
    private mRegion: string = 'PageSettings';
    private mPageWidth: number = 0;
    private mPageHeight: number = 0;
    private mIsPortrait: boolean = true;
    private mIsLandscape: boolean = false;
    private mMultiplePage: boolean = false;
    private mPaperSize: string = 'Letter';
    public get region(): string {
        return this.mRegion;
    }


    public set region(region: string) {
        this.mRegion = region;
    }


    public get pageWidth(): number {
        return this.mPageWidth;
    }


    public set pageWidth(pageWidth: number) {
        this.mPageWidth = pageWidth;
    }


    public get pageHeight(): number {
        return this.mPageHeight;
    }


    public set pageHeight(pageHeight: number) {
        this.mPageHeight = pageHeight;
    }


    public get isPortrait(): boolean {
        return this.mIsPortrait;
    }


    public set isPortrait(isPortrait: boolean) {
        this.mIsPortrait = isPortrait;
    }


    public get isLandscape(): boolean {
        return this.mIsLandscape;
    }


    public set isLandscape(isLandscape: boolean) {
        this.mIsLandscape = isLandscape;
    }


    public get multiplePage(): boolean {
        return this.mMultiplePage;
    }


    public set multiplePage(multiplePage: boolean) {
        this.mMultiplePage = multiplePage;
    }


    public get paperSize(): string {
        return this.mPaperSize;
    }


    public set paperSize(paperSize: string) {
        this.mPaperSize = paperSize;
        (document.getElementById('printCustomSize') as HTMLElement).style.display = 'none';
        (document.getElementById('printOrientation') as HTMLElement).style.display = 'none';
        if (paperSize === 'Custom') {
            (document.getElementById('printCustomSize') as HTMLElement).style.display = '';
        } else {
            (document.getElementById('printOrientation') as HTMLElement).style.display = '';
        }
    }

}

