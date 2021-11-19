import React from "react";

/**
 * React context to manage the state of global accessibility Settings
 */
const AccessibilityContext = React.createContext({});

export const AccessibilityContextProvider = ({children, accessibilityContext}: any) => {
    return (
        <AccessibilityContext.Provider value={accessibilityContext}>
            {children}
        </AccessibilityContext.Provider>
    )
}

/* Hook to use the accessibility related menuContext in any functional component */
const useAccessibilityContext = () => React.useContext(AccessibilityContext);

/* HOC to inject the accessibility related menuContext to any functional or class component */
export const withAccessibilityContext = (Component: any) => (props: any) => {
    return <Component {...props} accessibilityContext={useAccessibilityContext()} />;
};

