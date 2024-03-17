import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material'
import Canvas from './Canvas/Canvas.js';
import { random_id } from '../../../services/toolkit.js';
import { alignProperty } from '@mui/material/styles/cssUtils.js';

export default function ChartPVO(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ChartPVO')
  }
  // i18n
  const { t } = useTranslation()

  const maxRadius = 0.65
  let sectorAngle = 360 / props.inputs.data.length

  const draw = (ctx, frameCount) => {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    function drawSector (inputs) {
      ctx.beginPath()
      // Origin
      ctx.moveTo(props.width/2, props.width/2);
      // Arc
      ctx.arc(
        props.width/2, props.width/2, 
        props.width/2*maxRadius*inputs.outerRadius, 
        (inputs.angleBegin-90)*2*Math.PI/360, 
        (inputs.angleEnd-90)*2*Math.PI/360);
      // Origin
      ctx.lineTo(props.width/2, props.width/2);
      // Color
      ctx.fillStyle = inputs.color;
      ctx.fill();      
    }
    /*
     {
                id: id, 
                value: 1,//props.exam.analysis.colors[testColor.color], 
                label: testColor.name,
                color: testColor.color,
            }
     */
    let s = -1
    props.inputs.data.forEach(sector => {
      s += 1
      drawSector({
        color: sector.color,
        outerRadius: sector.value/8,
        angleBegin: s * sectorAngle,
        angleEnd: (s+1) * sectorAngle
      })
    })
  }
  function legend (data) {

    console.log("data", data)

    let k = -1
    function positionLabel(inputs) {
      let pos = {
        left: 0,
        top: 0,
        labelWidth: 200
      }
      switch (inputs.coordinates) {
        case 'cartesian':
          pos = inputs.pos
          break
        case 'polar':
          console.log("inputs.pos",inputs.pos)
          console.log("maxRadius",maxRadius)
          console.log("props.width",props.width)
          let labelWidth = 40//window.innerWidth/2 - props.width/2*inputs.pos.radius
          let R = props.width/2 * inputs.pos.radius
          let a = (inputs.pos.angle+90)/360
          let cos = -R*Math.cos(a*2*Math.PI)
          let sin = -R*Math.sin(-a*2*Math.PI)
          console.log("R",R)
          console.log("a",a)
          console.log("cos",cos)
          console.log("sin",sin)
          let offset = 0
          if (window.innerWidth > 600) { offset -= 22.5}
          k += 1
          pos = {
            left: (props.width)/2-labelWidth/2+cos + offset,
            top: -props.width/2-k*labelWidth-labelWidth/2-sin,//props.width/2,
            labelWidth: labelWidth,
            labelHeight: labelWidth
          }
          break
      }
      return(
        <Box
          key={random_id()}
          sx={{
            position: 'relative',
            left: pos.left,
            top: pos.top,
            width: pos.labelWidth,
            height: pos.labelHeight,
            minHeight: pos.labelHeight,
            maxHeight: pos.labelHeight,
            //background: 'yellow',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            m: 0,
            p: 0
          }}
        >
          <Typography
            variant='caption'
            sx={{
              m: 0,
              p: 0
            }}
            color={inputs.fontColor}
          >
            {inputs.value}
          </Typography>
        </Box>
      )
    }

    let s = -1
    return (
    <Container
      sx={{
        m: 0,
        p: 0,
        maxHeight: 0,
      }}
    >
        {
          data.map(sector => {
            s += 1
            console.log("sector",sector)
            return positionLabel({
              coordinates: 'polar',
              pos: {
                radius: 0.9,
                angle: (s+0.5)*sectorAngle
              },
              value: sector.label,
              fontColor: 'grey',
              //value: sector.label + '\n' + sector.value/8,
            })
          })
        }
        {
          data.map(sector => {
            s += 1
            console.log("sector",sector)
            return positionLabel({
              coordinates: 'polar',
              pos: {
                radius: 0.75,
                angle: (s+0.5)*sectorAngle
              },
              value: Math.floor(100*sector.value/8) + '%',
              fontColor: 'black',
            })
          })
        }
    </Container>
    )
  }

  return (
    <Box
        sx={{
            borderRadius: 1,
            m: 0,
            p: 0,
        }}
    >
      <Canvas 
        draw={draw}
        width={props.width}
        height={props.width} 
        margin={0}
        padding={0}
      />
      {legend(props.inputs.data)}
    </Box>
  )
}
