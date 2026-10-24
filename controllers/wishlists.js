const User = require("../models/user.js");

// Add listings in Wishlist 
module.exports.addToWishlist = async (req, res) => {
    let { id } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { wishlist: id }
    });

    req.flash("success", "Listing added to wishlist!");
    res.redirect(`/listings/${id}`);
};

// Remove listings from Wishlist 
module.exports.removeFromWishlist = async (req, res) => {
    let { id } = req.params;

    await User.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: id }
    });

    req.flash("success", "Listing removed from wishlist!");
    res.redirect("/wishlist");
};

// Render Wishlist of user
module.exports.renderWishlist = async (req, res) => {
    let user = await User.findById(req.user._id).populate("wishlist");
    res.render("wishlist.ejs", { user });
};