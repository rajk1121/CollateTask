const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const DB = "mongodb+srv://rajk1121:Rajat1121@cluster0-chamy.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(DB, {
    useNewUrlParser: true
}).then(conn => {
    // console.log(conn.connection);
    console.log('Connnected to DataBase');


});

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        validate: function abc(val) {
            var str = val.split(" ").join("");
            if (!validator.isAlpha(str)) {
                throw new Error("Name contains numerics");
            }

        }
    },
    password: {
        type: String,
        required: true,
        validate: function abc(val) {
            if (!validator.isLength(val, { min: 8, max: undefined }) || !validator.isAlphanumeric(val)) {
                throw new Error("Password should be alphanumeric. Passwordlength is too short. Should be minimum of 8 in length")
            }
        }
    },
    email: {
        type: String, required: true, unique: true,
        validate: validator.isEmail
    }

})
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    console.log('Insode pre');
    next();
})
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userModels'
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Not Started', 'Ongoing', 'Completed']
    }
})
const UserModels = mongoose.model('CollateUserModel', UserSchema);
const TaskModels = mongoose.model('CollateTaskModel', TaskSchema);

module.exports.userModels = UserModels;
module.exports.TaskModels = TaskModels;