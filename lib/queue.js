"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = function () {
    function Queue(process) {
        _classCallCheck(this, Queue);

        this.process = process;
        this.jobs = [];
        this.currentJob = null;
        this.started = false;
    }

    _createClass(Queue, [{
        key: "addJob",
        value: function addJob(data) {
            var job = {
                data: data,
                resolve: null,
                reject: null,
                promise: null
            };
            job.promise = new Promise(function (resolve, reject) {
                job.resolve = resolve;
                job.reject = reject;
            });
            this.jobs.push(job);
            if (this.jobs.length && !this.started) {
                this.start();
            }
            return job.promise;
        }
    }, {
        key: "start",
        value: function start() {
            if (this.currentJob) {
                return;
            }

            this.started = true;
            this.nextJob();
        }
    }, {
        key: "nextJob",
        value: function nextJob() {
            var _this = this;

            var job = this.jobs.shift();
            this.currentJob = job;
            this.process(job.data, job).then(function (data) {
                job.resolve(data);
            }, function (err) {
                job.reject(err);
            }).then(function () {
                _this.currentJob = null;
                if (_this.jobs.length) {
                    _this.nextJob();
                } else {
                    _this.started = false;
                }
            });
        }
    }]);

    return Queue;
}();

exports.default = Queue;