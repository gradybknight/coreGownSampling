import axios from 'axios';

export function getUsersInCore() {
    axios.get('http://50.19.1.144:3000/usersincore')
        .then(function (response) {
            console.log(response);
            return(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}