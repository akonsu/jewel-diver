// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <background-fish.js - root>

ig
    .module("game.entities.background-fish")
    .requires(
        "impact.entity"
    )
    .defines(function() {
        var SIZE_FISH_LARGE = {x: 60, y: 38};
        var SIZE_FISH_MEDIUM = {x: 46, y: 28};
        var SIZE_FISH_SMALL = {x: 38, y: 24};
        var SIZE_FRAME = {x: 60, y: 38};

        var base = ig.Entity.extend({
            animSheet: new ig.AnimationSheet("media/background-fish.png", SIZE_FRAME.x, SIZE_FRAME.y),
            bounciness: 1

            ,
            time: 0,
            init: function (x, y, settings) {
                this.a = get_random_int(4, 8);
                this.b = this.a + get_random_int(0, 1) * 2 - 1;
                this.d = (get_random_int(0, 1) * 2 - 1 ) * Math.PI / get_random_int(1, 2);

                this.orig = {x: x, y: y};
                this.parent(x, y, settings);
            },
            update: function () {
                var t = this.time;
                this.time += 0.001;
                this.vel.x = Math.round(this.orig.x + 25 * Math.sin(this.a * t + this.d) - this.pos.x);
                this.vel.y = Math.round(this.orig.y + 25 * Math.sin(this.b * t) - this.pos.y);

                this.parent();
            }
        });

        function get_random_int(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        EntityBackgroundFishLarge = base.extend({
            offset: {x: (SIZE_FRAME.x - SIZE_FISH_LARGE.x) / 2 + 8, y: (SIZE_FRAME.y - SIZE_FISH_LARGE.y) / 2 + 8},
            size: {x: SIZE_FISH_LARGE.x - 8 * 2, y: SIZE_FISH_LARGE.y - 8 * 2},

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim("", 1, [0]);
            },
        });

        EntityBackgroundFishMedium = base.extend({
            offset: {x: (SIZE_FRAME.x - SIZE_FISH_MEDIUM.x) / 2 + 8, y: (SIZE_FRAME.y - SIZE_FISH_MEDIUM.y) / 2 + 8},
            size: {x: SIZE_FISH_MEDIUM.x - 8 * 2, y: SIZE_FISH_MEDIUM.y - 8 * 2},

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim("", 1, [1]);
            },
        });

        EntityBackgroundFishSmall = base.extend({
            offset: {x: (SIZE_FRAME.x - SIZE_FISH_SMALL.x) / 2 + 8, y: (SIZE_FRAME.y - SIZE_FISH_SMALL.y) / 2 + 8},
            size: {x: SIZE_FISH_SMALL.x - 8 * 2, y: SIZE_FISH_SMALL.y - 8 * 2},

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim("", 1, [2]);
            },
        });
    });
