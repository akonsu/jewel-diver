// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <background-fish.js - root>

ig
    .module("game.entities.background-fish")
    .requires(
        "impact.entity"
    )
    .defines(function() {
        var FRAME_SIZE = {x: 60, y: 38};

        EntityBackgroundFish = ig.Entity.extend({
            bounciness: 1,
            offset: {x: 8, y: 8},
            size: {x: FRAME_SIZE.x - 8 * 2, y: FRAME_SIZE.y - 8 * 2},

            animSheet: new ig.AnimationSheet("media/background-fish.png", FRAME_SIZE.x, FRAME_SIZE.y),

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim("large", 1, [0]);
                this.addAnim("medium", 1, [1]);
                this.addAnim("small", 1, [2]);
            },

            update: function() {
                this.parent();
            }
        });
    });
