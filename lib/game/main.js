// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <main.js - root>

ig
    .module("game.main")
    .requires(
        "impact.game",
        "game.collision-map-data",
        "game.entities.background-fish",
        "game.entities.blowfish"
    )
    .defines(function () {
        var game = ig.Game.extend({
            background: new ig.Image("media/background.jpg"),
            corals: new ig.Image("media/corals.png"),

            _draw_entities: function (type) {
                for (var i = 0, count = this.entities.length; i < count; i++) {
                    var entity = this.entities[i];
                    if (entity.type === type) {
                        entity.draw();
                    }
                }
            },

            _init_background_fish: function () {
                var SCHOOL_CENTER = {x: 330, y: 215};
                var count_large = 3;
                var count_medium = 4;
                var count_small = 2;
                var count = count_large + count_medium + count_small;

                for (var i = 0; i < count; i++) {
                    var r = Math.random() * (count_large + count_medium + count_small);
                    if (r < count_large) {
                        if (count_large > 0) {
                            this.spawnEntity(EntityBackgroundFishLarge, SCHOOL_CENTER.x, SCHOOL_CENTER.y);
                            count_large--;
                        }
                    }
                    else if (r < count_large + count_medium)
                    {
                        if (count_medium > 0) {
                            this.spawnEntity(EntityBackgroundFishMedium, SCHOOL_CENTER.x, SCHOOL_CENTER.y);
                            count_medium--;
                        }
                    }
                    else
                    {
                        if (count_small > 0) {
                            this.spawnEntity(EntityBackgroundFishSmall, SCHOOL_CENTER.x, SCHOOL_CENTER.y);
                            count_small--;
                        }
                    }
                }
            },

            _init_blowfish: function () {
                var COUNT = 12;
                var mesh_width = Math.ceil(Math.sqrt(COUNT));
                var mesh_height = Math.ceil(COUNT / mesh_width);
                var cell_size = {x: Math.ceil(ig.system.width / mesh_width), y: Math.ceil(ig.system.height / mesh_height)};

                for (var i = 0; i < COUNT; i++) {
                    var x = i % mesh_width * cell_size.x;
                    var y = Math.floor(i / mesh_width) * cell_size.y;
                    this.spawnEntity(EntityBlowfish, x, y);
                }
            },

            draw: function () {
                this.parent();
                this.background.draw(0, 0);
                this._draw_entities(ig.Entity.TYPE.NONE);
                this.corals.draw(0, 0);
                this._draw_entities(ig.Entity.TYPE.A);
            }

            init: function () {
                this.collisionMap = new ig.CollisionMap(CollisionMapData.tilesize, CollisionMapData.data);
                this._init_background_fish();
                this._init_blowfish();
            }
        });

        ig.main("#canvas", game, 60, 600, 600, 1);
    });
