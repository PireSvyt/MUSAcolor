import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {getRow, setRow, shuffleList} from '../utils.js'

import ChartPVO from './ChartPVO/ChartPVO.js'

export default function ExamPVO(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ExamPVO')//, props.exam)
  }
  // i18n
  const { t } = useTranslation()

  // Const
  const flippedColor = 'lightgrey'
  const testColors = [
    { color: '#7F00FF', name: "violet" },
    { color: '#0000FF', name: "indigo" },
    { color: '#007FFF', name: "bleu" },
    { color: '#00FFFF', name: "cyan" },
    { color: '#00FFBF', name: "turquoise" },
    { color: '#00FF00', name: "vert" },
    { color: '#BFFF00', name: "chartreuse" },
    { color: '#FFFF00', name: "jaune" },
    { color: '#FF7F00', name: "orange" },
    { color: '#FF0000', name: "rouge" },
    { color: '#FF007F', name: "rubis" },
    { color: '#FF00FF', name: "magenta" }
  ]
  let numberOfRows = testColors.length
  let numberOfCols = 8
  let debugGrid = false

  // Functions
  function randomColorSelection() {
    let outcome = {
        rows: {},
        invalid: true
    }
    let availableColors = []
    const randmoness = 'pseudorandom'
    switch (randmoness) {
        case 'fullyrandom': 
            Object.keys(testColors).forEach(testColor => {
                for (let c = 0; c < numberOfCols; c++) {
                    availableColors.push(testColors[testColor].color)
                }
            })
            //console.log("availableColors", availableColors)
            for (let r = 0; r < numberOfRows; r++) {
                outcome.rows[r] = {
                    id: r,
                    cols: {},
                    invalid: true
                }
                for (let c = 0; c < numberOfCols; c++) {
                    outcome.rows[r].cols[c] = {
                        id: c,
                        color: availableColors.splice(Math.floor(Math.random() * availableColors.length), 1)[0],
                        state: 'visible'
                    }
                }
            }
            break
        case 'pseudorandom':
            let initialGrid = getEmptyGrid()
            // Get tiles
            for (let r = 0; r < numberOfRows; r++ ) {
                for (let c = 0; c < numberOfCols; c++ ) {
                    availableColors.push(testColors[r].color)
                }
            } 
            // Fill in tiles
            for (let c = 0; c < numberOfCols; c++ ) {
                for (let r = 0; r < numberOfRows; r++ ) {
                    initialGrid[r][c] = availableColors.pop()
                }
            }
            // Suffle tiles within rows
            for (let r = 0; r < numberOfRows; r++ ) {
                let currentRow = getRow(initialGrid, r)
                currentRow = shuffleList(currentRow)
                initialGrid = setRow(initialGrid, r, currentRow)
            }
            // Suffle rows
            //initialGrid = shuffleList(initialGrid)
            // Wrapping as outcome
            for (let r = 0; r < numberOfRows; r++) {
                outcome.rows[r] = {
                    id: r,
                    cols: {},
                    invalid: true
                }
                for (let c = 0; c < numberOfCols; c++) {
                    outcome.rows[r].cols[c] = {
                        id: c,
                        color: initialGrid[r][c] + '',
                        state: 'visible'
                    }
                }
            }
            break
    }
    logOutcome()
    return outcome 
    
    function logOutcome() {
        let colorCount = {}
        testColors.forEach(testColor => {
            colorCount[testColor.color] = {
                count: 0,
                name: testColor.name
            }
        })
        Object.keys(outcome.rows).map(row => {
            Object.keys(outcome.rows[row].cols).map(col => {
                if (Object.keys(colorCount).includes(outcome.rows[row].cols[col].color)) {
                    colorCount[outcome.rows[row].cols[col].color].count += 1
                }
            })
        })
        if (debugGrid) {
            Object.values(colorCount).forEach(colorCounted => {
                console.log(colorCounted.count + '\t' + colorCounted.name)
            })
        }
    }      
  }
  function checkInputValidity() {
    let currentInputs = {...inputs}
    let overallIsInvalid = false
    Object.keys(inputs.rows).forEach(row => {
        let rowFlips = 0
        Object.keys(inputs.rows[row].cols).forEach(col => {
            if (inputs.rows[row].cols[col].state === 'hidden') {
                rowFlips += 1
            }
        })
        if (rowFlips !== 4) {
            overallIsInvalid = true
            currentInputs.rows[row].invalid = true
        } else {
            currentInputs.rows[row].invalid = false
        }
    })
    currentInputs.invalid = overallIsInvalid

    // WORKAROUND
    //currentInputs.invalid = false

    setInputs(currentInputs)
  }
  function getEmptyGrid() {
    let grid = {}
    for (let r = 0; r < numberOfRows; r++ ) {
        grid[r] = {}
        for (let c = 0; c < numberOfCols; c++) {
            grid[r][c] = undefined
        }
    }     
    return grid
  }

  // Changes
  let changes = {
    nextstage: () => {
        setStage(stage+1)
    },
    flip: (c) => {
        let currentInputs = {...inputs}
        if (currentInputs.rows[c.row].invalid === true 
            //&& currentInputs.rows[c.row].cols[c.col].state === 'visible'
            ) {
            if (currentInputs.rows[c.row].cols[c.col].state == 'visible') {
                currentInputs.rows[c.row].cols[c.col].state = 'hidden'
            } else {
                currentInputs.rows[c.row].cols[c.col].state = 'visible'
            }
            setInputs(currentInputs)
            // Check inputs
            checkInputValidity()
        }
    },
    store: () => {
        props.store({
            inputs: {
                results: {...inputs},
                type: 'pvo'
            }
        })
    },
    getanalysis: () => {
        props.getanalysis()
    }
  }

  // Chart
  let id = -1
  const [chartInputs, setchartInputs] = useState({
    options: {
        chart: {
            id: "basic-bar"
        },
        fill: {
            opacity: 1
        },
        yaxis: {
            show: false
        },
        plotOptions: {
            polarArea: {
              rings: {
                strokeWidth: 0
              },
              spokes: {
                strokeWidth: 0
              },
            }
        },
        legend: {
            show: false,
            onItemClick: {
              toggleDataSeries: false
            },
            onItemHover: {
                highlightDataSeries: false
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'end',
            formatter: function(val, opt) {
                //console.log(opt)
                return chartInputs.options.labels[opt.seriesIndex]
            },
            //offsetX: 0,
        },
        labels: testColors.map( (testColor) => { return testColor.name}),
        colors: testColors.map( (testColor) => { return testColor.color}),
    },
    series:  testColors.map( (testColor) => {
        return {
            data: 0,
            name: testColor.name
        }
    }),
    data:
        testColors.map( (testColor) => {
            id += 1
            return {
                id: id, 
                value: 0, 
                label: testColor.name
            }
        }),
  })
  console.log("chartInputs", chartInputs)
  useEffect(() => {
    if (props.exam.state.analysis === 'available') {
        let newChartInputs = {...chartInputs}
        newChartInputs.series = []
        newChartInputs.data = []
        //newChartInputs.options.labels = []
        //newChartInputs.options.colors = []
        console.log("props.exam.analysis", props.exam.analysis)
        console.log("testColors", testColors)
        let id = -1
        testColors.map(testColor => {
            newChartInputs.series.push({
                data: props.exam.analysis.colors[testColor.color],
                name: testColor.name + " / " + props.exam.analysis.colors[testColor.color]
            })
            id += 1
            newChartInputs.data.push({
                id: id, 
                value: props.exam.analysis.colors[testColor.color], 
                label: testColor.name,
                color: testColor.color,
            })
            //newChartInputs.options.labels.push(testColor.name)
            //newChartInputs.options.colors.push(testColor.color)
        })
        console.log("newChartInputs", newChartInputs)
        setchartInputs(newChartInputs)
      }
  }, [props.exam.state, props.exam.analysis]);
  
  

  const stages = [
    {
        name: "intro",
        render: () => {
            return (
                <Box
                    sx={{                        
                        height: window.innerHeight -100,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    data-testid='page-exam-stage-intro'
                >
                    
                    <Typography sx={{ p: 2 }} component="span" variant="h6" gutterBottom>
                        {t('exam.exams.'+props.exam.type+'.intro')}
                    </Typography>

                    <Typography
                        sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                        variant="h6"
                        component="span"
                        align="center"
                    >
                        {t('exam.exams.'+props.exam.type+'.introdetails')}
                    </Typography>
                    
                    <Typography
                        sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                        component="span"
                        align="center"
                        variant="caption"
                    >
                        {t('exam.exams.all.reminder')}
                    </Typography>
                    
                    <Button
                        onClick={changes.nextstage}
                        variant="contained"
                        size="large"
                        data-testid='page-exam-button-begin'
                    >
                        {t('generic.button.begin')}
                    </Button>

                </Box>
            )
        }
    },
    {
        name: "test",
        render: () => {
            const m = 3
            const tileSize = Math.min(
                (window.innerHeight - 300 - numberOfRows * m)/numberOfRows,
                (window.innerWidth - 180 - numberOfCols * m )/(numberOfCols + 2)
            )
            return (
                <Box
                    sx={{                        
                        height: window.innerHeight -100,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    data-testid='page-exam-stage-test'
                >
                    <Box/>

                    <Box>
                        {Object.keys(inputs.rows).map(row => {
                            //console.log("row", row, inputs.rows[row])
                            return (
                                <Box
                                    key={'row-'+row}
                                    sx={{                        
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        key={'row-'+row+'-flagbalance'}
                                        sx={{   
                                            m: m+'px',                     
                                            height: tileSize,
                                            width: tileSize,
                                        }}
                                    />
                                    {Object.keys(inputs.rows[row].cols).map(col => {
                                        //console.log("col", col, inputs.rows[row].cols[col])
                                        let cellColor = 'yellow'
                                        if (inputs.rows[row].cols[col].state === 'hidden') {
                                            cellColor = flippedColor
                                        } else {
                                            cellColor = inputs.rows[row].cols[col].color
                                        }
                                        return (
                                            <Box
                                                key={'row-'+row+'-col-'+col}
                                                data-testid={'component-pvoexam-test-'+'R-'+row+'-C-'+col}
                                                sx={{   
                                                    m: m+'px',                     
                                                    height: tileSize,
                                                    width: tileSize,
                                                    background: cellColor
                                                }}
                                                onClick={() => changes.flip({
                                                    row: row,
                                                    col: col
                                                })}
                                            />
                                        )
                                    })}
                                    <Box
                                        key={'row-'+row+'-flag'}
                                        sx={{   
                                            m: m+'px',                     
                                            height: tileSize,
                                            width: tileSize,
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                        }}
                                        
                                    >
                                        <CheckCircleIcon 
                                            color={
                                                inputs.rows[row].invalid === true 
                                                ? 'disabled'
                                                : "success"
                                            }
                                            data-testid={'component-pvoexam-test-invalid-'+'R-'+row}
                                        />
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                    
                    <Button
                        onClick={changes.store}
                        variant="contained"
                        size="large"
                        disabled={props.exam.state.storage !== undefined || inputs.invalid === true}
                        data-testid='page-exam-button-finish'
                    >
                        {t('generic.button.finish')}
                    </Button>
                </Box>
            )
        }
    }
  ]
  const Outro = ()  => {
    return (
        <Box
            sx={{                        
                height: window.innerHeight -100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            data-testid='page-exam-stage-outro'
        >
            <Typography sx={{ p: 2 }} component="span" variant="h5" gutterBottom>
            {t('exam.exams.'+props.exam.type+'.outro')}
            </Typography>

            <Typography
                sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                variant="h6"
                component="span"
                align="center"
            >
            {t('exam.exams.all.givebackdevice')}
            </Typography>

            <Button
                onClick={changes.getanalysis}
                size="large"
                disabled={props.exam.state.storage !== 'available'}
                data-testid='page-exam-button-gotoanalysis'
            >
                {t('generic.button.next')}
            </Button>
        </Box>
    )
  }
  const Analysis = () => {
    const m = 3
    const tileSize = (window.innerHeight/2)/numberOfRows
    return (
        <Box
            sx={{                        
                height: window.innerHeight -100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                m: 0,
                p: 0,
            }}
            data-testid='page-exam-stage-analysis'
        >
            <Typography sx={{ p: 2 }} component="span" variant="h5" gutterBottom>
                {t('exam.label.results')}
            </Typography>

            <ChartPVO width={window.innerWidth * 0.9} inputs={chartInputs} />

            <Typography
                sx={{ m: 2, whiteSpace: 'pre-line', width: '80%' }}
                component="span"
                align="center"
                variant="caption"
            >
                {t('exam.exams.all.disclaimer')}
            </Typography>
        </Box>
    )
  }

  // state
  const [stage, setStage] = useState(0)
  const [inputs, setInputs] = useState(randomColorSelection())

  return (
    <Box
        sx={{
            width: '100%',
            m: 0,
            p: 0,
        }}
    >
        { props.exam.state.analysis === 'available' 
          ? (<Analysis/>)
          : props.exam.state.storage !== undefined 
          ? (<Outro/>)
          : (stages[stage].render())
        }
    </Box>
  )
}
