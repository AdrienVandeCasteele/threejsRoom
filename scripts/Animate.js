class Animate{
    constructor(){
        this.raf()
    }

    raf(){
        const tick = ()=>{
            requestAnimationFrame(tick)

            initScene.cameraCoords.x = Math.cos((environment.mouse.x+0.5)*Math.PI)-5
            initScene.cameraCoords.y = Math.sin(environment.mouse.y*3)+2
            initScene.camera.position.x = initScene.cameraCoords.x
            initScene.camera.position.y = initScene.cameraCoords.y
            initScene.camera.lookAt(initScene.scene.position)

            initScene.renderer.render(initScene.scene, initScene.camera)
        }
        tick()
    }
}