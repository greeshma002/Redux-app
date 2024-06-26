// admin.controller.js

const adminCredentials = {
    email: 'admin@example.com',
    password: '123',
};

export const adminLogin = (req, res) => {
    const { email, password } = req.body;
    if (email === adminCredentials.email && password === adminCredentials.password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

export const adminhome = (req, res) => {
    console.log("hiiii");
    res.status(200).send("Welcome to admin home page");
};
