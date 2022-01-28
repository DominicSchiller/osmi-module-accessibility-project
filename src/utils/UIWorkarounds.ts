import {remove} from "mobx";

export function fixSensoAspectRatio() {
    updateEqualAspectRatioClass(true)
}

function updateEqualAspectRatioClass(remove: boolean = false) {
    let cssClass = "equal-width-aspect-ratio"
    setTimeout(() => {
        let senso = document.getElementById("senso")
        if (senso) {
            senso!.classList.remove(cssClass)
            senso!.classList.add(cssClass)
        }
    }, 0.1)
}