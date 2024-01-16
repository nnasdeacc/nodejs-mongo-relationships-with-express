const mongoose = require("mongoose");
const Product = require("./product");
const { Schema } = mongoose;

const farmSchema = new Schema({
	name: {
		type: String,
		required: [true, "Farm must have a name!"],
	},
	city: {
		type: String,
	},
	email: {
		type: String,
		required: [true, "Email required!"],
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

/**
 * The snippet below is a Mongoose Middleware (not the same as a Express Middleware)
 * and it runs specifically with the method .deleteMany() .
 * Any changes to the method used would imply modifying the .pre() or .post() method,
 * as well as the Middleware chained to that function.
 */
//
farmSchema.post("findOneAndDelete", async function (farm) {
	if (farm.products.length) {
		const res = await Product.deleteMany({ _id: { $in: farm.products } });
		console.log(res);
	}
});
const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;
