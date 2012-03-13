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
                var MARGIN = {x: 2, y: 2};
                var VELOCITY = {
                    MAX: {x: 100, y: 100},
                    MIN: {x: 40, y: 40}
                };

                this.max_size = {x: this.animSheet.width, y: this.animSheet.height};
                this.min_speed = Math.sqrt(VELOCITY.MIN.x * VELOCITY.MIN.x + VELOCITY.MIN.y * VELOCITY.MIN.y);
                this.offset = {x: (this.animSheet.width - this.sprite_size.x) / 2 + MARGIN.x, y: (this.animSheet.height - this.sprite_size.y) / 2 + MARGIN.y};
                this.size = {x: this.sprite_size.x - MARGIN.x * 2, y: this.sprite_size.y - MARGIN.y * 2};
                this.timer = new ig.Timer(get_random(0.5, 3));

                this.addAnim("blowfish", 1, [this.animSheet.frame["blowfish"]]);
                this.addAnim("blowfish_large", 1, [this.animSheet.frame["blowfish_large"]]);

                this.vel.x = get_random_int(VELOCITY.MIN.x, VELOCITY.MAX.x) * (get_random_int(0, 1) * 2 - 1);
                this.vel.y = get_random_int(VELOCITY.MIN.y, VELOCITY.MAX.y) * (get_random_int(0, 1) * 2 - 1);

                this.parent(x, y, settings);
            },

            update: function () {
                if (this.timer.delta() > 0) {
                    var angle = Math.atan2(this.vel.y, this.vel.x) + Math.PI / get_random(4, 5) * (get_random_int(0, 1) * 2 - 1);
                    var speed = Math.max(this.min_speed, Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y));

                    this.vel.x = Math.cos(angle) * speed;
                    this.vel.y = Math.sin(angle) * speed;

                    this.timer.set(get_random(0.5, 3));
                }
                this.currentAnim = this.anims.blowfish.rewind();
                this.parent();
            },

            on_click: function () {
                if (typeof(on_correct_answer) === "function") {
                    on_correct_answer();
                }
            },

            on_mouse_over: function () {
                this.currentAnim = this.anims.blowfish_large.rewind();
            }
        });
    });
