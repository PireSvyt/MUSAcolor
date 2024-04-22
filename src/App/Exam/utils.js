export function getRow(grid, r) {
  let numberOfCols = Object.keys(grid[0]).length
  let row = []
  for (let c = 0; c < numberOfCols; c++) {
    row.push(grid[r][c])
  }
  return row
}
export function setRow(grid, r, newRow) {
  let numberOfCols = Object.keys(grid[0]).length
  /*if (newRow.length !== numberOfRows) {
        console.log("! setRow with inconsistent data")
        return undefined
    } else {*/
  let newGrid = { ...grid }
  for (let c = 0; c < numberOfCols; c++) {
    newGrid[r][c] = newRow[c]
  }
  return newGrid
  //}
}
export function getColumn(grid, c) {
  let numberOfRows = Object.keys(grid).length
  let column = []
  for (let r = 0; r < numberOfRows; r++) {
    column.push(grid[r][c])
  }
  return column
}
export function setColumn(grid, c, newColumn) {
  let numberOfRows = Object.keys(grid).length
  //console.log("setColumn " + c + " with " + newColumn)
  let newGrid = { ...grid }
  for (let r = 0; r < numberOfRows; r++) {
    newGrid[r][c] = newColumn[r] + ''
  }
  return newGrid
}
export function shuffleList(list) {
  let newList = []
  let listLength = list.length
  for (let l = 0; l < listLength; l++) {
    newList.push(list.splice(Math.floor(Math.random() * list.length), 1)[0])
  }
  return newList
}
export function removeDuplicate(list) {
  let noDuplicateList = []
  for (let l = 0; l < list.length; l++) {
    if (list.indexOf(list[l]) !== list.lastIndexOf(list[l])) {
      noDuplicateList.push(list[l])
    }
  }
  return [...new Set(noDuplicateList)]
}
