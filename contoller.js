const jsonwebtoken = require('jsonwebtoken')
const Models = require('./userModels')
const userModel = Models.userModels;
const taskModel = Models.TaskModels;
const bcrypt = require('bcrypt')
const SECRET_KEY = "SECREET_KEY";
const middleware = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            if (req.cookies.jwt != 'logout') {
                let decoded = jsonwebtoken.verify(req.cookies.jwt, SECRET_KEY);
                if (!decoded) {
                    res.status(201).json({
                        status: "User not logged in"
                    })
                    return;
                }
                // console.log(decoded)

                var dbdata = await userModel.findById(decoded.id);
                if (!dbdata) {
                    res.status(201).json({
                        status: "User not logged in"
                    })
                    return;
                }
                next();
            } else {
                res.status(201).json({
                    status: "User not logged in"
                })
                return;
            }
        } else {

            res.status(400).json({
                status: "User not logged in"
            })
            return;
        }
    } catch (err) {
        res.status(400).json({
            status: "User Not logged In",
            err: err
        })
    }
}
const login = async (req, res) => {
    try {
        let data = req.body;
        if (!data.email || !data.password) {

            res.end('Information Not Available');
        }
        let dbdata = await userModel.findOne({
            email: data.email
        });

        if (!dbdata) {
            res.end("User Not Found");
        }

        let ans = await bcrypt.compare(data.password, dbdata.password);
        if (!ans) {
            res.status(400).json({ status: "Password Incorrect" });
        }
        let token = jsonwebtoken.sign({ id: dbdata._id }, SECRET_KEY, { expiresIn: "3h" });

        res.cookie("jwt", token, { "httpOnly": true });

        res.status(201).json({
            status: "Logged In"
        })
    }
    catch (err) {
        // console.log(err)
        res.status(400).json({
            status: "Error login",
            err: err
        })
    }


}
const signup = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        if (!data.email || !data.password || !data.name) {
            res.status(404).json({
                status: "Invalid Creds"
            })
        }
        else {
            let result = await userModel.create(data);
            let token = jsonwebtoken.sign({ id: result._id }, SECRET_KEY, { expiresIn: "1d" });
            res.cookie("jwt", token, { "httpOnly": true })
            res.status(201).json({
                status: "Registration Successfull",
                result
            })
        }

    }
    catch (err) {
        res.status(400).json({
            status: "Error",
            err: err
        })
    }
}
const create = async (req, res) => {
    try {
        let data = req.body;
        if (!data.name || !data.description || !data.deadline || !data.status) {
            res.status(400).json({
                status: "Invalid Body"
            })
        }
        else {
            let decoded = jsonwebtoken.verify(req.cookies.jwt, SECRET_KEY);
            data.user = decoded.id
            console.log("hello")
            let result = await taskModel.create(data)
            res.status(201).json({
                status: "Created",
                result: result
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "Error create",
            err: err
        })
    }
}
const update = async (req, res) => {
    try {
        let data = req.body;
        if (!data.name && !data.description && !data.created && !data.deadline && !data.status) {
            res.status(400).json({
                status: "Invalid Body"
            })
            return;
        }
        let id = req.query.id;
        let decoded = jsonwebtoken.verify(req.cookies.jwt, SECRET_KEY);
        console.log(decoded)
        let resultOne = await taskModel.findById(id);
        console.log(resultOne)
        if (resultOne.user._id != decoded.id) {
            res.status(400).json({
                status: "Permission denied"
            })
        }
        else {
            let result = await taskModel.findByIdAndUpdate(id, data, { new: true });

            res.status(201).json({
                status: "Updated",
                result: result
            })
        }
    } catch (err) {
        res.status(400).json({
            status: "Error update",
            err: err
        })
    }
}
const remove = async (req, res) => {
    try {
        let id = req.query.id;
        let decoded = jsonwebtoken.verify(req.cookies.jwt, SECRET_KEY);
        let resultOne = await taskModel.findById(id);
        if (resultOne.user._id != decoded.id) {
            res.status(400).json({
                status: "Permission denied"
            })
            return
        }
        let result = await userModel.findByIdAndDelete(id)


        res.status(201).json({
            status: "Deleted",
            results: result
        })
    } catch (err) {
        res.status(400).json({
            status: "Error remove",
            err: err
        })
    }
}
const getAll = async (req, res) => {
    try {
        console.log(req.cookies)
        let decoded = jsonwebtoken.verify(req.cookies.jwt, SECRET_KEY);
        if (!decoded) {
            res.json(201).json({
                status: "User not logged in"
            })
        }
        let result = await taskModel.find({ 'user': decoded.id })
        res.status(201).json({
            status: "Success",
            result: result
        })


    } catch (err) {
        res.status(400).json({
            status: "Error getlll",
            err: err
        })
    }
}
const getAllTasks = async (req, res) => {
    try {

        console.log("dbd")
        let result = await taskModel.find();
        res.status(201).json({
            result: result
        })
    } catch (err) {
        res.status(400).json({
            err: err
        })
    }
}
const logout = (req, res) => {
    try {
        res.cookie("jwt", "logout", { "httpOnly": true });
        res.status(200).json({
            status: "Logout Successfull"
        })
    } catch (err) {
        res.json(400).json({
            status: "Error"
        })
    }
}
module.exports = { create, update, login, signup, middleware, remove, getAll, getAllTasks, logout }