const correctSelectionSound = require("../assets/sounds/game/right_selection.m4a");
const wrongSelectionSound = require("../assets/sounds/game/wrong_selection.m4a")
const countdown = require("../assets/sounds/game/countdown.m4a")

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
    Countdown
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
        const audio = new Audio(this.getSoundFileUrl(sound))
        audio.play().then()
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
        }
    }
}