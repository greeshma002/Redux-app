import React, { useState } from 'react';



const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5173/api/admin', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log("hiiiiiiiiiii");

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            console.log('Login successful!');
            setLoggedIn(true);
            
        } catch (error) {
            setError(error.message);
        }
    };

    if (loggedIn) {
         window.location.href = '/adminhome'
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-1/2">
                <img
                src="https://home.microsoftpersonalcontent.com/contentstorage/coJsE0OdIkqu2uEOCncHOQAAAAAAAAAAd2N7X86f-jI/_layouts/15/download.aspx?UniqueId=5f855a62-4f88-49dc-a328-a7a58239dbea&Translate=false&tempauth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfZGlzcGxheW5hbWUiOiJEZXNpZ25lciIsImFwcGlkIjoiNWUyNzk1ZTMtY2U4Yy00Y2ZiLWIzMDItMzVmZTVjZDAxNTk3IiwiYXVkIjoiMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwL2hvbWUubWljcm9zb2Z0cGVyc29uYWxjb250ZW50LmNvbUA5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJjYWNoZWtleSI6IjBoLmZ8bWVtYmVyc2hpcHwwMDAzNDAwMTRhMWJjNzJhQGxpdmUuY29tIiwiY2lkIjoib1RXcEl2MUFBRkQyUE5FNnVRc1IvUT09IiwiZW5kcG9pbnR1cmwiOiJRczRqVUoxL3BJTmFmQXg4bUFkRzhIclB6Z1VjK2hPNnhaeDlGODFKQmFZPSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTg4IiwiZXhwIjoiMTcxOTIwNTExOSIsImlwYWRkciI6IjUyLjExMS4xOTQuMjAiLCJpc2xvb3BiYWNrIjoiVHJ1ZSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE3MTkyMDE1MTkiLCJwdWlkIjoiMDAwMzQwMDE0QTFCQzcyQSIsInNjcCI6Im15ZmlsZXMud3JpdGUgY29udGFpbmVyLnNlbGVjdGVkIiwic2lnbmluX3N0YXRlIjoiW1wia21zaVwiXSIsInNpdGVpZCI6IlpETTVNVEUzT0RJdE1UWXdOQzAwTWpVeExUaGxOR0l0TURBNFptTXpNamczWVdKaCIsInRpZCI6IjkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsInR0IjoiMiIsInVwbiI6ImdyZWVzaG1hMjQyMDAyQGdtYWlsLmNvbSIsInZlciI6Imhhc2hlZHByb29mdG9rZW4ifQ.P3nQHS24lTUd9GvqAX2LPxrH-xiMWyI14GCw-V-v53I&ApiVersion=2.1"
                    alt="Login"
                    className="max-w-full h-auto"
                />
            </div>
            <div className="max-w-md mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6">WELCOME ADMIN !!</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-100 p-3 rounded-lg text-xl w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-slate-100 p-3 rounded-lg text-xl w-full"
                    />
                    <button
                        type="submit" // Ensure this is a submit button
                        className="bg-violet-400 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
