// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <background-fish.js - root>

ig
    .module("game.entities.background-fish")
    .requires(
        "impact.entity",
        "game.sprite-sheet",
        "game.utils"
    )
    .defines(function() {
        var base = ig.Entity.extend({
            _init_lissajous_curve: function () {
                var F_MIN = 1;
                var F_MAX = F_MIN + 7;
                this.a = get_random_int(F_MIN, F_MAX);
                this.b
                    = this.a <= F_MIN ? get_random_int(F_MIN + 1, F_MAX)
                    : this.a >= F_MAX ? get_random_int(F_MIN, F_MAX - 1)
                    : Math.random() < 0.5 ? get_random_int(F_MIN, this.a - 1) : get_random_int(this.a + 1, F_MAX);
                this.period = 2 * Math.PI / gcd(this.a, this.b);
            },

            _lissajous_curve: function () {
                var AMPLITUDE_X = 20;
                var AMPLITUDE_Y = 20;
                return {
                    x: this.orig.x + AMPLITUDE_X * Math.sin(this.a * this.time),
                    y: this.orig.y + AMPLITUDE_Y * Math.sin(this.b * this.time)
                }
            },

            animSheet: new SpriteSheet(),
            bounciness: 1,
            frame_name: "",
            sprite_size: {x: 0, y: 0},

            init: function (x, y, settings) {
                this.offset = {x: (this.animSheet.framesize.x - this.sprite_size.x) / 2 + 8, y: (this.animSheet.framesize.y - this.sprite_size.y) / 2 + 8};
                this.size = {x: this.sprite_size.x - 8 * 2, y: this.sprite_size.y - 8 * 2};

                this._init_lissajous_curve();

                this.orig = {x: x + get_random_int(-30, 30), y: y + get_random_int(-30, 30)};
                this.time = 0;

                var p = this._lissajous_curve();

                this.addAnim("", 1, [this.animSheet.frame[this.frame_name]]);
                this.parent(p.x, p.y, settings);
            },

            update: function () {
                this.time += 0.002;

                if (this.time > this.period)
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

        EntityBackgroundFishLarge = base.extend({
            frame_name: "background_fish_large",
            sprite_size: {x: 60, y: 38}
        });

        EntityBackgroundFishMedium = base.extend({
            frame_name: "background_fish_medium",
            sprite_size: {x: 46, y: 28}
        });

        EntityBackgroundFishSmall = base.extend({
            frame_name: "background_fish_small",
            sprite_size: {x: 38, y: 24}
        });
    });
