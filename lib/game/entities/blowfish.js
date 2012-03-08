// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <blowfish.js - root>

ig
    .module("game.entities.blowfish")
    .requires(
        "impact.entity",
        "game.sprite-sheet"
    )
    .defines(function() {
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
        });
    });
