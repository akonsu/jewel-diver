// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <main.js - root>

ig
    .module("game.main")
    .requires(
        "impact.game",
        "game.collision-map-data",
        "game.entities.background-fish"
    )
    .defines(function() {
        var game = ig.Game.extend({
            background: new ig.Image("media/background.jpg"),
            corals: new ig.Image("media/corals.png"),

            init: function() {
                var COUNT_FISH_LARGE = 3;
                var COUNT_FISH_MEDIUM = 4;
                var COUNT_FISH_SMALL = 2;

                this.collisionMap = new ig.CollisionMap(CollisionMapData.tilesize, CollisionMapData.data);

                for (var i =0; i < COUNT_FISH_SMALL; i++)
                {
                    var settings = {vel: {x: 1, y: 1}};
                    this.spawnEntity(EntityBackgroundFishSmall, ig.system.width / 2, ig.system.height / 2, settings);
                }
                for (var i =0; i < COUNT_FISH_MEDIUM; i++)
                {
                    var settings = {vel: {x: 1, y: 1}};
                    this.spawnEntity(EntityBackgroundFishMedium, ig.system.width / 2, ig.system.height / 2, settings);
                }
                for (var i =0; i < COUNT_FISH_LARGE; i++)
                {
                    var settings = {vel: {x: 10, y: 10}};
                    this.spawnEntity(EntityBackgroundFishLarge, ig.system.width / 2, ig.system.height / 2, settings);
                }
            },

            draw: function() {
                this.parent();
                this.background.draw(0, 0);
                for (var i = 0, count = this.entities.length; i < count; i++) {
                    this.entities[i].draw();
                };
                this.corals.draw(0, 0);
            }
        });

        ig.main("#canvas", game, 60, 600, 600, 1);
    });
