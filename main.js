const API = "https://graph.facebook.com/";
const CAMPOS = "?fields=id,name,picture&";
const TOKEN = "access_token=EAAEQemjqqbQBABP1xLOytkXU8x5mGR4ZBGdadFFiSOgjPrswLFWw93Lcd2osrmiYGAZCv2ycAzPIVVcjLjroqjfWRtOUg55Pzo8mxaxxW5PrhJUhDYRZBicg0GIeFIVZBgL8EjQvrdWWBNpneF7m6ni3t7ZBhhslKIU19Fv2k0gZDZD";

//Brahian: 100006229876280
//Mio: 100006374922337
//Valen: 100005093809401
const app = Vue.createApp({
    data() {
        return {
            busqueda: null,
            result: null,
            error: null,
            favoritos: new Map()
        }
    }, 

    created(){
        const FavoritosGuardados = JSON.parse(window.localStorage.getItem("misfavoritos"))
        // Está evaluando si existe y midiendo su longitud, se abrevia con ?
        if(FavoritosGuardados?.lenght){
          //Recreamos o recontruimos el Map de los favoritos con un nuevo nombre
          //Armamos el Map desde cero con el método map() para obtener el id como un key y 
          //el arreglo completo como el value de mi Map
          const favoritoNew = new Map(FavoritosGuardados.map(alias=>[alias.id,alias]))
          //Asignamos a la variable favoritos de la instancia el valor del nuevo favoritoNew
          this.favoritos = favoritoNew
        }
    },

    computed: {
        estaFavorito(){
          return this.favoritos.has(this.result.id)
        },
  
        todosFavoritos(){
          //Pasamos la informacion a un autentico array
          //El metodo values() solo traera los valores sin las claves. 
          return Array.from(this.favoritos.values())
        }
    },

    methods: {
        async Buscar(){
            this.result = this.error = null
            try {
                const response = await fetch(API + this.busqueda + CAMPOS + TOKEN)
                if(!response.ok) throw new Error('Usuario no encontrado')
                const data = await response.json()
                console.log(data)
                this.result = data
              } catch (error) {
                this.error = error
            } finally{
                this.busqueda = null
              }
        }, 

        addFavorito(){
            this.favoritos.set(this.result.id, this.result)
            this.actualizarStorage()
        },  
        
        removerFavorito(){
            this.favoritos.delete(this.result.id)
            this.actualizarStorage()
        },
    
        actualizarStorage(){
            window.localStorage.setItem('misfavoritos', JSON.stringify(this.todosFavoritos))
        }, 

        mostrarFavorito(parametro){
            //Tipo array con objetos de javascript o tipo JSON
            this.result = parametro
          }
    } 
})

