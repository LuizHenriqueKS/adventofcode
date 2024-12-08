import fs from 'fs';
import path from 'path'

function readTextFile(file: string, dir?: string): string {
  let fullPath = file;
  if (dir) {
    fullPath = path.join(dir, fullPath);
  }
  return fs.readFileSync(fullPath, 'utf8').toString();
}

function readMatrixFileAsNumber(file: string, dir?: string, colSplitter = '   '): number[][] {
  const data = readTextFile(file);
  return data.split('\n').filter(row => row.trim()).map(row => row.split(colSplitter).map(Number));
}

function getCol(matrix: number[][], colIndex: number): number[] {
  return matrix.map(row => row[colIndex]);
}

export { readTextFile, readMatrixFileAsNumber, getCol };