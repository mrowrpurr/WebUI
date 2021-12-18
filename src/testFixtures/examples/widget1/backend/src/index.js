import { once, printConsole } from 'skyrimPlatform';
import { Something } from 'testdependency';
once('tick', function () {
    printConsole("THIS IS NOT SYSTEM JS! And this is from a dependency: '".concat(Something, "'"));
});
