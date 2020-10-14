export function readFromStorage(key) {
    if (typeof window.localStorage !== 'undefined') {
        console.log(`Reading ${key} from local storage`);
        // Code for localStorage/sessionStorage.
        return localStorage.getItem(key);
    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant read local storage!');
    }
}

export function writeToStorage(key, value) {
    if (typeof window.localStorage !== 'undefined') {
        // Code for localStorage/sessionStorage.
        return localStorage.setItem(key, value);
    } else {
        // Sorry! No Web Storage support..
        throw new Error('Cant write to local storage!');
    }
}
