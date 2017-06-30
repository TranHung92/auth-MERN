const mongoose 		= require('mongoose'),
			Schema 			= mongoose.Schema,
			bcrypt 			= require('bcrypt-nodejs');

const userSchema = new Schema({
	// username: String,
	email: { type: String, unique: true, lowercase: true },
	password: String,
	// photo: String
});

userSchema.pre('save', function(next) {
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if(err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;