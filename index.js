var BB = require('bluebird');

module.exports = function recreateElementsScriptTags(elementInQuestion) {

    return BB.all([].map.call(elementInQuestion.querySelectorAll('script'), function(scriptTag) {
        var newScriptElement = document.createElement('script');

        newScriptElement.type = 'text/javascript';

        if(!scriptTag.src) {
            newScriptElement.appendChild(document.createTextNode(scriptTag.innerHTML));

            scriptTag.parentElement.insertBefore(newScriptElement, scriptTag);
            scriptTag.parentElement.removeChild(scriptTag);

            return true;
        } else {
            newScriptElement.src = scriptTag.src;
            newScriptElement.async = scriptTag.async;

            return new BB(function(resolve, reject) {
                newScriptElement.onload = resolve;
                newScriptElement.onerror = reject;

                scriptTag.parentElement.insertBefore(newScriptElement, scriptTag);
                scriptTag.parentElement.removeChild(scriptTag);
            });
        }
    }));
}