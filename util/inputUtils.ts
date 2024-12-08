import fs from 'fs';
import path from 'path'

function readMatrixFileAsNumber(file: string, dir?: string, colSplitter = '   '): number[][] {
  let fullPath = file;
  if (dir) {
    fullPath = path.join(dir, fullPath);
  }
  const data = fs.readFileSync(fullPath, 'utf8').toString();
  return data.split('\n').filter(row => row.trim()).map(row => row.split(colSplitter).map(Number));
}

function getCol(matrix: number[][], colIndex: number): number[] {
  return matrix.map(row => row[colIndex]);
}

export { readMatrixFileAsNumber, getCol };