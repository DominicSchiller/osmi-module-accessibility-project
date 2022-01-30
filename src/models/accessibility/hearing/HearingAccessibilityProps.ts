import {action, makeObservable, observable} from "mobx";
import {SensoAudioPlayer} from "../../../gameplay/SensoAudioPlayer";
import {UIColorMode} from "../seeing/UIColorMode";

/**
 * Collection of hearing related accessibility settings.
 */
export class HearingAccessibilityProps {
    /**
     * Volume used for sound effects
     */
    @observable public soundEffectsVolume: number = 50

    /**
     * Status whether to show subtitles or not
     */
    @observable public showSubtitles: boolean = true

    /**
     * The font size used for subtitles
     */
    @observable public subtitleFontSize: number = 36

    /**
     * Update the sound effect's volume
     * @param newVolume The new volume
     */
    @action public setSoundEffectsVolume(newVolume: number) {
        this.soundEffectsVolume = newVolume
        SensoAudioPlayer.setVolume(newVolume)
        localStorage.setItem("hearing-sound-fx-volume", `${this.soundEffectsVolume}`)
    }

    /**
     * Update the subtitle font size.
     * @param newFontSize The new font size
     */
    @action public setSubtitleFontSize(newFontSize: number) {
        this.subtitleFontSize = newFontSize
        localStorage.setItem("hearing-subtitle-font-size", `${this.subtitleFontSize}`)
    }

    /**
     * Update status whether to show subtitles or not.
     * @param show The show status
     */
    @action public setShowSubtitles(show: boolean) {
        this.showSubtitles = show
        localStorage.setItem("hearing-show-subtitles", `${this.showSubtitles}`)
    }

    /**
     * Create a new set of hearing related accessibility settings.
     */
    public constructor() {
        makeObservable(this);

        let soundEffectsVolume = parseInt(localStorage.getItem("hearing-sound-fx-volume") ?? "50")
        if (soundEffectsVolume) {
            this.setSoundEffectsVolume(soundEffectsVolume)
        } else {
            localStorage.setItem("hearing-sound-fx-volume", `${this.soundEffectsVolume}`)
        }

        let subtitleFontSize = parseInt(localStorage.getItem("hearing-subtitle-font-size") ?? "36")
        if (subtitleFontSize) {
            this.setSubtitleFontSize(subtitleFontSize)
        } else {
            localStorage.setItem("hearing-subtitle-font-size", `${this.subtitleFontSize}`)
        }

        let showSubtitles = localStorage.getItem("hearing-show-subtitles")
        if (showSubtitles) {
            this.setShowSubtitles(showSubtitles === "true")
        } else {
            localStorage.setItem("hearing-show-subtitles", `${this.showSubtitles}`)
        }
    }
}