// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <main.js - root>

ig
    .module("game.main")
    .requires(
        "impact.game",
        "game.collision-map-data",
        "game.entities.background-fish",
        "game.entities.blowfish",
        "game.entities.jewel",
        "game.entities.pointer",
        "game.utils"
    )
    .defines(function () {
        var game = ig.Game.extend({
            background: new ig.Image("media/background.jpg"),
            corals: new ig.Image("media/corals.png"),

            _draw_entities: function (type) {
                this._iterate_entities(function (entity) {
                    if (entity instanceof type) {
                        entity.draw();
                    }
                    return true;
                });
            },

            _init_background_entities: function () {
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
                    else if (r < count_large + count_medium) {
                        if (count_medium > 0) {
                            this.spawnEntity(EntityBackgroundFishMedium, SCHOOL_CENTER.x, SCHOOL_CENTER.y);
                            count_medium--;
                        }
                    }
                    else {
                        if (count_small > 0) {
                            this.spawnEntity(EntityBackgroundFishSmall, SCHOOL_CENTER.x, SCHOOL_CENTER.y);
                            count_small--;
                        }
                    }
                }
            },

            _init_foreground_entities: function () {
                var COLLISION_TILE_SIZE = 8;
                var NUM_FISH = 12;
                var NUM_JEWELS = 3;
                var DURATION_FADE = 0.5;
                var DELAY_SHOW_FISH = DURATION_FADE * NUM_JEWELS + 0.5;
                var DELAY_SHOW_FISH_WITH_JEWEL = DELAY_SHOW_FISH + 1.5;
                var DELAY_START_MOVING = DELAY_SHOW_FISH_WITH_JEWEL + DURATION_FADE + 1.5;
                var DELAY_STOP_MOVING = DELAY_START_MOVING + 5;

                var jewels = [];
                var mesh_width = Math.ceil(Math.sqrt(NUM_FISH));
                var mesh_height = Math.ceil(NUM_FISH / mesh_width);
                var cell_size = {
                    x: Math.ceil((ig.system.width - 2 * COLLISION_TILE_SIZE) / mesh_width),
                    y: Math.ceil((ig.system.height - 2 * COLLISION_TILE_SIZE) / mesh_height)
                };

                for (var i = 0; i < NUM_FISH; i++) {
                    var x = i % mesh_width * cell_size.x + COLLISION_TILE_SIZE;
                    var y = Math.floor(i / mesh_width) * cell_size.y + COLLISION_TILE_SIZE;
                    var entity = this.spawnEntity(EntityBlowfish, x, y);

                    entity.show(true, DELAY_SHOW_FISH, DURATION_FADE);
                    this._schedule_call(DELAY_START_MOVING, entity.start, entity);
                    this._schedule_call(DELAY_STOP_MOVING, entity.stop, entity);

                    if (entity.max_size.x < cell_size.x) {
                        entity.pos.x = Math.floor(get_random(x, x + cell_size.x - entity.max_size.x));
                    }
                    if (entity.max_size.y < cell_size.y) {
                        entity.pos.y = Math.floor(get_random(y, y + cell_size.y - entity.max_size.y));
                    }
                    if (jewels.length < NUM_JEWELS) {
                        var jewel = this.spawnEntity(EntityJewel, entity.pos.x, entity.pos.y);
                        jewels.push({jewel: jewel, entity: entity});
                    }
                    else {
                        var j = get_random_int(0, i);

                        if (j < jewels.length) {
                            var tuple = jewels[j];
                            tuple.entity = entity;
                            tuple.jewel.pos.x = entity.pos.x;
                            tuple.jewel.pos.y = entity.pos.y;
                        }
                    }
                }
                for (var i = 0, count = jewels.length; i < count; i++) {
                    var tuple = jewels[i];
                    tuple.entity.has_jewel = true;
                    tuple.entity.show(true, DELAY_SHOW_FISH_WITH_JEWEL, DURATION_FADE);
                    tuple.jewel.show(true, DURATION_FADE * i + 0.3, DURATION_FADE);
                    this._schedule_call(DELAY_SHOW_FISH_WITH_JEWEL, tuple.jewel.show, tuple.jewel, false, 0, DURATION_FADE);
                    this._schedule_call(DELAY_SHOW_FISH_WITH_JEWEL + DURATION_FADE, this.removeEntity, this, tuple.jewel);
                }
                this._schedule_call(DELAY_STOP_MOVING, function () { this.pointer = this.spawnEntity(EntityPointer); }, this);
            },

            _iterate_entities: function (f) {
                for (var i = 0, count = this.entities.length; i < count; i++) {
                    var entity = this.entities[i];
                    if (!entity._killed && !f.call(this, entity)) {
                        return false;
                    }
                }
                return true;
            },

            _schedule_call: function (delay, action, entity) {
                var time = this.timer.delta() + delay;

                for (var i = 0, count = this.delay_queue.length;
                     i < count && this.delay_queue[i].time < time;
                     i++)
                    ;
                var a = arguments;
                var f = function () { action.apply(entity, [].slice.call(a, 3)); };
                this.delay_queue.splice(i, 0, {action: f, time: time});
            },

            draw: function () {
                this.parent();
                this.background.draw(0, 0);
                this._draw_entities(EntityBackgroundFish);
                this.corals.draw(0, 0);
                this._draw_entities(EntityBlowfish);
                this._draw_entities(EntityJewel);
            },

            init: function () {
                this.collisionMap = new ig.CollisionMap(CollisionMapData.tilesize, CollisionMapData.data);
                this._init_background_entities();
            },

            on_correct_answer: function (entity) {
                this.removeEntity(entity);

                var no_jewels = this._iterate_entities(function (entity) {
                    return !(entity instanceof EntityBlowfish && entity.has_jewel);
                });

                if (no_jewels) {
                    if (this.pointer && !this.pointer._killed) {
                        this.removeEntity(this.pointer);
                        this.pointer = null;
                    }
                    var DELAY_GAME_SUCCESS = 1;
                    this._schedule_call(DELAY_GAME_SUCCESS, this.on_game_over, this, true);
                }
            },

            on_game_over: function (success) {
                this._iterate_entities(function (entity) {
                    if (!(entity instanceof EntityBackgroundFish)) {
                        this.removeEntity(entity);
                    }
                    return true;
                });

                if (this.start_button) {
                    this.start_button.style.display = "";
                }
            },

            on_wrong_answer: function () {
                var DURATION_FADE = 0.5;
                this._iterate_entities(function (entity) {
                    if (entity instanceof EntityBlowfish) {
                        var jewel = this.spawnEntity(EntityJewel, entity.pos.x, entity.pos.y);
                        entity.show(false, 0, DURATION_FADE);
                        jewel.set_anim(entity.has_jewel ? "blowfish_jewel" : "blowfish_transparent");
                        jewel.show(true, 0, DURATION_FADE);
                    }
                    return true;
                });
                var DELAY_GAME_ERROR = 2;
                this._schedule_call(DELAY_GAME_ERROR, this.on_game_over, this, false);
            },

            start: function () {
                if (this.timer) {
                    this.timer.reset();
                }
                else {
                    this.timer = new ig.Timer();
                }
                this.delay_queue = [];
                this._init_foreground_entities();
            },

            update: function () {
                if (this.delay_queue) {
                    for (var i = 0, count = this.delay_queue.length; i < count; i++) {
                        var item = this.delay_queue[i];

                        if (item.time < this.timer.delta()) {
                            item.action();
                        }
                        else {
                            break;
                        }
                    }
                    this.delay_queue.splice(0, i);
                }
                this.parent();
            }
        });

        ig.main("#canvas", game, 60, 600, 600, 1);
    });
