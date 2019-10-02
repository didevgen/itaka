// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    urlAuthConfig: {
        singUP:
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
        signIn:
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
        deleteUser:
            'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=',
    },
    firebaseConfig: {
        apiKey: 'AIzaSyCPGOjrEl6_UhjQbKLYeb8vlOGOfjDSh8w',
        authDomain: 'itaka-9db8e.firebaseapp.com',
        databaseURL: 'https://itaka-9db8e.firebaseio.com',
        projectId: 'itaka-9db8e',
        storageBucket: 'itaka-9db8e.appspot.com',
        messagingSenderId: '135417569373',
        appId: '1:135417569373:web:3b4c6268e6df8658',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
