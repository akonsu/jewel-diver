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
                this.collisionMap = new ig.CollisionMap(CollisionMapData.tilesize, CollisionMapData.data);

                var sizes = ["large", "medium", "small"];

                for (var i = 0, count = sizes.length; i < count; i++)
                {
                    var settings = {vel: {x: 100 - Math.random() * 200, y: 100 - Math.random() * 200}};
                    var entity = this.spawnEntity(EntityBackgroundFish, ig.system.width / 2, ig.system.height / 2, settings);
                    entity.currentAnim = entity.anims[sizes[i]];
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
