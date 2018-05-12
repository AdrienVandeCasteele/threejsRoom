class InitScene{
    constructor(){
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color( 0xffffff )
        this.camera()
        this.room = new THREE.Object3D()
        this.scene.add(this.room)
        this.walls()
        
        this.bed()
        this.desk()

        //this.computer()

        this.lights()
        this.render()
    }

    camera(){
        this.cameraCoords = {
            x: -5,
            y: 2,
            z: 5,
        }
        this.camera = new THREE.OrthographicCamera( environment.size.ratio*-3, environment.size.ratio*3, 3, - 3, 1, 500 )
        //this.camera = new THREE.PerspectiveCamera(70, environment.size.width / environment.size.height)
        this.camera.position.x = this.cameraCoords.x
        this.camera.position.y = this.cameraCoords.y
        this.camera.position.z = this.cameraCoords.z
        this.camera.lookAt(this.scene.position)
        this.scene.add(this.camera)
    }

    buildWall(){
        const wall = {}

        wall.container = new THREE.Object3D()

        wall.concrete = new THREE.Mesh(new THREE.BoxGeometry(2.5,2,0.16), materials.concrete)
        wall.concrete.position.z = -0.02
        wall.container.add(wall.concrete)

        wall.wallpaper = new THREE.Mesh(new THREE.BoxGeometry(2.45,1.95,0.04), materials.wallpaper)
        wall.wallpaper.position.z = 0.08
        wall.wallpaper.castShadow = true
        wall.wallpaper.receiveShadow = true
        wall.container.add(wall.wallpaper)

        wall.container.position.y = 0.9

        return wall
    }

    walls(){
        this.leftWall = this.buildWall()
        this.leftWall.container.position.x = -1.15
        this.room.add(this.leftWall.container)

        this.rightWall = this.buildWall()
        this.rightWall.container.position.z = 1.15
        this.rightWall.container.rotation.y = -0.5*Math.PI
        this.room.add(this.rightWall.container)

        //FLOOR
        this.floor = {}

        this.floor.container = new THREE.Object3D()

        this.floor.concrete = new THREE.Mesh(new THREE.BoxGeometry(2.5,0.16,2.5), materials.concrete)
        this.floor.concrete.position.y = -0.02
        this.floor.container.add(this.floor.concrete)

        this.floor.parquet = new THREE.Mesh(new THREE.BoxGeometry(2.45,0.04,2.45), materials.parquet)
        this.floor.parquet.position.y = 0.08
        this.floor.parquet.receiveShadow = true
        this.floor.container.add(this.floor.parquet)
        
        this.floor.container.position.z = 1.15
        this.floor.container.position.x = -1.15
        this.room.add(this.floor.container)
    }

    bed(){
        this.bed = {}
        this.bed.container = new THREE.Object3D
        this.bed.container.position.x = -2.1
        this.bed.container.position.z = 0.8
        this.bed.container.position.y = 0.15

        this.bed.foots = []
        for(let i=0; i<4; i++){
            const foot = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), materials.wood)
            this.bed.foots.push(foot)
        }
        this.bed.foots[0].position.x = -0.2 
        this.bed.foots[0].position.z = -0.5
        this.bed.foots[1].position.x = 0.2
        this.bed.foots[1].position.z = -0.5 
        this.bed.foots[2].position.x = 0.2
        this.bed.foots[2].position.z = 0.5 
        this.bed.foots[3].position.x = -0.2
        this.bed.foots[3].position.z = 0.5 
        for(let i=0; i<4; i++){
            this.bed.container.add(this.bed.foots[i])
        }

        this.bed.bolster = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 1.05), materials.wood)
        this.bed.bolster.position.y = 0.05
        this.bed.container.add(this.bed.bolster)

        this.bed.mattress = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.05, 1.03), materials.mattress)
        this.bed.mattress.position.y = 0.13
        this.bed.container.add(this.bed.mattress)

        this.bed.cover = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.07, 0.8), materials.cover)
        this.bed.cover.position.y = 0.13
        this.bed.cover.position.z = 0.13
        this.bed.container.add(this.bed.cover)

        this.room.add(this.bed.container)
    }

    desk(){
        this.desk = {}
        this.desk.container = new THREE.Object3D
        this.desk.container.position.x = -0.8
        this.desk.container.position.z = 0.4
        this.desk.container.position.y = 0.1

        this.desk.left = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.4), materials.desk)
        this.desk.left.position.x = -0.4
        this.desk.left.position.y = 0.2
        this.desk.container.add(this.desk.left)

        this.desk.right = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.4), materials.desk)
        this.desk.right.position.x = 0.4
        this.desk.right.position.y = 0.2
        this.desk.container.add(this.desk.right)

        this.desk.top = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.05, 0.4), materials.desk)
        this.desk.top.position.y = 0.4
        this.desk.container.add(this.desk.top)

        this.room.add(this.desk.container)
    }

    lights(){
        this.ambientLight = new THREE.AmbientLight(0x444444)
        this.scene.add(this.ambientLight)

        this.lamp = new THREE.PointLight(0xdddddd, 1)
        this.lamp.position.x = -1
        this.lamp.position.y = 2
        this.lamp.position.z = 1
        this.room.add(this.lamp)
    }

    render(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(environment.size.width, environment.size.height)
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement)
        window.addEventListener('resize', ()=>{
            ( environment.size.ratio*-3, environment.size.ratio*3, 3, - 3, 1, 1000 )
            this.camera.left = environment.size.ratio*-3
            this.camera.right = environment.size.ratio*3
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(environment.size.width, environment.size.height)
        })
    }
}