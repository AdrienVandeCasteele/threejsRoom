class Environment{
    constructor(){
        this.initVariables()
        this.listenResize()
        this.listenMouse()
    }

    initVariables(){
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.size.ratio = this.size.width/this.size.height

        this.mouse = {
            x: 0,
            y: 0
        }
    }

    listenResize(){
        window.addEventListener('resize', ()=>{
            this.size.width = window.innerWidth
            this.size.height = window.innerHeight
            this.size.ratio = this.size.width/this.size.height
        })
    }

    listenMouse(){
        window.addEventListener('mousemove', (e)=>{
            this.mouse.x = e.clientX/this.size.width - 0.5
            this.mouse.y = e.clientY/this.size.height - 0.5
        })
    }
}