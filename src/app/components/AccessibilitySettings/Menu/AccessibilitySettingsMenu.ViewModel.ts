import {action, makeObservable, observable} from "mobx";
import {AccessibilitySettingsCategory} from "../../../../models/accessibility/AccessibilitySettingsCategory";

/**
 * The accessibility menu's view model
 */
export default class AccessibilitySettingsMenuViewModel {
    /**
     * Create a new view model instance.
     */
    constructor() {
        makeObservable(this);
    }

    /**
     * Status whether the menu is toggled open or closed
     */
    @observable public isMenuOpen = false
    /**
     * The currently selected menu category
     */
    @observable public selectedCategory?: AccessibilitySettingsCategory = undefined
    /**
     * Toggle the menu's state.
     */
    @action toggleMenu = (): void => {
        this.isMenuOpen = !this.isMenuOpen;
        setTimeout(() => {
            if (!this.isMenuOpen) {
                this.updateSelectedCategory(undefined)
            }
        }, 400)
    }
    /**
     * Handles key up event
     * @param event
     */
    @action handleKeyUp = (event: any): void => {
        switch (event.key) {
            case "m":
            case "M":
            case "Escape":
                this.toggleMenu();
                break;
        }
    }

    /**
     * Update the selected category.
     * @param category The new category
     */
    @action updateSelectedCategory(category?: AccessibilitySettingsCategory): void {
        this.selectedCategory = category
    }

}