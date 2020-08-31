/*****************************************************************
* auth_helper.js
******************************************************************
* CONTRIBUTORS:
* Andrew T. Garrett
*
* CONTENTS:
* Authentication helper class.
*****************************************************************/
import decode from 'jwt-decode';

export default class AuthService {
    constructor() {
        this.APIDomain = process.env.REACT_APP_RENTABLE_API_URL;
        this.error = false;
    }
    
    sign_in = (credentials) => {
        return this.authFetch(`${this.APIDomain}/users/login`, {
			method: "POST",
			body: JSON.stringify(credentials),
		})
		.then(response => {
			response.json()
			.then(data => {
				if(data.token) {
					console.log(data.token);
					this.setToken(data.token);
					return data.token;
				} else {
					this.error = true;
				}
			})
			.catch(err => {
				console.log(err);
				return err;
			});
		});
    }

    register = (user) => {
		console.log('register method:', user);
		return this.authFetch(`${this.APIDomain}/users`, {
			method: "POST",
			body: JSON.stringify(user),
		})
		.then(response => {
            response.json()
            .then(data => {
                console.log(data.token);
                this.setToken(data.token);
                return response;
            });
		})
	}

    // ATG:: CHECK IF THE TOKEN EXISTS AND ISN'T EXPIRED
	loggedIn() {
		const token = this.getToken();
		return !!token && !this.isTokenExpired(token);
	}

    // ATG:: CHECK IF TOKEN IS EXPIRED
	isTokenExpired(token) {
		try {
			const decoded = decode(token)
			if (decoded.exp < Date.now() / 1000) {
				return true
			} else {
				return false
			}
		}
		catch (err) {
			return false;
		}
	}

    // ATG:: SET TOKEN INTO LOCAL STORAGE
    setToken(token) {
        if(token === null){
            console.log("No token available.");
        } else {
            localStorage.setItem('id_token', token);
        }
    }
    
    // ATG:: RETRIEVE TOKEN FROM LOCAL STORAGE
    getToken() {
		return localStorage.getItem('id_token')
	}

    // ATG:: FUNCTION TO ADD TOKEN HEADER TO FETCH REQUEST
    authFetch = (url, options) => {
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		if (this.loggedIn()) {
			headers['Authorization'] = 'Bearer ' + this.getToken();
		}

		return fetch(url, {
			headers,
			...options
		})
		.then(apiResponse => {
            // console.log(apiResponse);
            return apiResponse;
        })
		.catch(err => {
			console.log("::: FETCH ERROR CAUGHT:::", err)
			return err
		})
	}

} // END OF CLASS