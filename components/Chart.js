import React, { useState } from 'react'
import { AreaChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import { View, StyleSheet } from 'react-native'
import HeaderText from './text/HeaderText'
import * as shape from 'd3-shape'
import { useTheme } from '@react-navigation/native'
import { significantDigitsFormat } from '../translations'

const MILLIS_BETWEEN_MONTH = 30 * 24 * 60 * 60 * 1000
const MILLIS_BETWEEN_WEEK = 7 * 24 * 60 * 60 * 1000
const MILLIS_BETWEEN_DAY = 24 * 60 * 60 * 1000
const MILLIS_BETWEEN_HOUR = 60 * 60 * 1000

// example of how to use X and Y axis:
// https://github.com/JesperLekland/react-native-svg-charts-examples/blob/master/storybook/stories/both-axes.js

const Points = {
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month'
}

const getYearsDifference = (date1, date2) => {
  return date2.getFullYear() - date1.getFullYear()
}
const getMonthDifference = (date1, date2) => {
  return date2.getMonth() - date1.getMonth()
}
const getDaysDifference = (date1, date2) => {
  return date2.getDate() - date1.getDate()
}
const getHoursDifference = (date1, date2) => {
  return Math.abs(date2 - date1) / 36e5
}
const getBestTimePoint = (data) => {
  const datetimes = data.map(item => item.datetime)
  const max = Math.max(...datetimes)
  const min = Math.min(...datetimes)
  const dateMin = new Date(min)
  const dateMax = new Date(max)
  if (getYearsDifference(dateMin, dateMax) > 0) {
    return {
      interval: Points.month,
      intervalInMillis: MILLIS_BETWEEN_MONTH,
      amount: getYearsDifference(dateMin, dateMax),
      startDate: dateMin,
      endDate: dateMax
    }
  } else if (getMonthDifference(dateMin, dateMax) > 0) {
    return {
      interval: Points.week,
      intervalInMillis: MILLIS_BETWEEN_WEEK,
      amount: getMonthDifference(dateMin, dateMax),
      startDate: dateMin,
      endDate: dateMax
    }
  } else if (getDaysDifference(dateMin, dateMax) > 7) {
    return {
      interval: Points.day,
      intervalInMillis: MILLIS_BETWEEN_DAY,
      amount: getDaysDifference(dateMin, dateMax),
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

const createChartData = data => {
  const DifferenceObj = getBestTimePoint(data)
  const bucket = new Array(DifferenceObj.amount + 1)
  for (let i = 0; i < bucket.length; i++) {
    bucket[i] = {
      balance: 0
    }
  }
  let previousSavedBalance = 0
  let previousIndex = 0
  data.sort((a, b) => a.datetime - b.datetime).forEach((transaction) => {
    const bucketIndex = Math.floor((transaction.datetime - DifferenceObj.startDate.getTime()) / DifferenceObj.intervalInMillis) + 1
    // save last data on points that no transaction exists
    for (let i = previousIndex + 1; i < bucketIndex; i++) {
      bucket[i] = {
        balance: previousSavedBalance
      }
    }
    previousIndex = bucketIndex
    /* console.log(bucketIndex,bucket[bucketIndex].balance,transaction.balance, previousSavedBalance) */

    if (bucket[bucketIndex].balance < transaction.balance) {
      previousSavedBalance = transaction.balance
      bucket[bucketIndex] = transaction
    }
  })
  return bucket
}

// DUMMY DATA (3 hours between 1st and last transaction)
const array = [
  // receive 1000.20, previous balance was assumed to be 0.00
  {
    datetime: 1650082135,
    amount: 1234.56,
    address: 'pkt111111111...',
    balance: 1000.20
  },
  // send half to local address, a few minutes later.Money is sent and received
  {
    datetime: 1655082000,
    amount: -500.10,
    address: 'pkt111111111...',
    balance: 500.10
  },
  {
    datetime: 1657082268,
    amount: 500.10,
    address: 'pkt222222222...',
    balance: 1000.20
  },
  // send half to someone else's address, months later
  {
    datetime: 1659999999,
    amount: -500.10,
    address: 'pkt123232323...',
    balance: 500.10
  }]

const Chart = (props) => {
  const { colors, dimensions } = useTheme()
  const [chartWidth, setChartWidth] = useState(300)
  const [data] = useState(createChartData(array))
  const fillColor = props.fillColor || '#000'
  const lineColor = props.lineColor || '#ccc'
  const legendColor = props.legendColor || '#ccc'
  const contentInset = { top: 10, bottom: 30, left: 4, right: 10 }
  /* const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
  } */

  const styles = StyleSheet.create({
    header: {
      paddingBottom: dimensions.verticalSpacingBetweenItems
    },
    chartContainer: {
      flexDirection: 'row',
      height: Math.round(chartWidth * 0.618)
    },
    chartArea: {
      flex: 1
    },
    chart: {
      flex: 1
    },
    xAxis: {
      marginTop: dimensions.verticalSpacingBetweenItems,
      textAlign: 'right'
    },
    yAxis: {
      marginRight: dimensions.horizontalSpacingBetweenItems
    }
  })
  return (
    <View>
      <HeaderText style={styles.header}>{props.title}</HeaderText>
      <View
        style={styles.chartContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          setChartWidth(width)
        }}
      >
        <YAxis
          style={styles.yAxis}
          data={data.map(t => t.balance)}
          contentInset={contentInset}
          svg={{
            fill: lineColor,
            color: colors.chart.axisTextColor,
            fontSize: dimensions.chart.fontSize,
            fontWeight: dimensions.chart.fontWeight,
            fontFamily: dimensions.chart.fontFamily
          }}
          numberOfTicks={5}
          formatLabel={(value) => `${value >= 1000 ? significantDigitsFormat(value, 2) : value}`}
        />
        <View style={styles.chartArea}>
          <AreaChart
            style={styles.chart}
            data={data.map(t => t.balance)}
            contentInset={{
              top: 10,
              bottom: 20,
              left: 0,
              right: 0
            }}
            curve={shape.curveNatural}
            svg={{ fill: fillColor }}
            onLayout={(event) => {
              console.log(event)
            }}
          >
            {props.showGrid &&
              <Grid svg={{ stroke: lineColor }} />}
          </AreaChart>
          <View style={styles.xAxis}>
            <XAxis
              style={styles.xAxisLabel}
              data={data.map(t => t.balance)}
              formatLabel={(value, index) => index}
              contentInset={contentInset}
              svg={{
                fill: legendColor,
                color: colors.chart.axisTextColor,
                fontSize: dimensions.chart.fontSize,
                fontWeight: dimensions.chart.fontWeight,
                fontFamily: dimensions.chart.fontFamily
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Chart
