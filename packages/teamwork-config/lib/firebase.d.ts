export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    locationId: string;
    messagingSenderId: string;
    projectId: string;
    storageBucket: string;
}
export declare const firebase: {
    [index: string]: FirebaseConfig;
};
