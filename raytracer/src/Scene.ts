import { Shape, ShapeHit } from './Shapes/Shape';
import { Material } from './Materials/Material';
import Camera from './Camera';
import Color from './Color';
import Ray from './Ray';

export default class Scene {
  public readonly width: number;
  public readonly height: number;
  public readonly depth: number;
  private x = 0;
  private y = 0;
  private range = 20;

  constructor(width: number, height: number, depth: number) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  private getColor(ray: Ray, shapes: Shape[], depth: number): Color {
    let hit: ShapeHit | undefined;
    let max = Infinity;
    let material: Material | undefined;

    shapes.forEach((shape) => {
      const newHit = shape.hit(ray, 0.001, max);
      if (newHit !== undefined) {
        hit = newHit;
        material = shape.material;
        max = (newHit.t !== undefined) ? newHit.t : max;
      }
    });
    if (hit !== undefined && material !== undefined) {
      const res = material.scatter(ray, hit);

      if (depth < 50 && res !== undefined) {
        return res.attenuation.mul(this.getColor(res.scattered, shapes, depth + 1));
      }
      return new Color(0, 0, 0);
    }
    const t = (ray.direction.unit().y + 1) * 0.5;
    return new Color(1, 1, 1).mul(1 - t).add(new Color(0.5, 0.7, 1).mul(t));
  }

  private async drawPixel(x: number, y: number, color: Color, context: CanvasRenderingContext2D) {
    color.div(this.depth).sqrt();
    context.fillStyle = `rgb(${color.r * 0xff}, ${color.g * 0xff}, ${color.b * 0xff})`;
    context.fillRect(x, this.height - y, 1, 1);
  }

  public render(context: CanvasRenderingContext2D, camera: Camera, shapes: Shape[]): void {
    for (let y = 0; this.y + y >= 0 && y < this.range; y += 1) {
      for (let x = 0; this.x + x < this.width && x < this.range; x += 1) {
        const col = new Color(0, 0, 0);
        for (let z = 0; z < this.depth; z += 1) {
          col.add(this.getColor(
            camera.getRay(
              (this.x + x + Math.random()) / this.width,
              (this.y + y + Math.random()) / this.height),
            shapes, 0));
        }
        this.drawPixel(this.x + x, this.y + y, col, context);
      }
    }
    this.x += this.range;
    if (this.x >= this.width) {
      this.x = 0;
      this.y += this.range;
    }
    setTimeout(() => this.render(context, camera, shapes), 0);
  }
}
