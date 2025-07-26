/* global chrome */

// Function to save data to local storage or Chrome extension storage

export const saveData = (key, data) => {
    if (isChromeExtension()) {
        try {
            // Save data to Chrome extension storage

            // key =  resume (or) openAIKey

           return chrome.storage.local.set({ [key]: data });
        } catch (error) {
            console.error("Error saving to local state");
            console.error(error);
        }
    } else {

             //when running this app on normal web page not in a extension the chrome storage might not exist then we store data to browser local storage.

        // Save data to browser local storage

        //localStorage.setItem(key, JSON.stringify(data) - asynchronous operation.
        //Call Promise.resolve(value) when the asynchronous operation completes successfully to  passing the resulting value.
        return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
    }
};

// Function to get data from local storage or Chrome extension storage
export const loadData = (key) => {
    if (isChromeExtension()) {
        // key =  resume (or) openAIKey

        try {
            // Load data from Chrome extension storage
            return chrome.storage.local.get(key).then((data) => data[key]);
        } catch (error) {
            console.error("Error loading from local state");
            console.error(error);
        }
    } else {
        // Load data from browser local storage
        return Promise.resolve(JSON.parse(localStorage.getItem(key)));
    }
};

// Function to check if the environment is a Chrome extension
const isChromeExtension = () => {

     //checks if chrome object exist , then checks if chrome.storage exist 
    return !!chrome?.storage;
};
