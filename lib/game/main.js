// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <main.js - root>

ig
    .module("game.main")
    .requires(
        "impact.game",
        "game.collision-map-data",
        "game.entities.background-fish",
        "game.entities.blowfish"
    )
    .defines(function() {
        var game = ig.Game.extend({
            background: new ig.Image("media/background.jpg"),
            corals: new ig.Image("media/corals.png"),

            init: function() {
                var FISH_SCHOOL_CENTER = {x: 340, y: 215};
                var background_fish = [
                    EntityBackgroundFishSmall,
                    EntityBackgroundFishSmall,
                    EntityBackgroundFishMedium,
                    EntityBackgroundFishMedium,
                    EntityBackgroundFishMedium,
                    EntityBackgroundFishMedium,
                    EntityBackgroundFishLarge,
                    EntityBackgroundFishLarge,
                    EntityBackgroundFishLarge
                ];
                shuffle(background_fish);
                this.collisionMap = new ig.CollisionMap(CollisionMapData.tilesize, CollisionMapData.data);
                for (var i = 0, count = background_fish.length; i < count; i++)
                {
                    this.spawnEntity(background_fish[i], FISH_SCHOOL_CENTER.x, FISH_SCHOOL_CENTER.y);
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
