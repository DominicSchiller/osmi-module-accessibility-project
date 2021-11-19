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
