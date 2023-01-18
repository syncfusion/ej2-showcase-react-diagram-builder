import { isNullOrUndefined } from '@syncfusion/ej2-base';
/* tslint:disable: name-of-rule-to-disable */
export class NodeProperties {
    constructor() {
        this.opacityText = '100%';
        this.mOffsetX = 0;
        this.mOffsetY = 0;
        this.mWidth = 0;
        this.mHeight = 0;
        this.mRotateAngle = 0;
        this.mFillColor = '#ffffff';
        this.mStrokeColor = '#000000';
        this.mStrokeStyle = 'None';
        this.mStrokeWidth = 1;
        this.mOpacity = 0;
        this.mAspectRatio = false;
        this.mGradient = false;
        this.mGradientDirection = 'BottomToTop';
        this.mGradientColor = '#ffffff';
    }
    get offsetX() {
        return this.mOffsetX;
    }
    set offsetX(offsetX) {
        if (this.mOffsetX !== offsetX) {
            this.mOffsetX = offsetX;
            this.triggerPropertyChange('offsetX', offsetX);
        }
    }
    get offsetY() {
        return this.mOffsetY;
    }
    set offsetY(offsetY) {
        if (this.mOffsetY !== offsetY) {
            this.mOffsetY = offsetY;
            this.triggerPropertyChange('offsetY', offsetY);
        }
    }
    get width() {
        return this.mWidth;
    }
    set width(width) {
        if (this.mWidth !== width) {
            this.mWidth = width || 3;
            this.triggerPropertyChange('width', width);
        }
    }
    get height() {
        return this.mHeight;
    }
    set height(height) {
        if (this.mHeight !== height) {
            this.mHeight = height || 3;
            this.triggerPropertyChange('height', height);
        }
    }
    get rotateAngle() {
        return this.mRotateAngle;
    }
    set rotateAngle(rotateAngle) {
        if (this.mRotateAngle !== rotateAngle) {
            this.mRotateAngle = rotateAngle;
            this.triggerPropertyChange('rotateAngle', rotateAngle);
        }
    }
    get fillColor() {
        return this.mFillColor;
    }
    set fillColor(fillColor) {
        if (this.mFillColor !== fillColor) {
            this.mFillColor = fillColor;
            this.triggerPropertyChange('fillColor', fillColor);
        }
    }
    get strokeColor() {
        return this.mStrokeColor;
    }
    set strokeColor(strokeColor) {
        if (this.mStrokeColor !== strokeColor) {
            this.mStrokeColor = strokeColor;
            this.triggerPropertyChange('strokeColor', strokeColor);
        }
    }
    get strokeStyle() {
        return this.mStrokeStyle;
    }
    set strokeStyle(strokeStyle) {
        if (this.mStrokeStyle !== strokeStyle) {
            this.mStrokeStyle = strokeStyle;
            this.triggerPropertyChange('strokeStyle', strokeStyle);
        }
    }
    get strokeWidth() {
        return this.mStrokeWidth;
    }
    set strokeWidth(strokeWidth) {
        if (this.mStrokeWidth !== strokeWidth) {
            this.mStrokeWidth = strokeWidth;
            this.triggerPropertyChange('strokeWidth', strokeWidth);
        }
    }
    get opacity() {
        return this.mOpacity;
    }
    set opacity(opacity) {
        if (this.mOpacity !== opacity) {
            this.mOpacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }
    get aspectRatio() {
        return this.mAspectRatio;
    }
    set aspectRatio(aspectRatio) {
        if (this.mAspectRatio !== aspectRatio) {
            this.mAspectRatio = aspectRatio;
            this.triggerPropertyChange('aspectRatio', aspectRatio);
        }
    }
    get gradient() {
        return this.mGradient;
    }
    set gradient(gradient) {
        if (this.mGradient !== gradient) {
            this.mGradient = gradient;
            const gradientElement = document.getElementById('gradientStyle');
            if (gradient) {
                gradientElement.className = 'row db-prop-row db-gradient-style-show';
            }
            else {
                gradientElement.className = 'row db-prop-row db-gradient-style-hide';
            }
            this.triggerPropertyChange('gradient', gradient);
        }
    }
    get gradientDirection() {
        return this.mGradientDirection;
    }
    set gradientDirection(gradientDirection) {
        if (this.mGradientDirection !== gradientDirection) {
            this.mGradientDirection = gradientDirection;
            this.triggerPropertyChange('gradient', true);
        }
    }
    get gradientColor() {
        return this.mGradientColor;
    }
    set gradientColor(gradientColor) {
        if (this.mGradientColor !== gradientColor) {
            this.mGradientColor = gradientColor;
            this.triggerPropertyChange('gradient', true);
        }
    }
    triggerPropertyChange(propName, propValue) {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { propertyName: propName, propertyValue: propValue });
        }
    }
    getGradient(node) {
        const gradientValue = this.getGradientDirectionValue(this.gradientDirection.value);
        node.style.gradient = {
            type: 'Linear',
            x1: gradientValue.x1, x2: gradientValue.x2, y1: gradientValue.y1, y2: gradientValue.y2,
            stops: [
                { color: node.style.fill, offset: 0 },
                { color: this.getColor(this.gradientColor.value), offset: 1 }
            ]
        };
    }
    getGradientDirectionValue(direction) {
        let gradientValue = {};
        let x1 = 0;
        let x2 = 0;
        let y1 = 0;
        let y2 = 0;
        if (direction === 'LeftToRight') {
            x1 = 100;
        }
        else if (direction === 'BottomToTop') {
            y2 = 100;
        }
        else if (direction === 'RightToLeft') {
            x2 = 100;
        }
        else {
            y1 = 100;
        }
        gradientValue = { 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2 };
        return gradientValue;
    }
    getColor(colorName) {
        if (window.navigator && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    }
}
export class ConnectorProperties {
    constructor() {
        this.opacityText = '100%';
        this.mLineColor = '#ffffff';
    }
    get lineColor() {
        return this.mLineColor;
    }
    set lineColor(lineColor) {
        if (this.mLineColor !== lineColor) {
            this.mLineColor = lineColor;
            this.triggerPropertyChange('lineColor', lineColor);
        }
    }
    get lineWidth() {
        return this.mLineWidth;
    }
    set lineWidth(lineWidth) {
        if (this.mLineWidth !== lineWidth) {
            this.mLineWidth = lineWidth;
            this.triggerPropertyChange('lineWidth', lineWidth);
        }
    }
    get lineStyle() {
        return this.mLineStyle;
    }
    set lineStyle(lineStyle) {
        if (this.mLineStyle !== lineStyle) {
            this.mLineStyle = lineStyle;
            this.triggerPropertyChange('lineStyle', lineStyle);
        }
    }
    get lineType() {
        return this.mLineType;
    }
    set lineType(lineType) {
        if (this.mLineType !== lineType) {
            this.mLineType = lineType;
            this.triggerPropertyChange('lineType', lineType);
        }
    }
    get lineJump() {
        return this.mLineJump;
    }
    set lineJump(lineJump) {
        if (this.mLineJump !== lineJump) {
            this.mLineJump = lineJump;
            if (lineJump) {
                document.getElementById('lineJumpSizeDiv').style.display = '';
            }
            else {
                document.getElementById('lineJumpSizeDiv').style.display = 'none';
            }
            this.triggerPropertyChange('lineJump', lineJump);
        }
    }
    get lineJumpSize() {
        return this.mLineJumpSize;
    }
    set lineJumpSize(lineJumpSize) {
        if (this.mLineJumpSize !== lineJumpSize) {
            this.mLineJumpSize = lineJumpSize;
            this.triggerPropertyChange('lineJumpSize', lineJumpSize);
        }
    }
    get sourceType() {
        return this.mSourceType;
    }
    set sourceType(sourceType) {
        if (this.mSourceType !== sourceType) {
            this.mSourceType = sourceType;
            this.triggerPropertyChange('sourceType', sourceType);
        }
    }
    get targetType() {
        return this.mTargetType;
    }
    set targetType(targetType) {
        if (this.mTargetType !== targetType) {
            this.mTargetType = targetType;
            this.triggerPropertyChange('targetType', targetType);
        }
    }
    get sourceSize() {
        return this.mSourceSize;
    }
    set sourceSize(sourceSize) {
        if (this.mSourceSize !== sourceSize) {
            this.mSourceSize = sourceSize;
            this.triggerPropertyChange('sourceSize', sourceSize);
        }
    }
    get targetSize() {
        return this.mTargetSize;
    }
    set targetSize(targetSize) {
        if (this.mTargetSize !== targetSize) {
            this.mTargetSize = targetSize;
            this.triggerPropertyChange('targetSize', targetSize);
        }
    }
    get opacity() {
        return this.mOpacity;
    }
    set opacity(opacity) {
        if (this.mOpacity !== opacity) {
            this.mOpacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }
    triggerPropertyChange(propName, propValue) {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { "propertyName": propName, "propertyValue": propValue });
        }
    }
}
export class TextProperties {
    constructor() {
        this.opacityText = '100%';
        this.textPositionDataSource = this.getNodeTextPositions();
        this.mTextPosition = '';
        this.mFontFamily = 'Arial';
        this.mFontColor = '#000000';
    }
    get textPosition() {
        return this.mTextPosition;
    }
    set textPosition(textPosition) {
        if (this.mTextPosition !== textPosition) {
            this.mTextPosition = textPosition;
            this.triggerPropertyChange('textPosition', textPosition);
        }
    }
    get fontFamily() {
        return this.mFontFamily;
    }
    set fontFamily(fontFamily) {
        if (this.mFontFamily !== fontFamily) {
            this.mFontFamily = fontFamily;
            this.triggerPropertyChange('fontFamily', fontFamily);
        }
    }
    get fontSize() {
        return this.mFontSize;
    }
    set fontSize(fontSize) {
        if (this.mFontSize !== fontSize) {
            this.mFontSize = fontSize;
            this.triggerPropertyChange('fontSize', fontSize);
        }
    }
    get fontColor() {
        return this.mFontColor;
    }
    set fontColor(fontColor) {
        if (this.mFontColor !== fontColor) {
            this.mFontColor = fontColor;
            this.triggerPropertyChange('fontColor', fontColor);
        }
    }
    get opacity() {
        return this.mOpacity;
    }
    set opacity(opacity) {
        if (this.mOpacity !== opacity) {
            this.mOpacity = opacity;
            this.triggerPropertyChange('opacity', opacity);
        }
    }
    getNodeTextPositions() {
        return [
            { text: 'TopLeft', value: 'TopLeft' }, { text: 'TopCenter', value: 'TopCenter' },
            { text: 'TopRight', value: 'TopRight' }, { text: 'MiddleLeft', value: 'MiddleLeft' },
            { text: 'Center', value: 'Center' }, { text: 'MiddleRight', value: 'MiddleRight' },
            { text: 'BottomLeft', value: 'BottomLeft' }, { text: 'BottomCenter', value: 'BottomCenter' },
            { text: 'BottomRight', value: 'BottomRight' },
        ];
    }
    getConnectorTextPositions() {
        return [
            { text: 'Before', value: 'Before' }, { text: 'Center', value: 'Center' },
            { text: 'After', value: 'After' },
        ];
    }
    triggerPropertyChange(propName, propValue) {
        if (!isNullOrUndefined(this.propertyChange)) {
            this.propertyChange.call(this, { "propertyName": propName, "propertyValue": propValue });
        }
    }
}
export class ExportSettings {
    constructor() {
        this.mFileName = 'Diagram';
        this.mFormat = 'JPG';
        this.mRegion = 'PageSettings';
    }
    get fileName() {
        return this.mFileName;
    }
    set fileName(fileName) {
        this.mFileName = fileName;
    }
    get format() {
        return this.mFormat;
    }
    set format(format) {
        this.mFormat = format;
    }
    get region() {
        return this.mRegion;
    }
    set region(region) {
        this.mRegion = region;
    }
}
export class PrintSettings {
    constructor() {
        this.mRegion = 'PageSettings';
        this.mPageWidth = 0;
        this.mPageHeight = 0;
        this.mIsPortrait = true;
        this.mIsLandscape = false;
        this.mMultiplePage = false;
        this.mPaperSize = 'Letter';
    }
    get region() {
        return this.mRegion;
    }
    set region(region) {
        this.mRegion = region;
    }
    get pageWidth() {
        return this.mPageWidth;
    }
    set pageWidth(pageWidth) {
        this.mPageWidth = pageWidth;
    }
    get pageHeight() {
        return this.mPageHeight;
    }
    set pageHeight(pageHeight) {
        this.mPageHeight = pageHeight;
    }
    get isPortrait() {
        return this.mIsPortrait;
    }
    set isPortrait(isPortrait) {
        this.mIsPortrait = isPortrait;
    }
    get isLandscape() {
        return this.mIsLandscape;
    }
    set isLandscape(isLandscape) {
        this.mIsLandscape = isLandscape;
    }
    get multiplePage() {
        return this.mMultiplePage;
    }
    set multiplePage(multiplePage) {
        this.mMultiplePage = multiplePage;
    }
    get paperSize() {
        return this.mPaperSize;
    }
    set paperSize(paperSize) {
        this.mPaperSize = paperSize;
        document.getElementById('printCustomSize').style.display = 'none';
        document.getElementById('printOrientation').style.display = 'none';
        if (paperSize === 'Custom') {
            document.getElementById('printCustomSize').style.display = '';
        }
        else {
            document.getElementById('printOrientation').style.display = '';
        }
    }
}