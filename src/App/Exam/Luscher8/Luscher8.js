import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {getRow, setRow, shuffleList} from '../utils.js'


export default function ExamLuscher8(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ExamLuscher8')//, props.exam)
  }
  // i18n
  const { t } = useTranslation()

  // Const
  const flippedColor = 'lightgrey'
  const testColors = [
    { color: '#BF00BF', name: "pourpre" },
    { color: '#2A9248', name: "foret" },
    { color: '#FFFF00', name: "jaune" },
    { color: '#8C4600', name: "marron" },
    { color: '#007FFF', name: "bleu" },
    { color: '#FF0000', name: "rouge" },
    { color: '#000000', name: "noir" },
    { color: '#999999', name: "gris" },
  ]
  let numberOfRows = 2
  let numberOfCols = 8
  let debugGrid = false

  // Functions
  function randomColorSelection() {
    let outcome = {
        rows: {},
        invalid: true
    }
    let availableColors = []

    let initialGrid = getEmptyGrid()
    // Fill in tiles
    for (let c = 0; c < numberOfCols; c++ ) {
        for (let r = 0; r < numberOfRows; r++ ) {
            initialGrid[r][c] = testColors[c].color
        }
    }
    // Suffle tiles within rows
    for (let r = 0; r < numberOfRows; r++ ) {
        let currentRow = getRow(initialGrid, r)
        currentRow = shuffleList(currentRow)
        initialGrid = setRow(initialGrid, r, currentRow)
    }
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
                state: 'visible',
                time: null
            }
        }
    }
    return outcome  
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
        if (rowFlips !== numberOfCols) {
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
                currentInputs.rows[c.row].cols[c.col].time =  Date.now()
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
                type: 'luscher8'
            }
        })
    },
    getanalysis: () => {
        props.getanalysis()
    }
  }

  const stages = [
    {
        name: "intro1",
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
                    data-testid='page-exam-stage-intro1'
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
                        data-testid='page-exam-button-begin1'
                    >
                        {t('generic.button.begin')}
                    </Button>

                </Box>
            )
        }
    },
    {
        name: "test1",
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
                    data-testid='page-exam-stage-test1'
                >
                    <Box/>

                    <Box>
                        <Box
                            key={'row-'+1.1}
                            sx={{                        
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                            }}
                        >
                            {Object.keys(inputs.rows[0].cols).map(col => {
                                let row = 0
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
                                        data-testid={'component-luscher8-test-'+'R-'+row+'-C-'+col}
                                    />
                                )
                            })}
                        </Box>
                    </Box>
                    
                    <Button
                        onClick={changes.nextstage}
                        variant="contained"
                        size="large"
                        disabled={inputs.rows[0].invalid === true}
                        data-testid='page-exam-button-next1'
                    >
                        {t('generic.button.next')}
                    </Button>
                </Box>
            )
        }
    },
    {
        name: "intro2",
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
                    data-testid='page-exam-stage-intro2'
                >
                    
                    <Typography sx={{ p: 2 }} component="span" variant="h6" gutterBottom>
                        {t('exam.exams.'+props.exam.type+'.intro2')}
                    </Typography>

                    <Typography
                        sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                        variant="h6"
                        component="span"
                        align="center"
                    >
                        {t('exam.exams.'+props.exam.type+'.intro2details')}
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
                        data-testid='page-exam-button-begin2'
                    >
                        {t('generic.button.next')}
                    </Button>

                </Box>
            )
        }
    },
    {
        name: "test2",
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
                    data-testid='page-exam-stage-test2'
                >
                    <Box/>

                    <Box>
                        <Box
                            key={'row-'+1.2}
                            sx={{                        
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                            }}
                        >
                            {Object.keys(inputs.rows[1].cols).map(col => {
                                let row = 1
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
                                        data-testid={'component-luscher8-test-'+'R-'+row+'-C-'+col}
                                    />
                                )
                            })}
                        </Box>
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
            }}
            data-testid='page-exam-stage-analysis'
        >
            <Typography sx={{ p: 2 }} component="span" variant="h5" gutterBottom>
                {t('exam.label.results')}
            </Typography>

            <Box
            sx={{                        
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: window.innerHeight/3
            }}
            >   
                <Box/>
                {Object.keys(props.exam.analysis.rows).map(row => {
                    return (
                        <Box
                        key={'analysis-row-'+row}
                        sx={{                        
                            display: 'inline-flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: window.innerWidth/2
                        }}
                        >
                            {Object.keys(props.exam.analysis.rows[row].terms).map(term => {
                                return (
                                    <Box
                                    key={'analysis-row-'+row+'-term-'+term}
                                    sx={{                        
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-evenly',
                                        textAlign: 'center'
                                    }}
                                    >
                                        <Typography variant='h5'>
                                            {t('exam.exams.'+props.exam.type+'.'+term)}
                                        </Typography>
                                        <Typography variant='h5'>
                                            {props.exam.analysis.rows[row].terms[term][0] + " " + props.exam.analysis.rows[row].terms[term][1]}
                                        </Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    )
                })}
                <Box/>
            </Box>

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
