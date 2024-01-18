import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Button, Typography, IconButton, colors } from '@mui/material'
import AddIcon from '@mui/icons-material/Add.js'
import LinearProgress from '@mui/material/LinearProgress'
import { PropaneSharp } from '@mui/icons-material'


export default function ExamPVO(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('ExamPVO', props.exam)
  }
  // i18n
  const { t } = useTranslation()

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
                                    {Object.keys(inputs.rows[row].cols).map(col => {
                                        let cellColor = 'yellow'
                                        if (inputs.rows[row].cols[col].state === 'hidden') {
                                            cellColor = 'grey'
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
                                                    backgroundColor: cellColor
                                                }}
                                                onClick={() => changes.flip({
                                                    row: row,
                                                    col: col
                                                })}
                                            />
                                        )
                                    })}
                                </Box>
                            )
                        })}
                    </Box>
                    
                    <Button
                        onClick={changes.store}
                        variant="contained"
                        size="large"
                        disabled={props.exam.state.storage !== undefined}
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
  const [inputs, setInputs] = useState({
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
  })

  return (
    <Box>
        { props.exam.state.analysis === 'available' 
          ? (<Analysis inputs={props.exam.analysis}/>)
          : props.exam.state.storage !== undefined 
          ? (<Outro/>)
          : (stages[stage].render())
        }
    </Box>
  )
}
