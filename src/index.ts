import 'dotenv/config';
import {AndroidIgpapi} from '@igpapi/android';
import {filter, map, mergeAll} from 'rxjs/operators';

const sessionId = `********`
const android = new AndroidIgpapi();
android.state.device.generate(sessionId);
android.state.cookies.sessionId = sessionId;


(async () => {
    await android.account.currentUser();

    const realtime = android.realtime();

    const live = realtime.live({broadcastId: '********'});

    live.comments
        .pipe(
            map(x => x.comments),
            filter(<T>(x: T | null | undefined): x is T => x !== null),
            map(x => Object.values(x)),
            mergeAll(),
        )
        .subscribe(comment => console.log(comment));


    await realtime.connect();
})()


