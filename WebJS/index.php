<!DOCTYPE html>
<html lang="en">
<head>
<title>ACE in Action</title>
<style type="text/css" media="screen">
    #editor {
    position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
    }
    #worker {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 50%;
    }
</style>
</head>
<body>

<div id="editor">function pow2(x) {
    return x*x;
}</div>
<div id="worker"></div>
<script src="aceEditor/ace.js" type="text/javascript" charset="utf-8"></script>
<script>
    var TESTSTATUS = {
        READY: 0,
        INPROGRESS: 1,
        PASSED: 2,
        FAILED: 3
    };

    var CODEEXECUTIONSTATUS = {
        READY: 0,
        INPROGRESS: 1,
        COMPLETE: 2,
        ERROR: 3,
        TIMEOUT: 4
    };

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.setFontSize("14px");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWrapMode(false);

    var output = ace.edit("worker");
    output.setTheme("ace/theme/monokai");
    output.setFontSize("14px");
    output.getSession().setMode("ace/mode/plain_text");
    output.getSession().setUseWrapMode(false);
</script>

<script src="sandbox.js"></script>
<script>
    function Test(_title, _input, _output, _maxDuration) {
        var that = this;
        this.title = _title;
        this.input = _input;
        this.output = _output;
        this.maxDuration = _maxDuration;
        this.status = TESTSTATUS.READY;
        this.passTries = 0;
        this.sandbox = null;
        this.updateInterval = null;

        this.solve = function (code) {
            if(code == null || code == undefined){
                console.log("Test " + that.title + " solve: NO CODE");
                return 1;
            }

            if(that.status == TESTSTATUS.INPROGRESS){
                console.log("Test " + that.title + " solve: TEST IN PROGRESS");
                return "Test is in progress!";
            }

            if(that.sandbox == null)
                that.sandbox = new JSSandbox();
            that.sandbox.executeCode(code, that.input, that.maxDuration);
            that.status = TESTSTATUS.INPROGRESS;

            this.updateInterval = setInterval(function(){
                that.updateSolvingProgress();
                console.log(that.getStatusText());
            }, 100);
        };

        this.updateSolvingProgress = function () {
            if(that.sandbox == null) {
                console.log("Test " + that.title + " updateSolvingProcess: SANDBOX NOT CREATED");
                return 1;
            }

            if(that.sandbox.codeExecutionStatus != CODEEXECUTIONSTATUS.INPROGRESS)
                clearInterval(that.updateInterval);

            switch (that.sandbox.codeExecutionStatus){
                case CODEEXECUTIONSTATUS.READY:
                case CODEEXECUTIONSTATUS.INPROGRESS: break;
                case CODEEXECUTIONSTATUS.ERROR: that.tryFailed(); break;
                case CODEEXECUTIONSTATUS.COMPLETE: that.checkSandboxOutput(); break;
                case CODEEXECUTIONSTATUS.TIMEOUT: that.tryFailed(); break;
                default: console.log("Test "+that.title+" updateSolvingProcess: UNEXPECTED CODEEXECUTIONSTATUS");
            }
        };

        this.tryFailed = function() {
            that.passTries++;
            that.status = TESTSTATUS.FAILED;
        };

        this.checkSandboxOutput = function () {
            if(that.output == that.sandbox.output.result){
                that.status = TESTSTATUS.PASSED;
            } else {
                that.tryFailed();
            }
        };

        this.getStatusText = function () {
            var statusText = ["READY", "IN PROGRESS", "PASSED", "FAILED"];
            return "Test "+that.title +" status: "+ statusText[that.status];
        };

        this.getSolveResult = function () {
            if(!(that.status == TESTSTATUS.PASSED || that.status == TESTSTATUS.FAILED))
                return 1;

            var message = "Test " + that.title;
            if(that.status == TESTSTATUS.FAILED){
                message += " failed. ";
                if(that.sandbox.output.error){
                    message += "Code execution error:";
                    message += "\n" + that.sandbox.output.result;
                } else {
                    message += "Wrong answer.";
                    message += "\nExpected output: " + that.output;
                    message += "\nYour code output: " + that.sandbox.output.result;
                }
            } else {
                message += " passed."
            }
            return message;
        };
    }

    var test = new Test("Pow2", "pow28(5)", "25", 1000);
    test.solve(editor.session.getValue());

    setTimeout( function() {
        console.log(test.getSolveResult());
    }, 1000);
</script>
</body>
</html>
