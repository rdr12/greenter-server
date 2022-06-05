const router = require("express").Router();
const PlantaModel = require("../models/Planta.model.js");
const ComentariosModel = require("../models/Comentarios.model");
const UserModel = require("../models/User.model.js");


//RUTAS
//ADMIN
//GET "/profile/admin" => para ver perfil de Administrador
router.get("/admin", async (req, res, next)=>{
    const userId = req.payload._id
    try{
        const response = await UserModel.findById(userId)
        res.json(response)
    }
    catch(error){
        next(error)
    }
})  

//GET "/profile/admin/plantas" => para ver todas las plantas creadas por el Administrador
router.get("/admin/plantas", async (req, res, next)=>{
    try{
        const response = await PlantaModel.find()
        res.json(response)
    }
    catch(error){
        next(error)
    }
})


//USER
//GET "/profile" => para ver el perfil de usuario
router.get("/", async (req, res, next)=>{
const userId = req.payload._id
try{
    const response =await UserModel.findById(userId)
    res.json(response)
}
catch(error){
    res.json(response)
}

})


//PATCH "/profile/edit" => para editar usuario
router.patch("/edit", async (req, res, next)=>{
    const userId = req.payload._id
    const {image, username, email, password} = req.body
    try{
        await UserModel.findByIdAndUpdate(userId, {image, username, email, password})
        res.json("Perfil actualizado")
    }
    catch(error){
        next(error)
    }
})

//DELETE "/profile/delete" => para borrar usuario
router.delete("/delete", async (req, res, next)=>{
    const userId = req.payload._id
    try{
        await ComentariosModel.deleteMany({user: userId})
        await UserModel.findByIdAndDelete(userId)
        res.json("Perfil borrado")
    }
    catch(error){
        next(error)
    }
})

//FAVORITES
//POST "/favorites/:plantaId" => para añadir a favoritos
router.post("/favorites/:plantaId", async (req, res, next) =>{
    const {plantaId} = req.payload._id
    const id = req.params
    try{

    await UserModel.findByIdAndUpdate(id, { $addToSet: {favorites: plantaId} })

    }
    catch(error){
        next(error)
    }
})

//GET "/favorites" => ver lista de favoritos
router.get("/favorites", async (req, res, next)=>{
// const{favorites} = req.body
try{
    const response = await UserModel.find().populate("user")
    res.json(response)
} catch (error) {
    next(error)
}
})

module.exports = router;
