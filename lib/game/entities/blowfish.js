// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <blowfish.js - root>

ig
    .module("game.entities.blowfish")
    .requires(
        "impact.entity",
        "game.sprite-sheet"
    )
    .defines(function () {
        /*
          BLOWFISH: {x: 47, y: 40},
          BLOWFISH_LARGE: {x: 60, y: 50},
          BLOWFISH_TINTED: {x: 47, y: 40},
          JEWEL: {x: 22, y: 43},
          JEWEL_OVER_BLOWFISH: {x: 47, y: 43},
        */
        EntityBlowfish = ig.Entity.extend({
            animSheet: new SpriteSheet(),
            bounciness: 1,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.ACTIVE,
            sprite_size: {x: 47, y: 40},
            type: ig.Entity.TYPE.A,

            init: function (x, y, settings) {
                this.max_size = {x: this.animSheet.width, y: this.animSheet.height};
                this.offset = {x: (this.animSheet.width - this.sprite_size.x) / 2 + 8, y: (this.animSheet.height - this.sprite_size.y) / 2 + 8};
                this.size = {x: this.sprite_size.x - 8 * 2, y: this.sprite_size.y - 8 * 2};

                this.addAnim("blowfish", 1, [this.animSheet.frame["blowfish"]]);
                this.addAnim("blowfish_large", 1, [this.animSheet.frame["blowfish_large"]]);

                this.parent(x, y, settings);
            },

            update: function () {
                this.currentAnim = this.anims.blowfish.rewind();
                this.parent();
            },

            on_click: function () {
            },

            on_mouse_over: function () {
                this.currentAnim = this.anims.blowfish_large.rewind();
            }
        });
    });
