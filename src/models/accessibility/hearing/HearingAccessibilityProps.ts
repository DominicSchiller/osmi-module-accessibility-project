import {action, makeObservable, observable} from "mobx";

/**
 * Collection of hearing related accessibility settings.
 */
export class HearingAccessibilityProps {
    /**
     * Volume used for speech
     */
    @observable public voiceVolume: number = 50

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
    @observable public subtitleFontSize: number = 16

    /**
     * Update voice volume.
     * @param newVolume The new voice volume
     */
    @action public setVoiceVolume(newVolume: number) {
        this.voiceVolume = newVolume
    }

    /**
     * Update the sound effect's volume
     * @param newVolume The new volume
     */
    @action public setSoundEffectsVolume(newVolume: number) {
        this.soundEffectsVolume = newVolume
    }

    /**
     * Update the subtitle font size.
     * @param newFontSize The new font size
     */
    @action public setSubtitleFontSize(newFontSize: number) {
        this.subtitleFontSize = newFontSize
    }

    /**
     * Create a new set of hearing related accessibility settings.
     */
    public constructor() {
        makeObservable(this);
    }
}