// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <sprite-sheet.js - root>

ig
    .module("game.sprite-sheet")
    .requires("impact.animation")
    .defines(function () {
        SpriteSheet = ig.AnimationSheet.extend({
            frame: {
                "blowfish_large": 0,
                "blowfish_transparent": 1,
                "blowfish": 2,
                "blowfish_jewel": 3,
                "jewel": 4,
                "background_fish_large": 5,
                "background_fish_medium": 6,
                "background_fish_small": 7
            },

            init: function () {
                var FRAME_SIZE = {x: 60, y: 50};
                this.parent("media/sprites.png", FRAME_SIZE.x, FRAME_SIZE.y);
            },
        });
    });
