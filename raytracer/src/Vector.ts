export default class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public add(value: Vector | number): Vector {
    if (typeof(value) === 'number') {
      this.x += value;
      this.y += value;
      this.z += value;
    } else {
      this.x += value.x;
      this.y += value.y;
      this.z += value.z;
    }
    return this;
  }

  public sub(value: Vector | number): Vector {
    if (typeof(value) === 'number') {
      this.x -= value;
      this.y -= value;
      this.z -= value;
    } else {
      this.x -= value.x;
      this.y -= value.y;
      this.z -= value.z;
    }
    return this;
  }

  public mul(value: Vector | number): Vector {
    if (typeof(value) === 'number') {
      this.x *= value;
      this.y *= value;
      this.z *= value;
    } else {
      this.x *= value.x;
      this.y *= value.y;
      this.z *= value.z;
    }
    return this;
  }

  public div(value: Vector | number): Vector {
    if (typeof(value) === 'number') {
      this.x /= value;
      this.y /= value;
      this.z /= value;
    } else {
      this.x /= value.x;
      this.y /= value.y;
      this.z /= value.z;
    }
    return this;
  }

  public dot(vector: Vector = this): number {
    return (this.x * vector.x + this.y * vector.y + this.z * vector.z);
  }

  public magnitude(): number {
    return Math.sqrt(this.dot());
  }

  public clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  public unit(): Vector {
    return this.clone().div(this.magnitude());
  }

  public reflect(vector: Vector = this): Vector {
    return this.clone().sub(vector.clone().mul(this.dot(vector) * 2));
  }

  public refraction(n: Vector, niOverNt: number): Vector | undefined {
    const uv = this.unit();
    const dt = uv.dot(n);
    const discriminant = 1 - niOverNt * niOverNt * (1 - dt * dt);

    if (discriminant > 0) {
      return uv.clone().sub(n.clone().mul(dt))
        .mul(niOverNt).sub(n.clone().mul(Math.sqrt(discriminant)));
    }
    return undefined;
  }

  public cross(vec: Vector): Vector {
    return new Vector(
      this.y * vec.z - this.z * vec.y,
      -(this.x * vec.z - this.z * vec.x),
      this.x * vec.y - this.y * vec.x,
    );
  }

  public static randomInUnitDisk(): Vector {
    let p: Vector;
    do {
      p = new Vector(Math.random(), Math.random(), 0).mul(2).sub(new Vector(1, 1, 0));
    } while (p.dot() >= 1);
    return p;
  }

  public static randomInUnitSphere(): Vector {
    let p: Vector;
    do {
      p = new Vector(Math.random(), Math.random(), Math.random()).mul(2).sub(1);
    } while (p.dot() >= 1);
    return p;
  }
}
