import React, { useState } from 'react'
import { AreaChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import { View, StyleSheet } from 'react-native'
import HeaderText from './text/HeaderText'
import * as shape from 'd3-shape'
import { useTheme } from '@react-navigation/native'

// example of how to use X and Y axis:
// https://github.com/JesperLekland/react-native-svg-charts-examples/blob/master/storybook/stories/both-axes.js

const Chart = (props) => {
  const { dimensions } = useTheme()
  const [chartWidth, setChartWidth] = useState(300)
  const fillColor = props.fillColor || '#000'
  const lineColor = props.lineColor || '#ccc'
  const legendColor = props.legendColor || '#ccc'
  const contentInset = { top: 10, bottom: 30, left: 4, right: 10 }
  const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
  }

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
          data={props.data}
          contentInset={contentInset}
          svg={{
            fill: lineColor,
            stroke: lineColor
          }}
          numberOfTicks={5}
          formatLabel={(value) => `${kFormatter(value)}`}
        />
        <View style={styles.chartArea}>
          <AreaChart
            style={styles.chart}
            data={props.data}
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
              data={props.data}
              formatLabel={(value, index) => index}
              contentInset={contentInset}
              svg={{ fill: legendColor }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Chart
