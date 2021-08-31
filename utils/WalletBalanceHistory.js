import AdaptiveStorage from './AdaptiveStorage'
import AppConstants from './AppConstants'

const MILLIS_BETWEEN_YEAR = 12 * 30 * 24 * 60 * 60 * 1000
const MILLIS_BETWEEN_MONTH = 30 * 24 * 60 * 60 * 1000
const MILLIS_BETWEEN_WEEK = 7 * 24 * 60 * 60 * 1000
const MILLIS_BETWEEN_DAY = 24 * 60 * 60 * 1000
const MILLIS_BETWEEN_HOUR = 60 * 60 * 1000

const Points = {
    hour: 'hour',
    day: 'day',
    week: 'week',
    month: 'month'
}

const getYearsDifference = (date1, date2) => {
    return Math.abs(date2 - date1) / MILLIS_BETWEEN_YEAR
}
const getMonthDifference = (date1, date2) => {
    return Math.abs(date2 - date1) / MILLIS_BETWEEN_MONTH
}
const getWeekDifference = (date1, date2) => {
    return Math.abs(date2 - date1) / MILLIS_BETWEEN_WEEK
}
const getDaysDifference = (date1, date2) => {
    return Math.abs(date2 - date1) / MILLIS_BETWEEN_DAY
}
const getHoursDifference = (date1, date2) => {
    return Math.abs(date2 - date1) / MILLIS_BETWEEN_HOUR
}

export class WalletBalanceHistory {

    constructor(balanceHistory = []) {
        this.balanceHistory = balanceHistory
        this.isLoaded = false
        this.isDirty = false
    }

    /** * Add a new balance history */
    async add(datetime, balance) { // only add if the balance has changed 

        if (!this.isLoaded) {
            await this.load()
        }

        let doAdd = false
        const balanceHistoryLength = this.balanceHistory.length

        if (balanceHistoryLength === 0) {
            doAdd = true
        } else {
            const lastBalanceHistory = this.balanceHistory[balanceHistoryLength - 1]
            if (lastBalanceHistory.balance != balance) {
                doAdd = true
            }
        }

        if (doAdd) {
            this.balanceHistory.push({
                datetime: datetime,
                balance: balance
            }) // mark as needing to be saved 
            this.isDirty = true
        }
    }

    /** * Get balances from storage */
    async load() {
        const balanceHistory = await AdaptiveStorage.get(AppConstants.WALLET_HISTORY_BALANCE_KEY, [])

        // first time login initial balance is 0
        if (balanceHistory.length === 0) {
            this.balanceHistory.push({
                datetime: new Date().getTime(),
                balance: 0
            })
            this.isDirty = true
        }

        this.balanceHistory = balanceHistory
        this.isLoaded = true
    }

    /** * Save to storage */
    async save() {
        await AdaptiveStorage.set(AppConstants.WALLET_HISTORY_BALANCE_KEY, this.balanceHistory)
        this.isDirty = false
    }

    // Get last years balances
    getHistory() {

        const lastYearBalance = this.balanceHistory.filter(item => new Date().getTime() - item.datetime < MILLIS_BETWEEN_YEAR)

        if (lastYearBalance.length === 0)
            return [
                {
                    datetime: new Date().getTime() - MILLIS_BETWEEN_YEAR,
                    balance: 0
                },
                {
                    datetime: new Date().getTime(),
                    balance: 0
                }
            ]
        else if (lastYearBalance.length === 1)
            return [
                this.balanceHistory[0],
                lastYearBalance[0]
            ]
        else
            return this.balanceHistory.filter(item => new Date().getTime() - item.datetime < MILLIS_BETWEEN_YEAR)
    }

    getBestTimePoint() {

        const datetimes = this.getHistory().map(item => item.datetime)
        const max = Math.max(...datetimes)
        const min = Math.min(...datetimes)
        const dateMin = new Date(min)
        const dateMax = new Date(max)

        if (getYearsDifference(dateMin, dateMax) > 0) {
            return {
                interval: Points.month,
                intervalInMillis: MILLIS_BETWEEN_MONTH,
                amount: Math.ceil(getMonthDifference(dateMin,dateMax)),
                startDate: dateMin,
                endDate: dateMax
            }
        } else if (getMonthDifference(dateMin, dateMax) > 0) {
            return {
                interval: Points.week,
                intervalInMillis: MILLIS_BETWEEN_WEEK,
                amount: Math.ceil(getWeekDifference(dateMin, dateMax)),
                startDate: dateMin,
                endDate: dateMax
            }
        } else if (getDaysDifference(dateMin, dateMax) > 7) {
            return {
                interval: Points.day,
                intervalInMillis: MILLIS_BETWEEN_DAY,
                amount: Math.ceil(getDaysDifference(dateMin, dateMax)),
                startDate: dateMin,
                endDate: dateMax
            }
        } else {
            return {
                interval: Points.hour,
                intervalInMillis: MILLIS_BETWEEN_HOUR,
                amount: Math.ceil(getHoursDifference(dateMin, dateMax)),
                startDate: dateMin,
                endDate: dateMax
            }
        }
    }

    createChartData() {
        const data = this.getHistory()
        if(data.length <=2) return data

        const DifferenceObj = this.getBestTimePoint()
        console.log(DifferenceObj)
        const bucket = new Array(DifferenceObj.amount)
        for (let i = 0; i < bucket.length; i++) {
            bucket[i] = {
                balance: 0
            }
        }
        let previousSavedBalance = 0
        let previousIndex = 0
        data.sort((a, b) => a.datetime - b.datetime).forEach((transaction) => {
            const bucketIndex = Math.floor((transaction.datetime - DifferenceObj.startDate.getTime()) / DifferenceObj.intervalInMillis)
            console.log(bucketIndex)
            // save last data on points that no transaction exists
            for (let i = previousIndex + 1; i < bucketIndex; i++) {
                bucket[i] = {
                    balance: previousSavedBalance
                }
            }
            previousIndex = bucketIndex

            if (bucket[bucketIndex].balance < transaction.balance) {
                previousSavedBalance = transaction.balance
                bucket[bucketIndex] = { balacne: transaction.balacne }
            }
        })
        return bucket
    }
}