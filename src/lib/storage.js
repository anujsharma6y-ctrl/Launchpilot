export const getStorageItem = (key, defaultValue) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        return defaultValue;
    }
};

export const setStorageItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to storage', error);
    }
};

// User Simulation
export const getCurrentUser = () => getStorageItem('launchpilot_user', null);
export const loginUser = (email) => {
    const user = { email, token: 'mock-jwt-token' };
    setStorageItem('launchpilot_user', user);
    // Give free credits
    if (!getStorageItem('launchpilot_credits')) {
        setStorageItem('launchpilot_credits', {
            validations: 3,
            scans: 3
        });
    }
    return user;
};
export const logoutUser = () => {
    localStorage.removeItem('launchpilot_user');
};

// Credits Simulation
export const getCredits = () => getStorageItem('launchpilot_credits', { validations: 0, scans: 0 });
export const useCredit = (type) => { // type: 'validations' or 'scans'
    const credits = getCredits();
    if (credits[type] > 0) {
        credits[type] -= 1;
        setStorageItem('launchpilot_credits', credits);
        return true;
    }
    return false;
};

// History Storage
export const getHistory = () => getStorageItem('launchpilot_history', []);
export const saveToHistory = (item) => {
    const history = getHistory();
    const newItem = { ...item, id: Date.now().toString(), date: new Date().toISOString() };
    setStorageItem('launchpilot_history', [newItem, ...history]);
    return newItem;
};
