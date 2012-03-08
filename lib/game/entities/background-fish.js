// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <background-fish.js - root>

ig
    .module("game.entities.background-fish")
    .requires(
        "impact.entity"
    )
    .defines(function() {
        var SIZE = {
            FISH_LARGE: {x: 60, y: 38},
            FISH_MEDIUM: {x: 46, y: 28},
            FISH_SMALL: {x: 38, y: 24},
            FRAME: {x: 60, y: 50}
/*
            BLOWFISH: {x: 47, y: 40},
            BLOWFISH_LARGE: {x: 60, y: 50},
            BLOWFISH_TINTED: {x: 47, y: 40},
            JEWEL: {x: 22, y: 43},
            JEWEL_OVER_BLOWFISH: {x: 47, y: 43},
*/
        };


        var base = ig.Entity.extend({
            _init_lissajous_curve: function () {
                this.a = get_random_int(2, 8);
                this.b = this.a + get_random_int(0, 1) * 2 - 1;
            },

            _lissajous_curve: function () {
                var AMPLITUDE_X = 20;
                var AMPLITUDE_Y = 20;
                return {
                    x: this.orig.x + AMPLITUDE_X * Math.sin(this.a * this.time),
                    y: this.orig.y + AMPLITUDE_Y * Math.sin(this.b * this.time)
                }
            },

            animSheet: new ig.AnimationSheet("media/sprites.png", SIZE.FRAME.x, SIZE.FRAME.y),
            bounciness: 1,

            init: function (x, y, settings) {
                this._init_lissajous_curve();

                this.orig = {x: x + get_random_int(-30, 30), y: y + get_random_int(-30, 30)};
                this.time = 0;

                var p = this._lissajous_curve();

                this.parent(p.x, p.y, settings);
            },

            update: function () {
                this.time += 0.001;

                // the fundamental period of a Lissajous curve is never bigger than 2 * Math.PI
                if (this.time > 2 * Math.PI)
                {
                    this.time = 0;
                    this._init_lissajous_curve();
                }

                var p = this._lissajous_curve();

                this.vel.x = Math.round(p.x - this.pos.x);
                this.vel.y = Math.round(p.y - this.pos.y);

                this.parent();
            }
        });

        function get_random_int(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        EntityBackgroundFishLarge = base.extend({
            offset: {x: (SIZE.FRAME.x - SIZE.FISH_LARGE.x) / 2 + 8, y: (SIZE.FRAME.y - SIZE.FISH_LARGE.y) / 2 + 8},
            size: {x: SIZE.FISH_LARGE.x - 8 * 2, y: SIZE.FISH_LARGE.y - 8 * 2},

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim("", 1, [5]);
            },
        });

        EntityBackgroundFishMedium = base.extend({
            offset: {x: (SIZE.FRAME.x - SIZE.FISH_MEDIUM.x) / 2 + 8, y: (SIZE.FRAME.y - SIZE.FISH_MEDIUM.y) / 2 + 8},
            size: {x: SIZE.FISH_MEDIUM.x - 8 * 2, y: SIZE.FISH_MEDIUM.y - 8 * 2},

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim("", 1, [6]);
            },
        });

        EntityBackgroundFishSmall = base.extend({
            offset: {x: (SIZE.FRAME.x - SIZE.FISH_SMALL.x) / 2 + 8, y: (SIZE.FRAME.y - SIZE.FISH_SMALL.y) / 2 + 8},
            size: {x: SIZE.FISH_SMALL.x - 8 * 2, y: SIZE.FISH_SMALL.y - 8 * 2},

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim("", 1, [7]);
            },
        });
    });
