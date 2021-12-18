/**
 * Manager to handle and calculate level score related data.
 */
class LevelScoreManager {

    /**
     * Default base scoring points per level
     * @private
     */
    private readonly defaultLevelPoints = 100
    /**
     * Default base bonus points per level
     * @private
     */
    private readonly defaultBonusPoints = 250
    /**
     * The current level's requested start time
     * @private
     */
    private startTime: number = 0
    /**
     * The current level's requested end time to complete
     * @private
     */
    private endTime: number = 0

    /**
     * Start the level's timer
     */
    public startTimer() {
        this.startTime = performance.now()
    }

    /**
     * Stop the level's timer
     */
    public stopTimer() {
        this.endTime = performance.now()
    }

    /**
     * The time needed to complete the level.
     */
    public get timeNeeded(): number {
        return +((this.endTime - this.startTime)/1000).toFixed(2)
    }

    /**
     * The current level's required score to reach all three stars
     * @param level The level for which to calculate the required score
     */
    public calcThreeStarScore(level: number): number {
       return +(level * (this.defaultLevelPoints + this.defaultBonusPoints) * 0.5).toFixed(2)
    }

    /**
     * Calculate the score gained to complete the current level.
     * @param level
     */
    public calcScore(level: number): number {
        // the current level works as points multiplier
        let levelPoints = Math.round(level * this.defaultLevelPoints)
        let bonusPoints = Math.round((level * this.defaultBonusPoints) / this.timeNeeded)
        return levelPoints + bonusPoints
    }
}

export default LevelScoreManager;