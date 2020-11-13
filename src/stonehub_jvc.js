// ==UserScript==
// @name         stonehub_jvc
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @description  add some chat features : jvc stickers, jvc smileys and youtube videos directly integrated into Idlescape
// @author       godi, weld, gamergeo, flo, jiggyjinjo
// @match        https://idlescape.com/game*
// @run-at       document-start
// ==/UserScript==

class Smiley {
    constructor(shortcut, imgLink, width, height) {
        this.shortcut = shortcut;
        this.imgLink = imgLink;
        this.width = width;
        this.height = height;
    }
}

class App_constants {
    static extension_id = 'jvc';
    static status_refresh_time = 3000;
    static refresh_rate = 50;

    static get_chat_message_container_box() {
        return document.getElementsByClassName('chat-message-container-box')[0]?.children[3]?.children[0]?.children[0]?.children ?? [];
    }

    static get_stonehub_status() {
        return document.getElementById('stonehub_status');
    }

    static noelshack_uri = 'image.noelshack.com/fichiers/';
    static smiley_list = [
        new Smiley(':)', 'image.jeuxvideo.com/smileys_img/1.gif', 16, 16),
        new Smiley(':snif:', 'image.jeuxvideo.com/smileys_img/20.gif', 16, 16),
        new Smiley(':gba:', 'image.jeuxvideo.com/smileys_img/17.gif', 16, 12),
        new Smiley(':g)', 'image.jeuxvideo.com/smileys_img/3.gif', 16, 16),
        new Smiley(':-)', 'image.jeuxvideo.com/smileys_img/46.gif', 16, 16),
        new Smiley(':snif2:', 'image.jeuxvideo.com/smileys_img/13.gif', 16, 16),
        new Smiley(':bravo:', 'image.jeuxvideo.com/smileys_img/69.gif', 16, 17),
        new Smiley(':d)', 'image.jeuxvideo.com/smileys_img/4.gif', 16, 16),
        new Smiley(':hap:', 'image.jeuxvideo.com/smileys_img/18.gif', 16, 16),
        new Smiley(':ouch:', 'image.jeuxvideo.com/smileys_img/22.gif', 16, 16),
        new Smiley(':pacg:', 'image.jeuxvideo.com/smileys_img/9.gif', 16, 16),
        new Smiley(':cd:', 'image.jeuxvideo.com/smileys_img/5.gif', 16, 16),
        new Smiley(':-)))', 'image.jeuxvideo.com/smileys_img/23.gif', 16, 16),
        new Smiley(':ouch2:', 'image.jeuxvideo.com/smileys_img/57.gif', 16, 16),
        new Smiley(':pacd:', 'image.jeuxvideo.com/smileys_img/10.gif', 16, 16),
        new Smiley(':cute:', 'image.jeuxvideo.com/smileys_img/nyu.gif', 16, 17),
        new Smiley(':content:', 'image.jeuxvideo.com/smileys_img/24.gif', 16, 16),
        new Smiley(':p)', 'image.jeuxvideo.com/smileys_img/7.gif', 16, 16),
        new Smiley(':-p', 'image.jeuxvideo.com/smileys_img/31.gif', 16, 12),
        new Smiley(':noel:', 'image.jeuxvideo.com/smileys_img/11.gif', 16, 16),
        new Smiley(':oui:', 'image.jeuxvideo.com/smileys_img/37.gif', 16, 16),
        new Smiley(':(', 'image.jeuxvideo.com/smileys_img/45.gif', 16, 16),
        new Smiley(':peur:', 'image.jeuxvideo.com/smileys_img/47.gif', 16, 17),
        new Smiley(':question:', 'image.jeuxvideo.com/smileys_img/2.gif', 26, 24),
        new Smiley(':cool:', 'image.jeuxvideo.com/smileys_img/26.gif', 16, 16),
        new Smiley(':-(', 'image.jeuxvideo.com/smileys_img/14.gif', 16, 16),
        new Smiley(':coeur:', 'image.jeuxvideo.com/smileys_img/54.gif', 21, 20),
        new Smiley(':mort:', 'image.jeuxvideo.com/smileys_img/21.gif', 16, 16),
        new Smiley(':rire:', 'image.jeuxvideo.com/smileys_img/39.gif', 16, 16),
        new Smiley(':-((', 'image.jeuxvideo.com/smileys_img/15.gif', 16, 16),
        new Smiley(':fou:', 'image.jeuxvideo.com/smileys_img/15.gif', 16, 16),
        new Smiley(':sleep:', 'image.jeuxvideo.com/smileys_img/15.gif', 23, 26),
        new Smiley(':-D', 'image.jeuxvideo.com/smileys_img/40.gif', 16, 16),
        new Smiley(':nonnon:', 'image.jeuxvideo.com/smileys_img/25.gif', 16, 16),
        new Smiley(':fier:', 'image.jeuxvideo.com/smileys_img/53.gif', 16, 16),
        new Smiley(':honte:', 'image.jeuxvideo.com/smileys_img/30.gif', 16, 16),
        new Smiley(':rire2:', 'image.jeuxvideo.com/smileys_img/41.gif', 16, 16),
        new Smiley(':non2:', 'image.jeuxvideo.com/smileys_img/33.gif', 16, 16),
        new Smiley(':sarcastic:', 'image.jeuxvideo.com/smileys_img/43.gif', 16, 16),
        new Smiley(':monoeil:', 'image.jeuxvideo.com/smileys_img/34.gif', 16, 16),
        new Smiley(':o))', 'image.jeuxvideo.com/smileys_img/12.gif', 16, 16),
        new Smiley(':nah:', 'image.jeuxvideo.com/smileys_img/19.gif', 16, 16),
        new Smiley(':doute:', 'image.jeuxvideo.com/smileys_img/28.gif', 16, 16),
        new Smiley(':rouge:', 'image.jeuxvideo.com/smileys_img/55.gif', 16, 16),
        new Smiley(':ok:', 'image.jeuxvideo.com/smileys_img/36.gif', 24, 16),
        new Smiley(':non:', 'image.jeuxvideo.com/smileys_img/35.gif', 16, 16),
        new Smiley(':malade:', 'image.jeuxvideo.com/smileys_img/8.gif', 16, 16),
        new Smiley(':fete:', 'image.jeuxvideo.com/smileys_img/66.gif', 26, 21),
        new Smiley(':sournois:', 'image.jeuxvideo.com/smileys_img/67.gif', 16, 16),
        new Smiley(':hum:', 'image.jeuxvideo.com/smileys_img/68.gif', 16, 16),
        new Smiley(':ange:', 'image.jeuxvideo.com/smileys_img/60.gif', 31, 24),
        new Smiley(':fou:', 'image.jeuxvideo.com/smileys_img/15.gif', 16, 16),
        new Smiley(':sleep:', 'image.jeuxvideo.com/smileys_img/15.gif', 23, 26),
        new Smiley(':diable:', 'image.jeuxvideo.com/smileys_img/61.gif', 35, 20),
        new Smiley(':gni:', 'image.jeuxvideo.com/smileys_img/62.gif', 16, 27),
        new Smiley(':play:', 'image.jeuxvideo.com/smileys_img/play.gif', 19, 28),
        new Smiley(':desole:', 'image.jeuxvideo.com/smileys_img/65.gif', 47, 39),
        new Smiley(':spoiler:', 'image.jeuxvideo.com/smileys_img/63.gif', 50, 34),
        new Smiley(':merci:', 'image.jeuxvideo.com/smileys_img/58.gif', 44, 40),
        new Smiley(':svp:', 'image.jeuxvideo.com/smileys_img/59.gif', 50, 39),
        new Smiley(':sors:', 'image.jeuxvideo.com/smileys_img/56.gif', 50, 34),
        new Smiley(':salut:', 'image.jeuxvideo.com/smileys_img/42.gif', 46, 41),
        new Smiley(':rechercher:', 'image.jeuxvideo.com/smileys_img/38.gif', 50, 34),
        new Smiley(':hello:', 'image.jeuxvideo.com/smileys_img/29.gif', 45, 41),
        new Smiley(':up:', 'image.jeuxvideo.com/smileys_img/44.gif', 37, 42),
        new Smiley(':bye:', 'image.jeuxvideo.com/smileys_img/48.gif', 44, 42),
        new Smiley(':gne:', 'image.jeuxvideo.com/smileys_img/51.gif', 65, 46),
        new Smiley(':lol:', 'image.jeuxvideo.com/smileys_img/32.gif', 37, 44),
        new Smiley(':dpdr:', 'image.jeuxvideo.com/smileys_img/49.gif', 64, 44),
        new Smiley(':dehors:', 'image.jeuxvideo.com/smileys_img/52.gif', 58, 57),
        new Smiley(':hs:', 'image.jeuxvideo.com/smileys_img/64.gif', 51, 32),
        new Smiley(':banzai:', 'image.jeuxvideo.com/smileys_img/70.gif', 49, 42),
        new Smiley(':bave:', 'image.jeuxvideo.com/smileys_img/71.gif', 16, 16),
        new Smiley(':pf:', 'image.jeuxvideo.com/smileys_img/pf.gif', 16, 16),
        new Smiley(':cimer:', 'image.jeuxvideo.com/smileys_img/cimer.gif', 57, 36),
        new Smiley(':ddb:', 'image.jeuxvideo.com/smileys_img/ddb.gif', 49, 40),
        new Smiley(':pave:', 'image.jeuxvideo.com/smileys_img/pave.gif', 51, 43),
        new Smiley(':objection:', 'image.jeuxvideo.com/smileys_img/objection.gif', 54, 34),
        new Smiley(':siffle:', 'image.jeuxvideo.com/smileys_img/siffle.gif', 22, 16),
    ];
}

class Stonehub_jvc {
    constructor() {
        this.status_div;
        this.activated_extensions = {
            stonehub: false,
            updateui: false,
            jvc: false,
        };
    }

    error_handler(that, e) {
        let alert_msg =
            'Something went wrong with Stonehub_jvc ! \nError msg: ' + e.message + '\nPlease reload the page or contact messenoire / Gamergeo / Godi';
        console.log(alert_msg);
        //alert(alert_msg);
    }

    start() {
        let that = this;

        // wait for loading to complete, then check which ext is activated
        let page_ready = setInterval(() => {
            if (document.readyState == 'complete') {
                clearInterval(page_ready);
                that.set_status(that);
                that.retrieve_status_div(that);
            }
        }, 200);

        // launch jvc daemon
        setInterval(() => {
            try {
                that.jvc_main(that);
            } catch (e) {
                that.error_handler(that, e);
            }
        }, App_constants.refresh_rate);
    }
}

Stonehub_jvc.prototype.create_status_div = function () {
    /**
     * <div id='stonehub_status'></div>
     */
    const sdiv = document.createElement('div');
    sdiv.id = 'stonehub_status';
    sdiv.style.display = 'none';
    document.body.appendChild(sdiv);
    return App_constants.get_stonehub_status();
};

Stonehub_jvc.prototype.set_status = function (that) {
    if (!that.activated_extensions.stonehub) {
        that.status_div = that.status_div ?? that.create_status_div();
        let ext_status = document.createElement('div');
        ext_status.id = App_constants.extension_id;
        that.status_div.appendChild(ext_status);
    }
};

Stonehub_jvc.prototype.retrieve_status_div = function (that) {
    /**
     * Checks inside <div id='stonehub_status'></div> which script is activated
     * and update its state inside this.activated_extensions
     */
    setInterval(() => {
        that.status_div = that.status_div ?? that.create_status_div();
        [...that.status_div.children].forEach((ext) => {
            that.activated_extensions[ext.id] = true;
        });
    }, App_constants.status_refresh_time);
};

Stonehub_jvc.prototype.int_to_commas = function (x) {
    // src https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

Stonehub_jvc.prototype.youtube_parser = function (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
};

Stonehub_jvc.prototype.jvc_main = function (that) {
    // This function is called every "refreshRate" seconds
    [...App_constants.get_chat_message_container_box()].forEach((node) => {
        that.jvc_parse_stickers(node);
        //         that.jvc_parse_youtube(that, node);
        that.jvc_parse_smileys(node);
    });
};

Stonehub_jvc.prototype.jvc_parse_stickers = function (node) {
    // Add jvc stickers videos inside chatbox when linked
    if (node.textContent.includes(App_constants.noelshack_uri)) {
        let links = node.children[0].children[1].children;
        [...links].forEach((l) => {
            if (l.innerHTML.includes(App_constants.noelshack_uri)) {
                let img_url = l.innerHTML;
                l.outerHTML = '<a href="' + img_url + '" target="_blank"><img src="' + img_url + '" alt="sticker" width="32" height="24"><a>';
            }
        });
    }
};

Stonehub_jvc.prototype.jvc_parse_youtube = function (that, node) {
    // Add youtube videos inside chatbox when linked
    if (node.textContent.includes('youtube.com')) {
        let links = node.children[0].children[1].children;
        [...links].forEach((l) => {
            if (l.innerHTML.includes('youtube.com')) {
                let video_url = that.youtube_parser(l.innerHTML);
                l.outerHTML =
                    '<iframe width="200" height="150" src=https://www.youtube.com/embed/' +
                    video_url +
                    ' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            }
        });
    }
};

Stonehub_jvc.prototype.jvc_parse_smileys = function (node) {
    // Add jvc smileys inside chatbox when used
    try {
        let msg_content = node.textContent.substring(node.textContent.indexOf(']: ') + 3);
        if (msg_content.includes(':')) {
            App_constants.smiley_list.forEach((s) => {
                while (msg_content.includes(s.shortcut)) {
                    node.innerHTML = node.innerHTML.replace(
                        s.shortcut,
                        '<img src="https://' + s.imgLink + '" alt="smiley" width="' + s.width + '" height="' + s.height + '">'
                    );
                    msg_content = node.textContent.substring(node.textContent.indexOf(']: ') + 3);
                }
            });
        }
    } catch (e) {
        console.log(e.message);
    }
};

let s = new Stonehub_jvc();
s.start();
