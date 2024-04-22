import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  Paper
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import {serviceAdminGetDatabaseLoad} from '../admin.services.js'

export default function AdminStats() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('AdminStats')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    adminState: useSelector((state) => state.adminSlice.state),
    adminStats: useSelector((state) => state.adminSlice.stats),
  }

  console.log("select.adminStats", select.adminStats)

  if (select.adminState.stats === undefined) {
    serviceAdminGetDatabaseLoad()
  }

  return (
    <Box 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Box
        sx={{
          width: '90%',
        }}
      >

        <Typography sx={{ p: 2 }} variant="h5" component="span" gutterBottom >
          {"Admin KPIs"}
        </Typography>



        {select.adminState.stats !== 'available' ? (
            <Box sx={{ left: '10%', right: '10%' }}>
              <LinearProgress />
            </Box>
        ) : (
          <Box sx={{ mt:2 }}>
            <Stack direction="row" justifyContent="space-between" sx={{pl: 2.5, pr: 2}}>
              <Typography  sx={{fontWeight: 'bold'}}>
                  {'Storage consumption (512Mb)'}
              </Typography>
              <Typography  sx={{fontWeight: 'bold'}}>
                  { Math.floor(10000 * select.adminStats.size / 512000)/100 + '%'}
              </Typography>
            </Stack>  
            <ListItem key={'listitem-' + select.adminStats.name}>
              <StatLine stat={{...select.adminStats}}/>
            </ListItem>
          </Box>
        )}
      </Box>
    </Box>
  )
}

function StatLine (props) {
  //console.log("StatLine", props.stat)
  //console.log("props.stat.substats", props.stat.substats)
    return (
      <Box sx={{ width: '100%', pt: 0, pb: 0, pl: 0.5}}
      >
        <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
            <Typography>
                {props.stat.name}
            </Typography>
            <Typography>
                {props.stat.count + ' / ' + Math.floor(props.stat.size) + 'Kb / ' + props.stat.weight + '%'}
            </Typography>
        </Stack>  
        { props.stat.substats === undefined ? (null) : (
          <List dense={false} >
              {props.stat.substats.map((substat) => {
                console.log("MAPPING props.stat.substats")
                return ( 
                  <ListItem key={'listitem-' + substat.name} sx={{ pr: 0, pb: 0, pt: 0}}>
                    <StatLine stat={{...substat}}/>
                  </ListItem>
                )
              })}
          </List>
        )}  
      </Box>
    )
}