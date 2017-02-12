/**
 * Created by R3 on 2017-02-08.
 */
function getCurrentMillisecond(){
    var d = new Date();
    return d.getMilliseconds();
}

function executeCode(code) {
    var output = null;
    try{
        output = eval(code);
    } catch (e) {
        return {error: 1, data: e.message}; //  + "\n[Line " + e.stack + "]")};
    }

    return {error: 0, data: JSON.stringify(output)};
}

self.addEventListener('message', function(e) {
    var start = getCurrentMillisecond();
    var output = executeCode(e.data);
    var executionTime = getCurrentMillisecond() - start;

    self.postMessage({
        code:            e.data,
        result:          output.data,
        error:           output.error,
        executionTime:   executionTime + "ms"
    });
});