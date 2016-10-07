# Recreate Elements Script Tags

This function will traverse a element, any script tags it finds inside will be recreated.
Returns a bluebird promise so you know, if you care, when all the script tags are finished loading.

So, the issue is that if you want to use innerHTML to render a html partial within you application AND that partial has some script tags in it for its own Javascript dependencies. You will have a problem. [Read this one](http://stackoverflow.com/questions/13390588/script-tag-create-with-innerhtml-of-a-div-doesnt-work).

The DOM will not recognize script tags added via innerHTML, well, not in any way that you care about.

## But How?

Aight, its a module.exports style module, so use browserify or webpack.

```javascript
var recreateElementsScriptTags = require('recreate-elements-script-tags');

getPagePartialFromServer()
    .then(function(partial) {
        document.querySelector('#stage').innerHTML = partial;

        recreateElementsScriptTags(document.querySelector('#stage'))
            .then(function() {
                // DONE!
            });
    });
```

Let me know how it goes.

