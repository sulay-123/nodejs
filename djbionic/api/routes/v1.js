let express = require("express");
let router = express.Router();

/** Public image route */
router.use('/images', express.static("./public/images"));
router.use('/song',express.static("./public/song"))
router.use('/app',express.static("./public/app"))
/**
 * Import Route Files
 */
let auth = require("./route/auth.route");
let user = require("./route/users.route");
let common = require("./route/common.route");
let splashscreen = require("./route/splashscreen.route");
let song = require("./route/song.route");
let genric = require("./route/genric.route");
let genricsong = require("./route/genric.song.route")
let event = require("./route/event.route");
let contact =require("./route/contact.route");
let playlist = require("./route/playlist.route");
let playlistsong = require("./route/playlistsong.route")
let favourite = require("./route/favourite.route")
let radio = require("./route/radio.route")
let authAdmin = require("./route/admin/auth.route")
let usersAdmin = require("./route/admin/user.route")
let commonAdmin = require("./route/admin/common.route")
let genericAdmin = require("./route/admin/generic.route");
let songAdmin = require("./route/admin/song.route")
let eventAdmin = require("./route/admin/event.route")
let album = require("./route/album.route")
let albumAdmin = require("./route/admin/album.route")
let notificationAdmin = require("./route/admin/notification.route")
let splashscreenAdmin = require("./route/admin/splashscreen.route")
let radioadmin =require("./route/admin/radio.route")

/**
 * Routes - Mobile Application
 */
router.get("/", (req, res) => {
     res.send("Api Server For DJ BIONICO MIX")
 });
router.use("/auth", auth);
router.use("/common", common);
router.use("/user",user);
router.use("/song",song);
router.use('/splashscreen',splashscreen);
router.use('/genric',genric);
router.use('/genericsong',genricsong);
router.use('/event',event)
router.use('/contact',contact)
router.use('/playlist',playlist)
router.use('/playlistsong',playlistsong)
router.use('/favourite',favourite)
router.use('/radio',radio)
router.use('/album',album)

/**
 * Routes - Admin 
*/
   router.use("/admin/auth", authAdmin);
   router.use("/admin/user", usersAdmin);
   router.use("/admin/common", commonAdmin);
   router.use("/admin/genric",genericAdmin);
   router.use("/admin/song",songAdmin);
   router.use("/admin/event",eventAdmin);
   router.use("/admin/album",albumAdmin);
   router.use("/admin/notification",notificationAdmin)
   router.use("/admin/splashscreen", splashscreenAdmin);
   router.use('/admin/radio',radioadmin)
module.exports = router;
