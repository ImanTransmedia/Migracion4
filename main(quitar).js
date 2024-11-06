import { loadVideo } from "./loader.js";
import { loadAudio } from "./loader.js";
import { createChromaMaterial } from "./chroma-video.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", async() => {
  
  // Configuración de MindAR y Three.js
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "Target/targets.mind"
  });

    const { renderer, scene, camera } = mindarThree;

    // Configuración del audio
    const audioClip = await loadAudio(
      "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/AUDIO_CR_V1_2.mp3?v=1702306241238"
    );
    const listener = new THREE.AudioListener(); 
    camera.add(listener);
    const audio = new THREE.PositionalAudio(listener);
    audio.setBuffer(audioClip);
    audio.setRefDistance(100);
    // Volumen
    audio.setVolume(9.0);

    const videosData = [
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2000-MAIN.mp4?v=1702332451877",
        position: new THREE.Vector3(0, 0, 0),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2001-MAIN.mp4?v=1702332455111",
        position: new THREE.Vector3(0, 0, 0.1),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2002-MAIN.mp4?v=1702332455784",
        position: new THREE.Vector3(0, 0, 0.2),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2003-MAIN.mp4?v=1702332456514",
        position: new THREE.Vector3(0, 0, 0.3),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2004-MAIN.mp4?v=1702332457314",
        position: new THREE.Vector3(0, 0, 0.4),
      },
      {
        url: "https://cdn.glitch.global/5b7a1209-5438-4fcd-96dc-ba81f0837a93/Ar%20Cr%20Plano%2005-MAIN.mp4?v=1702332458527",
        position: new THREE.Vector3(0, 0, 0.5),
      },
    ];

    const videos = await Promise.all(
      videosData.map(async (videoData) => {
        const videoTexture = await loadVideo(videoData.url);
        const video = videoTexture.image;

        const geometry = new THREE.PlaneGeometry(1, 1080 / 1080);
        const material = createChromaMaterial(videoTexture, 0x14ff09, 0.4, 0.2);
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = 0;
        plane.position.copy(videoData.position);
        plane.scale.multiplyScalar(0.5);

        const anchor = mindarThree.addAnchor(1);
        anchor.group.add(plane);
        anchor.group.add(audio);

        anchor.onTargetFound = () => {
          video.play();
          audio.play();
        };

        anchor.onTargetLost = () => {
          video.pause();
          audio.pause();
        };

        return { video, plane };
      })
    );

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      videos.forEach(({ video, plane }) => {});

      renderer.render(scene, camera);
    });


});
