class Queue {

    constructor(process) {
        this.process = process;
        this.jobs = [];
        this.currentJob = null;
        this.started = false;
    }

    addJob(data) {
        const job = {
            data,
            resolve: null,
            reject: null,
            promise: null,
        };
        job.promise = new Promise((resolve, reject) => {
            job.resolve = resolve;
            job.reject = reject;
        });
        this.jobs.push(job);
        if (this.jobs.length && !this.started) {
            this.start();
        }
        return job.promise;
    }

    start() {
        if (this.currentJob) {
            return;
        }

        this.started = true;
        this.nextJob();
    }

    nextJob() {
        const job = this.jobs.shift();
        this.currentJob = job;
        this.process(job.data, job)
            .then((data) => {
                job.resolve(data);
            }, (err) => {
                job.reject(err);
            })
            .then(() => {
                this.currentJob = null;
                if (this.jobs.length) {
                    this.nextJob();
                } else {
                    this.started = false;
                }
            });
    }

}

export default Queue;
