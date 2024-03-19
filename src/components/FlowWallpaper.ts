import Paw from "./paw.svg";

export class FlowWallpaper {
  public canvas: HTMLCanvasElement | undefined;
  public img: HTMLImageElement | undefined;
  public width: number | undefined;
  public height: number | undefined;
  public offset = 0;

  constructor() {}

  get gap() {
    if (this.img) {
      return this.img.width;
    }
    return 0;
  }

  get itemWidth() {
    if (this.img) {
      return this.img.width + this.gap;
    }
    return 0;
  }

  get count() {
    if (this.width && this.img) {
      return Math.ceil(this.width / this.itemWidth);
    }
    return 0;
  }

  get lineCount() {
    if (this.height && this.img) {
      return Math.ceil(this.height / this.img.height);
    }
    return 0;
  }

  create() {
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d")!;
    ctx.fillStyle = "#e6e6e6";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    return this.canvas;
  }

  setSize(width: number | undefined, height: number | undefined) {
    const { canvas } = this;
    if (canvas) {
      this.width = width || canvas.width;
      this.height = height || canvas.height;
      const ctx = canvas.getContext("2d")!;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = this.width;
      canvas.height = this.height;
      ctx.fillStyle = "#e6e6e6";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, 0, 0);
    }
  }

  loadImage() {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.src = Paw;
      image.onload = () => {
        this.img = image;
        resolve(image);
      };
    });
  }

  render() {
    const { canvas, img } = this;
    if (!canvas || !img) {
      return;
    }
    for (let m = 0; m < this.lineCount; m++) {
      for (let n = 0; n < this.count; n++) {
        this.draw(m, n);
      }
    }
    requestAnimationFrame(() => {
      this.offset += 0.5;
      if (this.offset > this.itemWidth) {
        this.offset = 0;
      }
      const ctx = this.canvas!.getContext("2d")!;
      ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
      this.render();
    });
  }

  draw(row: number, col: number) {
    const { canvas, img } = this;
    if (!canvas || !img) {
      return;
    }
    const ctx = canvas.getContext("2d")!;
    col = (row % 2 === 0 ? 0 : 0.5) + col;
    const x = this.offset + col * this.itemWidth;
    if (x > this.width!) {
      return;
    }
    if (x + this.itemWidth > this.width!) {
      ctx.drawImage(img, this.offset - this.itemWidth, row * img.height, img.width, img.height);
    }
    ctx.drawImage(img, this.offset + col * this.itemWidth, row * img.height, img.width, img.height);
  }
}
