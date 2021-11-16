import React from "react";

/**
 * React context to manage the state of the accessibility settings menu
 */
const AccessibilityMenuContext = React.createContext({});

/**
 * The custom provider to serve the accessibility menu's state context
 * @param children
 * @param menuContext
 * @constructor
 */
export const AccessibilityMenuContextProvider = ({children, menuContext}: any) => {
    return (
        <AccessibilityMenuContext.Provider value={menuContext}>
            {children}
        </AccessibilityMenuContext.Provider>
    )
}

/* Hook to use the accessibility related menuContext in any functional component */
const useAccessibilityMenuContext = () => React.useContext(AccessibilityMenuContext);

/* HOC to inject the accessibility related menuContext to any functional or class component */
export const withAccessibilityMenuContext = (Component: any) => (props: any) => {
    return <Component {...props} menuContext={useAccessibilityMenuContext()} />;
};

