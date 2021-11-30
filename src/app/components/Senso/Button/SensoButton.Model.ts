/**
 * A senso's colored action button.
 */
export interface ISensoButtonProps {
    /**
     * The button's unique identifier
     * note: this id is also used as alignment identifier.
     */
    id: SensoButtonID
    /**
     * The button's description title
     */
    title: string
    /**
     * The button's icon
     */
    icon: string
    /**
     * The button's color
     */
    color: string
    /**
     * The button's disabled status
     */
    disabled: boolean
}

/**
 * A senso button's unique identifier.
 */
export enum SensoButtonID {
    /**
     * The top-left corner
     */
    TopLeft = "senso-top-left-button",
    /**
     * The top-right corner
     */
    TopRight = "senso-top-right-button",
    /**
     * the bottom-left corner
     */
    BottomLeft = "senso-bottom-left-button",
    /**
     * The bottom-right corner
     */
    BottomRight = "senso-bottom-right-button"
}

/**
 * A senso's colored action button.
 */
export class SensoButton implements ISensoButtonProps {
    public readonly id: SensoButtonID
    public readonly title: string
    public readonly icon: string
    public readonly color: string
    public disabled: boolean

    /**
     * Create a new button instance
     * @param alignment The button's unique identifier
     * @param title The button's description title
     * @param icon The button's icon
     * @param color The button's color
     * @param disabled The button's disabled status
     */
    public constructor(alignment: SensoButtonID, title: string, icon: string, color: string, disabled?: boolean) {
        this.id = alignment
        this.title = title
        this.icon = icon
        this.color = color
        this.disabled = disabled ?? false
    }
}