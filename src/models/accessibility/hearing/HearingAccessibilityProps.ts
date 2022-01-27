import {action, makeObservable, observable} from "mobx";
import {SensoAudioPlayer} from "../../../gameplay/SensoAudioPlayer";

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
    }

    /**
     * Update the subtitle font size.
     * @param newFontSize The new font size
     */
    @action public setSubtitleFontSize(newFontSize: number) {
        this.subtitleFontSize = newFontSize
    }

    /**
     * Update status whether to show subtitles or not.
     * @param show The show status
     */
    @action public setShowSubtitles(show: boolean) {
        this.showSubtitles = show
    }

    /**
     * Create a new set of hearing related accessibility settings.
     */
    public constructor() {
        makeObservable(this);
    }
}