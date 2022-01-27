import {Accessibility} from "../app/context/AccessibilityContext";

const correctSelectionSound = require("../assets/sounds/game/correct.m4a");
const wrongSelectionSound = require("../assets/sounds/game/wrong.m4a")
const countdown = require("../assets/sounds/game/countdown.m4a")
const levelStarted = require("../assets/sounds/game/level_started.m4a")
const levelCompleted = require("../assets/sounds/game/level_completed.m4a")

/**
 * A senso's sound effect.
 */
export enum SensoSound {
    /**
     * Sound effect for a button picked in the correct order
     */
    CorrectSelection,
    /**
     * Sound effect for a wronly picked button
     */
    WrongSelection,
    Countdown,
    LevelStarted,
    LevelCompleted
}

/**
 * Audio player to play senso game related sound effects.
 */
export class SensoAudioPlayer {

    /**
     * Play a given sound.
     * @param sound The senso's sound which to play
     * @private
     */
    public static play(sound: SensoSound) {
        let src = this.getSoundFileUrl(sound);
        this.playAudio(src);
    }

    public static setVolume(newVolume: number) {
        const audio = document.getElementById("audio-player") as HTMLAudioElement
        if (audio) {
            audio.volume = newVolume > 1.0 ? newVolume/100 : newVolume
        }
    }

    public static playButtonSound(soundPath?: string) {
        if (soundPath) {
            let src = require(`../assets/sounds/${soundPath}`).default
            this.playAudio(src)
        }
    }

    private static playAudio(src: string, autoPlay: boolean = true) {
        const audio = document.getElementById("audio-player") as HTMLAudioElement
        if (audio) {
            audio.autoplay = autoPlay
            audio.volume = Accessibility.hearing.soundEffectsVolume/100
            audio.src = src
        }
    }

    /**
     * get the file URL of a request senso sound
     * @param sound the senso sound for which to retrieve the concrete file URL
     * @private
     */
    private static getSoundFileUrl(sound: SensoSound): string {
        switch (sound) {
            case SensoSound.CorrectSelection:
                return correctSelectionSound.default
            case SensoSound.WrongSelection:
                return wrongSelectionSound.default
            case SensoSound.Countdown:
                return countdown.default
            case SensoSound.LevelStarted:
                return levelStarted.default
            case SensoSound.LevelCompleted:
                return levelCompleted.default
        }
    }
}