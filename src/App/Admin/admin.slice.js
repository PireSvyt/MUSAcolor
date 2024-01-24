import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: {
    state: {},
    stats: {
      name: "Total",
      substats: [],
      size: null,
      weight: 1
    }
  },
  reducers: {
    lock: (state, action) => {
        state.state[action.payload] = "loading"
    },
    set: (state, action) => {
        if (action.payload.stats !== undefined) {
            state.stats = packageStats(action.payload.stats)
            state.state.stats = 'available'
        }
    },
  },
})

export default adminSlice.reducer

function packageStats (inputStats) {
  // Object sizes in kb
  let objectSizes = {
    admin: 89/4, // assumed the same as practician
    practician: 89/4, // assumed the same as admin
    patients: 72/9,
    pvo: 5.4,
    luscher8: 1.8,
    settings:  72/9 // assumed not bigger than patients
  }
  let outputStats = {
      name: "Total",
      substats: [],
      weight: 100
  }
  let grandTotal = 0
  Object.keys(inputStats).forEach(inputStat => {
    if (inputStats[inputStat] instanceof String) {
      grandTotal += inputStats[inputStat]
      outputStats.substats.push({
        name: inputStat,
        count: inputStats[inputStat]
      })
    }
    if (inputStats[inputStat] instanceof Array) {
      // Loop through children
      let total = 0
      inputStats[inputStat].forEach(subStat => {
        total += subStat.count
      })
      grandTotal += total
      outputStats.substats.push({
        name: inputStat,
        count: total,
        substats: inputStats[inputStat].map(subStat => {
          return {
            name: subStat._id,
            count: subStat.count,
            size: objectSizes[subStat._id] * subStat.count
          }
        })
      })
    }
  })
  // Total and size
  outputStats.count = grandTotal
  let grandSize = 0
  Object.keys(outputStats.substats).forEach(substat => {
    let substatSize = 0
    if (outputStats.substats[substat].substats !== undefined) {
      Object.keys(outputStats.substats[substat].substats).forEach(subsubstat => {
        substatSize += outputStats.substats[substat].substats[subsubstat].size
      })
    }
    outputStats.substats[substat].size = substatSize
    grandSize += substatSize
  })
  outputStats.size = grandSize
  // Shares
  Object.keys(outputStats.substats).forEach(substat => {
    if (outputStats.substats[substat].substats !== undefined) {
      outputStats.substats[substat].weight = 
        Math.floor(outputStats.substats[substat].size / grandSize * 100)      
      Object.keys(outputStats.substats[substat].substats).forEach(subsubstat => {
        outputStats.substats[substat].substats[subsubstat].weight = 
          Math.floor(outputStats.substats[substat].substats[subsubstat].size / grandSize * 100)
      })
    }
    outputStats.substats[substat].weight = 
    Math.floor(outputStats.substats[substat].size / grandSize * 100)          
  })
  return outputStats
}