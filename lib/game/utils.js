// -*- mode:javascript; coding:utf-8; -*- Time-stamp: <utils.js - root>

ig
    .module("game.utils")
    .defines(function() {
        gcd = function (a, b) {
            while (b > 0) {
                var t = b;
                b = a % b;
                a = t;
            }
            return a;
        }

        get_random_int = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        shuffle = function (list) {
            for (var i = 1, count = list.length; i < count; i++) {
                var j = Math.floor(Math.random() * (i + 1)); // choose j in [0..i]
                if (j != i) {
                    var t = list[i];
                    list[i] = list[j];
                    list[j] = t;
                }
            }
        }
    });
