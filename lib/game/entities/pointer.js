// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <pointer.js - root>

ig
    .module("game.entities.pointer")
    .requires("impact.entity")
    .defines(function () {
        EntityPointer = ig.Entity.extend({
            checkAgainst: ig.Entity.TYPE.A,
            size: {x: 1, y: 1},

            check: function (other) {
                if (typeof(other.on_mouse_over) === "function") {
                    other.on_mouse_over();
                }
                if (ig.input.pressed("click") && typeof(other.on_click) === "function") {
                    other.on_click();
                }
            },

            init: function () {
                ig.input.bind(ig.KEY.MOUSE1, "click");
            },

            update: function () {
                this.pos.x = ig.input.mouse.x;
                this.pos.y = ig.input.mouse.y;
            }
        });
    });
