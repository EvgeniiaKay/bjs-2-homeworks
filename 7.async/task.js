class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error("Отсутствуют обязательные аргументы");
        }

        let alreadyExists = false;
        for (let i = 0; i < this.alarmCollection.length; i++) {
            if (this.alarmCollection[i].time === time) {
                alreadyExists = true;
                console.warn("Уже присутствует звонок на это же время");
            }
        }

        this.alarmCollection.push({
            time: time,
            callback: callback,
            canCall: true
        });
    }

    removeClock(time) {
        let newCollection = [];
        for (let i = 0; i < this.alarmCollection.length; i++) {
            if (this.alarmCollection[i].time !== time) {
                newCollection.push(this.alarmCollection[i]);
            }
        }
        this.alarmCollection = newCollection;
    }

    getCurrentFormattedTime () {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes;
    }

    start() {
        if (this.intervalId !== null) {
            return;
        }

        this.intervalId = setInterval(() => {
            let currentTime = this.getCurrentFormattedTime();

            for (let i = 0; i < this.alarmCollection.length; i++) {
                let alarm = this.alarmCollection[i];

                if (alarm.time === currentTime && alarm.canCall === true) {
                    alarm.canCall = false;
                    alarm.callback();
                }
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    resetAllCalls() {
        for (let i = 0; i < this.alarmCollection.length; i++) {
            this.alarmCollection[i].canCall = true;
        }
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}