import React from "react";
import ReactEcharts from "echarts-for-react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ComparePVO(props) {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("ComparePVO");
  }
  // i18n
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      data-testid="component-PVO comparison graph"
    >
      <ReactEcharts
        style={{
          height: window.innerHeight - 190 - 66,
          width: window.innerWidth * 0.95,
        }}
        option={{
          grid: {
            left: "4%",
            right: "4%",
            containLabel: true,
          },          
          xAxis: {
            type: "category",
            data: props.content.Xs,
            axisTick: {
              alignWithLabel: true,
            },
				  },
				  yAxis: {
				    type: 'value',
				    axisLabel: {
				      formatter: '{value} %'
				    },
				    max: 0,
				    max: 100
				  },
				  series: props.content.Ys
        }}
      />
    </Box>
  );
}
/*
 */
 