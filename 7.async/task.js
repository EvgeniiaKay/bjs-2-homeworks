class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error("Отсутствуют обязательные аргументы");
        }

        if (this.alarmCollection.some(function (alarm) {
            return alarm.time === time;
        })) {
            console.warn("Уже присутствует звонок на это же время");
        }

        this.alarmCollection.push({
            time: time,
            callback: callback,
            canCall: true
        });
    }

    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(function (alarm) {
            return alarm.time !== time;
        });
    }

    getCurrentFormattedTime() {
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

            this.alarmCollection.forEach(function (alarm) {
                if (alarm.time === currentTime && alarm.canCall === true) {
                    alarm.canCall = false;
                    alarm.callback();
                }
            })
        }, 1000);
}

stop() {
    if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
}

resetAllCalls() {
    this.alarmCollection.forEach(function(alarm) {
        alarm.canCall = true;
    });
}

clearAlarms() {
    this.stop();
    this.alarmCollection = [];
}
}