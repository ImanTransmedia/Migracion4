import { loadVideo } from "./loader.js";
import { loadAudio } from "./loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", async() => {
  
  // Configuración de MindAR y Three.js
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "Target/targets.mind"
  });

  
  
    const { renderer, scene, camera } = mindarThree;

//#region Video

    const videosData = [
      {
        url: "personajes/animacion personaje prop.mp4",
        position: new THREE.Vector3(0, 0, 0.1),
      },

    ];

    const videos = await Promise.all(
      videosData.map(async (videoData) => {
        const videoTexture = await loadVideo(videoData.url);
        const video = videoTexture.image;

        const geometry = new THREE.PlaneGeometry(1, 1080 / 1080);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTexture });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = 0;
        plane.position.copy(videoData.position);
        plane.scale.multiplyScalar(0.5);

        const anchor = mindarThree.addAnchor(1);
        anchor.group.add(plane);


        anchor.onTargetFound = () => {
          video.play();

        };

        anchor.onTargetLost = () => {
          video.pause();

        };

        return { video, plane };
      })
    );

    //#endregion


//#region Video2

    const videosData1 = [
      {
        url: "Videos/Test1.mp4",
        position: new THREE.Vector3(0, 0, 0.1),
      },

    ];

    const videos1 = await Promise.all(
      videosData1.map(async (videoData1) => {
        const videoTexture1 = await loadVideo(videoData1.url);
        const video = videoTexture1.image;

        const geometry = new THREE.PlaneGeometry(1, 1080 / 1080);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: videoTexture1 });
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = 0;
        plane.position.copy(videoData1.position);
        plane.scale.multiplyScalar(0.5);

        const anchor2 = mindarThree.addAnchor(2);
        anchor2.group.add(plane);


        anchor2.onTargetFound = () => {
          video.play();

        };

        anchor2.onTargetLost = () => {
          video.pause();

        };

        return { video, plane };
      })
    );

    //#endregion
  
  


 //#region Textura
    
    const anchor4 = mindarThree.addAnchor(4);
    // Carga la textura de la imagen
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('Graficas/1.png');

    // Crea un material usando la textura
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });

    // Crea una geometría (por ejemplo, un plano)
    const geometry2 = new THREE.PlaneGeometry(1, 1);

    // Crea el mesh combinando la geometría y el material
    const mesh2 = new THREE.Mesh(geometry2, material2);
                             
    anchor4.group.add (mesh2);

    //#endregion



//ejecutable  
await mindarThree.start();

    renderer.setAnimationLoop(() => {
      videos.forEach(({ video, plane }) => {});
      videos1.forEach(({ video, plane }) => {});
      

      renderer.render(scene, camera);
    });
  
});
