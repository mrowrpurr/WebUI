import { once, printConsole } from 'skyrimPlatform';
once('tick', function () {
    printConsole('Yo, does this text change in the game right now?');
});
