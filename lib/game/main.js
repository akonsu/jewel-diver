// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <main.js - root>

ig
    .module('game.main')
    .requires(
        'impact.game'
    )
    .defines(function(){
        var game = ig.Game.extend({
            background: new ig.Image("media/background.jpg"),
            corals: new ig.Image("media/corals.png"),

            draw: function(){
                this.parent();
                this.background.draw(0, 0);
                this.corals.draw(0, 0);
            },
        });

        ig.main('#canvas', game, 60, 600, 600, 1);
    });
