"auto-install-node-module" {
    code: {
        terminal[npm i]
    }
    condition: {
        at[package.json]
        at[dependencies]
        state[items exist]
    }
    action: {
        "auto install node module items in the dependencies list"
    }
    
}

"package-Lock.json" {
    action: {
        "locks the version of node module items in the dependecies list"
    }
}

"babel.js" {
    action: {
        "It is a javacript compiler";
        "It converts ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments"
    }
}

"--save-dev" {
    code: {
        terminal[npm i --save-dev & ...]
        
    }
    action: {
        "save the called item in the devDependencies list"
    }
}

"devDependencies" {
    action: {
        "signify that incorporated items are used for developers, rather that the project"
    }
}

"babel/plugins" {
    action: {
        "small JavaScript programs that instruct Babel on how to carry out transformations to the code."
    }
}
"@babel/preset" {
    definition: {
        "a pre-determined set of plugins"
    }
    action: {
        "allow developers to not add every single plugins by themselves"
    }
}

"@babel/preset-env" {
    definition: {
        "one type of the babel preset"
    }
    action: {
        "preset that converts latest Javascript style into a version that is compatible with the target environment"
    }
}

"nodemon"
"babel-node"
"nodemon --exec"
import express from "express"