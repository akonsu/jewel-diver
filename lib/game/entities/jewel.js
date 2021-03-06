// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <jewel.js - root>

ig
    .module("game.entities.jewel")
    .requires(
        "game.entities.fading",
        "game.sprite-sheet"
    )
    .defines(function () {
        EntityJewel = EntityFading.extend({
            animSheet: new SpriteSheet(),
            bounciness: 1,
            sprite_size: {x: 47, y: 40},

            init: function (x, y, settings) {
                var MARGIN = {x: 2, y: 2};
                this.offset = {x: (this.animSheet.width - this.sprite_size.x) / 2 + MARGIN.x, y: (this.animSheet.height - this.sprite_size.y) / 2 + MARGIN.y};
                this.size = {x: this.sprite_size.x - MARGIN.x * 2, y: this.sprite_size.y - MARGIN.y * 2};

                this.addAnim("blowfish_jewel", 1, [this.animSheet.frame["blowfish_jewel"]]);
                this.addAnim("blowfish_transparent", 1, [this.animSheet.frame["blowfish_transparent"]]);
                this.addAnim("jewel", 1, [this.animSheet.frame["jewel"]]);

                this.currentAnim = this.anims.jewel.rewind();
                this.parent(x, y, settings);
            }
        });
    });
