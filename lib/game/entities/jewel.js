// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <jewel.js - root>

ig
    .module("game.entities.jewel")
    .requires(
        "impact.entity",
        "game.sprite-sheet"
    )
    .defines(function () {
        EntityJewel = ig.Entity.extend({
            animSheet: new SpriteSheet(),
            bounciness: 1,
            sprite_size: {x: 47, y: 40},

            init: function (x, y, fadein_interval, settings) {
                var MARGIN = {x: 5, y: 2};

                this.addAnim("jewel", 1, [this.animSheet.frame["jewel"]]);

                this.currentAnim = this.anims.jewel.rewind();
                this.offset = {x: (this.animSheet.width - this.sprite_size.x) / 2 + MARGIN.x, y: (this.animSheet.height - this.sprite_size.y) / 2 + MARGIN.y};
                this.size = {x: this.sprite_size.x - MARGIN.x * 2, y: this.sprite_size.y - MARGIN.y * 2};

                if (fadein_interval > 0) {
                    this.currentAnim.alpha = 0;
                    this.fadein_interval = fadein_interval;
                    this.timer = new ig.Timer();
                }
                this.parent(x, y, settings);
            },

            update: function () {
                if (this.currentAnim.alpha < 1 && this.fadein_interval > 0 && this.timer) {
                    this.currentAnim.alpha = Math.min(1, this.timer.delta() / this.fadein_interval);
                }
                this.parent();
            }
        });
    });
