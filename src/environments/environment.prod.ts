export const environment = {
    production: true,
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
