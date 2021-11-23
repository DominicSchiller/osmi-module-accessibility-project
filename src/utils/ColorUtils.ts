export const rgbaString = function (hex: string, alpha: number) {
    const aRgbHex = hex.replace("#", "").match(/.{1,2}/g);
    if (aRgbHex) {
        const rgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`
    }
    return ""
};

export const hexToHSL = function hexToHSL(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result![1], 16);
    var g = parseInt(result![2], 16);
    var b = parseInt(result![3], 16);
    r /= 255; g /= 255; b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max === min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        // @ts-ignore
        h /= 6;
    }
    const HSL: any = {};
    // @ts-ignore
    HSL['h']=Math.round(360*h);
    HSL['s']=Math.round(s*100);
    HSL['l']=Math.round(l*100);
    return HSL;
}