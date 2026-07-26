// † Black Dream Garden † マウスストーカー・スクリプト
document.addEventListener('DOMContentLoaded', () => {
    // 降らせる記号のリスト（十字架と光の粒子）
    const shapes = ['†', '✦', '•', '✧', '†'];
    // 粒子の色（赤、紫、ダークピンク、ゴールド）
    const colors = ['#ff0055', '#7b00ff', '#ff00aa', '#cca300'];

    document.addEventListener('mousemove', (e) => {
        // 毎回100%発生させると重くなるので、ランダムで少し間引く
        if (Math.random() > 0.3) return;

        // 粒子の要素を作成
        const particle = document.createElement('span');

        // ランダムで記号と色を選択
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.innerText = shape;

        // スタイルを設定（初期位置はマウスカーソルの座標）
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.color = color;
        particle.style.fontSize = Math.floor(Math.random() * 10 + 10) + 'px'; // 10px〜20px
        particle.style.pointerEvents = 'none'; // マウス操作を邪魔しない
        particle.style.zIndex = '9999';
        particle.style.fontFamily = 'serif';

        // 妖しく光る影（ネオン効果）
        particle.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}`;

        // ランダムな方向に散らばる初期速度
        const speedX = (Math.random() - 0.5) * 3;
        const speedY = (Math.random() - 0.5) * 3 + 1; // やや下方向に落ちる

        let opacity = 1;
        let posX = e.clientX;
        let posY = e.clientY;
        let scale = 1;

        document.body.appendChild(particle);

        // アニメーション処理（消えながら散る）
        const animate = () => {
            opacity -= 0.02; // 徐々に透明に
            scale -= 0.01;   // 徐々に小さく
            posX += speedX;
            posY += speedY;

            particle.style.opacity = opacity;
            particle.style.transform = `translate(-50%, -50%) scale(${scale})`;
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove(); // 完全に消えたら要素を削除してメモリを節約
            }
        };

        requestAnimationFrame(animate);
    });
});