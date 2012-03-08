// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <sprite-sheet.js - root>

ig
    .module("game.sprite-sheet")
    .requires("impact.animation")
    .defines(function () {
        SpriteSheet = ig.AnimationSheet.extend({
            frame: {
                "blowfish": 2,
                "background_fish_large": 5,
                "background_fish_medium": 6,
                "background_fish_small": 7
            },
            framesize: {x: 60, y: 50},

            init: function () {
                this.parent("media/sprites.png", this.framesize.x, this.framesize.y);
            },
        });
    });
