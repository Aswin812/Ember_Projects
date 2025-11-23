import Service from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';

export default class CurrentUserService extends Service {
    currentUser = new TrackedObject();

    setCurrentuser(user) {
        this.currentUser = user;
    }

    isEmpty() {
        return !this.currentUser || Object.entries(this.currentUser).length === 0;
    }

    logout() {
        this.currentUser = null;
    }
}
