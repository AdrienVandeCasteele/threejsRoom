class Materials{
    constructor(){
        this.concrete = new THREE.MeshPhongMaterial({color: 0xCAD3C8})
        this.wallpaper = new THREE.MeshPhongMaterial({color: 0x000289})
        this.parquet = new THREE.MeshPhongMaterial({color: 0x0085ff})
        this.wood = new THREE.MeshPhongMaterial({color: 0xf6f9c2})
        this.mattress = new THREE.MeshPhongMaterial({color: 0xffffff})
        this.cover = new THREE.MeshPhongMaterial({color: 0xff3333})
        this.desk = new THREE.MeshPhongMaterial({color: 0xffffff})
    }
}