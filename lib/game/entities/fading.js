// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <fading.js - root>

ig
    .module("game.entities.fading")
    .requires("impact.entity")
    .defines(function () {
        EntityFading = ig.Entity.extend({
            _set_anim: function (name) {
                var anim = this.anims[name];
                if (anim) {
                    anim.alpha = this.currentAnim.alpha;
                    this.currentAnim = anim.rewind();
                }
            },

            _update_hide: function () {
                if (0 < this.currentAnim.alpha) {
                    if (this.timer.delta() > 0) {
                        this.currentAnim.alpha = Math.max(0, 1 - this.timer.delta() / this.duration);
                    }
                }
                else {
                    this.update = this.update_default;
                }
                this.update_default();
            },

            _update_show: function () {
                if (this.currentAnim.alpha < 1) {
                    if (this.timer.delta() > 0) {
                        this.currentAnim.alpha = Math.min(1, this.timer.delta() / this.duration);
                    }
                }
                else {
                    this.update = this.update_default;
                }
                this.update_default();
            },

            init: function (x, y, settings) {
                this.currentAnim.alpha = 0;
                this.update_default = this.update;
                this.parent(x, y, settings);
            },

            show: function (show, initial_delay, duration) {
                if (duration > 0) {
                    if (this.timer) {
                        this.timer.set(initial_delay);
                    }
                    else {
                        this.timer = new ig.Timer(initial_delay);
                    }
                    this.duration = duration;
                    this.update = show ? this._update_show : this._update_hide;
                }
                else {
                    this.currentAnim.alpha = show ? 1 : 0;
                }
            }
        });
    });
