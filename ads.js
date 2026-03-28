// --- SYED SMART ADS CONFIGURATION ---
// Is file mein aapke banners automatic switch honge

const myAds = [
    {
        // 1. Syed Kirana Banner
        img: "https://i.postimg.cc/9Fc4142F/syed-kirana-banner.png", 
        link: "https://wa.me/91XXXXXXXXXX?text=Order+Kirana+Items"
    },
    {
        // 2. Second Banner (Syed Natural/Grocery)
        img: "https://i.postimg.cc/cLgdcZvR/file-00000000e57471fa8933bd89ffb38f7e.png", 
        link: "https://wa.me/91XXXXXXXXXX?text=I+want+to+order"
    }
];

let currentAd = 0;

function rotateAds() {
    const adImg = document.getElementById('ad-img');
    const adLink = document.getElementById('ad-link');
    
    if (!adImg || !adLink) return;

    // Smooth Fade-out effect (0.5 second)
    adImg.style.opacity = 0;

    setTimeout(() => {
        // Agla ad select karein
        currentAd = (currentAd + 1) % myAds.length;
        
        // Naya image aur link set karein
        adImg.src = myAds[currentAd].img;
        adLink.href = myAds[currentAd].link;
        
        // Smooth Fade-in effect
        adImg.style.opacity = 1;
    }, 500); 
}

// Page load hote hi ads shuru karne ke liye
window.addEventListener('DOMContentLoaded', () => {
    const adImg = document.getElementById('ad-img');
    const adLink = document.getElementById('ad-link');

    if (adImg && adLink && myAds.length > 0) {
        // Pehla ad turant dikhane ke liye
        adImg.src = myAds[0].img;
        adLink.href = myAds[0].link;
        adImg.style.opacity = 1;

        // Har 5 second (5000ms) mein automatic switch
        setInterval(rotateAds, 5000);
    }
});
