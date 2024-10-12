import { createSlice } from '@reduxjs/toolkit'
import { stringifyDate } from "./toolkit.js"

const comparisonSlice = createSlice({
  name: 'comparisonSlice',
  initialState: {
    state: "",
    type: "",
    content: {}
  },
  reducers: {
    loadContent: (state) => {
      state.state = 'loading'
    },
    unloadContent: (state) => {
      state.state = ""
      state.content = {}
    },
    setContent: (state, action) => {
	    let content = {
		    Xs: [],
		    Ys: [],
	    }
	    switch (state.type) {
		    case "pvo": 
			    let exams = [...action.payload]
			    exams.sort((a,b) => {
				    return a.date-b.date
			    })
			    exams.forEach(exam => {
				    content.Xs.push(stringifyDate(exam.date))
				    Object.keys(exam.analysis.colors).forEach(color => {
					    if (content.Ys[color] === undefined) {
						    content.Ys[color] = {
						      data: [ exam.analysis.colors[color] / 8 * 100 ],
						      type: 'line',
						      lineStyle: {
						        color: color,
						        width: 4,
						      },
						      symbol: 'none'
						    }
					    } else {
						    content.Ys[color].data.push( exam.analysis.colors[color] / 8 * 100 )
					    }
				    })
			    })
			    break
	    }
			state.content = content
      state.state = 'loaded'
    },
    change: (state, action) => {
      if (action.payload.state !== undefined) {
        state.state = action.payload.state
      }
      if (action.payload.type !== undefined) {
        state.type = action.payload.type
      }
    },
  },
})

export default comparisonSlice.reducer