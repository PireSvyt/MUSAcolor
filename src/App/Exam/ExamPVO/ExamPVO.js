import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography, IconButton } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import DoneIcon from '@mui/icons-material/Done';


export default function ExamPVO(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ExamPVO')//, props.exam)
  }
  // i18n
  const { t } = useTranslation()

  // Const
  const flippedColor = 'lightgrey'
  const testColors = {
    0: { color: '#7F00FF', name: "violet" },
    1: { color: '#0000FF', name: "indogo" },
    2: { color: '#007FFF', name: "bleu" },
    3: { color: '#00FFFF', name: "cyan" },
    4: { color: '#00FFBF', name: "turquoise" },
    5: { color: '#00FF00', name: "vert" },
    6: { color: '#BFFF00', name: "chartreuse" },
    7: { color: '#FFFF00', name: "jaune" },
    8: { color: '#FF7F00', name: "orange" },
    9: { color: '#FF0000', name: "rouge" },
    10: { color: '#FF007F', name: "rubis" },
    11: { color: '#FF00FF', name: "magenta" }
  }
  // Functions
  function randomColorSelection() {
    let outcome = {
        rows: {},
        invalid: true
    }
    for (let r = 0; r < 12; r++) {
        outcome.rows[r] = {
            id: r,
            cols: {},
            invalid: true
        }
        for (let c = 0; c < 8; c++) {
            let colorPos = Math.floor(Math.random() * Object.keys(testColors).length)
            //console.log("colorPos", colorPos)
            outcome.rows[r].cols[c] = {
                id: c,
                color: testColors[colorPos].color,
                state: 'visible'
            }
        }
    }
    //console.log("randomColorSelection", outcome)
    return outcome        
  }
  function checkInputValidity() {
    let currentInputs = {...inputs}
    Object.keys(inputs.rows).forEach(row => {
        let rowFlips = 0
        Object.keys(inputs.rows[row].cols).forEach(col => {
            if (inputs.rows[row].cols[col].state === 'hidden') {
                rowFlips += 1
            }
        })
        if (rowFlips !== 4) {
            currentInputs.invalid = true
            currentInputs.rows[row].invalid = true
        } else {
            currentInputs.rows[row].invalid = false
        }
    })
    setInputs(currentInputs)
  }

  // Changes
  let changes = {
    nextstage: () => {
        setStage(stage+1)
    },
    flip: (c) => {
        let currentInputs = {...inputs}
        if (currentInputs.rows[c.row].cols[c.col].state == 'visible') {
            currentInputs.rows[c.row].cols[c.col].state = 'hidden'
        } else {
            currentInputs.rows[c.row].cols[c.col].state = 'visible'
        }
        setInputs(currentInputs)
        // Check inputs
        checkInputValidity()
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
                    <Box sx={{
                        height: 100,
                        width: 200,
                        background: 'yellow'
                    }}>

                    </Box>
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
            const tileSize = (window.innerHeight/2)/12
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
                        {t("exam.label.test")}
                    </Typography>

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
                                        <DoneIcon color={
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
                {t('exam.exams.'+props.exam.type+'.outrodetails')}
            </Typography>
            <Box sx={{
                height: 100,
                width: 200,
                background: 'yellow'
            }}>

            </Box>
            <Typography
                sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
                component="span"
                align="center"
                variant="caption"
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
    return (
        <Box>
            <Typography sx={{ p: 2 }} component="span" variant="h5" gutterBottom>
                {"ANALYSIS"}
            </Typography>
        </Box>
    )
  }

  // state
  const [stage, setStage] = useState(0)
  const [inputs, setInputs] = useState(randomColorSelection())
  /*const [inputs, setInputs] = useState({
    rows: {
        0: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        1: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        2: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        3: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        4: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        5: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        6: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        7: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        8: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        9: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        10: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        },
        11: {
            cols: {
                0: { color: "#D3D3D3", state: "visible" },
                1: { color: "#D3D3D3", state: "visible" },
                2: { color: "#D3D3D3", state: "visible" },
                3: { color: "#D3D3D3", state: "visible" },
                4: { color: "#D3D3D3", state: "visible" },
                5: { color: "#D3D3D3", state: "visible" },
                6: { color: "#D3D3D3", state: "visible" },
                7: { color: "#D3D3D3", state: "visible" },
            }
        }
    }
  })*/

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
