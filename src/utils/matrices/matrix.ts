import { Vector4 } from '..';

class Matrix4 {
  data = new Float32Array([]);

  constructor(data: Vector4[]) {
    this.data = new Float32Array([
      ...data[0].asArray(),
      ...data[1].asArray(),
      ...data[2].asArray(),
      ...data[3].asArray(),
    ]);
  }

  row(index: number): Vector4 {
    return new Vector4(
      this.data[index * 4],
      this.data[index * 4 + 1],
      this.data[index * 4 + 2],
      this.data[index * 4 + 3],
    );
  }

  column(index: number): Vector4 {
    return new Vector4(
      this.data[index],
      this.data[index + 4],
      this.data[index + 8],
      this.data[index + 12],
    );
  }

  multiply(otherMat: Matrix4): Matrix4 {
    return new Matrix4(
      new Array(4).fill(null).map((_, rowIndex) => {
        return new Vector4(
          ...new Array(4).fill(null).map((_, columnIndex) => {
            return this.row(rowIndex).multiply(otherMat.column(columnIndex));
          }),
        );
      }),
    );
  }

  apply(vec: Vector4): Vector4 {
    return new Vector4(
      ...vec.asArray().map((_, index) => {
        return vec.multiply(this.column(index));
      }),
    );
  }
}

export { Matrix4 };
