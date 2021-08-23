const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const { isEmail } = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Masukkin Email Dong'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Tolong masukkan email yang valid'],
    },
    password: {
        type: String,
        required: [true, 'Masukkin password dong'],
        minLength: [6, 'Minimal panjang password itu 6 characters'],
    },
    name: {
        type: String,
    },
});

//mongo hook ini, ketika sebuah fungsi(save,delete,dls) terjadi maka akan di tembak di models ini

// // fungsi setelah doc tersimpan ke databasenya, maka fungsi ini dipanggil
// userSchema.post('save', function (doc, next) {
//    console.log('new user was created & saved', doc);
//    next();
// });

//fungsi sebelum doc tersimpan ke databasenya, maka fungsi ini dipanggil
userSchema.pre('save', async function (next) {
    console.log('Seorang user mencoba register');
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//buat method sendiri, sejenis buat save,create,delete.
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Password Salah');
    }
    throw Error('salah email');
};
const User = mongoose.model('user', userSchema);

module.exports = User;
