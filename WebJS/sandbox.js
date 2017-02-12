function JSSandbox(){
    var that = this;
    this.codeExecutionStatus = null;
    this.worker = null;
    this.codeExecutionTimer = null;
    this.output = null;
    this.additionalInfo = true;

    this.initialize = function(){
        if (this.worker !== null) {
            this.worker.terminate();
        }
        this.worker = new Worker('sandboxWorker.js');

        this.worker.addEventListener('message', function(e) {
            that.output = e.data;
            console.log(e);

            if(that.output.error == 0) {
                that.consoleLog("Done");
                that.codeExecutionStatus = CODEEXECUTIONSTATUS.COMPLETE;
            } else {
                that.consoleLog("Failed");
                that.codeExecutionStatus = CODEEXECUTIONSTATUS.ERROR;
            }
            clearTimeout(that.codeExecutionTimer);
        });

        this.worker.addEventListener('error', function(e) {
            clearTimeout(that.codeExecutionTimer);
            that.consoleLog("Critical Error");
            that.codeExecutionStatus = CODEEXECUTIONSTATUS.ERROR;
            throw(e);
        });

        that.codeExecutionStatus = CODEEXECUTIONSTATUS.READY;
        that.consoleLog("Initialized");
        return 0;
    };

    this.postJob = function(code, input) {
        that.codeExecutionStatus = CODEEXECUTIONSTATUS.INPROGRESS;
        this.worker.postMessage(code + "\n" + input);
        that.consoleLog("Got a job");
        return 0;
    };

    this.terminate = function () {
        this.worker.terminate();
        this.worker = null;
        that.consoleLog("Terminated");
        return 0;
    };

    this.executeCode = function(code, input, maxDuration){
        this.initialize();
        if(that.codeExecutionStatus == CODEEXECUTIONSTATUS.READY){
            this.postJob(code, input);
            this.codeExecutionTimer = setTimeout(function() {
                that.codeExecutionStatus = CODEEXECUTIONSTATUS.TIMEOUT;
                that.terminate();
                that.consoleLog("Time limit");
            }, maxDuration);
            return 0;
        }
        return 1;
    };

    this.consoleLog = function(message){
        if(that.additionalInfo)
            console.log("Worker: "+message);
    };
}
