import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {getRow, setRow, shuffleList} from '../utils.js'


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
                                        <CheckCircleIcon color={
                                            inputs.rows[row].invalid === true 
                                            ? 'disabled'
                                            : "success"
                                        }/>
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
            }}
        >
            <Typography sx={{ p: 2 }} component="span" variant="h5" gutterBottom>
                {t('exam.label.results')}
            </Typography>

            <Box>
                {Object.keys(testColors).map(testColor => {
                    //console.log("testColor", testColor, testColors[testColor])
                    //console.log("props.exam.analysis.colors", props.exam.analysis.colors[testColors[testColor].color])
                    return (
                        <Box
                        key={'color-'+testColors[testColor].color}
                        sx={{                        
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: tileSize * 14,
                        }}
                        >
                            <Box
                                sx={{   
                                    m: m+'px',                     
                                    height: tileSize,
                                    width: tileSize * props.exam.analysis.colors[testColors[testColor].color],
                                    background: testColors[testColor].color
                                }}
                            />
                            <Box
                            sx={{                        
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                            >
                                <Box
                                sx={{               
                                    width: tileSize * 2,
                                    textAlign: 'right',
                                    m: 0.5,
                                }}
                                >
                                    <Typography>
                                        {Math.floor(100*props.exam.analysis.colors[testColors[testColor].color]/numberOfCols) + '%'}
                                    </Typography>
                                </Box>
                                <Box
                                sx={{               
                                    width: tileSize * 3,
                                    textAlign: 'left',
                                    m: 0.5,
                                }}
                                >
                                    <Typography color="grey">
                                        {t("exam.label."+testColors[testColor].name)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>

            <Typography
                sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
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
    <Box>
        { props.exam.state.analysis === 'available' 
          ? (<Analysis/>)
          : props.exam.state.storage !== undefined 
          ? (<Outro/>)
          : (stages[stage].render())
        }
    </Box>
  )
}
