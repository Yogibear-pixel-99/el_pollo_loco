// drawFrame(ctx) {
//   if (
//     this instanceof Character ||
//     this instanceof Thrownbottle ||
//     this instanceof Coin ||
//     this instanceof Bottle ||
//     this instanceof Chicken ||
//     this instanceof Minichicken ||
//     this instanceof Endboss
//   ) {
//     ctx.beginPath();
//     ctx.lineWidth = "1";
//     ctx.strokeStyle = "blue";
//     ctx.rect(this.x, this.y, this.width, this.height);
//     ctx.stroke();
//   }
// }

// drawOffsetFrame(ctx) {
//   if (
//     this instanceof Character ||
//     this instanceof Thrownbottle ||
//     this instanceof Coin ||
//     this instanceof Bottle ||
//     this instanceof Chicken ||
//     this instanceof Minichicken ||
//     this instanceof Endboss
//   ) {
//     ctx.beginPath();
//     ctx.lineWidth = "1";
//     ctx.strokeStyle = "red";
//     ctx.rect(
//       this.x + this.offset.left,
//       this.y + this.offset.top,
//       this.width - this.offset.left - this.offset.right,
//       this.height - this.offset.bottom - this.offset.top
//     );
//     ctx.stroke();
//   }
// }

// drawBossHeadHitbox(ctx) {
//   ctx.beginPath();
//   ctx.lineWidth = "3";
//   ctx.strokeStyle = "green";
//   ctx.rect(
//     this.level.endboss.offsetHead.x,
//     this.level.endboss.offsetHead.y,
//     this.level.endboss.offsetHead.width,
//     this.level.endboss.offsetHead.height
//   );
//   ctx.stroke();
// }

// obj.drawFrame(this.ctx);
// obj.drawOffsetFrame(this.ctx);
// this.drawBossHeadHitbox(this.ctx);
